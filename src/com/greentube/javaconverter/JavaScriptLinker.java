package com.greentube.javaconverter;

import java.io.*;
import java.util.*;

public class JavaScriptLinker
{
    public static void link
    (   String rootclasses, 
        String searchpath, 
        String output, 
        String startupcode
    ) 
    throws IOException
    {   if (rootclasses == null) 
        {   throw new IOException("No root class(es) given");
        }
        if (output == null) 
        {   throw new IOException("No output file given");
        }

        StringTokenizer t = new StringTokenizer(rootclasses, ",;");
        int n = t.countTokens();
        String[] roots = new String[n];
        for (int i=0; i<n; i++) 
        {   roots[i] = t.nextToken().trim();
        }        
        t = new StringTokenizer(searchpath!=null ? searchpath:"", ",;");
        n = t.countTokens();
        File[] cp = new File[n];
        for (int i=0; i<n; i++) 
        {   cp[i] = new File(t.nextToken().trim());
        }
        
        // load all
        JavaScriptLinker linker = new JavaScriptLinker(cp);
        linker.loadAll(roots);		
        int[] o = linker.computeOrdering();

        // write all modules
        FileOutputStream os = new FileOutputStream(output);
        os.write("\"use strict\";\n".getBytes("utf-8"));
        linker.writeOrdered(os,o);

        // add optional startup code to actually start up everything
        if (startupcode!=null && startupcode.length()>0)
        {   os.write(startupcode.getBytes("utf-8"));
        }

        os.close();
    }


    private final File[] searchpath;

    // All modules that are already known (may not be loaded yet)  
    private HashMap<String,Integer> name2index;	 // filename -> sequencenumber
    private HashMap<Integer,String> index2name;	 // sequencenumber -> filename 

    // when the module is loaded, the list grows 
    private ArrayList<byte[]> modules; 

    // annotation information about loading sequence constraints 
    private TransitiveClosure mustbeloaded;

    private JavaScriptLinker(File[] searchpath) 
    {   
        this.searchpath = searchpath; 
    }

    private void loadAll(String[] roots) throws IOException 
    {   
        name2index = new HashMap<>();
        index2name = new HashMap<>();
        modules = new ArrayList<>();
        mustbeloaded = new TransitiveClosure();

        TransitiveClosure reachablereference = new TransitiveClosure();
        ArrayList<int[]> completionconstraints = new ArrayList<>();

        // start the loading iterations 
        for (int i=0; i<roots.length; i++)
        {   name2index.put(roots[i], Integer.valueOf(i));
            index2name.put(Integer.valueOf(i), roots[i]);
        }
        
        // repeat until everything is loaded
        while (modules.size() < index2name.size()) 
        {   // load next not yet loaded file
            int idx = modules.size();
            String fn = index2name.get(Integer.valueOf(idx));

            ArrayList<String> reference = new ArrayList<>();
            ArrayList<String> load = new ArrayList<>();
            ArrayList<String> complete = new ArrayList<>();
            byte[] data = loadModule(fn, reference,load,complete);
            modules.add(data);

            // while loading memorize the dependency relations
            for (String r:reference) 
            {   int i2 = assignIndex(r);
                reachablereference.addEdge(idx,i2);
            }
            for (String r:load) 
            {   int i2 = assignIndex(r);
                reachablereference.addEdge(idx,i2);
                mustbeloaded.addEdge(idx,i2);
            }
            for (String r:complete) 
            {   int i2 = assignIndex(r);
                reachablereference.addEdge(idx,i2);
                completionconstraints.add(new int[]{idx,i2});
            }
        }

        // incorporate the completion constraints into the loading constraints:
        // before loading the constrained module, all modules _referenced_ by the
        // target must already be loaded 
        for (int[] c:completionconstraints) 
        {   int from = c[0];
            int to = c[1];
            for (int i=0; i<modules.size(); i++) 
            {   if (reachablereference.isReachable(to,i)) 
                {   mustbeloaded.addEdge(from,i);
                }
            }
        }
    }

    private int assignIndex(String name) 
    {   
        if (name2index.containsKey(name)) 
        {   return name2index.get(name).intValue();
        } 
        else 
        {   int i = name2index.size();
            name2index.put(name,Integer.valueOf(i));
            index2name.put(Integer.valueOf(i), name);
            return i;
        }
    }

    private int[] computeOrdering() throws IOException 
    {   
        int[] o = mustbeloaded.computeOrdering();
        if (o==null) 
        {   int[] cycle = mustbeloaded.findCycle();
            StringBuffer msg = new StringBuffer("Cyclic dependencys involving modules:");
            for (int i=0; i<cycle.length; i++) 
            {   msg.append(" ");
                msg.append(index2name.get(Integer.valueOf(cycle[i])));
            }
            throw new IOException(msg.toString());
        }
        return o;
    }

    private void writeOrdered(OutputStream os, int[] o) throws IOException 
    {   
        for (int i=0; i<o.length; i++) {
            os.write(modules.get(o[i]));
        }
    }

    private byte[] loadModule
    (   String filename, 
        ArrayList<String> reference,
        ArrayList<String> load,
        ArrayList<String> complete
    ) 
    throws IOException
    {   
        InputStream is = null;
        // try to find the file in the search path
        for (int i=0; searchpath!=null && i<searchpath.length; i++)
        {   File test = new File(searchpath[i], filename+".js");
            if (test.exists()) 
            {   is = new FileInputStream(test); 
                break;
            }
        }
        // for core classes try to use the built-in implementations
        if (is==null && filename.startsWith("java/")) 
        {   is = this.getClass().getResourceAsStream("/runtimejs/"+filename+".js");
        }
        if (is==null) 
        {   throw new IOException("Can not find javascript file "+filename);
        }

        // quick and sloppy implementation, no trimming of comments yet
        BufferedReader r = new BufferedReader(new InputStreamReader(is, "utf-8"));
        StringBuilder sb = new StringBuilder();
        String l;
        while ( (l = r.readLine()) != null) 
        {   if (l.startsWith("//reference//")) 
            {   reference.add(l.substring(13).trim());
            }
            if (l.startsWith("//load//")) 
            {   load.add(l.substring(8).trim());
            }
            if (l.startsWith("//complete//")) 
            {   complete.add(l.substring(12).trim());
            }
            sb.append(l);
            sb.append("\n");
            
        }
        r.close();
        return sb.toString().getBytes("utf-8");
    }
}


/**
 * Facility to compute the transitive closure of a directed graph.
 * Whenever new edges are added to the graph the reachability information
 * for all affected nodes are updated.
 * Additionally compute an ordering of the nodes so that each node
 * appears in the list before any other node that is reachable from this.
 */
class TransitiveClosure 
{   
    // size of the matrix 
    private int n;

    // Bit matrix to hold the reachability information
    // For every node there is a bit vector (implemented as int[]) that has
    // a 1 bit for every other node that is reachable from its. 
    // Every node is automatically reachable from itself.
    // This matrix will grow as new dependencies are added.
    private int[][] reachable;	

    public TransitiveClosure()
    {   
        n = 0;
        reachable = new int[0][];
    }

    // add reachability relation. all indirect relations are updated.
    public void addEdge(int from, int to) 
    {   
        ensureCapacity(Math.max(from,to)+1);
        // do not add twice
        if (isReachable(from,to)) return;

        // make every node that can reach the 'from' node be able
        // to reach everything that is reachable from the 'to' node now also
        for (int r=0; r<n; r++) 
        {   if (isReachable(r,from)) 
            {   combine_into(reachable[to],reachable[r]);
            }
        }
    }

    // merge all 1es from the source bit vector into the target bit vector
    private void combine_into(int[]source, int[] target) 
    {   
        for (int i=0; i<source.length; i++) 
        {   target[i] |= source[i];
        }
    }

    // test if one node is somehow reachable from another node 
    public boolean isReachable(int from, int to) 
    {   
        return (reachable[from][to/32] & (1<<(to%32))) != 0;
    }

    // enlarge the matrix if needed
    private void ensureCapacity(int cap) 
    {   
        // no need to do anything
        if (cap<=n) return;		
        // create larger array 
        int[][] newmatrix = new int[cap][];		
        // extend every existing row to have space for at least
        // n bits (n/32 rounded up)
        int words = (cap+31)/32;
        for (int r=0; r<n; r++) 
        {   if (reachable[r].length!=words) 
            {   int[] newrow = new int[words];
                System.arraycopy(reachable[r],  0,  newrow,  0,  reachable[r].length);
                newmatrix[r] = newrow;
            }
            else
            {   newmatrix[r] = reachable[r];
            }
        }
        // create the new rows and initialize the main diagonal with 1es
        for (int r=n; r<cap; r++) 
        {   int[] newrow = new int[words];
            newrow[r/32] = 1 << (r%32);
            newmatrix[r] = newrow;
        }
        // use the new values from now 
        reachable = newmatrix;
        n = cap;
    }

    // Compute an ordering of the nodes that satisfies all the reachability constraints.
    // In the case that no such ordering can be created because of cycles, a null is returned.
    public int[] computeOrdering() 
    {
        // determine total number of other nodes that must be ordered before any given node
        // (also counting the node itself) 
        int[] blockers = new int[n];
        for (int from=0; from<n; from++) 
        {   for (int to=0; to<n; to++) 
            {   if (isReachable(from,to)) blockers[from]++;
            }
        }
        // create the ordering
        int[] ordering = new int[n];
        for (int numordered=0; numordered<n; numordered++) 
        {   // try to find an unused node that has no more blockers and can be used
            // as next in sequence
            int taken=-1;
            for (int i=0; i<n; i++) 
            {   if (blockers[i]==1) 
                {   taken=i;
                    break;
                }
            }
            if (taken<0) return null;  // no possible node found - ordering failed

            // memorize taken node 
            ordering[numordered] = taken;

            // decrease blocking count for all other nodes that were blocked by the taken one
            for (int i=0; i<n; i++) 
            {   if (isReachable(i,taken)) blockers[i]--;
            }
        }
        // finally finished
        return ordering;
    }

    // find any pair of nodes which are reachable from one each other, as this 
    // would form a cycle.
    public int[] findCycle() 
    {   
        for (int a=0; a<n; a++) 
        {   for (int b=0; b<n; b++) 
            {   if (a!=b && isReachable(a,b) && isReachable(b,a)) return new int[]{a,b};
            }
        }
        return null;
    }
}

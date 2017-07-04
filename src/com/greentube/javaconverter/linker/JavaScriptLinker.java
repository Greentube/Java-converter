package com.greentube.javaconverter.linker;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;


public class JavaScriptLinker
{	
	public static void link(String mainfilename, File[] searchpath, File outputfile) 
	throws IOException
	{		
		// load all
		JavaScriptLinker linker = new JavaScriptLinker(searchpath);
		linker.loadAll(mainfilename);		
		int[] o = linker.computeOrdering();
		
		// write all modules
		FileOutputStream os = new FileOutputStream(outputfile);
		os.write("\"use strict\";\n".getBytes("utf-8"));
		linker.writeOrdered(os,o);
		
		// add startup code to launch the main method
		String startupcode = "\n"
			+ mainfilename.replace('/', '_')
			+ ".prototype.main_1([]);\n";			
		os.write(startupcode.getBytes("utf-8"));	
		
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
	
	private JavaScriptLinker(File[] searchpath) {		
		this.searchpath = searchpath; 
	}
	
	private void loadAll(String mainfilename) throws IOException {		
		name2index = new HashMap();
		index2name = new HashMap();
		modules = new ArrayList();
		mustbeloaded = new TransitiveClosure();

		TransitiveClosure reachablereference = new TransitiveClosure();
		ArrayList<int[]> completionconstraints = new ArrayList();
		
		// start the loading iterations 
		name2index.put(mainfilename, Integer.valueOf(0));
		index2name.put(Integer.valueOf(0), mainfilename);
		
		// repeat until everything is loaded
		while (modules.size() < index2name.size()) {
			// load next not yet loaded file
			int idx = modules.size();
			String fn = index2name.get(Integer.valueOf(idx));
			
			ArrayList<String> reference = new ArrayList();
			ArrayList<String> load = new ArrayList();
			ArrayList<String> complete = new ArrayList();
			byte[] data = loadModule(fn, reference,load,complete);
			modules.add(data);
			
			// while loading memorize the dependency relations
			for (String r:reference) {				
				int i2 = assignIndex(r);
				reachablereference.addEdge(idx,i2);
			}
			for (String r:load) {
				int i2 = assignIndex(r);
				reachablereference.addEdge(idx,i2);
				mustbeloaded.addEdge(idx,i2);
			}
			for (String r:complete) {
				int i2 = assignIndex(r);
				reachablereference.addEdge(idx,i2);
				completionconstraints.add(new int[]{idx,i2});
			}
		}		
		
		// incorporate the completion constraints into the loading constraints:
		// before loading the constrained module, all modules _referenced_ by the
		// target must already be loaded 
		for (int[] c:completionconstraints) {
			int from = c[0];
			int to = c[1];
			for (int i=0; i<modules.size(); i++) {
				if (reachablereference.isReachable(to,i)) {
					mustbeloaded.addEdge(from,i);
				}
			}
		}
	}
	
	private int assignIndex(String name) {
		if (name2index.containsKey(name)) {
			return name2index.get(name).intValue();
		} else {
			int i = name2index.size();
			name2index.put(name,Integer.valueOf(i));
			index2name.put(Integer.valueOf(i), name);
			return i;
		}
	}
	
	private int[] computeOrdering() throws IOException {
		int[] o = mustbeloaded.computeOrdering();
		if (o==null) {
			int[] cycle = mustbeloaded.findCycle();
			StringBuffer msg = new StringBuffer("Cyclic dependencys involving modules:");
			for (int i=0; i<cycle.length; i++) {
				msg.append(" ");
				msg.append(index2name.get(Integer.valueOf(cycle[i])));
			}
			throw new IOException(msg.toString());
		}
		return o;		
	}
	
	private void writeOrdered(OutputStream os, int[] o) throws IOException {		
		for (int i=0; i<o.length; i++) {
			System.out.println(index2name.get(o[i]));
			os.write(modules.get(o[i]));
		}
	}
	
	private byte[] loadModule(String filename, 
			ArrayList<String> reference,
			ArrayList<String> load,
			ArrayList<String> complete) throws IOException
	{	
		// try to find the file in the search path
		File f = null;
		for (int i=0; i<searchpath.length; i++)
		{			
			File test = new File(searchpath[i], filename+".js");
			if (test.exists()) {
				f = test;
				break;
			}
		}
		if (f==null) {
			throw new IOException("Can not find javascript file "+filename);
		}
			
		// quick and sloppy implementation, no trimming of comments yet
		InputStream is = new FileInputStream(f); 
		BufferedReader r = new BufferedReader(new InputStreamReader(is, "utf-8"));
		StringBuilder sb = new StringBuilder();
		String l;
		while ( (l = r.readLine()) != null) {
			if (l.startsWith("//reference//")) {
				reference.add(l.substring(13).trim());
			}
			if (l.startsWith("//load//")) {
				load.add(l.substring(8).trim());
			}
			if (l.startsWith("//complete//")) {
				complete.add(l.substring(12).trim());
			}
			sb.append(l);
			sb.append("\n");
		}
		r.close();
		return sb.toString().getBytes("utf-8");
	}
		
	
}


 

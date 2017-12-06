package com.greentube.javaconverter;

import java.io.*;
import java.util.*;

public class CodePrinter 
{   final static boolean horstmanStyle=true; // experimental bracing

    // general code generation
    File outputfolder;
    OutputStreamWriter ow;
    boolean linehasstarted;
    int indent;
    boolean afteropeningbrace;

    // for javascript code
    private HashSet<String> reference;
    private HashSet<String> load;
    private HashSet<String> complete;

    // for c# code
    private HashSet<String> pendingLabels;	
    private HashMap<String,Integer> deepestdim;
    private HashMap<String,Integer> dimtypeid;

    public CodePrinter(File outputfolder, String filename) 
    {   try
        {   File f = new File(outputfolder,filename);
            f.getParentFile().mkdirs();		
            this.ow = new OutputStreamWriter(new FileOutputStream(f), "utf-8");
        } 
        catch (IOException e) 
        {   e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }

        this.outputfolder = outputfolder;
        this.indent = 0;
        this.linehasstarted = false;
        this.afteropeningbrace = false;
        
        reference = new HashSet();
        load = new HashSet();
        complete = new HashSet();

        pendingLabels = new HashSet();
        deepestdim = new HashMap();
        dimtypeid = new HashMap();
    }

    public CodePrinter(CodePrinter p, String filename) 
    {   this(p.outputfolder,filename);
    }

    public void finish()  
    {   printExternals();
        try 
        {   ow.close();
        } 
        catch (IOException e) 
        {   e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
        if (pendingLabels.size()>0) 
        {   throw new RuntimeException("Unresolved label definitions: "+pendingLabels);
        }
    }

    public void increaseIndent() 
    {   indent++;
    }

    public void decreaseIndent() 
    {   indent--;
    }

    public void print(String s) 
    {   try        
        {   if (horstmanStyle && s.startsWith("}") && afteropeningbrace && linehasstarted) {
                ow.write("\n");
                linehasstarted=false;
                afteropeningbrace=false;
            }
            if (!linehasstarted) 
            {   for (int i=0; i<indent; i++) ow.write("    ",0,4);
                linehasstarted=true;
            }
            ow.write(s,0,s.length());
            afteropeningbrace = s.endsWith("{");
        } 
        catch (IOException e) 
        {   e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    public void println() 
    {
        try 
        {   if (horstmanStyle && afteropeningbrace) 
            {   ow.write("   ");
                linehasstarted=true;
            } 
            else 
            {   ow.write("\n");
                linehasstarted=false;
            }
        }
        catch (IOException e) 
        {   e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    public static String escapeIdentifier(String id, boolean allowDollarSign) 
    {   // escape special characters, so the output will never have characters >127
        StringBuffer b = new StringBuffer();
        for (int i=0; i<id.length(); i++) 
        {   char c = id.charAt(i);
            if
            (   (c>='a' && c<='z')
                || (c>='A' && c<='Z')
                || (c>='0' && c<='9')
                || (allowDollarSign && c=='$') 
            )
            {   b.append(c);
            }
            else 
            {   b.append("_");
                if (c!='_')   // '_' simply escapes to '__'
                {   b.append(Integer.toHexString(c));
                }
                b.append("_");
            }
        }
        return b.toString();
    }

    public static String escapePackagePath(String packagename) 
    {   StringBuffer b = new StringBuffer();
        for (StringTokenizer t = new StringTokenizer(packagename,"."); t.hasMoreElements(); ) 
        {   b.append(escapeIdentifier(t.nextToken(), true));
            b.append("/");
        }
        return b.toString();
    }


    // --- functionality specific for javascript generation ---  

    private static Set<String> javascriptreserved = new HashSet<String>
    (   Arrays.asList
        (   "abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch",
            "char", "class", "const", "continue", "debugger", "default", "delete", "do",
            "double", "else", "enum", "eval", "export", "extends", "false", "final",
            "finally", "float", "for", "function", "goto", "if", "implements", "import",
            "in", "instanceof", "int", "interface", "let", "long", "native", "new",
            "null", "package", "private", "protected", "public", "return", "short", "static",
            "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true",
            "NaN", "try", "typeof", "var" ,"void", "volatile", "while", "with", "yield",
            // keys with special meaning in javascript objects
            "toString", "length", "__proto__", "prototype"
        )
    );

    public void printJSIdentifier(String id, String suffix) 
    {   String escaped = escapeIdentifier(id,false) + suffix;
        if (javascriptreserved.contains(escaped)) print("$");        
        print(escaped);
    }

    public void printJSName(String packagename, String uniquename) 
    {   StringTokenizer t = new StringTokenizer(packagename,".");
        if (t.countTokens()==0) 
        {   print("__");
        }
        else 
        {   while (t.hasMoreElements()) 
            {   print(escapeIdentifier(t.nextToken(),false).replace('_', '$'));
                print("_");
            }
        }
        print(escapeIdentifier(uniquename,false).replace('_', '$'));
    }

    public void printAndMemorizeReference(String packagename, String uniquename) 
    {   memorizeReference(packagename,uniquename);
        printJSName(packagename,uniquename);
    }
    public void printAndMemorizeLoad(String packagename, String uniquename) 
    {   memorizeLoad(packagename,uniquename);
        printJSName(packagename,uniquename);
    }
    public void printAndMemorizeComplete(String packagename, String uniquename) 
    {   memorizeComplete(packagename,uniquename);
        printJSName(packagename,uniquename);
    }

    public void memorizeReference(String packagename, String uniquename) 
    {    mem(reference,packagename,uniquename);
    }
    public void memorizeLoad(String packagename, String uniquename) 
    {    mem(load, packagename, uniquename);		
    }
    public void memorizeComplete(String packagename, String uniquename) 
    {    mem(complete, packagename, uniquename);	
    }
    private void mem(HashSet<String>storage, String packagename, String uniquename) 
    {   if (! (packagename.equals("java.lang") && uniquename.equals("String") )) 
        {   storage.add(escapePackagePath(packagename) + escapeIdentifier(uniquename,true));
        }
    }

    public void printExternals() 
    {   for (String s:reference) 
        {   if (load.contains(s) || complete.contains(s)) continue;            
            print("//reference// ");
            print(s);
            println();
        }
        for (String s:load) 
        {   if (complete.contains(s)) continue;
            print("//load// ");
            print(s);
            println();
        }
        for (String s:complete) {
            print("//complete// ");
            print(s);
            println();
        }
    }

    // --- functionality specific for csharp code generation ---

    private static Set<String> csharpreserved = new HashSet<String>
    (   Arrays.asList
        (   "abstract", "as", "base", "bool", "break", "byte", "case", "catch",
            "char", "checked", "class", "const", "continue", "decimal", "default", "delegate",
            "do", "double", "else", "enum", "event", "explicit", "extern", "false",
            "finally", "fixed", "float", "for", "foreach", "goto", "if", "implicit",
            "in", "int", "interface", "internal", "is", "lock", "long",
            "namespace", "new", "null", "object", "operator", 	"out", "override",
            "params", "private", "protected", "public", "readonly", "ref", "return" ,"sbyte",
            "sealed", "short", "sizeof", "stackalloc", "static", "string", "struct", "switch",
            "this", "throw", "true", "try", "typeof", "uint", "ulong", "unchecked",
            "unsafe", "ushort", "using", "using", "static", "virtual", "void", "volatile", "while"						
       )
    );

    public void printCSIdentifier(String id, String suffix) 
    {   String escaped = escapeIdentifier(id,false) + suffix;
        if (csharpreserved.contains(escaped)) print("@");
        print(escaped);
    }

    public void printCSIdentifier(String id) 
    {   String escaped = escapeIdentifier(id,false);
        if (csharpreserved.contains(escaped)) print("@");
        print(escaped);
    }

    public static String escapeIdentifierCS(String id) 
    {   String escaped = escapeIdentifier(id,false);
        if (csharpreserved.contains(escaped)) return "@"+escaped;		
        return escaped;
    }

    public void printJumpToLabel(String l) 
    {   print("goto ");
        print(l);
        print(";");
        pendingLabels.add(l);
    }

    public boolean hasPendingLabel(String l) 
    {   if (pendingLabels.contains(l)) 
        {   pendingLabels.remove(l);
            return true;
        }
        return false;
    }

    public int memorizeDim(String elementtype, int depth) 
    {   if (!deepestdim.containsKey(elementtype)) 
        {   deepestdim.put(elementtype, Integer.valueOf(depth));
            dimtypeid.put(elementtype, Integer.valueOf(deepestdim.size()));
            return deepestdim.size();
        }
        deepestdim.put(elementtype, Integer.valueOf(Math.max(deepestdim.get(elementtype).intValue(), depth))); 
        return dimtypeid.get(elementtype).intValue();
    }

    public void printAndForgetDims() 
    {   for (String en:deepestdim.keySet()) 
        {   int dd = deepestdim.get(en).intValue();
            int id = dimtypeid.get(en).intValue();

            for (int d=5; d<=dd; d++) 
            {   print("private static "+en);
                for (int i=0; i<d; i++) print("[]");
                print(" _dim"+id+"(");
                for (int i=0; i<d; i++) 
                {   if (i>0) print(", ");
                    print("int n"+i);
                }
                print(") {");
                println();
                increaseIndent();
                print(en);
                for (int i=0; i<d; i++) print("[]");
                print(" a = new "+en+"[n0]");
                for (int i=1; i<d; i++) print("[]");
                print(";");
                println();
                print("for (int i0=0; n1>=0 && i0<n0; i0++) {");
                println();
                increaseIndent();
                print("a[i0] = ");
                if (d<=5) 
                {   print("SYSTEM.dim<"+en+">");
                } 
                else 
                {   print("_dim"+id);
                }
                print("(");
                for (int i=1; i<d; i++) 
                {   if (i>1) print(", ");
                    print("n"+i);
                }
                print(")");
                print(";");
                println();
                decreaseIndent();
                print("}");
                println();
                print("return a;");
                println();

                decreaseIndent();
                print("}");
                println();
            }
        }
        deepestdim.clear();
        dimtypeid.clear();
    }
}

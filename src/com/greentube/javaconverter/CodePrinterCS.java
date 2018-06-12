package com.greentube.javaconverter;

import java.io.*;
import java.util.*;

public class CodePrinterCS 
{   // general code generation
    File outputfolder;
    OutputStreamWriter ow;
    boolean linehasstarted;
    int indent;
    boolean afteropeningbrace;

    private HashSet<String> pendingLabels;	
    private HashMap<Object,int[]> dims;     // TypeDecl -> [identifier,deepest] 

    public CodePrinterCS(File outputfolder, String filename) 
    {   
        try
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
        
        pendingLabels = new HashSet<>();
        dims = new HashMap<>();
    }

    public CodePrinterCS(CodePrinterCS p, String filename) 
    {   
        this(p.outputfolder,filename);
    }

    public void finish()  
    {   
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
    {   
        indent++;
    }

    public void decreaseIndent() 
    {   
        indent--;
    }

    public void print(String s) 
    {   
        try        
        {   if (!linehasstarted) 
            {   for (int i=0; i<indent; i++) ow.write("    ",0,4);
                linehasstarted=true;
            }
            ow.write(s,0,s.length());
            afteropeningbrace = s.equals("{");
        } 
        catch (IOException e) 
        {   e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    public void println() 
    {
        try 
        {   ow.write("\n");
            linehasstarted=false;            
        }
        catch (IOException e) 
        {   e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    public static String escapeIdentifier(String id, boolean allowDollarSign) 
    {   
        // escape special characters, so the output will never have characters >127
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
    {   
        StringBuffer b = new StringBuffer();
        for (StringTokenizer t = new StringTokenizer(packagename,"."); t.hasMoreElements(); ) 
        {   b.append(escapeIdentifier(t.nextToken(), true));
            b.append("/");
        }
        return b.toString();
    }



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
    {   
        String escaped = escapeIdentifier(id,false) + suffix;
        if (csharpreserved.contains(escaped)) print("@");
        print(escaped);
    }

    public void printCSIdentifier(String id)     
    {   
        printCSIdentifier(id,"");
    }

    public static String escapeIdentifierCS(String id) 
    {   
        String escaped = escapeIdentifier(id,false);
        if (csharpreserved.contains(escaped)) return "@"+escaped;		
        return escaped;
    }

    public void printCSMethodName(String name, boolean isstatic)
    {   
        if (!isstatic) 
        {   if (name.equals("toString")) { name = "ToString"; }
            else if (name.equals("equals")) { name = "Equals"; }
            else if (name.equals("hashCode")) { name = "GetHashCode"; }
        }   
        printCSIdentifier(name);
    }

    public void printJumpToLabel(String l) 
    {   
        print("goto ");
        print(l);
        print(";");
        pendingLabels.add(l);
    }

    public boolean hasPendingLabel(String l) 
    {   
        if (pendingLabels.contains(l)) 
        {   pendingLabels.remove(l);
            return true;
        }
        return false;
    }

    public int memorizeDim(Object elementtype, int depth) 
    {   
        if (!dims.containsKey(elementtype)) 
        {   int id = dims.size();
            dims.put(elementtype, new int[]{id, depth});
            return id;
        }
        else
        {   int[] id_and_depth = dims.get(elementtype);
            id_and_depth[1] = Math.max(id_and_depth[1], depth);
            return id_and_depth[0];
        }
    }
    
    public HashMap<Object,int[]> retrieveDims()
    {
        HashMap<Object,int[]> x = dims;
        dims = new HashMap<>();
        return x; 
    }
}

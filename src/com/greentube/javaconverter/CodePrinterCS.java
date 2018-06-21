package com.greentube.javaconverter;

import java.io.*;
import java.util.*;

public class CodePrinterCS extends CodePrinter
{   
    private HashSet<String> pendingLabels;	
    private HashMap<Object,int[]> dims;     // TypeDecl -> [identifier,deepest] 

    public CodePrinterCS(File outputfolder, String filename) 
    {   
        super(outputfolder,filename);
        
        pendingLabels = new HashSet<>();
        dims = new HashMap<>();
    }

    public CodePrinterCS(CodePrinterCS p, String filename) 
    {   
        this(p.outputfolder,filename);
    }

    public void finish()  
    {   
        super.finish();
        if (pendingLabels.size()>0) 
        {   throw new RuntimeException("Unresolved label definitions: "+pendingLabels);
        }
        if (dims.size()>0) 
        {   throw new RuntimeException("Unresolved array allocation functions: "+dims);
        }
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
            "unsafe", "ushort", "using", "static", "virtual", "void", "volatile", "while"						
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
            else if (name.equals("clone")) { name = "Clone"; }
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

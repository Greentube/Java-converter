package com.greentube.javaconverter;

import java.io.*;
import java.util.*;

public class CodePrinterCS extends CodePrinter
{   
    private HashSet<String> pendingLabels;	
    private HashMap<Object,int[]> dims;     // TypeDecl -> [identifier,deepest] 

    private HashMap<String,HashSet<String>> identifierMeanings;
    
    public CodePrinterCS(File outputfolder, String filename) 
    {   
        super
        (   outputfolder,
            filename,
            "_",
            new HashSet<String>
            (   Arrays.asList
                (   "abstract", "as", "base", "bool", "break", "byte", "case", "catch",
                    "char", "checked", "class", "const", "continue", "decimal", "default", "delegate",
                    "do", "double", "else", "enum", "event", "explicit", "extern", "false",
                    "finally", "fixed", "float", "for", "foreach", "goto", "if", "implicit",
                    "in", "int", "interface", "internal", "is", "lock", "long",
                    "namespace", "new", "null", "object", "operator",   "out", "override",
                    "params", "private", "protected", "public", "readonly", "ref", "return" ,"sbyte",
                    "sealed", "short", "sizeof", "stackalloc", "static", "string", "struct", "switch",
                    "this", "throw", "true", "try", "typeof", "uint", "ulong", "unchecked",
                    "unsafe", "ushort", "using", "static", "virtual", "void", "volatile", "while"  
                )                     
            )
        );
        
        pendingLabels = new HashSet<>();
        dims = new HashMap<>();
        
        identifierMeanings = new HashMap<>();
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

    public void printCSMethodName(String name, boolean isstatic)
    {   
        if (!isstatic) 
        {   if (name.equals("toString")) { name = "ToString"; }
            else if (name.equals("equals")) { name = "Equals"; }
            else if (name.equals("hashCode")) { name = "GetHashCode"; }
            else if (name.equals("clone")) { name = "Clone"; }
        }   
        printIdentifier(name);
    }
    
    public void printCSQualifiedIdentifier(String name)
    {  	
    	String ownname;
    	String packagename;
    	
    	// split into own name and package name
    	int lastdot = name.lastIndexOf(".");
    	if (lastdot<=0 || lastdot>=name.length()-1)
    	{
    		ownname = name;
    		packagename = "";
    	}
    	else
    	{
        	packagename = name.substring(0,lastdot);
        	ownname = name.substring(lastdot+1);    		
    	}
    	
    	// trace all different meanings of a reference name    	
    	if (!identifierMeanings.containsKey(ownname)) { identifierMeanings.put(ownname, new HashSet<>()); }
    	identifierMeanings.get(ownname).add(packagename);
    	
    	// when there are different meanings to a name, need to fully qualify it
    	if (identifierMeanings.get(ownname).size()!=1)
    	{	
        	StringTokenizer parts = new StringTokenizer(packagename,".");
            while (parts.hasMoreTokens()) 
            {   printIdentifier(parts.nextToken());
            	print(".");
            }    		
    	}
    	printIdentifier(ownname);    	
    }
    
    public void printUsingsForQualifiedIdentifiers()
    {
    	for (String ownname : identifierMeanings.keySet())
    	{
    		HashSet<String> packagenames = identifierMeanings.get(ownname);
    		// only use short names if there is only one
    		if (packagenames.size()==1)
    		{
    			for (String packagename : packagenames)
    			{
    				// can omit package name for java.lang
    				if (packagename.length()>0 && !packagename.equals("java.lang"))
	    			{
	    				print("using ");    			
	    				printIdentifier(ownname);
	    				print(" = ");
	    				StringTokenizer parts = new StringTokenizer(packagename,".");    			
	                	while (parts.hasMoreTokens()) 
	                	{   
	                		printIdentifier(parts.nextToken()); 
	                		print(".");              	
	                	}    
	                	printIdentifier(ownname);                
	                	println(";");
	    			}
    			}
    		}    	
    	}
    }
    
    
    public void setPendingLabel(String l, String suffix)
    {
        pendingLabels.add(l+"\u0000"+suffix);
    }

    public boolean removePendingLabel(String l, String suffix) 
    {   
        String x = l+"\u0000"+suffix;
        if (pendingLabels.contains(x)) 
        {   pendingLabels.remove(x);
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

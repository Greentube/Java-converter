package com.greentube.javaconverter;

import java.io.*;
import java.util.*;

public class CodePrinterJS extends CodePrinter
{  
    private HashSet<String> reference;
    private HashSet<String> load;
    private HashSet<String> complete;

    public CodePrinterJS(File outputfolder, String filename) 
    {   
        super
        (   outputfolder,
            filename,
            "$",
            new HashSet<String>
            (   Arrays.asList
                (   "abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch",
                    "char", "class", "const", "continue", "debugger", "default", "delete", "do",
                    "double", "else", "enum", "eval", "export", "extends", "false", "final",
                    "finally", "float", "for", "function", "goto", "if", "implements", "import",
                    "in", "instanceof", "int", "interface", "let", "long", "native", "new",
                    "null", "package", "private", "protected", "public", "return", "short", "static",
                    "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true",
                    "NaN", "try", "typeof", "var" ,"void", "volatile", "while", "with", "yield",
                    "toString", "length", "__proto__", "prototype"
                )
            )            
        );
        
        reference = new HashSet<>();
        load = new HashSet<>();
        complete = new HashSet<>();
    }


    public void finish()  
    {   
        for (String s:reference) 
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

        super.finish();
    }


    public void printJSName(String packagename, String uniquename) 
    {   
        StringTokenizer t = new StringTokenizer(packagename,".");
        if (t.countTokens()==0) 
        {   print("__");
        }
        else 
        {   while (t.hasMoreElements()) 
            {   // printIdentifier(t.nextToken());
                print(escapeIdentifier(t.nextToken(),"","$",null));
                print("_");
            }
        }
        printIdentifier(uniquename);
    }

    public void printAndMemorizeReference(String packagename, String uniquename) 
    {   
        memorizeReference(packagename,uniquename);
        printJSName(packagename,uniquename);
    }
    public void printAndMemorizeLoad(String packagename, String uniquename) 
    {   
        memorizeLoad(packagename,uniquename);
        printJSName(packagename,uniquename);
    }
    public void printAndMemorizeComplete(String packagename, String uniquename) 
    {   
        memorizeComplete(packagename,uniquename);
        printJSName(packagename,uniquename);
    }

    public void memorizeReference(String packagename, String uniquename) 
    {    
        mem(reference,packagename,uniquename);
    }
    public void memorizeLoad(String packagename, String uniquename) 
    {   
        mem(load, packagename, uniquename);		
    }
    public void memorizeComplete(String packagename, String uniquename) 
    {       
        mem(complete, packagename, uniquename);	
    }
    private void mem(HashSet<String>storage, String packagename, String uniquename) 
    {   
        if (! (packagename.equals("java.lang") && (uniquename.equals("String")||uniquename.equals("CharSequence")) )) 
        {   storage.add(escapePackagePath(packagename,escapesign) 
            + escapeIdentifier(uniquename,"",escapesign,null));
        }
    }
    
    
}

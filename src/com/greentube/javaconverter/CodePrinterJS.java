package com.greentube.javaconverter;

import java.io.*;
import java.util.*;

public class CodePrinterJS 
{  
    // general code generation
    File outputfolder;
    OutputStreamWriter ow;
    boolean linehasstarted;
    int indent;

    private HashSet<String> reference;
    private HashSet<String> load;
    private HashSet<String> complete;

    public CodePrinterJS(File outputfolder, String filename) 
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
        
        reference = new HashSet<>();
        load = new HashSet<>();
        complete = new HashSet<>();
    }

    public CodePrinterJS(CodePrinterJS p, String filename) 
    {   
        this(p.outputfolder,filename);
    }

    public void finish()  
    {   
        printExternals();
        try 
        {   ow.close();
        } 
        catch (IOException e) 
        {   e.printStackTrace();
            throw new RuntimeException(e.getMessage());
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
    {   
        String escaped = escapeIdentifier(id,false) + suffix;
        if (javascriptreserved.contains(escaped)) print("$");        
        print(escaped);
    }
    
    public void printJSIdentifier(String id) 
    {   
        printJSIdentifier(id,"");
    }

    public void printJSName(String packagename, String uniquename) 
    {   
        StringTokenizer t = new StringTokenizer(packagename,".");
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
        {   storage.add(escapePackagePath(packagename) + escapeIdentifier(uniquename,true));
        }
    }

    public void printExternals() 
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
    }
}

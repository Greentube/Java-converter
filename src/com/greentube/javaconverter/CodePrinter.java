package com.greentube.javaconverter;

import java.io.*;
import java.util.*;

public class CodePrinter 
{   // general code generation
    File outputfolder;
    OutputStreamWriter ow;
    boolean linehasstarted;
    int indent;
    boolean afteropeningbrace;
    
    public CodePrinter(File outputfolder, String filename) 
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
    }

    public CodePrinter(CodePrinter p, String filename) 
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
    
    public void println(String s)
    {
        print(s);
        println();
    }
    
    public void copyDirectlyAndCloseInput(InputStream is)
    {
        try
        {   InputStreamReader r = new InputStreamReader(is, "utf-8");        
            char[] buffer = new char[1000];        
            int l; 
            while ( (l = r.read(buffer,0,buffer.length)) >= 0)
            {       ow.write(buffer,0,l);
            }
            is.close();
        }        
        catch (IOException e) 
        {   throw new RuntimeException(e.getMessage());
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

}

package com.greentube.javaconverter;

import java.io.*;
import java.util.*;

public class CodePrinter 
{   final String escapesign;    
    final HashSet<String> reservedidentifiers;

    // general code generation
    File outputfolder;
    OutputStreamWriter ow;
    boolean linehasstarted;
    int indent;
    boolean afteropeningbrace;
    char lastchar;
    
    public CodePrinter(File outputfolder, String filename, String escapesign, HashSet<String> reservedidentifiers) 
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
        this.escapesign = escapesign;
        this.reservedidentifiers = reservedidentifiers;
        this.lastchar = 0;
    }

    public File getOutputFolder()
    {
        return outputfolder;
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
        if (s.length()<1) { return; }
        try        
        {   if (!linehasstarted) 
            {   for (int i=0; i<indent; i++) ow.write("    ",0,4);
                linehasstarted=true;
            }
            
            // prevent clashing '-' and '+' operators 
            if ( lastchar==s.charAt(0) && (lastchar=='-' || lastchar=='+') ) 
            {   ow.write(' ');
            }
            
            ow.write(s,0,s.length());
            afteropeningbrace = s.equals("{");
            lastchar = s.charAt(s.length()-1);
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
    
    public void printIdentifier(String id)
    {
        print(escapeIdentifier(id,"",escapesign,reservedidentifiers));
    }
    
    public void printIdentifier(String id,String suffix)
    {
        print(escapeIdentifier(id,suffix,escapesign,reservedidentifiers));
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
    
    public static String escapeIdentifier(
        String id, String suffix,
        String escapesign, HashSet<String> reservedidentifiers) 
    {   
        // escape special characters, so the output will never have characters >127
        StringBuffer b = new StringBuffer();
        for (int i=0; i<id.length(); i++) 
        {   char c = id.charAt(i);
            if
            (   (c>='a' && c<='z')
                || (c>='A' && c<='Z')
                || (c>='0' && c<='9')
            )
            {   b.append(c);
            }
            else 
            {   b.append(escapesign);
                String h = Integer.toHexString(c);
                for (int pad=h.length(); pad<4; pad++) { b.append("0"); } 
                b.append(h);
            }
        }
        String e = b.toString() + suffix;
        while (reservedidentifiers!=null && reservedidentifiers.contains(e))
        {   e = escapesign + e;
        }
        return e;
    }

    public static String escapePackagePath(String packagename,String escapesign) 
    {   
        StringBuffer b = new StringBuffer();
        for (StringTokenizer t = new StringTokenizer(packagename,"."); t.hasMoreElements(); ) 
        {   b.append(escapeIdentifier(t.nextToken(),"",escapesign,null));
            b.append("/");
        }
        return b.toString();
    }

}

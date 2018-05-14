package com.greentube.javaconverter;

import java.io.*;
import java.net.*;
import java.util.*;
import org.extendj.ast.*;

public class JavaConverter extends Frontend 
{   private File destDirJS;
    private File destDirCS;
    private int err;

    public JavaConverter() 
    {   super("JavaConverter", JavaConverter.class.getPackage().getImplementationVersion());
        destDirJS=null;
        destDirCS=null;
        err = 0;
    }
    
    public int run(String args[]) 
    {   Vector<String> argv= new Vector<String>(Arrays.asList(args));

        // use default bootclasspath from the converter itself if not defined otherwise
        if (!argv.contains("-bootclasspath"))
        {   URL res = JavaConverter.class.getResource("/com/greentube/javaconverter/JavaConverter.class");
            if (res!=null) 
            {   String p = res.toString();
                if (p.startsWith("jar:")) 
                {   int idx = p.indexOf("file:");   
                    if (idx>=0) p=p.substring(idx+5);
                    idx = p.indexOf('!');
                    if (idx>=0) p=p.substring(0, idx);			
                    argv.add("-bootclasspath");                
                    argv.add(p);
                }
                else 
                {   p = res.getPath();
                    if (p.startsWith("file:")) p = p.substring(5);
                    int idx = p.lastIndexOf('/');
                    if (idx>0) p=p.substring(0, idx);
                    p = p+"/../../../../rt.jar";
                    argv.add("-bootclasspath");
                    argv.add(p);
                }
            }
        }

        int parseerr = run
        (   argv.toArray(new String[0]), 
            Program.defaultBytecodeReader(), 
            Program.defaultJavaParser()
        );
        if (parseerr + err>0) 
        {   System.out.println("Total conversion errors: "+(parseerr+err));
        }
        return parseerr+err;
    }

    @Override
    protected void processNoErrors(CompilationUnit unit) 
    {   LibraryList.buildList();
        ArrayList<String> errorlist = new ArrayList<String>(0);        
        unit.checkRestrictions(errorlist);
        if (errorlist.size()==0) 
        {   if (destDirJS!=null) 
            {   try 
                {   unit.generateJS(destDirJS);
                }
                catch (RuntimeException e) 
                {   errorlist.add(e.getMessage());
                }
            }
            if (destDirCS!=null) 
            {   try 
                {   unit.generateCS(destDirCS);
                }
                catch (RuntimeException e) 
                {   errorlist.add(e.getMessage());
                }
            }
        }
        for (String s:errorlist) 
        {   System.out.println(unit.pathName()+":"+s);
        }
        err += errorlist.size();
    }

    @Override
    protected void initOptions() 
    {   super.initOptions();	
        Options options = program.options();		
        options.addKeyValueOption("-js");
        options.addKeyValueOption("-cs");
    }

    @Override
    public int processArgs(String[] args) 
    {   int result = super.processArgs(args);
        if (result != 0) 
        {   return result;
        }
        if (program.options().hasValueForOption("-js")) 
        {   String d = program.options().getValueForOption("-js");
            destDirJS = new File(d);
            if (!destDirJS.isDirectory()) 
            {   if (!destDirJS.mkdirs()) 
                {   System.err.println
                    (   "Error: output directory for javascript files not found and could not be created: " 
                        + destDirJS
                    );
                }
                return EXIT_CONFIG_ERROR;
            }
        }
        if (program.options().hasValueForOption("-cs")) 
        {   String d = program.options().getValueForOption("-cs");
            destDirCS = new File(d);
            if (!destDirCS.isDirectory()) 
            {   if (!destDirCS.mkdirs())
                {   System.err.println
                    (   "Error: output directory for csharp files not found and could not be created: " 
                        + destDirCS
                    );
                }
                return EXIT_CONFIG_ERROR;
            }
        }
        return EXIT_SUCCESS;
    }

    protected void printUsage() {
        super.printUsage();
        System.out.println(
            "  -js                       Directory where to store javascript files\n"
          + "  -cs                       Directory where to store c# files" );
          
    }

    public static void main(String args[]) 
    {   // add possibility to launch the linker instead of the the converter
        if (args.length>0 && args[0].equals("link")) 
        {   String roots = null;
            String searchpath = null;
            String outputfile = null;
            String startupcode = null;
            boolean production = false;
            
            for (int i=1; i<args.length-1; i++) 
            {   if (args[i].equals("-root")) 
                {   roots = args[i+1];
                    i++;
                }
                else if (args[i].equals("-searchpath")) 
                {   searchpath = args[i+1];
                    i++; 
                } 
                else if (args[i].equals("-output")) 
                {   outputfile = args[i+1];
                    i++; 
                }
                else if (args[i].equals("-startup")) 
                {   startupcode = args[i+1];
                    i++; 
                }
                else if (args[i].equals("-production"))
                {   production = true;                
                }
            }
            try 
            {   JavaScriptLinker.link(roots, searchpath, outputfile, startupcode, production);
            }
            catch (IOException e) 
            {   System.err.println(e.getMessage());
            }
        }
        // converter operation
        else 
        {   int exitCode = new JavaConverter().run(args);
            if (exitCode != 0) 
            {   System.exit(exitCode);
            }
        }
    }
}

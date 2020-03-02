package com.greentube.javaconverter;

import java.io.*;
import java.net.*;
import java.util.*;
import org.extendj.ast.*;

public class JavaConverter extends Frontend 
{   private File destDirJS;
    private File destDirCS;
    private boolean writecsruntime;
    private File sourceDirCSRuntime;
    private int err;

    public JavaConverter() 
    {   
        super("JavaConverter", JavaConverter.class.getPackage().getImplementationVersion());
        destDirJS=null;
        destDirCS=null;
        err = 0;
    }
    
    public int run(String args[]) 
    {   
        Vector<String> argv= new Vector<String>(Arrays.asList(args));

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
        
        else if (destDirCS!=null && writecsruntime) 
        {   // extract included cs library classes from package and copy to destination
            try
            {   for (String cn:LibraryList.getRuntimeClassList())                
                {   if 
                    (   cn.equals("java.lang.Deprecated") 
                        || cn.equals("java.lang.FunctionalInterface")
                        || cn.equals("java.lang.Override")
                        || cn.equals("java.lang.SafeVarargs")
                        || cn.equals("java.lang.SuppressWarnings")
                        || cn.equals("java.lang.Object")
                        || cn.equals("java.lang.String")
                    )
                    {   continue;
                    }
                    if (cn.equals("java.lang.System")) { cn="java.lang.SYSTEM"; }
                    String filename = cn.replace('.','/') + ".cs";
                    InputStream is = null;
                    // use overridden library path
                    if (sourceDirCSRuntime!=null)
                    {   File test = new File(sourceDirCSRuntime, filename);
                        if (test.exists()) 
                        {   try { is = new FileInputStream(test); } catch (IOException e) {}
                        } 
                    }
                    // extract from compiler itself  
                    if (is==null)
                    {   is = this.getClass().getResourceAsStream("/runtimecs/"+filename);
                    }
                    if (is==null) 
                    {   throw new RuntimeException("Can not extract C# library file "+filename);
                    }                            
                    CodePrinter out = new CodePrinterCS(destDirCS, filename);                        
                    out.copyDirectlyAndCloseInput(is);
                    out.finish();
                }     
            }
            catch (RuntimeException e)
            {   err++;
                System.out.println(e.getMessage());
            }               
        }
        
        return parseerr+err;
    }

    @Override
    protected void processNoErrors(CompilationUnit unit) 
    {   
        ArrayList<String> errorlist = new ArrayList<String>(0);
        try
        {   unit.checkRestrictions(errorlist);
        }
        catch (RuntimeException e) 
        {   e.printStackTrace(System.out);
            errorlist.add(e.getMessage());
        }
        
        if (errorlist.size()==0) 
        {   if (destDirJS!=null) 
            {   try 
                {   unit.generateJS(destDirJS);
                }
                catch (RuntimeException e) 
                {   e.printStackTrace(System.out);
                    errorlist.add(e.getMessage());
                }
            }
            if (destDirCS!=null) 
            {   try 
                {   unit.generateCS(destDirCS);       
                }
                catch (RuntimeException e) 
                {   e.printStackTrace(System.out);
                    errorlist.add(e.getMessage());
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
    {   
        super.initOptions();	
        Options options = program.options();		
        options.addKeyValueOption("-js");
        options.addKeyValueOption("-cs");
        options.addKeyValueOption("-csruntime");
        options.addKeyOption("-allowlong");
    }

    @Override
    public int processArgs(String[] args) 
    {   
        int result = super.processArgs(args);
        if (result != 0) 
        {   return result;
        }

        LibraryList.allow_long = program.options().hasOption("-allowlong");
        
        if (program.options().hasValueForOption("-js")) 
        {   String d = program.options().getValueForOption("-js");
            destDirJS = new File(d);
            if (!destDirJS.isDirectory()) 
            {   if (!destDirJS.mkdirs()) 
                {   System.out.println
                    (   "Error: output directory for javascript files not found and could not be created: " 
                        + destDirJS
                    );
                    return EXIT_CONFIG_ERROR;
                }
            }
            if (LibraryList.allow_long) 
            {
            	System.out.println("Error: can not generate javascript when long datatype is allowed"); 
                return EXIT_CONFIG_ERROR;
            }
        }
        if (program.options().hasValueForOption("-cs")) 
        {   String d = program.options().getValueForOption("-cs");
            destDirCS = new File(d);
            if (!destDirCS.isDirectory()) 
            {   if (!destDirCS.mkdirs())
                {   System.out.println
                    (   "Error: output directory for csharp files not found and could not be created: " 
                        + destDirCS
                    );
                    return EXIT_CONFIG_ERROR;
                }
            }
        }
        if (program.options().hasValueForOption("-csruntime")) 
        {   writecsruntime = true;
            String d = program.options().getValueForOption("-csruntime");
            if (!d.equalsIgnoreCase("true") && !d.equalsIgnoreCase("yes"))
            {   sourceDirCSRuntime = new File(d);
            }
        }
        return EXIT_SUCCESS;
    }

    protected void printUsage() 
    {
        super.printUsage();
        System.out.println(
            "  -js                       Directory where to store javascript files\n"
          + "  -cs                       Directory where to store c# files\n"
          + "  -csruntime                Also write C# runtime library files to output folder\n"
          + "  -recursive                Convert all .java files in this directory and sub-directories"); 

    }

    public static int mainWithExitCode(String args[]) 
    {   
        // add possibility to launch the linker instead of the the converter
        if (args.length>0 && args[0].equals("link")) 
        {   String roots = null;
            String searchpath = null;
            String outputfile = null;
            String startupcode = null;
            
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

            }
            try 
            {   JavaScriptLinker.link(roots, searchpath, outputfile, startupcode);
                return 0;
            }
            catch (IOException e) 
            {   System.out.println(e.getMessage());
                return 1;
            }
        }
        
        // converter operation: 
        // patch arguments for possibility to specify all files in a folder for conversion        
        else 
        {   ArrayList<String> a = new ArrayList<>();
            ArrayList<File> files = new ArrayList<>();
            for (int i=0; i<args.length; i++)
            {   if (args[i].equals("-recursive") && i+1<args.length)
                {   if (!scanRecursively(new File(args[i+1]), files))
                    {   System.out.println("Can not find source directory: "+args[i+1]);
                        return 1;
                    }
                    i++;   
                }
                else
                {   a.add(args[i]);
                }
            }
            for (int i=0; i<files.size(); i++)
            {   a.add(files.get(i).getPath());
            }

            return new JavaConverter().run(a.<String>toArray(new String[0]));
        }
    }

    public static void main(String args[])
    {
        int exitCode = mainWithExitCode(args);
        if (exitCode!=0) System.exit(exitCode);
    } 

    public static boolean scanRecursively(File directory, ArrayList<File>files)
    {
        if (!directory.isDirectory()) { return false; }
        for (File f:directory.listFiles())
        {   
            if (f.isFile() && f.getName().endsWith(".java"))
            {   files.add(f);
            }
            else 
            {   scanRecursively(f, files);
            }
        }        
        return true;
    } 
}

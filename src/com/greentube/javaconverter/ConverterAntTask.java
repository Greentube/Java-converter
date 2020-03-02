package com.greentube.javaconverter;

import java.io.*;
import java.util.*;
import org.apache.tools.ant.*;
import org.apache.tools.ant.types.*;

public class ConverterAntTask extends Task 
{   
    private List<FileSet> filesets = new LinkedList<>();    
    public void addFileset(FileSet fs) 
    {       
        filesets.add(fs);
    }
    private File jsdir;
    public void setJs(File destdir) 
    {   
        this.jsdir = destdir;
    }
    private File csdir=null;
    public void setCs(File destdir) 
    {   
        this.csdir = destdir;
    }
    private String csruntime=null;
    public void setCsruntime(String f)
    {   csruntime = f;
    }
    private boolean allowlong=false;
    public void setAllowLong(String v)
    {   allowlong = v.toLowerCase().equals("true");
    }
    private String classpath=null;
    public void setClasspath(String path) 
    {   
        this.classpath = path;
    }
    private boolean verbose=false;
    public void setVerbose(String v) 
    {   
        this.verbose = v.toLowerCase().equals("true");
    }
    

    public void execute() throws BuildException 
    {   
        Vector<String> args = new Vector<>();
        if (jsdir!=null) 
        {   args.add("-js");
            args.add(jsdir.toString());
        }
        if (csdir!=null) 
        {   args.add("-cs");
            args.add(csdir.toString());
        }
        if (csruntime!=null)
        {   args.add("-csruntime");
            args.add(csruntime);
        }
        if (allowlong)
        {   args.add("-allowlong");
        }
        if (classpath!=null) 
        {   args.add("-classpath");
            args.add(classpath);
        }
        if (verbose)
        {   args.add("-verbose");
        }

        for (int i=0; i<filesets.size(); i++)
        {   FileSet fs = (FileSet)filesets.get(i);
            DirectoryScanner ds = fs.getDirectoryScanner(getProject());
            File sourcedir = ds.getBasedir();
            String[] relativepaths = ds.getIncludedFiles();                        
            for (int j=0; j<relativepaths.length; j++) 
            {   args.add(new File(sourcedir, relativepaths[j]). getAbsolutePath());
            }
        }

        try 
        {   String[] aa = new String[args.size()];
            args.copyInto(aa);
            int err = (new JavaConverter()).run(aa);
            if (err>0) throw new BuildException("Converter terminated with "+err+" errors");
        } 
        catch (Exception e) 
        {   throw new BuildException
            ("Error when converting file in Convert task", e, getLocation()
            );
        }
    }

}

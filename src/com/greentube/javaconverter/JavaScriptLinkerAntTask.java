package com.greentube.javaconverter;

import java.io.*;
import org.apache.tools.ant.*;

public class JavaScriptLinkerAntTask extends Task 
{   
    private String roots = null;
    public void setRoot(String fnames) 
    {   
        this.roots = fnames;
    }
    private String outputfile = null;
    public void setOutput(String fname) 
    {   this.outputfile = fname;
    }
    private String searchpath = null;
    public void setSearchPath(String searchpath) 
    {   this.searchpath = searchpath;
    }
    private String startupcode = null;
    public void setStartup(String code) 
    {   this.startupcode = code;
    }
    private boolean production = false;    
    public void setProduction(boolean prod)
    {   this.production = prod;
    }

    public void execute() throws BuildException 
    {   
        try 
        {   JavaScriptLinker.link(roots, searchpath, outputfile, startupcode, production);
        }
        catch (IOException e)
        {   throw new BuildException(e.getMessage());
        }
    }
}

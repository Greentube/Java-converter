package com.greentube.javaconverter;

import java.io.*;
import org.apache.tools.ant.*;

public class JavaScriptLinkerAntTask extends Task 
{   private String mainfile = null;
    private String searchpath = null;
    private String outputfile = null;
    private boolean production = false;
    
    public void setMain(String fname) 
    {  this.mainfile = fname;
    }
    public void setOutput(String fname) 
    {   this.outputfile = fname;
    }
    public void setSearchPath(String searchpath) 
    {   this.searchpath = searchpath;
    }
    public void setProduction(boolean prod)
    {   this.production = prod;
    }

    public void execute() throws BuildException 
    {   try 
        {   JavaScriptLinker.link(mainfile, searchpath, outputfile, production);
        }
        catch (IOException e)
        {   throw new BuildException(e.getMessage());
        }
    }
}

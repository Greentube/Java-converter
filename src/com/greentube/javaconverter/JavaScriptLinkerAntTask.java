/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.greentube.javaconverter;

import java.io.IOException;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;

public class JavaScriptLinkerAntTask extends Task {
	
	private String mainfile = null;
	private String searchpath = null;
	private String outputfile = null;
	
	
	public void setMain(String fname) {
		this.mainfile = fname;
	}
		
	public void setOutput(String fname) {
		this.outputfile = fname;
	}
	
	public void setSearchPath(String searchpath) {
		this.searchpath = searchpath;
	}
	

    public void execute() throws BuildException {

        try {
        	JavaScriptLinker.link(mainfile, searchpath, outputfile);
        } 
        catch (IOException e)
        {
        	throw new BuildException(e.getMessage());
        }
    }
}

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.greentube.javaconverter.linker;

import java.io.File;
import java.util.StringTokenizer;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;

public class JavaScriptLinkerAntTask extends Task {
	
	private String mainfile = null;
	private File[] searchpath = new File[0];
	private File outputfile = null;
	
	
	public void setMainfile(String fname) {
		this.mainfile = fname;
	}
		
	public void setOutput(String fname) {
		this.outputfile = new File(fname);
	}
	
	public void setSearchpath(String commaseperated) {
		StringTokenizer t = new StringTokenizer(commaseperated, ",");
		int n = t.countTokens();
		File[] cp = new File[searchpath.length+n];
		System.arraycopy(searchpath, 0, cp, 0, searchpath.length);		
		for (int i=0; i<n; i++) {
			cp[searchpath.length+i] = new File(t.nextToken().trim());
		}
		searchpath = cp;
	}
	

    public void execute() throws BuildException {
        if (mainfile == null) {
            throw new BuildException("No main file given in JavaScriptLink task", getLocation());
        }
        if (outputfile == null) {
            throw new BuildException("No destination file given in JavaScriptLink task", getLocation());
        }
        
        try {
        	JavaScriptLinker.link(mainfile, searchpath, outputfile);
        } 
        catch (Exception e)
        {
        	throw new BuildException("Internal error in JavaScript linker: "+e.getMessage());
        }
    }
}

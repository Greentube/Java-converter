/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.greentube.javaconverter;

import java.io.File;
import java.util.LinkedList;
import java.util.List;
import java.util.Vector;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.DirectoryScanner;
import org.apache.tools.ant.types.FileSet;
import org.apache.tools.ant.Task;


public class ConverterAntTask extends Task {

    private List filesets = new LinkedList();
    public void addFileset(FileSet fs) {
        filesets.add(fs);
    }

    private File jsdir;
    public void setJs(File destdir) {
        this.jsdir = destdir;
    }
    
    private File csdir=null;
    public void setCs(File destdir) {
        this.csdir = destdir;
    }

//    private File externaldir=null;
//    public void setExternal(File extdir) {
//        this.externaldir = extdir;
//    }
    
    public void execute() throws BuildException {

    	Vector args = new Vector();
        args.add("-bootclasspath");
        args.add("C:/Users/rgraf/Documents/java-converter/rt.jar");
        args.add("-classpath");
        args.add("C:/Users/rgraf/Documents/java-converter/bin");
        if (jsdir!=null) { 
        	args.add("-js");
        	args.add(jsdir.toString());
        }
        if (csdir!=null) { 
        	args.add("-cs");
        	args.add(csdir.toString());
        }
        
        for (int i=0; i<filesets.size(); i++) {
            FileSet fs = (FileSet)filesets.get(i);
            DirectoryScanner ds = fs.getDirectoryScanner(getProject());
            File sourcedir = ds.getBasedir();
            String[] relativepaths = ds.getIncludedFiles();
                        
            for (int j=0; j<relativepaths.length; j++) {
            	args.add(new File(sourcedir, relativepaths[j]). getAbsolutePath());
            }
        }
        
        try {
        	String[] aa = new String[args.size()];
        	args.copyInto(aa);
            int err = (new Converter()).run(aa);
            if (err>0) throw new BuildException("Converter terminated with "+err+" errors");
        } catch (Exception e) {
            throw new BuildException("Error when converting file in Convert task", e, getLocation());
        }

    }

}

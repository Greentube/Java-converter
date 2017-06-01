/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.greentube.javaconverter.source2source;

import java.io.File;
import java.util.LinkedList;
import java.util.List;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.DirectoryScanner;
import org.apache.tools.ant.types.FileSet;


public class Java2JavaScriptAntTask extends BigStackAntTask {

    private List filesets = new LinkedList();
    public void addFileset(FileSet fs) {
        filesets.add(fs);
    }

    private File destdir;
    public void setDest(File destdir) {
        this.destdir = destdir;
    }

    private File externaldir;
    public void setExternal(File extdir) {
        this.externaldir = extdir;
    }
    
    public void executeWithLargeStack() throws BuildException {

        File sourcedir = null;
        String[] relativepaths;

        if (destdir == null) {
            throw new BuildException("No destination directory given in ConvertJava2JavaScript task", getLocation());
        }

        destdir.delete();
        destdir.mkdir();

        for (int i=0; i<filesets.size(); i++) {
            FileSet fs = (FileSet)filesets.get(i);
            DirectoryScanner ds = fs.getDirectoryScanner(getProject());
            sourcedir = ds.getBasedir();
            relativepaths = ds.getIncludedFiles();
            try {
                Java2JavaScriptConverter.startConversion(sourcedir, destdir, externaldir, relativepaths);
            } catch (Exception e) {
                throw new BuildException("Error when converting file in ConvertJava2JavaScript task", e, getLocation());
            }
        }

    }

}

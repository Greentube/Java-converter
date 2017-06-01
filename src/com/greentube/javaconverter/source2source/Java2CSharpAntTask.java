package com.greentube.javaconverter.source2source;

import com.greentube.javaconverter.source2source.Java2CSharpAntTask.Obfuscation.Entry;
import java.io.File;
import java.io.IOException;
import java.util.Hashtable;
import java.util.LinkedList;
import java.util.List;
import java.util.StringTokenizer;
import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.DirectoryScanner;
import org.apache.tools.ant.types.FileSet;

/**
 * @author mgrum
 */
public class Java2CSharpAntTask extends BigStackAntTask {

    public static class Obfuscation {
        public static class Entry {
            private String from;
            private String to;
            public String getFrom() {
                return from;
            }
            public void setFrom(String from) {
                this.from = from;
            }
            public String getTo() {
                return to;
            }
            public void setTo(String to) {
                this.to = to;
            }
        }
        private File file;
        private String prefix;
        private File log;
        private List entrylist = new LinkedList();
        public void setFile(File file) {
            this.file = file;
        }
        public void setLog(File log) {
            this.log = log;
        }
        public void setPrefix(String prefix) {
            this.prefix = prefix;
        }
        public File getFile() {
            return file;
        }
        public File getLog() {
            return log;
        }
        public String getPrefix() {
            return prefix;
        }
        public List getEntryList() {
            return entrylist;
        }
        public void addEntry(Entry entry) {
            entrylist.add(entry);
        }
    }
    private List obfuscations = new LinkedList();
    public Obfuscation createObfuscation() {
        Obfuscation n = new Obfuscation();
        obfuscations.add(n);
        return n;
    }

    private List filesets = new LinkedList();
    public void addFileset(FileSet fs) {
        filesets.add(fs);
    }

    private File destdir;
    public void setDest(File destdir) {
        this.destdir = destdir;
    }

    private boolean skipConversion = false;
    public void setUnless(String skipConversionString) {
        this.skipConversion = skipConversionString.equals("true");
    }

    public void executeWithLargeStack() throws BuildException {

        if (skipConversion) {
            System.out.println("skipping conversion");
            return;
        }

        File sourcedir = null;
        Hashtable obfuscationtable = null;
        String obfuscationprefix = null;

        if (destdir == null) {
            throw new BuildException("No destination directory given in ConvertJava2CSharp task", getLocation());
        }

        if (obfuscations.size()>1) {
            throw new BuildException("Only one obfuscation tag allowed in ConvertJava2CSharp task", getLocation());
        }

        destdir.delete();
        destdir.mkdir();

        File log = null;

        if (obfuscations.size() == 1) {
            Obfuscation o = (Obfuscation)obfuscations.get(0);
            obfuscationprefix = o.getPrefix();
            File f = o.getFile();
            log = o.getLog();
            System.out.println("log " + log);
            if (f == null) {
                throw new BuildException("Obfuscation file missing in ConvertJava2CSharp task", getLocation());
            }
            try {
                obfuscationtable = AnyConverter.readObfuscationTable(f.getCanonicalPath());
            } catch (IOException ex) {
                throw new BuildException("Error when reading obfuscation file in ConvertJava2CSharp task", ex, getLocation());
            }
            List l = o.getEntryList();
            for (int i=0; i<l.size(); i++) {
                Entry e = (Entry)l.get(i);                
                obfuscationtable.put(e.getFrom(), e.getTo());
                
                StringTokenizer tokenizer = new java.util.StringTokenizer(e.getFrom(), ".");
                while(tokenizer.hasMoreTokens())
                {
                    String token = tokenizer.nextToken();
                    obfuscationtable.put(token, token);
                }
                
                
            }
            if (obfuscationprefix != null) {
                obfuscationtable.put("!prefix!", "V"+(obfuscationprefix.toLowerCase()));
            }
        }
        
        for (int i=0; i<filesets.size(); i++) {
            FileSet fs = (FileSet)filesets.get(i);
            DirectoryScanner ds = fs.getDirectoryScanner(getProject());
            sourcedir = ds.getBasedir();
            try {
                //Java2CSharpConverter.startConversion(sourcedir, destdir, relativepaths, obfuscationtable, log, as3);
            	Java2CSharpConverter.main(new String[]{sourcedir.getPath(), destdir.getPath(), "."});
            } catch (Exception e) {
                throw new BuildException("Error when converting file in ConvertJava2CSharp task", e, getLocation());
            }
        }

    }

}

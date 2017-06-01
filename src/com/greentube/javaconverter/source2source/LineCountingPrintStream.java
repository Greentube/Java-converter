/*
 * LineCountingPrintStream.java
 *
 * Created on 02. Februar 2007, 09:44
 */

package com.greentube.javaconverter.source2source;
import java.io.*;

/**
 *
 * @author  reinhard
 */
public class LineCountingPrintStream extends PrintStream {
    int bytecounter;
    int linecounter;

    /** Creates a new instance of LineCountingPrintStream */
    public LineCountingPrintStream(OutputStream os) {
        super(os);
        bytecounter=0;
        linecounter=0;
    }

    public void write(byte[] buf, int off, int len) {
        for (int i=0; i<len; i++) write(buf[off+i]);
    }

    public void write(int b) {
        super.write(b);
        if (b=='\n' || b=='\r') {
            if (bytecounter>0) {
                linecounter++;
                bytecounter=0;
            }
        } else {
            bytecounter++;
        }
    } 

    public int getNumberOfLines() {
        if (bytecounter>0) return linecounter+1;
        else               return linecounter;
    }

}

package com.greentube.javaconverter;

import java.io.OutputStream;
import java.io.PrintStream;

public class CodePrinter extends PrintStream {

	int indent = 0;
	
	public CodePrinter(OutputStream out) {
		super(out);		
		indent = 0;
	}
	
	public void increaseIndent() {
		indent++;
	}
	
	public void decreaseIndent() {
		indent--;
	}
	
	public void println() {
		super.println();
		for (int i=0; i<indent; i++) {
			super.print("    ");
		}
	}
}

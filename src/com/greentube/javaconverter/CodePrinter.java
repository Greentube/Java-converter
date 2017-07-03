package com.greentube.javaconverter;

import java.io.OutputStream;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.util.HashSet;

public class CodePrinter extends PrintStream {
	
	private HashSet<String> reference;
	private HashSet<String> load;
	private HashSet<String> complete;
	
	String filename;
	int indent = 0;
	
	public CodePrinter(OutputStream out, String filename) throws UnsupportedEncodingException {
		super(out,false,"utf-8");
		
		this.filename = filename;
		indent = 0;
		reference = new HashSet();
		load = new HashSet();
		complete = new HashSet();
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
	
	public void error(String msg) {
		System.out.print("\nERR in "+filename+": "+msg);
		System.out.println();
//		(new Throwable()).printStackTrace(System.out);
	}	
	
	public void printLocalVariable(String name) {
		// check if this is a synthetic local variable name
		if (name.startsWith("@")) {
			print(name.substring(1));
			print("_s");
		} else {
			print(name);
			print("_l");
		}
	}
	
	public void printAndMemorizeReference(String filename) {
		print (filename.replace('/', '_'));
		reference.add(filename);
	}
	public void printAndMemorizeLoad(String filename) {
		print (filename.replace('/', '_'));
		load.add(filename);
	}
	public void printAndMemorizeComplete(String filename) {
		print (filename.replace('/', '_'));
		complete.add(filename);
	}
	
	public void memorizeReference(String filename) {
		reference.add(filename);
	}
	public void memorizeLoad(String filename) {
		load.add(filename);		
	}
	public void memorizeComplete(String filename) {
		complete.add(filename);	
	}
	
	public void printExternals() {
		for (String s:reference) {
			if (load.contains(s) || complete.contains(s)) continue;
			println();
			print("//reference// ");
			print(s);
		}
		for (String s:load) {
			if (complete.contains(s)) continue;
			println();
			print("//load// ");
			print(s);
		}
		for (String s:complete) {
			println();
			print("//complete// ");
			print(s);
		}
	}
}

package com.greentube.javaconverter;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.util.HashSet;

public class CodePrinter extends PrintStream {
	
	private HashSet<String> reference;
	private HashSet<String> load;
	private HashSet<String> complete;
	
	CodePrinter parent;
	File outputfolder;
	String filename;
	int indent = 0;
	int err = 0;
	
	private static OutputStream mkstream(File folder, String fname) throws IOException {
		File f = new File(folder,fname+".js");
		f.getParentFile().mkdirs();
		return new FileOutputStream(f);
	}
	
	public CodePrinter(File outputfolder, String filename) throws IOException {
		super(mkstream(outputfolder,filename),false,"utf-8");
					
		this.parent = null;
		this.filename = filename;
		this.outputfolder = outputfolder;
		
		indent = 0;
		reference = new HashSet();
		load = new HashSet();
		complete = new HashSet();
	}
	
	public CodePrinter(CodePrinter p, String filename) throws IOException {
		this(p.outputfolder,filename);
		parent = p;
	}
	
	public void finish() {
		printExternals();
		println();
		close();
	}
	
	public int getNumberOfErrors() {
		return err;
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
	
	public void countError() {
		if (parent!=null) parent.countError();
		err++;
	}
	public void error(String msg) {
		countError();
		System.out.print("\nERR in "+filename+": "+msg);
		System.out.println();
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

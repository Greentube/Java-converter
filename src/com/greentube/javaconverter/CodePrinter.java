package com.greentube.javaconverter;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintStream;
import java.util.HashSet;

public class CodePrinter {
	
	private HashSet<String> reference;
	private HashSet<String> load;
	private HashSet<String> complete;
	
	File outputfolder;
	OutputStreamWriter ow;
	
	boolean linehasstarted;
	int indent;
	
	
	public CodePrinter(File outputfolder, String filename) {
		try {
			File f = new File(outputfolder,filename);
			f.getParentFile().mkdirs();		
			this.ow = new OutputStreamWriter(new FileOutputStream(f), "utf-8");
		} catch (IOException e) {
  			e.printStackTrace();
  			throw new RuntimeException(e.getMessage());      			
		}
		
		this.outputfolder = outputfolder;		
		this.indent = 0;
		this.linehasstarted = false;
		
		reference = new HashSet();
		load = new HashSet();
		complete = new HashSet();
	}
	
	public CodePrinter(CodePrinter p, String filename) {
		this(p.outputfolder,filename);
	}
	
	public void finish()  {
		printExternals();
		try {
			ow.close();
		} catch (IOException e) {
  			e.printStackTrace();
  			throw new RuntimeException(e.getMessage());      			
		}
	}
	
	public void increaseIndent() {
		indent++;
	}
	
	public void decreaseIndent() {
		indent--;
	}
	
	public void print(String s) {
		try {
			if (!linehasstarted) {
				for (int i=0; i<indent; i++) {
					ow.write("    ",0,4);
				}
				linehasstarted=true;
			}
			ow.write(s,0,s.length());
		} catch (IOException e) {
  			e.printStackTrace();
  			throw new RuntimeException(e.getMessage());      			
		}
	}
	
	public void println() {
		print("\n");
		linehasstarted=false;
	}
		
	
	// --- functionality specific for javascript generation ---  
	
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
			print("//reference// ");
			print(s);
			println();
		}
		for (String s:load) {
			if (complete.contains(s)) continue;
			print("//load// ");
			print(s);
			println();
		}
		for (String s:complete) {
			print("//complete// ");
			print(s);
			println();
		}
	}
	
	// --- functionality specific for csharp code generation ---
	
	public void printCSUniqueName(String s) {
		print(s.replace('$', '_'));
	}
	public void printCSName(String constantpoolname) {
		if (constantpoolname.equals("java/lang/Object")) {
			print("System.Object");
		} else if (constantpoolname.equals("java/lang/String")) {
			print("System.String");
		} else if (constantpoolname.equals("java/lang/System")) {
			print("java.lang.SYSTEM");
		} else {
			print(constantpoolname.replace('$', '_').replace('/','.'));
		}
	}
	
}

package com.greentube.javaconverter;

import java.io.File;


import org.extendj.ast.CompilationUnit;
import org.extendj.ast.Frontend;
import org.extendj.ast.Program;

public class Converter extends Frontend {

	private File destDir;
	
	public Converter() {
		super("Converter", "0.0.1");
		destDir=null;
	}
	  
	public int run(String args[]) {
	    return run(args, Program.defaultBytecodeReader(), Program.defaultJavaParser());
	}

	@Override
	protected void processNoErrors(CompilationUnit unit) {
//		  unit.generateClassfile();
//		  System.out.println("Processing: "+unit.getClassSource().pathName());
		unit.generateJS(destDir);
	}

	@Override
	public int processArgs(String[] args) {
		int result = super.processArgs(args);
	    if (result != 0) {
	      return result;
	    }
	    if (program.options().hasValueForOption("-d")) {
	    	String d = program.options().getValueForOption("-d");
	    	destDir = new File(d);
	    	if (!destDir.isDirectory()) {
	    		System.err.println("Error: output directory not found: " + destDir);
	    		return EXIT_CONFIG_ERROR;
	    	}
	    }
	    return EXIT_SUCCESS;	
	}

	  
	  
	public static void main(String args[]) {
	    int exitCode = new Converter().run(args);
	    if (exitCode != 0) {
	    	System.exit(exitCode);
	    }
	}

}

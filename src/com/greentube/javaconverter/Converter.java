package com.greentube.javaconverter;

import java.io.File;
import java.util.ArrayList;

import org.extendj.ast.CompilationUnit;
import org.extendj.ast.Frontend;
import org.extendj.ast.Program;

public class Converter extends Frontend {

	private File destDir;
	private int err;
	
	public Converter() {
		super("Converter", "0.0.1");
		destDir=null;
		err = 0;
	}
	  
	public int run(String args[]) {
		run(args, Program.defaultBytecodeReader(), Program.defaultJavaParser());
		if (err>0) {
			System.out.println("Total conversion errors: "+err);
		}
	    return err;
	}

	@Override
	protected void processNoErrors(CompilationUnit unit) {
//		  unit.generateClassfile();
//		  System.out.println("Processing: "+unit.getClassSource().pathName());
		ArrayList<String> errorlist = new ArrayList<String>(0);
		unit.checkRestrictions(errorlist);
		if (errorlist.size()==0) {	
			try {
				unit.generateJS(destDir);
			} catch (RuntimeException e) {
				errorlist.add(e.getMessage());
			}
		}
		for (String s:errorlist) {
			System.out.println(unit.pathName()+": "+s);
		}			
		err += errorlist.size();
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

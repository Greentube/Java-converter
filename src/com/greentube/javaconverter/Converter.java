package com.greentube.javaconverter;

import java.io.File;
import java.util.ArrayList;

import org.extendj.ast.CompilationUnit;
import org.extendj.ast.Frontend;
import org.extendj.ast.Options;
import org.extendj.ast.Program;

public class Converter extends Frontend {

	private File destDirJS;
	private File destDirCS;
	private int err;
	
	public Converter() {
		super("Converter", "0.1.0");
		destDirJS=null;
		destDirCS=null;
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
		ArrayList<String> errorlist = new ArrayList<String>(0);
		unit.checkRestrictions(errorlist);
		if (errorlist.size()==0) {	
			if (destDirJS!=null) {
				try {
					unit.generateJS(destDirJS);
				} catch (RuntimeException e) {
					errorlist.add(e.getMessage());
				}
			}
			if (destDirCS!=null) {
				try {
					unit.generateCS(destDirCS);
				} catch (RuntimeException e) {
					errorlist.add(e.getMessage());
				}
			}			
		}
		for (String s:errorlist) {
			System.out.println(unit.pathName()+":"+s);
		}			
		err += errorlist.size();
	}

	@Override
	protected void initOptions() {
		super.initOptions();	
	    Options options = program.options();		
		options.addKeyValueOption("-js");
		options.addKeyValueOption("-cs");
	}
	
	@Override
	public int processArgs(String[] args) {
		int result = super.processArgs(args);
	    if (result != 0) {
	      return result;
	    }
	    if (program.options().hasValueForOption("-js")) {
	    	String d = program.options().getValueForOption("-js");
	    	destDirJS = new File(d);
	    	if (!destDirJS.isDirectory()) {
	    		System.err.println("Error: output directory for javascript files not found: " + destDirJS);
	    		return EXIT_CONFIG_ERROR;
	    	}
	    }
	    if (program.options().hasValueForOption("-cs")) {
	    	String d = program.options().getValueForOption("-cs");
	    	destDirCS = new File(d);
	    	if (!destDirCS.isDirectory()) {
	    		System.err.println("Error: output directory for csharp files not found: " + destDirCS);
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

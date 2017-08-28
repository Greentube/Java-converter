package com.greentube.javaconverter;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Vector;

import org.extendj.ast.CompilationUnit;
import org.extendj.ast.Frontend;
import org.extendj.ast.Options;
import org.extendj.ast.Program;

public class Converter extends Frontend {

	private File destDirJS;
	private File destDirCS;
	private int err;
	
	public Converter() {
		super("Converter", "0.2.0");
		destDirJS=null;
		destDirCS=null;
		err = 0;
	}
	  
	public int run(String args[]) {		
		Vector<String> argv= new Vector<String>(Arrays.asList(args));
        
		URL res = getClass().getResource("/com/greentube/javaconverter/Converter.class");
		if (res!=null) {
			String p = res.toString();
			if (p.startsWith("jar:")) {
				int idx = p.indexOf("file:");
				if (idx>=0) p=p.substring(idx+5);
				idx = p.indexOf('!');
				if (idx>=0) p=p.substring(0, idx);			
				argv.add("-bootclasspath");                
				argv.add(p);
			} else {
				p = res.getPath();
				if (p.startsWith("file:")) p = p.substring(5);
				int idx = p.lastIndexOf('/');
				if (idx>0) p=p.substring(0, idx);
				p = p+"/../../../../rt.jar";
				argv.add("-bootclasspath");                
				argv.add(p);
			}
		}
		
		err = run(argv.toArray(new String[0]), Program.defaultBytecodeReader(), Program.defaultJavaParser());
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
		// add possibility to launch the linker instead of the the converter
		if (args.length>0 && args[0].equals("link")) {			
			String mainfile = null;
			String searchpath = null;
			String outputfile = null;
			
			for (int i=1; i<args.length-1; i++) {
				if (args[i].equals("-main")) {
					mainfile = args[i+1];
					i++;
				} else if (args[i].equals("-searchpath")) {
					searchpath = args[i+1];
					i++; 
				} else if (args[i].equals("-output")) {
					outputfile = args[i+1];
					i++; 
				}				
			}			
			
			try {		
				JavaScriptLinker.link(mainfile, searchpath, outputfile);
			} catch (IOException e) {
				System.err.println(e.getMessage());
			}
			
		// converter operation
		} else {
			int exitCode = new Converter().run(args);
			if (exitCode != 0) {
				System.exit(exitCode);
			}
		}
	}

}

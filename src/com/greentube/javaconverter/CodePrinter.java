package com.greentube.javaconverter;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.StringTokenizer;

public class CodePrinter {
	// general code generation
	File outputfolder;
	OutputStreamWriter ow;
	
	boolean linehasstarted;
	int indent;
	
	// for javascript code
	private HashSet<String> reference;
	private HashSet<String> load;
	private HashSet<String> complete;
	
	// for c# code
	private HashSet<String> pendingLabels;	
	
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
		
		pendingLabels = new HashSet();
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
		if (pendingLabels.size()>0) {
			throw new RuntimeException("Unresolved label definitions: "+pendingLabels);
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

	public static String escapeIdentifier(String id, boolean allowDollarSign) {
		// escape special characters, so the output will never have characters >127
		StringBuffer b = new StringBuffer();
		for (int i=0; i<id.length(); i++) {
			char c = id.charAt(i);
			if ( (c>='a' && c<='z')
			||	 (c>='A' && c<='Z')
			||   (c>='0' && c<='9')
			||   (allowDollarSign && c=='$')) {
				b.append(c);
			} else {
				b.append("_");
				if (c=='_') { 
					// '_' escapes to '__' 
				} else {
					b.append(Integer.toHexString(c));
				}	
				b.append("_");
			}
		}
		return b.toString();
	}
	
	public static String escapePackagePath(String packagename) {
		StringBuffer b = new StringBuffer();
		for (StringTokenizer t = new StringTokenizer(packagename,"."); t.hasMoreElements(); ) {
			b.append(escapeIdentifier(t.nextToken(), true));
			b.append("/");
		}
		return b.toString();
	}

	
	// --- functionality specific for javascript generation ---  
	
	private static Set<String> javascriptreserved = new HashSet<String>(Arrays.asList(
			"abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch",
			"char", "class", "const", "continue", "debugger", "default", "delete", "do",
			"double", "else", "enum", "eval", "export", "extends", "false", "final",
			"finally", "float", "for", "function", "goto", "if", "implements", "import",
			"in", "instanceof", "int", "interface", "let", "long", "native", "new",
			"null", "package", "private", "protected", "public", "return", "short", "static",
			"super", "switch", "synchronized", "this", "throw", "throws", "transient", "true",
			"try", "typeof", "var" ,"void", "volatile", "while", "with", "yield",
			// keys with special meaning in javascript objects
			"toString", "length", "__proto__", "prototype"
	));
	
	public void printJSIdentifier(String id, String suffix) {
		String escaped = escapeIdentifier(id,false) + suffix;
		if (javascriptreserved.contains(escaped)) {
			print("$");
		}
		print(escaped);
	}
	
	public void printJSName(String packagename, String uniquename) {
		StringTokenizer t = new StringTokenizer(packagename,".");
		if (t.countTokens()==0) {
			print("__");
		} else {
			while (t.hasMoreElements()) {
				print(escapeIdentifier(t.nextToken(),false).replace('_', '$'));
				print("_");
			}
		}
		print(escapeIdentifier(uniquename,false).replace('_', '$'));
	}
	
	public void printAndMemorizeReference(String packagename, String uniquename) {
		memorizeReference(packagename,uniquename);
		printJSName(packagename,uniquename);
	}
	public void printAndMemorizeLoad(String packagename, String uniquename) {
		memorizeLoad(packagename,uniquename);
		printJSName(packagename,uniquename);
	}
	public void printAndMemorizeComplete(String packagename, String uniquename) {
		memorizeComplete(packagename,uniquename);
		printJSName(packagename,uniquename);
	}
	
	public void memorizeReference(String packagename, String uniquename) {
		mem(reference,packagename,uniquename);
	}
	public void memorizeLoad(String packagename, String uniquename) {
		mem(load, packagename, uniquename);		
	}
	public void memorizeComplete(String packagename, String uniquename) {
		mem(complete, packagename, uniquename);	
	}
	private void mem(HashSet<String>storage, String packagename, String uniquename) {
		if (! (packagename.equals("java.lang") && uniquename.equals("String") )) {
			storage.add(escapePackagePath(packagename) + escapeIdentifier(uniquename,true));
		}
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
	
	private static Set<String> csharpreserved = new HashSet<String>(Arrays.asList(
			"abstract", "as", "base", "bool", "break", "byte", "case", "catch",
			"char", "checked", "class", "const", "continue", "decimal", "default", "delegate",
			"do", "double", "else", "enum", "event", "explicit", "extern", "false",
			"finally", "fixed", "float", "for", "foreach", "goto", "if", "implicit",
			"in", "int", "interface", "internal", "is", "lock", "long",
			"namespace", "new", "null", "object", "operator", 	"out", "override",
			"params", "private", "protected", "public", "readonly", "ref", "return" ,"sbyte",
			"sealed", "short", "sizeof", "stackalloc", "static", "string", "struct", "switch",
			"this", "throw", "true", "try", "typeof", "uint", "ulong", "unchecked",
			"unsafe", "ushort", "using", "using", "static", "virtual", "void", "volatile", "while"						
	));
	
	public void printCSIdentifier(String id, String suffix) {
		String escaped = escapeIdentifier(id,false) + suffix;
		if (csharpreserved.contains(escaped)) {
			print("@");
		}
		print(escaped);
	}
	
	public void printCSUniqueName(String s) {		
		printCSIdentifier(s,"");
	}
	public void printCSPackageName(String s) {
		StringTokenizer t = new StringTokenizer(s,".");
		for (int i=0; t.hasMoreElements(); i++) {
			if (i>0) print(".");
			printCSIdentifier(t.nextToken(),"");
		}		
	}
	public void printCSName(String packagename, String uniquename) {
		if (packagename.equals("java.lang") && uniquename.equals("Object")) {
			print("System.Object");
		} else if (packagename.equals("java.lang") && uniquename.equals("String")) {
			print("System.String");
		} else if (packagename.equals("java.lang") && uniquename.equals("System")) {
			print("java.lang.SYSTEM");
		} else {
			StringTokenizer t = new StringTokenizer(packagename,".");
			while (t.hasMoreElements()) {
				printCSIdentifier(t.nextToken(),"");
				print(".");
			}
			printCSIdentifier(uniquename, "");
		}
	}
	
	public void printJumpToLabel(String l) {
		print("goto ");
		print(l);
		print(";");
		pendingLabels.add(l);
	}
	public void printAndForgetLabel(String l) {
		if (pendingLabels.contains(l)) {
			print(l);
			print(":;");
			pendingLabels.remove(l);
		}
	}
	
}

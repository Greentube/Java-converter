
package com.greentube.javaconverter.source2source;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.StringTokenizer;
import java.util.Vector;


public class Java2JavaScriptConverter extends AnyConverter {
	
	public static String REFERENCECOMMENT = "//reference// ";
	public static String LOADCOMMENT = "//load// ";
	public static String COMPLETECOMMENT = "//complete// ";
	
	private static boolean fClass;
	//private static String privateMemberPrefix;
	private static String packagename;
	private static String[] packagenameArray;
	private static Hashtable fullqualifiednames;
	private static Hashtable issecondaryclass;
	private static String[] classnamesinsamepackage;
		
    public static void startConversion(File sourcedir, File destdir, File externaldir, String[] relativepaths) {

        LineCountingPrintStream errStream = new LineCountingPrintStream(System.err);
        System.setErr(errStream);

        System.out.println ("Start converting...");

        int[] skipfilecounter = new int[1];
        int sumprocessed = 0;
        for (int i=0; i<relativepaths.length; i++) {
            String relpath = relativepaths[i];
            File f = new File(sourcedir,relpath);
            if ((!f.isFile()) && (!f.isDirectory())) {
                System.err.println ("Can not find file or directory: "+relpath);
            } else {
                sumprocessed += convert (sourcedir,destdir,externaldir,relpath,skipfilecounter);
            }
        }

        System.out.println ("Processed "+(sumprocessed-skipfilecounter[0])+" file(s).");
        System.out.println ("Skipped "+skipfilecounter[0]+" file(s).");
        if (errStream.getNumberOfLines()>0) {
            System.out.println ("Encountered "+errStream.getNumberOfLines()+" lines of errors");
        }
        if (errStream.getNumberOfLines() > 0) {
            throw new RuntimeException("Encountered "+errStream.getNumberOfLines()+" lines of errors");
        }
    }
    
    // convert one file or recursively a whole directory 
    // @returns: number of files processed
    public static int convert(File sourcedir, File destdir, File externaldir, String relativepath, int[] skipfilecounter) {
            
        File f = new File(sourcedir, relativepath);
        if (f.isDirectory()) {
            int count=0;
            File[] children = f.listFiles();
            for (int i=0; children!=null && i<children.length; i++) {
                String child = children[i].getName();
                if (!child.equalsIgnoreCase("classes")) {
                    count += convert(sourcedir, destdir, externaldir, relativepath+File.separator+child, 
                        skipfilecounter);                
                }
            }
            return count;
        }
        if (f.isFile() && f.getName().toLowerCase().endsWith(".java")) {
            try {
            	convertJavaFile(sourcedir,destdir,externaldir,relativepath,skipfilecounter);
            } catch (Exception e) {
            	System.err.println ("Internal error converting "+new File(sourcedir, relativepath));
            	e.printStackTrace();
            	return 0;
            }
            return 1;
        } else {
            return 0;
        }
    }
    
    
    // convert one java source file to javascript
    public static void convertJavaFile(File sourcedir, File destdir, File externaldir, String relativepath, 
   		int[] skipfilecounter) 
    {
        Vector errors = new Vector();
        
        File source = new File(sourcedir, relativepath);
        File sourceexternal = new File(externaldir, relativepath); 
        		
        Node node = null;        
        BufferedInputStream in = null;
        try {
            in = new BufferedInputStream(new FileInputStream(source));            
            
//            // check if file should be skipped without starting up the parser
//            if (!shouldConvertTo(in, CONVERSIONTAG)) {
//            	in.close();
//                skipfilecounter[0]++;
//                return;
//            }
                            
            JavaParser parser = new JavaParser(in);
            node = parser.CompilationUnit();
            
            in.close();
            in = null;
        } catch (Exception e) {
            System.err.println ("Error parsing file: "+source);
            System.err.println (e.getMessage());
        }
        if (in!=null) {
            try { in.close(); } catch (IOException e) {}
            in=null;
        }
        
        if (node!=null) {  
            // do some checking and rearrangements 
            node.addMissingExtendsClause();             
            node.canonifyArrayDeclarators(errors);
            node.addNecessaryBraces();
                       
            node.expandOperatorAssignment(errors, "+=");
            node.expandOperatorAssignment(errors, "/=");
            node.elimiateSynchronized(errors);
                            
            Java2JavaScriptConverter c = new Java2JavaScriptConverter(); 
            
            //'in' is a reserved word in javascript
            node.replaceIdentifier(errors, "in",  "inxxx");
            
            // scan all files in same directory and memorize class names
            String[] relatednames = getClassNamesFromSamePackage(source);
            String[] extn = getClassNamesFromSamePackage(sourceexternal);
          	String[] rall = new String[relatednames.length+extn.length];
           	System.arraycopy(relatednames,0,rall,0, relatednames.length);
           	System.arraycopy(extn,0,rall,relatednames.length,extn.length);
            c.setClassNamesInSamePackage(rall);

            // scan imports
            initFullqualifeidnames();
            issecondaryclass = new Hashtable();
            fClass=true;
            addSecondaryClasses(node);
            c.setFullQualifiedNames(extractImports(node));
                        
            String classnamefull = node.extractClassName();

//            //extract static stuff
//            Vector staticVars = new Vector();
//            node.extractStaticStuff(new Vector(), new Vector(), staticVars, errors, "", false);
                        
            ByteArrayOutputStream bos = new ByteArrayOutputStream();

            try {
            	PrintStream ps = new PrintStream(bos,true,"UTF-8");
                c.generate(ps, node, new Vector()); // staticVars);
                
            	// write a list of referenced types to the end of the file
                ps.println();
            	for (Enumeration en = fullqualifiednames.keys(); en.hasMoreElements(); ) {
            		String name = (String) en.nextElement();
            		if (!issecondaryclass.containsKey(name)) {
            			ps.print(REFERENCECOMMENT);
            			ps.println(expandClassName(name).replace('_', '/'));
            		}
            	}   
            	ps.close();
            	
            } catch (IOException e) {} // can not happen with memory buffer
            
            File destination = new File(destdir, classnamefull.replace('.','/') + ".js");
            try {
                destination.getParentFile().mkdirs();
                FileOutputStream o = new FileOutputStream(destination);
                o.write (bos.toByteArray());
                o.close();                
            } catch (IOException e) {
                System.err.println ("Error writing file: "+destination);
            }

            if (errors.size()>0) {
                System.err.println ("File: "+source);
                for (int i=0; i<errors.size(); i++) {
                    System.err.println ((String)errors.elementAt(i));
                }                           
            }        
        }    
    }

	private static void addSecondaryClasses(Node n) {
		if (n.getText().equals("PackageDeclaration")) {
			packagenameArray=extractNameParts(n.findNonterminalNode("Name"));
            packagename=n.findNonterminalNode("Name").concatTerminalSymbols().replace('.','_')+("_");
		}
        if (n.is(Node.TYPE_NONTERMINAL)) {	            
	        if (n.getText().equals("ClassDeclaration")) 
	        { 	
	        	if (!fClass) {
		        	int idx = findAnyTerminalNode(n.getChildren(), findTerminalNode(n.getChildren(), "class")+1);
		            String classname = n.getChildren()[idx].getText();
		            String[] fullclassname = new String[packagenameArray.length+1];
		            for (int i=0; i<packagenameArray.length; i++){
		            	fullclassname[i]=packagenameArray[i];
		            }
		            fullclassname[packagenameArray.length]=classname;
		        	fullqualifiednames.put(classname, fullclassname);
		        	issecondaryclass.put(classname,  Boolean.TRUE);
	        	} else {
	        		fClass=false;
	        	}
	        }        
	        // recursively scan children
	        for (int i=0; i<n.children.size(); i++) {	
	        	addSecondaryClasses((Node)n.children.elementAt(i));
	        }
        }
	}

	private static Hashtable extractImports(Node node) {		
		String text = node.getText();
		if (text.equals("ImportDeclaration")) {   
			String[] names = extractNameParts(node.findNonterminalNode("Name"));
            // memorize the import for later reference
			fullqualifiednames.put(names[names.length-1], names);            
        } 
		for (int i=0; node.children!=null && i<node.children.size(); i++) {
			extractImports(node.getChildren()[i]);
        }
		return fullqualifiednames;
	}

	private static void initFullqualifeidnames() {
		fullqualifiednames = new Hashtable();
        //add classes from lang package
        fullqualifiednames.put("Boolean", new String[]{"java_lang_Boolean"});
        fullqualifiednames.put("Byte", new String[]{"java_lang_Byte"});
        fullqualifiednames.put("Double", new String[]{"java_lang_Double"});
        fullqualifiednames.put("Integer", new String[]{"java_lang_Integer"});
        fullqualifiednames.put("Math", new String[]{"java_lang_Math"});
        fullqualifiednames.put("Object", new String[]{"java_lang_Object"});
        fullqualifiednames.put("Runnable", new String[]{"java_lang_Runnable"});
        fullqualifiednames.put("String", new String[]{"java_lang_String"});
        fullqualifiednames.put("StringBuffer", new String[]{"java_lang_StringBuffer"});
        fullqualifiednames.put("System", new String[]{"java_lang_System"});
	}

	// ------------------------- converter object ---------------------------
  
    String classname;
    HashMap<String, String> classnamemapping;
    String superclassname;
    Node recentvartype;
    boolean  recentarraytypeprimitive;
    boolean classisinterface;
    Vector nonstaticattributes;
//    Vector staticattributes;
    Vector localvariables;
    boolean primary_expression_has_methodinvocation_suffix;
    boolean is_inside_field_declaration;
    
    /** Creates a new instance of Java2JavaScript */
    public Java2JavaScriptConverter() 
    {
    	classnamesinsamepackage = null;
    	fullqualifiednames = null;
    	nonstaticattributes = new Vector();
//        staticattributes = new Vector();
        classnamemapping = new HashMap<String, String>();
        localvariables = new Vector();
    }
    
    public void setClassNamesInSamePackage(String[] names) 
    {
    	classnamesinsamepackage = names;
    }
    
    public void setFullQualifiedNames(Hashtable names) 
    {
    	fullqualifiednames = names;
    }
    
    public void generate(PrintStream out, Node node, Vector staticMembers) throws IOException {
        String text = node.getText();        
        
        // standard operation of comments
        if (node.is(Node.TYPE_COMMENT) || node.is(Node.TYPE_TERMINAL)) {
            out.print (text);
            return;
        }
        
        // rearrange the static members if a class to the bottom
        if (node.is(Node.TYPE_NONTERMINAL) && text.equals("ClassDeclaration")) {
            staticMembers = new Vector();
            node.extractStaticStuff(new Vector(), new Vector(), staticMembers, new Vector(), "", false);        	
        }        
        
        Node[] children = node.getChildren();
        if (children.length==0)
            return;
        
        // do rearrangement of child nodes according to javascript syntax
        int idx = 0;
        
        if (text.equals("CompilationUnit")) {
      
          } else if (text.equals("ImportDeclaration")) {   
        	  // delete imports 
              boolean havestar = node.findTerminalNode("*")!=null;
              if (havestar) {  
            	  System.err.print("May not use import statements with wildcard '*'");      	
              } 
              children = new Node[0];
         } else if (text.equals("PackageDeclaration")) {
            // remove package declaration
            idx = findTerminalNode(children, ";");            
            if (idx>=0) children = removeNodeAndSeperator(children,idx);
            children = new Node[0];
            
        } else if (text.equals("ClassDeclaration")) {
        	nonstaticattributes = new Vector();
//            staticattributes = new Vector();
//        	extractAttributes(node, staticattributes, true);
        	extractAttributes(node, nonstaticattributes, false);
        	
            classisinterface = false; 
            
            // memorize and delete superclass name if given
            idx = findNonterminalNode(children, "Name");
            if (idx>=0) {
                superclassname = removePackageName(children[idx].concatTerminalSymbols());
//                if (superclassname.equals("Object")) {
//                    superclassname="Class";                    
//                }
//            } else {
//                superclassname = "Class";
            }
            children=removeNodeAndSeperator(children,idx);            
//            children[idx] = new Node("var ");           
            children = insertNode(children, 0, new Node(LOADCOMMENT+expandClassName(superclassname).replace('_','/')+"\n"));
            
            
            superclassname = expandClassName(superclassname);
            
            //add ',' after methods and constructors
            int previousidx = 0; 
            Vector pos = new Vector();
            while ((idx = findNode(children,previousidx,Node.TYPE_NONTERMINAL, "ClassBodyDeclaration"))>=0) {    
            	previousidx++;
            	int idxMethod=-1;
            	int idxConstructor=-1;
            	if (idx>=0) {
            		idxMethod = findNonterminalNode(children[idx].getChildren(), "MethodDeclaration");
            		idxConstructor = findNonterminalNode(children[idx].getChildren(), "ConstructorDeclaration");
            	}
            	if (idxMethod>=0 || idxConstructor>=0) {
            		if (children[idx].children==null || findTerminalNode(children[idx].getChildren()[0].getChildren(), "abstract")<0) {
	            		pos.addElement(new Integer(idx));
            		} 
	            	previousidx = idx+1;     		
            	}
            };
            // add dummy default constructor
            boolean addDefaultConstructor = !defaultConstructorExists(node);
        	if (addDefaultConstructor){
	        	idx = findTerminalNode(children, "{");
	            children = insertNode(children, idx+1, new Node(
	            		"\ninitialConstructor_0: function(){" + getInitializeAttributes() 
	            		+ "return "+composeInternalSuperCallName(superclassname,0)+"(this);\n}"+(pos.size()==0?"":", "))); 
        	}
            for (int i=0; i<pos.size()-1; i++){
            	children=insertNode(children, ((Integer)(pos.get(i))).intValue()+i+1+(addDefaultConstructor?1:0), new Node(","));
            }            
            
            idx = findAnyTerminalNode(children, findTerminalNode(children, "class")+1);
            children = insertNode(children, idx+1, new Node(" = _extendClass("));
            children = insertNode(children, idx+2, new Node(superclassname));
            children = insertNode(children, idx+3, new Node(","));

            // add package info if present
            if (packagename!=null){             	
            	classname = packagename.replace('.','/')+children[idx].getText();
            	classnamemapping.put(children[idx].getText(), classname);
            } 
            if (packagename!=null) {
            	children = insertNode(children, idx, new Node(packagename));
            }            
            children = insertNode(children, idx, new Node("var "));
            
            // remove occurrences of abstract, final, public, extends, implements
            while ((idx = findTerminalNode(children, "abstract"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "final"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "public"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "extends"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "implements"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "class"))>=0) children=removeNodeAndSeperator(children,idx);
            
            // memorize and delete interfaces
            String interfacelist = "";
            idx = findNonterminalNode(children, "NameList");
            if (idx>=0) {            	
            	Node interfaces = children[idx];            	
            	children=removeNodeAndSeperator(children,idx);
            	for (int cidx=0; cidx<1000; cidx++)
            	{	Node iname = interfaces.findNonterminalNodeByPosition(cidx);
            		if (iname==null) break;
            		if (interfacelist.length()>0) interfacelist = interfacelist + ",";
            		interfacelist = interfacelist + expandClassName(iname.concatTerminalSymbols()); 
            	}
            }   
            
            idx = findTerminalNode(children, "}");
            children = insertNode(children, idx+1, new Node(",\""+classname+"\",["+interfacelist+"]);\n"));
            
            if (interfacelist.length()>0) {
            	StringTokenizer tok = new StringTokenizer(interfacelist,",");
            	while (tok.hasMoreTokens()) {
                	children = insertNode(children, 0, new Node(LOADCOMMENT+tok.nextToken().replace('_','/')+"\n"));            		
            	}
            }
            
        } else if (text.equals("InterfaceDeclaration")) {
        	String superinterfaces = "";
        	int nlidx = findNonterminalNode(children, "NameList");
        	if (nlidx>=0) {
        		for (int i=0; ;i++) {
        			Node nn = children[nlidx].findNonterminalNodeByPosition(i);
        			if (nn==null) break;
        			if (superinterfaces.length()>0) superinterfaces = superinterfaces + ",";
        			superinterfaces = superinterfaces + expandClassName(nn.concatTerminalSymbols());
        		}
        	}
        	
        	String interfaceName = packagename + children[findAnyTerminalNode(children, findTerminalNode(children, "interface")+1)].getText();
        	if (superinterfaces.length()<1) {
        		children = new Node[]{
           			new Node(LOADCOMMENT+"java/lang/Object\n"),
       				new Node("var " + interfaceName + " = _defineInterface("+'\"'+interfaceName+'\"'+",null);")
        		};
        	}
        	else {        		
        		children = new Node[]{
        			new Node(LOADCOMMENT+superinterfaces.replace('_','/').replaceAll(",","\n"+LOADCOMMENT)+"\n") ,
        			new Node("var " + interfaceName + " = _defineInterface("+'\"'+interfaceName+'\"'+",["+superinterfaces+"]);")
        		};
        	}        	
        	
        } else if (text.equals("Name")) { //expand class names
        	children[0] = new Node(expandClassName(children[0].getText()));
        	
        } else if (text.equals("MethodDeclaration")) {          	
        	localvariables = node.getAllLocalVariableNames();
        	 
            boolean isabstract = false;    
            
            // remove occurrences of 'protected', 'private', 'abstract', 'final', 'native', 'synchronized', 'public', 'private'
            while ((idx = findTerminalNode(children, "public"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "private"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "protected"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "final"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "native"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "synchronized"))>=0) children=removeNodeAndSeperator(children,idx);           
            while ((idx = findTerminalNode(children, "@Override"))>=0)  children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "static"))>=0)  {
            	children=removeNodeAndSeperator(children,idx);
            }
            while ((idx = findTerminalNode(children, "abstract"))>=0) {
                children=removeNodeAndSeperator(children,idx);
                isabstract=true;
            } 
            if ((idx = findTerminalNode(children, "throws"))>=0) {
            	//TODO just remove throws + namelist?
            	int idx2=findNode(children, idx, Node.TYPE_NONTERMINAL, "NameList");
            	children=removeNodes(children,idx,idx2-idx+1);
            }
            // remove the result type
            children=removeNodeAndSeperator(children, findNonterminalNode(children, "ResultType"));
            
            if (isabstract) {
            	children=new Node[0];
            } 
/*            	else if (isstatic) {
            	String correctclassname = getCorrectClassName(children, staticMembers, children[findNonterminalNode(children, "MethodDeclarator")].concatTerminalSymbols());
            	Node[] methodDeclarator = children[findNonterminalNode(children, "MethodDeclarator")].getChildren(); 
            	methodDeclarator = insertNode(methodDeclarator, findNonterminalNode(methodDeclarator, "FormalParameters"), new Node("=")); 
            	children[findNonterminalNode(children, "MethodDeclarator")] = new Node("MethodDeclarator", methodDeclarator);
            	children = insertNode(children, 0, new Node(correctclassname)); 
        		children = insertNode(children, 1, new Node(".prototype."));
        		children = insertNode(children, children.length, new Node(";"));
            }    
*/        		

        } else if (text.equals("MethodDeclarator")) {
            int numargs = node.countNonterminalNodes("FormalParameter", 2);
            idx = findAnyTerminalNode(children, 0);
            children[idx] = new Node(children[idx].text + "_" + numargs);
            
            idx = findNonterminalNode(children, "FormalParameters");
            if (findTerminalNode(children, "=")>=0) //static method
            	children = insertNode(children, idx, new Node("function"));
            else {
            	children = insertNode(children, idx, new Node(":")); 
            	children = insertNode(children, idx+1, new Node("function"));
            }           

        } else if (text.equals("ConstructorDeclaration")) {
        	localvariables = node.getAllLocalVariableNames();

        	if ((idx = findTerminalNode(children, "throws"))>=0) {
            	//TODO just remove throws + namelist?
            	int idx2=findNode(children, idx, Node.TYPE_NONTERMINAL, "NameList");
            	children=removeNodes(children,idx,idx2-idx+1);
            }
            
            // remove occurrences of public, protected, private
            while ((idx = findTerminalNode(children, "public"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "protected"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "private"))>=0) children=removeNodeAndSeperator(children,idx);
          
            int numargs = node.countNonterminalNodes("FormalParameter", 2);
            // replace class name with constructor name and use class name as result type
            idx = findAnyTerminalNode(children,0);
            children[idx] = new Node(composeInternalConstructorMethodName(numargs) + ": function");
         
            // insert call to default super-constructor if no other constructor call available
            if (findNonterminalNode(children, "ExplicitConstructorInvocation")<0 && !superclassname.equals("Class")) { 
                idx = findTerminalNode (children, "{");
                children = insertNode(children, idx+1, 
                    new Node(" "+composeInternalSuperCallName(superclassname,0)+"(this); "));
            }
            // init vars with default values if no this(xxx) is called 
            idx = findNonterminalNode(children, "ExplicitConstructorInvocation");
            if ((idx < 0 || children[findNonterminalNode(children, "ExplicitConstructorInvocation")].findTerminalNode("this")==null)&&nonstaticattributes.size()>0){
            	idx = findTerminalNode (children, "{")+1;            	
            	children = insertNode(children, idx, new Node(getInitializeAttributes()));
            }
            // insert return statement to deliver object itself, for easy chaining
            idx = findTerminalNode(children,"}");
            if (idx>0) children = insertNode(children, idx, new Node("return this;"));
        } else if (text.equals("FormalParameter")) {            
            // reverse order of type and variable and insert ':'
            idx = findNonterminalNode(children, "Type");
            recentvartype = children[idx];
            children=removeNodeAndSeperator(children,idx);
            is_inside_field_declaration = false;
            
        } else if (text.equals("SuppressWarningsAnnotation")) {
        	children = new Node[0];
            
        } else if (text.equals("Type")) {
            //idx = findNonterminalNode(children, "BracketPair");
           // if (idx>=0) {
            //    children = new Node[] { new Node("java.lang.JavaArray") };
            //} 
        } else if (text.equals("ThrowStatement")) {
        	//TODO?
        } else if (text.equals("TryStatement")) {
            // remove the keywords "try" and "finally" to assume no exceptions to be ever thrown
            idx = findTerminalNode(children, "try");
            if (idx>=0) children = removeNodeAndSeperator(children,idx);
            idx = findTerminalNode(children, "finally");
            if (idx>=0) children = removeNodeAndSeperator(children,idx);
            // remove all catch blocks
            while (true) {
                idx = findTerminalNode(children,"catch");
                if (idx<0) break;
                int idx2 = findNode(children,idx+1,Node.TYPE_NONTERMINAL,"Block");
                if (idx2<0) break;
                children = removeNodes(children, idx,(idx2+1)-idx);
            }
        } else if ( text.equals("LocalVariableDeclaration")
                 || text.equals("FieldDeclaration")) {
        	boolean isStatic = false;
        	is_inside_field_declaration = text.equals("FieldDeclaration");
        			
    		// remove protected, final,...
            while ((idx = findTerminalNode(children, "protected"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "final"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "transient"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "volatile"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "private"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "public"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "static"))>=0) {
            	isStatic=true;
            	children=removeNodeAndSeperator(children,idx);
            }
            // determine if it is a reference type or a primitive type
            Node typenode = children[findNonterminalNode(children,"Type")];
            boolean isreference = (typenode.findNonterminalNode("Name")!=null)
            		          ||  (typenode.findNonterminalNode("BracketPair")!=null);
            		
            // replace type
            if (isStatic)
            	children = removeNodeAndSeperator(children, findNonterminalNode(children, "Type"));
            else {        	
            	children[findNonterminalNode(children, "Type")]= new Node("var ");
            }
            
        	if (isStatic) {
        		// add class name prefix
        		for (int i=0; i<children.length; i++){
	        		if (findNode(children, i, Node.TYPE_NONTERMINAL, "VariableDeclarator")>=0) {	        			
	        			i = findNode(children, i, Node.TYPE_NONTERMINAL, "VariableDeclarator");
	        			String variableDeclaratorId = children[i].getChildren()[findNonterminalNode(children[i].getChildren(), "VariableDeclaratorId")].concatTerminalSymbols();
	        			String correctclassname = getCorrectClassName(children, staticMembers, variableDeclaratorId);
	        			
	        			// insert initialization for static members if not specified
	        			if (children[i].findNonterminalNode("VariableInitializer")==null)
	        			{	children = insertNode(children, i+1, new Node( (isreference?"=null":"=0")));	        				
	        			}	        			 
	        			children = insertNode(children, i, new Node(correctclassname + ".prototype."));   
	        			i=i+2;
	        		}
        		}
        	} else if (children[findNonterminalNode(children, "VariableDeclarator")].findTerminalNode("=")==null&&text.equals("FieldDeclaration")) {
        		children = new Node[0];
        	}
        	
        } else if (text.equals("VariableDeclaratorId")) {
        	if (is_inside_field_declaration) {
        		idx = findAnyTerminalNode(children,0);
        		if (idx>=0) children[idx] = new Node(children[idx].getText()+"_f");
        	}
        	
        } else if (text.equals("AllocationExpression")) {
            idx = findNonterminalNode (children, "ArrayDimensionsOrInitializer");                
            // this is an array allocation - remove the leading "new" and "type"
            if (idx>0) {
                recentarraytypeprimitive = false;
               
                children = removeNodeAndSeperator(children, findTerminalNode(children,"new"));
                idx = findNonterminalNode(children, "PrimitiveType");
                if (idx>=0) {
                    children = removeNodeAndSeperator(children, idx);
                    recentarraytypeprimitive = true;
                }
                idx = findNonterminalNode(children, "Name");
                if (idx>=0) children = removeNodeAndSeperator(children, idx);
            } 
            // can only be object allocation - must handle String allocation differently
            else {
            	idx = findNonterminalNode(children, "Name");
            	String n = children[idx].concatTerminalSymbols();
            	if (n.equals("String") || n.equals("java.lang.String")) {
            		children[idx] = new Node("_newString");
            		children = removeNodeAndSeperator(children, findTerminalNode(children, "new"));
            	} else {
            		int aidx = findNonterminalNode(children,"Arguments");
            		int numpar = children[aidx].countNonterminalNodes("Expression", 3);
            		children = insertNode(children, aidx, new Node(").initialConstructor_"+numpar));
            		children = insertNode(children, 0, new Node("("));
            	}
            }
        } else if (text.equals("Statement")) {
        	
        } else if (text.equals("AdditiveExpression")) {
            
        } else if(text.equals("MultiplicativeExpression")) {
                // must replace "/" operator with method call when it can not be determined
                // here that one of the operands must be floating point.
        	//TODO 
                int previousidx = 0;
                while ( (idx = findTerminalNodeAfter(children, previousidx, "/"))>=0) {    
                    int idxrightside = findNode(children, idx, Node.TYPE_NONTERMINAL, "UnaryExpression");
                    boolean noFloatingPoint = true;
                    for (int i=0; i<=idxrightside; i++) {
                        Node n = children[i];
                        if (n.is(Node.TYPE_NONTERMINAL)&& n.mustBeFloatingPointExpression()) {
                        	noFloatingPoint=false;
                        	break;
                        }
                    }
                    if (noFloatingPoint) {
                        children = insertNode(children, idxrightside+1, new Node(")"));                
                        children[idx] = new Node(",");                
                        children = insertNode (children, 0, new Node("_divideInteger("));
                        previousidx = idxrightside+2;
                    } else
                    	break;
                }

        } else if (text.equals("ConditionalAndExpression")) {
            children = insertNode(children, 0, new Node("("));
            children = insertNode(children, children.length, new Node(")"));

        } else if (text.equals("InstanceOfExpression")) {
            idx = findTerminalNode(children, "instanceof");
    		int tidx = findNonterminalNode(children, "Type");
            if (idx>=0 && tidx>=0) {
            		String tname = children[tidx].concatTerminalSymbols();
            		if (tname.endsWith("]")) {
            			children[idx] = new Node(")._is_Array)");            		
            		}
            		else {	
            			children[idx] = new Node(")._is_"+expandClassName(tname)+")");            		
            		}
        			children = removeNodeAndSeperator(children,tidx);	
        			children = insertNode(children, 0, new Node("(_denullify("));            			
            }
        } else if(text.equals("UnaryExpression")) {
            int plusidx = findTerminalNode(children, "+");
            if (plusidx>=0) children = removeNodeAndSeperator(children,plusidx);
        
        } else if (text.equals("ExplicitConstructorInvocation")) {
            int numargs = node.countNonterminalNodes("Expression", 3);
            if ((idx=findTerminalNode(children, "this"))>=0) {
            	children[idx] = new Node(composeInternalSuperCallName(classname,numargs)); 
                children[findNonterminalNode(children, "Arguments")] = extendArgumentsWithThis(node);
            } else if ((idx=findTerminalNode(children, "super"))>=0) {
            	children[idx] = new Node(composeInternalSuperCallName(superclassname,numargs)); 
                children[findNonterminalNode(children, "Arguments")] = extendArgumentsWithThis(node);
            }
        } else if (text.equals("MethodInvocationSuffix")) {
            idx = findAnyTerminalNode(children, findTerminalNode(children,".")+1);
            int numargs = node.countNonterminalNodes("Expression", 3);
            children[idx] = new Node(children[idx].text+ "_" + numargs);

        } else if (text.equals("ThisMethodInvocation")) {
            idx = findAnyTerminalNode(children, 0);
            int numargs = node.countNonterminalNodes("Expression", 3);
            children[idx] = new Node(children[idx].text + "_" + numargs);

        } else if (text.equals("SuperMethodInvocation")) {
            idx = findAnyTerminalNode(children,0);
            int numargs = node.countNonterminalNodes("Expression", 3);
            children[idx] = new Node(children[idx].text + "_" + numargs);
            children = insertNode(children, findAnyTerminalNode(children, 0)+1, new Node(".call"));
        	children[findNonterminalNode(children, "Arguments")] = extendArgumentsWithThis(node);
        	
        } else if (text.equals("ArrayDimensions")) {
            // insert the call to toolbox method
            children = insertNode(children, 0, new Node("_createArray"));

            //boolean hasleafobject = (findNonterminalNode(children,"BracketPair")>=0) || !recentarraytypeprimitive;
            
            // replace first '[' and last ']' by parenthesis
            idx = findTerminalNode (children, "[");
            children[idx] = new Node("(");            
            idx = findLastTerminalNode (children, "]");
            if (findLastNode(children, children.length-1, Node.TYPE_NONTERMINAL, "BracketPair")>idx) {
            	children = insertNode(children, findLastNode(children, children.length-1, Node.TYPE_NONTERMINAL, "BracketPair")+1, new Node(",null)"));
            } else {
            	children[idx] = new Node((recentarraytypeprimitive?",0)":",null)"));
            }
            
            // remove all remaining '[' and ']' and BracketPair
            while ((idx = findTerminalNode(children, "["))>=0) 
            	children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "]"))>=0) 
            	children=removeNodeAndSeperator(children,idx);
            while ((idx = findNonterminalNode(children, "BracketPair"))>=0) 
            	children=removeNodeAndSeperator(children,idx);
//            	children[idx] = new Node("Expression", new Node("null"));	
            
            // create a seperating ',' between expressions
            while (true) {
                idx = findLastTerminalNode(children,",");
                if (idx<0) idx=0;
                idx = findNode (children, idx,Node.TYPE_NONTERMINAL, "Expression");
                if (idx>=0 && idx>=0 && findNode(children,idx+1,Node.TYPE_NONTERMINAL, "Expression")>=0) {
                    children = insertNode(children, idx+1, new Node(","));
                } else {
                    break;
                }
            }            
        } else if (text.equals("ArrayInitializer")) {
            idx = findTerminalNode(children, "{");
            children[idx] = new Node("[");
            idx = findTerminalNode(children, "}");
            children[idx] = new Node("]");
            children = removeNodeAndSeperator(children, findNonterminalNode(children,"BracketPair"));
            
        } else if (text.equals("VariableInitializer")) {
            idx = findTerminalNode(children, "{");
            if (idx>=0) {
                children[idx] = new Node("[");
                idx = findTerminalNode(children, "}");
                children[idx] = new Node("]");            
            }

        } else if (text.equals("CastExpression")) {
        	idx = findNonterminalNode(children, "PrimitiveType");
        	if (idx>=0 && findNonterminalNode(children,"BracketPair")<0) {
        		children[idx] = new Node("_castTO"+children[idx].concatTerminalSymbols());
        		int uidx = findNonterminalNode(children, "UnaryExpression");
        		children = insertNode(children, uidx+1, new Node(")"));
        		children = insertNode(children, uidx, new Node("("));
        	}
        	else {
                children = removeNodes(children, findTerminalNode(children, "("), findTerminalNode(children, ")")-findTerminalNode(children, "(")+1);
        	}
        	
        } else if (text.equals("PrimaryExpression")) {
        	primary_expression_has_methodinvocation_suffix = false;
        	idx = findNonterminalNode(children, "PrimarySuffix");
        	if (idx>=0 && children[idx].findNonterminalNode("MethodInvocationSuffix")!=null) {
        		primary_expression_has_methodinvocation_suffix = true;
        	}
        	        	
        } else if (text.equals("PrimaryPrefix")) {
        	// check if this is some identifer 
        	String id = null;
        	boolean isthismethod = false;
        	idx = findAnyTerminalNode(children, 0);
        	if (idx>=0) {
        		id = children[idx].getText();
        		if (id.equals("(")) id=null;
        	} else {
        		idx = findNonterminalNode(children, "ThisMethodInvocation");
        		if (idx>=0) {
        			id = children[idx].findTerminalNodeByPosition(0).getText()
        					+"_"+children[idx].countNonterminalNodes("Expression",3);
        			isthismethod = true;
        		}
        	}
        	// need to decide what type of variable this could be        	
        	if (id!=null) {        		
        		// scan through the list of static variable and methods - maybe this is a reference to one
        		boolean isstaticmember = false;;
        		for (int i=0; i<staticMembers.size(); i++) {
        			if (id.equals( ((Vector)(staticMembers.elementAt(i))).elementAt(2) )) {
        				isstaticmember = true;
        			}
        		}
        		 
        		// explicit usage of the 'this' keyword already - this can be used without change
        		if (id.equals("this")) {        		
        		}
        		// this is a call to a method of the parent class - need to access it via the prototype
        		else if (id.equals("super")) {
            		children = insertNode(children, idx, new Node(superclassname)); 
            		children = insertNode(children, idx+1, new Node(".prototype.")); 
                	while ((idx = findTerminalNode(children, "super"))>=0) children=removeNodeAndSeperator(children,idx);
                	while ((idx = findTerminalNode(children, "."))>=0) children=removeNodeAndSeperator(children,idx);        			
        		}
        		// a sub-expression - no need to change anything here
        		else if (id.equals("(")) { 
        		}
        		// identifier is a local variable - no need to change anything  
        		else if (localvariables.contains(id)){        		
        		}
        		// identifier is a class name - must expand to fully qualified name
        		else if (children[idx].is(Node.TYPE_TERMINAL) 
        			&&   (fullqualifiednames.get(id)!=null || isClassFromSamePackage(id)) ) {
        			if (primary_expression_has_methodinvocation_suffix) { 
        				children[idx] = new Node(expandClassName(id)+ ".prototype");
        			} else {
        				children[idx] = new Node(expandClassName(id) + ".prototype");        				
        			}
        		}
        		// identifier is a static method - need to access using the class prototype
        		else if (isstaticmember && isthismethod) {
        			children = insertNode(children, idx, new Node(classname+".prototype."));
        		}
        		// identifier is a static attribute - need to access using the class object
        		else if (isstaticmember && !isthismethod) {
        			children[idx] = new Node(id+"_f");        			
        			children = insertNode(children, idx, new Node(classname+".prototype."));
        		}
        		// identifier can now only be a member of the object - access using the "this" keyword
        		else {
        			if (!isthismethod) {
        				children[idx] = new Node(id+"_f"); 
        			}
        			children = insertNode(children, idx, new Node("this."));
        		}
        	}
        	
        	// restructure super calls
        	idx = findTerminalNode(children, "super");        	
        	if (idx>=0) {
        		children = insertNode(children, idx, new Node(superclassname)); 
        		children = insertNode(children, idx+1, new Node(".prototype.")); 
            	while ((idx = findTerminalNode(children, "super"))>=0) children=removeNodeAndSeperator(children,idx);
            	while ((idx = findTerminalNode(children, "."))>=0) children=removeNodeAndSeperator(children,idx);
        	}
        	
        	// static
        	/*idx = findAnyTerminalNode(children, 0);
        	if (idx>=0) {
        		
        	}*/
        	
        } else if (text.equals("PrimarySuffix")) {
        	idx = findTerminalNode(children,".");
        	if (idx>=0) {
        		int ididx = findAnyTerminalNode(children,idx+1);
        		children[ididx] = new Node(children[ididx].text + "_f");
        	}
        	
        } else if (text.equals("CharacterLiteral")) {
            // replace character literals by numbers
            idx = findAnyTerminalNode(children,0);
            if (idx>=0) {
            	String t =  children[idx].getText();
            	children[idx] = new Node(""+unescapeJavaCharacter(t.substring(1,t.length()-1)));
            }
            
        } else if (text.equals("StringLiteral")) {
			idx = findAnyTerminalNode(children, 0);
			String st = children[idx].getText();
			children[idx] = new Node(
					createEscapedStringLiteral(
						unescapeJavaString(st.substring(1, st.length() - 1)))
					);

        } else if (text.equals("Literal")) {
        	 // elimate trailing 'l' from literal
        	//TODO check if literal checks with number!?
        	 idx = findAnyTerminalNode(children,0);
        	 if (idx>=0){
	             String t = children[idx].getText();
	             if (t.endsWith("L")||t.endsWith("l")) {
	                 t = t.substring(0,t.length()-1);
	             }
	             children[idx] = new Node(t);
        	 }
        } else if (text.equals("FloatingPointLiteral")) {
            // elimate trailing 'd' or 'f' from literal
            idx = findAnyTerminalNode(children,0);
            String t = children[idx].getText();
            if (t.endsWith("D")||t.endsWith("d")||t.endsWith("f")||t.endsWith("F")) {
                t = t.substring(0,t.length()-1);
            }
            children[idx] = new Node(t);
            
        }
    
        
        // recursively generate children
        for (int i=0; i<children.length; i++) {
            generate (out, children[i], staticMembers);
        }        
        
        
        // after working on children of method or constructor, need to clear local variable list
    	if (text.equals("MethodDeclaration") || text.equals("ConstructorDeclaration")) {
    		localvariables.clear();
    	}
    }
    
    private String getCorrectClassName(Node[] children, Vector staticVars, String variable) {
    	String correctclassname="";
		for (int i=0; i<staticVars.size();i++){
        	String staticVar = (String) ((Vector)staticVars.get(i)).get(0);
    		if (variable.equals(staticVar)) {
				correctclassname = ((String) ((Vector)staticVars.get(i)).get(1));
				correctclassname = classnamemapping.get(correctclassname)!=null?classnamemapping.get(correctclassname):correctclassname;
				return correctclassname;
    		}
        }
		return "";
	}

	private String getInitializeAttributes() {
    	StringBuffer initVars = new StringBuffer();
    	initVars.append("\n");
    	for (int i=0; i<nonstaticattributes.size(); i++){
    		if (((Vector)nonstaticattributes.get(i)).get(1)!=null)
    			initVars.append("this."+(String)((Vector)nonstaticattributes.get(i)).get(0)+"="+(String)((Vector)nonstaticattributes.get(i)).get(1)+"; \n");
    	}
    	return initVars.toString();
	}

	static public boolean isClassName(String classname) {
    	String[] fullname = (String[]) fullqualifiednames.get(classname);
        if (fullname!=null) 
        	return true;
        if (isClassFromSamePackage(classname))
        	return true;
        
		return false;
	}

	public void generateComments(PrintStream out, Node node) throws IOException {
        if (node.type==Node.TYPE_COMMENT) {
            out.print (node.text);
        } else if (node.type==Node.TYPE_NONTERMINAL) {
           for (int i=0; i<node.children.size(); i++) {
               generateComments(out, (Node)(node.children.elementAt(i)) );
           }
       }
    }
    //extend arguments with "this" (to use method name + ".call(this, + arguments)")
    Node extendArgumentsWithThis(Node parentNode){
    	int parameters = Math.max(parentNode.countNonterminalNodes("FormalParameter", 2),parentNode.countNonterminalNodes("ArgumentList",2)) ;
    	Node[] arguments = parentNode.findNonterminalNode("Arguments").getChildren();
        arguments = insertNode(arguments, 1, new Node("this"));
        if (parameters>0)
        	arguments = insertNode(arguments, 2, new Node(","));
        return new Node("Arguments", arguments);    	
    }
//    String composeInternalMethodName(String name, int numparams) {
//        if ((name.equals ("main") && numparams==0) || (name.equals ("toString")&& numparams==0)) 
//        	return name;
//        return 
//        	name+"_"+numparams;
//    }
    String composeInternalSuperCallName(String classname, int numparams) {
        return classname+".prototype.initialConstructor_"+numparams+".call";
    }
    
    String composeInternalConstructorMethodName(int numparams) {
        return "initialConstructor_"+numparams;
    }
    
    String removePackageName(String fullqualifiedname) {
        int i = fullqualifiedname.lastIndexOf('.');
        if (i<0) return fullqualifiedname;
        return fullqualifiedname.substring(i+1);
    }
          
    static String createEscapedStringLiteral(String str) {
    	boolean specialcharacters=false;
        StringBuffer b = new StringBuffer();
        b.append("\"");
        for (int i=0; i<str.length(); i++) {
            int c = str.charAt(i);
            if (c<32 || c=='\\' || c=='\"' || c=='\'') {
                b.append ("\\x");
                if (c<16) b.append("0");
                b.append(Integer.toHexString(c));
            } else if (c>255) {
            	specialcharacters = true;
            	b.append("\"+String.fromCharCode(");
            	b.append(c);
            	b.append(")+\"");
            } else {
                b.append((char)c);
            }
        }
        b.append("\"");
        return specialcharacters ? "("+b.toString()+")" : b.toString();
    }
        
    void extractAttributes(Node n, Vector v, boolean findstatic) 
    {
        if (! n.is(Node.TYPE_NONTERMINAL)) 
        {	return;
        }
        if (n.getText().equals("FieldDeclaration")) 
        { 	boolean isstatic = n.findTerminalNode("static")!=null;
            if (isstatic == findstatic) 
            {   Node n2 = n.findNonterminalNode("VariableDeclarator");
                while (n2!=null) 
                {   String id = n2.findNonterminalNode("VariableDeclaratorId").findTerminalNodeByPosition(0).getText();
                    if (v.indexOf(id)<0) {                    	
                    	Vector attribute = new Vector();
                    	if (!isstatic && findTerminalNode(n.getChildren(), "private")>=0){
                    		//id=privateMemberPrefix+id;
                    	}
                    	attribute.add(id);
                    	boolean added=false;
                    	if (n.findNonterminalNode("Type")!=null && (n.findNonterminalNode("Type")).findNonterminalNode("PrimitiveType")!=null && (n.findNonterminalNode("Type")).findNonterminalNode("BracketPair")==null){
                    		if (((n.findNonterminalNode("Type")).findNonterminalNode("PrimitiveType")).findTerminalNode("boolean")!=null){
                    			attribute.add("false");
                    			added=true;
                    		} else {
                    			attribute.add("0");
                    			added=true;
                    		}
                    	}
                    	if (!added)
                    		attribute.add("null");
                    	v.addElement(attribute);
                    }
                    n2 = n.findNonterminalNodeAfter("VariableDeclarator", n2);
                }
            }
            return;
        }

        // recursively scan children
        for (int i=0; i<n.children.size(); i++)
        {	extractAttributes((Node)n.children.elementAt(i), v, findstatic);
        }
    }
    private boolean defaultConstructorExists(Node n) 
    {
        if (n.is(Node.TYPE_NONTERMINAL)) {	
       
	        if (n.getText().equals("ConstructorDeclaration")) 
	        { 	
	        	int numargs = n.countNonterminalNodes("FormalParameter", 2);
	            if (numargs==0)
	            	return true;
	        }
        
        // recursively scan children
	        for (int i=0; i<n.children.size(); i++) {	
	        	if (defaultConstructorExists((Node)n.children.elementAt(i)))
	        		return true;
	        }
        }
        return false;
    }
    public static String expandClassName(String classname) 
    {
        String[] fullname = (String[]) fullqualifiednames.get(classname);
        if (fullname!=null) 
        {	
            StringBuffer b = new StringBuffer();
            for (int i=0; i<fullname.length; i++) 
        	{   if (i!=0) 
        		{	b.append("_");
        		}
                b.append(fullname[i]);
            }
            return b.toString();
        }
        else if (isClassFromSamePackage(classname)) {
        	fullqualifiednames.put(classname, new String[]{packagename+classname});
        	return packagename + classname;
        } else {
        	throw new RuntimeException("Can not expand class name: "+classname);        	
        }
    }
    
    public static String[] getClassNamesFromSamePackage(File source)
    {
    	File p = source.getParentFile();
    	if (!p.exists()) return new String[0];
    	
    	Vector names = new Vector();
   		File[] l = source.getParentFile().listFiles();
   		for (int i=0; i<l.length; i++) {
   			String n = l[i].getName();
   			if (n.toLowerCase().endsWith(".java")) 
   			{	names.addElement(n.substring(0,n.length()-5));
   			}
   		}
    	String[] ns = new String[names.size()];
    	for (int i=0; i<ns.length; i++) {	
    		ns[i]=(String)names.elementAt(i);
    	}    	
    	return ns;
    }
    
    static String[] extractNameParts(Node node) 
    {
    	// extract package name for later use - otherwise ignore statement
        Node[] names = node.getChildren();
        int count=0;
        for (int i=0; i<names.length; i++) 
        {   if (names[i].is(Node.TYPE_TERMINAL) && !names[i].getText().equals(".")) 
        	{	count++;
        	}
        }
        String[] namestrings = new String[count];
        count = 0;
        for (int i=0; i<names.length; i++) 
        {	if (names[i].is(Node.TYPE_TERMINAL) && !names[i].getText().equals(".")) 
        	{	namestrings[count++] = names[i].getText();
            }
        }
        return namestrings;
    }
    
    static boolean isClassFromSamePackage(String n) 
    {
    	for (int i=0; classnamesinsamepackage!=null && i<classnamesinsamepackage.length; i++) 
    	{	if (classnamesinsamepackage[i].equals(n)) return true;
    	}
    	return false;
    }
}

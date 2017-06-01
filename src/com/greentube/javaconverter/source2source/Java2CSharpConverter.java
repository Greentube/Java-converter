/*
 * Java2CSharpConverter.java
 *
 * Created on 18. April 2006, 14:35
 */

package com.greentube.javaconverter.source2source;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.util.Arrays;
import java.util.Hashtable;
import java.util.Vector;

/**
 *
 * @author  reinhard
 */
public class Java2CSharpConverter extends AnyConverter {
    
    
    public static void printusing() {
            System.out.println("Usage:");
            System.out.println("    java Java2CSharpConverter <options> <sourcedirectory> <targetdirectory> <fileordirectory>...");        
            System.out.println("    options:  -o obfuscationfile");        
            
    }
    
    static int idcounter = 1000000;//

    // static main to start up actions
    public static void main(String args[]) {
        // parse command line arguments        
        File sourcedir = null; 
        File destdir = null; // new File(args[1]);
        Hashtable obfuscationtable = null;
        
        int paramcursor=0;
        while (paramcursor<args.length) {
            String a = args[paramcursor];
            if (a.startsWith("-")) {
                if (a.equals ("-o") && paramcursor+1<args.length) {
                    obfuscationtable = readObfuscationTable(args[paramcursor+1]);
                    if (obfuscationtable==null) {
                        System.out.println ("Can not read obfuscation table file: "+args[paramcursor+1]);
                        return;
                    }
                    paramcursor++;
                } else {
                    System.out.println ("Unknown option "+a);
                    printusing();
                    return;
                }                                
            } else if (sourcedir==null) {
                sourcedir = new File(a);                
            } else if (destdir==null) {
                destdir = new File(a);
            } else {
                break;
            }   
            paramcursor++;
        }
        if (sourcedir==null || destdir==null || paramcursor>=args.length) {
            printusing();
            return;
        }
                        
        
        System.out.println ("Start converting...");        
        
        int[] errorcounter = new int[1];
        int[] skipfilecounter = new int[1];
        int sumprocessed = 0;
        for (int i=paramcursor; i<args.length; i++) {
            File f = new File(sourcedir,args[i]);
            if ((!f.isFile()) && (!f.isDirectory())) {
                System.out.println ("Can not find file or directory: "+args[i]);
            } else {            
                sumprocessed += convert (sourcedir,destdir,args[i],errorcounter,skipfilecounter, obfuscationtable);
            }
        }
            
        System.out.println ("Processed "+(sumprocessed-skipfilecounter[0])+" file(s).");
        System.out.println ("Skipped "+skipfilecounter[0]+" file(s).");
        if (errorcounter[0]>0) {
            System.out.println ("Encountered "+errorcounter[0]+" errors");                       
        }
        
        if (obfuscationtable!=null) {
            try {
                PrintStream p = new PrintStream(new FileOutputStream("obfuscation.log"));
                Object[] keys = obfuscationtable.keySet().toArray();
                Arrays.sort(keys);
                for (int i=0; i<keys.length; i++) {
                    p.println (""+keys[i]+" -> "+obfuscationtable.get(keys[i]));
                }                
                p.close();
            } catch (IOException e) {}
        }
    }        
    
    
    
    // convert one file or recursively a whole directory 
    // @returns: number of files processed
    public static int convert(File sourcedir, File destdir, String relativepath, 
        int[] errorcounter, int[] skipfilecounter,
        Hashtable obfuscationtable) {
            
        File f = new File(sourcedir, relativepath);
        if (f.isDirectory()) {
            int count=0;
            File[] children = f.listFiles();
            for (int i=0; children!=null && i<children.length; i++) {
                String child = children[i].getName();
                if (!child.equalsIgnoreCase("classes")) {
                    count += convert(sourcedir, destdir, relativepath+File.separator+child, 
                        errorcounter,skipfilecounter, obfuscationtable);                
                }
            }
            return count;
        }
        if (f.isFile() && f.getName().toLowerCase().endsWith(".java")) {
            convertJavaFile(sourcedir,destdir,relativepath,errorcounter,skipfilecounter, obfuscationtable);
            return 1;
        } else {
            return 0;
        }
    }
    
    
    // convert one java source file to csharp
    public static void convertJavaFile(File sourcedir, File destdir, String relativepath, 
        int[] errorcounter, int[] skipfilecounter, Hashtable obfuscationtable) {
        Vector errors = new Vector();
        
        File source = new File(sourcedir, relativepath);
        
        Node node = null;        
        BufferedInputStream in = null;
        try {
            in = new BufferedInputStream(new FileInputStream(source));            
            
            // check if file should be skipped without starting up the parser
            if (!shouldConvertTo(in, "CSHARP")) {
            	in.close();
                skipfilecounter[0]++;
                return;
            }
            

            
                
            JavaParser parser = new JavaParser(in);
            node = parser.CompilationUnit();
            
            in.close();
            in = null;
        } catch (ParseException e) {
            System.out.println ("Error converting file: " + source);
            System.out.println ("Reason: " + e.getMessage());
        } catch (IOException e) {
            System.out.println ("Error reading file: " + source);
            System.out.println ("Reason: " + e.getMessage());
        }
        if (in!=null) {
            try { in.close(); } catch (IOException e) {}
            in=null;
        }
            
        if (node!=null) {           

            // do some checking and rearrangments 
//            node.addMissingExtendsClause();             
            node.canonifyArrayDeclarators(errors);
//            node.addNecessaryBraces();
            
            if (obfuscationtable!=null) node.obfuscate(obfuscationtable);
            
            
//            node.elimiateSynchronized(errors);            
            node.replaceIdentifier(errors, "out","OUT");
            node.replaceIdentifier(errors, "System","SYSTEM");
            

            node.replaceIdentifier(errors, "in",  "in_csharprenamed");
            node.replaceIdentifier(errors, "out",  "out_csharprenamed");
            node.replaceIdentifier(errors, "is",  "is_csharprenamed");
            node.replaceIdentifier(errors, "event",  "event_csharprenamed");
            node.replaceIdentifier(errors, "object",  "object_csharprenamed");
            node.replaceIdentifier(errors, "internal",  "internal_csharprenamed");
            
                        
            Java2CSharpConverter c = new Java2CSharpConverter();            
                                
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            try {
                c.generate(new PrintStream(bos,true,"UTF-8"), node, new Vector());   
            } catch (IOException e) {} // can not happen with memory buffer
        
            if (errors.size()>0) {
                System.out.println ("File: "+source);
                for (int i=0; i<errors.size(); i++) {
                    System.out.println ((String)errors.elementAt(i));
                    errorcounter[0]++;
                }                           
            }            
            
            File destination = new File(destdir, node.extractClassName().replace('.','/') + ".cs");        
            try {
                destination.getParentFile().mkdirs();
                FileOutputStream o = new FileOutputStream(destination);
                o.write (bos.toByteArray());
                o.close();                
            } catch (IOException e) {
                System.out.println ("Error writing file: "+destination);
            }
            
        }    
    }
    
//    private static String readFile( String file ) throws IOException {
//        BufferedReader reader = new BufferedReader( new FileReader (file));
//        String         line = null;
//        StringBuilder  stringBuilder = new StringBuilder();
//        String         ls = System.getProperty("line.separator");
//
//        while( ( line = reader.readLine() ) != null ) {
//            stringBuilder.append( line );
//            stringBuilder.append( ls );
//        }
//        
//        reader.close();
//
//        return stringBuilder.toString();
//    }
    
  
    // ------------------------- converter object ---------------------------
  
    boolean classisinterface;
    Vector  necessaryArrayAllocationMethods;  // contains pairs of String, Integer
    boolean inmainmethod;
    boolean classisfinal;
    
      /** Creates a new instance of Java2Flash */
    public Java2CSharpConverter() {
        classisinterface=false;
        necessaryArrayAllocationMethods = new Vector();
        inmainmethod = false;
    }
    
    public void generate(PrintStream out, Node node, Vector parentnodes) throws IOException {    
        String text = node.getText();        
        
        // standard operation of comments and terminal symbols
        if (node.is(Node.TYPE_COMMENT) || node.is(Node.TYPE_TERMINAL)) {
            out.print (text);
            return;
        }
               
        // do rearrangement of child nodes according to c# syntax
        Node[] children = node.getChildren();
        int idx = 0;
        
        if (text.equals("CompilationUnit")) {
        	// reorder import declarations to the beginning of the file (take them
        	// outside the namespace braces)
        	int havemoved=0;
        	for (;;) 
        	{	idx = findNode(children,havemoved,Node.TYPE_NONTERMINAL, "ImportDeclaration");
        		if (idx<0) break;        		
        		children = insertNode(removeNodeAndSeperator(children,idx),0,children[idx]);
        		havemoved++;
        	}
        	
            // check if package declaration is defined - and must add trailing "}" to the file
            if (findNonterminalNode(children, "PackageDeclaration")>=0) {
                children = insertNode(children, children.length, new Node("}\n"));
            }

            // append leading using clauses to get access to Object and String and to java.lang
            children = insertNode(children, 0, new Node ("using Object = System.Object;\n") );
            children = insertNode(children, 0, new Node ("using String = System.String;\n") );                        
            children = insertNode(children, 0, new Node ("using java.lang;\n") );
            //children = insertNode(children, 0, new Node ("using java.awt;\n") );
            children = insertNode(children, 0, new Node ("using java.io;\n") );
            children = insertNode(children, 0, new Node ("using java.util;\n") );
        
        } else if (text.equals("PackageDeclaration")) {
            // replace "package <name> ;" by "namespace <name> {"
            idx = findTerminalNode(children, "package");
            children[idx] = new Node("namespace");
            idx = findTerminalNode(children, ";");
            children[idx] = new Node(" {");                        

        } else if (text.equals("ImportDeclaration")) {
            idx = findTerminalNode(children, "import");
            children[idx] = new Node("using");
            
            idx = findTerminalNode(children, "*");
            // remove trailing ".*" because csharp only imports whole packages
            if (idx>=0) {
                children = removeNodeAndSeperator(children, idx);
                children = removeNodeAndSeperator(children, findTerminalNode(children,"."));
            // when importing only one class, must use special syntax
            } else {
                idx = findNonterminalNode(children, "Name");
                Node identifier = children[idx].findLastTerminalNode();
                children = insertNode(children, idx, new Node(" = "));                
                children = insertNode(children, idx, identifier);
            }

        } else if (text.equals("ClassDeclaration")) {
            // adjust modifiers
//            while ((idx = findTerminalNode(children, "abstract"))>=0) children=removeNodeAndSeperator(children,idx);
        	classisfinal = false;
            while ((idx = findTerminalNode(children, "final"))>=0) {
            	children[idx]=new Node("sealed");
            	classisfinal = true;
            }
            if (findTerminalNode(children,"public")<0) {
                children = insertNode(children, 0, new Node("public "));
            }
            idx = findTerminalNode(children, "extends");
            if (idx>=0) children[idx] = new Node(":");
            boolean didextend = idx>=0;
            idx = findTerminalNode(children, "implements");
            if (idx>=0) children[idx] = new Node(didextend ? "," : ":");
            
            idx = findTerminalNode(children,"}");
            if (idx>=0) children = insertNode(children, idx, new Node(Node.TYPE_NONTERMINAL, "ClassEndMarker"));
            
            classisinterface=false;
            necessaryArrayAllocationMethods.setSize(0);
            
        } else if (text.equals("InterfaceDeclaration")) {
            // adjust modifiers
            while ((idx = findTerminalNode(children, "abstract"))>=0) children=removeNodeAndSeperator(children,idx);
            if (findTerminalNode(children,"public")<0) {
                children = insertNode(children, 0, new Node("public "));
            }
            
            idx = findTerminalNode(children, "extends");
            if (idx>=0) children[idx] = new Node(":");
            
            classisinterface = true;
            necessaryArrayAllocationMethods.setSize(0);
            
        } else if (text.equals("MethodDeclaration")) {     
            inmainmethod = false;
            boolean hasoverride = false;
            
            // adjust modifiers
            insertNode(children, 0, new Node("virtual"));
            while ((idx = findTerminalNode(children, "native"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "synchronized"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "final"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "protected"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "private"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "public"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "@Override"))>=0) 
            {	children=removeNodeAndSeperator(children,idx);
            	hasoverride=true;
            }
            if (!classisinterface) {
                if (findTerminalNode(children,"public")<0 ) {
                    children = insertNode(children, 0, new Node("public "));
                }
                // a static method
                if (findTerminalNode(children,"static")>=0) {
                    // add some initialization to main()
                    idx = findNonterminalNode(children,"MethodDeclarator");
                    if (idx>=0 && children[idx].findTerminalNodeByPosition(0).getText().equals("main")) {
                        inmainmethod = true;                        
                    }
                    else
                    {
                    	 children = insertNode(children, 0, new Node("new "));	
                    }
                // an abstract or private method
                } else if (findTerminalNode(children,"abstract")>=0 || findTerminalNode(children,"private")>=0) {
                    // do nothing
                // non static
                } else {
                    if ((idx = findTerminalNode(children, "final"))>=0) {
                        if (hasoverride) children[idx] = new Node("sealed ");
                    } else {
                    	if (hasoverride)
                        {
                    		children = insertNode(children, 0, new Node("override "));
                        }
                    	else
                    	{
                    		//if class is not final/sealed then put virtual
                    		if (!classisfinal)
                    		{
                    			children = insertNode(children, 0, new Node("virtual "));	
                    		}
                    	}
                    }
                }
            } else {
            	
                //while ((idx = findTerminalNode(children, "public"))>=0) children=removeNodeAndSeperator(children,idx);
            	
            }
            
        } else if (text.equals("MethodDeclarator")) {
           int numargs = node.countNonterminalNodes("FormalParameter", 2);
            idx = findAnyTerminalNode(children, 0);
            children[idx] = new Node(composeInternalMethodName(children[idx].text, numargs));

        } else if (text.equals("SuppressWarningsAnnotation")) {
        	children = new Node[0];
            
            
        } else if (text.equals("ConstructorDeclaration")) {
            // adjust modifiers
            while ((idx = findTerminalNode(children, "protected"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "private"))>=0) children=removeNodeAndSeperator(children,idx);
            if (findTerminalNode(children,"public")<0) {
                children = insertNode(children, 0, new Node("public "));
            }            
            // different syntax for super constructor
            if (findNonterminalNode(children, "ExplicitConstructorInvocation")>=0) {
                idx = findTerminalNode(children, "{");
                if (idx>=0) children[idx] = new Node(":");
            }
            
        } else if (text.equals("ExplicitConstructorInvocation")) {
            idx = findTerminalNode(children, "super");
            if (idx>=0) children[idx] = new Node("base");
            idx = findTerminalNode(children, ";");
            if (idx>=0) children[idx] = new Node("{");
            
            
        } else if (text.equals("FieldDeclaration")) {
            // adjust modifiers
            while ((idx = findTerminalNode(children, "transient"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "volatile"))>=0) children=removeNodeAndSeperator(children,idx);
            while ((idx = findTerminalNode(children, "protected"))>=0) children=removeNodeAndSeperator(children,idx);
            if (findTerminalNode(children,"private")>=0 && findTerminalNode(children,"static")>=0)
        	{	// keep private access for static fields            	
        	}
        	else
            {   // add public access for fields.  the keyword public must be put to front
            	while ((idx = findTerminalNode(children, "private"))>=0) children=removeNodeAndSeperator(children,idx);
            	while ((idx = findTerminalNode(children, "public"))>=0) children=removeNodeAndSeperator(children,idx);
            	children = insertNode(children, 0, new Node("public "));
            }
            idx = findTerminalNode(children, "final");
            if (idx>=0) {
                String type = children[findNonterminalNode(children,"Type")].concatTerminalSymbols();
                int idx2 = findTerminalNode(children,"static");
                if (idx2>=0 && (type.equals("int")||type.equals("byte")||type.equals("char")||type.equals("short")) )
                {                    
                	if (!node.isCompileTimeConstant()) {
                		children[idx] = new Node("static new readonly");
                	}
                	else 
                	{
                		children[idx] = new Node("new const");	
                	}
                	
                	
                    
                    children = removeNodeAndSeperator(children,idx2);
                } else {
                    children[idx] = new Node("readonly");
                }
            }
                                                        
        } else if (text.equals("PrimitiveType")) {
            // map java primitive types to c# primitive types
            idx = findAnyTerminalNode(children,0);
            String childtext = children[idx].getText();            
            if (childtext.equals("boolean")) {
                children[idx] = new Node("bool");    
            } else if (childtext.equals("byte")) {
                children[idx] = new Node("sbyte");    
            }
            
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

        } else if (text.equals("AllocationExpression")) {
            idx = findNonterminalNode (children, "ArrayDimensionsOrInitializer");                
            if (idx>=0) {
                // this is an array allocation with more than one dimension
                Node adim = children[idx].findNonterminalNode("ArrayDimensions");
                if (adim!=null && adim.countNonterminalNodes("Expression", 1)>1) {
                    String typename = null;
                    idx=findNonterminalNode(children,"PrimitiveType");
                    if (idx>=0) {
                        typename = children[idx].concatTerminalSymbols();                        
                        if (typename.equals("boolean")) typename="bool";
                        else if (typename.equals("byte")) typename="sbyte";
                    } else {
                        idx = findNonterminalNode(children,"Name");
                        if (idx>=0) typename = children[idx].concatTerminalSymbols();
                    }
                    if (typename!=null) {
                        int numparam = 1;
                        Vector v = new Vector();
                        v.addElement (new Node("newArray"+typename));
                        v.addElement (new Node("("));
                        Node expr = adim.findNonterminalNode("Expression");
                        v.addElement(expr);
                        while ((expr = adim.findNonterminalNodeAfter("Expression", expr))!=null) {
                            v.addElement(new Node(","));
                            v.addElement(expr);
                            numparam++;
                        }
                        for (int i=adim.countNonterminalNodes("BracketPair",1); i>0; i--) {
                            v.addElement(new Node(",-1"));
                            numparam++;
                        }
                        v.addElement (new Node(")"));
                        
                        children = new Node[v.size()];
                        v.copyInto (children);
                        
                        int pos = necessaryArrayAllocationMethods.indexOf(typename);
                        if (pos<0) {
                            necessaryArrayAllocationMethods.addElement(typename);                        
                            necessaryArrayAllocationMethods.addElement(new Integer(numparam));
                        } else {
                            int prevparam = ((Integer) necessaryArrayAllocationMethods.elementAt(pos+1)).intValue();
                            if (prevparam<numparam) necessaryArrayAllocationMethods.setElementAt(new Integer(numparam),pos+1);
                        }
                    }
                }
            }

        } else if (text.equals("VariableInitializer")) {
            idx = findTerminalNode(children, "{");
            expandinitializer: if (idx>=0) {
                int nestingdepth = 0;
                for (int i=parentnodes.size()-1; i>=0; i--) {
                    Node p = (Node) parentnodes.elementAt(i);
                    if (p.getText().equals("VariableInitializer")) {
                        nestingdepth++;
                    } else {
                        Node typenode = p.findNonterminalNode("Type");
                        if (typenode!=null) {
                            Node namenode = typenode.findNonterminalNode("PrimitiveType");
                            if (namenode==null) namenode = typenode.findNonterminalNode("Name");
                            if (namenode==null) break expandinitializer;    
                            Vector bracketpairs = new Vector();
                            typenode.findNonterminalNodesInTree("BracketPair", bracketpairs);
                            
                            String type = namenode.concatTerminalSymbols();
                            if (type.equals("byte")) type="sbyte";
                            else if (type.equals("boolean")) type="bool";
 
                            children = insertNode(children, 0, new Node("new "+type));
                            for (int num=bracketpairs.size() - nestingdepth; num>0; num--) {
                                children = insertNode(children, 1, new Node("[]"));
                            }           
                        }
                    }
                }
            }
                       
        } else if (text.equals("PrimaryExpression")) {
            // refactor some method calls to a static call of a toolbox method
            // find a method invocation that should be refactored
            int candidate=-1;
            String methodid=null;
            for (int i=children.length-1; candidate<0 && i>=0; i--) {
                Node n = children[i];
                if (n.is(Node.TYPE_NONTERMINAL) && n.getText().equals("PrimarySuffix")) {
                    Node mis = n.findNonterminalNode("MethodInvocationSuffix");
                    if (mis!=null) {
                        methodid = mis.findTerminalNodeByPosition(1).getText();
                        if (methodid.equals("charAt")
                        ||  methodid.equals("concat") 
                        ||  methodid.equals("length") 
                        ||  methodid.equals("concat")
                        ||  methodid.equals("substring")
                        ) 
                        {
                            candidate=i;
                        }                        
                    }
                }
            }
            // do the refactoring
            if (candidate>=0) {
                Node callee = new Node("PrimaryExpression", children, 0,candidate);
                Node arguments = children[candidate].findNonterminalNode("MethodInvocationSuffix").findNonterminalNode("Arguments");
                Node al = arguments.findNonterminalNode("ArgumentList");
                if (al==null) {
                    arguments = new Node ("Arguments",  new Node[]{
                       new Node ("("),
                       callee,
                       new Node (")")
                    });
                } else {
                    arguments = new Node ("Arguments", new Node[]{
                       new Node ("("),
                       callee,
                       new Node(","),
                       al,
                       new Node (")")
                    });                    
                }
                
                boolean havefirst=false;
                for (int i=0; i<candidate; i++) {
                    if (children[i].is(Node.TYPE_NONTERMINAL)) {
                        if (havefirst) children[i]=new Node("");
                        else           children[i]=new Node("PrimaryPrefix",new Node("Tools"));
                        havefirst=true;
                    }
                }
                
                children[candidate] = new Node("PrimarySuffix", 
                    new Node("MethodInvocationSuffix", new Node[]{ 
                       new Node("."),
                       new Node(methodid),
                       arguments
                    } )
                );                
            }            
            
        } else if (text.equals("StringLiteral")) {
            // reformat string literal  
            idx = findAnyTerminalNode(children,0);
            String st = children[idx].getText();
            children[idx] = new Node("\""
            		+createEscapedStringLiteral(unescapeJavaString(st.substring(1,st.length()-1)))
            		+"\"" );
            
        } else if (text.equals("CharacterLiteral")) { 
            idx = findAnyTerminalNode(children,0);
            if (idx>=0) 
            {   String str = children[idx].getText();
                int ch = unescapeJavaCharacter(str.substring(1,str.length()-1));
                if (str.length()>0) children[idx] = new Node("((char)"+((int)ch)+")");
            }
            
        } else if (text.equals("PrimaryPrefix")) {
            idx = findTerminalNode(children, "super");
            if (idx>=0) children[idx] = new Node("base");
            
        } else if (text.equals("PrimarySuffix")) {                        
            idx = findTerminalNode(children, ".");
            if (idx>=0) {
                int ididx = findAnyTerminalNode(children, idx+1);   
                if (ididx>=0) {
                    String name = children[ididx].getText();
                    if (name.equals("length")) children[ididx]=new Node("Length");                    
                }
            }
            
        } else if (text.equals("MethodInvocationSuffix")) {
            idx = findAnyTerminalNode(children, findTerminalNode(children,".")+1);
            int numargs = node.countNonterminalNodes("Expression", 3);
            children[idx] = new Node(composeInternalMethodName(children[idx].text, numargs));

        } else if (text.equals("ThisMethodInvocation")) {
            idx = findAnyTerminalNode(children, 0);
            int numargs = node.countNonterminalNodes("Expression", 3);
            children[idx] = new Node(composeInternalMethodName(children[idx].text, numargs));

        } else if (text.equals("SuperMethodInvocation")) {
            idx = findAnyTerminalNode(children,0);
            int numargs = node.countNonterminalNodes("Expression", 3);
            children[idx] = new Node(composeInternalMethodName(children[idx].text, numargs));
            
        } else if (text.equals("ShiftExpression")) {
            idx = findTerminalNode(children, ">>>");
            if (idx>=0) {
                children[idx] = new Node(",");
                children = insertNode(children, 0, new Node ("Tools.shiftRightUnsigned("));
                children = insertNode(children, children.length, new Node (")"));            
            }
            
        } else if (text.equals("InstanceOfExpression")) {
            idx = findTerminalNode(children, "instanceof");
            if (idx>=0) children[idx] = new Node("is");

        } else if (text.equals("SynchronizedStatement")) {
            idx = findTerminalNode(children, "synchronized");
            if (idx>=0) children[idx] = new Node("lock");

        } else if (text.equals("Block")) {
            // add extra initialization code at begin of main
            if (inmainmethod) {
                inmainmethod=false;
                
                idx = findTerminalNode(children, "{");
                children = insertNode(children, idx+1, new Node("\n"
                    + "        // C#-dependent initialization code\n"
                    + "        System.Threading.Thread.CurrentThread.CurrentCulture = System.Globalization.CultureInfo.InvariantCulture;\n"
                    ));
            }
                        
            // create additional sub-blocks to reduce the scope of local variables
            boolean statementbefore = false;
            for (int i=0; i<children.length; i++) {
                Node n = children[i];
                if (n.is(Node.TYPE_NONTERMINAL) && n.getText().equals("BlockStatement")) {
                    if (n.findNonterminalNode("LocalVariableDeclaration")!=null) {
                        if (statementbefore) {
                            children = insertNode(children, i, new Node("{ "));
                            children = insertNode(children, children.length, new Node("}"));
                        }
                        statementbefore=false;
                    } else {
                        statementbefore=true;
                    }                    
                }
            }
                        
            
        } else if (text.equals("ClassEndMarker")) {
            // at end of class generate artificial array allocation methods
            Vector v = new Vector();
            
            for (int i=0; i<necessaryArrayAllocationMethods.size(); i+=2) {
                String type = (String) necessaryArrayAllocationMethods.elementAt(i);
                int args = ((Integer) necessaryArrayAllocationMethods.elementAt(i+1)).intValue();
                
                for (int a=2; a<=args; a++) {
                    v.addElement (new Node("    static "+type));
                    for (int j=0; j<a; j++) v.addElement (new Node("[]"));
                    v.addElement (new Node("newArray"+type));
                    v.addElement (new Node("("));
                    for (int j=0; j<a; j++) {
                        if (j>0) v.addElement (new Node(","));
                        v.addElement (new Node("int d"+j));
                    }
                    v.addElement (new Node(")"));
                    v.addElement (new Node(" {\n"));
                    v.addElement (new Node("        "+type));
                    for (int j=0; j<a; j++) v.addElement (new Node("[]"));
                    v.addElement (new Node("a = new "+type+"[d0]"));
                    for (int j=1; j<a; j++) v.addElement(new Node("[]"));
                    v.addElement (new Node(";\n"));
                    
                    v.addElement (new Node("        for (int i=0; d1>=0 && i<d0; i++) {\n"));
                    if (a<=2) {
                        v.addElement (new Node("            a[i] = new "+type+"[d1];\n"));
                    } else {
                        v.addElement (new Node("            a[i] = newArray"+type+"(d1"));  
                        for (int j=2; j<a; j++) v.addElement (new Node(",d"+j));
                        v.addElement (new Node(");\n"));
                    }
                    v.addElement( new Node("        }\n"));
                    v.addElement (new Node("        return a;\n"));
                    v.addElement (new Node("    }\n"));
                }
            }
                
            children = new Node[v.size()];
            v.copyInto (children);                        
        }
        
        // recursively generate children
        parentnodes.addElement (node);

        for (int i=0; i<children.length; i++) {
            generate (out, children[i], parentnodes);
        }      

        parentnodes.setSize(parentnodes.size()-1);
    }
       
    String composeInternalMethodName(String name, int numparams) {
    	
    	if (name.equals("toString") && numparams == 0) return "ToString";
    	if (name.equals("equals") && numparams == 1) return "Equals";
    	if (name.equals("hashCode") && numparams == 0) return "GetHashCode";
    	
    	if (name.equals("trim") && numparams == 0) return "Trim";
    	if (name.equals("indexOf") && numparams == 1) return "IndexOf";
    	if (name.equals("indexOf") && numparams == 2) return "IndexOf";
    	if (name.equals("lastIndexOf") && numparams == 1) return "LastIndexOf";
    	if (name.equals("lastIndexOf") && numparams == 2) return "LastIndexOf";
    	if (name.equals("endsWith") && numparams == 1) return "EndsWith";
    	if (name.equals("startsWith") && numparams == 1) return "StartsWith";
    	if (name.equals("replace") && numparams == 2) return "Replace";
    	if (name.equals("compareTo") && numparams == 1) return "CompareTo";
    	
       return name;
    	/*if (name.length()<1) return name;
       char c = name.charAt(0);
       
       if (c<'a' || c>'z') return name;        
       return name.substring(0,1).toUpperCase() + name.substring(1);
       */
    }
    
    static String createEscapedStringLiteral(String str) {
        StringBuffer b = new StringBuffer();
        for (int i=0; i<str.length(); i++) {
            int c = str.charAt(i);
            if (c<32 || c=='\\' || c=='\"' || c=='\'' || c>127) {
                b.append ("\\u");
                String hs = Integer.toHexString(c);
                for (int j=hs.length(); j<4; j++) b.append("0");
                b.append(hs);
            } else {
                b.append((char)c);
            }
        }
        return b.toString();
    }
    
        
}

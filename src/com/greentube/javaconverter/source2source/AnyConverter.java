/*
 * AnyConverter.java
 *
 * Created on 18. April 2006, 14:32
 */

package com.greentube.javaconverter.source2source;

import java.io.*;
import java.util.*;

/**
 *
 * @author  reinhard
 */
public class AnyConverter {
	
    // static initializer for hash table
    static Hashtable reservedWords = null;          
    
    final static String NL = "\n";

    
    // fast check in an input stream, if it could be converted at all   
    public static boolean shouldConvertTo(BufferedInputStream in, String target) throws IOException
    {
    	// snoop first line up to \n   (treat as iso-latin-1)
    	in.mark(1000);
	    BufferedReader r = new BufferedReader(new InputStreamReader(in));
	    String firstline = r.readLine();
	    in.reset();
	    
	    // rules to determine if should convert
	    if (firstline.indexOf("NOCONVERT")>=0) {
	    	if (firstline.length()>"NOCONVERT".length()+firstline.indexOf("NOCONVERT")+1) {
	    		return firstline.indexOf(target)<0;
	    	} else {
	    		return false;		  
	    	}
	    }
	    if (firstline.indexOf("CONVERTONLY")>=0) {
	    	return firstline.indexOf(target)>=0;
	    }
	    return true;	                
    }
    
    public static Hashtable readObfuscationTable(String filename) {
        try {
            FileInputStream f = new FileInputStream(filename);
            BufferedReader r = new BufferedReader(new InputStreamReader(f));
            
            Hashtable table = new Hashtable();
            table.put ("super", "super");
            table.put ("this", "this");            
            table.put ("abstract", "abstract");
            table.put ("final", "final");
            table.put ("public", "public");
            table.put ("protected", "protected");
            table.put ("private", "private");
            table.put ("class",  "class");
            table.put ("interface",  "interface");
            table.put ("extends", "extends");
            table.put ("implements", "implements");            
            
            String l;
            while ( (l= r.readLine()) != null) {
                l = l.trim();
                if (l.length()>0) {
                    String key = l;
                    String value = l;
                    int spaceidx = l.indexOf(' ');
                    if (spaceidx>=0) {
                        key = l.substring(0,spaceidx).trim();
                        value = l.substring(spaceidx+1).trim();
                    }
                    if (value.equals(table.get(key))) {
                        // do nothing if key-value combination already in table
                    } else if (table.containsKey(key)) {
                        System.out.println ("Error: doublicated key in obfuscation table: "+key);
                    } else if (table.containsValue(value)) {
                        System.out.println ("Error: doublicated value in obfuscation table: "+value);
                    } else {
                        table.put (key,value);
                    }
                }
            }
            
            f.close();            
            return table;
        } catch (IOException e) {
            return null;
        }        
    }
    
    
    static int findNode(Node[] children, int startsearch, int type, String text) {
        for (int i=startsearch; i>=0 && i<children.length; i++) {
            Node c = children[i];
            if (c.is(type) && (text==null || text.equals(c.getText()))) return i;
        }
        return -1;        
    }

    static int findLastNode(Node[] children, int stopsearch, int type, String text) {
        for (int i=stopsearch; i>=0; i--) {
            Node c = children[i];
            if (c.is(type) && (text==null || text.equals(c.getText()))) return i;
        }
        return -1;        
    }
    

    static int findNonterminalNode(Node[] children, String text) {
        return findNode(children,0,Node.TYPE_NONTERMINAL, text);
    }

    static int findTerminalNode(Node[] children, String text) {
        return findNode(children,0,Node.TYPE_TERMINAL, text);        
    }

    static int findLastTerminalNode(Node[] children, String text) {
        return findLastNode(children, children.length-1, Node.TYPE_TERMINAL, text);
    }
    
    static int findAnyTerminalNode(Node[] children, int startsearch) {
        return findNode(children,startsearch,Node.TYPE_TERMINAL,null);
    }
    
    static int findTerminalNodeAfter(Node[] children, int searchafter, String text) {
        return findNode(children,searchafter+1,Node.TYPE_TERMINAL,text);
    }

    static int findAnyNonCommentNode(Node[] children, int startsearch) {
        for (int i=startsearch; i>=0 && i<children.length; i++) {
            Node c = children[i];
            if (!c.is(Node.TYPE_COMMENT)) return i;
        }
        return -1;        
    }

    static Node[]  insertNode(Node[] children, int index, Node node) {
        Node[] newchildren = new Node[children.length+1];
        System.arraycopy (children,0,newchildren,0,index);
        newchildren[index] = node;
        System.arraycopy (children,index,newchildren,index+1,children.length-index);
        return newchildren;
    }  
    
    static Node[] removeNodeAndSeperator(Node[] children, int index) {
        int rnum = 1;
        while (index+rnum<children.length 
            && children[index+rnum].is(Node.TYPE_COMMENT)
            && children[index+rnum].getText().trim().equals("")) rnum++;
        
        Node[] newchildren = new Node[children.length-rnum];
        System.arraycopy (children,0, newchildren,0, index);
        int tailnum = (children.length-rnum)-index;
        if (tailnum>0) System.arraycopy (children,index+rnum, newchildren,index, tailnum);
        return newchildren;
    }

    static Node[] removeNodes(Node[] children, int first, int len) {
        Node[] newchildren = new Node[children.length-len];
        System.arraycopy (children,0, newchildren,0, first);
        System.arraycopy (children,first+len, newchildren,first, children.length-(first+len));
        return newchildren;
    }

    static Node[] removeTerminalNodes(Node[] children, String text) {
        Node[] ch = children;
        for (;;) {
            int idx = findTerminalNode(ch, text);
            if (idx<0) return ch;
            ch = removeNodes(ch, idx,1);
        }
    }
    
    static Node[] convertNewlineToSpace(Node[] children, int startsearch, int len)
    {
    	Node n = children[startsearch+len-1];
    	if (n.is(Node.TYPE_COMMENT) && 
    			(n.getText().contains("\n") || n.getText().contains("\r")) 
    	   )
    	{
    		Node[] c2 = new Node[children.length];
    		System.arraycopy (children, 0, c2,0, children.length);
    		c2[startsearch+len-1] = new Node(Node.TYPE_COMMENT, " ");
    		return c2;
    	}
    	else if (len>1)
    	{	return convertNewlineToSpace(children, startsearch, len-1);
    	}
    	else
    	{	return children;
    	}
    }

    public static void printError(Vector errors, int line, String text) {
        errors.addElement("["+line+"] "+text);
    }
        
    
    public static void checkForFlashConstraints(Node node, Vector errors, boolean allow_long) {
        if (node.is(Node.TYPE_COMMENT)) return;        
        if (node.is(Node.TYPE_TERMINAL)) return;
        
        String text = node.getText();        
        if (text.equals("StaticInitializer")) {
            printError (errors, node.lineNumber, "Static initializers are not supported");
                        
        } else if (text.equals("FieldDeclaration")) {
            // non-static attribute outside method may not have initializer
            if (node.findTerminalNode("static")==null 
            &&  node.countNonterminalNodes("VariableInitializer", 2)>0) {

                printError (errors, node.lineNumber, "Non-static attribute may not have initializer");
            }
            
        } else if (text.equals("VariableDeclaratorId")) {
            // check for unallowed identifiers
            String id = node.findTerminalNode(null).getText();
            if (!isAllowedVariableName(id)) {
                printError (errors, node.lineNumber, "Unallowed attribute/variable name: "+id);
            }
            
        } else if (text.equals("InterfaceDeclaration")) {
            // interfaces must not contain attributes
            if (node.countNonterminalNodes("FieldDeclaration",2)>0) {
                printError (errors, node.lineNumber, "Field declaration not allowed in interface");
            }
            
        } else if (text.equals("PrimitiveType")) {
            // no support for types "long", "float"
            Node n = node.findTerminalNode(null);
            if (n!=null 
            &&  ((n.text.equals("long") && !allow_long) || n.text.equals("float"))) {
                printError (errors, node.lineNumber, "No support for datatype: "+n.text);
            }
            
        } else if (text.equals("LabeledStatement")) {
            // no support for labeled statement
            printError (errors, node.lineNumber, "No support for labeled statements");
            
        } else if (text.equals("ConstructorDeclaration") 
               ||  text.equals("MethodDeclaration")) {
            Hashtable localvariablesandtypes = new Hashtable();
            Vector attributenames = new Vector();
            node.findLocalVariablesAndAttributeAccesses(localvariablesandtypes,attributenames, new Vector());
                        
            for (int i=0; i<attributenames.size(); i++) {
                String id = (String) attributenames.elementAt(i);                
                if (localvariablesandtypes.get(id)!=null) {
                    printError (errors, node.lineNumber, "Potential conflict between local variable and attribute name: "+id);
                }
            }
            
            for (Enumeration e=localvariablesandtypes.keys(); e.hasMoreElements(); ) {
                String id = (String) e.nextElement();
                Vector types = (Vector) localvariablesandtypes.get(id);
                if (types.size()>1) {
                    StringBuffer b = new StringBuffer();
                    for (int i=0; i<types.size(); i++) b.append ((String)types.elementAt(i)+", ");
                    printError (errors, node.lineNumber, "Local variable with multiple types in method: "+id+" ("+b.toString()+")");
                }
            }
            
        }
        
        // recursively check children
        for (int i=0; node.children!=null && i<node.children.size(); i++) {
            checkForFlashConstraints ((Node) node.children.elementAt(i), errors, allow_long);
        }        

    }
    
    static boolean isAllowedVariableName(String name) {
        // build hashtable at first call
        if (reservedWords==null) { 
            reservedWords = new Hashtable();
            String[] v = { 
                // words reserved in flash but not in java
                "add","and", "delete", "dynamic", "eq", "function", "ge", "get", "gt",
                "ifFrameLoaded", "in", "intrinsic", "le", "lt", "ne", "not", "on", 
                "onClipEvent", "or", "set", "tellTarget", "typeof", "var", "with",
                // words reserved in csharp but not in java
                "as", "base", "bool", "checked", "const", "decimal", "delegate", "do",
                "event", "explicit", "extern", "fixed", "foreach", "goto", "implicit",
                "in", "internal", "is", "lock", "namespace", "object", "operator", /* "out", */
                "override", "params", "readonly", "ref", "sbyte", "sealed", "sizeof",
                "stackalloc", "string", "struct", "typeof", "uint", "ulong", "unchecked",
                "unsafe", "ushort", "virutal"
            };
            for (int i=0; i<v.length; i++) reservedWords.put (v[i],"reserved");
        }                
        
        
        
        if (name.endsWith("_")) return false;
        
        int lastunderscore = name.lastIndexOf('_');
        if (lastunderscore>=0) {
            try {
                Integer.parseInt(name.substring(lastunderscore+1));
                return false;
            } catch (NumberFormatException e) {}
        }
        
        if (reservedWords.get(name)!=null) return false;
        
        return true;
    }
    
    
    // process the escape characters that could be inside a java string:
    //  \n \t \b \r \f \\ \' \"
    //  \000   for any octal sequence
    
    public static String unescapeJavaString(String str) {
        StringBuffer b = new StringBuffer();
        int sl = str.length();
        for (int i=0; i<sl; i++) {           
            char c = str.charAt(i);
            if (c!='\\' || i+1>=sl) {
                b.append (c);                
            } else {
                i++;
                char c2 = str.charAt(i);
                switch (c2) {
                case 'n':   b.append("\n"); break;
                case 't':   b.append("\t"); break;
                case 'b':   b.append("\b"); break;
                case 'r':   b.append("\r"); break;
                case 'f':   b.append("\f"); break;
                case '\\':  b.append("\\"); break;
                case '\'':  b.append("\'"); break;
                case '\"':  b.append("\""); break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    int moredigits = 0;
                    if (i+1<sl && str.charAt(i+1)>='0' && str.charAt(i+1)<='7') moredigits++;
                    if (i+2<sl && str.charAt(i+2)>='0' && str.charAt(i+2)<='7') moredigits++;
                    try {
                        b.append((char)Integer.parseInt(str.substring(i,i+1+moredigits), 8));
                    } catch (NumberFormatException e) {
                        b.append("?");
                    }
                    i+=moredigits;
                    break;
                default:   b.append("?"); break;
                }                
            }
        }
        return b.toString();
    }
    
    public int unescapeJavaCharacter(String literal) {
        if (literal.charAt(0)!='\\') return literal.charAt(0);

        String s = unescapeJavaString(literal);
        return s.charAt(0);
    }

}

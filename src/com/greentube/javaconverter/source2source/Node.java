/*
 * JavaNode.java
 *
 * Created on 22. Februar 2005, 08:45
 */

package com.greentube.javaconverter.source2source;

import java.util.*;

/**
 *
 * @author  reinhard
 */
public class Node {
    
    public final static int TYPE_NONTERMINAL  = 0;
    public final static int TYPE_TERMINAL     = 1;
    public final static int TYPE_COMMENT      = 2;
        
    final static String NL = "\n";
    
    int    type;
    String text;
    int    lineNumber;
    Vector children;
    
    boolean wasobfuscated;
    
    /** Creates a new instance of Node */    
    public Node() {
        this(TYPE_COMMENT, " ");
    }
    
    public Node(String text) {
        this(TYPE_TERMINAL,text);
    }
    
    public Node(int type, String text) {
        this.type = type;
        this.text = text;
        this.lineNumber = 0;
        children = (type==TYPE_NONTERMINAL) ? (new Vector()) : null;
        wasobfuscated = false;
    }
    
    public Node(String text, Node child) {
        this(TYPE_NONTERMINAL, text);
        addChild (child);
    }
    public Node(String text, Node child1, Node child2) {
        this(TYPE_NONTERMINAL, text);
        addChild (child1);
        addChild (child2);
    }
    public Node(String text, Node[] children) {
        this(TYPE_NONTERMINAL, text);
        for (int i=0; i<children.length; i++) {
            addChild (children[i]);
        }
    }
    public Node(String text, Node[] children, int start, int length) {
        this(TYPE_NONTERMINAL, text);
        for (int i=start; i<start+length; i++) {
            addChild (children[i]);
        }
    }
    
    public void addChild(Node node) {
        children.addElement(node);        
    }
    
    public boolean is(int type) {
        return type==this.type;
    }
    
    public String getText() {
        return text;
    }
    
    public Node[] getChildren() {
        Node[] c = new Node[children.size()];
        for (int i=0; i<c.length; i++) {
            c [i] = (Node) children.elementAt(i);
        }
        return c;
    }
    
    public Node findTerminalNode(String text) {
        for (int i=0; i<children.size(); i++) {
            Node c = (Node) children.elementAt(i);
            if (c.type !=TYPE_TERMINAL) continue;
            if (text==null || c.text.equals(text)) return c;
        }
        return null;    
    }
    public Node findTerminalNodeByPosition(int position) {
        int p=0;
        for (int i=0; i<children.size(); i++) {
            Node c = (Node) children.elementAt(i);
            if (c.type !=TYPE_TERMINAL) continue;
            if (position==p) return c;
            p++;
        }
        return null;
    }
    public Node findTerminalNodeAfter(Node searchafter) {
        int idx = children.indexOf(searchafter);
        for (int i=idx+1; idx>=0 && i<children.size(); i++) {
            Node c = (Node) children.elementAt(i);
            if (c.type ==TYPE_TERMINAL) return c;
        }
        return null;
    }
    public Node findLastTerminalNode() {
        for (int i=children.size()-1; i>=0; i--) {
            Node c = (Node) children.elementAt(i);
            if (c.type ==TYPE_TERMINAL) return c;
        }
        return null;
    }
    
    public Node findNonterminalNode(String text) {
        for (int i=0; i<children.size(); i++) {
            Node c = (Node) children.elementAt(i);
            if (c.type !=TYPE_NONTERMINAL) continue;
            if (c.text.equals(text)) return c;
        }
        return null;
    }
    public Node findNonterminalNodeByPosition(int position) {
        int p=0;
        for (int i=0; i<children.size(); i++) {
            Node c = (Node) children.elementAt(i);
            if (c.type !=TYPE_NONTERMINAL) continue;
            if (position==p) return c;
            p++;
        }
        return null;
    }

    public Node findNonterminalNodeAfter(String text, Node searchafter) {
        int idx = children.indexOf(searchafter);
        for (int i=idx+1; idx>=0 && i<children.size(); i++) {
            Node c = (Node) children.elementAt(i);
            if (c.type !=TYPE_NONTERMINAL) continue;
            if (c.text.equals(text)) return c;
        }
        return null;
    }
    public void findNonterminalNodesInTree(String text, Vector nodes) {
        if (type!=TYPE_NONTERMINAL) return;        
        if (this.text.equals(text)) {
            nodes.addElement(this);            
        } else {
            for (int i=0; i<children.size(); i++) {
                ((Node)children.elementAt(i)).findNonterminalNodesInTree(text,nodes);
            }
        }
    }
    public int countNonterminalNodes(String text) {
        int count = 0;
        for (int i=0; i<children.size(); i++) {
            Node c = (Node) children.elementAt(i);
            if (c.type !=TYPE_NONTERMINAL) continue;
            if (c.text.equals(text)) count++;
        }
        return count;
    }
    
    public int countTerminalNodes() {
        int count = 0;
        for (int i=0; i<children.size(); i++) {
            Node c = (Node) children.elementAt(i);
            if (c.type ==TYPE_TERMINAL) count++;
        }
        return count;
    }

    
    public String concatTerminalSymbols() {
        if (type==TYPE_TERMINAL) return text;
        if (type==TYPE_COMMENT)  return "";            
        
        String s = "";
        for (int i=0; i<children.size(); i++) {
            s = s.concat (((Node)children.elementAt(i)).concatTerminalSymbols());
        }
        return s;        
    }
    
    public int lengthOfTerminalSymbols() {
        switch (type) {
            case TYPE_TERMINAL: return text.length();
            case TYPE_NONTERMINAL:
                int len = 0;
                for (int i=0; i<children.size(); i++) {
                    len += ((Node)children.elementAt(i)).lengthOfTerminalSymbols();
                }
                return len;                
            default:            return 0;
        }
    }
    
//    int countNonterminalNodes(String t) {
//        return countNonterminalNodes(t,true);
//    }
    
//    int countNonterminalNodes(String t, boolean recursive) {
//        return countNonterminalNodes(t, recursive ? Integer.MAX_VALUE: 1);
//    }
    
    int countNonterminalNodes(String t, int maxdepth) {
        if (!is(Node.TYPE_NONTERMINAL) || maxdepth<1) return 0;        
//        if (text.equals(t)) return 1;
        int num=0;
        for (int i=0; children!=null && i<children.size(); i++) {
            Node c = (Node)children.elementAt(i);
            if (c.is(Node.TYPE_NONTERMINAL)) {
                if (c.getText().equals(t)) num++;
                if (maxdepth>1) num += c.countNonterminalNodes(t, maxdepth-1);
            }
        }
        return num;
    }
    
    public Node copy() {
        Node n = new Node(type,text);
        n.lineNumber = lineNumber;
        for (int i=0; children!=null && i<children.size(); i++) {
            n.addChild (((Node) children.elementAt(i)).copy());
        }  
        return n;
    }

    
    public void print(String prefix) {
        print (prefix, false);
    }
    
    public void print(String prefix, boolean skipcomments) {
        switch (type) {
            case TYPE_NONTERMINAL:
               System.out.println (prefix+"N "+text);
               for (int i=0; i<children.size(); i++) {
                    ((Node)children.elementAt(i)).print (prefix+" ", skipcomments);
                }
                break;
            case TYPE_TERMINAL: 
                System.out.println (prefix+"T ["+text+"]");
                break;
            case TYPE_COMMENT:
                if (!skipcomments) System.out.println (prefix+"C ["+text+"]");
                break;
                
        }        
    }

    public String toString() {
        switch (type) {
            case TYPE_COMMENT:  return "";
            case TYPE_TERMINAL: return text+" ";
            case TYPE_NONTERMINAL: {
                StringBuffer b = new StringBuffer(); // text+"[");
                for (int i=0; i<children.size(); i++) {
                    b.append ((Node)children.elementAt(i)).toString();
                }
//                b.append ("]");
                return b.toString();
            }
        }        
        return "";
    }
    
    public boolean containsSuperMethodInvocation() {
        if (type==TYPE_NONTERMINAL) {
            if (text.equals("SuperMethodInvocation")) return true;
            for (int i=0; children!=null && i<children.size(); i++) {
                if (((Node)children.elementAt(i)).containsSuperMethodInvocation()) return true;
            }
        }
        return false;
    }
    
    // -------------------------- java specific operations -----------------------
    
    String extractClassName() {
        if (type!=TYPE_NONTERMINAL) return "";
        
        if (text.equals("CompilationUnit")) {
            Node td = findNonterminalNode("TypeDeclaration");
            while (td!=null 
               && (td.findNonterminalNode("InterfaceDeclaration")==null)
               && (td.findNonterminalNode("ClassDeclaration")==null) 
            ) {
            	Node other = findNonterminalNodeAfter("TypeDeclaration", td);
            	if (other==null) break;
            	td = other;
            }
            if (td==null) return "";            
            Node pd = findNonterminalNode("PackageDeclaration");
            if (pd==null) return td.extractClassName();
            return pd.extractClassName() + "." + td.extractClassName();
        } else if (text.equals("PackageDeclaration")) {
            return findNonterminalNode("Name").concatTerminalSymbols();
        } else if (text.equals("TypeDeclaration")) {
            Node cd = findNonterminalNode("ClassDeclaration");
            if (cd!=null) return cd.findTerminalNodeAfter(cd.findTerminalNode("class")).text;
            Node id = findNonterminalNode("InterfaceDeclaration");
            if (id!=null) return id.findTerminalNodeAfter(id.findTerminalNode("interface")).text;;            
        }
        return "";
    }
    
    boolean hasPrefix(String methodname, String prefix) {        
        int pl = prefix.length();
        if (methodname.length()<=pl) return false;
        if (!methodname.startsWith(prefix)) return false;
        char nextc = methodname.charAt(pl);
        return nextc>='A' && nextc<='Z';
    }
    
//    boolean isMethodWithoutSideEffects(String methodname) {
//        if (wasobfuscated) return true;
//        
//        if (hasPrefix(methodname,"get")) return true;
//        if (hasPrefix(methodname,"is")) return true;
//        if (hasPrefix(methodname,"has")) return true;
//        if (hasPrefix(methodname,"can")) return true;
//        if (hasPrefix(methodname,"skinGet")) return true;
//        if (hasPrefix(methodname,"count")) return true;
//        if (hasPrefix(methodname,"find")) return true;
//        
//        if (methodname.equals("equals")) return true;
//        if (methodname.equals("toString")) return true;
//        if (methodname.equals("length")) return true;        
//        if (methodname.equals("charAt")) return true;        
//        if (methodname.equals("replace")) return true;
//        if (methodname.equals("substring")) return true;
//        if (methodname.equals("size")) return true;
//        if (methodname.equals("elementAt")) return true;
//        if (methodname.equals("intValue")) return true;
//        if (methodname.equals("byteValue")) return true;
//        if (methodname.equals("stringWidth")) return true;
//        if (methodname.equals("currentTimeMillis")) return true;
//        if (methodname.equals("whoAmI")) return true;
//        if (methodname.equals("gameVariation")) return true;
//        if (methodname.equals("category")) return true;
//        if (methodname.equals("pokerValue")) return true;
//        
//        if (methodname.equals("min")) return true;
//        if (methodname.equals("max")) return true;
//        if (methodname.equals("cos")) return true;
//        if (methodname.equals("sin")) return true;
//        if (methodname.equals("round")) return true;
//        
//        return false;
//    }
    
    public boolean couldHaveSideEffects() {
        if (type!=TYPE_NONTERMINAL) return false;
        
        if (text.equals("Assignment")) return true; // forbid assignments
        if (text.equals("Arguments")) return true;  // forbid method calls
        if (text.equals("PreIncrementExpression")) return true; // forbid pre-increment
        if (text.equals("PreDecrementExpression")) return true; // forbid pre-decrement
        if (text.equals("PostfixExpression")) {
        	if (findTerminalNode("++")!=null) return true;	// forbid post-increment
        	if (findTerminalNode("--")!=null) return true;  // forbid post-decrement
        }
        
        // scan all children
        for (int i=0; children!=null && i<children.size(); i++) {
            if ( ((Node) children.elementAt(i)).couldHaveSideEffects()) return true;
        }  
        return false;
    }
    
    public boolean isCompileTimeConstant()
    {
    	
		if (type != TYPE_NONTERMINAL) return true;
        if (text.equals("Assignment")) return false; // forbid assignments
        if (text.equals("Arguments")) return false;  // forbid method calls
        if (text.equals("PreIncrementExpression")) return false; // forbid pre-increment
        if (text.equals("PreDecrementExpression")) return false; // forbid pre-decrement
        if (text.equals("PostfixExpression")) {
        	if (findTerminalNode("++")!=null) return false;	// forbid post-increment
        	if (findTerminalNode("--")!=null) return false;  // forbid post-decrement
        }
    	
        if (text.equals("PrimaryPrefix"))
        {
        	Node firstNode = findTerminalNodeByPosition(0);
        	if ( firstNode != null)
        	{
        		 if( !firstNode.text.equals("this") && !firstNode.text.equals("super") && !firstNode.text.equals("("))
        		 {
        			 return false; // forbid access to variables
        		 }
        	}
        }
    	
        // scan all children
        for (int i=0; children!=null && i<children.size(); i++) {
            if ( !((Node) children.elementAt(i)).isCompileTimeConstant()) return false;
        }  
    	
    	return true;
    }
    
//    public boolean couldHaveNonConstantValueWithoutSideEffect() {
////        if (true) return true;
//        if (type!=TYPE_NONTERMINAL) return false;
//
//        if (text.equals("PrimaryPrefix")) {
//            for (int i=0; children!=null && i<children.size(); i++) {
//                Node n = (Node) children.elementAt(i);
//                if (n.is(TYPE_TERMINAL)) {
//                    String t = n.text;
//                    if (!t.equals ("this") && !t.equals("super") 
//                     && !t.equals(".")
//                     && !t.equals("(") && !t.equals(")")) return true;
//                }
//            }              
//        }        
//        if (text.equals("PrimarySuffix")) {
//            if (findTerminalNode("[")!=null) return true;  // array access
//            if (findTerminalNode(".")!=null) return true;  // attribute access
//        }
//        
//        for (int i=0; children!=null && i<children.size(); i++) {
//            if ( ((Node) children.elementAt(i)).couldHaveNonConstantValueWithoutSideEffect()) return true;
//        }  
//        
//        return false;
//    }
    
    public String getCommentWithKeyword(String keyword) {
        if (type==TYPE_COMMENT) {
            if (text.indexOf(keyword)>=0) return text;
            return null;
        }
        if (type==TYPE_NONTERMINAL) {
            for (int i=0; i<children.size(); i++) {
                Node n = (Node) children.elementAt(i);
                if (n.type==TYPE_COMMENT) {
                    String text = n.text;
                    if (text.indexOf(keyword)>=0) return text;
                }
            }
        }
        return null;
    }

    public boolean mustBeFloatingPointExpression() {
        if (type!=TYPE_NONTERMINAL) return false;

        // there are various possiblities how a floating point value can be detected
        
        // 1. when being cast to a floating point value, all other casts surely not
        if (text.equals("CastExpression")) {
            Node n = findNonterminalNode("PrimitiveType");
            return (n!=null && n.findTerminalNode("double")!=null);
        }        
        // 2. when being a FloatingPoint literal
        if (text.equals("FloatingPointLiteral")) {
            return true;
        }
        
        // argument types in a function call have no effect on the overall type
        if (text.equals("Arguments")) {
            return false;
        }
            
        // by default any expression that has a member expression being floating point
        for (int i=0; children!=null && i<children.size(); i++) {
            Node n = (Node) children.elementAt(i);
            if (n.type==TYPE_NONTERMINAL) {
                if (n.mustBeFloatingPointExpression()) 
                	return true;
            }
        }     
        
        return false;
    }

    public boolean mustBeStringExpression() {
        // check for use of extracted string literal 
        if (type==TYPE_TERMINAL) {
            if (text.startsWith("l") && text.endsWith("_")) return true;            
        }        
        if (type!=TYPE_NONTERMINAL) return false;
        
        // 2. when being a FloatingPoint literal
        if (text.equals("StringLiteral")) {
            return true;
        }
        // argument types in a function call have no effect on the overall type
        if (text.equals("Arguments")) {
            return false;
        }
        // by default any expression that has a member expression being String
        for (int i=0; children!=null && i<children.size(); i++) {
            Node n = (Node) children.elementAt(i);
            if (n.mustBeStringExpression()) return true;
        }     
        
        return false;
    }
    
    void findLocalVariablesAndAttributeAccesses(Hashtable localvariablesandtypes, Vector attributenames, Vector localvariablestack) {
        if (type!=TYPE_NONTERMINAL) return;
        
        int prevstacksize = localvariablestack.size();
        boolean resetstack = false;

        if (text.equals("MethodDeclaration") 
        ||  text.equals("ConstructorDeclaration")) {
            resetstack=true;                   
            
        } else if (text.equals("LocalVariableDeclaration") 
        ||         text.equals("FormalParameter")) {
            String typ = findNonterminalNode("Type").toString();
            Vector vdeclids = new Vector();
            findNonterminalNodesInTree("VariableDeclaratorId", vdeclids);
            for (int i=0; i<vdeclids.size(); i++) {
                Node vdeclid = (Node) vdeclids.elementAt(i);
                String id = vdeclid.findTerminalNode(null).text;
//                if (!localvariablestack.contains(id)) localvariablestack.addElement(id);
                localvariablestack.addElement(id);
            
                Vector v = (Vector) localvariablesandtypes.get(id);
                if (v==null) {
                    localvariablesandtypes.put (id, v = new Vector());
                }
                if (!v.contains(typ)) v.addElement(typ);
            }
        } else if (text.equals("Block") || text.equals("SwitchStatement") || text.equals("ForStatement")) {
            resetstack=true;
            
        } else if (text.equals("PrimaryPrefix")) {
            Node n = findTerminalNode(null);
            if (n!=null) {
                String id = n.text;
                if (!id.equals("this") && !id.equals("super") && !id.equals("(")) {
                    if (!localvariablestack.contains(id) && !attributenames.contains(id)) {
                        attributenames.addElement(id);
                    }
                }
            }            
        }
        
        // continue with child nodes
        for (int i=0; children!=null && i<children.size(); i++) {
            ((Node)children.elementAt(i)).findLocalVariablesAndAttributeAccesses(localvariablesandtypes,attributenames, localvariablestack);
        }
        
        // if desired reset the stack to previous size
        if (resetstack) localvariablestack.setSize(prevstacksize);
    }    
    
    
    // ------------------ transformation operations to make java code more portable ------------------
    
    // bring all array declarations to the form  <type>[] <var>    
    public void canonifyArrayDeclarators(Vector errors) {
        if (type!=TYPE_NONTERMINAL) return;
        
        if (text.equals("LocalVariableDeclaration")
        ||  text.equals("FieldDeclaration")) {
            // move all [] from after first variable name to the type (and count them)
            Node typenode = findNonterminalNode("Type");
            Node declnode = findNonterminalNode("VariableDeclarator");
            Node declidnode = declnode.findNonterminalNode("VariableDeclaratorId");
            Node bpairnode = null;
            int counttransfers=0;
            while ( (bpairnode=declidnode.findNonterminalNode("BracketPair")) != null) {
                declidnode.children.removeElement(bpairnode);
                typenode.children.addElement (bpairnode);
                counttransfers++;
            }
            
            // remove all [] after other variable names (and write error if number do not 
            // match the first one
            while ( (declnode = findNonterminalNodeAfter("VariableDeclarator", declnode))!=null) {
                declidnode = declnode.findNonterminalNode("VariableDeclaratorId");
                bpairnode = null;
                int countremoved=0;
                while ( (bpairnode=declidnode.findNonterminalNode("BracketPair")) != null) {
                    declidnode.children.removeElement(bpairnode);
                    countremoved++;
                }                
                if (counttransfers!=countremoved) {
                    errors.addElement ("Number of '[]' do not match for multiple variables in single declaration");
                }
            }
            return;
            
        } else if (text.equals("FormalParameter")) {
            // move all [] from the variable name to the type
            Node typenode = findNonterminalNode("Type");
            Node declidnode = findNonterminalNode("VariableDeclaratorId");
            Node bpairnode = null;
            while ( (bpairnode=declidnode.findNonterminalNode("BracketPair")) != null) {
                declidnode.children.removeElement(bpairnode);
                typenode.children.addElement (bpairnode);
            }
            return;
            
        } else if (text.equals("MethodDeclaration")) {
            // move all [] from after the method name to the type
            Node typenode = findNonterminalNode("ResultType").findNonterminalNode("Type");
            if (typenode!=null) {
                Node declnode = findNonterminalNode("MethodDeclarator");
                Node bpairnode = null;
                while ( (bpairnode=declnode.findNonterminalNode("BracketPair"))!=null) {
                    declnode.children.removeElement(bpairnode);
                    typenode.children.addElement(bpairnode);
                }
            }            
        }
        
        // continue operation with child nodes
        for (int i=0; children!=null && i<children.size(); i++) {
            ((Node) children.elementAt(i)).canonifyArrayDeclarators(errors);
        }        
    }

    // bring all variable declarations of arrays in the form   = new int[]{ }
    public void simplifyVariableInitializers()
    {
        if (type!=TYPE_NONTERMINAL) return;

        if (text.equals("LocalVariableDeclaration")
        ||  text.equals("FieldDeclaration")) {
            Node typenode = findNonterminalNode("Type");
            if (typenode==null) return;
            Node primitivetypeorname = typenode.findNonterminalNode("PrimitiveType");
            if (primitivetypeorname==null) primitivetypeorname = typenode.findNonterminalNode("Name");
            int dimensions = typenode.countNonterminalNodes("BracketPair");

            if (primitivetypeorname!=null && dimensions>0) {
                // scan all parts that need replacement
                for (int i=0; children!=null && i<children.size(); i++) {
                    Node child = (Node) children.elementAt(i);
                    if (child.type!=TYPE_NONTERMINAL) continue;
                    if (!child.text.equals("VariableDeclarator")) continue;

                    Node vi = child.findNonterminalNode("VariableInitializer");
                    if (vi==null) continue;
                    vi.simplifyVariableInitializer(primitivetypeorname, dimensions);
                }
            }
            return;
        }

        // continue operation with child nodes
        for (int i=0; children!=null && i<children.size(); i++) {
            ((Node) children.elementAt(i)).simplifyVariableInitializers();
        }
    }

    public void simplifyVariableInitializer(Node primitivetypeorname, int dimensions)
    {
        Node openingbraces = findTerminalNode("{");

        // when there is no implicit array allocation, no simplification is necessary
        if (openingbraces==null || dimensions<1) return;

        // build an ArrayInitializer from the expressions
        Node arrayinitializer = new Node(TYPE_NONTERMINAL, "ArrayInitializer");
        for (int i=0; i<dimensions; i++) {
            arrayinitializer.addChild(new Node("BracketPair", new Node[] { new Node("["), new Node("]") } ));
        }
        arrayinitializer.addChild (new Node("{") );

        // recursivly simplify the sub-initializers
        for (int i=0; children!=null && i<children.size(); i++) {
            Node child = (Node) children.elementAt(i);
            if (child.type==TYPE_NONTERMINAL && child.text.equals("VariableInitializer")) {
                child.simplifyVariableInitializer(primitivetypeorname, dimensions-1);

                Node expr = child.findNonterminalNode("Expression");
                if (expr!=null) {
                    if (arrayinitializer.findNonterminalNode("Expression")!=null) arrayinitializer.addChild(new Node(","));
                    arrayinitializer.addChild(expr);
                }
            }
        }
        arrayinitializer.addChild (new Node("}") );

        // simplify this initializer by just using an ArrayInitializer - expression
        children.setSize(0);
        addChild(
            new Node("Expression", new Node[] {
                new Node("ConditionalExpression", new Node[] {
                    new Node("ConditionalOrExpression", new Node[] {
                        new Node("ConditionalAndExpression", new Node[] {
                            new Node("InclusiveOrExpression", new Node[] {
                                new Node("ExclusiveOrExpression", new Node[] {
                                    new Node("AndExpression", new Node[] {
                                        new Node("EqualityExpression", new Node[] {
                                            new Node("InstanceOfExpression", new Node[] {
                                                new Node("RelationalExpression", new Node[] {
                                                    new Node("ShiftExpression", new Node[] {
                                                        new Node("AdditiveExpression", new Node[] {
                                                            new Node("MultiplicativeExpression", new Node[] {
                                                                new Node("UnaryExpression", new Node[] {
                                                                    new Node("UnaryExpressionNotPlusMinus", new Node[] {
                                                                        new Node("PostfixExpression", new Node[] {
                                                                            new Node("PrimaryExpression", new Node[] {
                                                                                new Node("PrimaryPrefix", new Node[] {
                                                                                    new Node("AllocationExpression", new Node[] {
                                                                                        new Node("new"),
                                                                                        primitivetypeorname,
                                                                                        new Node("ArrayDimensionsOrInitializer", new Node[] {
                                                                                            arrayinitializer
                                                                                        } )
                                                                                    } )
                                                                                } )
                                                                            } )
                                                                        } )
                                                                    } )
                                                                } )
                                                            } )
                                                        } )
                                                    } )
                                                } )
                                            } )
                                        } )
                                    } )
                                } )
                            } )
                        } )
                    } )
                } )
           } )
       );
        
    }


/*
    public void canonfiyVariableDeclarators(Vector errors, Node typenode) {
        if (type!=TYPE_NONTERMINAL) return;

        // find the type node to insert later
        Node tn = typenode;

        if (text.equals("LocalVariableDeclaration")
        ||  text.equals("FieldDeclaration")) {
            tn = findNonterminalNode("Type");

        } else if (text.equals("FormalParameter")) {
            // move all [] from the variable name to the type
            Node typenode = findNonterminalNode("Type");
            Node declidnode = findNonterminalNode("VariableDeclaratorId");
            Node bpairnode = null;
            while ( (bpairnode=declidnode.findNonterminalNode("BracketPair")) != null) {
                declidnode.children.removeElement(bpairnode);
                typenode.children.addElement (bpairnode);
            }
            return;

        } else if (text.equals("MethodDeclaration")) {
            // move all [] from after the method name to the type
            Node typenode = findNonterminalNode("ResultType").findNonterminalNode("Type");
            if (typenode!=null) {
                Node declnode = findNonterminalNode("MethodDeclarator");
                Node bpairnode = null;
                while ( (bpairnode=declnode.findNonterminalNode("BracketPair"))!=null) {
                    declnode.children.removeElement(bpairnode);
                    typenode.children.addElement(bpairnode);
                }
            }
        }

        // continue operation with child nodes
        for (int i=0; children!=null && i<children.size(); i++) {
            ((Node) children.elementAt(i)).canonfiyVariableDeclarators(errors, tn);
        }
    }
*/

    // add braces to all if, while, etc. if not already there
    public void addNecessaryBraces() {
        // check when it is necessary to attach braces to child nodes
        boolean needbraces = is(TYPE_NONTERMINAL) &&
            (text.equals("IfStatement") || text.equals("WhileStatement") 
          || text.equals("DoStatement") || text.equals("ForStatement"));
        
        // recursively scan and modifiy subtrees
        for (int i=0; children!=null && i<children.size(); i++) {
            Node c = (Node) children.elementAt(i);
            c.addNecessaryBraces();
            
            // add braces if necessary
            if (needbraces && c.is(TYPE_NONTERMINAL) && c.text.equals("Statement")) {
                if (c.findNonterminalNode("Block")==null) {                
                    Node n = new Node("Block",  new Node[]{
                              new Node("{"),
                              new Node("BlockStatement", c),
                              new Node("}") } );
                    children.setElementAt(n, i);
                }
            }       
        }        
    }
    

    // add the missing "extends Object" to all classes where it has been ommited
    public void addMissingExtendsClause() {
        if (type!=TYPE_NONTERMINAL) return;
        
        if (text.equals("ClassDeclaration")) {
            if (findTerminalNode("extends")==null) {
                Node nodeafter = findTerminalNode ("implements");
                if (nodeafter==null) nodeafter = findTerminalNode ("{");

                Node namenode = new Node(TYPE_NONTERMINAL, "Name");
                namenode.children.insertElementAt(new Node("Object"), 0);
                
                int idx = children.indexOf(nodeafter);
                children.insertElementAt(new Node(), idx);
                children.insertElementAt(new Node("extends"), idx+1);
                children.insertElementAt(new Node(), idx+2);
                children.insertElementAt(namenode, idx+3);
                children.insertElementAt(new Node(), idx+4);
            }            
            return;
        }
        if (text.equals("InterfaceDeclaration"))
        {	return;
        }
        
        // continue operation with child nodes
        for (int i=0; children!=null && i<children.size(); i++) {
            ((Node) children.elementAt(i)).addMissingExtendsClause();
        }        
    }

    // add the default constructor if no constructor is given at all
    public void addDefaultConstructor() {
        if (type!=TYPE_NONTERMINAL) return;
        
        if (text.equals("ClassDeclaration")) {
        	String classname = findTerminalNodeAfter(findTerminalNode("class")).getText();
        	if (countNonterminalNodes("ConstructorDeclaration", 3)<=0)
        	{	Node endbrace = findTerminalNode("}");
        		if (endbrace!=null)
        		{	Node n = new Node("ClassBodyDeclaration",  
        			   new Node("ConstructorDeclaration", new Node[]{
        				  new Node("public"),
        				  new Node(), 
        				  new Node(classname),
        				  new Node("FormalParameters",
        					  new Node("("),
        					  new Node(")")
        				  ),
        				  new Node("{"),
        				  new Node("}")
        			   })
        		    );
        			children.insertElementAt(n, children.indexOf(endbrace));        			
        		}        		
        	}
            return;
        }
        if (text.equals("InterfaceDeclaration"))
        {	return;
        }
        
        
        // continue operation with child nodes 
        for (int i=0; children!=null && i<children.size(); i++) {
            ((Node) children.elementAt(i)).addDefaultConstructor();
        }        
    }
    
    // eliminate all synchronized statements
    public void elimiateSynchronized(Vector errors) {
        if (type!=TYPE_NONTERMINAL) return;

        if (text.equals("Statement")) {
            Node sy = findNonterminalNode("SynchronizedStatement");
            if (sy!=null) {
                Node ex = sy.findNonterminalNode("Expression");
                Node bl = sy.findNonterminalNode("Block");                
                // replace a 'synchronized' statement with block containing the expression and body                
                children.setSize(0);
                children.addElement ( 
                    new Node("Block", new Node[]{
                     new Node("{"),
                     new Node("BlockStatement", 
                      new Node("Statement", new Node[]{
                       new Node("StatementExpression",
                        new Node("PostfixExpression",
                         new Node("PrimaryExpression",
                          new Node("PrimaryPrefix", new Node[]{
                           new Node("("),
                           ex,
                           new Node(")")
                          })
                       ))),
                       new Node(";")
                      })
                     ),
                     new Node("BlockStatement",
                      new Node("Statement", bl)
                     ),
                     new Node("}")
                    })
                );
            }
        }            

        // continue operation with child nodes
        for (int i=0; children!=null && i<children.size(); i++) {
            ((Node) children.elementAt(i)).elimiateSynchronized(errors);
        }        
    }
    
    
    // reconstruct assignments of the form  a <op>"=" b  to  a "=" a <op> b
    public void expandOperatorAssignment(Vector errors, String operator) {
        if (type!=TYPE_NONTERMINAL) return;

        // check if this is an assignment with the given operator
        if (text.equals("Assignment")) {
            Node op = findNonterminalNode("AssignmentOperator");
            if (op.findTerminalNode(operator)!=null) {
                Node nodea = findNonterminalNode("PrimaryExpression");
                Node nodeb = findNonterminalNode("Expression");
                if (nodea.couldHaveSideEffects()) {
                    errors.addElement("Can not rearrange '"+operator+"' operation with possible side effects on left side");                    
                } else {
                    // replace operator by a simple "="
                    op.children.setElementAt(new Node("="), op.children.indexOf(op.findTerminalNode(operator)));
                    
                    if (operator.equals("+=")) {
                        // construct new right side of assignment
                        Node addexpr = new Node(Node.TYPE_NONTERMINAL, "AdditiveExpression");
                        addexpr.addChild(
                            new Node("MultiplicativeExpression",
                             new Node("UnaryExpression",
                              new Node("UnaryExpressionNotPlusMinus",
                               new Node("PostfixExpression",
                                nodea.copy() )))));
                        addexpr.addChild (new Node("+"));
                        Node parexpr = new Node(Node.TYPE_NONTERMINAL, "PrimaryPrefix");
                        parexpr.addChild (new Node("("));
                        parexpr.addChild (nodeb);
                        parexpr.addChild (new Node(")"));
                        addexpr.addChild (
                            new Node("MultiplicativeExpression",
                             new Node("UnaryExpression",
                              new Node("UnaryExpressionNotPlusMinus",
                               new Node("PostfixExpression",
                                new Node("PrimaryExpression",
                                 new Node("PrimaryPrefix",
                                    parexpr)))))));                                    
                        children.setElementAt(addexpr, children.indexOf(nodeb));
                    } else if (operator.equals("/=")) {
                        // construct new right side of assignment
                        Node mulexpr = 
                            new Node("MultiplicativeExpression",
                             new Node("UnaryExpression",
                              new Node("UnaryExpressionNotPlusMinus",
                               new Node("PostfixExpression",
                                nodea.copy() ))));
                        mulexpr.addChild (new Node("/"));
                        Node parexpr = new Node(Node.TYPE_NONTERMINAL, "PrimaryPrefix");
                        parexpr.addChild (new Node("("));
                        parexpr.addChild (nodeb);
                        parexpr.addChild (new Node(")"));
                        mulexpr.addChild (
                             new Node("UnaryExpression",
                              new Node("UnaryExpressionNotPlusMinus",
                               new Node("PostfixExpression",
                                new Node("PrimaryExpression",
                                 new Node("PrimaryPrefix",
                                    parexpr))))));                                    
                        Node addexpr = new Node(Node.TYPE_NONTERMINAL, "AdditiveExpression");
                        addexpr.addChild(mulexpr);
                        children.setElementAt(addexpr, children.indexOf(nodeb));                        
                    }
                }
            }            
        }
        
        // continue operation with child nodes
        for (int i=0; children!=null && i<children.size(); i++) {
            ((Node) children.elementAt(i)).expandOperatorAssignment(errors, operator);
        }                
    }
                
    // replace all occurences of a given string
    public void replaceIdentifier(Vector errors, String find, String replace) {
        if (type!=TYPE_NONTERMINAL) return;

        // replace all terminal nodes with given name
        for (int i=0; children!=null && i<children.size(); i++) {
            Node n = (Node) children.elementAt(i);
            if (n.is(TYPE_NONTERMINAL)) {
                n.replaceIdentifier(errors,find,replace);
            } else if (n.is(TYPE_TERMINAL)) { 
                if (n.text.equals (find)) {
                    children.setElementAt(new Node(replace),i);
                }
            }
        }                
    }
        
    public void extractStringLiterals(Vector literals, Vector errors) {
        extractStringLiterals(literals, false, errors);
    }

    public void extractStringLiterals(Vector literals, boolean insertnewlines, Vector errors) {
        if (type!=TYPE_NONTERMINAL) return;        
        
        if (text.equals("Literal")) {
            // check if literal is indeed a string
            Node n = findNonterminalNode("StringLiteral");
            if (n!=null) {
                String t = n.findTerminalNodeByPosition(0).getText();            

                // add to list if known literals
                String l = t.substring(1,t.length()-1);                
                int pos = literals.indexOf(l);
                if (pos<0) {
                    pos = literals.size();
                    literals.addElement(l);                    
                }
                // modify this node to become a Literal referencing an identifier instead of a StringLiteral
                children = new Vector();
                children.addElement(new Node("l"+pos+"_"));
            }      
            return;
        }
        else if (text.equals("FieldDeclaration"))
        {	// check if field declaration declares static field - do not extract string literals from there
        	if (findTerminalNode("static")!=null)
        	{  	return;
        	}
        }
        	
        // continue operation with child nodes
        for (int i=0; children!=null && i<children.size(); i++) {
            ((Node) children.elementAt(i)).extractStringLiterals(literals,insertnewlines,errors);
        }                        
        
        // in case of a class declaration, the accumulated literals will be added
        if (text.equals("ClassDeclaration") && literals.size()>0) {
            int insertindex = children.indexOf(findTerminalNode("{")) +1;
            
            for (int i=0; i<literals.size(); i++) {
                Node f =
                   new Node("ClassBodyDeclaration",
                    new Node(Node.TYPE_COMMENT, NL),
                    new Node("FieldDeclaration", new Node[]{
                     new Node("static"),
                     new Node(),
                     new Node("final"),
                     new Node(),
                     new Node("Type",
                      new Node("Name",
                       new Node("String")
                      ) // Name 
                     ), // Type 
                     new Node(),
                     new Node("VariableDeclarator", new Node[]{
                      new Node("VariableDeclaratorId",
                       new Node ("l"+i+"_")
                      ), // VariableDeclaratorId 
                      new Node("="),
                      new Node("VariableInitializer",
                       new Node("Expression",
                        new Node("ConditionalExpression",
                         new Node("ConditionalOrExpression",
                          new Node("ConditionalAndExpression",
                           new Node("InclusiveOrExpression",
                            new Node("ExclusiveOrExpression",
                             new Node("AndExpression",
                              new Node("EqualityExpression",
                               new Node("InstanceOfExpression",
                                new Node("RelationalExpression",
                                 new Node("ShiftExpression",
                                  new Node("AdditiveExpression",
                                   new Node("MultiplicativeExpression",
                                    new Node("UnaryExpression",
                                     new Node("UnaryExpressionNotPlusMinus",
                                      new Node("PostfixExpression",
                                       new Node("PrimaryExpression",
                                        new Node("PrimaryPrefix",
                                         new Node("Literal",
                                          new Node ("StringLiteral",
                                           new Node("\""+ literals.elementAt(i) + "\"")
                      ))))))))))))))))))))) // VariableInitializer 
                     }), // VariableDeclarator
                     new Node(";")
                	}) // FieldDeclaration
                   );  // ClassBodyDeclaration
                
                children.insertElementAt(f, insertindex++);
            }            
            
            literals.setSize(0);
        }
    }
    
    public void extractMethodParametersToLocalVariables(Vector errors)
    {
        if (type!=TYPE_NONTERMINAL) return;  
    	
        if (text.equals("MethodDeclaration")) 
        {	Node block = findNonterminalNode("Block");
        	if (block!=null) 
        	{	Node fp = findNonterminalNode("MethodDeclarator").findNonterminalNode("FormalParameters");
        		Vector typesandids = new Vector();
        		fp.renameNonPrimitiveParameters(errors, typesandids);        		
       			
       			if (findTerminalNode("static")==null)
       			{	typesandids.addElement(new Node("Type", new Node("Name", new Node("Object") )));
       				typesandids.addElement(new Node("VariableDeclaratorId", new Node("this") ));
       			}               			
        		block.injectLocalVariableAssignments(typesandids);       			
        	}
        }
        else if (text.equals("ConstructorDeclaration"))
        {	Node fp = findNonterminalNode("FormalParameters");
        	Vector typesandids = new Vector();
        	fp.renameNonPrimitiveParameters(errors, typesandids);        		
       		injectLocalVariableAssignments(typesandids);
        }
        else
        {  // continue operation with child nodes
        	for (int i=0; children!=null && i<children.size(); i++) {
        		((Node) children.elementAt(i)).extractMethodParametersToLocalVariables(errors);
        	}                        
        }
    }
    private void injectLocalVariableAssignments(Vector typesandids)
    {
       			
        		int braceidx = children.indexOf(findTerminalNode("{"));        			
        		for (int i=0; i+1<typesandids.size(); i+=2)
        		{	Node type = (Node) typesandids.elementAt(i);
        			Node vdecl = (Node) typesandids.elementAt(i+1);
        			
        			boolean isthis=false;
        			if (vdecl.concatTerminalSymbols().equals("this"))
        			{	isthis = true;
        				vdecl = new Node("VariableDeclaratorId", new Node("__protectfromdeletion__") );
        			}
        					
        			children.insertElementAt(
        				new Node("BlockStatement",
        					new Node("LocalVariableDeclaration",
        						new Node[] {
          						  type,
        						  new Node(Node.TYPE_COMMENT," "),
        						  new Node("VariableDeclarator",
        						    new Node[]{
        							  vdecl,
        							  new Node("="),
        							  new Node("VariableInitializer",
        								new Node("Expression",
        									new Node(isthis ? "this" : ("__arg__"+vdecl.concatTerminalSymbols()) )
        							    )
        							  )
        						    }
        					      )
        					   }
                            ),
                            new Node(";")
                        ),
        				braceidx+1
        			);
        		}
    }
    private void renameNonPrimitiveParameters(Vector errors, Vector typesandids)
    {
        if (type!=TYPE_NONTERMINAL) return;  
    	
        if (text.equals("FormalParameter"))
        {	Node type = findNonterminalNode("Type");
        	Node vdecl = findNonterminalNode("VariableDeclaratorId");
        	// check if it is a non-primitive type
        	if (type.countNonterminalNodes("Name",99)>0 || type.countNonterminalNodes("BracketPair",99)>0)
        	{	typesandids.addElement(type);
        		typesandids.addElement(vdecl);
        		children.setElementAt(
        			new Node("VariableDeclaratorId",
        				new Node("__arg__"+vdecl.concatTerminalSymbols() ))
        			,children.indexOf(vdecl) 
        		);
        	}
        }
        else
        {  // continue operation with child nodes
        	for (int i=0; children!=null && i<children.size(); i++) {
        		((Node) children.elementAt(i)).renameNonPrimitiveParameters(errors, typesandids);
        	}                        
        }
    }
    
    
    public void extractStaticStuff(Vector staticStuff, Vector references, Vector staticVars, Vector errors, String classname, boolean staticfound) {
        if (type!=TYPE_NONTERMINAL) return;  
        if (text.equals("ClassDeclaration")) {
        	classname=findTerminalNodeAfter(findTerminalNode("class")).concatTerminalSymbols();
        }
        if (text.equals("FieldDeclaration")|| text.equals("Expression")) {   
        	Node n = findTerminalNode("static");
        	if (n!=null || staticfound) {
        		Vector names = new Vector();
        		Vector arrayFound = new Vector();
        		findNonterminalNodesInTree("ArrayDimensionsOrInitializer", arrayFound);

        		findNonterminalNodesInTree("Name", names);
        		findNonterminalNodesInTree("PrimaryPrefix", names);
        		for (int i=0; i<names.size(); i++){
        			String ref = ((Node) names.elementAt(i)).concatTerminalSymbols();
        			if (Java2JavaScriptConverter.isClassName(ref)) {
        				boolean alreadyAdded=false;
        				for (int j=0; j<references.size();j++){
        					if (((String)references.get(j)).equals(Java2JavaScriptConverter.expandClassName(ref))) {
        						alreadyAdded=true;
        						break;
        					}	
        				}
        				if (!alreadyAdded)
        					references.addElement(Java2JavaScriptConverter.expandClassName(ref));
        			}
        		}     
        		if (!staticfound)
        			staticStuff.addElement(copy());
        		Node nextNode = findNonterminalNode("VariableDeclarator");
        		while (nextNode!=null) {
        			Node staticVar = nextNode.findNonterminalNode("VariableDeclaratorId");
            		Vector v = new Vector();
            		v.add(staticVar.concatTerminalSymbols());
            		v.add(classname);
            		v.add(staticVar.findTerminalNodeByPosition(0).getText());
            		staticVars.add(v);
            		nextNode = findNonterminalNodeAfter("VariableDeclarator", nextNode);
        		}
        		children = new Vector();
        		text="";
        		
        		if (arrayFound.size()>0) {
        			for (int i=0; i<arrayFound.size(); i++) {
        	        	((Node) arrayFound.elementAt(i)).extractStaticStuff(staticStuff, references, staticVars, errors, classname, true);
        	        }        
        		}
        	}
        }
/*        
        if (text.equals("MethodDeclaration")) {
        	Node n = findTerminalNode("static");
        	if (n!=null) {
        		staticStuff.addElement(copy());
        		Node staticMethodDec = findNonterminalNode("MethodDeclarator");
        		Vector v = new Vector();
        		v.add(staticMethodDec.concatTerminalSymbols());
        		v.add(classname);
        		v.add(staticMethodDec.findTerminalNodeByPosition(0).getText() + "_" 
        		    + staticMethodDec.findNonterminalNode("FormalParameters")
        		       .countNonterminalNodes("FormalParameter") );
        		staticVars.add(v);
        		children = new Vector();
        		text="";
        	}
        }	  
*/
        // continue operation with child nodes
        for (int i=0; children!=null && i<children.size(); i++) {
        	((Node) children.elementAt(i)).extractStaticStuff(staticStuff, references, staticVars, errors, classname, staticfound);
        }                  
        
        // in case of a class declaration,...
//        if (text.equals("CompilationUnit")) {
        if (text.equals("ClassDeclaration")) {
        	// ...the accumulated static declarations will be added
        	if (staticStuff.size()>0) {
        		int firstPos=children.size();
	        	for (int i=0; i<staticStuff.size(); i++) {
	        		int pos = ((Node) staticStuff.elementAt(i)).getText().equals("MethodDeclaration")?firstPos:children.size();
	        		children.insertElementAt((Node) staticStuff.elementAt(i), pos);
	        		children.insertElementAt(new Node(Node.TYPE_COMMENT, NL), pos+1);
	        	}
	        	staticStuff.setSize(0);
        	}
        	// ...the accumulated references will be added
            if (references.size()>0) {  
            	children.insertElementAt(new Node(Node.TYPE_COMMENT, NL), 0);
    	        for (int i=0; i<references.size(); i++) {        	        	
                	children.insertElementAt(new Node(Node.TYPE_COMMENT, NL), 0);
    	        	children.insertElementAt(new Node(((String) references.elementAt(i)).replace('_','/')), 0);    
        	        children.insertElementAt(new Node(Java2JavaScriptConverter.COMPLETECOMMENT),0);
    	        }
    	        references.setSize(0);
            }
        }
    }
    
//	public void addThis(Vector errors, Vector staticVars) {
//		if (type!=TYPE_NONTERMINAL) return;  
//		
//		if (text.equals("MethodDeclaration") || text.equals("ConstructorDeclaration")) {
//			Vector params = new Vector();
//			findNonterminalNodesInTree("VariableDeclaratorId", params);
//			searchPrimaryExpressions(params, staticVars);
//		}
//		
//        // continue operation with child nodes
//        for (int i=0; children!=null && i<children.size(); i++) {
//        	((Node) children.elementAt(i)).addThis(errors, staticVars);
//        } 		
//	}
//    
//    private void searchPrimaryExpressions(Vector params, Vector staticVars) {
//    	if (type!=TYPE_NONTERMINAL) return;  
//		
//    	if (text.equals("PrimaryExpression")) {
//    		Vector pe =  new Vector();
//    		getChildren()[0].findNonterminalNodesInTree("PrimaryExpression",pe);
//
//    		if (pe.size()==0 || findNonterminalNode("PrimaryPrefix").findNonterminalNode("ThisMethodInvocation")!=null) {
//	    		if (findNonterminalNode("PrimaryPrefix").findTerminalNode("this")==null && findNonterminalNode("PrimaryPrefix").findNonterminalNode("Literal")==null 
//	    				&& findNonterminalNode("PrimaryPrefix").findNonterminalNode("AllocationExpression")==null && findNonterminalNode("PrimaryPrefix").findTerminalNode("super")==null){
//	    			boolean addThis = true;
//	    			
//	    			if (findNonterminalNode("PrimarySuffix")!=null && findNonterminalNode("PrimaryPrefix")!=null){
//	    				if (findNonterminalNode("PrimaryPrefix").concatTerminalSymbols()!=null && Java2JavaScriptConverter.isClassName(findNonterminalNode("PrimaryPrefix").concatTerminalSymbols())){
//	    					//static call with class name
//	    					addThis = false;
//	    				}
//	    			}
//	    			String lastTerminalNodeText = findNonterminalNode("PrimaryPrefix").findLastTerminalNode()!=null?findNonterminalNode("PrimaryPrefix").findLastTerminalNode().getText():null;
//	    			if (lastTerminalNodeText==null)
//	    				lastTerminalNodeText = findNonterminalNode("PrimaryPrefix")!=null?findNonterminalNode("PrimaryPrefix").concatTerminalSymbols():null;
//	    			if (lastTerminalNodeText!=null){
//	    				for (int i=0; i<staticVars.size();i++){
//	    					String staticVar = (String) ((Vector)staticVars.get(i)).get(0);
//	                    	if (lastTerminalNodeText.equals(staticVar)) {
//	                    		//static call without class name
//	                    		addThis = false;
//	                    	}
//	                    }
//	    			}
//	    			
//	    			for (int i=0; i<params.size(); i++){
//	    				String param = ((Node)params.elementAt(i)).findLastTerminalNode().getText();
//	    				if (findNonterminalNode("PrimaryPrefix").findLastTerminalNode()!=null && param.equals(findNonterminalNode("PrimaryPrefix").findLastTerminalNode().getText())) {
//	    					addThis=false;
//	    					break;
//	    				}	
//	    			}
//	    			if (addThis)
//	    				children.add(0, new Node("this."));
//	    		}
//    		}
//    	}
//    	
//    	for (int i=0; children!=null && i<children.size(); i++) {
//        	((Node) children.elementAt(i)).searchPrimaryExpressions(params, staticVars);
//        }
//	}
    
    // transformation code to generate multiple classes from a single class
    // (to reduce size of single classes)
    // class 0:       class with original name - inherited from class 1
    // class 1,2,...: classes containing methods only
    // class n:       base class containing attributes and abstract method declarators
	public Node[] splitClass(int numberofclasses) {
        if (numberofclasses<2) throw new IllegalArgumentException("can only split into 2 or more classes");
        Node cdec = findNonterminalNode("TypeDeclaration").findNonterminalNode("ClassDeclaration");        
        if (cdec==null) throw new IllegalArgumentException("Can not split interface class");
        
        // determine the name of the class
        String name = cdec.findTerminalNodeAfter(cdec.findTerminalNode("class")).getText();
        
        Node[] newclasses = new Node[numberofclasses];
        int[] newclassreceived = new int[numberofclasses];
        
        // construct the classes 
        for (int i=0; i<numberofclasses; i++) {
            // create a copy that will be modified
            Node n = copy();
            
            // modify the class declaration to the correct names and inheritance relationship
            cdec = n.findNonterminalNode("TypeDeclaration").findNonterminalNode("ClassDeclaration");
            
            if (i!=0) {
                Node nn = cdec.findTerminalNodeAfter(cdec.findTerminalNode("class"));
                cdec.children.setElementAt(new Node(name+(char)('A'+i)), cdec.children.indexOf(nn));            
            }
            if (i!=numberofclasses-1) {
                Node en = cdec.findNonterminalNodeAfter("Name", cdec.findTerminalNode("extends"));
                if (en!=null) {
                    cdec.children.setElementAt(new Node("Name", new Node(name+(char)('A'+(i+1)))), cdec.children.indexOf(en));
                }
            }
            
            // strip any implements clause from classes not original class
            if (i!=0) {
                Node in = cdec.findTerminalNode("implements");
                if (in!=null) {
                    cdec.children.removeElement(cdec.findNonterminalNodeAfter("NameList", in));
                    cdec.children.removeElement(in);
                }
            }

            // strip every content from classes being not the base class
            if (i!=numberofclasses-1) {                
                int b1 = cdec.children.indexOf(cdec.findTerminalNode("{"));
                int b2 = cdec.children.indexOf(cdec.findTerminalNode("}"));
                for (int j=b2-1; j>b1; j--) {
                    cdec.children.removeElementAt(j);
                }
            }
            
            // do a downcast for all references to "this" 
            cdec.addDownCastToKeywordThis(name);
            
            // keep class node in array
            newclasses[i] = n;
        }
        
        Node cdeclfrom = newclasses[numberofclasses-1].findNonterminalNode("TypeDeclaration").findNonterminalNode("ClassDeclaration");

        // transfer method implementation to inheritated classes and replace with
        // abstract method in base class
        for (int i=0; i<cdeclfrom.children.size(); i++) {
            Node n = (Node) cdeclfrom.children.elementAt(i);
            if (n.type==TYPE_NONTERMINAL && n.text.equals("ClassBodyDeclaration")) {
                if (n.findNonterminalNode("MethodDeclaration")!=null) {
                    // determine class that has still received littlest data
                    int target = 0;
                    for (int j=1; j<numberofclasses-1; j++) {
                        if (newclassreceived[j] < newclassreceived[target]) target=j;
                    }

                    // transfer code and memorize length
                    Node targetclass = newclasses[target].findNonterminalNode("TypeDeclaration").findNonterminalNode("ClassDeclaration");
                    newclassreceived[target] += n.lengthOfTerminalSymbols();
                    transferMethodDeclaration (n, targetclass);                    
                    
                } else if (n.findNonterminalNode ("ConstructorDeclaration")!=null) {
					for (int j=0; j<numberofclasses-1; j++) {
                        Node targetclass = newclasses[j].findNonterminalNode("TypeDeclaration").findNonterminalNode("ClassDeclaration");
                        copyEmptyConstructorDeclaration (n, targetclass, name+(char)('A'+i));
                    }
                }                    
            } 
        }
        
        // finished with reorganization
        return newclasses;
    }
    
    public void addDownCastToKeywordThis(String classname) {
        if (type!=TYPE_NONTERMINAL) return;
        
        for (int i=0; i<children.size(); i++) {
           ((Node)children.elementAt(i)).addDownCastToKeywordThis (classname);
        }
        
        if (text.equals("PrimaryPrefix")) {
            Node n = findTerminalNode("this");
            if (n!=null) {
                children.setSize(0);
                children.addElement (new Node("("));
                children.addElement (
                       new Node("Expression",
                        new Node("ConditionalExpression",
                         new Node("ConditionalOrExpression",
                          new Node("ConditionalAndExpression",
                           new Node("InclusiveOrExpression",
                            new Node("ExclusiveOrExpression",
                             new Node("AndExpression",
                              new Node("EqualityExpression",
                               new Node("InstanceOfExpression",
                                new Node("RelationalExpression",
                                 new Node("ShiftExpression",
                                  new Node("AdditiveExpression",
                                   new Node("MultiplicativeExpression",
                                    new Node("UnaryExpression",
                                     new Node("UnaryExpressionNotPlusMinus",                
                                      new Node("CastExpression", new Node[] {
                                       new Node("("),
                                       new Node("Name",
                                        new Node(classname)
                                       ),
                                       new Node(")"),
                                       new Node("UnaryExpressionNotPlusMinus",
                                        new Node("PostfixExpression",
                                         new Node("PrimaryExpression",
                                          new Node("PrimaryPrefix",
										   new Node("this")
                                       ))))
                                      })
                       )))))))))))))))
                 );
                children.addElement (new Node(")"));                                      
            }
        }        
    }
    
    void transferMethodDeclaration(Node classbodydecl, Node toclassdecl) {        
        Node mn = classbodydecl.findNonterminalNode("MethodDeclaration");
        
        // check if it makes sense to transfer the method
        if (mn.findTerminalNode("abstract")!=null || mn.findTerminalNode("static")!=null) return;
        Vector v = new Vector();
        mn.findNonterminalNodesInTree("SuperMethodInvocation",v);
        if (v.size()>0) return;
        
        // copy method to target class
        int pos = toclassdecl.children.indexOf(toclassdecl.findTerminalNode("}"));
        toclassdecl.children.insertElementAt(new Node(TYPE_COMMENT, NL+"    "), pos);
        toclassdecl.children.insertElementAt(mn.copy(), pos+1);
        toclassdecl.children.insertElementAt(new Node(TYPE_COMMENT, NL), pos+2);

        // replace source method with abstract method
        mn.children.insertElementAt (new Node(TYPE_COMMENT, " "), 0);
        mn.children.insertElementAt (new Node("abstract"), 0);
        mn.children.setElementAt (new Node(";"), mn.children.indexOf(mn.findNonterminalNode("Block")));
    }

    void copyEmptyConstructorDeclaration(Node classbodydecl, Node toclassdecl, String classname) {
        Node cn = classbodydecl.findNonterminalNode("ConstructorDeclaration").copy();
        int pos = toclassdecl.children.indexOf(toclassdecl.findTerminalNode("}"));
        toclassdecl.children.insertElementAt(new Node(TYPE_COMMENT, NL+"    "), pos);        
        toclassdecl.children.insertElementAt(cn, pos+1);        
        toclassdecl.children.insertElementAt(new Node(TYPE_COMMENT, NL), pos+2);        
        
        // remove all statements between "{" and "}"
        int p1 = cn.children.indexOf(cn.findTerminalNode("{"));
        int p2 = cn.children.indexOf(cn.findTerminalNode("}"));
        for (int i=p2-1; i>p1; i--) cn.children.removeElementAt(i);
        
        // create the super-constructor invocation
		Node an = null;
        Node aln = null;
        cn.children.insertElementAt(new Node(TYPE_COMMENT, NL+"        "), p1+1);
        cn.children.insertElementAt(
            new Node("ExplicitConstructorInvocation", new Node[]{
             new Node ("super"),
             an = new Node ("Arguments", new Node ("("), new Node(")")),
             new Node (";") 
            })
         ,p1+2 );
        cn.children.insertElementAt(new Node(TYPE_COMMENT, NL+"    "), p1+3);
        
        // fill the argumentlist of the invocation with the parameters
        Vector vdecl = new Vector();   
        cn.findNonterminalNode("FormalParameters").findNonterminalNodesInTree("VariableDeclaratorId", vdecl);
        for (int i=0; i<vdecl.size(); i++) {
            Node vdid = (Node) vdecl.elementAt(i);
            String parname = vdid.findTerminalNodeByPosition(0).getText();
            
            Node exp = new Node("Expression",
                        new Node("ConditionalExpression",
                         new Node("ConditionalOrExpression",
                          new Node("ConditionalAndExpression",
                           new Node("InclusiveOrExpression",
                            new Node("ExclusiveOrExpression",
                             new Node("AndExpression",
                              new Node("EqualityExpression",
                               new Node("InstanceOfExpression",
                                new Node("RelationalExpression",
                                 new Node("ShiftExpression",
                                  new Node("AdditiveExpression",
                                   new Node("MultiplicativeExpression",
                                    new Node("UnaryExpression",
                                     new Node("UnaryExpressionNotPlusMinus",
                                      new Node("PostfixExpression",
                                       new Node("PrimaryExpression",
                                        new Node("PrimaryPrefix",
                                         new Node (parname) ))))))))))))))))));
            
            if (aln==null) {
                aln = new Node ("ArgumentList", exp);
                an.children.insertElementAt( aln, 1);
            } else {
                aln.addChild (new Node(","));
                aln.addChild (exp);
            }
        }
        
    }
    
    
    public Node[] splitCompilationUnit()
    {
    	int num = countNonterminalNodes("TypeDeclaration");
    	if (num<2) return new Node[]{this};
    	
    	Node[] units = new Node[num];
    	for (int i=0; i<units.length; i++) {
    		Node n = this.copy();
    		units[i] = n;
    		
    		int count=0;
    		for (int j=0; j<n.children.size(); j++) {
    			Node cn = (Node) n.children.elementAt(j);
    			if (cn.is(TYPE_NONTERMINAL) && cn.getText().equals("TypeDeclaration")) {
    				// remove all definitions that do not belong here
    				if (count!=i) {
    					n.children.setElementAt(new Node(""), j);
    				}
    				count++;
    			}
    		}    				
    	}
    	return units;
    }
    
    public Vector getAllLocalVariableNames()
    {
    	Vector v = new Vector(); 
    	findNonterminalNodesInTree("VariableDeclaratorId", v);
    	for (int i=0; i<v.size(); i++) {
    		v.set(i, ((Node)v.elementAt(i)).findTerminalNodeByPosition(0).getText());
    	}
    	return v;
    }
    
    // -------------------- source obfuscation -------------------------
    void obfuscate(Hashtable obfuscationtable) {
        wasobfuscated = true;
        
        if (type!=TYPE_NONTERMINAL) return;
        
        if (text.equals("PrimaryPrefix")
		||  text.equals("ClassDeclaration") 
        ||  text.equals("InterfaceDeclaration")  
        ||  text.equals("VariableDeclaratorId")
        ||  text.equals("MethodDeclarator")
        ||  text.equals("ConstructorDeclaration")
        ||  text.equals("PrimarySuffix")
		||  text.equals("Name")
        ||  text.equals("ThisMethodInvocation")
        ||  text.equals("SuperMethodInvocation")      
        ||  text.equals("MethodInvocationSuffix")
        ) {
			obfuscateTerminals(obfuscationtable);     
        }

        for (int i=0; children!=null && i<children.size(); i++) {
            ((Node) children.elementAt(i)).obfuscate(obfuscationtable);
        }  
    }
    
    void obfuscateTerminals(Hashtable obfuscationtable) {
        for (int i=0; children!=null && i<children.size(); i++) {
            Node n = ((Node) children.elementAt(i));
            if (n.type==TYPE_TERMINAL) {
                String id = n.text;
                char c = id.charAt(0);
                if ((c<'a' || c>'z') && (c<'A' || c>'Z') && c!='_') continue;
                
                String obf = getObfuscatedIdentifier(id, obfuscationtable);
                if (!obf.equals(id)) {
                    children.setElementAt (new Node(obf),i); 
                }
            }
        }  
    }
    
    static String getObfuscatedIdentifier(String id, Hashtable obfuscationtable) {
        if (obfuscationtable==null) return id;
        String obf = (String) obfuscationtable.get (id);
        if (obf==null) {
            obf = getUnusedIdentifier(obfuscationtable);
            obfuscationtable.put (id,obf);
        }        
        return obf;
    }
    
    static String getUnusedIdentifier(Hashtable obfuscationtable) {
        for (int n=obfuscationtable.size();;n++) {
            String k = getIdentifierFromNumber(obfuscationtable,n);            
            if (!obfuscationtable.containsKey(k)) return k;
        }
    }
    static String getIdentifierFromNumber(Hashtable obfuscationtable, int n) {
        StringBuffer b = new StringBuffer();
        
        String pfx = (String) obfuscationtable.get("!prefix!");
        if (pfx!=null) b.append(pfx);
        else           b.append("V");
        
        int le = b.length();
        while (n>0) {
            int d = n % 26;
            n = n / 26;
            b.insert (le, (char) (d+'a'));
        }
        return b.toString();
    }
}

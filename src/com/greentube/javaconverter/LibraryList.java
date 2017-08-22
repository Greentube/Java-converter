package com.greentube.javaconverter;

import java.util.HashMap;
import java.util.HashSet;

public class LibraryList {

	static String[][] supported = {
			
		{ "java.io.PrintStream",
			"void print(boolean)",
	        "void print(double)",
	        "void print(char)",
	        "void print(int)",
	        "void print(java.lang.Object)",
	        "void print(java.lang.String)",
	        "void println()",
	        "void println(boolean)",
	        "void println(double)",
	        "void println(char)",
	        "void println(int)",
	        "void println(java.lang.Object)",			
	        "void println(java.lang.String)",
		},
		{ "java.lang.Boolean",
			"<init>(boolean)", 
			"boolean booleanValue()",     
			"java.lang.String toString(boolean)",
			"java.lang.Boolean valueOf(boolean)",
			"FALSE",
			"TRUE",
		},
		{ "java.lang.Byte",
			"<init>(byte)",
			"byte byteValue()",
			"java.lang.String toString(byte)",
			"java.lang.Byte valueOf(byte)",
			"MIN_VALUE",
			"MAX_VALUE",
		},
		{ "java.lang.Character",
	        "<init>(char)",
	        "char charValue()",
	        "java.lang.String toString(char)",
	        "java.lang.Character valueOf(char)",
	        "MIN_VALUE",
	        "MAX_VALUE",        			
		},
		{ "java.lang.Double",
			"<init>(double)", 
			"double doubleValue()", 
	        "java.lang.String toString(double)",
	        "java.lang.Double valueOf(double)",
			"MIN_VALUE",
			"MAX_VALUE",
			"POSITIVE_INFINITY",
			"NEGATIVE_INFINITY",			
		},
		{ "java.lang.Enum",
			"java.lang.String name()", 
			"int ordinal()", 
		},
		{ "java.lang.Integer",
			"<init>(int)",
			"int intValue()",
			"java.lang.String toString(int)",
			"java.lang.Integer valueOf(int)",
			"MIN_VALUE",
			"MAX_VALUE",
		},
		{ "java.lang.Iterable",
			"java.util.Iterator iterator()"
		},
		{ "java.lang.Object",
			"<init>()",
		},
		{ "java.lang.Math",
	        "double abs(double)",
			"double acos(double)", 
			"double asin(double)", 
			"double atan(double)", 
			"double atan2(double, double)", 
			"double ceil(double)", 
			"double cos(double)", 
			"double cosh(double)", 
			"double exp(double)", 
			"double floor(double)", 
	        "double IEEERemainder(double, double)",
			"double log(double)", 
			"double log10(double)", 
			"double max(double, double)", 
			"double min(double, double)", 
			"int max(int, int)", 
			"int min(int, int)", 
			"double pow(double, double)", 
	        "double rint(double)", 
	        "double signum(double)",
			"double sin(double)", 
			"double sinh(double)", 
			"double sqrt(double)", 
			"double tan(double)", 
			"double tanh(double)", 
	        "double toDegrees(double)",
	        "toRadians(double)",
			"E",
			"PI",
		},
		{ "java.lang.Runnable",
			"void run()",
		},
		{ "java.lang.String",
			"<init>(char[])",
			"<init>(char[], int, int)",
			"char charAt(int)",
			"int compareTo(java.lang.String)",
			"java.lang.String concat(java.lang.String)",
			"boolean endsWith(java.lang.String)",
			"int indexOf(java.lang.String)",        
			"int indexOf(int)",        
			"int indexOf(java.lang.String, int)",
			"int indexOf(int, int)",
			"boolean isEmpty()",
			"int lastIndexOf(java.lang.String)",
			"int lastIndexOf(int)",
			"int lastIndexOf(java.lang.String, int)",
			"int lastIndexOf(int, int)",
            "int length()",            
            "java.lang.String replace(char, char)",
            "boolean startsWith(java.lang.String)",
            "java.lang.String substring(int)",
            "java.lang.String substring(int, int)",
            "char[] toCharArray()",
            "java.lang.String trim()",			
		},
		{ "java.lang.StringBuffer",
			"<init>()",
			"<init>(java.lang.String)",
	        "java.lang.StringBuffer append(java.lang.Object)",
	        "java.lang.StringBuffer append(java.lang.String)",
	        "java.lang.StringBuffer append(boolean)",
	        "java.lang.StringBuffer append(byte)",
	        "java.lang.StringBuffer append(char)",
	        "java.lang.StringBuffer append(int)",
	        "java.lang.StringBuffer append(double)",
	        "int length()",			
		},
		{ "java.lang.StringBuilder",
			"<init>()",
			"<init>(java.lang.String)",
	        "java.lang.StringBuilder append(java.lang.Object)",
	        "java.lang.StringBuilder append(java.lang.String)",
	        "java.lang.StringBuilder append(boolean)",
	        "java.lang.StringBuilder append(byte)",
	        "java.lang.StringBuilder append(char)",
	        "java.lang.StringBuilder append(int)",
	        "java.lang.StringBuilder append(double)",
	        "int length()",			
		},
		{ "java.lang.System",
			"out",
        	"err",
        	"void arraycopy(java.lang.Object, int, java.lang.Object, int, int)",
            "void exit(int)",
		}
	};
	
	
	static HashMap<String,HashSet<String>> map = null;
	
	public static boolean isAllowed(String fullclassname, String membername)
	{
		// generate map at first call for fast retrieval
		if (map==null) {
			map = new HashMap<>();
			for (int i=0; i<supported.length; i++) {				
				HashSet<String> members = new HashSet<>();
				for (int j=1; j<supported[i].length; j++) {
					members.add(supported[i][j]);
				}
				// support these on any object:
				members.add("boolean equals(java.lang.Object)");	
				members.add("int hashCode()");
				members.add("java.lang.String toString()");
				map.put(supported[i][0],  members);
			}
		}
		
		// unknown classes are not restricted
		if (!map.containsKey(fullclassname)) return true;    
		// provided class only allows whitelisted members
		return map.get(fullclassname).contains(membername);	
	}
	
}

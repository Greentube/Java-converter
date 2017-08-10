package com.greentube.convertertestreserved.event;   // event is reserved in c#

// test the mangling of reserved words in various conversion targets

public class lock {     // reserved in c#
	
	public static int implicit(int a) {         // reserved in c#
		int explicit = a+1;                     // reserved in c#
		return explicit;
	}
		
}

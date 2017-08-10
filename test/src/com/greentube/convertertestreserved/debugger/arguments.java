package com.greentube.convertertestreserved.debugger;   // event is reserved in javascript

// test the mangling of reserved words in various conversion targets

public class arguments {     // reserved in javascript
	
	public static int yield(int a) {         // reserved in javascript
		int eval = a+1;                      // reserved in javascript
		return eval;
	}		
}

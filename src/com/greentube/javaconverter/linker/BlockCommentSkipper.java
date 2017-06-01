package com.greentube.javaconverter.linker;

import java.io.IOException;
import java.io.Reader;



public class BlockCommentSkipper extends Reader
{
	Reader r;	
	int buffer;
	
	boolean inlinecomment;
	boolean inblockcomment;
	
	BlockCommentSkipper(Reader r) throws IOException
	{
		this.r = r;
		buffer = r.read();
		
		inlinecomment = false;
		inblockcomment = false;
	}	
	
	@Override
	public void close() throws IOException 
	{
		r.close();
	}
	
	@Override
	public int read(char[] buffer, int offset, int length) throws IOException 
	{
		for (int i=0; i<length; i++) {
			int c = read();
			if (c<0) return (i>0) ? i : -1;
			buffer[offset+i] = (char) c;
		}
		return length;
	}

	@Override
	public int read() throws IOException 
	{
		boolean skipchar = false;
				
		// continue reading while in block comment 	
		for (;;) {		
			// read while keeping a 2-character sliding window
			int a = buffer;
			buffer = r.read();
			int b = buffer;

			// when instructed to skip next character, shortcut to loop start
			if (skipchar) {
				skipchar=false;
				continue;
			}
			
			// detect line and block comments
			if (a=='/' && b=='/') {
				if (!inblockcomment) inlinecomment=true;
			}
			else if (a=='/' && b=='*') {
				if (!inlinecomment) {
					inblockcomment=true;
					skipchar=true;
				}
			}
			else if (a=='*' && b=='/') {
				if (!inlinecomment && inblockcomment) {
					inblockcomment=false;
					buffer = r.read(); 
					continue; 
				}
			}
			else if (a=='\n' || a=='\r') {
				inlinecomment = false;
			}
			
			if (!inblockcomment || a<0) return a;
		}
	}	

	
//	// simple test cases
//	public static void main(String args[]) throws IOException {
//		BufferedReader r = new BufferedReader ( new BlockCommentSkipper ( new StringReader(
//			" code // comment /* \n"
//	      + "more code /* comment2 // up to */ \n"
//		  + "code again \n"
//		  + " see /* description  \n"
//		  + "      * desc // desc **/ eof\n"
//		)));
//		
//		String l;
//		while ( (l = r.readLine()) != null) {
//			System.out.println(l);
//		}
//		
//	}
}


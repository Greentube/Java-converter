package com.greentube.convertertest3;

import java.io.PrintStream;

public class InitializerBlockTest extends InitializerBlockParent {

	public static int something = 99;
	public static String nothing;
	public static PrintStream str;
	
	static {
		str = System.out; 
		something = 112233;
		overridden = 3;
	}
		
	public static int overridden = 44; 
	
	
	{
		x = 2;
	}
	
	public int x=9,y,z;

	public InitializerBlockTest() 
	{
		z = 3*x;
	}
	public InitializerBlockTest(int v) 
	{
		super(v);
		z = y*x;
	}
	
	{
		y = 123;
	}

	
	
}

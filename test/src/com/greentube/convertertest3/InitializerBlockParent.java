
package com.greentube.convertertest3;


public class InitializerBlockParent {

	public static String parenttext;
	
	static {
		parenttext = "hi folks";
	}
		
	public int u=8,v,w;	
	
	{
		u = 107;
	}

	public InitializerBlockParent() 
	{
		v = 3*u;
	}
	public InitializerBlockParent(int _) 
	{
		v = _*u;
	}	
	
}


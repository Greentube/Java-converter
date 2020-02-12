package com.greentube.convertertestjava8;

public class ExtraRunable implements Runnable, Iterable<String>
{
	public void run()
	{	
		System.out.println("RUN");	
	}
	public String walk()
	{	
		return "WALK";	
	}
	public java.util.Iterator<String> iterator()
	{		
		return null;
	}
}

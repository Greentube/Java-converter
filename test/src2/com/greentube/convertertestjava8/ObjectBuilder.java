package com.greentube.convertertestjava8;

public abstract class ObjectBuilder 
{	
	public abstract Object build();
	public Runnable buildRunable() { return () -> System.out.println("run"); }
}

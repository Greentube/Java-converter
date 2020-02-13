package com.greentube.convertertestjava8;

public class IntegerBuilder extends ObjectBuilder {

	public Integer build() 
	{
		return new Integer(4711);
	}
	
	public ExtraRunable buildRunable()
	{
		return new ExtraRunable();
	}
	
	public Integer indirectlyBuild()
	{
		return build();
	}
}

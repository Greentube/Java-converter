/*
 * DummyClass.java
 *
 * Created on 09. September 2005, 10:18
 */

package com.greentube.convertertest;

/**
 *
 * @author  reinhard
 */
public class DummyClass extends Object {
    
    /** Creates a new instance of DummyClass */
    public DummyClass() {
    }
    
    public /*OVERRIDE*/ String toString() {
        return "dummy";
    }
    
    public String secondaryString()
    {
    	return (new Secondary()).secondaryString();    	
    }
}

class Secondary extends Object
{
	private String s;
	
	public Secondary()
	{		
		s = "secondary";
	}	
	
	public String secondaryString()
	{
		return s;
	}
	
}
package com.greentube.convertertest;


//Parent class of java2flash test class to test super super calls

public class TestParentIntermediate extends TestParent implements TestInterface {

	public TestParentIntermediate(int i) {
		super(i);
	}

	public TestParentIntermediate() {
	}
	
    public int add(int a, int b)
    {
    	return a+b;
    }
    public String hello()
    {
    	return "hello";
    }	
	
}

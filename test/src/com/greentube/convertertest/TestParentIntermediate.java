package com.greentube.convertertest;

public class TestParentIntermediate extends TestParent implements TestInterface 
{
    public TestParentIntermediate(int i) 
    {   super(i);
    }

    public TestParentIntermediate() 
    {
    }

    public int add(int a, int b)
    {   return a+b;
    }
    public String hello()
    {   return "hello";
    }

    public int depth() 
    {   return super.depth()+1;
    }
}

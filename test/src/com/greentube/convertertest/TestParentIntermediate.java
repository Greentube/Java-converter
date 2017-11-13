package com.greentube.convertertest;

public class TestParentIntermediate extends TestParent implements TestInterface 
{
    public TestParentIntermediate(int i) 
    {   super(i);
    }

    public TestParentIntermediate() 
    {
    }

    @Override
    public int add(int a, int b)
    {   return a+b;
    }
    @Override
    public String hello()
    {   return "hello";
    }

    @Override
    public int depth() 
    {   return super.depth()+1;
    }
}

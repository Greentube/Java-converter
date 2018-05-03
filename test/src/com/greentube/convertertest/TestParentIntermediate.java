package com.greentube.convertertest;

public abstract class TestParentIntermediate extends TestParent implements TestInterface 
{
    public TestParentIntermediate(int i) 
    {   super(i);
    }

    public TestParentIntermediate() 
    {
    }

    public abstract int xyz();

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

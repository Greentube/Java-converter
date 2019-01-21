package com.greentube.convertertest;

public class OverloadedClass implements OverloadedInterface
{
    private String delimitor;
    
    public OverloadedClass()
    {
        this("+");
    }
    public OverloadedClass(String delimitor)
    {
        this.delimitor = delimitor;
    }
    public OverloadedClass(int delimitor)
    {
        this("" + delimitor);
    }
    public OverloadedClass(char delimitor)
    {
        this("" + delimitor);
    }

    public String plus(String a, String b)
    {   
        return a + delimitor + b;         
    }
    public int plus(int a, int b)
    {   
        return a + b;         
    }
    public double plus(double a, double b)
    {   
        return a + b;         
    }
    
    public static boolean plus(boolean a, boolean b)
    {
        return a && b;
    }

    public static String add(String a, String b)
    {   
        return a + b;         
    }
    public static int add(int a, int b)
    {   
        return a + b;         
    }
}

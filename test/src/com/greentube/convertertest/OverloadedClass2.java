package com.greentube.convertertest;

public class OverloadedClass2 extends OverloadedClass implements OverloadedInterface2
{
    public int plus(int a, int b)
    {   
        return a + b + 2;         
    }

    public static double add(double a, double b)
    {   
        return a + b;         
    }

}

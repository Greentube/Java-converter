package com.greentube.convertertest;

public class OverloadedClass2 extends OverloadedClass implements OverloadedInterface2
{
    public double plus(double a, double b)
    {   
        return a + b + 2.0;
    }

    public static double add(double a, double b)
    {   
        return a + b;         
    }

}

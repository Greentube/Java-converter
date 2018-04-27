package com.greentube.hectoc;

abstract public class Expression 
{    
    final static int UNDEFINED = Integer.MIN_VALUE;
    abstract public int value(int[] values);
    abstract public String toString(int[] values);    
}

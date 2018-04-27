package com.greentube.hectoc;

public class Constant extends Expression
{
    int firstdigit;
    int numdigits;
    
    public Constant(int firstdigit, int numdigits)
    {
        this.firstdigit = firstdigit;
        this.numdigits = numdigits;
    }      
    
    public int value(int[] values)
    {
        int v=0;
        for (int i=0; i<numdigits; i++)
        {   v = v * 10 + values[firstdigit+i];
        }
        return v;
    } 
    
    public String toString()
    {   
        String s = "";
        for (int i=0; i<numdigits; i++)
        {   s = s + (char) ('A' + (firstdigit+i));
        }
        return s;
    }
    public String toString(int[] values)
    {
        return ""+value(values);    
    }   
}

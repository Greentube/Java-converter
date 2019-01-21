package com.greentube.convertertestjava5;


class OverwriterBase
{
    
    Object x() 
    {   
        return "some";   
    }
    
    Object y() 
    {   
        return "nonsense";   
    }
    
    int z(int i)
    {
        return i+1;
    }
    int z(double d)
    {
        return (int) d;
    }
}

public class Overwriter extends OverwriterBase
{
    Integer x() 
    {   
        return new Integer(1);   
    }
    
    Double y() 
    {   
        return new Double(1.5);   
    }
    
    int z(int i)
    {
        return i-1;
    }
    int z(String s)
    {
        return s.length();
    }

} 


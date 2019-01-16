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

} 


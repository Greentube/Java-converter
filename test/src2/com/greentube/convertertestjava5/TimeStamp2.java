package com.greentube.convertertestjava5;

public class TimeStamp2 extends TimeStamp 
{
    public TimeStamp2(int t) 
    {   super(t);
    }

    public String timeString() 
    {   return ""+time+":00";
    }
}

package com.greentube.convertertestjava5;

public class TimeStamp 
{
    public final int time;

    public TimeStamp(int t) 
    {   time = t;
    }

    public String toString() 
    {   return "TS:"+timeString();
    }

    public String timeString() 
    {   return ""+time;
    }
}

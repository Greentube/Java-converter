package com.greentube.convertertestjava5;

public enum Day 
{
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY; 

    public boolean isWeekend() 
    {   return this==SUNDAY || this==SATURDAY; 
    }

    public static Day[] workingDays() 
    {   return new Day[]{MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY};
    }
}

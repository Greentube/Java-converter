package com.greentube.convertertestjava8;

public class SmallPot  
{
    public String makeTea(int quantity)
    {
        return quantity + "ml of some tea";
    }
    
    public String makeMoreTea(int quantity)
    {
        return makeTea(2*quantity);
    }
}

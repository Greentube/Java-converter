package com.greentube.convertertestjava8;

public class BigPot implements TeaProvider 
{
    public String makeTea(int quantity)
    {
        return quantity + "ml of generic tea";
    }
    
    public String makeMoreTea(int quantity)
    {
        return makeTea(10*quantity);
    }
}

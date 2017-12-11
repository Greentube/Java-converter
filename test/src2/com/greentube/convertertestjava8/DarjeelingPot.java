package com.greentube.convertertestjava8;

public class DarjeelingPot extends SmallPot implements TeaProvider
{
    public String makeTea(int quantity)
    {
        return quantity + "ml of darjeeling";
    }
}

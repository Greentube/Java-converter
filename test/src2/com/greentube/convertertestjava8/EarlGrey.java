package com.greentube.convertertestjava8;

public class EarlGrey implements TeaProvider 
{
    public String makeTea(int quantity)
    {
        return quantity + "ml of earl grey";
    }
}

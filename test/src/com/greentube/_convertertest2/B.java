package com.greentube._convertertest2;

public class B extends com.greentube.convertert€st_3.A 
{
    public void test(B other)
    {
        other.s.length();  // <-- compiler error in old extendj version
    }
}


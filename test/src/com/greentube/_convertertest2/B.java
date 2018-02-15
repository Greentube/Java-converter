package com.greentube._convertertest2;

public class B 
{
    // this cyclic dependency can not be resolved:
    // final static A a = new A();
    
    // therefore the initialization is moved into the another class
    static A a;    
}


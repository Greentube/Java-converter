package com.greentube._convertertest2;

public class A 
{
    final static B b = new B();
    
    // was moved here to avoid cyclic dependency  
    static { B.a = new A(); }
}

package com.greentube.convertertestjava8;

import java.util.ArrayList;

@SuppressWarnings("rawtypes")
public class AnnotationsTest 
{
     
    @Override
    public String toString()
    {
        return new ArrayList().toString()+"AnnotationsTest";
    }
    
    
    @Deprecated    
    public static void oldstuff()
    {
    }
    
    /** @deprecated
     */     
    public static void oldstuff2()
    {
    }
        
    @SafeVarargs
    public static <T> T[] unsafe(T... elements) {
        return elements; // unsafe! don't ever return a parameterized varargs array
    }
    public static <T> T[] broken(T seed) {
        T[] plant = unsafe(seed, seed, seed); // broken! This will be an Object[] no matter what T is
        return plant;
    }
    public static void main(String[] args) {
        String[] plant = broken("seed");
        System.out.println(plant[0]);
        
        oldstuff();
        oldstuff2();
    }
 
    
    @FunctionalInterface
    public interface Adder {
        int add(int a, int b);
    }    
    
}


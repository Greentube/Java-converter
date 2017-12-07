package com.greentube.convertertestjava8;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

import com.greentube.convertertestjava7.TestJava7;

public class TestJava8 extends TestJava7
{

    public static void main(String[] args) 
    {   TestJava7.main(args);

        System.out.println ("-- converter test suite for java 8" );
        
        lambdatest();
        methodreferencetest();
        interfacemethodstest();
    }
    
    public static void lambdatest()
    {
        System.out.println("- lambda expression");
        
        List<String> l = makelist("hey", "this", "is", "nice");
        assertO(l.toString(), "[hey, this, is, nice]");
                
        List<String> d = apply(l, s -> s+s);
        
        assertO(d.toString(), "[heyhey, thisthis, isis, nicenice]");   
    }
    
    public static void methodreferencetest()
    {
        System.out.println("- method reference");
    
        List<String> l = makelist("hey", "this", "is", "nice");
        assertO(l.toString(), "[hey, this, is, nice]");      
          
        List<String> d = apply(l, TestJava8::twice);
        
        assertO(d.toString(), "[heyhey, thisthis, isis, nicenice]");
    }
    
    
    private static List<String> makelist(String... elements)
    {
        ArrayList<String> l = new ArrayList<>();
        for (String t:elements)
        {   l.add(t);
        }
        return l;
    }
    
    private static <T> List<T> apply(List<T> l, Function<T,T> f)
    {
        ArrayList<T> r = new ArrayList<T>();
        for (T t:l) 
        {   r.add(f.apply(t));
        }
        return r;
    }
    
    public static String twice(String a)
    {
        return a+a;
    }
    
    public static void interfacemethodstest()
    {
        System.out.println("- interface methods");
        
        TeaProvider tp = new EarlGrey();
        
        assertO(tp.makeTea(100), "100ml of earl grey");
//        assertI(TeaProvider.more(7), 21);
//        assertO(tp.makeMoreTea(50), "150ml of earl grey");
    }
}

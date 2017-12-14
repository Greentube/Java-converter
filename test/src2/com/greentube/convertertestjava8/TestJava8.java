package com.greentube.convertertestjava8;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.function.*;

import com.greentube.convertertestjava7.TestJava7;

public class TestJava8 extends TestJava7
{

    public static void main(String[] args) 
    {   TestJava7.main(args);

        System.out.println ("-- converter test suite for java 8" );
        
        lambdatest();
        nonstaticlambdatest();
        methodreferencetest();
        interfacemethodstest();
        foreachtest();
        customsignaturetest();
        supplierconsumertest();
        customiterator();
        customcomparator();
    }
    
    public static void lambdatest()
    {
        System.out.println("- lambda expression");
        
        List<String> l = makelist("hey", "this", "is", "nice");
        assertO(l.toString(), "[hey, this, is, nice]");
        
        String seperator = "/";        
        List<String> d = apply(l, s -> s+seperator+s);
        
        assertO(d.toString(), "[hey/hey, this/this, is/is, nice/nice]");   
    }
    
    
    public static void methodreferencetest()
    {
        System.out.println("- method reference");
    
        List<String> l = makelist("hey", "this", "is", "nice");
        assertO(l.toString(), "[hey, this, is, nice]");      
          
        List<String> d = apply(l, TestJava8::twice);
        
        assertO(d.toString(), "[heyhey, thisthis, isis, nicenice]");
    }
    
    public static void nonstaticlambdatest()
    {
        System.out.println("- non-static lambda expression");
    
        NonstaticLambdas n = new NonstaticLambdas();
        assertI(n.makesum(), (3+4*2+5*3+4*3)+3+5);
        assertI(n.makesum2(), (3*4*5*3*5)+3+5);
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
        
        assertI(TeaProvider.more(7), 21);

        TeaProvider tp = new EarlGrey();        
        assertO(tp.makeTea(100), "100ml of earl grey");
        assertO(tp.makeMoreTea(50), "150ml of earl grey");
        
        TeaProvider tp2 = new BigPot();
        assertO(tp2.makeTea(70), "70ml of generic tea");
        assertO(tp2.makeMoreTea(70), "700ml of generic tea");
        
        TeaProvider tp3 = new DarjeelingPot();
        assertO(tp3.makeTea(90), "90ml of darjeeling");
        assertO(tp3.makeMoreTea(90), "180ml of darjeeling");
        
        assertO((new BigPot()).makeMoreTea(5), "50ml of generic tea");
        assertO((new DarjeelingPot()).makeMoreTea(5), "10ml of darjeeling");
        assertO((new EarlGrey()).makeMoreTea(5), "15ml of earl grey");
        assertO((new SmallPot()).makeMoreTea(5), "10ml of some tea");
    }
    
    public static void foreachtest()
    {
        System.out.println("- forEach");
    
        List<String> l = makelist("hey", "this", "is", "nice");
        List<String> target = new ArrayList<>();
        
        l.forEach(e -> target.add(e+"!"));
        assertO(target.toString(), "[hey!, this!, is!, nice!]");
    }
    
    public static void customsignaturetest()
    {
        System.out.println("- custom signature");
        
        assertI(useternary((a,b,c) -> (a+b+c)), 11);
        assertI(useternary((a,b,c) -> (a*b*c)), 21);
        
        assertI(useternary(TestJava8::sumthree), 11);        
    }
    
    public static int useternary(TernaryFunction f)
    {
        return f.compute(1,3,7);
    }
    
    public static int sumthree(int a, int b, int c)
    {
        return a+b+c;
    }
    
    public static void supplierconsumertest()
    {
        System.out.println("- supplier/predicate/function/consumer test");
        
        ArrayList<String> l = new ArrayList<>();
        int[] n = new int[]{0};
        Consumer<String> putInL = o -> l.add(o); 
        // create numbers 0 to 9 / allow only even / multiply by 3 / collect
        TestJava8.<Integer,String>process ( 
            () -> n[0]<10?Integer.valueOf(n[0]++):null, 
            (o) -> o.intValue()%2==0, 
            (o) -> ""+o.intValue()*3, 
            putInL 
        );
        assertO(l.toString(), "[0, 6, 12, 18, 24]");

        // create numbers 0 to 9 / remove only even and divisible by 3 plus the 5 / .. / collect
        l.clear();
        n[0] = 0;
        Predicate<Integer> iseven = (o) -> o.intValue()%2==0;
        TestJava8.<Integer,Integer>process ( 
            () -> n[0]<20?Integer.valueOf(n[0]++):null, 
            iseven.and((o) -> o.intValue()%3==0).or((o) -> o.intValue()==5).negate(), 
            Function.identity(), 
            o -> l.add(""+o) 
        );
        assertO(l.toString(), "[1, 2, 3, 4, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19]");
        
        // create numbers 0 to 9 / remove 3 and 7 / .. / collect
        l.clear();
        n[0] = 0;
        Predicate<Integer> eq7 = (o) -> o.intValue()==7;
        TestJava8.<Integer,Integer>process ( 
            () -> n[0]<10?Integer.valueOf(n[0]++):null, 
            eq7.or((o)->o.intValue()==3).negate(), 
            Function.identity(), 
            o -> l.add(""+o) 
        );
        assertO(l.toString(), "[0, 1, 2, 4, 5, 6, 8, 9]");
        
        // create numbers 0 to 9 / .. / multiply and add / collect
        l.clear();
        n[0] = 0;
        Function<Integer,Integer> mul = (o) -> Integer.valueOf(o.intValue()*7);
        TestJava8.<Integer,Integer>process ( 
            () -> n[0]<10?Integer.valueOf(n[0]++):null, 
            null, 
            mul.andThen( (o) -> Integer.valueOf(o.intValue()+9) ), 
            o -> l.add(""+o) 
        );
        assertO(l.toString(), "[9, 16, 23, 30, 37, 44, 51, 58, 65, 72]");
        
        // create numbers 0 to 9 / .. / multiply, but before that add / collect
        l.clear();
        n[0] = 0;
        TestJava8.<Integer,Integer>process ( 
            () -> n[0]<10?Integer.valueOf(n[0]++):null, 
            null, 
            mul.compose( (o) -> Integer.valueOf(o.intValue()+9) ), 
            o -> l.add(""+o) 
        );
        assertO(l.toString(), "[63, 70, 77, 84, 91, 98, 105, 112, 119, 126]");
        
        // create numbers 0 to 4 / .. / convert to String / collect twice
        l.clear();
        n[0] = 0;
        process ( 
            () -> n[0]<5?Integer.valueOf(n[0]++):null, 
            null, 
            o -> o.toString(), 
            putInL.andThen(o -> putInL.accept("!"+o)).andThen(putInL) 
        );
        assertO(l.toString(), "[0, !0, 0, 1, !1, 1, 2, !2, 2, 3, !3, 3, 4, !4, 4]");
    }
    
    private static <T,U> void process(Supplier<T> s, Predicate<T> p, Function<T,U> f, Consumer<U> c)
    {
        T o;
        while ( (o = s.get()) != null) 
        {   if (p==null || p.test(o)) 
            {   c.accept(f.apply(o));
            }
        }
    }
    
    public static void customiterator()
    {
        System.out.println("- custom iterator");

        CustomIterable c = new CustomIterable();

        ArrayList<String> l = new ArrayList<>();
        c.forEach( o -> l.add(o.toString()) );        
        assertO(l.toString(), "[4, 5, 6, 7, 8]");
        
        l.clear(); 
        for (Integer o:c) 
        {   l.add(o.toString());
        }        
        assertO(l.toString(), "[4, 5, 6, 7, 8]");
    }
    
    public static void customcomparator()
    {
        System.out.println("- custom comparator");
    
        String[] l1 = {"asdf","xx","flasdkjjdfas","dd", "xyz"};
        String[] l2 = {"f","xy","fdfas","döööd", "äüö"};

        // use explicitly defined comparator 
        Comparator<String> lc = new StringLengthComparator();
        assertO(compareAll(l1,l2,lc), "3,0,7,-3,0,");
        
        // pre-define a comparator with a lambda expression 
        Comparator<String> sc = (a,b) -> a.compareTo(b);
        assertO(compareAll(l1,l2,sc), "-5,-1,8,-146,-108,");

        // construct comparators by inversion and chaining
        assertO(compareAll(l1,l2,lc.reversed()), "-3,0,-7,3,0,");      
        assertO(compareAll(l1,l2,lc.reversed().thenComparing(sc)), "-3,-1,-7,3,-108,");      
        
        // nonsense-comparator as lambda expression inlined into the call
        assertO(compareAll(l1,l2, (a,b)->a.length()*b.length()), "4,4,60,10,9,");      
    }
    
    private static String compareAll(String[]a, String[] b, Comparator<String>c)
    {
        String res = "";
        for (int i=0; i<a.length; i++) 
        {   res += c.compare(a[i],b[i])+",";
        }
        return res;
    }
}

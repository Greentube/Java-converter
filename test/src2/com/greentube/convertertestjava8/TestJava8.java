package com.greentube.convertertestjava8;

import java.util.*;
import java.util.function.*;

import com.greentube.convertertestjava7.TestJava7;

import static com.greentube.convertertestjava8.p2.WithStaticMethod.m;

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
        removeiftest();
        getordefaulttest();
        replacealltest();
        composinglambdastest();
        customsignaturetest();
        supplierconsumertest();
        customiterator();
        customcomparator();
        sortliststest();
        staticimporttest();
        specializedoverridetest();
        featureshowcase();
        assertO(new AnnotationsTest().toString(),"[]AnnotationsTest");        
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
        assertI(n.makesum(), (3+4*2+5*3+4*3)+3+5+3*2);
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
        
        target.clear();
        ArrayList<String> al = new ArrayList<>();
        al.add("one");
        al.add("two");
        al.forEach(e -> target.add(e));
        AbstractCollection<String> abc = al;
        abc.forEach(e -> target.add(e));
        AbstractList<String> abl = al;
        abl.forEach(e -> target.add(e));
        Vector<String> vec = new Vector<>();
        vec.add("x");
        vec.add("y");
        vec.forEach(e -> target.add(e));
        LinkedList<String> ll = new LinkedList<>();
        ll.add("x");
        ll.add("y");
        ll.forEach(e -> target.add(e));
        assertO(target.toString(), "[one, two, one, two, one, two, x, y, x, y]");
        
        
        
        HashMap<String,Integer> m = new HashMap<>();
        m.put("a", Integer.valueOf(17));
        m.put("b", Integer.valueOf(4));
        m.put("c", Integer.valueOf(8));
        m.put("d", Integer.valueOf(15));
        HashMap<String,Integer> x = new HashMap<>();
        int[] count = new int[1];
        BiConsumer<String,Integer> bc = (k, v) -> x.put(k, v);
        m.forEach(bc.andThen((k, v) -> count[0]++));
        assertO(m, x);
        assertI(count[0], 4);
        
        count[0]=0;
        m.forEach((k,v) -> { count[0] += v.intValue(); } );
        assertI(count[0], 17+4+8+15);
    }
    
    public static void removeiftest()
    {
        System.out.println("- removeIf");
    
        List<String> l = makelist("hey", "this", "is", "nice");
        l.removeIf(o -> o.startsWith("h"));
        assertO(l.toString(), "[this, is, nice]");
        l.removeIf(o -> o.contains("s"));
        assertO(l.toString(), "[nice]");    
    }
    
    public static void getordefaulttest()
    {
        System.out.println("- getOrDefault");

        Map<String,String> m = new HashMap<>();
        m.put("see", "yes");
        m.put("look", "no");
        assertO(m.getOrDefault("see", "x"), "yes");
        assertO(m.getOrDefault("september", "x"), "x");
        assertO(m.getOrDefault("fluke", null), null);
        assertO(m.getOrDefault("look", null), "no");
    }
    
    public static void replacealltest()
    {
        System.out.println("- replaceAll");
        
        List<String> l = makelist("this","are","some","words");
        l.replaceAll(s -> s.concat(s));
        assertO(l.toString(), "[thisthis, areare, somesome, wordswords]");        
    }
    
    public static void composinglambdastest()
    {
        class Filter<T> implements Consumer<T> 
        {   Predicate<T> p;
            Consumer<T> c;
            Filter(Predicate<T> p, Consumer<T>c)
            {   this.p = p;
                this.c = c;
            }
            public void accept(T o)
            {   if (p.test(o)) c.accept(o);
            }
        }       
        class Processor<T> implements Consumer<T> 
        {   Function<T,T> f;
            Consumer<T> c;
            Processor(Function<T,T>f, Consumer<T>c)
            {   this.f = f;
                this.c = c;
            }
            public void accept(T o)
            {   c.accept(f.apply(o));
            }
        }       
    
        System.out.println("- composing lambdas");
        ArrayList<String> target = new ArrayList<>();
        
        // some generic building blocks
        Predicate<String> hasEE = s -> s.contains("ee");        
        Function<String,String> reverse = s -> 
        {   StringBuilder b = new StringBuilder();
            for (int i=s.length()-1; i>=0; i--) { b.append(s.charAt(i)); }
            return b.toString();
        };
        Consumer<String> collect = s -> target.add(s);
        
        // building a (reusable) pipeline from the blocks
        Consumer<String> processing = (o) -> 
        {   if (hasEE.test(o))
            {   String r = reverse.apply(o);
                collect.accept(r);
            }   
        };
        // build the same pipeline using different means
        Consumer<String> proc2 = new Filter<String>
        (   hasEE, 
            new Processor<String>(reverse, collect)
        );
                 
                 
        Arrays.<String>asList("see","the","bee","buzzing","in","the","tree")
        .forEach( processing );  
        assertO(target.toString(), "[ees, eeb, eert]"); 
        
        target.clear();
        Arrays.<String>asList("wee","free","men")
        .forEach( processing );  
        assertO(target.toString(), "[eew, eerf]");         
        
        target.clear();
        Arrays.<String>asList("eepson","memory","mastermeend", "lee", "bravo")
        .forEach( proc2 );  
        assertO(target.toString(), "[nospee, dneemretsam, eel]");   
        
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
        TestJava8.<Integer,String>process 
        (   () -> n[0]<10?Integer.valueOf(n[0]++):null, 
            (o) -> o.intValue()%2==0, 
            (o) -> ""+o.intValue()*3, 
            putInL 
        );
        assertO(l.toString(), "[0, 6, 12, 18, 24]");

        // create numbers 0 to 9 / remove only even and divisible by 3 plus the 5 / .. / collect
        l.clear();
        n[0] = 0;
        Predicate<Integer> iseven = (o) -> o.intValue()%2==0;
        TestJava8.<Integer,Integer>process 
        (   () -> n[0]<20?Integer.valueOf(n[0]++):null, 
            iseven.and
            (   (o) -> o.intValue()%3==0
            )
            .or 
            (   (o) -> o.intValue()==5 
            )
            .negate(), 
            Function.identity(), 
            o -> l.add(""+o) 
        );
        assertO(l.toString(), "[1, 2, 3, 4, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19]");
        
        // create numbers 0 to 9 / remove 3 and 7 / .. / collect
        l.clear();
        n[0] = 0;
        Predicate<Integer> eq7 = (o) -> o.intValue()==7;
        TestJava8.<Integer,Integer>process 
        (   () -> n[0]<10?Integer.valueOf(n[0]++):null, 
            eq7.or((o)->o.intValue()==3).negate(), 
            Function.identity(), 
            o -> l.add(""+o) 
        );
        assertO(l.toString(), "[0, 1, 2, 4, 5, 6, 8, 9]");
        
        // create numbers 0 to 9 / .. / multiply and add / collect
        l.clear();
        n[0] = 0;
        Function<Integer,Integer> mul = (o) -> Integer.valueOf(o.intValue()*7);
        TestJava8.<Integer,Integer>process 
        (   () -> n[0]<10?Integer.valueOf(n[0]++):null, 
            null, 
            mul.andThen( (o) -> Integer.valueOf(o.intValue()+9) ), 
            o -> l.add(""+o) 
        );
        assertO(l.toString(), "[9, 16, 23, 30, 37, 44, 51, 58, 65, 72]");
        
        // create numbers 0 to 9 / .. / multiply, but before that add / collect
        l.clear();
        n[0] = 0;
        TestJava8.<Integer,Integer>process 
        (   () -> n[0]<10?Integer.valueOf(n[0]++):null, 
            null, 
            mul.compose( (o) -> Integer.valueOf(o.intValue()+9) ), 
            o -> l.add(""+o) 
        );
        assertO(l.toString(), "[63, 70, 77, 84, 91, 98, 105, 112, 119, 126]");
        
        // create numbers 0 to 4 / .. / convert to String / collect twice
        l.clear();
        n[0] = 0;
        process 
        (   () -> n[0]<5?Integer.valueOf(n[0]++):null, 
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
    

    final static Comparator<String> c2 = 
    (   (Comparator<String>) 
        (a,b) -> b.length() - a.length() 
    )
    .thenComparing( (a, b) -> a.compareTo(b) );
    
    // non-final comparator object 
    public static Comparator<String> cv2 = (Comparator<String>) (a, b) -> a.compareTo(b);  

    public static void sortliststest()
    {
        System.out.println("- sort lists");

        final Comparator<String> c = (a, b) -> ((String)a).compareTo((String)b);
        List l = new ArrayList();
        l.add("nixi");
        l.add("trixi");
        l.add("hubert");
        l.add("sucker");
        l.sort(c);
        assertO(l.toString(), "[hubert, nixi, sucker, trixi]");
        
        l = new LinkedList();
        l.add("nixi");
        l.add("trixi");
        l.add("hubert");
        l.add("sucker");
        l.add("queer");
        l.add("horr");
        l.sort(c);
        assertO(l.toString(), "[horr, hubert, nixi, queer, sucker, trixi]");
        
        // sorting by length needs to keep other sort criteria stable
        l.sort( (a,b)->((String)a).length() - ((String)b).length() );  
        assertO(l.toString(), "[horr, nixi, queer, trixi, hubert, sucker]");
        // other try: first sort by name descending 
        l.sort(c.reversed());  
        assertO(l.toString(), "[trixi, sucker, queer, nixi, hubert, horr]");
        // sorting by length needs to keep other sort criteria stable
        l.sort( (a,b)->((String)a).length() - ((String)b).length() );  
        assertO(l.toString(), "[nixi, horr, trixi, queer, sucker, hubert]");  
        
        // do a sort with multiple cascaded sort criteria (using generics for shorter lambda expressions)
        List<String> sl = Arrays.asList("more","of","the","same", "with", "less", "effort");
        sl.sort (c2);      
        assertO(sl.toString(), "[effort, less, more, same, with, the, of]");
        
        // perform a sort with a non-final comparator (need to explicitly convince the converter
        // it is surely not null)
        sl.sort(cv2.reversed().reversed());
        assertO(sl.toString(), "[effort, less, more, of, same, the, with]");
        
    }

    public static void staticimporttest()
    {
        System.out.println("- test static import");
        assertI(m(), 7);
    }
    
    public static void specializedoverridetest()
    {
        System.out.println("- test specialized override");
        
        IntegerBuilder ib = new IntegerBuilder();
        assertI(ib.build().intValue(), 4711);
        ObjectBuilder ob = ib;
        assertO(ob.build(), Integer.valueOf(4711));    	
    }

    
    public static void featureshowcase()
    {
        System.out.println("- show cool features of java 8 (mainly funky lambdas and generics");
           
        // Create a fix sized list-view of an array             
        List<String> lfix = Arrays.asList("Hi", "this", "are", "some", "texts");
        // Copy to newly created variable-sized list
        ArrayList<String> l = new ArrayList<>(lfix);
        
        // do some operations on the list, using lambda operators (but avoid auto-boxing)
        l.removeIf( x->x.equals("some"));             // filter out some elements
        l.sort((x,y) -> y.compareTo(x));              // sort the list from Z to A
        l.replaceAll( x -> "_" + x + "_" );           // do operations on individual elements
        List<Integer> li = map(l, s->Integer.valueOf(s.length()));  // mapping operation creates new list
        Integer max = reduce(li, (a,b) -> Integer.valueOf(Math.max(a.intValue(),b.intValue())));
        Integer min = reduce(li, (a,b) -> Integer.valueOf(Math.min(a.intValue(),b.intValue())));
        Integer sum = reduce(li, (a,b) -> Integer.valueOf(a.intValue()+b.intValue()));
                
        assertO(l.toString(), "[_this_, _texts_, _are_, _Hi_]");
        assertO(li.toString(), "[6, 7, 5, 4]");
        assertI(max.intValue(), 7);
        assertI(min.intValue(), 4);
        assertI(sum.intValue(), 22);
    }
    
    // implementation of a generic map operation 
    private static <T,R> List<R> map(List<T> list, Function<T,R> mappingfunction)
    {
        ArrayList<R> result = new ArrayList<>();
        for (T e:list) 
        {   result.add(mappingfunction.apply(e));
        }
        return result;
    }
    // implementation of a generic reduce operation 
    interface ReduceFunction<T> {  T apply(T a, T b);  }
    private static <T> T reduce(List<T> list, ReduceFunction<T> reducefunction)
    {
        if (list.size()<2) { return list.get(0); }
        T accu = list.get(0);
        for (int i=1; i<list.size(); i++)
        {   accu = reducefunction.apply(accu,list.get(i));
        }
        return accu;
    }
}


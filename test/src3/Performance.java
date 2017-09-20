import java.util.*;

public class Performance 
{
    public static void main(String[] args) 
    {   System.out.println("Warming up...");    

        // warm up the JIT 
        for (int i=0; i<200; i++) 
        {   testArrayList();
            testHashMap(new Object[]{"a","b","c",Integer.valueOf(5),Byte.valueOf((byte)10)});        
            testLinkedList();
            testArrays();
            testPolymorphism();
        }

        System.out.println("Performance test...");

        // do each test multiple times for higher accuracy
        double s1 = System.currentTimeMillis();

        for (int i=0; i<1000; i++) 
        {   testArrayList();        
        }

        double s2 = System.currentTimeMillis();

        // test hashtable with string keys
        Object[] skeys = new Object[]{ "hi", "ho", "nope", "foo", "bar" };
        for (int i=0; i<1000; i++) 
        {   testHashMap(skeys);
        }

        double s3 = System.currentTimeMillis();
        
        // test hashtable with arbitrary keys
        Object[] keys = new Object[]{ Integer.valueOf(55), Integer.valueOf(99), Integer.valueOf(4),
                                      Byte.valueOf((byte)5), Byte.valueOf((byte)77) };
        for (int i=0; i<1000; i++) 
        {   testHashMap(keys);
        }

        double s4 = System.currentTimeMillis();

        for (int i=0; i<1000; i++) 
        {   testLinkedList();
        }

        double s5 = System.currentTimeMillis();

        for (int i=0; i<1000; i++) 
        {   testArrays();
        }

        double s6 = System.currentTimeMillis();

        for (int i=0; i<1000; i++) 
        {   testPolymorphism();
        }

        double s7 = System.currentTimeMillis();

        double sx = System.currentTimeMillis();        
        System.out.println("ArrayList            " + ((int)(s2-s1)) +" ms"); 
        System.out.println("HashMap (strings)    " + ((int)(s3-s2)) +" ms");
        System.out.println("HashMap (any object) " + ((int)(s4-s3)) +" ms");
        System.out.println("LinkedList           " + ((int)(s5-s4)) +" ms");
        System.out.println("Arrays               " + ((int)(s6-s5)) +" ms");
        System.out.println("Polymorphism         " + ((int)(s7-s6)) +" ms");
        System.out.println("Total                " + ((int)(sx-s1)) +" ms");
    }

    public static void testArrayList()
    {   for (int j=0; j<75; j++) 
        {   ArrayList<String> a = new ArrayList<>();
            for (int i=0; i<1000; i++) 
            {   a.add(i%2==0?"hi":"go");
            }
            for (int k=0; k<5; k++) 
            {   for (int i=0; i<1000; i++) 
                {   a.get(i);
                }
            }
            for (int i=1000-1; i>=0; i--) 
            {   a.remove(i);
            }
        }
    }
        
    public static void testHashMap(Object[] keys)
    {   for (int j=0; j<10; j++) 
        {   HashMap<Object,String> m = new HashMap<>();
            for (int i=0; i<1000; i++) 
            {   m.put(keys[i%keys.length], "something");
            }
            for (int k=0; k<5; k++) 
            {   for (int i=0; i<1000; i++) 
                {   m.get(keys[i%keys.length]);
                }
            }
            for (int i=0; i<1000; i++) 
            {   m.remove(keys[i%keys.length]);
            }
        }
    } 

    private static String[] strings = { "a","b","c","d","e","f" };    
    public static void testLinkedList() 
    {   for (int j=0; j<5; j++) {
            LinkedList<String> l = new LinkedList<>();
            for (int i=0; i<1000; i++) 
            {   l.addLast(strings[i%strings.length]);
            }
            for (int i=0; i<10000; i++) 
            {   l.addLast(l.removeFirst());
            }
            for (int i=0; i<1000; i++) 
            {   l.removeLast();
            }        
        }    
    }       


    static double[][] cA = 
    {   { 4.00, 3.00, 2.0, 1.0 },
        { 2.00, 1.00, 0.5, 0.1 },
        { 4.00, 3.00, 2.0, 1.0 },
        { 2.00, 1.00, 0.5, 0.1 }
    };
    static double[][] cB = 
    {   { -0.500, 1.500, -1.0, 2.0 },
        { 1.000, -2.0000, 0.7, -0.1 }, 
        { -0.500, 1.500, -1.0, 2.0 },
        { 1.000, -2.0000, 0.7, -0.1 } 
    };

    public static void testArrays() 
    {   double[][] A = cA;
        double[][] B = cB;

        int aRows = A.length;
        int aColumns = A[0].length;
        int bColumns = B[0].length;

        double[][] C = new double[aRows][bColumns];
        for (int t=0; t<5000; t++) 
        {   for (int i = 0; i < aRows; i++) 
            {   for (int j = 0; j < bColumns; j++) 
                {   for (int k = 0; k < aColumns; k++) 
                    {   C[i][j] += A[i][k] * B[k][j];
                    }
                }
            }
        }
    }

    public static void testPolymorphism() 
    {   C c[] = new C[]{new C(5), new C1(7), new C2(8)};
        for (int i=0; i<150000; i++) 
        {   c[i%c.length].get();
        }
    }

    static class C
    {   int a;
        int b;
        public C(int x) 
        {   a=x;
            b=x+x;
        }
        public int base() 
        {   return a*b;
        }
        public int get() 
        {   return base();
        }
    }
    static class C1 extends C 
    {   int c;
        public C1(int x) 
        {   super(x);
            c=x*3;
        }
        public int get() 
        {   return base() + c;
        }
    }
    static class C2 extends C 
    {   int d;
        public C2(int x) 
        {   super(x);
            d=x+5;
        }
        public int get() 
        {   return base() - d;
        }
    }
}

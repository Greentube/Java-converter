import java.util.*;

public class Performance 
{
    public static void main(String[] args)
    {
//        fulltest();
    }
    
    public static void smalltest() 
    {   
        Object[] keys = new Object[1000];
        for (int i=1; i<keys.length; i++) 
        {   keys[i] = (i<128) ? ((Object)Byte.valueOf((byte)i)) : ((Object)Integer.valueOf(i));
        }

        System.out.println("Running...");
        double s1 = (double) System.currentTimeMillis();
        for (int i=0; i<100; i++) 
        {   testHashMap(keys,i);        
        }
        double s2 = (double) System.currentTimeMillis();        
        System.out.println("Total         " + ((int)(s2-s1)) +" ms");
    }
        
    public static void fulltest() 
    {   
        Object[] keys = new Object[1000];
        for (int i=1; i<keys.length; i++) 
        {   keys[i] = (i<128) ? ((Object)Byte.valueOf((byte)i)) : ((Object)Integer.valueOf(i));
        }
        Object[] skeys = new Object[1000];
        for (int i=1; i<skeys.length; i++) {
            skeys[i] = "str"+i+"x";
        }
        
        System.out.println("Warming up...");
        for (int i=0; i<100; i++) {
            testArrayList();  
            testHashMap(new Object[]{ "hi", "ho", Integer.valueOf(5), Byte.valueOf((byte)10), "?"}, i);
            testLinkedList();
            testArrays();
            testPolymorphism();
        }
    
        System.out.println("Performance test...");

        // do each test multiple times for higher accuracy
        double s1 = (double) System.currentTimeMillis();

        for (int i=0; i<1000; i++) 
        {   testArrayList();        
        }

        double s2 = (double) System.currentTimeMillis();
        
        // test hashtable with integer keys
        for (int i=0; i<1000; i++) 
        {   testHashMap(keys, i+1);
        }

        double s3 = (double) System.currentTimeMillis();

        // test hashtable with string keys
        for (int i=0; i<1000; i++) 
        {   testHashMap(skeys, i);
        }


        double s4 = (double) System.currentTimeMillis();

        for (int i=0; i<1000; i++) 
        {   testLinkedList();
        }

        double s5 = (double) System.currentTimeMillis();

        for (int i=0; i<1000; i++) 
        {   testArrays();
        }

        double s6 = (double) System.currentTimeMillis();

        for (int i=0; i<1000; i++) 
        {   testPolymorphism();
        }

        double s7 = (double) System.currentTimeMillis();

        double sx = (double) System.currentTimeMillis();        
        System.out.println("ArrayList            " + ((int)(s2-s1)) +" ms"); 
        System.out.println("HashMap (Integer)    "  + ((int)(s3-s2)) +" ms");
        System.out.println("HashMap (String)     " + ((int)(s4-s3)) +" ms");
        System.out.println("LinkedList           " + ((int)(s5-s4)) +" ms");
        System.out.println("Arrays               " + ((int)(s6-s5)) +" ms");
        System.out.println("Polymorphism         " + ((int)(s7-s6)) +" ms");
        System.out.println("Total                " + ((int)(sx-s1)) +" ms");
    }

    public static void testArrayList()
    {   for (int j=0; j<75; j++) 
        {
            ArrayList<String> a = new ArrayList<>();
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
        
    public static void testHashMap(Object[] keys, int rnd)
    {   for (int j=0; j<2; j++) 
        {   HashMap<Object,String> m = new HashMap<>();
            // differently ordered insertion
            for (int i=0; i<keys.length; i++) 
            {   m.put(keys[(rnd*7+keys.length-i)%keys.length], "something");
            }
            m.remove(keys[4]);
            m.remove(keys[1]);
            for (int i=0; i<5000; i++) 
            {   m.get(keys[i%keys.length]);                
            }
            for (int i=0; i<keys.length; i++) 
            {   m.remove(keys[i]);
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

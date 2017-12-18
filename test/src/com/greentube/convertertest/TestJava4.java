package com.greentube.convertertest;

import com.greentube._convertertest2.*;
import com.greentube.convertertestreserved.debugger.arguments;
import com.greentube.convertertestreserved.event.lock;
import com.greentube.convertert€st_3.*;

import java.util.*;

public class TestJava4 
{
    // class attributes
    static int staticint = 4;           // static attribute with initializer 
    final static int staticint99 = 99;  // final static with initializer

    static int static1, static2;       // two variables in one line;
    static boolean static3;

    static String initialized = "hello".substring(2);

    public static void main(String[] args) 
    {   System.out.print ("--");
        System.out.println(" converter test suite for java 4" );

        staticattributestest();
        constructortest();
        arraytest();
        shadowingtest();
        casttest();
        operatortest();
        assignoperatortest();
        numberconversiontest();
        controlstructurestest();
        booleantest();        
        bytetest();        
        charactertest();
        doubletest();
        integertest();
        mathtest();
        objecttest();
        stringtest();
        stringbuffertest();
        stringbuildertest();
        systemtest();        
        vectortest();
        arraylisttest();
        hashtabletest();        
        hashmaptest();        
        hashsettest();        
        linkedlisttest();        
        secondaryclassestest();
        complexoperationtest();
        initsequencetest();
        innerclasstest();
        identifi€rmangling();
        
        // have some assert statements that are just eliminated in conversion
        int i=staticint;
        assert i == 4;
        i = staticint99;
        assert i == 99 : "Strangley, "+staticint99+" but not 99"; 
    }

    public static void staticattributestest()
    {   System.out.println("- static attributes");
        assertI(staticint, 4);
        assertI(staticint99 ,99);
        
        assertI(static1 ,0);
        static1 = 44;
        assertI(static1, 44);
        assertO("static3"+static3, "static3false");
        
        assertI(StaticClass.a, 17);
        assertO(StaticClass.b, "hello kitty");
        assertO(StaticClass.c, new Vector());
        assertB(StaticClass.d instanceof DummyClass);   
        assertO(StaticClass.e, null);
        assertI(StaticClass.f, 0);    
        assertO(StaticClass.nostring, "hello kitty 17");
        assertD(StaticClass.inf, Double.POSITIVE_INFINITY);        
        assertD(-StaticClass.inf, Double.NEGATIVE_INFINITY);        
        assertNaN(StaticClass.nan);        
        
        TestObject t = new TestObject();	       
        assertI(t.accessParentStatic(), 66);
        assertI(t.accessOwnStatic(), 55);        
        assertI(TestObject.staticparentattribute, 55);
        assertO(""+t.dummyboolean, "false");
                
        assertI(TestInterface.constant1, 6);
        assertO(TestInterface.constant2, "Hi");
        assertO(TestInterface.constant3, new Integer(44));
        assertB
        (   TestInterface.ultradeepfield
            [0][0][0][0][0][0][0][0][0][0] [0][0][0][0][0][0][0][0][0][0]
            [0][0][0][0][0][0][0][0][0][0] [0][0][0][0][0][0][0][0][0][0]
            [0][0][0][0][0][0][0][0][0][0] [0][0][0][0][0][0][0][0][0][0]
            [0][0][0][0][0][0][0][0][0][0] [0][0][0][0][0][0][0][0][0][0]
            [0][0][0][0][0][0][0][0][0][0] [0][0][0][0][0][0][1][1][1][1]
            ,false
        );

        StaticClass sc = new StaticClass();
        assertI(sc.a, StaticClass.a);
        assertO(sc.b, StaticClass.b);
        
        TestObject to = new TestObject();
        assertI(to.self.self.self.staticparentattribute, 55);
        assertI(to.self.self.self.shadowAttribute(66), 66);
        assertO(java.lang.Integer.valueOf(44), new Integer(44));
    }
    
    public static void constructortest()
    {   System.out.println("- constructor");

        TestObject t;
        t = new TestObject();
        assertI(t.somenumber, 4711);
        assertO(t.somestring, "defaulttext");
        
        t = new TestObject("any");
        assertI(t.somenumber, 4711);
        assertO(t.somestring, "any");
        
        t = new TestObject("nixi",44);
        assertI(t.somenumber, 44);
        assertO(t.somestring, "nixi");
        
        DummyClass d = new DummyClass();
        assertO(d.secondaryString(), "secondary");
        
        assertI(t.depth(),3);
        assertI(new TestParentIntermediate().depth(),2);
        assertI(new TestParentIntermediate().depth(4), 4);
    }
    

    static public void arraytest() 
    {   System.out.println ("- array");
    
        // simple array with initializer
        int[] ar = new int[0];
        assertI(ar.length, 0);
        ar = new int[1];
        assertI(ar.length, 1);
        ar = new int[2];
        assertI(ar.length, 2);
        ar = new int[]{};
        assertI(ar.length, 0);
        ar = new int[]{4};
        assertI(ar.length, 1);
        assertI(ar[0],4);
        ar = new int[]{4,5};
        assertI(ar.length, 2);
        assertI(ar[0],4);
        assertI(ar[1],5);
        ar = new int[]{3,4,5};
        assertI(ar.length, 3);
        assertI(ar[0],3);
        assertI(ar[1],4);
        assertI(ar[2],5);
        boolean[][] b2 = new boolean[4][2];
        assertB(b2[2][1] == false);
        
        // create multidimensional array
        int[][]a = new int[4][5];                
        assertI(a.length, 4);
        a[0][2] = 77;
        assertI((a[0]).length, 5);
        assertI((a[1]).length, 5);
        assertI(a[2].length, 5);
        assertI(a[3].length, 5);
        assertI(a[0][0], 0);
        assertI(a[3][3], 0);
        assertI(a[0][2], 77);
        int[][]axy = new int[3][3];
        assertI(axy[0].length,3);
        
        int[][]b[][] = new int[4][2][7][];       // declare arrays with various styles
        assertI(b.length,4);
        assertO(b[0][0][0],null);
        b[1][1][1] = new int[] { 4,5 };
        assertI(b[1][1][1][1], 5);        
        
        int[]e = new int[]{2,3,5,4+3,0,0,0,0};          // variable initializer with array        
        System.arraycopy (getArray(),2, e,5, 2);         // array copy method
        assertI(e[5], 7);
        assertI(e[6], 6);
        assertI(e[7], 0);
        int c[]=new int[0], d[]=new int[2];    // declare more variables with one statement
        assertI(c.length,0);
        assertI(d[0], 0);
        assertI(d[1], 0);
        
        String[] sa = new String[]{"this","is","some","text"};
        assertO(sa[1], "is");
        String[][] sa2 = new String[4][];
        sa2[2] = sa;
        assertO(sa2[2][3], "text");
        
        sa = new String[4];
        assertI(sa.length, 4);
        assertO(sa[0], null);
        assertO(sa[1], null);
        assertO(sa[2], null);
        assertO(sa[3], null);
        		
        TestObject[] tob = new TestObject[3];
        tob[0] = new TestObject();
        assertB(tob[0]!=null);
        assertO(tob[1],null);
        TestObject[][] tob2 = new TestObject[3][];
        assertI(tob2.length,3);
        assertO(tob2[0],null);
        tob2 = new TestObject[3][2];
        assertO(tob2[0][1], null);
        assertO(tob2[1][1], null);
        TestObject[][][] tob3 = new TestObject[2][][];
        tob3[0] = new TestObject[2][1];
        assertO(tob3[1],null);
        assertB(tob3[0] != null);
        assertB(tob3[0][1]!=null);

        assertB(tob instanceof Object);
        assertB(tob.toString() != null); 
        assertB(new int[2].toString() != null);
        
        sa = new String[2];
        String [] sa1 = new String[2];
        assertB(sa.equals(sa));
        assertB(!sa.equals(sa1));
        assertB(!sa.equals("something"));
        
        Object[] oba = new String[]{"one","two","three"};
        assertO(oba[0],"one");
        oba[0] = "fix";
        assertO(oba[0],"fix");
        Object[] tpa = passarray(new TestObject[2]);
        tpa[0] = new TestObject();
    }
    
    private static int getArray()[]
    {   return new int[]{9,8,7,6,5,4,3};
    }
    private static TestParent[] passarray(TestParent[] a) 
    {   return a;
    }

    public static void shadowingtest() 
    {   System.out.println ("- shadowing");
        
        assertI(getShadowed99(), 99);    	
        int staticint99 = 44;
        assertI(staticint99, 44);

        TestObject t = new TestObject(null,5);
        assertI(t.shadowAttributeSum(), 88+123+5);    
    }
    
    private static int getShadowed99()
    {   return staticint99;
    }

    public static void casttest() 
    {   System.out.println("- cast");
    
        // cast between types and test for type inclusion
        int[] a = new int[]{ 5,4,3};
        Object o = a;
        assertB(o instanceof Object);
        assertB(! (o instanceof String));
        assertB(! (o instanceof TestObject));
        assertB( o instanceof int[]);
        
        TestObject t = new TestObject();
        o = t;
        assertB(o instanceof Object);
        assertB(o instanceof TestObject);
        assertB(o instanceof TestParent);
        assertB(o instanceof TestParentIntermediate);
        t = (TestObject) o;
        assertO(t.hello(), "hello");
        o = "trixi";
        assertB(o instanceof Object);
        assertB(o instanceof String);
        assertB(! (o instanceof TestObject));        
        
        TestInterface f = t;
        assertO(f.hello(), "hello");
        assertB(t instanceof TestInterface);
        assertB(!(t instanceof TestInterface_X));
        Object t2 = new TestObject2_();
        assertB(t2 instanceof TestInterface);
        assertB(t2 instanceof TestInterface_X);
        assertB(t2 instanceof _TestInterface2);
        TestInterface f2 = (_TestInterface2) t2;
        assertO(f2.hello(), "hello");
        
        // check type inclusion relation between some built-in types
        assertB(a instanceof Object);
        Object oa = a;
        assertI( ((int[]) oa)[0],  5);
        assertB(new Integer(1) instanceof Object);
        Integer it = null;
        Object it2 = it;
        // null is never an instance of anything
        assertB(! (it instanceof Object));        
        
        String s = (String) it2;	// null may be cast to anything
        assertO(s, null); 

        // check for array types
        Object a3 = new int[1][1][1];
        Object a2 = ((int[][][])a3)[0];
        assertB(a3 instanceof int[][][]);
        assertB(!(a3 instanceof int[][]));
        assertB((a2 instanceof int[][]));
        Object sa2 = new String[1][2];
        assertB(sa2 instanceof String[][]);
        assertB(!(sa2 instanceof String[][][][]));
        assertB(!(sa2 instanceof String[]));
        assertB(!(sa2 instanceof String));
        assertB(!(sa2 instanceof TestInterface));
        assertB(((String[][])sa2)[0] instanceof String[]);
        Object ta2 = new TestInterface[2][2];
        assertB(ta2 instanceof TestInterface[][]);
        assertB(!(ta2 instanceof TestInterface[]));
        
        // check if the toString operation delivers at least some string
        assertB(new Object().toString()!=null);
        assertB(new ClassWithNoToString().toString()!=null);

        // do some number type casting
        int i;
        double d;
        i=124;       assertI ( (byte)i, 124);
        i=44444;     assertI ( (byte)i, -100);
        i=-2344444;  assertI ( (byte) i, 4);
        d=-1234.1;   assertI ( (byte) d, 46);        
        d=-1234.9;   assertI ( (byte) d, 46);        
        d=434.9;     assertI ( (byte) d, -78);            
        d=1234.5;    assertI ( (char) d, 1234);
        i= -1234;    assertI ( (char) i, 64302);
        d=0.2;       assertI ( (char) d, 0);
        d=-0.2;      assertI ( (char) d, 0);
        d=-77777.8;  assertI ( (char) d, 53295);
        d=77777.8;   assertI ( (char) d, 12241);
        d=1234.5;    assertI ( (int) d, 1234);
        d=-1234;     assertI ( (int) d, -1234);
        d=0.2;       assertI ( (int) d, 0);
        d=-0.2;      assertI ( (int) d, 0);
        d=-77777.8;  assertI ( (int) d, -77777);
        d=-77777.2;  assertI ( (int) d, -77777);
    }
    
    public static void operatortest() 
    {   System.out.println("- operator");

        boolean bo;
        bo=true;
        int i=0;
        int j = 423081234;
        boolean a=true;
        boolean b=true;
        boolean c=false;
        assertI ( ((4==3+1-i-1)&&a ? 4+3*3 : 4+7) , 11);        
        assertI ( (i |= ((true&&b) ? 4:3)) , 4);
        assertB ( (c==true||b),  true);
        assertI ( (~(i ^ 4711)), -4708);
        assertI ( ((byte)j) , 18);
        assertI ( ((char)j) , 46354);
        assertI ( ((int)j), 423081234 );
        assertI ( ((int) 4.7), 4);
        assertI ( ((int) -4.7), -4);
        assertI ( (4-3+2+1),  4 );
        assertI ( (4-5+5+6+7), 17 );
        assertI ( (4-5-1) , -2);
        assertI ( (4-5+5),  4);
        assertO (""+bo,"true");
        
        boolean t=true;
        boolean f=false;
        boolean f2=false;
        assertB ( (f && f2 || t), true);
        assertB ( (f && t || t), true);
        assertB ( 3 < 4, true);
        assertB ( - -3 > + + +4, false);
        
        i = 17;
        assertI( i/5, 3);
        assertI( i%5, 2);
        assertI( i*5, 85);
        assertI( (-i)/5, -3);    
        assertI( (-i)%5, -2);
        assertI( (-i)*5, -85);
        assertI( i/-5, -3);
        assertI( i%-5, 2);
        assertI( i*-5, -85);
        assertI( (-i)/-5, 3);    
        assertI( (-i)%-5, -2);
        assertI( (-i)*-5, 85);
        i=1220431789;
        assertI( i*2000001214, -429991322);
        assertI( (i+7)*2000051237, 1679701252);
        assertI(i*-i,1382532375);
        assertI(i*51233,247950669);        
        assertI(41233*i,-2067851395);        
        i = 246;
        assertI (i<<6, 15744);
        assertI (-(i)>>2, -62);
        assertI (-(i>>2), -61);
        assertI (-(i)>>>2, 1073741762);
        assertI (-(i>>>2), -61);
        assertI (i<<30, -2147483648);
        i=1;
        assertI (1<<100, 16);
        i=2000000000;
        assertI (2000000000>>40, 7812500);
        i=Integer.MIN_VALUE;
        i=i-1;
        assertI (i, 2147483647);
        i=i+1;
        assertI (i,Integer.MIN_VALUE);
        assertI (i*-1, -2147483648);
        assertI (i/-1, -2147483648);
        assertI (i % Integer.MIN_VALUE+1, 1);
        assertI (i % Integer.MAX_VALUE, -1);
        i = Integer.MAX_VALUE;
        assertI (i % Integer.MIN_VALUE+1, -2147483648);
        assertI (i % Integer.MAX_VALUE, 0);
        assertI (i % Integer.MAX_VALUE-1, -1);
        i = Integer.MIN_VALUE;
        assertI (+i, Integer.MIN_VALUE);
        assertI (-i, Integer.MIN_VALUE);
        assertI (~i, Integer.MAX_VALUE);
        i = Integer.MAX_VALUE;
        assertI (+i, Integer.MAX_VALUE);
        assertI (-i, Integer.MIN_VALUE+1);
        assertI (~i, Integer.MIN_VALUE);
        
        double e = 99d;
        double d = 5.1d;
        assertD( e/d, 19.411764705882355);        
        assertD(31.0/2, 15.5);
        e = 1.0;
        e = e/0.0;
        assertD(e, Double.POSITIVE_INFINITY);
        d = -1.0;
        d = d/0.0;
        assertD(d, Double.NEGATIVE_INFINITY);
        assertB(e-e != 0.0);
        assertNaN(d-d);
        assertB(e+d != 0.0);
        assertB(e/e != 0.0);
        assertD(2*e, Double.POSITIVE_INFINITY);
        assertD(e+e, Double.POSITIVE_INFINITY);
        assertB(0.0/0.0 != Double.NEGATIVE_INFINITY);
        assertB(0.0/0.0 != Double.POSITIVE_INFINITY);
        assertB(0.0/0.0 != 0);        
        d = 0;
        assertPositiveZero(d);
        assertNegativeZero(-d);
        assertNegativeZero(-0.0);
        
        // test numerical overflows
        assertI ( Integer.MAX_VALUE+1, Integer.MIN_VALUE);
        int x = 2000000000;
        int y = 2000000000;
        assertI(x+y, -294967296);
        assertI(x*y, -1651507200);
        assertI(-1000000000-y, 1294967296);
        x = -1000000000;
        y = -2100000000;
        assertI(x+y, 1194967296);
        assertI(y/x,2);
        // smaller number types get promoted for operations
        byte k = -100;
        byte l = -90;
        assertI(k+l, -190);        
        char m = 'A';
        char n = (char) 65530;
        assertI(m+n, 65595);    
    }
    
    public static void assignoperatortest() 
    {   System.out.println("- assign operator");

        int i = 0;
        int[] a = {7};
        a[i] = a[i] + 8;
        i++;
        assertI(a[0], 15);
        assertI(i,1);
        
        String s = null;
        s += "hi";
        assertO(s, "nullhi");
        s = null;
        s += null;
        assertO(s, "nullnull");
    
        double d = 1.0;
        d += 7;
        assertD(d, 8.0);
        d -= 4.5;
        assertD(d, 3.5);
        d *= 3;
        assertD(d, 10.5);
        d /= 3;
        assertD(d, 3.5);
        d++;
        ++d;
        assertD(d, 5.5);
        d--;
        --d;
        assertD(d, 3.5);
        d %= 2.0;
        assertD(d, 1.5);

        i = 525434532;
        i *= 66;
        assertI(i,318940744);
        i *= 661855881;
        assertI(i,641690760);
        
        i = 17;
        int q = (i += 3.2);
        assertI(i,20);
        assertI(q,20);
        i -= 3.3;
        assertI(i,16);
        i *= 2.1;
        assertI(i, 33);
        i /= 4.01;
        assertI(i,8);
        i %= 16.0001;
        assertI(i,8);
        i &= 15;
        assertI(i, 8);
        i |= 3;
        assertI(i, 11);
        i ^= 0xff;
        assertI(i, 0xf4);
        i <<= 4;
        assertI(i, 0xf40);
        i >>= 4;
        assertI(i, 0xf4);
        i = 0xf0000000;
        assertI(i, 0xf0000000);
        assertI(i, -268435456);
        i >>= 4;
        assertI(i, 0xff000000);
        assertI(i, -16777216);
        i >>>= 4;
        assertI(i, 0x0ff00000);   
        i /= 0.0;
        assertI(i, Integer.MAX_VALUE);
        i = -1;
        i /= 0.0;
        assertI(i, Integer.MIN_VALUE);   
        i = 0;
        i /= 0.0;
        assertI(i, 0);   
        i = 5;
        i /= 2;
        assertI(i, 2);   
        i = -5;
        i /= 2;
        assertI(i, -2);   
    
        i = 18;
        i++;
        assertI(i,19);
        i = Integer.MAX_VALUE;
        assertI(i++, Integer.MAX_VALUE);
        assertI(i,Integer.MIN_VALUE);
        assertI(--i, Integer.MAX_VALUE);
        assertI(i,Integer.MAX_VALUE);
        a[0]=0;
    	assertI(a[0]++, 0);
    	assertI(a[0]--, 1);
    	a[0] = Integer.MAX_VALUE;
    	assertI(a[0]++, Integer.MAX_VALUE);
    	assertI(a[0]++, Integer.MIN_VALUE);
    	
    	char c = 0;
    	c = 544;
    	assertI(c,544);
    	c += 2;
    	assertI(c,546);
    	c -= 600.1;
    	assertI(c, 65482);
    	c *= 2.1;
    	assertI(c, 6440);
    	c /= 2.3;
    	assertI(c, 2800);
    	c %= 9.0;
    	assertI(c, 1);
    	c /= 0.0;
    	assertI(c, Character.MAX_VALUE);
    	c = 1;
    	c /= 0.0;
    	assertI(c, Character.MAX_VALUE);
    	c = 1;
    	c /= -0.0;
    	assertI(c, 0);
    	c = 0;
    	c /= 0.0;
    	assertI(c, 0);
    	
    	c = 99;
    	c++;
    	assertI(c,100);
    	c = 0;
    	assertI(--c, Character.MAX_VALUE);
    	assertI(c,Character.MAX_VALUE);
    	assertI(c++, Character.MAX_VALUE);
    	assertI(c, 0);
    	assertI(c++, 0);
    	assertI(c, 1);
    	char c2 = --c;
    	c2--;
    	assertI(c2, Character.MAX_VALUE);
    	
    	byte by = 0;
    	by = 34;
    	assertI(by,34);
    	by += 2;
    	assertI(by,36);
    	by -= 600.1;
    	assertI(by,-52);
    	by *= 2.1;
    	assertI(by,-109);
    	by /= 2.3;
    	assertI(by,-47);
    	by %= 9.0;
    	assertI(by,-2);
    	by /= 0.0;
    	assertI(by,0);
    	by = 17;
    	by /= 0.0;
    	assertI(by,-1);
    	by = 0;
    	by /= 0.0;
    	assertI(by,0);
    	byte b2 = ++by;
    	assertI(b2,1);
    	
    	by = 99;
    	assertI(by++, 99);
    	assertI(by,100);
    	by = Byte.MIN_VALUE;
    	assertI(--by, Byte.MAX_VALUE);
    	assertI(by, Byte.MAX_VALUE);
    	assertI(by++, Byte.MAX_VALUE);
    	assertI(by, Byte.MIN_VALUE);
    	assertI(by++, Byte.MIN_VALUE);
    	assertI(by, Byte.MIN_VALUE+1);
    	    	
    	i = Integer.MIN_VALUE;
        i *= -1;
        assertI (i, -2147483648);
    	i = Integer.MIN_VALUE;
    	i /= -1;
        assertI (i, -2147483648);
    	i = Integer.MIN_VALUE;
    	i /= Integer.MIN_VALUE;
        assertI (i, 1);
    	i = Integer.MAX_VALUE;
    	i /= Integer.MIN_VALUE+1;
        assertI (i, -1);
        i = Integer.MAX_VALUE;
        i %= Integer.MIN_VALUE;
        assertI (i, 2147483647);
        i = Integer.MAX_VALUE;
        i %= Integer.MIN_VALUE+1;
        assertI (i, 0);
        i = Integer.MAX_VALUE;
        i %= Integer.MAX_VALUE-1;
        assertI (i, 1);
        
        // do various weird and wonderful things with the inc/dec operators
        int[] ia = new int[2];
        char idx=0;
        assertI(ia[0]++, 0);
        assertI(idx,0);   assertI(ia[0],1);  assertI(ia[1],0);
        assertI(ia[idx++], 1);
        assertI(idx,1);   assertI(ia[0],1);  assertI(ia[1],0);
        assertI(--ia[idx], -1);
        assertI(idx,1);   assertI(ia[0],1);  assertI(ia[1],-1);
        ia[0] = Integer.MIN_VALUE;
        ia[1] = 0;
        idx=0;
        assertI(idx,0);   assertI(ia[0],Integer.MIN_VALUE);  assertI(ia[1],0);
        ia[idx]--; idx--;
        assertI(idx,Character.MAX_VALUE);  assertI(ia[0],Integer.MAX_VALUE);  assertI(ia[1],0);
        ++idx;
        ia[idx]++;
        assertI(idx,0);   assertI(ia[0],Integer.MIN_VALUE);  assertI(ia[1],0);        
        ia[idx+0]++; idx++;
        assertI(idx,1);   assertI(ia[0],Integer.MIN_VALUE+1);  assertI(ia[1],0);   
        
        int[][] iia = new int[2][2];
        idx=0;
        iia[++idx][idx=0] = 1;
        assertI(idx,0);  assertI(iia[0][0],0); assertI(iia[0][0],0); assertI(iia[1][0],1); assertI(iia[1][1],0);
        
        d = 4.3;
        assertD(d++,4.3);
        assertD(d,5.3);
        assertD(++d,6.3);
        assertD(d,6.3);
        assertD(--d,5.3);
        assertD(d--,5.3);
        assertD(d,4.3);   
        d = 0.999999999999;
        double d2 = d;
        assertD(d++,d2);
    }

       
    public static void numberconversiontest()
    {
    	System.out.println("- numberconversion");
    	
    	int i;
    	byte b;
    	char c;
//    	short s;
    	double d;
    	
    	i = 4711864;
    	b = (byte)i;
    	assertI(b, -72);
    	i = -4711864;
    	b = (byte)i;
    	assertI(b, 72);    	
    	d = 12351235;
    	b = (byte) d;
    	assertI(b, 3);
    	b = (byte) Integer.MAX_VALUE;
    	assertI(b, -1);
    	b = (byte) Integer.MIN_VALUE;
    	assertI(b, 0);    	
    	d = -14123351235.0;
    	b = (byte) d;
    	assertI(b, 0);
    	d = 14123351235.0;
    	b = (byte) d;
    	assertI(b, -1);
    	d = 0.0/0.0;
    	b = (byte) d;
    	assertI(b, 0);
    	d = Double.POSITIVE_INFINITY;
    	b = (byte) d;
    	assertI(b, -1);
    	d = Double.NEGATIVE_INFINITY;
    	b = (byte) d;
    	assertI(b, 0);
    	
    	i = 4711863;
    	c = (char)i;
    	assertI(c, 58807);
    	i = -4711863;
    	c = (char)i;
    	assertI(c, 6729);    	
    	d = 12351235;
    	c = (char) d;
    	assertI(c, 30467);
    	c = (char) Integer.MAX_VALUE;
    	assertI(c, 65535);
    	c = (char) Integer.MIN_VALUE;
    	assertI(c, 0);    	
    	d = -14123351235.0;
    	c = (char) d;
    	assertI(c, 0);
    	d = 14123351235.0;
    	c = (char) d;
    	assertI(c, 65535);
    	d = 0.0/0.0;
    	c = (char) d;
    	assertI(c, 0);
    	d = Double.POSITIVE_INFINITY;
    	c = (char) d;
    	assertI(c, 65535);
    	d = Double.NEGATIVE_INFINITY;
    	c = (char) d;
    	assertI(c, 0);
    	
    	d = Double.POSITIVE_INFINITY;
    	assertI((int)d, 2147483647);
    	d = Double.NEGATIVE_INFINITY;
    	assertI((int)d, -2147483648);
    	d = Double.MAX_VALUE;
    	assertI((int)d, Integer.MAX_VALUE);
    	d = Double.MIN_VALUE;
    	assertI((int)d, 0);
    	d = -Double.MAX_VALUE;
    	assertI((int)d, Integer.MIN_VALUE);
    	d = 0.0;
    	d = d/0.0;
    	assertI((int)d, 0);
    	d = 1.0;
    	d = d / 0.0;
    	assertB(d == Double.POSITIVE_INFINITY);
    	assertI((int)d, Integer.MAX_VALUE);
    	d = -1.0;
    	d = d / 0.0;
    	assertB(d == Double.NEGATIVE_INFINITY);
    	assertI((int)d, Integer.MIN_VALUE);
    	d = 0.0;
    	d = d / 0.0;
    	assertI((int)d, 0);
    	assertI((int)0.1, 0);
    	assertI((int)17.9, 17);
    	assertI((int)1.4, 1);
    	assertI((int)1.7, 1);
    	assertI((int)-1.7, -1);
    	assertI((int)-1.99, -1);
    	assertI((int)-2.0, -2);
    }
    
    public static void controlstructurestest()
    {
    	System.out.println("- controlstructures");
    	
    	int v=0,w=3;
    	for (int i=0, j=1; i<5; i++,j*=2) {
    		assertI(j, 1<<i);
    		v=v+j;
    	}
    	assertI(v,31);
    	assertI(w,3);
    	
    	int x,y=1,z=4;
    	while (z<10) {
    		x=z;
    		y+=x;
    		z++;
    	}
    	assertI(y,40);
    	
    	do {
    		y+=8;    		
    	} while(y<50);
    	assertI(y,56);
    	y=y-16;
    	
    	y: do {
    		y+=z;
    		z++;
    		if (y>1000) break y;
    	} while(z<20);
    	assertI(y,185);
    	
    	StringBuffer s = new StringBuffer();
    	outer: for (int i=1; i<10; i++) {
    		for (int j=1; j<10; j++) {
    			s.append(",");
    			s.append(i*j);
    			if (i*j>20) break outer;    			
    		}
    	}
    	assertO(s.toString(),",1,2,3,4,5,6,7,8,9,2,4,6,8,10,12,14,16,18,3,6,9,12,15,18,21");
    	
    	s = new StringBuffer();
		y=0;
    	l1: while (true) {
    		l2: while (true) {
    			y++;
    			if (y>10) break l1;
    			if (y>5) continue l1;
    			if (y>2) break l2;
    			s.append(",");
    			s.append(y);
    		}	
			s.append("b");
    	}
		assertO(s.toString(), ",1,2bbb");
    	
		assertO(swtst(0),"?");
		assertO(swtst(1),"V3");
		assertO(swtst(2),"V2");
		assertO(swtst(3),"V1");
		assertO(swtst(4),"FOUR");
		assertO(swtst(5),"MUCH");
		assertO(swtst(6),"MUCH");
		assertO(swtst(7),"?");
    }
    private static String swtst(int i) 
    {
        x: {
            if (i>99) break x;
        }
        y: break y;

        int n=0;
        l: switch (i) 
        {   case 1: 
                n++; 
            case 2: 
                n++;
            case 3: 
            {   n++;
                return "V"+n;
            }
            case 4:
                return "FOUR";
            default:
                return "?";			
            case 5:
            case 6:
                break l;
        }
        return "MUCH";
    }
        
    public static void booleantest() {
    	System.out.println("- boolean");
    	
    	Boolean t = new Boolean(true);
    	Boolean f = new Boolean(false);
    	Boolean f2 = new Boolean(false);
    	
    	assertB(t.equals(Boolean.TRUE));
    	assertB(!t.equals("TRUE"));
    	assertB(!t.equals("true"));
    	assertB(!t.equals(null));
    	assertB(f.equals(f2));
    	assertB(f == f2, false);
    	assertB(t.booleanValue(), true);
    	assertB(f.booleanValue(), false);
    	assertO(t.toString(), "true");
    	assertO(f.toString(), "false");    	
    	assertO(Boolean.toString(false), "false");
    	assertB(Boolean.valueOf(true) == Boolean.TRUE);
    	assertB(Boolean.valueOf(false) == Boolean.FALSE);
    	assertI(t.hashCode(), 1231);
    	assertI(f.hashCode(), 1237);
    }

    public static void bytetest() {
    	System.out.println("- byte");
    	
    	assertI(Byte.MIN_VALUE, -128);
    	assertI(Byte.MAX_VALUE, 127);
    	Byte b = new Byte((byte) 5);
    	Byte b2 = new Byte((byte) 7);
    	Byte b3 = Byte.valueOf((byte)5);
    	
    	assertB(! b.equals("5"));
    	assertB(! b.equals(b2));
    	assertB(b.equals(b3));
    	assertB(!b.equals(null));
    	assertB(b == b3, false);
    	assertI(b.byteValue(), 5);
    	assertO(b.toString(), "5");
    	assertO(Byte.toString((byte)6), "6");    	
    	assertO(Byte.toString((byte)-36), "-36");    	
    	assertI(b.hashCode(), 5);
    	assertI(b2.hashCode(), 7);
    	assertI(Byte.valueOf((byte)-44).hashCode(),-44);
    }
    
    public static void charactertest()
    {
    	System.out.println("- character");
    	
    	assertI(Character.MIN_VALUE, 0);
    	assertI(Character.MAX_VALUE, 0xffff);
    	Character c = new Character('A');
    	Character c2 = new Character('@');
    	Character c3 = Character.valueOf((char)65);
    	
    	assertB(! c.equals("A"));
    	assertB(! c.equals(c2));
    	assertB(! c.equals(null));
    	assertB(c.equals(c3));
    	assertB(c == c3, false);
    	assertI(c.charValue(), 65);
    	assertO(c.toString(), "A");
    	
    	assertO(Character.toString('P'), "P");    	
    	assertO(Character.toString((char)0x99), "\u0099");
    	assertI(c.hashCode(), 65);
    	assertI(c2.hashCode(), 64);
    }

    
    public static void doubletest() {
    	System.out.println("- double");
    	
    	assertD(Double.MIN_VALUE, 4.9E-324);
    	assertD(Double.MAX_VALUE, 1.7976931348623157E308);
    	Double d = new Double(5);
    	Double d2 = new Double(7);
    	Double d3 = Double.valueOf(5.00);
    	assertI(d.hashCode(), d3.hashCode());
    	
    	assertB(! d.equals(d2));
    	assertB(! d.equals("5.0"));
    	assertB(! d.equals("5"));
    	assertB(! d.equals(null));
    	assertB(d.equals(d3));
    	assertB(d == d3, false);
    	assertD(d.doubleValue(), 5);
    	assertO(d.toString(), "5.0");
    	assertO(d + "x", "5.0x");
    	assertO(Double.toString((byte)6), "6.0");    	
    	assertO(Double.toString((byte)-36), "-36.0");   
    	assertO("x"+Double.toString(6.5)+"y", "x6.5y");
    	assertO("x"+Double.toString(2.0)+"y", "x2.0y");
    	
    	d = new Double(4.1);
    	d = Double.valueOf(d.doubleValue() / 0.0);
    	assertB(d.isInfinite());
    	assertB(!d.isNaN());
    	assertB(Double.isInfinite(d.doubleValue()));
    	assertB(!Double.isNaN(d.doubleValue()));
    	
    	d = new Double(0.0);
    	d = Double.valueOf(d.doubleValue() / 0.0);
    	assertB(!d.isInfinite());
    	assertB(d.isNaN());
    	assertB(!Double.isInfinite(d.doubleValue()));
    	assertB(Double.isNaN(d.doubleValue()));    	
    }
        
    public static void integertest()
    {
    	System.out.println("- integer");
    	
    	assertI(Integer.MIN_VALUE, -2147483648);
    	assertI(Integer.MAX_VALUE, 2147483647);
    	Integer i = new Integer( 5);
    	Integer i2 = new Integer( 7);
    	Integer i3 = Integer.valueOf( 5);
    	
    	assertB(! i.equals("5"));
    	assertB(! i.equals(i2));
    	assertB(! i.equals(null));
    	assertB(i.equals(i3));
    	assertB(i == i3, false);
    	assertI(i.intValue(), 5);
    	assertO(i.toString(), "5");
    	
    	assertO(Integer.toString(2346), "2346");    	
    	assertO(Integer.toString(-46), "-46");    	 	
    	assertI(i.hashCode(), 5);
    	
    	assertI(Integer.valueOf(-23523523).hashCode(), -23523523);
    	
    	assertO(Integer.toHexString(4711), "1267");
        assertO(Integer.toHexString(-134711), "fffdf1c9");
        assertO(Integer.toHexString(0), "0");
        assertO(Integer.toHexString(1535621512), "5b87b988");
        assertO(Integer.toHexString(-2135621512), "80b50078");
    }
    

    public static void mathtest() {
    	System.out.println("- math");
    	double nan = 0.0;
    	nan = nan / 0.0;
    	double pzero = 0.0;
        double nzero = -pzero;
    	assertNaN(nan);
    	assertPositiveZero(pzero);
    	assertNegativeZero(nzero);
    	
    	assertApproximately(Math.E, 2.718281828459045); 
        assertApproximately(Math.PI, 3.141592653589793);
        
        assertD(Math.abs(0.005),0.005);
        assertD(Math.abs(-0.5),0.5);
        assertPositiveZero(Math.abs(pzero));
        assertPositiveZero(Math.abs(nzero));
        assertNaN(Math.abs(nan));
        assertD(Math.abs(Double.POSITIVE_INFINITY), Double.POSITIVE_INFINITY);
        assertD(Math.abs(Double.NEGATIVE_INFINITY), Double.POSITIVE_INFINITY);
        assertD(Math.abs((double)Integer.MAX_VALUE), (double)Integer.MAX_VALUE);
        assertD(Math.abs((double)Integer.MIN_VALUE), -(double)Integer.MIN_VALUE);
        
        assertI(Math.abs(0),0);
        assertI(Math.abs(3),3);
        assertI(Math.abs(-3),3);
        assertI(Math.abs(Integer.MAX_VALUE), Integer.MAX_VALUE);
        assertI(Math.abs(Integer.MIN_VALUE), Integer.MIN_VALUE);
        
        assertD(Math.acos(1), 0.0);
        assertApproximately(Math.acos(0.5), Math.PI/3);
        assertNaN(Math.acos(2.0));
        assertNaN(Math.acos(-2));
        assertNaN(Math.acos(nan));
        assertNaN(Math.acos(Double.POSITIVE_INFINITY));
        assertNaN(Math.acos(Double.NEGATIVE_INFINITY));
        
        assertApproximately(Math.asin(0.5), 0.5235987755982989);
        assertNaN(Math.asin(2.0));
        assertNaN(Math.asin(-2));
        assertNaN(Math.asin(nan));
        assertNaN(Math.asin(Double.POSITIVE_INFINITY));
        assertNaN(Math.asin(Double.NEGATIVE_INFINITY));
        
        assertApproximately(Math.atan(0), 0);
        assertApproximately(Math.atan(1), Math.PI/4.0);
        assertApproximately(Math.atan(-1.0), -Math.PI/4.0);
        assertApproximately(Math.atan(10), 1.4711276743037347);
        assertApproximately(Math.atan(Double.POSITIVE_INFINITY), Math.PI/2);
        assertApproximately(Math.atan(Double.NEGATIVE_INFINITY), -Math.PI/2);
        assertNaN(Math.atan(nan));
        
        assertApproximately(Math.atan2(1.0,1.0), Math.PI/4.0);
        assertNaN(Math.atan2(1.0,nan));
        assertNaN(Math.atan2(nan,1.0));
        assertNaN(Math.atan2(nan,nan));
        assertPositiveZero(Math.atan2(pzero, 2.0));  
        assertPositiveZero(Math.atan2(1.0, Double.POSITIVE_INFINITY));        
        assertNegativeZero(Math.atan2(nzero, 2.0));
        assertNegativeZero(Math.atan2(-3, Double.POSITIVE_INFINITY));
        
        assertApproximately(Math.atan2(Double.POSITIVE_INFINITY, Double.POSITIVE_INFINITY), Math.PI/4);
        assertApproximately(Math.atan2(Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY), 3*Math.PI/4);
        assertApproximately(Math.atan2(Double.NEGATIVE_INFINITY, Double.POSITIVE_INFINITY), -Math.PI/4);
        assertApproximately(Math.atan2(Double.NEGATIVE_INFINITY, Double.NEGATIVE_INFINITY), -3*Math.PI/4);
        
        assertD(Math.ceil(0.5), 1.0);
        assertD(Math.ceil(-0.5), 0.0);
        assertD(Math.ceil(5.5), 6.0);
        assertD(Math.ceil(-5.1), -5);
        assertD(Math.ceil(2.8), 3);
        assertD(Math.ceil(0), 0);
        assertD(Math.ceil(Double.POSITIVE_INFINITY), Double.POSITIVE_INFINITY);
        assertD(Math.ceil(Double.NEGATIVE_INFINITY), Double.NEGATIVE_INFINITY);
        assertNaN(Math.ceil(nan));
        
        assertApproximately(Math.cos(4.3), -0.40079917207997545);
        assertApproximately(Math.cosh(0.2), 1.020066755619076);
        
        assertApproximately(Math.exp(0),1);
        
        assertApproximately(Math.expm1(2),6.38905609893065);
        assertApproximately(Math.expm1(0.2),0.22140275816016985);        
        assertApproximately(Math.expm1(-3.1),-0.9549507976064422);    
            
        assertD(Math.floor(0.5), 0);
        assertD(Math.floor(0.3), 0);
        assertD(Math.floor(3.8), 3);
        assertD(Math.floor(-0.8), -1);
        assertD(Math.floor(-2.8), -3.0);
        assertD(Math.floor(-2.5), -3.0);
        assertD(Math.floor(-3.5), -4.0);
        
        assertD(Math.hypot(3.0,4.0),5.0);
        assertD(Math.hypot(-3.0,4.0),5.0);        
        assertApproximately(Math.hypot(-4.5,-4),6.020797289396148);
        
        assertD(Math.IEEEremainder(4.25,2.0),0.25);
        assertD(Math.IEEEremainder(-4.25,2.0),-0.25);
        assertD(Math.IEEEremainder(-4.25,-3.0),-1.25);
        assertD(Math.IEEEremainder(-3,2),1);
        assertD(Math.IEEEremainder(-5,2),-1);
        assertD(Math.IEEEremainder(3,2),-1);
        assertD(Math.IEEEremainder(5,2),1);
        assertD(Math.IEEEremainder(7.5,3),1.5);
        assertD(Math.IEEEremainder(10.5,3),-1.5);
        assertNaN(Math.IEEEremainder(nan,3));
        assertNaN(Math.IEEEremainder(3,nan));
        assertNaN(Math.IEEEremainder(nan,nan));
        assertNaN(Math.IEEEremainder(Double.POSITIVE_INFINITY,1));
        assertNaN(Math.IEEEremainder(1,0));
        assertNaN(Math.IEEEremainder(2,-0));
        assertD(Math.IEEEremainder(2,Double.NEGATIVE_INFINITY), 2);
        assertD(Math.IEEEremainder(-4.3,Double.NEGATIVE_INFINITY),-4.3);
                
        assertApproximately(Math.log(Math.E), 1);
        
        assertD(Math.log10(100.0),2.0);
        
        assertApproximately(Math.log1p(99.0),4.605170185988092);        
        assertNaN(Math.log1p(-2));       
         
        assertD(Math.max(4.3,6.7), 6.7);        
        
        assertI(Math.max(4,6), 6);        
        
        assertD(Math.min(-124.0,5.0), -124);   
             
        assertI(Math.min(124,5), 5);        
        
        assertD(Math.pow(2,3), 8);
        assertD(Math.pow(2,-3), 0.125);
        
        assertI((int)(double)Math.round(4.3), 4);
        assertI((int)(double)Math.round(-4.3), -4);
        assertI((int)(double)Math.round(2.5), 3);
        assertI((int)(double)Math.round(3.5), 4);
        assertI((int)(double)Math.round(4.5), 5);
        assertI((int)(double)Math.round(-2.5), -2);
        assertI((int)(double)Math.round(-3.5), -3);
        assertI((int)(double)Math.round(-4.5), -4);
        assertI((int)(double)Math.round(0.2), 0);
        assertI((int)(double)Math.round(-0.2), 0);
        assertI((int)(double)Math.round(nan), 0);
        assertI((int)(double)Math.round(Double.POSITIVE_INFINITY), 2147483647);
        assertI((int)(double)Math.round(Double.NEGATIVE_INFINITY), -2147483648);
        assertD((double)Math.round(4.3), 4);
        assertD((double)Math.round(-4.3), -4);
        assertD((double)Math.round(2.5), 3);
        assertD((double)Math.round(3.5), 4);
        assertD((double)Math.round(4.5), 5);
        assertD((double)Math.round(-2.5), -2);
        assertD((double)Math.round(-3.5), -3);
        assertD((double)Math.round(-4.5), -4);
        assertD((double)Math.round(0.2), 0);
        assertD((double)Math.round(-0.2), 0);
        assertD((double)Math.round(nan), 0);
        assertApproximately((double)Math.round(1E20), 9.223372036854776E18);
        assertApproximately((double)Math.round(-1.1111111111111111111E20), -9.223372036854776E18);
        assertApproximately((double)Math.round(Double.POSITIVE_INFINITY), 9.223372036854776E18);
        assertApproximately((double)Math.round(Double.NEGATIVE_INFINITY), -9.223372036854776E18);
        
        assertD(Math.rint(0.0), 0.0);
        assertD(Math.rint(6.3), 6.0);
        assertD(Math.rint(-16.3), -16.0);
        assertD(Math.rint(-16.5), -16.0);
        assertD(Math.rint(16.5), 16.0);
        assertD(Math.rint(17.5), 18.0);
        assertD(Math.rint(-17.5), -18.0);
        
        assertD(Math.signum(-113.1),-1);
        assertD(Math.signum(5354.1),1);
        assertD(Math.signum(pzero),0);
        assertPositiveZero(Math.signum(pzero));
        assertNegativeZero(Math.signum(nzero));
        
        assertApproximately(Math.sin(Math.PI/2.0), 1);
        assertApproximately(Math.sin(1.41), 0.9871001010138504);
        
        assertApproximately(Math.sinh(-4.3), -36.843112570291794);
        assertApproximately(Math.sinh(1.41), 1.9259060604588694);
        
        assertD(Math.sqrt(4),2);
        assertD(Math.sqrt(9),3);
        
        assertApproximately(Math.tan(Math.PI/6.0), 0.5773502691896257);
        assertApproximately(Math.tan(Math.PI/4.0), 1);
        
        assertApproximately(Math.tanh(Math.PI/4.0), 0.6557942026326724);
        assertApproximately(Math.tanh(Math.PI/6.0), 0.4804727781564516);
        
        assertApproximately(Math.toRadians(60), Math.PI/3);
        assertApproximately(Math.toRadians(-60), -Math.PI/3);
        
        assertApproximately(Math.toDegrees(Math.PI), 180);
        assertApproximately(Math.toDegrees(79*Math.PI), 79*180);
    }
    
    public static void objecttest() {
    	System.out.println ("- object");
    	Object o = new Object();
    	Object o2 = new Object();
    	
    	assertB( ! o.equals(o2));
    	assertB(o.equals(o));
    }
    
    
    public static void stringtest() {  
    	System.out.println ("- string");
    	
        String a = StaticClass.hello();
        assertO(a,"hello");
        a = "" + a + " you";             // string building with + 
        a = a + " " + 4711;              // add a number to a string
        assertO(a,"hello you 4711");
        a = "some " + 44 + " more " + (new Integer(88)) + " concats " + new TestParent(3);
        assertO(a, "some 44 more 88 concats TestParent3");
        assertO (44 - 33 + "hi", "11hi");
        assertO (44 + "" + 33 + "hi", "4433hi");
        assertO ("" + 44 + 33 + "hi", "4433hi");
        a = null;
        assertO(a+null,"nullnull");
        // doing weird stuff with characters and the string + operator
        char c = '@';
        a = ((String)null) + c;
        assertO(a,"null@");
        a = a + '!' + '2';
        assertO(a,"null@!2");
        a = a + ('3' + '1');
        assertO(a,"null@!2100");
        
        // some special characters
        a = "üäö € \000\003\7";
        assertI ((int) a.charAt(0), 252);
        assertI ((int) a.charAt(1), 228);
        assertI ((int) a.charAt(2), 246);
        assertI ((int) a.charAt(3), 32);
        assertI ((int) a.charAt(4), 8364);
        assertI ((int) a.charAt(5), 32);
        assertI ((int) a.charAt(6), 0);
        assertI ((int) a.charAt(7), 3);
        assertI ((int) a.charAt(8), 7);
        
        // construct strings from characters 
        char[] raw = { (char)65, (char)109, (char)101, (char)108, (char)105, (char)101 };   
        String sr = new String(new char[0]);
        assertO( sr, "");
        sr = new String(raw);
        assertO( sr, "Amelie");
        sr = new String(raw,1,3);
        assertO( sr, "mel");
        
        // various string operations
        a = "The test string to do some nonesense";
        
        assertI( a.charAt(0), 'T' );

        assertI( a.compareTo(a), 0);
        assertI( a.compareTo("other"), -27);
        assertI( a.compareTo("Axx"), 19);
        assertI( a.compareTo("Th"), 34);
        assertI( a.compareTo("The test string to do some nonesense with"), -5);
        
        assertO( a.concat(" extra"), "The test string to do some nonesense extra");

        assertB( a.endsWith("nonesense"));
        assertB(! a.endsWith("xxx"));

        assertB( a.equals(a + ""));
        assertB(! a.equals(null));
        assertB("TestParent3".equals(new TestParent(3).toString()));
        assertB(!"TestParent3".equals(new Integer(5)));
        
        assertI(a.hashCode(), a.hashCode());
        assertI("nothing useful".hashCode(), "nothing useful".hashCode());
        
        assertI( a.indexOf('t'), 4);
        assertI( a.indexOf('q'), -1);
        assertI( a.indexOf('t', 8), 10);
        assertI( a.indexOf('q', 20), -1);
        assertI (a.indexOf("test"), 4);
        assertI (a.indexOf("unknown"), -1);
        
        assertB( "".isEmpty() );
        assertB( "     ".trim().isEmpty());
        
        assertI (a.lastIndexOf('q'), -1);
        assertI (a.lastIndexOf('q',10), -1);
        assertI (a.lastIndexOf('t'), 16);
        assertI (a.lastIndexOf('t',6), 4);

        assertI (a.length(), 36);
        assertI ("".length(), 0);
        
        assertO (a.replace('t', 'q'), "The qesq sqring qo do some nonesense");
        assertO ("".replace(' ','x'), "");

        assertB (a.startsWith("The te"));
        assertB (a.startsWith(""));
        assertB (!a.startsWith("The x"));
        assertB (!a.startsWith("Y"));
        
        assertO (a.substring(0), a);
        assertO (a.substring(33), "nse");
        
        assertO (a.substring(0,4), "The ");
        assertO (a.substring(6,10), "st s");
        assertO (a.substring(30,36), "esense");
        
        char[] ca = a.toCharArray();
        assertI (ca.length, 36);
        assertI (ca[2], 'e');
        assertI (ca[34], 's');
        
        assertO (a.toString(), a);
        
        assertO (a.trim(), a);
        assertO ("  loo".trim(), "loo");
        assertO ("\n\tYY\t".trim(), "YY");
        
        assertB (!a.equals(null));
        
        String xx = "\ud8a1\ue681";
        assertI(xx.charAt(0), 55457);
        assertI(xx.charAt(1), 59009);
        
        xx = null;
        assertO(xx + "second", "nullsecond");
        assertO(xx + null, "nullnull");
        assertO(null + xx, "nullnull");
    }

    public static void systemtest() {
    	System.out.println("- system");
    	
    	int a[] = { 3,7,9,5 };
    	int b[] = new int[10];
    	System.arraycopy(a,0, b,2, 3);
    	assertI(b[0], 0);
    	assertI(b[1], 0);
    	assertI(b[2], 3);
    	assertI(b[3], 7);
    	assertI(b[4], 9);
    	assertI(b[5], 0);
    	System.arraycopy(b, 2, b, 3, 3);
    	assertI(b[0], 0);
    	assertI(b[1], 0);
    	assertI(b[2], 3);
    	assertI(b[3], 3);
    	assertI(b[4], 7);
    	assertI(b[5], 9);
    	assertI(b[6], 0);
    	
    	Object o[] = new Object[]{ null, "hi", "no", "yes" };
    	Object o2[] = new Object[5];
    	System.arraycopy(o,1, o2,0,2);
    	assertO(o2[0], "hi");
    	assertO(o2[1], "no");
    	assertO(o2[2], null);
    }
    
    public static void stringbuffertest()
    {
    	System.out.println("- stringbuffer");
    	StringBuffer b = new StringBuffer();
    	b.append("small");
    	assertI(b.length(), 5);
    	assertO(b.toString(), "small");
    	
    	b = new StringBuffer("larger");
    	b.append("text");
    	b.append(new Integer(5));
    	assertI(b.length(), 11);
    	assertO(b.toString(), "largertext5");
    	
    	assertB(!b.equals("largettext5"));
    	assertB(!b.equals(null));
    	assertB(! (new StringBuffer()).equals(new StringBuffer()));
    	assertB(b.equals(b));
    	
    	StringBuffer c = new StringBuffer();
    	c.append(b.toString());
    	assertB(!b.equals(c));
    	
    	c = new StringBuffer(); 
    	c.append(Character.valueOf('!'));
    	c.append("no");
    	c.append(47);
    	c.append("yes");
    	c.append(66.7);
    	c.append(Character.valueOf('?'));
    	c.append(-66555.7423);
    	c.append((Object)null);
    	assertO(c.toString(),"!no47yes66.7?-66555.7423null");
    	
    	c = new StringBuffer("nulltest:");
    	Object o = null;
    	c.append(o);
    	c.append(":");
    	String s = null;
    	c.append(s);
    	c.append(":");
    	assertO(c.toString(),"nulltest:null:null:");
    	s = "XAX";
    	c = new StringBuffer();
    	c.append(s.charAt(1));
    	assertO(c.toString(),"A");
    	s = s.replace('A','B');
    	assertO(s,"XBX");
    }
    
    public static void stringbuildertest()
    {
    	System.out.println("- stringbuilder");
    	StringBuilder b = new StringBuilder();
    	b.append("V");
    	b.append(8);
    	assertI(b.length(), 2);
    	assertO(b.toString(), "V8");
    	b.append((String)null);
    	b.append(66);
    	b.append((Object)null);    	
    	assertO(b.toString(), "V8null66null");
    	
    	
    	b = new StringBuilder("init");
    	b.append(new Integer(5));
    	b.append(1);
    	assertO(b.toString(), "init51");
    	
    	assertB(!b.equals("init51"));
    	assertB(!b.equals(null));
    	assertB(! (new StringBuilder()).equals(new StringBuilder()));
    	assertB(b.equals(b));
    	
    	StringBuilder c = new StringBuilder();
    	c.append(b.toString());
    	assertB(!b.equals(c));
    	assertB(b.toString().equals(c.toString()));    	    
    }
    
    public static void vectortest() {
    	System.out.println("- vector");
    	
        Vector v;
        v = new Vector();
        Vector v2 = new Vector();
        assertO(v.toString(),"[]");
        assertO(v,v2);        
        v.add ("homer");
        v.add ("marge");
        v.add ("bart");
        v.add ("lisa");
        v.add ("meggy");        
        v2.addElement ("homer");
        v2.addElement ("marge");
        v2.add ("bart");
        v2.add ("megg!");
        v2.add (3, "lisa");
        assertO(v.toString(),"[homer, marge, bart, lisa, meggy]");        
        assertO(v2.toString(),"[homer, marge, bart, lisa, megg!]");        
        assertB(! v.equals(v2));        
        assertI(v.size(), 5);
        assertI(v2.size(), 5);
        
        Vector c = (Vector) v.clone();
        assertI(c.size(), 5);
        
        c.clear();		// must no affect original vector!
        assertI(c.size(), 0);
        
        assertB ( v.contains("lisa"));
        assertB (! v.contains("mr.burns"));
        
        Object[] a = new Object[5];
        v.copyInto(a);
        assertO(a[1], "marge");
        assertO(a[4], "meggy");
        
        assertO(v.elementAt(3), "lisa");
        
        assertB(v.equals(v));
        assertB(v.equals(v.clone()));
        assertB(v != v.clone());
        assertB(!v.equals("hi"));
        assertB(!v.equals(null));
        
        assertO(v.firstElement(), "homer");

        assertO(v.get(3), "lisa");

        assertI(v.indexOf("bart"), 2);
        assertI(v.indexOf("mr.burns"), -1);
        assertI(v.indexOf("lisa", 2), 3);
        assertI(v.indexOf("lisa", 4), -1);
       
        c = (Vector) v.clone();
        c.insertElementAt("ruprecht", 2);
        assertO(c.toString(),"[homer, marge, ruprecht, bart, lisa, meggy]");        
        
        assertB(!c.isEmpty());
        c.clear();
        assertB(c.isEmpty());
        
        assertO(v.toString(),"[homer, marge, bart, lisa, meggy]");
        assertO(v.lastElement(), "meggy");        
        assertI(v.lastIndexOf("bart"), 2);
        assertI(v.lastIndexOf("bart",2), 2);
        assertI(v.lastIndexOf("bart",1), -1);
        
        c = (Vector) v.clone();
        c.removeAllElements();
        assertI(c.size(), 0);
        assertO(c.toString(), "[]");
        
        c = (Vector) v.clone();
        c.removeElement("homer");
        c.removeElement("bart");
        assertO(c.toString(), "[marge, lisa, meggy]");
        
        c = (Vector) v.clone();
        c.removeElementAt(2);
        c.removeElementAt(1);
        assertO(c.toString(), "[homer, lisa, meggy]");
        
        c = (Vector) v.clone();
        c.set(3, "LISA");
        c.setElementAt("MARGE",1);
        assertO(c.toString(), "[homer, MARGE, bart, LISA, meggy]");
        c.setSize(2);
        assertI(c.size(), 2);
        c.setSize(4);
        assertI(c.size(), 4);
        assertO(c.get(0),"homer");        
        assertO(c.get(1),"MARGE");        
        assertO(c.get(2),null);        
        assertO(c.get(3),null);        
        
        Enumeration en = v.elements();
        assertB(en.hasMoreElements());
        assertO(en.nextElement(),"homer");
        assertO(en.nextElement(),"marge");
        assertO(en.nextElement(),"bart");
        assertB(en.hasMoreElements());
        assertO(en.nextElement(),"lisa");
        assertO(en.nextElement(),"meggy");
        assertB(!en.hasMoreElements());
        
        a = v.toArray();
        assertI(a.length, 5);
        assertO(a[0], "homer");
        assertO(a[4], "meggy");
        
        v = new Vector();
        v.add(new Integer(4));
        v.add("nixi");
        v.add(new int[2]);
        assertB(v.toString().startsWith("[4, nixi, "));
        assertB(!v.equals(null));
    }

    public static void arraylisttest() {
    	System.out.println("- arraylist");
    	
        List l;
        l = new ArrayList();
        ArrayList l2 = new ArrayList();
        assertO(l.toString(),"[]");
        assertO(l,l2);
        assertO(l,new Vector());
        assertB(l2.equals(new Vector()));
                
        l.add ("alice");
        l.add ("bob");
        l.add ("carl");
        l.add ("doris");
        assertO(l.toString(),"[alice, bob, carl, doris]");
        l.add (3, "corbin");
        l.add (5, "xavier");
        assertO(l.toString(),"[alice, bob, carl, corbin, doris, xavier]");
        
        l2.add("_");
        l2.addAll(l);
        assertO(l2.toString(),"[_, alice, bob, carl, corbin, doris, xavier]");
        l2.addAll(3,l);
        assertO(l2.toString(),"[_, alice, bob, alice, bob, carl, corbin, doris, xavier, carl, corbin, doris, xavier]");
        l2.clear();
        assertO(l2.toString(),"[]");
        l2.add("corbin");
        l2.add("xavier");
        
        assertB(l.contains("bob"));
        assertB(!l.contains("marge"));
        assertB(!l.contains(Byte.valueOf((byte)4)));
        assertB(!l.contains(null));
        l.add(null);
        assertB(l.contains(null));
        l.remove(l.indexOf(null));
        assertB(l.containsAll(l2));
        l2.add("hugo");
        assertB(!l.containsAll(l2));
        l2.remove(l2.indexOf("hugo"));
        
        Vector v = new Vector();
        v.add("corbin");
        assertB(!l2.equals(v));
        v.add("xavier");
        assertB(l2.equals(v));
        assertO(l2.get(0),"corbin");
        assertO(l2.get(1),"xavier");
        
        assertO(l.toString(), "[alice, bob, carl, corbin, doris, xavier]");
        assertO(l2.toString(), "[corbin, xavier]");
        v.add(1,null);
        assertO(v.toString(), "[corbin, null, xavier]");
        
        l2.add(new Double(44.3));
        assertI(l2.indexOf("corbin"),0);
        assertI(l2.indexOf(Double.valueOf(44.3)),2);
        
        assertB(!l2.isEmpty());
        l2.clear();
        assertB(l2.isEmpty());
        
        Iterator it=l.iterator();
        assertB(it.hasNext());
        assertO(it.next(),"alice");
        assertO(it.next(),"bob");
        assertO(it.next(),"carl");
        assertO(it.next(),"corbin");
        assertO(it.next(),"doris");
        assertB(it.hasNext());
        assertO(it.next(),"xavier");
        assertB(!it.hasNext());
        
        assertI(l.lastIndexOf("carl"), 2);
        l.add("carl");
        assertI(l.lastIndexOf("carl"), 6);        
        l.remove(2);
        assertO(l.toString(),"[alice, bob, corbin, doris, xavier, carl]");
        l.remove(l.indexOf("doris"));
        assertO(l.toString(),"[alice, bob, corbin, xavier, carl]");
        
        l2.clear();
        l2.add("bob");
        l2.add("xavier");
        assertO(l.toString(),"[alice, bob, corbin, xavier, carl]");
        l.removeAll(l2);
        assertO(l.toString(),"[alice, corbin, carl]");
        l.add("dodo");
        l.add(null);
        l.add("elvis");
        l.add(null);
        assertO(l.toString(),"[alice, corbin, carl, dodo, null, elvis, null]");
        l.remove(l.indexOf(null));       
        assertO(l.toString(),"[alice, corbin, carl, dodo, elvis, null]");
        l.add(1,null);
        assertO(l.toString(),"[alice, null, corbin, carl, dodo, elvis, null]");        
        l2.clear();
        l2.add("hippie");
        l.removeAll(l2);
        assertO(l.toString(),"[alice, null, corbin, carl, dodo, elvis, null]");        
        l2.add(null);
        l.removeAll(l2);
        assertO(l.toString(),"[alice, corbin, carl, dodo, elvis]");        
        l.add(4, null);
        assertO(l.toString(),"[alice, corbin, carl, dodo, null, elvis]");        
        
        l2.clear();
        l2.add("corbin");
        l2.add(null);
        l2.add("heimo");
        assertO(l2.toString(),"[corbin, null, heimo]");     
        assertB(l2.contains(null));
        assertI(l.size(),6);
        l.retainAll(l2);        
        assertI(l.size(),2);
        assertO(l.toString(),"[corbin, null]");
        l.set(1, "more");
        assertO(l.toString(),"[corbin, more]");
        assertI(l.size(),2);
        l.add(0,"first");
        
        Object[] oa = new ArrayList(l).toArray();
        assertI(oa.length,3);
        assertO(oa[0],"first");
        assertO(oa[1],"corbin");
        assertO(oa[2],"more");
        assertB(oa instanceof Object[]);
        assertB(!(oa instanceof String[]));
        
        List itt = new ArrayList();
        itt.add(Integer.valueOf(5));
        itt.add(Integer.valueOf(8));
        itt.add(Integer.valueOf(11));
        itt.add(Integer.valueOf(14));
        itt.add(Integer.valueOf(17));
        assertO(itt.toString(), "[5, 8, 11, 14, 17]");
        for (Iterator iti=itt.iterator(); iti.hasNext(); ) {
        	Integer e = (Integer) iti.next();
        	if (e.intValue()%2==1) iti.remove();
        }
        assertO(itt.toString(), "[8, 14]");        
    }
    
    
    public static void hashtabletest() {
    	System.out.println("- hashtable");
    	
    	Hashtable ht = new Hashtable();
    	ht.put("Test", new Integer(1));
    	ht.put("Test2", new Integer(2));    
    	String st = ht.toString();
    	assertB(st.indexOf("Test=1")>=0);
    	assertB(st.indexOf("Test2=2")>=0);
    	assertB(st.indexOf(", ")>=0);    	

    	assertI(ht.size(), 2);
    	assertB(!ht.isEmpty());    	
    	assertB(ht.containsKey("Test"));
    	assertB(ht.contains(Integer.valueOf(2)));
    	assertB(!ht.contains("trixi"));
    	assertO(ht.get("Test"), Integer.valueOf(1));
    	
    	ht.put("Test", new Integer(3));
    	assertO(ht.get("Test"), new Integer(3));
    	    	
    	Hashtable cl = (Hashtable) ht.clone();
    	assertI(cl.size(), 2);
    	assertB(! (cl==ht));
    	assertB(cl.equals(ht));
    	assertB(!ht.equals(new Hashtable()));
    	assertB(!ht.equals("dummy"));
    	
    	ht.remove("Test2");
    	assertI(ht.size(), 1);
    	assertB(ht.containsKey("Test"));
    	assertB(!ht.containsKey("Test2"));
    	assertB(cl.containsKey("Test2")); // the clone was not modified
    	
    	ht.clear();
    	assertO(ht, new HashMap());
    	assertI(ht.size(), 0);
    	assertB(ht.isEmpty());
    	assertB(! ht.containsKey("Test"));
    	
    	ht.put("A",  "something");
    	ht.put("B",  "some other");
    	ht.put("C",  "more text");
    	ht.put("D",  new Integer(99));
    	ht.put("E",  new int[2] );
    	st = ht.toString();
    	assertB(st.indexOf("E=")>=0);
    	assertB(st.indexOf("A=something")>=0);
    	
    	Hashtable ht2 = new Hashtable();
    	Enumeration e = ht.keys();
    	while (e.hasMoreElements())
    	{	String k = (String) e.nextElement();
    		ht2.put(k, ht.get(k));    		
    	}
    	assertB(ht.equals(ht2));
    	assertB(!ht.equals(null));
    	
    	e = ht.elements();
    	Vector ev = new Vector();
    	while (e.hasMoreElements())
    	{	ev.add(e.nextElement());
    	}
    	assertI(ev.size(), 5);
    	assertB(ev.contains("something"));
    	assertB(ev.contains("some other"));
    	assertB(ev.contains("more text"));
    	assertB(ev.contains(Integer.valueOf(99)));
    	assertB(ev.contains(ht.get("E")));
    }

    public static void hashmaptest() {
    	System.out.println("- hashmap");
    	
    	HashMap ht = new HashMap();
    	assertB(ht.isEmpty());
    	ht.put("Test", new Integer(1));
    	ht.put("Test2", new Integer(2));
    	
    	assertI(ht.size(), 2);
    	assertB(!ht.isEmpty());
    	assertB(ht.containsKey("Test"));
    	assertO(ht.get("Test"), Integer.valueOf(1));
    	
    	ht.put("Test", new Integer(3));
    	assertO(ht.get("Test"), new Integer(3));
    	    	
    	HashMap cl = new HashMap(ht);
    	assertI(cl.size(), 2);
    	assertB(! (cl==ht));
    	assertB(cl.equals(ht));
    	assertB(!ht.equals(new Hashtable()));
    	assertB(!ht.equals("dummy"));
        assertB(ht.keySet().toArray() instanceof Object[]);
        assertB(ht.keySet().toArray(new String[0]) instanceof String[]);
        assertB(ht.values().toArray() instanceof Object[]);
        assertB(ht.values().toArray(new Integer[0]) instanceof Integer[]);

    	ht.remove("Test2");
    	assertI(ht.size(), 1);
    	assertB(ht.containsKey("Test"));
    	assertB(!ht.containsKey("Test2"));
    	assertB(!ht.containsValue(Integer.valueOf(1)));
    	assertB(!ht.containsValue(Integer.valueOf(99)));
    	assertB(cl.containsKey("Test2")); // the clone was not modified
    	assertB(cl.containsValue(Integer.valueOf(3)));
    	
    	ht.clear();
    	assertO(ht, new Hashtable());
    	assertO(ht, new HashMap());
    	assertI(ht.size(), 0);
    	assertB(ht.isEmpty());
    	assertB(! ht.containsKey("Test"));
    	
    	HashMap hm = new HashMap(ht);
    	hm.put(Integer.valueOf(1),  "one");
    	assertO(hm.get(Integer.valueOf(1)), "one");
    	assertO(hm.toString(), "{1=one}");
    	Hashtable ht2 = new Hashtable(hm);
    	ht2.put(Integer.valueOf(10), "ten");
    	ht2.put(Integer.valueOf(11), "eleven");
    	assertB(! hm.equals(ht2));
    	hm.put(Integer.valueOf(10), "ten");
    	hm.put(Integer.valueOf(11), "eleven");
    	assertO(hm,ht2);
    	hm.put(null,  "nothing");
    	hm.put(Integer.valueOf(0),  null);
    	String st = hm.toString();
    	assertB(st.indexOf("null=nothing")>=0);
    	assertB(st.indexOf("0=null")>=0);
    	assertB(st.indexOf("10=ten")>=0);
    	assertB(st.indexOf("no=no")<0);
    	    	
    	assertO(hm.get(Integer.valueOf(1)),"one");
    	assertO(hm.get(Integer.valueOf(10)),"ten");   
    	assertO(hm.get(null), "nothing");
    	assertO(hm.get(Integer.valueOf(0)), null);
    	hm.put(null, null);
    	assertB(hm.containsKey(null));
    	hm.remove(null);
    	assertB(!hm.containsKey(null));
    	
    	ht2.clear();
    	ht2.put("1", "ONE");
    	ht2.put("2", "TWO");
    	assertI(hm.size(), 4);
    	hm.putAll(ht2);
    	assertO(hm.get("1"), "ONE");
    	assertO(hm.get("2"), "TWO");
    	assertI(hm.size(), 6);
    	
    	Collection c = hm.values();
    	assertI(c.size(), 6);
    	assertB(c.contains("ONE"));
    	assertB(!c.contains("ZERO"));

		Vector vals = new Vector();
    	vals.add(null);
    	vals.add("one");
    	vals.add("ONE");
    	vals.add("TWO");
    	vals.add("ten");
    	vals.add("eleven");
    	Iterator it =  c.iterator();
    	assertB(it.hasNext());
    	assertB(vals.contains(it.next()));
    	assertB(it.hasNext());
    	assertB(vals.contains(it.next()));
    	assertB(it.hasNext());
    	assertB(vals.contains(it.next()));
    	assertB(it.hasNext());
    	assertB(vals.contains(it.next()));
    	assertB(it.hasNext());
    	assertB(vals.contains(it.next()));
    	assertB(it.hasNext());
    	assertB(vals.contains(it.next()));
    	assertB(!it.hasNext());
    			
    	Collection s = hm.keySet();
    	assertI(s.size(), 6);
    	assertB(s.contains("1"));
    	assertB(!s.contains("-1"));   
    	HashMap s2 = new HashMap();
    	Iterable itabl = s;
    	for (Iterator it2 = itabl.iterator(); it2.hasNext(); ) {
    		s2.put(it2.next(),"?");
    	}
    	assertI(s.size(),6);
    	assertI(s2.size(),6);
    	assertB(s2.toString().indexOf("0=?")>=0);
    	
    	
    	Map m2 = new HashMap();
    	m2.put(Integer.valueOf(1), "ONE");
    	m2.put(Integer.valueOf(2), "TWO");
    	m2.put(Integer.valueOf(3), "THREE");
    	m2.put(Integer.valueOf(4), "FOUR");
    	Map m3 = new HashMap(m2);
    	for (Iterator i2 = m2.keySet().iterator(); i2.hasNext(); ) {
    		Object k2 = i2.next();
    		if ( ((Integer)k2).intValue()%2==1) i2.remove();
    	}
    	assertI(m2.size(),2);
    	for (Iterator i2 = m3.values().iterator(); i2.hasNext(); ) {
    		Object k2 = i2.next();
    		if ( ((String)k2).indexOf('E')>=0) i2.remove();
    	}
    	assertI(m3.size(),2);
    	assertO(m2,m3);
    }
    
    public static void hashsettest() {
    	System.out.println("- hashset");
    	
    	HashSet s = new HashSet();
    	assertB(! s.contains(Byte.valueOf((byte)4)));
    	s.add(Byte.valueOf((byte)4));
    	assertB(s.contains(Byte.valueOf((byte)4)));
    	s.add(Integer.valueOf(44));
    	s.add(Integer.valueOf(43));
    	assertB(s.contains(new Integer(44)));
    	assertB(s.contains(Integer.valueOf(43)));
    	assertI(s.hashCode(), 91);
    }
        
    public static void linkedlisttest() {
    	System.out.println("- linked list");
    	LinkedList d = new LinkedList();
    	d.add("p1");
    	d.add("p2");
    	assertO(d.toString(), "[p1, p2]");
    	d.addFirst("p0");
    	assertO(d.toString(), "[p0, p1, p2]");
    	d.addLast("p3");
    	assertO(d.toString(), "[p0, p1, p2, p3]");
    	d.addLast("p4");
    	assertO(d.toString(), "[p0, p1, p2, p3, p4]");
    	assertI(d.size(), 5);
    	assertB(d.contains("p2"));
    	assertB(!d.contains("px"));
    	assertO(d.toString(),"[p0, p1, p2, p3, p4]");
    	assertO(d.removeFirst(),  "p0");
    	assertO(d.toString(),"[p1, p2, p3, p4]");
    	for (int i=0; i<20; i++) d.addFirst("p0");
    	for (int i=0; i<19; i++) assertO(d.removeFirst(),"p0");
    	assertO(d.toString(),"[p0, p1, p2, p3, p4]");
    	
    	assertO(d.getFirst(), "p0");
    	assertO(d.getLast(), "p4");
    	assertO(d.removeFirst(), "p0");
    	assertO(d.removeFirst(), "p1");
    	assertO(d.removeFirst(), "p2");
    	assertO(d.removeLast(), "p4");
    	assertO(d.removeLast(), "p3");
    	assertB(d.isEmpty());
    	
    	d.clear();
    	assertB(d.isEmpty());
    	for (int i=0; i<100; i++) d.add(Integer.valueOf(i));
    	for (int i=0; i<1000; i++) {
    		assertO(d.removeFirst(), Integer.valueOf(i));
    		d.add(Integer.valueOf(100+i));
    	}
    	
    	d.clear();
    	for (int i=0; i<100; i++) d.addFirst(Integer.valueOf(i));
    	for (int i=0; i<1000; i++) {
    		assertO(d.removeLast(), Integer.valueOf(i));
    		d.addFirst(Integer.valueOf(100+i));
    	}
    	
    	LinkedList a = new LinkedList(d);
    	for (int i=0; i<100; i++) {
    		assertO(a.removeLast(), Integer.valueOf(1000+i));
    	}
    	
    	int i = 1100;
    	for (Iterator it = d.iterator(); it.hasNext(); ) {
    		assertO(it.next(), Integer.valueOf(--i));
    	}
    	assertI(d.size(),100);
    	
    	LinkedList b = new LinkedList();
    	assertB(b.addAll(d));
    	assertB(!b.addAll(new ArrayList()));
    	
    	assertO(d.remove(0), Integer.valueOf(1099));
    	assertO(d.removeFirst(), Integer.valueOf(1098));
    	assertO(d.removeLast(), Integer.valueOf(1000));
    	
    	assertI(b.size(), 100);
    	assertB(b.contains(Integer.valueOf(1050)));
    	assertB(!b.contains(Integer.valueOf(10)));
    	b.addLast("end");
    	assertB(b.contains("end"));
    	assertO(b.removeLast(), "end");
    	b.add("stacktop");
    	b.add("stacktop2");
    	assertB(b.contains("stacktop2"));
    	assertB(!b.contains("wrzlbrmpft"));
    	assertO(b.remove(b.size()-1), "stacktop2");
    	assertO(b.remove(b.size()-1), "stacktop");
    	
        List itt = new LinkedList();
        itt.add(Integer.valueOf(5));
        itt.add(Integer.valueOf(8));
        itt.add(Integer.valueOf(11));
        itt.add(Integer.valueOf(14));
        itt.add(Integer.valueOf(17));
        assertO(itt.toString(), "[5, 8, 11, 14, 17]");
        for (Iterator iti=itt.iterator(); iti.hasNext(); ) {
        	Integer e = (Integer) iti.next();
        	if (e.intValue()%2==1) iti.remove();
        }
        assertO(itt.toString(), "[8, 14]");            	
    }
    
    public static void secondaryclassestest() 
    {
    	System.out.println("- secondary classes");
    	
    	SecondaryClasses s = new SecondaryClasses();
    	assertO(s.testrun(), "x=99|sx=99|s2=98|ss2=98|s3=97|ss3=97");
    	assertO(SecondaryClasses.statictestrun(), "sx=99|ss2=98|ss3=97");    	    
    }        

    public static void complexoperationtest()
    {
    	System.out.println("- complex operation");
    	
    	assertO(StaticClass.md5(
   			StaticClass.stringToBytes("some and more words, with #special# characters")
   			),    	
   			"835670bed386ef2f3badbace8c8992eb"
		);    	
    }
       
    public static void initsequencetest() {
    	System.out.println("- initializer sequence");
    	
    	assertO(initialized,"llo");
    	
    	assertI(InitSequenceTestA.a, 47);
    	assertI(InitSequenceTestB.b, 60);
    	assertI(InitSequenceTestC.c, 115);
    	
    	assertI(InitializerBlockTest.something, 112233);
    	assertI(InitializerBlockTest.overridden, 44);
    	assertO(InitializerBlockTest.nothing, null);    	
    	assertO(InitializerBlockTest.str, System.out);
    	InitializerBlockTest ib = new InitializerBlockTest();
    	assertI(ib.u,107);
    	assertI(ib.v,321);
    	assertI(ib.w,0);
    	assertI(ib.x,9);
    	assertI(ib.y,123);
    	assertI(ib.z,27);
    	ib = new InitializerBlockTest(88);
    	assertI(ib.u,107);
    	assertI(ib.v,9416);
    	assertI(ib.w,0);
    	assertI(ib.x,9);
    	assertI(ib.y,123);
    	assertI(ib.z,1107);
    }
    
    public static void innerclasstest() 
    {   System.out.println("- inner classes");
    	
    	OuterCläss.InnerStatic s = new OuterCläss.InnerStatic(44);
    	assertO(s.toString(), "44,88,99");
    	
    	OuterCläss x = new OuterCläss(4711);
    	assertO(x.toString(),"!4711:99,4711");
    	OuterCläss.MemberClass m = x.new MemberClass(44);
    	assertO(m.toString(),"44,4711");
    	m = x.self.self.self.new MemberClass(33);
        assertO(m.toString(),"33,4711");
    	
    	assertO(x.workWithLocalClass(), "L4721");
    	assertO(new OuterCläss(33).workWithLocalClass(), "L43");
    	
    	assertO(x.workWithAnonymousClass(), "A54,4711,4788,7,4788-4788-77,17");
    	assertO(new OuterCläss(91).workWithAnonymousClass(), "A54,91,168,7,168-168-77,17");

    	int[] i= new int[1];
    	new OuterCläss(666).getFetcher().fetch(i);
    	assertI(i[0],666);
    	
    	final int[] a = new int[] { 0,5 };
    	Runnable r = new Runnable() {
    		int[] a;
    		public Runnable init(int[] a) {
    			this.a = a;
    			return this;
    		}
    		public void run() {
    			a[0] = a[1];
    		}
    	}.init(a);
    	assertI(a[0], 0);
    	r.run();
    	assertI(a[0], 5);

    	assertO(OuterCläss.accessLocalVariablesOfStatic(), "47,11,8");
    	OuterCläss oc2 = new OuterCläss(77);
    	assertO(oc2.accessLocalVariablesOfInstanceMethod(), "77,77");
    }
    
    public static void identifi€rmangling() 
    {   System.out.println("- identifier mangling");    
        assertI(lock.implicit(3),4);
        assertI(arguments.yield(5),6);  
    }
    
        
    public static void assertI(int value, int expected)
    {   if (value!=expected) 
        {   System.err.println("Received "+value+" instead of "+expected);
        }
    }
    
    public static void assertO(Object value, Object expected) 
    {   if (value!=expected) 
        {   if (value!=null && expected!=null && value.equals(expected)) 
            {   // this counts as equal 
            }
            else 
            {   System.err.println("Received "+value+" instead of "+expected);
            }
        }
    }
    
    public static void assertB(boolean value, boolean expected)
    {   if (value!=expected) 
        {   System.err.println("Received "+value+" instead of "+expected);
        }
    }
    
    public static void assertB(boolean b)
    {   if (!b) 
        {   System.err.println("Check failed");
        }
    }
    
    public static void assertD(double value, double expected)
    {   if (value!=expected) 
        {   System.err.println("Received "+value+" instead of "+expected);
        }
    }
    
    public static void assertApproximately(double value, double expected)
    {   if (Double.isInfinite(value) || Double.isNaN(value)) 
        {   System.err.println("Received "+value+" instead of "+expected);    		
        } else if (value!=expected && value/expected>1.000000000001 || value/expected<0.999999999999) 
        {   System.err.println("Received "+value+" instead of "+expected);
        }
    }

    public static void assertNaN(double value)
    {   if (!Double.isNaN(value)) 
        {   System.err.println("Received "+value+" instead of NaN");
        }
    }
    public static void assertPositiveZero(double value)
    {   if (!(value==0.0 && 1/value==Double.POSITIVE_INFINITY)) 
        {   System.err.println("Received "+value+" instead of positive 0");
        }
    }
    public static void assertNegativeZero(double value)
    {   if (!(value==0.0 && 1/value==Double.NEGATIVE_INFINITY)) 
        {   System.err.println("Received "+value+" instead of negative 0");
        }
    }

    public static void assertBA(byte[] value, byte[] expected)
    {   if (value.length != expected.length) 
        {   System.err.println("Received "+value.length+" bytes instead of "+expected.length);  
            return;
        }
        for (int i=0; i<value.length; i++) 
        {   assertI(value[i],expected[i]);
        }
    }
    
    public static void assertSA(String[] value, String[] expected) 
    {   if (value.length != expected.length) 
        {   System.err.println("Received "+value.length+" strings instead of "+expected.length);  
            return;
        }
        for (int i=0; i<value.length; i++) 
        {   assertO(value[i],expected[i]);
        }
    }
}

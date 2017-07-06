package com.greentube.convertertest;

import com.greentube.convertertest2.TestInterface2;
import com.greentube.convertertest2.TestInterfaceX;
import com.greentube.convertertest2.TestObject2;
import com.greentube.convertertest3.InitSequenceTestA;
import com.greentube.convertertest3.InitSequenceTestB;
import com.greentube.convertertest3.InitSequenceTestC;
import com.greentube.convertertest3.InitializerBlockTest;
import com.greentube.convertertest3.OuterClass;
import com.greentube.convertertest3.OuterClass.InnerStatic;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Deque;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.Vector;

// A test class to test the conversion of various features from java to other languages

public class TestJava4 {
    
    // class attributes
    static int staticint = 4;           // static attribute with initializer 
    final static int staticint99 = 99;  // final static with initializer

    static int static1, static2;       // two variables in one line;
    
    static String initialized = "hello".substring(2);

    public static void main(String[] args) {
        System.out.println ("-- converter test suite for java 4" );
        
        staticattributestest();
        constructortest();
        arraytest();
        shadowingtest();
        casttest();
        operatortest();
        assignoperatortest();
        numbertest();
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
        arraydequetest();
        
        secondaryclassestest();
        complexoperationtest();
        initsequencetest();
        innerclasstest();
    }
    
    public static void staticattributestest()
    {
    	System.out.println("- static attributes");
        assertI(staticint, 4);
        assertI(staticint99 ,99);
        
        assertI(static1 ,0);
        static1 = 44;
        assertI(static1, 44);
               
        assertI(StaticClass.a, 17);
        assertO(StaticClass.b, "hello kitty");
        assertO(StaticClass.c, new Vector());
        assertB(StaticClass.d instanceof DummyClass);   
        assertO(StaticClass.e, null);
        assertI(StaticClass.f, 0);    
        
        TestObject t = new TestObject();	       
        assertI(t.accessParentStatic(), 66);
        
        assertI(TestInterface.constant1, 6);
        assertO(TestInterface.constant2, "Hi");
        assertO(TestInterface.constant3, new Integer(44));
    }
    
    public static void constructortest()
    {    	
    	System.out.println("- constructor");
    	
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
    }
    

    static public void arraytest() {
    	System.out.println ("- array");
    	
        // simple array with initializer
        int[] ar = new int[]{3,4,5};
        assertI(ar.length, 3);
        assertI(ar[0],3);
        assertI(ar[1],4);
        assertI(ar[2],5);
               
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
        assertB(tob3[0] instanceof TestObject[][]);
//        assertB(!( ((Object)tob3[0]) instanceof TestObject[]));
        assertB(tob3[0][1] instanceof TestObject[]);
//        assertB(!(tob3[0][1][0] instanceof TestObject));
        
        assertB(tob instanceof Object);
        assertB(tob.toString().startsWith("["));
        assertB(new int[2].toString().startsWith("["));
        
        sa = new String[2];
        String [] sa1 = new String[2];
        assertB(sa.equals(sa));
        assertB(!sa.equals(sa1));
        assertB(!sa.equals("something"));
    }
    
    private static int getArray()[] {
        return new int[]{9,8,7,6,5,4,3};
    }

    public static void shadowingtest() { 
    	System.out.println ("- shadowing");
        
    	assertI(getShadowed99(), 99);    	
    	int staticint99 = 44;
    	assertI(staticint99, 44);
    	
    	TestObject t = new TestObject(null,5);
    	assertI(t.shadowAttributeSum(), 88+123+5);    
    }
    private static int getShadowed99()
    {
    	return staticint99;
    }

    public static void casttest() {
    	System.out.println("- cast");
    	
    	// cast between types and test for type inclusion
        int[] a = new int[]{ 5,4,3};
        Object o = a;
        assertB(o instanceof int[]);
        assertB(! (o instanceof TestObject));
//        assertB(! (o instanceof int[][]));
//        assertB(! (o instanceof String[]));

        TestObject t = new TestObject();
        o = t;
        assertB(o instanceof Object);
        assertB(o instanceof TestObject);
        assertB(o instanceof TestParent);
        assertB(o instanceof TestParentIntermediate);
        t = (TestObject) o;
        assertO(t.hello(), "hello");
        
        TestInterface f = t;
        assertO(f.hello(), "hello");
        assertB(t instanceof TestInterface);
        assertB(!(t instanceof TestInterfaceX));
        Object t2 = new TestObject2();
        assertB(t2 instanceof TestInterface);
        assertB(t2 instanceof TestInterfaceX);
        assertB(t2 instanceof TestInterface2);
        TestInterface f2 = (TestInterface2) t2;
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
        assertB(! (it2 instanceof String[]));
        
        String s = (String) it2;	// null may be cast to anything
        assertO(s, null); 
        
        // check if the toString operation delivers sensible defaults
        assertB(new Object().toString().startsWith("java.lang.Object"));
        assertB(new ClassWithNoToString().toString().startsWith("com.greentube.convertertest.ClassWithNoToString"));
//        assertB((new int[3]).toString().startsWith("[I@"));
    }
    
    public static void operatortest() {
    	System.out.println("- operator");

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
        
        assertI ( (byte) 124, 124);
        assertI ( (byte) 44444, -100);
        assertI ( (byte) -2344444, 4);
        assertI ( (byte) -1234.1, 46);        
        assertI ( (byte) -1234.9, 46);        
        assertI ( (byte) 434.9, -78);            
        assertI ( (char) 1234.5, 1234);
        assertI ( (char) -1234, 64302);
        assertI ( (char) 0.2, 0);
        assertI ( (char) -0.2, 0);
        assertI ( (char) -77777.8, 53295);
        assertI ( (char) 77777.8, 12241);
        assertI ( (int) 1234.5, 1234);
        assertI ( (int) -1234, -1234);
        assertI ( (int) 0.2, 0);
        assertI ( (int) -0.2, 0);
        assertI ( (int) -77777.8, -77777);
        assertI ( (int) -77777.2, -77777);
        
        boolean t=true;
        boolean f=false;
        boolean f2=false;
        assertB ( (f && f2 || t), true);
        assertB ( (f && t || t), true);
        assertB ( 3 < 4, true);
        assertB ( - -3 > + + +4, false);
    }
    
    public static void assignoperatortest() {
    	System.out.println("- assign operator");
    	
    	int i = 0;
    	int[] a = {7};
    	a[i++] += 8;
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
    	d -= 4.5;
    	d *= 3;
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
    	
    	i = 17;
    	i += 3;
    	i -= 3;
    	i *= 2;
    	assertI(i, 34);
    	i = i/4;   // can not use i /= 4;
    	assertI(i, 8);
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
    	i >>>= 4;
    	assertI(i, 0x0ff00000);   
    	
    	char c = 0;
    	c = 544;
    	assertI(c,544);
    	i = (byte) 1;
    	assertI(i,1);
    }
    
    public static void numbertest() {
    	System.out.println("- number");
    	
    	assertI( 17/5, 3);
    	assertI( 17%5, 2);
    	assertI( 17*5, 85);
    	assertI( (-17)/5, -3);    
    	assertI( (-17)%5, -2);
    	assertI( (-17)*5, -85);
    	assertI( 17/-5, -3);
    	assertI( 17%-5, 2);
    	assertI( 17*-5, -85);
    	assertI( (-17)/-5, 3);    
    	assertI( (-17)%-5, -2);
    	assertI( (-17)*-5, 85);

    	assertI (246<<6, 15744);
        assertI (-(246)>>2, -62);
        assertI (-(246)>>>2, 1073741762);
        assertI (642<<30, -2147483648);
        assertI (1<<100, 16);
        assertI (2000000000>>40, 7812500);
            
        double c = 99d;
        double d = 5.1d;
        assertD( c/((double)d), 19.411764705882355);        
        assertD(31.0/2, 15.5);
        c = 1.0/0.0;
        assertD(c, Double.POSITIVE_INFINITY);
        d = -1.0/0.0;
        assertD(d, Double.NEGATIVE_INFINITY);
        assertB(c-c != 0.0);
        assertB(d-d != 0.0);
        assertB(c+d != 0.0);
        assertB(c/c != 0.0);
        assertD(2*c, Double.POSITIVE_INFINITY);
        assertD(c+c, Double.POSITIVE_INFINITY);
        assertB(0.0/0.0 != Double.NEGATIVE_INFINITY);
        assertB(0.0/0.0 != Double.POSITIVE_INFINITY);
        assertB(0.0/0.0 != 0);
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
    	d = 0.0/0.0;
    	assertI((int)d, 0);
    	d = 1.0 / 0.0;
    	assertB(d == Double.POSITIVE_INFINITY);
    	assertI((int)d, Integer.MAX_VALUE);
    	d = -1.0 / 0.0;
    	assertB(d == Double.NEGATIVE_INFINITY);
    	assertI((int)d, Integer.MIN_VALUE);
    	d = 0.0 / 0.0;
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
    	System.out.println("- constrolstructures");
    	
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
    		y+=z;
    		z++;
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
    }
    

    public static void mathtest() {
    	System.out.println("- math");
    	
    	assertApproximately(Math.E, 2.718281828459045); 
        assertApproximately(Math.PI, 3.141592653589793);    	
        assertD(Math.abs(-0.5),0.5);
        assertD(Math.acos(1), 0.0);
        assertApproximately(Math.asin(0.5), 0.5235987755982989);
        assertApproximately(Math.atan(1), Math.PI/4.0);
        assertApproximately(Math.atan2(1.0,1.0), Math.PI/4.0);
        assertD(Math.ceil(0.5), 1.0);
        assertD(Math.cos(0), 1);
        assertD(Math.exp(0),1);
        assertD(Math.floor(0.5), 0);
        assertApproximately(Math.log(Math.E), 1);
        assertD(Math.max(4,6), 6);        
        assertD(Math.min(124,5), 5);        
        assertD(Math.pow(2,3), 8);
        assertI((int)Math.round(6.3), 6);
        assertI((int)Math.round(-6.3), -6);
        assertI((int)Math.round(6.5), 7);
        assertI((int)Math.round(-6.5), -6);
        assertI((int)Math.round(5.5), 6);
        assertI((int)Math.round(-5.5), -5);
        assertD(Math.rint(6.3), 6.0);
        assertD(Math.rint(-16.3), -16.0);
        assertD(Math.rint(-16.5), -16.0);
        assertD(Math.rint(16.5), 16.0);
        assertD(Math.rint(-17.5), -18.0);
        assertD(Math.rint(17.5), 18.0);
        assertApproximately(Math.sin(Math.PI/2.0), 1);
        assertD(Math.sqrt(4),2);
        assertApproximately(Math.tan(Math.PI/4.0), 1);
        assertD(Math.log10(100),2);
    }
    
    public static void objecttest() {
    	System.out.println ("- object");
    	Object o = new Object();
    	Object o2 = new Object();
    	assertB(o.toString().startsWith("java.lang.Object"));
    	
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
        byte[] raw = { 65, 109, 101, 108, 105, 101 };   
        String sr = new String();
        assertO( sr, "");
        sr = new String(raw);
        assertO( sr, "Amelie");
        sr = new String(raw,1,3);
        assertO( sr, "mel");
        
        // various string operations
        a = "The test string to do some nonesense";
        
        assertI( a.charAt(0), 'T' );

        assertI( a.compareTo(a), 0);
        assertB( a.compareTo("other") < 0);
        assertB( a.compareTo("Axx") > 0);
        
        assertO( a.concat(" extra"), "The test string to do some nonesense extra");

        assertB( a.endsWith("nonesense"));
        assertB(! a.endsWith("xxx"));

        assertB( a.equals(a + ""));
        assertB(! a.equals(null));
        assertB("TestParent3".equals(new TestParent(3).toString()));
        assertB(!"TestParent3".equals(new Integer(5)));
        
        assertI(a.hashCode(), 486025514);
        assertI("nothing useful".hashCode(), -1885956535);
        
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
        assertB(v.toString().startsWith("[4, nixi, ["));
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
        l.remove(null);
        assertB(l.containsAll(l2));
        l2.add("hugo");
        assertB(!l.containsAll(l2));
        l2.remove("hugo");
        
        Vector v = new Vector();
        v.add("corbin");
        assertB(!l2.equals(v));
        v.add("xavier");
        assertB(l2.equals(v));
        assertO(l2.get(0),"corbin");
        assertO(l2.get(1),"xavier");
        
        assertI(l.hashCode(), -1717592617);
        assertI(l2.hashCode(), 188425001);
        v.add(1,null);
        assertI(v.hashCode(), -1235551511);
        
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
        l.remove("doris");
        assertO(l.toString(),"[alice, bob, corbin, xavier, carl]");
        
        l2.clear();
        l2.add("bob");
        l2.add("xavier");
        l.removeAll(l2);
        assertO(l.toString(),"[alice, corbin, carl]");
        l.add("dodo");
        l.add(null);
        l.add("elvis");
        l.add(null);
        assertO(l.toString(),"[alice, corbin, carl, dodo, null, elvis, null]");
        l.remove(null);       
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
        
        Object[] oa = new ArrayList(l).toArray();
        assertI(oa.length,2);
        assertO(oa[0],"corbin");
        assertO(oa[1],"more");
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
    	assertB(st.indexOf("E=[")>=0);
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
    	assertO(hm.hashCode(), 828991637);
    	hm.put(null, null);
    	assertO(hm.hashCode(), -1300332344);
    	assertB(hm.containsKey(null));
    	hm.remove(null);
    	assertB(!hm.containsKey(null));
    	assertO(hm.hashCode(), -1300332344);
    	
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
    	assertB(vals.remove(it.next()));
    	assertB(it.hasNext());
    	assertB(vals.remove(it.next()));
    	assertB(it.hasNext());
    	assertB(vals.remove(it.next()));
    	assertB(it.hasNext());
    	assertB(vals.remove(it.next()));
    	assertB(it.hasNext());
    	assertB(vals.remove(it.next()));
    	assertB(it.hasNext());
    	assertB(vals.remove(it.next()));
    	assertB(!it.hasNext());
    			
    	Set s = hm.keySet();
    	assertI(s.size(), 6);
    	assertB(s.contains("1"));
    	assertB(!s.contains("-1"));   
    	Set s2 = new HashSet();
    	for (Iterator it2 = s.iterator(); it2.hasNext(); ) {
    		s2.add(it2.next());
    	}
    	assertI(s.size(),6);
    	assertI(s2.size(),6);
    	assertI(s.hashCode(),121);
    	assertI(s2.hashCode(),121);
    	assertO(s,s2);
    	assertO(s2,s);
    }
    
    public static void hashsettest() {
    	System.out.println("- hashset");
    	
    	Set s = new HashSet();
    	s.add("hey");
    	s.add(Integer.valueOf(4711));
    	s.add(Byte.valueOf((byte)44));
    	assertB(s.contains("hey"));
    	assertB(s.contains(Integer.valueOf(4711)));
    	assertB(s.contains(Byte.valueOf((byte)44)));    	
    	assertB(!s.contains(Integer.valueOf(44)));
    	assertB(s.remove(Integer.valueOf(4711)));
    	assertB(!s.contains(Integer.valueOf(4711)));
    	assertB(s.toString().indexOf("44")>=0);
    	
    	Set s2 = new HashSet(s);
    	assertI(s2.size(), 2);
    	Set s3 = new HashSet();
    	assertB(s3.addAll(s));
    	assertO(s2,s3);
    	assertI(s3.hashCode(), s2.hashCode());
    	assertI(s3.hashCode(), 103240);
    	
    	Iterator it = s2.iterator();
    	assertB(s3.contains(it.next()));
    	assertB(s3.contains(it.next()));    	
    }
    
    public static void arraydequetest() {
    	System.out.println("- arraydeque");
    	Deque d = new ArrayDeque();
    	d.add("p1");
    	d.add("p2");
    	d.addFirst("p0");
    	d.addLast("p3");
    	d.addLast("p4");
    	assertO(d.size(), 5);
    	assertB(d.contains("p2"));
    	assertB(!d.contains("px"));
    	assertO(d.toString(),"[p0, p1, p2, p3, p4]");
    	
    	assertO(d.poll(),  "p0");
    	assertO(d.toString(),"[p1, p2, p3, p4]");
    	for (int i=0; i<20; i++) d.addFirst("p0");
    	for (int i=0; i<19; i++) assertO(d.removeFirst(),"p0");
    	assertO(d.toString(),"[p0, p1, p2, p3, p4]");
    	
    	assertO(d.element(), "p0");
    	assertO(d.peek(), "p0");
    	assertO(d.peekFirst(), "p0");
    	assertO(d.getFirst(), "p0");
    	assertO(d.peekLast(), "p4");
    	assertO(d.getLast(), "p4");
    	assertO(d.poll(), "p0");
    	assertO(d.poll(), "p1");
    	assertO(d.pollFirst(), "p2");
    	assertO(d.pollLast(), "p4");
    	assertO(d.pollLast(), "p3");
    	assertO(d.poll(), null);
    	assertO(d.pollFirst(), null);
    	assertO(d.pollLast(), null);
    	
    	d.clear();
    	assertO(d.peek(),null);
    	for (int i=0; i<100; i++) d.add(Integer.valueOf(i));
    	for (int i=0; i<1000; i++) {
    		assertO(d.poll(), Integer.valueOf(i));
    		d.offer(Integer.valueOf(100+i));
    	}
    	
    	d.clear();
    	for (int i=0; i<100; i++) d.addFirst(Integer.valueOf(i));
    	for (int i=0; i<1000; i++) {
    		assertO(d.pollLast(), Integer.valueOf(i));
    		d.offerFirst(Integer.valueOf(100+i));
    	}
    	
    	ArrayDeque a = new ArrayDeque(d);
    	for (int i=0; i<100; i++) {
    		assertO(a.pollLast(), Integer.valueOf(1000+i));
    	}
    	
    	int i = 1100;
    	for (Iterator it = d.iterator(); it.hasNext(); ) {
    		assertO(it.next(), Integer.valueOf(--i));
    	}
    	i = 1000;
    	for (Iterator it = d.descendingIterator(); it.hasNext(); ) {
    		assertO(it.next(), Integer.valueOf(i++));
    	}
    	assertI(d.size(),100);
    	
    	ArrayDeque b = new ArrayDeque();
    	assertB(b.addAll(d));
    	assertB(!b.addAll(new ArrayList()));
    	
    	assertO(d.remove(), Integer.valueOf(1099));
    	assertO(d.removeFirst(), Integer.valueOf(1098));
    	assertO(d.removeLast(), Integer.valueOf(1000));
    	
    	assertI(b.size(), 100);
    	assertB(b.contains(Integer.valueOf(1050)));
    	assertB(!b.contains(Integer.valueOf(10)));
    	b.offerLast("end");
    	assertB(b.contains("end"));
    	assertO(b.removeLast(), "end");
    	b.push("stacktop");
    	b.push("stacktop2");
    	assertB(b.contains("stacktop2"));
    	assertB(!b.contains("wrzlbrmpft"));
    	assertO(b.pop(), "stacktop2");
    	assertO(b.pop(), "stacktop");
    	
    }
    
    
//    public static void converttest() {
//    	System.out.println("- convert");
//        	
//    	assertI(Convert.stringToInt("23"), 23);
//    	assertI(Convert.stringToInt("+312"), 312);
//    	assertI(Convert.stringToInt("+x312"), 0);
//    	assertI(Convert.stringToInt("x23"), 0);
//    	assertI(Convert.stringToInt("23x"), 0);
//    	assertI(Convert.stringToInt("4234.12"), 0);
//    	assertI(Convert.stringToInt("-23", 47), -23);    	
//    	assertI(Convert.stringToInt("-0023", 47), -23);    	
//    	assertI(Convert.stringToInt("+0ab", 15), 15);    	
//    	assertI(Convert.stringToInt("+031", 15), 31);    	
//    	assertI(Convert.stringToInt("4234.12", 47), 47);
//    	assertI(Convert.stringToInt("x23", 47), 47);
//    	
//    	assertI(Convert.stringToInt("x23", 1,2), 23);
//    	assertI(Convert.stringToInt("x23", 0,2), 0);
//    	assertI(Convert.stringToInt("x-23f", 1,3, 99), -23);
//    	assertI(Convert.stringToInt("x-23f", 1,4, 99), 99);
//    	
//    	assertD(Convert.stringToDouble("4234.4"), 4234.4);
//    	assertD(Convert.stringToDouble("-4123123.4"), -4123123.4);
//    	assertD(Convert.stringToDouble("4x234.4"), 0);
//    	assertD(Convert.stringToDouble("4x234.4", 33), 33);
//    	assertD(Convert.stringToDouble("4234.x4", 33), 33);
//    	assertD(Convert.stringToDouble("NaN", 5), 5);
//    	assertD(Convert.stringToDouble("Infinity", 5), 5);
//    	assertD(Convert.stringToDouble("+Infinity", 5), 5);
//    	assertD(Convert.stringToDouble("+Nan", 5), 5);
//    	
//    	assertO(Convert.charToString('x'), "x");
//    	
//    	assertI(Convert.doubleToInt(-0.3), 0);
//    	assertI(Convert.doubleToInt(1.4), 1);
//    	assertI(Convert.doubleToInt(-1.4), -1);
//    	assertI(Convert.doubleToInt(5.5), 6);
//    	assertI(Convert.doubleToInt(5.9), 6);
//    	assertI(Convert.doubleToInt(-3.5), -4);
//    	assertI(Convert.doubleToInt(-3.7), -4);
//    	
//    	assertI(Convert.hexToInt("f"), 15);
//    	assertI(Convert.hexToInt("-a"), -10);
//    	assertI(Convert.hexToInt("fA"), 16*15+10);
//    	assertI(Convert.hexToInt("2F"), 32+15);
//    	assertI(Convert.hexToInt("-002F"), -(32+15));
//    	assertI(Convert.hexToInt("x"), 0);
//    	assertI(Convert.hexToInt("13x"), 0);
//    	assertI(Convert.hexToInt("-013x"), 0);
//    	assertI(Convert.hexToInt("-0fb.44"), 0);
//    	assertI(Convert.hexToInt("-0fb.4x"), 0);
//    	
//    	assertO(Convert.doubleToStringRounded(1355.11), "1355");
//    	assertO(Convert.doubleToStringRounded(1355.5), "1356");
//    	assertO(Convert.doubleToStringRounded(-3.5), "-4");
//    	assertO(Convert.doubleToStringRounded(423455.7), "423456");
//    	assertO(Convert.doubleToStringRounded(-423455.7), "-423456");
//    	assertO(Convert.doubleToStringRounded(-423455.7), "-423456");
//    	
//    	assertO(Convert.doubleToStringRounded(14144, "#"), "14#144");
//    	assertO(Convert.doubleToStringRounded(999999.9, "'"), "1'000'000");
//    	assertO(Convert.doubleToStringRounded(-999999.5, "'"), "-1'000'000");
//    }
//    
//    public static void encodedecodetest()
//    {
//    	Debug.log("- encode/decode");
//    	    	
//    	assertBA (ClientConnection.composePacket((byte)27, new String[0]),
//    			  new byte[]{27}  );
//    	assertBA (ClientConnection.composePacket((byte)27, new String[]{""}),
//  			      new byte[]{27,-2}  );
//    	assertBA (ClientConnection.composePacket((byte)27, new String[]{"hi"}),
//			      new byte[]{27,104,105}  );
//    	assertBA (ClientConnection.composePacket((byte)27, new String[]{"hi","there"}),
//			      new byte[]{27,104,105,-1,116,104,101,114,101}  );
//    	assertBA (ClientConnection.composePacket((byte)27,  new String[]{"","����","end"}),
//    			  new byte[]{27,-1,-61,-74,-61,-92,-61,-68,-30,-126,-84,-1,101,110,100} );
//    	assertBA (ClientConnection.composePacket((byte)27,  new String[]{"","","h", ""}),
//  			  new byte[]{27,-1,-1,104,-1} );
//    	
//    	Vector p = new Vector();
//    	assertBA (ClientConnection.composePacket((byte)27, p),
//    			new byte[]{27} );    	
//    	p.addElement("");
//    	assertBA (ClientConnection.composePacket((byte)27, p),
//    			new byte[]{27, -2} );
//    	p.clear();
//    	p.addElement("");
//    	p.addElement("����");
//    	p.addElement("end");
//    	assertBA (ClientConnection.composePacket((byte)27, p), 
//  			  new byte[]{27,-1,-61,-74,-61,-92,-61,-68,-30,-126,-84,-1,101,110,100} );
//
//    	assertSA(ClientConnection.decomposePacket(new byte[]{ 33 }), 
//    				new String[0] );
//    	assertSA(ClientConnection.decomposePacket(new byte[]{ 33, -2 }), 
//    				new String[]{""} );
//    	assertSA(ClientConnection.decomposePacket(new byte[]{ 33, 104,105 }),
//    				new String[]{"hi"} );
//    	assertSA(ClientConnection.decomposePacket(new byte[]{ 33, 104,105,-1,116,104,101,114,101 }),
//    				new String[]{"hi","there"} );
//    	assertSA(ClientConnection.decomposePacket(new byte[]{ 33, -1,-61,-74,-61,-92,-61,-68,-30,-126,-84,-1,101,110,100 }),
//    				new String[]{"","����","end"} );    	
//    	assertSA(ClientConnection.decomposePacket(new byte[]{ 33, -1,-1,-1 }),
//				new String[]{"","","",""} );    	
//    	assertSA(ClientConnection.decomposePacket(new byte[]{ 33, -1,65,-1,-1 }),
//				new String[]{"","A","",""} );    	
//    }

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
    
    public static void innerclasstest() {
    	System.out.println("- inner classes");
    	
    	InnerStatic s = new OuterClass.InnerStatic(44);
    	assertO(s.toString(), "44,88,99");
    	
    	OuterClass x = new OuterClass(4711);
    	assertO(x.toString(),"!4711:99,4711");
    	OuterClass.MemberClass m = x.new MemberClass(44);
    	assertO(m.toString(),"44,4711");
    	
    	assertO(x.workWithLocalClass(), "L4721");
    	assertO(new OuterClass(33).workWithLocalClass(), "L43");
    	
    	assertO(x.workWithAnonymousClass(), "A54,4711,4788,7,4788-4788-77");
    	assertO(new OuterClass(91).workWithAnonymousClass(), "A54,91,168,7,168-168-77");

    	int[] i= new int[1];
    	new OuterClass(666).getFetcher().fetch(i);
    	assertI(i[0],666);
    }
    
    
    public static void assertI(int value, int expected) {
    	if (value!=expected) {
    		System.err.println("Received "+value+" instead of "+expected);
    	}
    }
    public static void assertO(Object value, Object expected) {
    	if (value!=expected) {
    		if (value!=null && expected!=null && value.equals(expected)) {
    			// this counts as equal 
    		}
    		else {
    			System.err.println("Received "+value+" instead of "+expected);
    		}    		
    	}
    }
    public static void assertB(boolean value, boolean expected)
    {
    	if (value!=expected) {
    		System.err.println("Received "+value+" instead of "+expected);
    	}
    }
    
    public static void assertB(boolean b)
    {
    	if (!b) {
    		System.err.println("Check failed");
    	}
    }

    public static void assertD(double value, double expected)
    {
    	if (value!=expected) {
    		System.err.println("Received "+value+" instead of "+expected);
    	}
    }
    public static void assertApproximately(double value, double expected)
    {
    	if (value<expected-0.00000000001 || value>expected+0.00000000001) {
    		System.err.println("Received "+value+" instead of "+expected);
    	}
    }
    
    public static void assertBA(byte[] value, byte[] expected)
    {
    	if (value.length != expected.length) {
    		System.err.println("Received "+value.length+" bytes instead of "+expected.length);  
    		return;
    	}
    	for (int i=0; i<value.length; i++) {
    		assertI(value[i],expected[i]);
    	}
    }
    
    public static void assertSA(String[] value, String[] expected) 
    {
    	if (value.length != expected.length) {
    		System.err.println("Received "+value.length+" strings instead of "+expected.length);  
    		return;
    	}
    	for (int i=0; i<value.length; i++) {
    		assertO(value[i],expected[i]);
    	}
    }
    
}



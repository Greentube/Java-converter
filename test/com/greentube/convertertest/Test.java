package com.greentube.convertertest;

import com.greentube.convertertest2.TestInterface2;
import com.greentube.convertertest2.TestInterfaceX;
import com.greentube.convertertest2.TestObject2;

import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Vector;

// A test class to test the conversion of various features from java to other languages

public class Test {
    
    // class attributes
    static int staticint = 4;           // static attribute with initializer 
    final static int staticint99 = 99;  // final static with initializer

    static int static1, static2;       // two variables in one line;
    

    public static void main(String[] args) {
        System.out.println ("-- language converter test suite started" );
        
        staticattributestests();
        constructortest();
        arraytest();
        shadowingtest();
        casttest();
        operatortest();
        numbertest();
        numberconversiontest();
        
        booleantest();        
        bytetest();        
        doubletest();
        integertest();
        mathtest();
        objecttest();
        stringtest();
        stringbuffertest();
        stringbuildertest();
        systemtest();
        
        hashtabletest();        
        vectortest();                
        
//        converttest();
//        encodedecodetest();
        secondaryclassestest();
        complexoperationtest();
        
        System.out.println ("-- language converter test suite finished" );
    }
    
    public static void staticattributestests()
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
        
//        TestObject t = new TestObject();	      // no longer correctly supported 
//        assertI(t.accessParentStatic(), 66);
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
        assertI(a[0].length, 5);
        assertI(a[1].length, 5);
        assertI(a[2].length, 5);
        assertI(a[3].length, 5);
        assertI(a[0][0], 0);
        assertI(a[3][3], 0);
        assertI(a[0][2], 77);
        
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
        assertI ( ((short)j) , -19182);
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
        assertI ( (short) 124, 124);
        assertI ( (short) 44444, -21092);
        assertI ( (short) -2344444, 14852);
        assertI ( (short) -1234.1, -1234);        
        assertI ( (short) -1234.9, -1234);        
        assertI ( (short) 434.9, 434);        
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
    	short s;
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
    	s = (short)i;
    	assertI(s, -6729);
    	i = -4711863;
    	s = (short)i;
    	assertI(s, 6729);    	
    	d = 12351235;
    	s = (short) d;
    	assertI(s, 30467);
    	s = (short) Integer.MAX_VALUE;
    	assertI(s, -1);
    	s = (short) Integer.MIN_VALUE;
    	assertI(s, 0);    	
    	d = -14123351235.0;
    	s = (short) d;
    	assertI(s, 0);
    	d = 14123351235.0;
    	s = (short) d;
    	assertI(s, -1);
    	d = 0.0/0.0;
    	s = (short) d;
    	assertI(s, 0);
    	d = Double.POSITIVE_INFINITY;
    	s = (short) d;
    	assertI(s, -1);
    	d = Double.NEGATIVE_INFINITY;
    	s = (short) d;
    	assertI(s, 0);

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
    }
    
    public static void bytetest() {
    	System.out.println("- byte");
    	
    	assertI(Byte.MIN_VALUE, -128);
    	assertI(Byte.MAX_VALUE, 127);
    	Byte b = new Byte((byte) 5);
    	Byte b2 = new Byte((byte) 7);
    	Byte b3 = new Byte((byte) 5);
    	
    	assertB(! b.equals("5"));
    	assertB(! b.equals(b2));
    	assertB(b.equals(b3));
    	assertB(!b.equals(null));
    	assertB(b == b3, false);
    	assertI(b.byteValue(), 5);
    	assertO(b.toString(), "5");
    	assertO(Byte.toString((byte)6), "6");    	
    	assertO(Byte.toString((byte)-36), "-36");    	
    }
    
    public static void doubletest() {
    	System.out.println("- double");
    	
    	assertD(Double.MIN_VALUE, 4.9E-324);
    	assertD(Double.MAX_VALUE, 1.7976931348623157E308);
    	Double d = new Double(5);
    	Double d2 = new Double(7);
    	Double d3 = new Double(5);
    	
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
    	Integer i3 = new Integer( 5);
    	
    	assertB(! i.equals("5"));
    	assertB(! i.equals(i2));
    	assertB(! i.equals(null));
    	assertB(i.equals(i3));
    	assertB(i == i3, false);
    	assertI(i.intValue(), 5);
    	assertO(i.toString(), "5");
    	
    	assertO(Integer.toString(2346), "2346");    	
    	assertO(Integer.toString(-46), "-46");    	 	
    }

    public static void booleantest() {
    	System.out.println("- boolean");
    	
    	Boolean t = new Boolean(true);
    	Boolean f = new Boolean(false);
    	Boolean f2 = new Boolean(false);
    	
    	assertB(t.equals(Boolean.TRUE));
    	assertB(!t.equals("TRUE"));
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
        assertD(Math.round(6.3), 6);
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
        
        assertI( a.indexOf('t'), 4);
        assertI( a.indexOf('q'), -1);
        assertI( a.indexOf('t', 8), 10);
        assertI( a.indexOf('q', 20), -1);
        
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
        assertO(c.toString(), "[homer, marge, bart, LISA, meggy]");
        
        c.setSize(0);
        assertI(c.size(), 0);
        
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
    
    public static void hashtabletest() {
    	System.out.println("- hashtable");
    	
    	Hashtable ht = new Hashtable();
    	ht.put("Test", new Integer(1));
    	ht.put("Test2", new Integer(2));
    	
    	assertI(ht.size(), 2);
    	assertB(!ht.isEmpty());
    	assertB(ht.containsKey("Test"));
    	assertO(ht.get("Test"), new Integer(1));
    	
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
    	assertI(ht.size(), 0);
    	assertB(ht.isEmpty());
    	assertB(! ht.containsKey("Test"));
    	
    	ht.put("A",  "something");
    	ht.put("B",  "some other");
    	ht.put("C",  "more text");
    	ht.put("D",  new Integer(99));
    	ht.put("E",  new int[2] );
    	System.out.println("  Hashtable representation: "+ht.toString());
    	
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
    	assertB(ev.contains(ht.get("A")));
    	assertB(ev.contains(ht.get("B")));
    	assertB(ev.contains(ht.get("C")));
    	assertB(ev.contains(ht.get("D")));
    	assertB(ev.contains(ht.get("E")));
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
//    	assertBA (ClientConnection.composePacket((byte)27,  new String[]{"","öäü€","end"}),
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
//    	p.addElement("öäü€");
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
//    				new String[]{"","öäü€","end"} );    	
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



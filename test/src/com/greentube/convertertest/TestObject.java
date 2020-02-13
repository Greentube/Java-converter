package com.greentube.convertertest;

public class TestObject extends TestParentIntermediate 
{
    // instance attributes
    String somestring;                  // instance attribute default initializer
    int    somenumber;                  // instance attribute default initializer

    TestObject   moreobject;
    TestObject   self;
    public DummyClass dummyobject;
    public boolean dummyboolean;

    public static int staticparentattribute = 55;  // shadow parent static attribute
    public static TestObject staticself = new TestObject(); 
    public static TestObject[] staticselfarray = new TestObject[1]; 
    
    // constructors
    public TestObject()                 // construct without parameters
    {   super();                        // constructor calling superconstructor
        somenumber = 4711;
        somestring = "defaulttext";
        self = this;
    }

    public TestObject(String str)        // constructor with 1 parametere
    {   this(str,4711);                  // calling second constructor of 'this'
    }
                                    // constructor with 2 parameters
    public TestObject(String somestring, int somenumber) 
    {   super (4);                      // constructor calling superconstructor
        this.somestring = somestring;   // local variables shadowing attributes
        this.somenumber = somenumber;
    }

    public TestObject(int a, int b, int c)  
    {                                   // call default constructor of superclass     
    }
    
    public int xyz()
    {
        return 1;
    }
    public int mul(int a, int b)
    {
    	return a*b;
    }
    
    public int shadowAttributeSum()
    {   int somenumber = 123;
        return shadowAttribute() + somenumber + staticmethod();
    }

    public int shadowAttribute()
    {   return somenumber;
    }

    public int accessParentStatic() 
    {   return super.staticparentattribute + super.staticmethod() - 88;
    }

    public int accessOwnStatic() 
    {   return this.staticparentattribute;
    }

    // should not be confused with the shadowAttribute method
    public static int shadowAttribute(int someparameter)
    {   return someparameter;
    }

    public int depth() 
    {   return super.depth()+mul(xyz(),1);
    }

    public int depth(int multiplier) 
    {   return super.depth(multiplier) + 5;
    }
    
    public static int unusedmethod()
    {
        System.out.println("this method will not be used from anywhere (test dead-code elimination)");
        return 4711;
    }
}


"use strict";

//reference// java/lang/String

// definition of the base class for all java classes
function java_lang_Object()
{
    // no members in constructor of empty object
};

// internal default constructor
java_lang_Object.prototype._0 = function()
{
    return this;
};

// add default member functions
java_lang_Object.prototype.toString_0 = function()
{
  return this._classNameString;
};
java_lang_Object.prototype.equals_1 = function(a)
{
  return this===a;
};
java_lang_Object.prototype.hashCode_0 = function()
{
  return 0;  // there is no real way to have a identity number 
};
// provide the standard javascript means to convert anything to a string
java_lang_Object.prototype.toString = function()
{
  return this.toString_0();
};

// add type detection flag
java_lang_Object.prototype._is_java_lang_Object = true;
java_lang_Object.prototype._classNameString = "java.lang.Object";


// ---- global toolbox functions for classes and arrays ----

// create a new class (that means, its constructor function) and
// copy existing members to the new prototype. this keeps the protoyping
// chain flat and maybe also fast.
function _extendClass (base, methods, classname, interfaces)
{  
  // the constructor function which will be used with new 
  var f = function() {}
  
  // connect prototype chain
  f.prototype.__proto__ = base.prototype;
  
  // add/overwrite methods that are newly defined
  if (methods) {
      for (var name in methods) {      
        f.prototype[name] = methods[name];
      }
  }  
  
  // add attributes than can be used to check for class/interface type
  f.prototype['_is_'+classname] = true;
  f.prototype._classNameString = classname.replace(new RegExp("_","g"),".");
  
  populateIsInterfaceProperties(interfaces);

  // create container for the static fields members
  f.s = {};
  
  // done
  return f;
  
  function populateIsInterfaceProperties(interfaces) {    
    for (var index=0; interfaces && index<interfaces.length; index++) {     
        f.prototype['_is_' + interfaces[index].classname] = true;
        populateIsInterfaceProperties(interfaces[index].superinterfaces);
    }
  }
}

// create a new interface with possible superinterfaces as well
function _defineInterface(classname, superinterfaces)
{
    var i = {};
    i.classname = classname;
    i.superinterfaces = superinterfaces;
    i.s = {};   // container for all static members
    return i;
}


// return the parameter provided, but in case of null, return a 1 instead.
// this is necessary to avoid runtime errors when checking for type instance
function _denullify(x)
{
  return (x==null) ? false : x;
}

// perform a division like for java integer types
function _divideInteger(a, b) { 
	return (a - a % b) / b; 
} 


// do some numerical cast operations
function _castTObyte(a) {
    var i = _castTOint(a) & 0xff;
    if (i<0x80) return i;
    else        return i-0x100;
}
function _castTOshort(a) {
    var i = _castTOint(a) & 0xffff;
    if (i<0x8000) return i;
    else          return i-0x10000;
}
function _castTOchar(a) {
    return _castTOint(a) & 0xffff;
}
function _castTOint(a) {
    // check various possibilities for a (could be NaN)
    if (a>=0) {   // is a positive number (comparator would fail otherwise)
        if (a>2147483647) return 2147483647
        return Math.floor(a);
    }
    else if (a<=0) { // is a negative number
        if (a<-2147483648) return -2147483648;
        return Math.ceil(a);    
    }
    else {           // is no number at all
        return 0;
    }
}
function _castTOdouble(a) {
    return a;
}

// allocation of string objects can not use normal constructor
function _newString() {
  switch(arguments.length) {
  case 1:   // allocate with character array
    return String.fromCharCode.apply(String, arguments[0]);     
  case 3:   // allocate with part of character array
    var o = arguments[1];
    var l = arguments[2];
    return String.fromCharCode.apply(String, arguments[0].slice(o,o+l));
  default: 
    return "";   
  }
}

// create a (possible multidimensional) array with a initialization value for
// all elements.
// the sizes for the dimensions are given as arguments 1 to n, and the 
// initialization value is the last call argument.

function _createArray () {
  return _createArrayImpl(arguments,0);
}

function _createArrayImpl(dimensions_and_initializer, cursor)
{
  var dims = dimensions_and_initializer.length - cursor - 1;
  if (dims<1) {
    return null;
  } 
  else if (dims==1) {
    var len = dimensions_and_initializer[cursor];
    var initvalue = dimensions_and_initializer[cursor+1];
    var a = new Array(len);
    for (var i=0; i<len; i++) {
      a[i] = initvalue;
    }
    return a;
  }
  else {
    var len = dimensions_and_initializer[cursor];
    var a = new Array(len);
    for (var i=0; i<len; i++) {
      a[i] = _createArrayImpl(dimensions_and_initializer, cursor+1);
    }
    return a;    
  }
}

// do some patching of the built-in array protoype to allow easy
// integration with other java objects

Array.prototype.equals_1 = function (o) {
    return this===o;
};

Array.prototype.toString_0 = function () {
    return "[";
};

Array.prototype.__defineGetter__('length_f', function() { return this.length; });

Array.prototype._is_java_lang_Object = true;
Array.prototype._is_Array = true;











// A test class to test the conversion of various features from java to other languages

//load// java/lang/Object
var com_greentube_convertertest_Test = _extendClass(java_lang_Object,  {
initialConstructor_0: function(){
return java_lang_Object.prototype._0.call(this);
}, 
    
    // class attributes
               // static attribute with initializer 
      // final static with initializer

           // two variables in one line;
    

    main_1:function(args) {
        java_lang_System.prototype.out_f.println_1 (("-- language converter test suite started") );
        
        this.staticattributestests_0();
        this.constructortest_0();
        this.arraytest_0();
        this.shadowingtest_0();
        this.casttest_0();
        this.operatortest_0();
        this.numbertest_0();
        this.numberconversiontest_0();
        
        this.booleantest_0();        
        this.bytetest_0();        
        this.charactertest_0();
        this.doubletest_0();
        this.integertest_0();
        this.mathtest_0();
        this.objecttest_0();
        this.stringtest_0();
        this.stringbuffertest_0();
        this.stringbuildertest_0();
        this.systemtest_0();
        
        this.vectortest_0();                
        this.hashtabletest_0();        
        
//        converttest();
//        encodedecodetest();
        this.secondaryclassestest_0();
        this.complexoperationtest_0();
        
        java_lang_System.prototype.out_f.println_1 (("-- language converter test suite finished") );
    },
    
    staticattributestests_0:function()
    {
    	java_lang_System.prototype.out_f.println_1(("- static attributes"));
        this.assertI_2((com_greentube_convertertest_Test.prototype.staticint_f), (4));
        this.assertI_2((com_greentube_convertertest_Test.prototype.staticint99_f) ,(99));
        
        this.assertI_2((com_greentube_convertertest_Test.prototype.static1_f) ,(0));
        com_greentube_convertertest_Test.prototype.static1_f = (44);
        this.assertI_2((com_greentube_convertertest_Test.prototype.static1_f), (44));
               
        this.assertI_2((com_greentube_convertertest_StaticClass.prototype.a_f), (17));
        this.assertO_2((com_greentube_convertertest_StaticClass.prototype.b_f), ("hello kitty"));
        this.assertO_2((com_greentube_convertertest_StaticClass.prototype.c_f), ((new java_util_Vector)._0()));
        this.assertB_1(((_denullify(com_greentube_convertertest_StaticClass.prototype.d_f )._is_com_greentube_convertertest_DummyClass) ));   
        this.assertO_2((com_greentube_convertertest_StaticClass.prototype.e_f), (null));
        this.assertI_2((com_greentube_convertertest_StaticClass.prototype.f_f), (0));    
        
        var  t = ((new com_greentube_convertertest_TestObject)._0());	       
        this.assertI_2((t.accessParentStatic_0()), (66));
    },
    
    constructortest_0:function()
    {    	
    	java_lang_System.prototype.out_f.println_1(("- constructor"));
    	
    	var  t;
        t = ((new com_greentube_convertertest_TestObject)._0());
        this.assertI_2((t.somenumber_f), (4711));
        this.assertO_2((t.somestring_f), ("defaulttext"));
        
        t = ((new com_greentube_convertertest_TestObject)._1(("any")));
        this.assertI_2((t.somenumber_f), (4711));
        this.assertO_2((t.somestring_f), ("any"));
        
        t = ((new com_greentube_convertertest_TestObject)._2(("nixi"),(44)));
        this.assertI_2((t.somenumber_f), (44));
        this.assertO_2((t.somestring_f), ("nixi"));
        
        var  d = ((new com_greentube_convertertest_DummyClass)._0());
        this.assertO_2((d.secondaryString_0()), ("secondary"));
    },
    

    arraytest_0:function() {
    	java_lang_System.prototype.out_f.println_1 (("- array"));
    	
        // simple array with initializer
        var  ar = ([(3),(4),(5)]);
        this.assertI_2((ar.length_f), (3));
        this.assertI_2((ar[(0)]),(3));
        this.assertI_2((ar[(1)]),(4));
        this.assertI_2((ar[(2)]),(5));
               
        // create multidimensional array
        var a = (_createArray((4),(5),0));                
        this.assertI_2((a.length_f), (4));
        a[(0)][(2)] = (77);
        this.assertI_2((a[(0)].length_f), (5));
        this.assertI_2((a[(1)].length_f), (5));
        this.assertI_2((a[(2)].length_f), (5));
        this.assertI_2((a[(3)].length_f), (5));
        this.assertI_2((a[(0)][(0)]), (0));
        this.assertI_2((a[(3)][(3)]), (0));
        this.assertI_2((a[(0)][(2)]), (77));
        
        var b = (_createArray((4),(2),(7),null));       // declare arrays with various styles
        this.assertI_2((b.length_f),(4));
        this.assertO_2((b[(0)][(0)][(0)]),(null));
        b[(1)][(1)][(1)] = ([ (4),(5) ]);
        this.assertI_2((b[(1)][(1)][(1)][(1)]), (5));        
        
        var e = ([(2),(3),(5),(4+3),(0),(0),(0),(0)]);          // variable initializer with array        
        java_lang_System.prototype.arraycopy_5 ((this.getArray_0()),(2), (e),(5), (2));         // array copy method
        this.assertI_2((e[(5)]), (7));
        this.assertI_2((e[(6)]), (6));
        this.assertI_2((e[(7)]), (0));
        var  c=(_createArray((0),0)), d=(_createArray((2),0));    // declare more variables with one statement
        this.assertI_2((c.length_f),(0));
        this.assertI_2((d[(0)]), (0));
        this.assertI_2((d[(1)]), (0));
        
        var  sa = ([("this"),("is"),("some"),("text")]);
        this.assertO_2((sa[(1)]), ("is"));
        var  sa2 = (_createArray((4),null));
        sa2[(2)] = (sa);
        this.assertO_2((sa2[(2)][(3)]), ("text"));
        
        sa = (_createArray((4),null));
        this.assertI_2((sa.length_f), (4));
        this.assertO_2((sa[(0)]), (null));
        this.assertO_2((sa[(1)]), (null));
        this.assertO_2((sa[(2)]), (null));
        this.assertO_2((sa[(3)]), (null));
        		
        var  tob = (_createArray((3),null));
        tob[(0)] = ((new com_greentube_convertertest_TestObject)._0());
        this.assertB_1((tob[(0)]!=null));
        this.assertO_2((tob[(1)]),(null));
        var  tob2 = (_createArray((3),null));
        this.assertI_2((tob2.length_f),(3));
        this.assertO_2((tob2[(0)]),(null));
        tob2 = (_createArray((3),(2),null));
        this.assertO_2((tob2[(0)][(1)]), (null));
        this.assertO_2((tob2[(1)][(1)]), (null));
        var  tob3 = (_createArray((2),null));
        tob3[(0)] = (_createArray((2),(1),null));
        this.assertO_2((tob3[(1)]),(null));
        this.assertB_1((tob3[(0)] != null));
        this.assertB_1((tob3[(0)][(1)]!=null));
        this.assertB_1(((_denullify(tob3[(0)] )._is_Array) ));
//        assertB(!( ((Object)tob3[0]) instanceof TestObject[]));
        this.assertB_1(((_denullify(tob3[(0)][(1)] )._is_Array) ));
//        assertB(!(tob3[0][1][0] instanceof TestObject));
        
        this.assertB_1(((_denullify(tob )._is_java_lang_Object) ));
        this.assertB_1((tob.toString_0().startsWith_1(("["))));
        this.assertB_1((_createArray((2),0).toString_0().startsWith_1(("["))));
        
        sa = (_createArray((2),null));
        var  sa1 = (_createArray((2),null));
        this.assertB_1((sa.equals_1((sa))));
        this.assertB_1((!sa.equals_1((sa1))));
        this.assertB_1((!sa.equals_1(("something"))));
    },
    
    getArray_0:function() {
        return ([(9),(8),(7),(6),(5),(4),(3)]);
    },

    shadowingtest_0:function() { 
    	java_lang_System.prototype.out_f.println_1 (("- shadowing"));
        
    	this.assertI_2((this.getShadowed99_0()), (99));    	
    	var  staticint99 = (44);
    	this.assertI_2((staticint99), (44));
    	
    	var  t = ((new com_greentube_convertertest_TestObject)._2((null),(5)));
    	this.assertI_2((t.shadowAttributeSum_0()), (88+123+5));    
    },
    getShadowed99_0:function()
    {
    	return (com_greentube_convertertest_Test.prototype.staticint99_f);
    },

    casttest_0:function() {
    	java_lang_System.prototype.out_f.println_1(("- cast"));
    	
    	// cast between types and test for type inclusion
        var  a = ([ (5),(4),(3)]);
        var  o = (a);
        this.assertB_1(((_denullify(o )._is_Array) ));
        this.assertB_1((! (((_denullify(o )._is_com_greentube_convertertest_TestObject) ))));
//        assertB(! (o instanceof int[][]));
//        assertB(! (o instanceof String[]));

        var  t = ((new com_greentube_convertertest_TestObject)._0());
        o = (t);
        this.assertB_1(((_denullify(o )._is_java_lang_Object) ));
        this.assertB_1(((_denullify(o )._is_com_greentube_convertertest_TestObject) ));
        this.assertB_1(((_denullify(o )._is_com_greentube_convertertest_TestParent) ));
        this.assertB_1(((_denullify(o )._is_com_greentube_convertertest_TestParentIntermediate) ));
        t = ( o);
        this.assertO_2((t.hello_0()), ("hello"));
        
        var  f = (t);
        this.assertO_2((f.hello_0()), ("hello"));
        this.assertB_1(((_denullify(t )._is_com_greentube_convertertest_TestInterface) ));
        this.assertB_1((!(((_denullify(t )._is_com_greentube_convertertest2_TestInterfaceX) ))));
        var  t2 = ((new com_greentube_convertertest2_TestObject2)._0());
        this.assertB_1(((_denullify(t2 )._is_com_greentube_convertertest_TestInterface) ));
        this.assertB_1(((_denullify(t2 )._is_com_greentube_convertertest2_TestInterfaceX) ));
        this.assertB_1(((_denullify(t2 )._is_com_greentube_convertertest2_TestInterface2) ));
        var  f2 = ( t2);
        this.assertO_2((f2.hello_0()), ("hello"));
        
        // check type inclusion relation between some built-in types
        this.assertB_1(((_denullify(a )._is_java_lang_Object) ));
        var  oa = (a);
        this.assertI_2( ((( oa))[(0)]),  (5));
        this.assertB_1(((_denullify((new java_lang_Integer)._1((1)) )._is_java_lang_Object) ));
        var  it = (null);
        var  it2 = (it);
        // null is never an instance of anything
        this.assertB_1((! (((_denullify(it )._is_java_lang_Object) ))));        
        this.assertB_1((! (((_denullify(it2 )._is_Array) ))));
        
        var  s = ( it2);	// null may be cast to anything
        this.assertO_2((s), (null)); 
        
        // check if the toString operation delivers sensible defaults
        this.assertB_1(((new java_lang_Object)._0().toString_0().startsWith_1(("java.lang.Object"))));
        this.assertB_1(((new com_greentube_convertertest_ClassWithNoToString)._0().toString_0().startsWith_1(("com.greentube.convertertest.ClassWithNoToString"))));
//        assertB((new int[3]).toString().startsWith("[I@"));
    },
    
    operatortest_0:function() {
    	java_lang_System.prototype.out_f.println_1(("- operator"));

    	var  i=(0);
        var  j = (423081234);
        var  a=(true);
        var  b=(true);
        var  c=(false);
        this.assertI_2 ( (((((4==3+1-i-1))&&a) ? (4+3*3) : (4+7))) , (11));        
        this.assertI_2 ( ((i |= (((((true&&b))) ? (4):(3))))) , (4));
        this.assertB_2 ( (((c==true)||(b))),  (true));
        this.assertI_2 ( (((~((i ^ 4711))))), (-4708));
        this.assertI_2 ( ((((_castTObyte)(j)))) , (18));
//        assertI ( ((short)j) , -19182);
        this.assertI_2 ( ((((_castTOchar)(j)))) , (46354));
        this.assertI_2 ( ((((_castTOint)(j)))), (423081234) );
        this.assertI_2 ( ((((_castTOint) (4.7)))), (4));
        this.assertI_2 ( ((((_castTOint) (-4.7)))), (-4));
        this.assertI_2 ( (((4-3+2+1))),  (4) );
        this.assertI_2 ( (((4-5+5+6+7))), (17) );
        this.assertI_2 ( (((4-5-1))) , (-2));
        this.assertI_2 ( (((4-5+5))),  (4));
        
        this.assertI_2 ( ((_castTObyte) (124)), (124));
        this.assertI_2 ( ((_castTObyte) (44444)), (-100));
        this.assertI_2 ( ((_castTObyte) (-2344444)), (4));
        this.assertI_2 ( ((_castTObyte) (-1234.1)), (46));        
        this.assertI_2 ( ((_castTObyte) (-1234.9)), (46));        
        this.assertI_2 ( ((_castTObyte) (434.9)), (-78));        
//        assertI ( (short) 124, 124);
//        assertI ( (short) 44444, -21092);
//        assertI ( (short) -2344444, 14852);
//        assertI ( (short) -1234.1, -1234);        
//        assertI ( (short) -1234.9, -1234);        
//        assertI ( (short) 434.9, 434);        
        this.assertI_2 ( ((_castTOchar) (1234.5)), (1234));
        this.assertI_2 ( ((_castTOchar) (-1234)), (64302));
        this.assertI_2 ( ((_castTOchar) (0.2)), (0));
        this.assertI_2 ( ((_castTOchar) (-0.2)), (0));
        this.assertI_2 ( ((_castTOchar) (-77777.8)), (53295));
        this.assertI_2 ( ((_castTOchar) (77777.8)), (12241));
        this.assertI_2 ( ((_castTOint) (1234.5)), (1234));
        this.assertI_2 ( ((_castTOint) (-1234)), (-1234));
        this.assertI_2 ( ((_castTOint) (0.2)), (0));
        this.assertI_2 ( ((_castTOint) (-0.2)), (0));
        this.assertI_2 ( ((_castTOint) (-77777.8)), (-77777));
        this.assertI_2 ( ((_castTOint) (-77777.2)), (-77777));
        
        var  t=(true);
        var  f=(false);
        var  f2=(false);
        this.assertB_2 ( (((f && f2) || (t))), (true));
        this.assertB_2 ( (((f && t) || (t))), (true));

    },
    
    numbertest_0:function() {
    	java_lang_System.prototype.out_f.println_1(("- number"));
    	
    	this.assertI_2( (_divideInteger(17,5)), (3));
    	this.assertI_2( (17%5), (2));
    	this.assertI_2( (17*5), (85));
    	this.assertI_2( (_divideInteger(((-17)),5)), (-3));    
    	this.assertI_2( (((-17))%5), (-2));
    	this.assertI_2( (((-17))*5), (-85));
    	this.assertI_2( (_divideInteger(17,-5)), (-3));
    	this.assertI_2( (17%-5), (2));
    	this.assertI_2( (17*-5), (-85));
    	this.assertI_2( (_divideInteger(((-17)),-5)), (3));    
    	this.assertI_2( (((-17))%-5), (-2));
    	this.assertI_2( (((-17))*-5), (85));

    	this.assertI_2 ((246<<6), (15744));
        this.assertI_2 ((-((246))>>2), (-62));
        this.assertI_2 ((-((246))>>>2), (1073741762));
        this.assertI_2 ((642<<30), (-2147483648));
        this.assertI_2 ((1<<100), (16));
        this.assertI_2 ((2000000000>>40), (7812500));
            
        var  c = (99);
        var  d = (5.1);
        this.assertD_2( (c/(((_castTOdouble)(d)))), (19.411764705882355));        
        this.assertD_2((31.0/2), (15.5));
        c = (1.0/0.0);
        this.assertD_2((c), (java_lang_Double.prototype.POSITIVE_INFINITY_f));
        d = (-1.0/0.0);
        this.assertD_2((d), (java_lang_Double.prototype.NEGATIVE_INFINITY_f));
        this.assertB_1((c-c != 0.0));
        this.assertB_1((d-d != 0.0));
        this.assertB_1((c+d != 0.0));
        this.assertB_1((_divideInteger(c,c) != 0.0));
        this.assertD_2((2*c), (java_lang_Double.prototype.POSITIVE_INFINITY_f));
        this.assertD_2((c+c), (java_lang_Double.prototype.POSITIVE_INFINITY_f));
        this.assertB_1((0.0/0.0 != java_lang_Double.prototype.NEGATIVE_INFINITY_f));
        this.assertB_1((0.0/0.0 != java_lang_Double.prototype.POSITIVE_INFINITY_f));
        this.assertB_1((0.0/0.0 != 0));
    },
       
    numberconversiontest_0:function()
    {
    	java_lang_System.prototype.out_f.println_1(("- numberconversion"));
    	
    	var  i;
    	var  b;
    	var  c;
//    	short s;
    	var  d;
    	
    	i = (4711864);
    	b = ((_castTObyte)(i));
    	this.assertI_2((b), (-72));
    	i = (-4711864);
    	b = ((_castTObyte)(i));
    	this.assertI_2((b), (72));    	
    	d = (12351235);
    	b = ((_castTObyte) (d));
    	this.assertI_2((b), (3));
    	b = ((_castTObyte) (java_lang_Integer.prototype.MAX_VALUE_f));
    	this.assertI_2((b), (-1));
    	b = ((_castTObyte) (java_lang_Integer.prototype.MIN_VALUE_f));
    	this.assertI_2((b), (0));    	
    	d = (-14123351235.0);
    	b = ((_castTObyte) (d));
    	this.assertI_2((b), (0));
    	d = (14123351235.0);
    	b = ((_castTObyte) (d));
    	this.assertI_2((b), (-1));
    	d = (0.0/0.0);
    	b = ((_castTObyte) (d));
    	this.assertI_2((b), (0));
    	d = (java_lang_Double.prototype.POSITIVE_INFINITY_f);
    	b = ((_castTObyte) (d));
    	this.assertI_2((b), (-1));
    	d = (java_lang_Double.prototype.NEGATIVE_INFINITY_f);
    	b = ((_castTObyte) (d));
    	this.assertI_2((b), (0));
    	
    	i = (4711863);
    	c = ((_castTOchar)(i));
    	this.assertI_2((c), (58807));
    	i = (-4711863);
    	c = ((_castTOchar)(i));
    	this.assertI_2((c), (6729));    	
    	d = (12351235);
    	c = ((_castTOchar) (d));
    	this.assertI_2((c), (30467));
    	c = ((_castTOchar) (java_lang_Integer.prototype.MAX_VALUE_f));
    	this.assertI_2((c), (65535));
    	c = ((_castTOchar) (java_lang_Integer.prototype.MIN_VALUE_f));
    	this.assertI_2((c), (0));    	
    	d = (-14123351235.0);
    	c = ((_castTOchar) (d));
    	this.assertI_2((c), (0));
    	d = (14123351235.0);
    	c = ((_castTOchar) (d));
    	this.assertI_2((c), (65535));
    	d = (0.0/0.0);
    	c = ((_castTOchar) (d));
    	this.assertI_2((c), (0));
    	d = (java_lang_Double.prototype.POSITIVE_INFINITY_f);
    	c = ((_castTOchar) (d));
    	this.assertI_2((c), (65535));
    	d = (java_lang_Double.prototype.NEGATIVE_INFINITY_f);
    	c = ((_castTOchar) (d));
    	this.assertI_2((c), (0));
    	
    	d = (java_lang_Double.prototype.POSITIVE_INFINITY_f);
    	this.assertI_2(((_castTOint)(d)), (2147483647));
    	d = (java_lang_Double.prototype.NEGATIVE_INFINITY_f);
    	this.assertI_2(((_castTOint)(d)), (-2147483648));
    	d = (java_lang_Double.prototype.MAX_VALUE_f);
    	this.assertI_2(((_castTOint)(d)), (java_lang_Integer.prototype.MAX_VALUE_f));
    	d = (java_lang_Double.prototype.MIN_VALUE_f);
    	this.assertI_2(((_castTOint)(d)), (0));
    	d = (-java_lang_Double.prototype.MAX_VALUE_f);
    	this.assertI_2(((_castTOint)(d)), (java_lang_Integer.prototype.MIN_VALUE_f));
    	d = (0.0/0.0);
    	this.assertI_2(((_castTOint)(d)), (0));
    	d = (1.0 / 0.0);
    	this.assertB_1((d == java_lang_Double.prototype.POSITIVE_INFINITY_f));
    	this.assertI_2(((_castTOint)(d)), (java_lang_Integer.prototype.MAX_VALUE_f));
    	d = (-1.0 / 0.0);
    	this.assertB_1((d == java_lang_Double.prototype.NEGATIVE_INFINITY_f));
    	this.assertI_2(((_castTOint)(d)), (java_lang_Integer.prototype.MIN_VALUE_f));
    	d = (0.0 / 0.0);
    	this.assertI_2(((_castTOint)(d)), (0));
    	this.assertI_2(((_castTOint)(0.1)), (0));
    	this.assertI_2(((_castTOint)(17.9)), (17));
    	this.assertI_2(((_castTOint)(1.4)), (1));
    	this.assertI_2(((_castTOint)(1.7)), (1));
    	this.assertI_2(((_castTOint)(-1.7)), (-1));
    	this.assertI_2(((_castTOint)(-1.99)), (-1));
    	this.assertI_2(((_castTOint)(-2.0)), (-2));
    },
    
    booleantest_0:function() {
    	java_lang_System.prototype.out_f.println_1(("- boolean"));
    	
    	var  t = ((new java_lang_Boolean)._1((true)));
    	var  f = ((new java_lang_Boolean)._1((false)));
    	var  f2 = ((new java_lang_Boolean)._1((false)));
    	
    	this.assertB_1((t.equals_1((java_lang_Boolean.prototype.TRUE_f))));
    	this.assertB_1((!t.equals_1(("TRUE"))));
    	this.assertB_1((!t.equals_1(("true"))));
    	this.assertB_1((!t.equals_1((null))));
    	this.assertB_1((f.equals_1((f2))));
    	this.assertB_2((f == f2), (false));
    	this.assertB_2((t.booleanValue_0()), (true));
    	this.assertB_2((f.booleanValue_0()), (false));
    	this.assertO_2((t.toString_0()), ("true"));
    	this.assertO_2((f.toString_0()), ("false"));    	
    	this.assertO_2((java_lang_Boolean.prototype.toString_1((false))), ("false"));
    	this.assertB_1((java_lang_Boolean.prototype.valueOf_1((true)) == java_lang_Boolean.prototype.TRUE_f));
    	this.assertB_1((java_lang_Boolean.prototype.valueOf_1((false)) == java_lang_Boolean.prototype.FALSE_f));
    	this.assertI_2((t.hashCode_0()), (1231));
    	this.assertI_2((f.hashCode_0()), (1237));
    },

    bytetest_0:function() {
    	java_lang_System.prototype.out_f.println_1(("- byte"));
    	
    	this.assertI_2((java_lang_Byte.prototype.MIN_VALUE_f), (-128));
    	this.assertI_2((java_lang_Byte.prototype.MAX_VALUE_f), (127));
    	var  b = ((new java_lang_Byte)._1(((_castTObyte) (5))));
    	var  b2 = ((new java_lang_Byte)._1(((_castTObyte) (7))));
    	var  b3 = (java_lang_Byte.prototype.valueOf_1(((_castTObyte)(5))));
    	
    	this.assertB_1((! b.equals_1(("5"))));
    	this.assertB_1((! b.equals_1((b2))));
    	this.assertB_1((b.equals_1((b3))));
    	this.assertB_1((!b.equals_1((null))));
    	this.assertB_2((b == b3), (false));
    	this.assertI_2((b.byteValue_0()), (5));
    	this.assertO_2((b.toString_0()), ("5"));
    	this.assertO_2((java_lang_Byte.prototype.toString_1(((_castTObyte)(6)))), ("6"));    	
    	this.assertO_2((java_lang_Byte.prototype.toString_1(((_castTObyte)(-36)))), ("-36"));    	
    	this.assertI_2((b.hashCode_0()), (5));
    	this.assertI_2((b2.hashCode_0()), (7));
    	this.assertI_2((java_lang_Byte.prototype.valueOf_1(((_castTObyte)(-44))).hashCode_0()),(-44));
    },
    
    charactertest_0:function()
    {
    	java_lang_System.prototype.out_f.println_1(("- character"));
    	
    	this.assertI_2((java_lang_Character.prototype.MIN_VALUE_f), (0));
    	this.assertI_2((java_lang_Character.prototype.MAX_VALUE_f), (0xffff));
    	var  c = ((new java_lang_Character)._1((65)));
    	var  c2 = ((new java_lang_Character)._1((64)));
    	var  c3 = (java_lang_Character.prototype.valueOf_1(((_castTOchar)(65))));
    	
    	this.assertB_1((! c.equals_1(("A"))));
    	this.assertB_1((! c.equals_1((c2))));
    	this.assertB_1((! c.equals_1((null))));
    	this.assertB_1((c.equals_1((c3))));
    	this.assertB_2((c == c3), (false));
    	this.assertI_2((c.charValue_0()), (65));
    	this.assertO_2((c.toString_0()), ("A"));
    	
    	this.assertO_2((java_lang_Character.prototype.toString_1((80))), ("P"));    	
    	this.assertO_2((java_lang_Character.prototype.toString_1(((_castTOchar)(0x99)))), (""));
    	this.assertI_2((c.hashCode_0()), (65));
    	this.assertI_2((c2.hashCode_0()), (64));
    },

    
    doubletest_0:function() {
    	java_lang_System.prototype.out_f.println_1(("- double"));
    	
    	this.assertD_2((java_lang_Double.prototype.MIN_VALUE_f), (4.9E-324));
    	this.assertD_2((java_lang_Double.prototype.MAX_VALUE_f), (1.7976931348623157E308));
    	var  d = ((new java_lang_Double)._1((5)));
    	var  d2 = ((new java_lang_Double)._1((7)));
    	var  d3 = (java_lang_Double.prototype.valueOf_1((5.00)));
    	
    	this.assertB_1((! d.equals_1((d2))));
    	this.assertB_1((! d.equals_1(("5.0"))));
    	this.assertB_1((! d.equals_1(("5"))));
    	this.assertB_1((! d.equals_1((null))));
    	this.assertB_1((d.equals_1((d3))));
    	this.assertB_2((d == d3), (false));
    	this.assertD_2((d.doubleValue_0()), (5));
    	this.assertO_2((d.toString_0()), ("5.0"));
    	this.assertO_2((d + "x"), ("5.0x"));
    	this.assertO_2((java_lang_Double.prototype.toString_1(((_castTObyte)(6)))), ("6.0"));    	
    	this.assertO_2((java_lang_Double.prototype.toString_1(((_castTObyte)(-36)))), ("-36.0"));   
    	this.assertO_2(("x"+java_lang_Double.prototype.toString_1((6.5))+"y"), ("x6.5y"));
    	this.assertO_2(("x"+java_lang_Double.prototype.toString_1((2.0))+"y"), ("x2.0y"));
    },
        
    integertest_0:function()
    {
    	java_lang_System.prototype.out_f.println_1(("- integer"));
    	
    	this.assertI_2((java_lang_Integer.prototype.MIN_VALUE_f), (-2147483648));
    	this.assertI_2((java_lang_Integer.prototype.MAX_VALUE_f), (2147483647));
    	var  i = ((new java_lang_Integer)._1( (5)));
    	var  i2 = ((new java_lang_Integer)._1( (7)));
    	var  i3 = (java_lang_Integer.prototype.valueOf_1( (5)));
    	
    	this.assertB_1((! i.equals_1(("5"))));
    	this.assertB_1((! i.equals_1((i2))));
    	this.assertB_1((! i.equals_1((null))));
    	this.assertB_1((i.equals_1((i3))));
    	this.assertB_2((i == i3), (false));
    	this.assertI_2((i.intValue_0()), (5));
    	this.assertO_2((i.toString_0()), ("5"));
    	
    	this.assertO_2((java_lang_Integer.prototype.toString_1((2346))), ("2346"));    	
    	this.assertO_2((java_lang_Integer.prototype.toString_1((-46))), ("-46"));    	 	
    	this.assertI_2((i.hashCode_0()), (5));
    	
    	this.assertI_2((java_lang_Integer.prototype.valueOf_1((-23523523)).hashCode_0()), (-23523523));
    },
    

    mathtest_0:function() {
    	java_lang_System.prototype.out_f.println_1(("- math"));
    	
    	this.assertApproximately_2((java_lang_Math.prototype.E_f), (2.718281828459045)); 
        this.assertApproximately_2((java_lang_Math.prototype.PI_f), (3.141592653589793));    	
        this.assertD_2((java_lang_Math.prototype.abs_1((-0.5))),(0.5));
        this.assertD_2((java_lang_Math.prototype.acos_1((1))), (0.0));
        this.assertApproximately_2((java_lang_Math.prototype.asin_1((0.5))), (0.5235987755982989));
        this.assertApproximately_2((java_lang_Math.prototype.atan_1((1))), (java_lang_Math.prototype.PI_f/4.0));
        this.assertApproximately_2((java_lang_Math.prototype.atan2_2((1.0),(1.0))), (java_lang_Math.prototype.PI_f/4.0));
        this.assertD_2((java_lang_Math.prototype.ceil_1((0.5))), (1.0));
        this.assertD_2((java_lang_Math.prototype.cos_1((0))), (1));
        this.assertD_2((java_lang_Math.prototype.exp_1((0))),(1));
        this.assertD_2((java_lang_Math.prototype.floor_1((0.5))), (0));
        this.assertApproximately_2((java_lang_Math.prototype.log_1((java_lang_Math.prototype.E_f))), (1));
        this.assertD_2((java_lang_Math.prototype.max_2((4),(6))), (6));        
        this.assertD_2((java_lang_Math.prototype.min_2((124),(5))), (5));        
        this.assertD_2((java_lang_Math.prototype.pow_2((2),(3))), (8));
        this.assertI_2(((_castTOint)(java_lang_Math.prototype.round_1((6.3)))), (6));
        this.assertI_2(((_castTOint)(java_lang_Math.prototype.round_1((-6.3)))), (-6));
        this.assertI_2(((_castTOint)(java_lang_Math.prototype.round_1((6.5)))), (7));
        this.assertI_2(((_castTOint)(java_lang_Math.prototype.round_1((-6.5)))), (-6));
        this.assertI_2(((_castTOint)(java_lang_Math.prototype.round_1((5.5)))), (6));
        this.assertI_2(((_castTOint)(java_lang_Math.prototype.round_1((-5.5)))), (-5));
        this.assertD_2((java_lang_Math.prototype.rint_1((6.3))), (6.0));
        this.assertD_2((java_lang_Math.prototype.rint_1((-16.3))), (-16.0));
        this.assertD_2((java_lang_Math.prototype.rint_1((-16.5))), (-16.0));
        this.assertD_2((java_lang_Math.prototype.rint_1((16.5))), (16.0));
        this.assertD_2((java_lang_Math.prototype.rint_1((-17.5))), (-18.0));
        this.assertD_2((java_lang_Math.prototype.rint_1((17.5))), (18.0));
        this.assertApproximately_2((java_lang_Math.prototype.sin_1((java_lang_Math.prototype.PI_f/2.0))), (1));
        this.assertD_2((java_lang_Math.prototype.sqrt_1((4))),(2));
        this.assertApproximately_2((java_lang_Math.prototype.tan_1((java_lang_Math.prototype.PI_f/4.0))), (1));
        this.assertD_2((java_lang_Math.prototype.log10_1((100))),(2));
    },
    
    objecttest_0:function() {
    	java_lang_System.prototype.out_f.println_1 (("- object"));
    	var  o = ((new java_lang_Object)._0());
    	var  o2 = ((new java_lang_Object)._0());
    	this.assertB_1((o.toString_0().startsWith_1(("java.lang.Object"))));
    	
    	this.assertB_1( (! o.equals_1((o2))));
    	this.assertB_1((o.equals_1((o))));
    },
    
    
    stringtest_0:function() {  
    	java_lang_System.prototype.out_f.println_1 (("- string"));
    	
        var  a = (com_greentube_convertertest_StaticClass.prototype.hello_0());
        this.assertO_2((a),("hello"));
        a = ("" + a + " you");             // string building with + 
        a = (a + " " + 4711);              // add a number to a string
        this.assertO_2((a),("hello you 4711"));
        a = ("some " + 44 + " more " + (((new java_lang_Integer)._1((88)))) + " concats " + (new com_greentube_convertertest_TestParent)._1((3)));
        this.assertO_2((a), ("some 44 more 88 concats TestParent3"));
        this.assertO_2 ((44 - 33 + "hi"), ("11hi"));
        this.assertO_2 ((44 + "" + 33 + "hi"), ("4433hi"));
        this.assertO_2 (("" + 44 + 33 + "hi"), ("4433hi"));
        // some special characters
        a = (("üäö "+String.fromCharCode(8364)+" \x00\x03\x07"));
        this.assertI_2 (((_castTOint) (a.charAt_1((0)))), (252));
        this.assertI_2 (((_castTOint) (a.charAt_1((1)))), (228));
        this.assertI_2 (((_castTOint) (a.charAt_1((2)))), (246));
        this.assertI_2 (((_castTOint) (a.charAt_1((3)))), (32));
        this.assertI_2 (((_castTOint) (a.charAt_1((4)))), (8364));
        this.assertI_2 (((_castTOint) (a.charAt_1((5)))), (32));
        this.assertI_2 (((_castTOint) (a.charAt_1((6)))), (0));
        this.assertI_2 (((_castTOint) (a.charAt_1((7)))), (3));
        this.assertI_2 (((_castTOint) (a.charAt_1((8)))), (7));
        
        // construct strings from characters 
        var  raw = [ (65), (109), (101), (108), (105), (101) ];   
        var  sr = (_newString());
        this.assertO_2( (sr), (""));
        sr = (_newString((raw)));
        this.assertO_2( (sr), ("Amelie"));
        sr = (_newString((raw),(1),(3)));
        this.assertO_2( (sr), ("mel"));
        
        // various string operations
        a = ("The test string to do some nonesense");
        
        this.assertI_2( (a.charAt_1((0))), (84) );

        this.assertI_2( (a.compareTo_1((a))), (0));
        this.assertB_1( (a.compareTo_1(("other")) < 0));
        this.assertB_1( (a.compareTo_1(("Axx")) > 0));
        
        this.assertO_2( (a.concat_1((" extra"))), ("The test string to do some nonesense extra"));

        this.assertB_1( (a.endsWith_1(("nonesense"))));
        this.assertB_1((! a.endsWith_1(("xxx"))));

        this.assertB_1( (a.equals_1((a + ""))));
        this.assertB_1((! a.equals_1((null))));
        this.assertB_1(("TestParent3".equals_1(((new com_greentube_convertertest_TestParent)._1((3)).toString_0()))));
        this.assertB_1((!"TestParent3".equals_1(((new java_lang_Integer)._1((5))))));
        
        this.assertI_2((a.hashCode_0()), (486025514));
        this.assertI_2(("nothing useful".hashCode_0()), (-1885956535));
        
        this.assertI_2( (a.indexOf_1((116))), (4));
        this.assertI_2( (a.indexOf_1((113))), (-1));
        this.assertI_2( (a.indexOf_2((116), (8))), (10));
        this.assertI_2( (a.indexOf_2((113), (20))), (-1));
        this.assertI_2 ((a.indexOf_1(("test"))), (4));
        this.assertI_2 ((a.indexOf_1(("unknown"))), (-1));
        
        this.assertB_1( ("".isEmpty_0()) );
        this.assertB_1( ("     ".trim_0().isEmpty_0()));
        
        this.assertI_2 ((a.lastIndexOf_1((113))), (-1));
        this.assertI_2 ((a.lastIndexOf_2((113),(10))), (-1));
        this.assertI_2 ((a.lastIndexOf_1((116))), (16));
        this.assertI_2 ((a.lastIndexOf_2((116),(6))), (4));

        this.assertI_2 ((a.length_0()), (36));
        this.assertI_2 (("".length_0()), (0));
        
        this.assertO_2 ((a.replace_2((116), (113))), ("The qesq sqring qo do some nonesense"));
        this.assertO_2 (("".replace_2((32),(120))), (""));

        this.assertB_1 ((a.startsWith_1(("The te"))));
        this.assertB_1 ((a.startsWith_1((""))));
        this.assertB_1 ((!a.startsWith_1(("The x"))));
        this.assertB_1 ((!a.startsWith_1(("Y"))));
        
        this.assertO_2 ((a.substring_1((0))), (a));
        this.assertO_2 ((a.substring_1((33))), ("nse"));
        
        this.assertO_2 ((a.substring_2((0),(4))), ("The "));
        this.assertO_2 ((a.substring_2((6),(10))), ("st s"));
        this.assertO_2 ((a.substring_2((30),(36))), ("esense"));
        
        var  ca = (a.toCharArray_0());
        this.assertI_2 ((ca.length_f), (36));
        this.assertI_2 ((ca[(2)]), (101));
        this.assertI_2 ((ca[(34)]), (115));
        
        this.assertO_2 ((a.toString_0()), (a));
        
        this.assertO_2 ((a.trim_0()), (a));
        this.assertO_2 (("  loo".trim_0()), ("loo"));
        this.assertO_2 (("\x0a\x09YY\x09".trim_0()), ("YY"));
        
        this.assertB_1 ((!a.equals_1((null))));
        
        var  xx = ((""+String.fromCharCode(55457)+""+String.fromCharCode(59009)+""));
        this.assertI_2((xx.charAt_1((0))), (55457));
        this.assertI_2((xx.charAt_1((1))), (59009));
    },

    systemtest_0:function() {
    	java_lang_System.prototype.out_f.println_1(("- system"));
    	
    	var  a = [ (3),(7),(9),(5) ];
    	var  b = (_createArray((10),0));
    	java_lang_System.prototype.arraycopy_5((a),(0), (b),(2), (3));
    	this.assertI_2((b[(0)]), (0));
    	this.assertI_2((b[(1)]), (0));
    	this.assertI_2((b[(2)]), (3));
    	this.assertI_2((b[(3)]), (7));
    	this.assertI_2((b[(4)]), (9));
    	this.assertI_2((b[(5)]), (0));
    	java_lang_System.prototype.arraycopy_5((b), (2), (b), (3), (3));
    	this.assertI_2((b[(0)]), (0));
    	this.assertI_2((b[(1)]), (0));
    	this.assertI_2((b[(2)]), (3));
    	this.assertI_2((b[(3)]), (3));
    	this.assertI_2((b[(4)]), (7));
    	this.assertI_2((b[(5)]), (9));
    	this.assertI_2((b[(6)]), (0));
    	
    	var  o = ([ (null), ("hi"), ("no"), ("yes") ]);
    	var  o2 = (_createArray((5),null));
    	java_lang_System.prototype.arraycopy_5((o),(1), (o2),(0),(2));
    	this.assertO_2((o2[(0)]), ("hi"));
    	this.assertO_2((o2[(1)]), ("no"));
    	this.assertO_2((o2[(2)]), (null));
    },
    
    stringbuffertest_0:function()
    {
    	java_lang_System.prototype.out_f.println_1(("- stringbuffer"));
    	var  b = ((new java_lang_StringBuffer)._0());
    	b.append_1(("small"));
    	this.assertI_2((b.length_0()), (5));
    	this.assertO_2((b.toString_0()), ("small"));
    	
    	b = ((new java_lang_StringBuffer)._1(("larger")));
    	b.append_1(("text"));
    	b.append_1(((new java_lang_Integer)._1((5))));
    	this.assertI_2((b.length_0()), (11));
    	this.assertO_2((b.toString_0()), ("largertext5"));
    	
    	this.assertB_1((!b.equals_1(("largettext5"))));
    	this.assertB_1((!b.equals_1((null))));
    	this.assertB_1((! (((new java_lang_StringBuffer)._0())).equals_1(((new java_lang_StringBuffer)._0()))));
    	this.assertB_1((b.equals_1((b))));
    	
    	var  c = ((new java_lang_StringBuffer)._0());
    	c.append_1((b.toString_0()));
    	this.assertB_1((!b.equals_1((c))));
    	
    	c = ((new java_lang_StringBuffer)._0()); 
    	c.append_1((java_lang_Character.prototype.valueOf_1((33))));
    	c.append_1(("no"));
    	c.append_1((47));
    	c.append_1(("yes"));
    	c.append_1((66.7));
    	c.append_1((java_lang_Character.prototype.valueOf_1((63))));
    	c.append_1((-66555.7423));
    	c.append_1((null));
    	this.assertO_2((c.toString_0()),("!no47yes66.7?-66555.7423null"));
    },
    
    stringbuildertest_0:function()
    {
    	java_lang_System.prototype.out_f.println_1(("- stringbuilder"));
    	var  b = ((new java_lang_StringBuilder)._0());
    	b.append_1(("V"));
    	b.append_1((8));
    	this.assertI_2((b.length_0()), (2));
    	this.assertO_2((b.toString_0()), ("V8"));
    	b.append_1((null));
    	b.append_1((66));
    	b.append_1((null));    	
    	this.assertO_2((b.toString_0()), ("V8null66null"));
    	
    	
    	b = ((new java_lang_StringBuilder)._1(("init")));
    	b.append_1(((new java_lang_Integer)._1((5))));
    	b.append_1((1));
    	this.assertO_2((b.toString_0()), ("init51"));
    	
    	this.assertB_1((!b.equals_1(("init51"))));
    	this.assertB_1((!b.equals_1((null))));
    	this.assertB_1((! (((new java_lang_StringBuilder)._0())).equals_1(((new java_lang_StringBuilder)._0()))));
    	this.assertB_1((b.equals_1((b))));
    	
    	var  c = ((new java_lang_StringBuilder)._0());
    	c.append_1((b.toString_0()));
    	this.assertB_1((!b.equals_1((c))));
    	this.assertB_1((b.toString_0().equals_1((c.toString_0()))));    	    
    },
    
    vectortest_0:function() {
    	java_lang_System.prototype.out_f.println_1(("- vector"));
    	
        var  v;
        v = ((new java_util_Vector)._0());
        var  v2 = ((new java_util_Vector)._0());
        this.assertO_2((v.toString_0()),("[]"));
        this.assertO_2((v),(v2));        
        v.add_1 (("homer"));
        v.add_1 (("marge"));
        v.add_1 (("bart"));
        v.add_1 (("lisa"));
        v.add_1 (("meggy"));        
        v2.addElement_1 (("homer"));
        v2.addElement_1 (("marge"));
        v2.add_1 (("bart"));
        v2.add_1 (("megg!"));
        v2.add_2 ((3), ("lisa"));
        this.assertO_2((v.toString_0()),("[homer, marge, bart, lisa, meggy]"));        
        this.assertO_2((v2.toString_0()),("[homer, marge, bart, lisa, megg!]"));        
        this.assertB_1((! v.equals_1((v2))));        
        this.assertI_2((v.size_0()), (5));
        this.assertI_2((v2.size_0()), (5));
        
        var  c = ( v.clone_0());
        this.assertI_2((c.size_0()), (5));
        
        c.clear_0();		// must no affect original vector!
        this.assertI_2((c.size_0()), (0));
        
        this.assertB_1 ( (v.contains_1(("lisa"))));
        this.assertB_1 ((! v.contains_1(("mr.burns"))));
        
        var  a = (_createArray((5),null));
        v.copyInto_1((a));
        this.assertO_2((a[(1)]), ("marge"));
        this.assertO_2((a[(4)]), ("meggy"));
        
        this.assertO_2((v.elementAt_1((3))), ("lisa"));
        
        this.assertB_1((v.equals_1((v))));
        this.assertB_1((v.equals_1((v.clone_0()))));
        this.assertB_1((v != v.clone_0()));
        this.assertB_1((!v.equals_1(("hi"))));
        this.assertB_1((!v.equals_1((null))));
        
        this.assertO_2((v.firstElement_0()), ("homer"));

        this.assertO_2((v.get_1((3))), ("lisa"));

        this.assertI_2((v.indexOf_1(("bart"))), (2));
        this.assertI_2((v.indexOf_1(("mr.burns"))), (-1));
        this.assertI_2((v.indexOf_2(("lisa"), (2))), (3));
        this.assertI_2((v.indexOf_2(("lisa"), (4))), (-1));
       
        c = ( v.clone_0());
        c.insertElementAt_2(("ruprecht"), (2));
        this.assertO_2((c.toString_0()),("[homer, marge, ruprecht, bart, lisa, meggy]"));        
        
        this.assertB_1((!c.isEmpty_0()));
        c.clear_0();
        this.assertB_1((c.isEmpty_0()));
        
        this.assertO_2((v.toString_0()),("[homer, marge, bart, lisa, meggy]"));
        this.assertO_2((v.lastElement_0()), ("meggy"));        
        this.assertI_2((v.lastIndexOf_1(("bart"))), (2));
        this.assertI_2((v.lastIndexOf_2(("bart"),(2))), (2));
        this.assertI_2((v.lastIndexOf_2(("bart"),(1))), (-1));
        
        c = ( v.clone_0());
        c.removeAllElements_0();
        this.assertI_2((c.size_0()), (0));
        this.assertO_2((c.toString_0()), ("[]"));
        
        c = ( v.clone_0());
        c.removeElement_1(("homer"));
        c.removeElement_1(("bart"));
        this.assertO_2((c.toString_0()), ("[marge, lisa, meggy]"));
        
        c = ( v.clone_0());
        c.removeElementAt_1((2));
        c.removeElementAt_1((1));
        this.assertO_2((c.toString_0()), ("[homer, lisa, meggy]"));
        
        c = ( v.clone_0());
        c.set_2((3), ("LISA"));
        this.assertO_2((c.toString_0()), ("[homer, marge, bart, LISA, meggy]"));
        
        var  en = (c.elements_0());
        this.assertB_1((en.hasMoreElements_0()));
        this.assertO_2((en.nextElement_0()),("homer"));
        this.assertO_2((en.nextElement_0()),("marge"));
        this.assertO_2((en.nextElement_0()),("bart"));
        this.assertB_1((en.hasMoreElements_0()));
        this.assertO_2((en.nextElement_0()),("LISA"));
        this.assertO_2((en.nextElement_0()),("meggy"));
        this.assertB_1((!en.hasMoreElements_0()));
        
        c.setSize_1((0));
        this.assertI_2((c.size_0()), (0));
        
        a = (v.toArray_0());
        this.assertI_2((a.length_f), (5));
        this.assertO_2((a[(0)]), ("homer"));
        this.assertO_2((a[(4)]), ("meggy"));
        
        v = ((new java_util_Vector)._0());
        v.add_1(((new java_lang_Integer)._1((4))));
        v.add_1(("nixi"));
        v.add_1((_createArray((2),0)));
        this.assertB_1((v.toString_0().startsWith_1(("[4, nixi, ["))));
        this.assertB_1((!v.equals_1((null))));
    },
    
    hashtabletest_0:function() {
    	java_lang_System.prototype.out_f.println_1(("- hashtable"));
    	
    	var  ht = ((new java_util_Hashtable)._0());
    	ht.put_2(("Test"), ((new java_lang_Integer)._1((1))));
    	ht.put_2(("Test2"), ((new java_lang_Integer)._1((2))));
    	
    	this.assertI_2((ht.size_0()), (2));
    	this.assertB_1((!ht.isEmpty_0()));
    	this.assertB_1((ht.containsKey_1(("Test"))));
    	this.assertO_2((ht.get_1(("Test"))), ((new java_lang_Integer)._1((1))));
    	
    	ht.put_2(("Test"), ((new java_lang_Integer)._1((3))));
    	this.assertO_2((ht.get_1(("Test"))), ((new java_lang_Integer)._1((3))));
    	    	
    	var  cl = ( ht.clone_0());
    	this.assertI_2((cl.size_0()), (2));
    	this.assertB_1((! ((cl==ht))));
    	this.assertB_1((cl.equals_1((ht))));
    	this.assertB_1((!ht.equals_1(((new java_util_Hashtable)._0()))));
    	this.assertB_1((!ht.equals_1(("dummy"))));
    	
    	ht.remove_1(("Test2"));
    	this.assertI_2((ht.size_0()), (1));
    	this.assertB_1((ht.containsKey_1(("Test"))));
    	this.assertB_1((!ht.containsKey_1(("Test2"))));
    	this.assertB_1((cl.containsKey_1(("Test2")))); // the clone was not modified
    	
    	ht.clear_0();
    	this.assertI_2((ht.size_0()), (0));
    	this.assertB_1((ht.isEmpty_0()));
    	this.assertB_1((! ht.containsKey_1(("Test"))));
    	
    	ht.put_2(("A"),  ("something"));
    	ht.put_2(("B"),  ("some other"));
    	ht.put_2(("C"),  ("more text"));
    	ht.put_2(("D"),  ((new java_lang_Integer)._1((99))));
    	ht.put_2(("E"),  (_createArray((2),0)) );
    	java_lang_System.prototype.out_f.println_1(("  Hashtable representation: "+ht.toString_0()));
    	
    	var  ht2 = ((new java_util_Hashtable)._0());
    	var  e = (ht.keys_0());
    	while ((e.hasMoreElements_0()))
    	{	var  k = ( e.nextElement_0());
    		ht2.put_2((k), (ht.get_1((k))));    		
    	}
    	this.assertB_1((ht.equals_1((ht2))));
    	this.assertB_1((!ht.equals_1((null))));
    	
    	e = (ht.elements_0());
    	var  ev = ((new java_util_Vector)._0());
    	while ((e.hasMoreElements_0()))
    	{	ev.add_1((e.nextElement_0()));
    	}
    	this.assertI_2((ev.size_0()), (5));
    	this.assertB_1((ev.contains_1((ht.get_1(("A"))))));
    	this.assertB_1((ev.contains_1((ht.get_1(("B"))))));
    	this.assertB_1((ev.contains_1((ht.get_1(("C"))))));
    	this.assertB_1((ev.contains_1((ht.get_1(("D"))))));
    	this.assertB_1((ev.contains_1((ht.get_1(("E"))))));
    },

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

    secondaryclassestest_0:function() 
    {
    	java_lang_System.prototype.out_f.println_1(("- secondary classes"));
    	
    	var  s = ((new com_greentube_convertertest_SecondaryClasses)._0());
    	this.assertO_2((s.testrun_0()), ("x=99|sx=99|s2=98|ss2=98|s3=97|ss3=97"));
    	this.assertO_2((com_greentube_convertertest_SecondaryClasses.prototype.statictestrun_0()), ("sx=99|ss2=98|ss3=97"));    	    
    },        

    complexoperationtest_0:function()
    {
    	java_lang_System.prototype.out_f.println_1(("- complex operation"));
    	
    	this.assertO_2((com_greentube_convertertest_StaticClass.prototype.md5_1(
   			(com_greentube_convertertest_StaticClass.prototype.stringToBytes_1(("some and more words, with #special# characters")))
   			)),    	
   			("835670bed386ef2f3badbace8c8992eb")
		);    	
    },
       
    
    
    assertI_2:function(value, expected) {
    	if ((value!=expected)) {
    		java_lang_System.prototype.err_f.println_1(("Received "+value+" instead of "+expected));
    	}
    },
    assertO_2:function(value, expected) {
    	if ((value!=expected)) {
    		if ((value!=null && expected!=null && value.equals_1((expected)))) {
    			// this counts as equal 
    		}
    		else {
    			java_lang_System.prototype.err_f.println_1(("Received "+value+" instead of "+expected));
    		}    		
    	}
    },
    assertB_2:function(value, expected)
    {
    	if ((value!=expected)) {
    		java_lang_System.prototype.err_f.println_1(("Received "+value+" instead of "+expected));
    	}
    },
    
    assertB_1:function(b)
    {
    	if ((!b)) {
    		java_lang_System.prototype.err_f.println_1(("Check failed"));
    	}
    },

    assertD_2:function(value, expected)
    {
    	if ((value!=expected)) {
    		java_lang_System.prototype.err_f.println_1(("Received "+value+" instead of "+expected));
    	}
    },
    assertApproximately_2:function(value, expected)
    {
    	if ((value<expected-0.00000000001) || (value>expected+0.00000000001)) {
    		java_lang_System.prototype.err_f.println_1(("Received "+value+" instead of "+expected));
    	}
    },
    
    assertBA_2:function(value, expected)
    {
    	if ((value.length_f != expected.length_f)) {
    		java_lang_System.prototype.err_f.println_1(("Received "+value.length_f+" bytes instead of "+expected.length_f));  
    		return;
    	}
    	for (var  i=(0); (i<value.length_f); i++) {
    		this.assertI_2((value[(i)]),(expected[(i)]));
    	}
    },
    
    assertSA_2:function(value, expected) 
    {
    	if ((value.length_f != expected.length_f)) {
    		java_lang_System.prototype.err_f.println_1(("Received "+value.length_f+" strings instead of "+expected.length_f));  
    		return;
    	}
    	for (var  i=(0); (i<value.length_f); i++) {
    		this.assertO_2((value[(i)]),(expected[(i)]));
    	}
    }
    
},"com_greentube_convertertest_Test",[]);
com_greentube_convertertest_Test.prototype.staticint_f = (4);
com_greentube_convertertest_Test.prototype.staticint99_f = (99);
com_greentube_convertertest_Test.prototype.static1_f=0, com_greentube_convertertest_Test.prototype.static2_f=0;




//reference// java/util/Vector
//reference// java/lang/System
//reference// java/lang/Byte
//reference// java/lang/Character
//reference// com/greentube/convertertest/TestParent
//reference// com/greentube/convertertest/StaticClass
//reference// java/lang/Integer
//reference// java/lang/Math
//reference// com/greentube/convertertest/TestInterface
//reference// java/lang/Double
//reference// java/lang/StringBuilder
//reference// java/lang/Runnable
//reference// com/greentube/convertertest/SecondaryClasses
//reference// com/greentube/convertertest/TestParentIntermediate
//reference// java/lang/Enum
//reference// com/greentube/convertertest2/TestInterface2
//reference// com/greentube/convertertest/ClassWithNoToString
//reference// com/greentube/convertertest/DummyClass
//reference// java/lang/StringBuffer
//reference// java/util/Hashtable
//reference// com/greentube/convertertest/TestObject
//reference// com/greentube/convertertest2/TestInterfaceX
//reference// java/lang/Object
//reference// java/lang/Iterable
//reference// java/lang/String
//reference// com/greentube/convertertest2/TestObject2
//reference// java/util/Enumeration
//reference// java/lang/Boolean
//load// java/lang/Object
var java_lang_Byte = _extendClass( java_lang_Object, {
	_1: function(b) {
		this.b_f = b;
        return this;
    },
	byteValue_0: function() {
		return this.b_f;
	},
    equals_1: function(b) {
        if (b!=null && b._is_java_lang_Byte && this.b_f == b.b_f) {
            return true;
        }
        return false;
    },
    hashCode_0: function() {
        return this.b_f;
    },
	toString_0: function() {
		return this.b_f.toString();
    },    
    
    toString_1: function (b) {
        return b.toString();
    },
    valueOf_1: function (b) {
        return (new java_lang_Byte())._1(b);
    },    
    
},"java_lang_Byte", null);


java_lang_Byte.prototype.MIN_VALUE_f = -128;
java_lang_Byte.prototype.MAX_VALUE_f = 127;
//load// java/lang/Object
var java_lang_Character = _extendClass( java_lang_Object, {
	_1: function(c) {
		this.c_f = c;
        return this;
    },
	charValue_0: function() {
		return this.c_f;
    },
    
    equals_1: function(o) {
        if (o!=null && o._is_java_lang_Character && o.c_f==this.c_f) {
            return true;
        }
        return false;
    },
    hashCode_0: function() {
        return this.c_f;
    },    
    toString_0: function() {
        return String.fromCharCode(this.c_f);
    },
    
    toString_1 : function(c) {
        return String.fromCharCode(c);
    },
    valueOf_1: function(c) {
        return (new java_lang_Character())._1(c);
    },
    
 },"java_lang_Character",  null);
 
 
java_lang_Character.prototype.MAX_VALUE_f = 0xffff;
java_lang_Character.prototype.MIN_VALUE_f = 0;
/*
 * TestParent.java
 *
 * Created on 24. Februar 2005, 08:43
 */







// Parent parent class of java2flash test class to show various features 
// concerning inheritance.

//load// java/lang/Object
var com_greentube_convertertest_TestParent = _extendClass(java_lang_Object,  {
    
    
    
    
    _0: function() {
this.dummyvector=null; 
 java_lang_Object.prototype._0.call(this); 
        this.dummyvector_f = ((new java_util_Vector)._0());
        this.dummyvector_f.addElement_1 (("el:0"));
    return this;},
    _1: function(vectorsize) {
this.dummyvector=null; 
 java_lang_Object.prototype._0.call(this); 
        this.dummyvector_f = (vectorsize>0) ? ((new java_util_Vector)._0()) : (null);
        for (var  i=(0); (i<vectorsize); i++) {
            this.dummyvector_f.addElement_1(("el:"+i));
        }
    return this;},
    
    gimmedummy_0:function() {
        return (null);
    },

    toString_0:function()
    {
    	return ("TestParent"+this.dummyvector_f.size_0());
    },
    
    staticmethod_0:function() {
    	return (88);
    }
    

},"com_greentube_convertertest_TestParent",[]);
com_greentube_convertertest_TestParent.prototype.staticparentattribute_f = (66);


//reference// java/lang/Math
//reference// java/lang/Integer
//reference// java/lang/System
//reference// java/lang/Byte
//reference// java/lang/Boolean
//reference// java/util/Vector
//reference// java/lang/Enum
//reference// java/lang/Object
//reference// java/lang/Character
//reference// java/lang/String
//reference// java/lang/StringBuilder
//reference// java/lang/Double
//reference// java/lang/StringBuffer
//reference// java/lang/Iterable
//reference// java/lang/Runnable
//load// java/lang/Object
var java_lang_Integer = _extendClass( java_lang_Object, {
	_1: function(i) {
		this.i_f = i;
        return this;
    },
	intValue_0: function() {
		return this.i_f;
    },
    
    equals_1: function(i) {
        if (i!=null && i._is_java_lang_Integer && i.i_f==this.i_f) {
            return true;
        }
        return false;
    },
    hashCode_0: function() {
        return this.i_f;
    },    
    toString_0: function() {
        return this.i_f.toString();
    },
    
    toString_1 : function(i) {
        return i.toString();
    },
    valueOf_1: function(i) {
        return (new java_lang_Integer())._1(i);
    },
    
 },"java_lang_Integer",  null);
 
 
java_lang_Integer.prototype.MAX_VALUE_f = 2147483647;
java_lang_Integer.prototype.MIN_VALUE_f = -2147483648;
//load// java/lang/Object
var java_lang_Math = _extendClass( java_lang_Object, {

    abs_1: Math.abs,
    acos_1: Math.acos,
    asin_1: Math.asin,
    atan_1: Math.atan,
    atan2_2: Math.atan2,
    ceil_1: Math.ceil,
    cos_1: Math.cos,
    exp_1: Math.exp,
    floor_1: Math.floor,
    // IEEEremainder: // not supported
    log_1: Math.log,
    max_2: Math.max,
    min_2: Math.min,
    pow_2: Math.pow,
    round_1: Math.round,  // deprecated
    rint_1: function (x) {
        if (x % 0.5 !== 0) {        
            return Math.round(x);
        } else {
            return (Math.floor(x) % 2 === 0) ? Math.floor(x) : Math.round(x);
        }
    },
    sin_1: Math.sin,
    sqrt_1: Math.sqrt,
    tan_1: Math.tan,

    // No native support for log10 in all common browsers yet, workaround returns imprecise result, unlike Java's and e.g. Chrome's log10 implementations.
    log10_1: (typeof Math.log10 === "function") ? Math.log10 :
                function(x) {
                        var result = Math.log(x) * Math.LOG10E;
                        var rounded = Math.round(result);        
                        if(Math.abs(Math.round(result) - (result)) < 0.00000000000001)
                            return rounded;
                        else
                            return result;
                },
                
}, "java_lang_Math", null );


java_lang_Math.prototype.E_f =  2.718281828459045; 
java_lang_Math.prototype.PI_f = 3.141592653589793;
/*
 * TestInterface.java
 *
 * Created on 24. Februar 2005, 13:54
 */




/**
 *
 * @author  reinhard
 */
//load// java/lang/Object
var com_greentube_convertertest_TestInterface = _defineInterface("com_greentube_convertertest_TestInterface",null);

//reference// java/lang/Math
//reference// java/lang/Integer
//reference// java/lang/System
//reference// java/lang/Byte
//reference// java/lang/Boolean
//reference// java/lang/Enum
//reference// java/lang/Object
//reference// java/lang/Character
//reference// java/lang/String
//reference// java/lang/StringBuilder
//reference// java/lang/Double
//reference// java/lang/StringBuffer
//reference// java/lang/Iterable
//reference// java/lang/Runnable
//load// java/lang/Object
var java_lang_Double = _extendClass ( java_lang_Object, {
	_1: function(d) {
		this.d_f = d;
        return this;
    },
    doubleValue_0: function() {
        return this.d_f;
    },
    
    equals_1: function(d) {
        if (d!=null && d._is_java_lang_Double && this.d_f==d.d_f) {
            return true;
        }
        return false;
    },
    
    hashCode_0: function() {
        return Math.round(d_f);
    },

    toString_0: function() {
        var s = this.d_f.toString();
        if (s.indexOf('.')<0) return s+".0";
        return s;
    },
    toString_1: function(d) {
        var s = d.toString();
        if (s.indexOf('.')<0) return s+".0";
        return s;
    },
    valueOf_1: function (d) {
        return (new java_lang_Double())._1(d);
    },

},"java_lang_Double", null);

java_lang_Double.prototype.MIN_VALUE_f = 4.9E-324;
java_lang_Double.prototype.MAX_VALUE_f = 1.7976931348623157E308;
java_lang_Double.prototype.POSITIVE_INFINITY_f = 1.0/0.0;
java_lang_Double.prototype.NEGATIVE_INFINITY_f = -1.0/0.0;

//load// java/lang/Object
var java_lang_Runnable = _defineInterface("java_lang_Runnable", null);

// methods:
// void run()


//load// java/lang/Object
var com_greentube_convertertest_SecondaryClasses = _extendClass(java_lang_Object, 
 {
	
	
	
	
	_0: function() {
this.s2=null; 
this.s3=null; 
 java_lang_Object.prototype._0.call(this); 
		this.s2_f = ((new com_greentube_convertertest_S2)._0());
		this.s3_f = ((new com_greentube_convertertest_S3)._0());		
	return this;},
	
	x_0:function() {
		return ("x="+com_greentube_convertertest_SecondaryClasses.prototype.ssx_f);
	},
	 
	y_0:function() {
		return ("sx="+com_greentube_convertertest_SecondaryClasses.prototype.ssx_f);
	},
	
	testrun_0:function() {
		return (this.x_0()+"|"+this.y_0()+"|"+this.s2_f.x_0()+"|"+com_greentube_convertertest_S2.prototype.y_0()+"|"+this.s3_f.x_0()+"|"+com_greentube_convertertest_S3.prototype.y_0());
	},
	
	statictestrun_0:function() {
		return (this.y_0()+"|"+com_greentube_convertertest_S2.prototype.y_0()+"|"+com_greentube_convertertest_S3.prototype.y_0());		
	}
},"com_greentube_convertertest_SecondaryClasses",[]);
com_greentube_convertertest_SecondaryClasses.prototype.ssx_f = (99);


//load// java/lang/Object
var com_greentube_convertertest_S2 = _extendClass(java_lang_Object,  {	
	

	_0: function() 
	{ java_lang_Object.prototype._0.call(this); return this;},
	x_0:function() {
		return ("s2="+com_greentube_convertertest_S2.prototype.ss2_f);
	},
	y_0:function() {
		return ("ss2="+com_greentube_convertertest_S2.prototype.ss2_f);	
	}
},"com_greentube_convertertest_S2",[]);
com_greentube_convertertest_S2.prototype.ss2_f = (98);


//load// java/lang/Object
var com_greentube_convertertest_S3 = _extendClass(java_lang_Object,  {
	

	_0: function()
	{ java_lang_Object.prototype._0.call(this); 		
	return this;},	
	x_0:function() {
		return ("s3="+com_greentube_convertertest_S3.prototype.ss3_f);
	},
	y_0:function() {
		return ("ss3="+com_greentube_convertertest_S3.prototype.ss3_f);	
	}
},"com_greentube_convertertest_S3",[]);
com_greentube_convertertest_S3.prototype.ss3_f = (97);


//reference// java/lang/Math
//reference// java/lang/Integer
//reference// java/lang/System
//reference// java/lang/Byte
//reference// java/lang/Boolean
//reference// java/lang/Enum
//reference// java/lang/Object
//reference// java/lang/Character
//reference// java/lang/String
//reference// java/lang/StringBuilder
//reference// java/lang/Double
//reference// java/lang/StringBuffer
//reference// java/lang/Iterable
//reference// java/lang/Runnable



//Parent class of java2flash test class to test super super calls

//load// com/greentube/convertertest/TestInterface
//load// com/greentube/convertertest/TestParent
var com_greentube_convertertest_TestParentIntermediate = _extendClass(com_greentube_convertertest_TestParent, {

	_1: function(i) {
		com_greentube_convertertest_TestParent.prototype._1.call(this,(i));
	return this;},

	_0: function() { com_greentube_convertertest_TestParent.prototype._0.call(this); 
	return this;},
	
    add_2:function(a, b)
    {
    	return (a+b);
    },
    hello_0:function()
    {
    	return ("hello");
    }	
	
},"com_greentube_convertertest_TestParentIntermediate",[com_greentube_convertertest_TestInterface]);


//reference// java/lang/Math
//reference// java/lang/Integer
//reference// java/lang/System
//reference// java/lang/Byte
//reference// java/lang/Boolean
//reference// com/greentube/convertertest/TestParent
//reference// java/lang/Enum
//reference// com/greentube/convertertest/TestInterface
//reference// java/lang/Object
//reference// java/lang/Character
//reference// java/lang/String
//reference// java/lang/StringBuilder
//reference// java/lang/Double
//reference// java/lang/StringBuffer
//reference// java/lang/Iterable
//reference// java/lang/Runnable
//load// java/lang/Object
var java_lang_Enum = _extendClass (java_lang_Object, {
	_2: function(name,ordinal) {
        this.name = name;
        this.ordinal = ordinal;
        return this;
    },
    
    hashCode_0 : function() {
        return this.ordinal;
    },
    
    name_0: function() {
        return this.name;
    },
    
    ordinal_0: function() {
        return this.ordinal;
    },
    
    toString_0: function() {
        return this.name_0();
    }
    
 },"java_lang_Enum", null);

 


//load// java/lang/Object
var com_greentube_convertertest_ClassWithNoToString = _extendClass(java_lang_Object,  {
initialConstructor_0: function(){
return java_lang_Object.prototype._0.call(this);
}
	
},"com_greentube_convertertest_ClassWithNoToString",[]);


//reference// java/lang/Math
//reference// java/lang/Integer
//reference// java/lang/System
//reference// java/lang/Byte
//reference// java/lang/Boolean
//reference// java/lang/Enum
//reference// java/lang/Object
//reference// java/lang/Character
//reference// java/lang/String
//reference// java/lang/StringBuilder
//reference// java/lang/Double
//reference// java/lang/StringBuffer
//reference// java/lang/Iterable
//reference// java/lang/Runnable
/*
 * DummyClass.java
 *
 * Created on 09. September 2005, 10:18
 */



/**
 *
 * @author  reinhard
 */
//load// java/lang/Object
var com_greentube_convertertest_DummyClass = _extendClass(java_lang_Object, {
    
    /** Creates a new instance of DummyClass */
    _0: function() { java_lang_Object.prototype._0.call(this); 
    return this;},
    
    /*OVERRIDE*/ toString_0:function() {
        return ("dummy");
    },
    
    secondaryString_0:function()
    {
    	return ((((new com_greentube_convertertest_Secondary)._0())).secondaryString_0());    	
    }
},"com_greentube_convertertest_DummyClass",[]);


//load// java/lang/Object
var com_greentube_convertertest_Secondary = _extendClass(java_lang_Object, {
	
	
	_0: function()
	{
this.s=null; 
 java_lang_Object.prototype._0.call(this); 		
		this.s_f = ("secondary");
	return this;},	
	
	secondaryString_0:function()
	{
		return (this.s_f);
	}
	
},"com_greentube_convertertest_Secondary",[]);

//reference// java/lang/Math
//reference// java/lang/Integer
//reference// java/lang/System
//reference// java/lang/Byte
//reference// java/lang/Boolean
//reference// java/lang/Enum
//reference// java/lang/Object
//reference// java/lang/Character
//reference// java/lang/String
//reference// java/lang/StringBuilder
//reference// java/lang/Double
//reference// java/lang/StringBuffer
//reference// java/lang/Iterable
//reference// java/lang/Runnable



// A test class to test the conversion of various features from java to other languages

//load// com/greentube/convertertest/TestParentIntermediate
var com_greentube_convertertest_TestObject = _extendClass(com_greentube_convertertest_TestParentIntermediate, {
    
    // instance attributes
                      // instance attribute default initializer
                      // instance attribute default initializer

    
    

    // constructors
    _0: function() {
this.somestring=null; 
this.somenumber=0; 
this.moreobject=null; 
this.dummyobject=null; 
                  // construct without parameters
        com_greentube_convertertest_TestParentIntermediate.prototype._0.call(this);                     // constructor calling superconstructor
        this.somenumber_f = (4711);
        this.somestring_f = ("defaulttext");
    return this;},

    _1: function(str) {        // constructor with 1 parametere
        com_greentube_convertertest_TestObject.prototype._2.call(this,(str),(4711));              // calling second constructor of 'this'
    return this;},    
                                    // constructor with 2 parameters
    _2: function(somestring, somenumber) {
this.somestring=null; 
this.somenumber=0; 
this.moreobject=null; 
this.dummyobject=null; 
 
        com_greentube_convertertest_TestParentIntermediate.prototype._1.call (this,(4));                      // constructor calling superconstructor
        this.somestring_f = (somestring);   // local variables shadowing attributes
        this.somenumber_f = (somenumber);
    return this;},
    _3: function(a, b, c)  {
this.somestring=null; 
this.somenumber=0; 
this.moreobject=null; 
this.dummyobject=null; 
 com_greentube_convertertest_TestParentIntermediate.prototype._0.call(this);  
                                        // call default constructor of superclass     
    return this;},
      
    shadowAttributeSum_0:function()
    {
    	var  somenumber = (123);
    	return (this.shadowAttribute_0() + somenumber + this.staticmethod_0());
    },
    shadowAttribute_0:function()
    {
    	return (this.somenumber_f);
    },
    
    accessParentStatic_0:function() {
    	return (this.staticparentattribute_f);
    },
    
    // should not be confused with the shadowAttribute method
    shadowAttribute_1:function(someparameter)
    {
    	return (someparameter);
    }
    
},"com_greentube_convertertest_TestObject",[]);




//reference// java/lang/Math
//reference// java/lang/Integer
//reference// java/lang/System
//reference// java/lang/Byte
//reference// java/lang/Boolean
//reference// java/lang/Enum
//reference// com/greentube/convertertest/TestParentIntermediate
//reference// java/lang/Object
//reference// java/lang/Character
//reference// java/lang/String
//reference// java/lang/StringBuilder
//reference// java/lang/Double
//reference// java/lang/StringBuffer
//reference// java/lang/Iterable
//reference// java/lang/Runnable


//load// java/lang/Object
var com_greentube_convertertest2_TestInterfaceX = _defineInterface("com_greentube_convertertest2_TestInterfaceX",null);

//reference// java/lang/Math
//reference// java/lang/Integer
//reference// java/lang/System
//reference// java/lang/Byte
//reference// java/lang/Boolean
//reference// java/lang/Enum
//reference// java/lang/Object
//reference// java/lang/Character
//reference// java/lang/String
//reference// java/lang/StringBuilder
//reference// java/lang/Double
//reference// java/lang/StringBuffer
//reference// java/lang/Iterable
//reference// java/lang/Runnable


 

//load// com/greentube/convertertest/TestInterface
//load// com/greentube/convertertest2/TestInterfaceX
var com_greentube_convertertest2_TestInterface2 = _defineInterface("com_greentube_convertertest2_TestInterface2",[com_greentube_convertertest_TestInterface,com_greentube_convertertest2_TestInterfaceX]);

//reference// java/lang/Math
//reference// java/lang/Integer
//reference// java/lang/System
//reference// java/lang/Byte
//reference// java/lang/Boolean
//reference// java/lang/Enum
//reference// com/greentube/convertertest/TestInterface
//reference// java/lang/Object
//reference// com/greentube/convertertest2/TestInterfaceX
//reference// java/lang/Character
//reference// java/lang/String
//reference// java/lang/StringBuilder
//reference// java/lang/Double
//reference// java/lang/StringBuffer
//reference// java/lang/Iterable
//reference// java/lang/Runnable
//load// java/lang/Object
var java_lang_Iterable = _defineInterface("java_lang_Iterable", null);

// methods:
// Iterator<T> iterator()

//load// java/lang/Object

// extend the javascript String object by monkey-patching in the necessary
// java methods

String.prototype._is_java_lang_Object = true;
String.prototype._is_java_lang_String = true;



String.prototype.charAt_1 = function(x) {
	return this.charCodeAt(x);
};

String.prototype.compareTo_1 = function (str) {
    return this < str ? -1 : this > str ? 1 : 0;
};

String.prototype.concat_1 = function (str) {
  return this.concat(str);
};

String.prototype.endsWith_1 = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.equals_1 = function(str) {
    if (str==null) return false;
    if (!(str._is_java_lang_String)) return false;  
	return this.valueOf() == str.valueOf();
};

String.prototype.hashCode_0 = function() {
    var h = 0;
    for (var i=0; i<this.length; i++) {
       h = (h*31 + this.charCodeAt(i)) & 0xffffffff;
    }
    return h;
};   

String.prototype.indexOf_1 = function(str) {
	if (str._is_java_lang_String) {
		return this.indexOf(str);
	} else {
		return this.indexOf(String.fromCharCode(str));
	}
};

String.prototype.indexOf_2 = function(str, x) {
	if (str._is_java_lang_String) {
		return this.indexOf(str,x);
	} else {
		return this.indexOf(String.fromCharCode(str),x);
	}
};

String.prototype.isEmpty_0 = function() {
   return this.length_0() === 0;
};   

String.prototype.lastIndexOf_1 = function(str) {
	if (str._is_java_lang_String) {
        return this.lastIndexOf(str);
    } else {
        return this.lastIndexOf(String.fromCharCode(str));
    }
};

String.prototype.lastIndexOf_2 = function(str, x) {
	if (str._is_java_lang_String) {
        return this.lastIndexOf(str, x);
    } else {
        return this.lastIndexOf(String.fromCharCode(str), x);
    }
};

String.prototype.length_0 = function () {
    return this.length;
};

String.prototype.replace_2 = function (oldChar, newChar) {
	var s = String.fromCharCode(oldChar);
	if (s==".") s="\\."; // avoid confusion with regular expression syntax
	return this.replace(new RegExp(s,"g"),String.fromCharCode(newChar));
};

String.prototype.startsWith_1 = function(prefix) {
    return this.indexOf(prefix) === 0;
};

String.prototype.substring_1 = function(start) {
  return this.substring(start);
};

String.prototype.substring_2 = function(start,end) {
  return this.substring(start,end);
};  

String.prototype.toCharArray_0 = function () {
	var chararray = this.split('');
	var i = 0;
	chararray.forEach(function(entry) {
	    chararray[i] = entry.charCodeAt();
	    i++;
	});
	return chararray;
};

String.prototype.toString_0 = function() {
  return this;
};

String.prototype.trim_0 = function() {
  return this.trim();
};



//load// com/greentube/convertertest2/TestInterface2
//load// java/lang/Object
var com_greentube_convertertest2_TestObject2 = _extendClass(java_lang_Object,  {
initialConstructor_0: function(){
return java_lang_Object.prototype._0.call(this);
}, 

    add_2:function(a, b)
    {
    	return (a+b);
    },
    hello_0:function()
    {
    	return ("hello");
    },	
    sub_2:function(a, b)
    {
    	return (a-b);
    }
    
},"com_greentube_convertertest2_TestObject2",[com_greentube_convertertest2_TestInterface2]);


//reference// java/lang/Math
//reference// java/lang/Integer
//reference// com/greentube/convertertest2/TestInterface2
//reference// java/lang/System
//reference// java/lang/Byte
//reference// java/lang/Boolean
//reference// java/lang/Enum
//reference// java/lang/Object
//reference// java/lang/Character
//reference// java/lang/String
//reference// java/lang/StringBuilder
//reference// java/lang/Double
//reference// java/lang/StringBuffer
//reference// java/lang/Iterable
//reference// java/lang/Runnable
//load// java/lang/Object
var java_util_Enumeration = _defineInterface("java_util_Enumeration", null);

// -- methods:
// boolean	hasMoreElements()
// E	nextElement()
//load// java/lang/Object
var java_lang_Boolean = _extendClass (java_lang_Object, {
	_1: function(b) {
		this.b_f = b;
        return this;
    },
	booleanValue_0: function() {
		return this.b_f;
    },
    equals_1: function(b) {
        if (b!=null && b._is_java_lang_Boolean && this.b_f == b.b_f) {
          return true;
        }
        return false;
    },
    hashCode_0: function() {
        return this.b_f ? 1231 : 1237;
    },
    toString_0: function() {
      return this.b_f ? "true" : "false";
    },
    
    toString_1: function(b) {
      return b ? "true" : "false";
    },
    valueOf_1: function(b) {
      return b ? java_lang_Boolean.prototype.TRUE_f : java_lang_Boolean.prototype.FALSE_f;
    },
        
 },"java_lang_Boolean", null);

java_lang_Boolean.prototype.TRUE_f = (new java_lang_Boolean)._1(true);
java_lang_Boolean.prototype.FALSE_f = (new java_lang_Boolean)._1(false);
//load// java/util/Enumeration
//load// java/lang/Object
var java_util_IteratorEnumeration = _extendClass( java_lang_Object, {
    
    _1: function(iterator) {
        this.iterator = iterator;
        return this;
    },
    
    hasMoreElements_0: function() {
        return this.iterator.hasNext_0();
    },
    
    nextElement_0: function() {  
        return this.iterator.next_0();
    },
    
}, "java_util_IteratorEnumeration", [java_util_Enumeration]);


//reference// java/lang/String

//load// java/lang/Object
var java_io_PrintStream = _extendClass (java_lang_Object, {

	_1: function(iserr) {
        this.iserr_f = iserr;
        return this;
    },
    
	println_1: function(obj) {
		if (this.iserr_f) {
            console.warn(obj);
        } else {
            console.log(obj);
        }
    },
    
},"java_io_PrintStream", []);

//complete// java/io/PrintStream
//load// java/lang/Object
var java_lang_System = _extendClass( java_lang_Object, {
    
    arraycopy_5 : function(src, srcPos, dest, destPos, length) {
        if (destPos<=srcPos) {
            for (var i = 0; i < length; i++) {
                dest[i + destPos] = src[i + srcPos];
            }
        } else {
            for (var i = length-1; i >=0; i--) {
                dest[i + destPos] = src[i + srcPos];
            }
        }
    },

    exit_1: function(status) {
    }
        
}, "java_lang_System", null);

java_lang_System.prototype.out_f = (new java_io_PrintStream())._1(false);
java_lang_System.prototype.err_f = (new java_io_PrintStream())._1(true);
//load// java/lang/Object
var java_lang_StringBufferOrBuilder = _extendClass( java_lang_Object, {

    _0: function() {
        this.parts = [];
        return this;
    },
    _1: function(initialvalue) {
        this.parts = [initialvalue];
        return this;
    },
    
    append_1: function(o) {
        this.parts.push(String(o));
        return this;
    },
  
    length_0: function() {
        var length = 0;
        for (var i = 0; i<this.parts.length; i++){
            length += this.parts[i].length;
        }
        return length;
    },
  
    toString_0: function() {
        return this.parts.join("");
    }
      
 },"java_lang_StringBufferOrBuilder", []);
 
//load// java/lang/StringBufferOrBuilder
var java_lang_StringBuilder = _extendClass( java_lang_StringBufferOrBuilder, null, "java_lang_StringBuilder", null);
//load// java/lang/StringBufferOrBuilder
var java_lang_StringBuffer = _extendClass( java_lang_StringBufferOrBuilder, null, "java_lang_StringBuffer", null);
//load// java/lang/Object
var java_util_Iterator = _defineInterface("java_util_Iterator",null);

// -- methods:
// boolean	hasNext()
// E	next()
// void	remove()
//load// java/lang/Object
var java_util_Map = _defineInterface("java_util_Map",null);  

// -- methods:
// void	clear()
// boolean	containsKey(Object key)
// boolean	containsValue(Object value)
// boolean	equals(Object o)
// V	get(Object key)
// int	hashCode()
// boolean	isEmpty()
// Set<K>	keySet()
// V	put(K key, V value)
// void	putAll(Map<? extends K,? extends V> m)
// V	remove(Object key)
// int	size()
// Collection<V>	values()
//load// java/lang/Object
//load// java/util/Map
var java_util_MapImpl = _extendClass( java_lang_Object, {

    // -- methods defined in the List interface
	clear_0: function() {
		this.hashtable = {};
	},
	
	containsKey_1: function(key) {
		return this.hashtable.hasOwnProperty(key);
	},
    
	containsValue_1: function(value) {
		// TODO 
	},
    
//    entrySet_0: function() {
//        
//    },
	
    equals_1: function(h) {
        if (h==null || !h._is_java_util_Map || this.size_0()!=h.size_0()) {
            return false;
        }
        // TODO
        return true;
    },

	get_1: function(key) {
        if (this.hashtable.hasOwnProperty(key)) {
            return this.hashtable[key];
        }
        return null;
	},
    
    hashCode_0: function() {
        // TODO
    },
	
	isEmpty_0: function(){
        return this.size_0() <= 0;
	},

	keySet_0: function() {
        // TODO
    }, 

	put_2: function(key, value) {
		if (key != null && value != null) {
			this.hashtable[key] = value;
		}
	},
    
    putAll_1: function(map) {
        // TODO
    },
	    
	remove_1: function(key) {
        if (this.hashtable.hasOwnProperty(key)) {
            var rtn = this.hashtable[key];
            delete this.hashtable[key];
            return rtn;
        }
        return null;
	},
	
	size_0: function(){
		var size = 0;
		for (var i in this.hashtable) {
			if (this.hashtable.hasOwnProperty(i)) {
				size ++;
            }
		}
		return size;
	},
	
    values_0: function() {
        // TODO
    },
    

    // methods only in HashMap and Hashtable but not in the Map interface
   	_0: function() {
		 this.hashtable = {};
         return this;
	},

   	_1: function(map) {
		 this.hashtable = {};  // TODO - copy data
         return this;
	},
    
	toString_0: function(){
		var result = "";
		for (var k in this.hashtable)	{	  
            if (this.hashtable.hasOwnProperty(k)) {
                if (result.length>1) {
                    result = result + ", ";
                }
                var v = this.hashtable[k];
                if (v==null) {
                    result = result + k + "=null";
                } else {
                    result = result + k + "=" + v.toString_0();
                }
            }
		}
		return "{" + result + "}";
	},
	  
    
},"java_util_MapImpl", [java_util_Map]);


//reference// java/util/IteratorEnumeration
//load// java/lang/Object
//load// java/util/MapImpl
var java_util_Hashtable = _extendClass( java_util_MapImpl, {
    
    // legacy methods only supported by Hashtable, but not the Map interface 
    // everything can be easily implemented by just using the methods of the
    // Map interface
    
    clone_0: function() {
        return (new java_util_Hashtable())._1(this);
    },
    
    contains_1: function(value) {
        return this.containsValue_1(value);
    },
    
    elements_0: function() {
        (new java_util_IteratorEnumeration())._1(this.values_0().iterator_0());
    },
    
	keys_0: function(){
        (new java_util_IteratorEnumeration())._1(this.keySet_0().iterator_0());
	},
       
}, "java_util_Hashtable",  null);

//load// java/lang/Iterable
var java_util_Collection = _defineInterface("java_util_Collection", [java_lang_Iterable]);

// -- methods:
// boolean	contains(Object o)
// boolean	containsAll(Collection<?> c)
// boolean	equals(Object o)
// int	hashCode()
// boolean	isEmpty()
// Iterator<E>	iterator()
// int	size()
// Object[]	toArray()
// <T> T[]	toArray(T[] a)
//load// java/util/Collection
var java_util_List = _defineInterface("java_util_List",[java_util_Collection]);  

// -- methods:
// boolean add(E e)
// void add(int index, E element)
// boolean	addAll(Collection<? extends E> c)
// boolean	addAll(int index, Collection<? extends E> c)
// void	clear()
// boolean	contains(Object o)
// boolean	containsAll(Collection<?> c)
// boolean	equals(Object o)
// E get(int index)
// int	hashCode()
// int	indexOf(Object o)
// boolean	isEmpty()
// Iterator<E>	iterator()
// int	lastIndexOf(Object o)
// E remove(int index)
// boolean	remove(Object o)
// boolean	removeAll(Collection<?> c)
// boolean	retainAll(Collection<?> c)
// E	set(int index, E element)
// int	size()
// Object[]	toArray()
// <T> T[]	toArray(T[] a)
//load// java/util/Iterator
//load// java/lang/Object
//load// java/util/List
var java_util_ListImpl = _extendClass( java_lang_Object, {

    // -- methods defined in the List interface
    add_1: function (obj) {
		this.storage.push(obj);  
        return true;
    },   
   
	add_2: function(index, obj) {
        this.storage.splice (index,0, obj);
    },
    
    addAll_1: function(collection) {
        var i = collection.iterator_0();
        while (i.hasNext_0()) {
            this.storage.push(i.next_0());
        }
    },
    
    addAll_2: function(index, collection) {
        var i = collection.iterator_0();
        var pos = index;
        while (i.hasNext_0()) {
            this.storage.splice(pos++,0, i.next_0());
        }        
    },          
    
	clear_0: function(){
        this.storage = [];
	},
      
	contains_1: function(obj) {
        return (this.indexOf_1(obj)>=0);
	},
    
	containsAll_1: function(collection) {
        var i = collection.iterator_0();
        while (i.hasNext_0()) {
            if (!this.contains_1(i.next_0())) return false;
        }
	},
     
    equals_1: function(b) {
        var s = this.storage.length;
        if (b==null || !(b._is_java_util_List) || s != b.size_0()) {
            return false;
        }
        for (var i=0; i<s; i++) {
            var e1 = this.storage[i];
            var e2 = b.get_1(i);
            if (! (e1==null ? e2==null : e1.equals_1(e2))) return false;
        }
        return true;  
    },
  
    get_1: function(index) {
        return this.storage[index];	
	},
    
    hashCode_0: function() {
        var hashCode = 1;
        for (i=0; i<this.storage.length; i++) {
            var e = this.storage[i];
            hashCode = ( 31*hashCode + (e==null ? 0 : e.hashCode_0()) ) & 0xffffffff;
        }
        return hashCode;
    },

	indexOf_1: function (o) {
        for (var i=0; i<this.storage.length; i++) {
            if (o==null ? (this.storage[i]==null) : o.equals_1(this.storage[i])) return i;
        }
        return -1;
    },
	     
	isEmpty_0: function () {
		return this.size_0() <= 0;
	},
   
    iterator_0: function() {
        return (new java_util_ListImplIterator())._1(this.storage);
    },
   
	lastIndexOf_1: function (obj) {
        return this.lastIndexOf_2(obj,this.size_0()-1);
    },
	  
    remove_1: function (obj_or_index) {
        if  (obj_or_index._is_java_lang_Object) {
            var idx = this.indexOf_1(obj_or_index);
            if (idx>=0) {                
                this.storage.splice(idx,1);
                return true;
            } else {
                return false;
            }
        } else {
            var obj = this.storage[obj_or_index];
            this.storage.splice(obj_or_index,1);
            return obj;
        }
    },

    removeAll_1: function (collection) {
        this.storage = this.storage.filter ( function(e) { return ! collection.contains_1(e); } );
    },
    
    retainAll_1: function (collection) {
        this.storage = this.storage.filter ( function(e) { return collection.contains_1(e); } );
    },
    
	set_2: function(index, obj) {
		this.storage[index] = obj;
	},
	
	size_0: function() {
		return this.storage.length;
	},

	toArray_0: function () {
        return this.storage.slice();
	},
    
	toArray_1: function (typetemplatearray) {
        return this.storage.slice();
    },
        
    // -- defined both for ArrayList and Vector, but not in the List interface
	_0: function() {
        this.storage = [];
        return this;
    },
    
	_1: function(collection) {
        this.storage = collection.toArray_0();
        return this;
    },
    
    toString_0: function() {
		var parts = [];	 
        parts.push("[");
		for (var i=0; i<this.storage.length; i++) {    
			if (i>0) {
				parts.push(", ");
			}       
            var o = this.storage[i];
			parts.push((o==null) ? 'null' : o.toString_0());
		}
		parts.push("]");
		return parts.join("");    
	}, 
  	            
},"java_util_ListImpl", [java_util_List]);


var java_util_ListImplIterator = _extendClass( java_lang_Object, {

	_1: function(storage) {
        this.storage = storage;
        this.next = 0;
        return this;
    },
    
    hasNext_0: function() {
        return this.next < this.storage.length;
    },
    
    next_0: function() {
        return this.storage[this.next++];
    },
    
    remove_0: function() {
        this.storage.splice(--this.next, 1);
    },
    
},"java_util_ListImplIterator", [java_util_Iterator]);
//reference// java/util/IteratorEnumeration
//load// java/util/ListImpl
var java_util_Vector = _extendClass( java_util_ListImpl, {
    
    // legacy methods only supported by Vector (but not the List interface )
    // everything can be easily implemented by just using the methods of the
    // List interface
    
	addElement_1: function(o) {
		this.add_1(o);
	},
	    
    clone_0: function () {
        return (new java_util_Vector())._1(this);
	},   

	copyInto_1: function(array){        
		for (var i=0; i<this.size_0(); i++){
			array[i] = this.get_1(i);
		}
	},
	   
	elementAt_1: function(i) {
        return this.get_1(i);
	},

    elements_0: function() {
        return (new java_util_IteratorEnumeration())._1(this.iterator_0());
    },
    
	firstElement_0: function () {
		return this.get_1(0);
	},

    indexOf_2: function (o, index) {
        for (var i=index; i<this.size_0(); i++) {
            if (o==null ? (this.get_1(i)==null) : o.equals_1(this.get_1(i))) return i;
        }
        return -1;
    },
    
    insertElementAt_2: function(o,index) {
        this.add_2(index,o);
    },
      
	lastElement_0: function () {
		return this.get_1(this.size_0()-1);
	},
   
    lastIndexOf_2: function (o, index) {
        for (var i=index; i>=0; i--) {
            if (o==null ? (this.get_1(i)==null) : o.equals_1(this.get_1(i))) return i;
        }
        return -1;
    },
    
	removeAllElements_0: function() {
		this.clear_0();
	},
  
	removeElement_1: function (o) {
        return this.remove_1(o);
    },

	removeElementAt_1: function(index) {
        this.remove_1(index);
	}, 

	setElementAt_2: function(o, index) {
		this.set_2(index,o);
	},
	
	setSize_1: function(newsize){
        if (newsize<=0) {
            this.clear_0();
        } else {
            var need = newsize - this.size_0();
            if (need>0) {
                for (var i=0; i<need; i++) this.add_1(null);
            } else if (need<0) {
                for (var i=this.size_0()-1; i>=newsize; i--) this.remove_1(i);
            }
        }
	},
    
}, "java_util_Vector", null);
/*
 * StaticClass.java
 *
 * Created on 09. September 2005, 09:57
 */







/**
 *
 * @author  reinhard
 */
//load// java/lang/Object
//complete// com/greentube/convertertest/DummyClass
//complete// java/util/Vector
//complete// java/lang/String

var com_greentube_convertertest_StaticClass = _extendClass(java_lang_Object,  {
initialConstructor_0: function(){
return java_lang_Object.prototype._0.call(this);
}, 
    
    
    
    
    
    
    
    
    
    
    

    
    

    fact_1:function(n)
    {
    	if ((n<2)) {return (1);}
    	return (n*this.fact_1((n-1)));
    },
    hello_0:function()
    {
    	return ("hello");    
    },
    

    stringToBytes_1:function(s)
	{
		var  a = (_createArray((s.length_0()),0));
		for (var  i=(0); (i<a.length_f); i++) {
			a[(i)] = ((_castTObyte) (s.charAt_1((i))));
		}
		return (a);	
	},
    
	/**
	 * Compute the MD5 hash from a given sequence of bytes
	 * @Return String containing the HEX representation of the HASH
	 */
	md5_1:function(bytes)
	{
		// tables of 6-bit integer values coded as singe characters
		var  kvalues =
			("\x00\x01\x02\x03" + "\x04\x05\x06\x07" + "\x08\x09\x0a\x0b" + 
		    "\x0c\x0d\x0e\x0f" + "\x01\x06\x0b\x00" + "\x05\x0a\x0f\x04" + 
			"\x09\x0e\x03\x08" + "\x0d\x02\x07\x0c" + "\x05\x08\x0b\x0e" + 
		    "\x01\x04\x07\x0a" + "\x0d\x00\x03\x06" + "\x09\x0c\x0f\x02" + 
			"\x00\x07\x0e\x05" + "\x0c\x03\x0a\x01" + "\x08\x0f\x06\x0d" + 
		    "\x04\x0b\x02\x09");
		var  svalues =
			("\x07\x0c\x11\x16" + "\x05\x09\x0e\x14" + "\x04\x0b\x10\x17" + 
		    "\x06\x0a\x0f\x15");

		// table of 32-bit integer values coded as two chars (high 16 bit first)
		var  Tvalues =
			((""+String.fromCharCode(55146)+""+String.fromCharCode(42104)+"") + (""+String.fromCharCode(59591)+""+String.fromCharCode(46934)+"") + (""+String.fromCharCode(9248)+""+String.fromCharCode(28891)+"") + (""+String.fromCharCode(49597)+""+String.fromCharCode(52974)+"") + 
		    (""+String.fromCharCode(62844)+""+String.fromCharCode(4015)+"") + (""+String.fromCharCode(18311)+""+String.fromCharCode(50730)+"") + (""+String.fromCharCode(43056)+""+String.fromCharCode(17939)+"") + (""+String.fromCharCode(64838)+""+String.fromCharCode(38145)+"") + 
			(""+String.fromCharCode(27008)+""+String.fromCharCode(39128)+"") + (""+String.fromCharCode(35652)+""+String.fromCharCode(63407)+"") + (""+String.fromCharCode(65535)+""+String.fromCharCode(23473)+"") + (""+String.fromCharCode(35164)+""+String.fromCharCode(55230)+"") + 
			(""+String.fromCharCode(27536)+""+String.fromCharCode(4386)+"") + (""+String.fromCharCode(64920)+""+String.fromCharCode(29075)+"") + (""+String.fromCharCode(42617)+""+String.fromCharCode(17294)+"") + (""+String.fromCharCode(18868)+""+String.fromCharCode(2081)+"") + 
			(""+String.fromCharCode(63006)+""+String.fromCharCode(9570)+"") + (""+String.fromCharCode(49216)+""+String.fromCharCode(45888)+"") + (""+String.fromCharCode(9822)+""+String.fromCharCode(23121)+"") + (""+String.fromCharCode(59830)+""+String.fromCharCode(51114)+"") + 
			(""+String.fromCharCode(54831)+""+String.fromCharCode(4189)+"") + (""+String.fromCharCode(580)+""+String.fromCharCode(5203)+"") + (""+String.fromCharCode(55457)+""+String.fromCharCode(59009)+"") + (""+String.fromCharCode(59347)+""+String.fromCharCode(64456)+"") + 
			(""+String.fromCharCode(8673)+""+String.fromCharCode(52710)+"") + (""+String.fromCharCode(49975)+""+String.fromCharCode(2006)+"") + (""+String.fromCharCode(62677)+""+String.fromCharCode(3463)+"") + (""+String.fromCharCode(17754)+""+String.fromCharCode(5357)+"") + 
			(""+String.fromCharCode(43491)+""+String.fromCharCode(59653)+"") + (""+String.fromCharCode(64751)+""+String.fromCharCode(41976)+"") + (""+String.fromCharCode(26479)+""+String.fromCharCode(729)+"") + (""+String.fromCharCode(36138)+""+String.fromCharCode(19594)+"") + 
			(""+String.fromCharCode(65530)+""+String.fromCharCode(14658)+"") + (""+String.fromCharCode(34673)+""+String.fromCharCode(63105)+"") + (""+String.fromCharCode(28061)+""+String.fromCharCode(24866)+"") + (""+String.fromCharCode(64997)+""+String.fromCharCode(14348)+"") + 
			(""+String.fromCharCode(42174)+""+String.fromCharCode(59972)+"") + (""+String.fromCharCode(19422)+""+String.fromCharCode(53161)+"") + (""+String.fromCharCode(63163)+""+String.fromCharCode(19296)+"") + (""+String.fromCharCode(48831)+""+String.fromCharCode(48240)+"") + 
			(""+String.fromCharCode(10395)+""+String.fromCharCode(32454)+"") + (""+String.fromCharCode(60065)+""+String.fromCharCode(10234)+"") + (""+String.fromCharCode(54511)+""+String.fromCharCode(12421)+"") + (""+String.fromCharCode(1160)+""+String.fromCharCode(7429)+"") + 
			(""+String.fromCharCode(55764)+""+String.fromCharCode(53305)+"") + (""+String.fromCharCode(59099)+""+String.fromCharCode(39397)+"") + (""+String.fromCharCode(8098)+""+String.fromCharCode(31992)+"") + (""+String.fromCharCode(50348)+""+String.fromCharCode(22117)+"") + 
			(""+String.fromCharCode(62505)+""+String.fromCharCode(8772)+"") + (""+String.fromCharCode(17194)+""+String.fromCharCode(65431)+"") + (""+String.fromCharCode(43924)+""+String.fromCharCode(9127)+"") + (""+String.fromCharCode(64659)+""+String.fromCharCode(41017)+"") + 
			(""+String.fromCharCode(25947)+""+String.fromCharCode(22979)+"") + (""+String.fromCharCode(36620)+""+String.fromCharCode(52370)+"") + (""+String.fromCharCode(65519)+""+String.fromCharCode(62589)+"") + (""+String.fromCharCode(34180)+""+String.fromCharCode(24017)+"") + 
			(""+String.fromCharCode(28584)+""+String.fromCharCode(32335)+"") + (""+String.fromCharCode(65068)+""+String.fromCharCode(59104)+"") + (""+String.fromCharCode(41729)+""+String.fromCharCode(17172)+"") + (""+String.fromCharCode(19976)+""+String.fromCharCode(4513)+"") + 
			(""+String.fromCharCode(63315)+""+String.fromCharCode(32386)+"") + (""+String.fromCharCode(48442)+""+String.fromCharCode(62005)+"") + (""+String.fromCharCode(10967)+""+String.fromCharCode(53947)+"") + (""+String.fromCharCode(60294)+""+String.fromCharCode(54161)+""));

		// Step 1 + 2. - create words from bytes
		var  bl = (bytes.length_f);
		// determine number of blocks of 16 words
		var  M = (_createArray((((_divideInteger(((bl + 9 + 63)) , 64))) * 16),0));
		// copy bytes (and append trailing 0x80)
		for (var  i = (0); (i <= bl); i++)
		{
			var  b = (i < bl) ? ((((((_castTOint) (bytes[(i)]))) & 0xff))) : (0x80);
			M[(_divideInteger(i , 4))] |= (((b << ((i * 8)))));
		}
		// append length in bits at correct place
		M[(M.length_f - 2)] = (bl * 8);

		// Step 3. initialize MD buffer
		var  ABCD = ([
			(0x67452301),
			(0xefcdab89),
			(0x98badcfe),
			(0x10325476)
		]);
		var  ABCDcopy = (_createArray((4),0));

		// Step 4. Process Message in 16-Word Blocks
		for (var  i = (0); (i < M.length_f); i = i+((16)))
		{
			// save previous value of buffer
			for (var  j = (0); (j < 4); j++)
			{
				ABCDcopy[(j)] = (ABCD[(j)]);			// do 4 * 16 operations
			}

            var  kSkip = (0);
			for (var  j = (0); (j < 64); j++)
			{
				var  a = (ABCD[(((64 - j)) % 4)]);
				var  b = (ABCD[(((65 - j)) % 4)]);
				var  c = (ABCD[(((66 - j)) % 4)]);
				var  d = (ABCD[(((67 - j)) % 4)]);
				var  k = (kvalues.charAt_1((j+kSkip)));
				var  s = (svalues.charAt_1((((j % 4)) + ((_divideInteger(j , 16))) * 4)));
				var  X = (M[(i + k)]);
				var  T = ((((((_castTOint) (Tvalues.charAt_1((2 * j))))) << 16)) | (((_castTOint) (Tvalues.charAt_1((2 * j + 1))))));
				
				var  f = (0);
				switch ((_divideInteger(j , 16)))
				{
					case (0):
						f = (((b & c)) | ((((~b)) & d)));
						break;   // XY v not(X) Z
					case (1):
						f = (((b & d)) | ((c & ~d)));
						break;   // XZ v Y not(Z)
					case (2):
						f = (b ^ c ^ d);
						break;   // X xor Y xor Z
					case (3):
						f = (c ^ ((b | ~d)));
						break;   // Y xor (X v not(Z))
				}
				
				// Debug.log(j+":"+a+" "+b+" "+c+" "+d+" "+f+" "+X+" "+T);				

				var  v = (a + f + X + T);
				ABCD[(((64 - j)) % 4)] = (((b + ((((v << s)) | ((v >>> ((32 - s)))))))) & 0xffffffff);
			}

			// add previous values to current buffer
			for (var  j = (0); (j < 4); j++)
			{
				ABCD[(j)] = ABCD[(j)]+((ABCDcopy[(j)]));
			}
		}

		// Step 5. Output
        var  out = ((new java_lang_StringBuffer)._0());
        var  hex = ("0123456789abcdef");
		for (var  i = (0); (i < 4); i++)
		{
			for (var  j = (0); (j < 4); j++)
			{
				for (var  n = (0); (n < 2); n++)
				{
					var  idx = (((ABCD[(i)] >> ((8 * j + 4 * ((1 - n)))))) & 0xf);
					out.append_1((hex.substring_2((idx),(idx+1))));
				}
			}
		}
		return (out.toString_0());
	},
	
	printints_2:function(a, len)
	{
		var  b = ((new java_lang_StringBuffer)._0());
		for (var  i=(0); (i<len); i++) {
			b.append_1((" "+a[(i)]));
		}
		java_lang_System.prototype.out_f.println_1((b.toString_0()));
	}
	
},"com_greentube_convertertest_StaticClass",[]);
com_greentube_convertertest_StaticClass.prototype.a_f = (17);
com_greentube_convertertest_StaticClass.prototype.b_f = ("hello kitty");
com_greentube_convertertest_StaticClass.prototype.c_f = ((new java_util_Vector)._0());
com_greentube_convertertest_StaticClass.prototype.d_f = ((new com_greentube_convertertest_DummyClass)._0());
com_greentube_convertertest_StaticClass.prototype.e_f=null;
com_greentube_convertertest_StaticClass.prototype.f_f=0;
com_greentube_convertertest_StaticClass.prototype.ia_f = [ [ [ (4), (4) ] ,
                              [ (6), (7) ]
                            ],
                            [ [ (11), (123), (123) ] ]
                          ];
com_greentube_convertertest_StaticClass.prototype.sa_f = [ ("one"), ("two"), ("three") ];
com_greentube_convertertest_StaticClass.prototype.saa_f = [ [ ("x"), ("y") ], [ ("a"), ("b"), ("c")] ];
com_greentube_convertertest_StaticClass.prototype.ROWCOUNT_f = [(3), (6), (9), (10)];
com_greentube_convertertest_StaticClass.prototype.REFERENCES_f = [ [[(0),(1)],[(2),(3)],[(4),(5)]],[[(0),(1)],[(1),(2)],[(3),(4)],[(4),(5)],[(6),(7)],[(7),(8)]],[[(0),(1)],[(1),(2)],[(2),(3)],[(3),(4)],[(4),(5)],[(5),(6)],[(6),(7)],[(7),(8)],[(8),(9)]]];


//reference// java/lang/Math
//reference// java/lang/Integer
//reference// com/greentube/convertertest/DummyClass
//reference// java/lang/System
//reference// java/lang/Byte
//reference// java/lang/Boolean
//reference// java/util/Vector
//reference// java/lang/Enum
//reference// java/lang/Object
//reference// java/lang/Character
//reference// java/lang/String
//reference// java/lang/StringBuilder
//reference// java/lang/Double
//reference// java/lang/StringBuffer
//reference// java/lang/Iterable
//reference// java/lang/Runnable

com_greentube_convertertest_Test.prototype.main_1([]);

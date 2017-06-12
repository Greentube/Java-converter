









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




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

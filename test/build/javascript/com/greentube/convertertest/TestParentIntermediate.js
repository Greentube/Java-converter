


//Parent class of java2flash test class to test super super calls

//load// com/greentube/convertertest/TestInterface
//load// com/greentube/convertertest/TestParent
var com_greentube_convertertest_TestParentIntermediate = _extendClass(com_greentube_convertertest_TestParent, {

	initialConstructor_1: function(i) {
		com_greentube_convertertest_TestParent.prototype.initialConstructor_1.call(this,(i));
	return this;},

	initialConstructor_0: function() { com_greentube_convertertest_TestParent.prototype.initialConstructor_0.call(this); 
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
//reference// com/greentube/convertertest/TestInterface
//reference// java/lang/Object
//reference// java/lang/String
//reference// java/lang/Double
//reference// java/lang/StringBuffer
//reference// java/lang/Runnable

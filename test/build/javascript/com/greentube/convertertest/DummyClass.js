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

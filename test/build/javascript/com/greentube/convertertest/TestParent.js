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
com_greentube_convertertest_TestParent.s.staticparentattribute_f = (66);


//reference// java/lang/Math
//reference// java/lang/Integer
//reference// java/lang/System
//reference// java/lang/Byte
//reference// java/lang/Boolean
//reference// java/util/Vector
//reference// java/lang/Object
//reference// java/lang/String
//reference// java/lang/Double
//reference// java/lang/StringBuffer
//reference// java/lang/Runnable

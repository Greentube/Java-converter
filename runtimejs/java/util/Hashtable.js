//load// java/lang/Object
//load// java/util/MapImpl
var java_util_Hashtable = _extendClass( java_util_MapImpl, {
    
    
    
}, "java_util_Hashtable", []);

//load// java/util/Enumeration
var java_util_HashtableEnumeration = _extendClass( java_lang_Object, {
    
	_0: function() {
		this.values = [];
        this.idx = 0;
        return this;
	},
    	
	hasMoreElements_0 : function() {	
		return this.idx < this.values.length;
	},
	
	nextElement_0 : function() {	
		if (this.idx >= this.values.length) return null;			
		var o = this.values[this.idx];
		this.idx++;			
		return o;		
	}		

}, "java_util_HashtableEnumeration", [java_util_Enumeration] );


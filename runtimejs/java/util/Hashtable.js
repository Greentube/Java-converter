//load// java/lang/Object
var java_util_Hashtable = _extendClass( java_lang_Object, {

	initialConstructor_0: function() {
		 this.hashtable = {};
         return this;
	},
	 
    clone_0: function() {
        var n2 = (new java_util_Hashtable).initialConstructor_0();
        for (var i in this.hashtable) {
            if ( this.hashtable.hasOwnProperty(i)) {
                n2.put_2(i,this.hashtable[i]);
            }
        } 
        return n2;    
    },
   
	clear_0: function() {
		this.hashtable = {};
	},
	
	containsKey_1: function(key) {
		return this.hashtable.hasOwnProperty(key);
	},
	
	get_1: function(key) {
        if (this.hashtable.hasOwnProperty(key)) {
            return this.hashtable[key];
        }
        return null;
	},
	
	isEmpty_0: function(){
        return this.size_0() == 0;
	},
	
	keys_0: function(){
		var keys = (new java_util_HashtableEnumeration()).initialConstructor_0();
		for (var k in this.hashtable) {
			if ( this.hashtable.hasOwnProperty(k)) {
		    	keys.values.push(k);
            }
		}
		return keys;
	},

    elements_0: function() {
        var elements = (new java_util_HashtableEnumeration()).initialConstructor_0();
        for (var k in this.hashtable) {
            if ( this.hashtable.hasOwnProperty(k)) {
                elements.values.push(this.hashtable[k]);
            }
        }
        return elements;
    },
	
	put_2: function(key, value) {
		if (key != null && value != null) {
			this.hashtable[key] = value;
		}
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
	  
    equals_1: function(h) {
        if (h==null || !h._is_java_util_Hashtable || this.size_0()!=h.size_0()) {
            return false;
        }
        for (k in this.hashtable) {
            if (this.hashtable.hasOwnProperty(k)) {
                if (!h.hashtable.hasOwnProperty(k)) return false;
                var o1 = this.hashtable[k];
                var o2 = h.hashtable[k];
                if (o1==null) {   
                    if (o2!=null) return false;
                }
                else if (!o1.equals_1(o2)) {
                    return false;
                }
            }
        }    
        return true;
    }

},"java_util_Hashtable", []);

//load// java/util/Enumeration
var java_util_HashtableEnumeration = _extendClass( java_lang_Object, {
    
	initialConstructor_0: function() {
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


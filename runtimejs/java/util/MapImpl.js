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



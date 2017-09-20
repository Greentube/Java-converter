// implements a generic java hashmap by dividing the data into
// entries with a string key and entries with arbitrary object keys.
//   stringtable .. a JS object that directly maps the strings to keys
//   commontable .. a JS object that maps hashcodes to key-value pairs:
//                  For each hashcode, an array is maintained that holds a sequence
//                  of keys and values (so the array always has even length)
//   totalelements .. always keep track of the size

//load// java/lang/Object
//load// java/util/Map
//load// java/util/Set
//load// java/util/AbstractCollection
//load// java/util/Iterator
//load// java/util/Enumeration

var java_util_HashMapImpl = {
    $: function() {
        this._stringtable = null;
        this._commontable = null;
        this._totalelements = 0;
    },
};    
_class(java_util_HashMapImpl, java_lang_Object, [java_util_Map], "java.util.HashMapImpl", {
   	_0: function() {
        // by removing a key from an object, it will be clear that
        // this object should be used in dictionary mode from now on         
        this._stringtable = {x: 0};
        this._commontable = {x: 0};        
        delete this._stringtable.x; 
        delete this._commontable.x;
        
        this._totalelements = 0;
        return this;
	},

   	_1: function(map) {
        this._0();
        this.putAll_1(map);
        return this;
	},
    
	clear_0: function() {
		this._stringtable = {}; 
		this._commontable = {};
        this._totalelements = 0;
	},
	
	containsKey_1: function(key) {
        if (_isValidStringKey(key)) {
            return this._stringtable.hasOwnProperty(key);
        }
        var hc = (key===null) ? 0 : key.hashCode_0();
        var kv = this._commontable[hc];
        if (!kv) return false;
        for (var i=0; i<kv.length; i+=2) {  // scan all key-value pairs for the hashCode
            var k = kv[i];
            if (key===null ? k===null : key.equals_1(k)) return true;
        }
        return false;
	},
    
	containsValue_1: function(value) {
        // search through all string keys
        for (var s in this._stringtable) {
//            if (this._stringtable.hasOwnProperty(s)) {
                var v = this._stringtable[s];
                if (value===null ? v===null : value.equals_1(v)) {
                    return true;
                }
//            }
        }
        // search through all hashcode-buckets        
        for (var hc in this._commontable) { 
//            if (this._commontable.hasOwnProperty(hc)) {
                var kv = this._commontable[hc];
                for (var i=1; i<kv.length; i+=2) {
                    var v = kv[i];
                    if (value===null ? v===null : value.equals_1(v)) {
                        return true;
                    }   
                }
//            }
        }
        return false;
	},
	
    equals_1: function(h) {
        if (h===null || !_implements(h,java_util_Map) || this.size_0()!==h.size_0()) {
            return false;
        }
        for (var it=this.keySet_0().iterator_0(); it.hasNext_0(); ) {
            var k = it.next_0();
            var v = this.get_1(k);
            if (!h.containsKey_1(k)) return false;
            var v2 = h.get_1(k);
            if (! (v===null ? v2===null : v.equals_1(v2)) ) return false;
        }            
        return true;
    },

	get_1: function(key) {
        if (_isValidStringKey(key)) {
            var s = this._stringtable;
            var v = s[key];
            if (v) return v;
            return null;
        }
        var hc = (key===null) ? 0 : key.hashCode_0();
        var kv = this._commontable[hc];  // scan all key-value pairs for the hashCode
        if (!kv) return null;
        for (var i=0; i<kv.length; i+=2) {  
            var k = kv[i];
            if (key===null ? k===null : key.equals_1(k)) {
                return kv[i+1];
            }
        }
        return null;        
	},
    
    hashCode_0: function() {
        var sum = 0;
        for (var it=this.keySet_0().iterator_0(); it.hasNext_0(); ) {
            var k = it.next_0();
            var v = this.get_1(k);
            var c = (k===null ? 0 : k.hashCode_0()) ^
                    (v===null ? 0 : v.hashCode_0());
            sum = (sum + c) | 0;
        }
        return sum;
    },
	
	isEmpty_0: function() {
        return this.size_0() <= 0;
	},

	keySet_0: function() {
        return new java_util_HashMapKeyView.$()._1(this);
    }, 

	put_2: function(key, value) {
        // easy operation when can directly use the javascript object mapping
        if (_isValidStringKey(key)) {
            if (this._stringtable.hasOwnProperty(key)) {
                var rtn = this._stringtable[key];
                this._stringtable[key] = value;
                return rtn;
            } else {
                this._totalelements++;
                this._stringtable[key] = value;                
            }
        // complex operation, maintaining buckets of key-value pairs 
        } else {
            var hc = (key===null) ? 0 : key.hashCode_0();
            var kv = this._commontable[hc];
            if (!kv) {
                // create new bucket if not yet existing
                this._commontable[hc] = [key,value]; 
                this._totalelements++;
            } else {
                for (var i=0; i<kv.length; i+=2) {  // scan all key-value pairs for the hashCode
                    var k = kv[i];
                    // found occurence of the key - overwrite the value
                    if (key===null ? k===null : key.equals_1(k)) {
                        var rtn = kv[i+1];
                        kv[i+1] = value;
                        return rtn;
                    }
                }
                // bucket does not contain key yet - create a new key-value pair
                kv.push(key);
                kv.push(value);
                this._totalelements++;
            }
        }
        return null;
	},
    
    putAll_1: function(map) {
        if (map===null) throw new TypeError("NullPointerException");
        for (var it=map.keySet_0().iterator_0(); it.hasNext_0(); ) {
            var k = it.next_0();
            var v = map.get_1(k);
            this.put_2(k,v);
        }
    },
	    
	remove_1: function(key) {
        if (_isValidStringKey(key)) {  
            var st = this._stringtable;
            if (st.hasOwnProperty(key)) {                
                var rtn = st[key];
                delete st[key];
                this._totalelements--;
                return rtn;
            }
        } else {
            var hc = (key===null) ? 0 : key.hashCode_0();
            var ct = this._commontable;
            var kv = ct[hc];
            if (kv) {
                for (var i=0; i<kv.length; i+=2) {
                    var k = kv[i];
                    if (key===null ? k===null : key.equals_1(k)) {
                        var rtn = kv[i+1];
                        if (kv.length>2) {
                            kv.splice(i,2);
                        } else {
                            delete ct[hc];
                        }
                        this._totalelements--;
                        return rtn;
                    }
                }
            }
        }
        return null;
	},
	
	size_0: function(){
		return this._totalelements;
	},
	
	toString_0: function(){
		var parts = ["{"];
        for (var it=this.keySet_0().iterator_0(); it.hasNext_0(); ) {
            var k = it.next_0();
            var v = this.get_1(k);
            if (parts.length>1) {
                parts.push(", ");
            }
            parts.push(k===null ? "null" : k.toString_0());
            parts.push("=");
            parts.push(v===null ? "null" : v.toString_0());
        }
        parts.push("}");
		return parts.join("");
	},
	  
    values_0: function() {
        return new java_util_HashMapValueView.$()._1(this);
    },        
});

function _isValidStringKey(s) {
    return s!==null && s._isString;
}


var java_util_HashMapKeyView = {
    $: function() {
        this.map = null;
    },
};    
_class(java_util_HashMapKeyView, java_util_AbstractCollection, [java_util_Set], "java.util.HashMapKeyView", {
    _1: function(map) {   
        this.map = map;
        return this;
	},
    
    contains_1: function(o) {
        return this.map.containsKey_1(o);
    },        
    
// containsAll_1                   // implemented by AbstractCollection

    equals_1: function(o) {
        if (o===null || !(o instanceof java_util_HashMapKeyView.$) || this.size_0()!==o.size_0()) {
            return false;
        }
        for (var it=this.iterator_0(); it.hasNext_0(); ) {
            var e = it1.next_0();
            if (! o.map.containsKey_1(e)) return false;
        }
        return true;          
    },

    hashCode_0: function() {
        var hashCode = 0;
        for (var it=this.iterator_0(); it.hasNext_0(); ) {
            var e = it.next_0();
            hashCode = ( hashCode + (e===null ? 0 : e.hashCode_0()) ) & 0xffffffff;
        }
        return hashCode;
    },       

// boolean	isEmpty()              // implemented by AbstractCollection

    iterator_0: function() {
        return new java_util_HashMapIterator.$()._2(this.map, true);
    },

    size_0: function() {
        return this.map._totalelements;
    },
    
// Object[]	toArray()              // implemented by AbstractCollection   
});


var java_util_HashMapValueView = {
    $: function() {
        this.map = null;
    },
};
_class(java_util_HashMapValueView, java_util_AbstractCollection, [java_util_Collection], "java.util.HashMapValueView", {
   	_1: function(map) {
        this.map = map;
        return this;
	},

    contains_1: function(o) {
        return this.map.containsValue_1(o);
    },        

// containsAll_1                   // implemented by AbstractCollection
// boolean	equals(Object o)       // implemented by Object
// int	hashCode()                 // implemented by Object
// boolean	isEmpty()              // implemented by AbstractCollection

    iterator_0: function() {
        return new java_util_HashMapIterator.$()._2(this.map, false);     
    },

    size_0: function() {
        return this.map._totalelements;
    },
    
// Object[]	toArray()              // implemented by AbstractCollection
});


var java_util_HashMapIterator = {
    $: function() {
        this.map = null;
        this.deliverKeys = false;
        this.keys = null;
        this.n = 0;
    },
};
_class(java_util_HashMapIterator, java_lang_Object, [java_util_Iterator, java_util_Enumeration], "java.util.HashMapIterator", {
    _2: function(map, deliverKeys) {
        this.map = map;
        this.deliverKeys = deliverKeys;
        
        var k = [];
        // search through all string keys
        for (var s in map._stringtable) {
            k.push(s);            
        }
        // search through all hashcode-buckets        
        for (var hc in map._commontable) { 
            var kv = map._commontable[hc];
            for (var i=0; i<kv.length; i+=2) { 
                k.push(kv[i]);
            }
        }
        
        this.keys = k;
        this.n = 0; 
        
        return this;
    },
    hasNext_0: function() {
        return this.n<this.keys.length;
    },
            
    next_0: function() {
        var k = this.keys[this.n++];
        return this.deliverKeys ? k : this.map.get_1(k);
    },           
    remove_0: function() {
        this.map.remove_1(this.keys[this.n-1]);
    },   
    
    hasMoreElements_0: function() {
        return this.hasNext_0();
    },    
    nextElement_0: function() {  
        return this.next_0();
    },        
});

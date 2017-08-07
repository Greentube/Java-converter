// implements a generic java hashmap by dividing the data into
// entries with a string key and entries with arbitrary object keys.
//   stringtable .. a JS object that directly maps the strings to keys
//   commontable .. a JS object that maps hashcodes to key-value pairs
//   totalelements .. always keep track of the size

//load// java/lang/Object
//load// java/util/Map
//load// java/util/AbstractCollection
//load// java/util/Iterator

var java_util_HashMap = _extendClass( java_lang_Object, {
    
   	_0: function() {
        this.stringtable = {};
        this.commontable = {};
        this.totalelements = 0;
        return this;
	},

   	_1: function(map) {
        this._0();
        this.putAll_1(map);
        return this;
	},
    
	clear_0: function() {
		this.stringtable = {};
		this.commontable = {};
        this.totalelements = 0;
	},
	
	containsKey_1: function(key) {
        if (_isValidStringKey(key)) {
            return this.stringtable.hasOwnProperty(key);
        }
        var hc = (key==null) ? 0 : key.hashCode_0();
        if (!this.commontable.hasOwnProperty(hc)) return false;
        for (var kv of this.commontable[hc]) {  // scan all key-value pairs for the hashCode
            var k = kv[0];
            if (key==null ? k==null : key.equals_1(k)) return true;
        }
        return false;
	},
    
	containsValue_1: function(value) {
        // search through all string keys
        for (var s in this.stringtable) {
            if (this.stringtable.hasOwnProperty(s)) {
                var v = this.stringtable[s];
                if (value==null ? v==null : value.equals_1(v)) {
                    return true;
                }
            }
        }
        // search through all hashcode-buckets        
        for (var hc in this.commontable) { 
            if (this.commontable.hasOwnProperty(hc)) {
                for (var kv of this.commontable[hc]) { 
                    var  v = kv[1];
                    if (value==null ? v==null : value.equals_1(v)) {
                        return true;
                    }   
                }
            }
        }
        return false;
	},
	
    equals_1: function(h) {
        if (h==null || !h._is_java_util_Map || this.size_0()!=h.size_0()) {
            return false;
        }
        for (var it=this.keySet_0().iterator_0(); it.hasNext_0(); ) {
            var k = it.next_0();
            var v = this.get_1(k);
            if (!h.containsKey_1(k)) return false;
            var v2 = h.get_1(k);
            if (! (v==null ? v2==null : v.equals_1(v2)) ) return false;
        }            
        return true;
    },

	get_1: function(key) {
        if (_isValidStringKey(key)) {
            return this.stringtable.hasOwnProperty(key) ? this.stringtable[key] : null;
        }
        var hc = (key==null) ? 0 : key.hashCode_0();
        if (!this.commontable.hasOwnProperty(hc)) return null;
        for (var kv of this.commontable[hc]) {  // scan all key-value pairs for the hashCode
            var k = kv[0];
            if (key==null ? k==null : key.equals_1(k)) {
                return kv[1];
            }
        }
        return null;        
	},
    
    hashCode_0: function() {
        var sum = 0;
        for (var it=this.keySet_0().iterator_0(); it.hasNext_0(); ) {
            var k = it.next_0();
            var v = this.get_1(k);
            var c = (k==null ? 0 : k.hashCode_0()) ^
                    (v==null ? 0 : v.hashCode_0());
            sum = (sum + c) & 0xffffffff;
        }
        return sum;
    },
	
	isEmpty_0: function(){
        return this.size_0() <= 0;
	},

	keySet_0: function() {
        return (new java_util_HashMapKeyView())._1(this);
    }, 

	put_2: function(key, value) {
        // easy operation when can directly use the javascript object mapping
        if (_isValidStringKey(key)) {
            if (!this.stringtable.hasOwnProperty(key)) this.totalelements++;
            this.stringtable[key] = value;
        // complex operation, maintaining buckets of key-value pairs 
        } else {
            var hc = (key==null) ? 0 : key.hashCode_0();
            if (!this.commontable.hasOwnProperty(hc)) {
                // create new bucket if not yet existing
                this.commontable[hc] = [[key,value]]; 
                this.totalelements++;
            } else {
                for (var kv of this.commontable[hc]) {  // scan all key-value pairs for the hashCode
                    var k = kv[0];
                    // found occurence of the key - overwrite the value
                    if (key==null ? k==null : key.equals_1(k)) {
                        kv[1] = value;
                        return;
                    }
                }
                // bucket does not contain key yet - create a new key-value pair
                this.commontable[hc].push([key,value]);
                this.totalelements++;
            }
        }
	},
    
    putAll_1: function(map) {
        if (map==null) throw new TypeError("NullPointerException");
        for (var it=map.keySet_0().iterator_0(); it.hasNext_0(); ) {
            var k = it.next_0();
            var v = map.get_1(k);
            this.put_2(k,v);
        }
    },
	    
	remove_1: function(key) {
        if (_isValidStringKey(key)) {  
            var st = this.stringtable;
            if (st.hasOwnProperty(key)) {                
                var rtn = st[key];
                delete st[key];
                this.totalelements--;
                return rtn;
            }
        } else {
            var ct = this.commontable;
            var hc = (key==null) ? 0 : key.hashCode_0();
            if (ct.hasOwnProperty(hc)) {
                var bucket = ct[hc];
                for (var i=0; i<bucket.length; i++) {
                    var k = bucket[i][0];
                    if (key==null ? k==null : key.equals_1(k)) {
                        var rtn = bucket[i][1];
                        if (bucket.length>1) {
                            bucket.splice(i,1);
                        } else {
                            delete ct[hc];
                        }
                        this.totalelements--;
                        return rtn;
                    }
                }
            }
        }
        return null;
	},
	
	size_0: function(){
		return this.totalelements;
	},
	
	toString_0: function(){
		var parts = ["{"];
        for (var it=this.keySet_0().iterator_0(); it.hasNext_0(); ) {
            var k = it.next_0();
            var v = this.get_1(k);
            if (parts.length>1) {
                parts.push(", ");
            }
            parts.push(k==null ? "null" : k.toString_0());
            parts.push("=");
            parts.push(v==null ? "null" : v.toString_0());
        }
        parts.push("}");
		return parts.join("");
	},
	  
    values_0: function() {
        return (new java_util_HashMapValueView())._1(this);
    },
        
},"java_util_HashMap", [java_util_Map]);


function _isValidStringKey(s) {
    return s!=null && s._is_java_lang_String;
}


var java_util_HashMapKeyView = _extendClass( java_util_AbstractCollection, {

    _1: function(map) {   
        this.map = map;
        return this;
	},
    
    contains_1: function(o) {
        return this.map.containsKey_1(o);
    },        
    
// containsAll_1                   // implemented by AbstractCollection

    equals_1: function(o) {
        if (o==null || !(o._is_java_util_MapKeyView) || this.size_0()!=o.size_0()) {
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
            hashCode = ( hashCode + (e==null ? 0 : e.hashCode_0()) ) & 0xffffffff;
        }
        return hashCode;
    },       

// boolean	isEmpty()              // implemented by AbstractCollection

    iterator_0: function() {
        return (new java_util_HashMapIterator())._2(this.map, true);
    },

    size_0: function() {
        return this.map.totalelements;
    },
    
// Object[]	toArray()              // implemented by AbstractCollection
   	
},"java_util_HashMapKeyView", [java_util_Collection]);


var java_util_HashMapValueView = _extendClass( java_util_AbstractCollection, {

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
        return (new java_util_HashMapIterator())._2(this.map, false);     
    },

    size_0: function() {
        return this.map.totalelements;
    },
    
// Object[]	toArray()              // implemented by AbstractCollection

},"java_util_HashMapValueView", [java_util_Collection]);


var java_util_HashMapIterator = _extendClass( java_lang_Object, {
            
    _2: function(map, deliverKeys) {
        this.map = map;
        this.deliverKeys = deliverKeys;
        
        var k = [];
        // search through all string keys
        for (var s in map.stringtable) {
            if (map.stringtable.hasOwnProperty(s)) {
                k.push(s);
            }
        }
        // search through all hashcode-buckets        
        for (var hc in map.commontable) { 
            if (map.commontable.hasOwnProperty(hc)) {
                for (var kv of map.commontable[hc]) { 
                    k.push(kv[0]);
                }
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
    
}, "java_util_MapValueView", [java_util_Iterator]);

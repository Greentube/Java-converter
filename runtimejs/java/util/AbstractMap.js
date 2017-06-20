// implements a generic java hashmap by dividing the data into
// entries with a string key and entries with arbitrary object keys.
//   stringtable .. a JS object that directly maps the strings to keys
//   commontable .. a JS object that maps hashcodes to key-value pairs
//   totalelements .. always keep track of the size

//load// java/lang/Object
//load// java/util/Map
//load// java/util/AbstractCollection
//load// java/util/Set
//load// java/util/JSArrayIterator

var java_util_AbstractMap = _extendClass( java_lang_Object, {
    
   	_0: function() {
        this.stringtable = {};
        this.commontable = {};
        this.totalelements = 0;
        return this;
	},

   	_1: function(map) {
        this._0();
        var it = map.keySet_0().iterator_0();
        while (it.hasNext_0()) {
            var k = it.next_0();
            this.put_2(k,map.get_1(k));
        }
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
        return this.values_0().contains_1(value);
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
        return (new java_util_MapKeyView())._1(this);
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
	
    values_0: function() {
        return (new java_util_MapValueView())._1(this);
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
	  
    
},"java_util_AbstractMap", [java_util_Map]);


function _isValidStringKey(s) {
    return s!=null && s._is_java_lang_String;
}


var java_util_MapKeyView = _extendClass( java_util_AbstractCollection, {

    _1: function(map) {
        this.map = map;
        return this;
	},
    
    contains_1: function(o) {
        return this.map.containsKey_1(o);
    },        
    
// containsAll_1                   // implemented by AbstractCollection

    equals_0: function(b) {
        if (b==null || !(b._is_java_util_Set) || this.size_0() != b.size_0()) {
            return false;
        }
        for (var it=this.iterator_0(); it.hasNext_0(); ) {
            if ( ! b.contains_1(it.next_0()) ) return false;
        }        
        return true;
    },
    
    hashCode_0: function() {
        var sum = 0;
        for (var it = this.iterator_0(); it.hasNext_0(); ) {
            var e = it.next_0();
            if (e!=null) sum = (sum + e.hashCode_0()) & 0xffffffff;
        }
        return sum;
    },

// boolean	isEmpty()              // implemented by AbstractCollection

    iterator_0: function() {
        var mi = this.map;
        var k = [];
        // search through all string keys
        for (var s in mi.stringtable) {
            if (mi.stringtable.hasOwnProperty(s)) {
                k.push(s);
            }
        }
        // search through all hashcode-buckets        
        for (var hc in mi.commontable) { 
            if (mi.commontable.hasOwnProperty(hc)) {
                for (var kv of mi.commontable[hc]) { 
                    k.push(kv[0]);
                }
            }
        }
        return (new java_util_JSArrayIterator())._3(k,0,k.length);     
    },

    size_0: function() {
        return this.map.totalelements;
    },
    
// Object[]	toArray()              // implemented by AbstractCollection
   	
},"java_util_MapKeyView", [java_util_Set]);


var java_util_MapValueView = _extendClass( java_util_AbstractCollection, {

   	_1: function(map) {
        this.map = map;
        return this;
	},

// contains_1:                     // implemented by AbstractCollection
// containsAll_1                   // implemented by AbstractCollection

// boolean	equals(Object o)       // implemented by Object
// int	hashCode()                 // implemented by Object

// boolean	isEmpty()              // implemented by AbstractCollection

    iterator_0: function() {
        var mi = this.map;
        var v = [];
        // search through all string keys
        for (var s in mi.stringtable) {
            if (mi.stringtable.hasOwnProperty(s)) {
                v.push(mi.stringtable[s]);
            }
        }
        // search through all hashcode-buckets        
        for (var buckets in mi.commontable) { 
            for (var kv of buckets) { 
                v.push(kv[1]);
            }
        }
        return (new java_util_JSArrayIterator())._3(v,0,v.length);     
    },

    size_0: function() {
        return this.map.totalelements;
    },
    
// Object[]	toArray()              // implemented by AbstractCollection


},"java_util_MapValueView", [java_util_Collection]);


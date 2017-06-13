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
var java_util_MapImpl = _extendClass( java_lang_Object, {
    
    // -- methods defined in the List interface
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
        // test everything in the string table
        for (var k in this.stringtable) {
            var v = this.stringtable[k];
            if (value==null ? v==null : value.equals_1(v)) return true;
        }        
        // search through all hashcode-buckets        
        for (var buckets in this.commontable) { 
            for (var kv of buckets) {  // scan all key-value pairs for the hashCode
                if (value==null ? kv[1]==null : value.equals_1(kv[1])) return true;
            }
        }
        return false;
	},
    
//    entrySet_0: function() {            // NOT SUPPORTED
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
        if (_isValidStringKey(key)) {
            return this.stringtable.hasOwnProperty(key) ? this.stringtable[key] : null;
        }
        var hc = (key==null) ? 0 : key.hashCode_0();
        if (!this.commontable.hasOwnProperty(hc)) return null;
        for (var kv of this.commontable[hc]) {  // scan all key-value pairs for the hashCode
            var k = kv[0];
            if (key==null ? k==null : key.equals_1(k)) return kv[1];
        }
        return null;        
	},
    
    hashCode_0: function() {
    // (e.getKey()==null   ? 0 : e.getKey().hashCode()) ^
    // (e.getValue()==null ? 0 : e.getValue().hashCode())
        // TODO
    },
	
	isEmpty_0: function(){
        return this.size_0() <= 0;
	},

	keySet_0: function() {
        return (new java_util_MapImplKeyView())._1(this);
    }, 

	put_2: function(key, value) {
        // easy operation when can directly use the javascript object mapping
        if (_isValidStringKey(key)) {
            if (!this.stringtable.hasOwnProperty(key)) this.totalelements++;
            this.stringtable[key] = value;
        } else {
            var hc = (key==null) ? 0 : key.hashCode_0();
            if (!this.commontable.hasOwnProperty(hc)) {
                // create new bucket if not yet existing
                this.commontable.put(hc, [key,value]); 
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
        // TODO
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
            return null;
        } else {
            
            return null;
        }
	},
	
	size_0: function(){
		return this.totalelements;
	},
	
    values_0: function() {
        // TODO
    },
    

    // methods only in HashMap and Hashtable but not in the Map interface
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
    
	toString_0: function(){
		var parts = ["{"];
		for (var k in this.stringtable)	{	  
            if (this.stringtable.hasOwnProperty(k)) {
                if (parts.length>1) {
                    parts.push(", ");
                }
                parts.push (k + "=" + this.stringtable[k]);
            }
		}
        for (var bucket in (this.commontable)) {
            for (var kv of bucket) {
                if (parts.length>1) {
                    parts.push(", ");
                }
                parts.push(kv[0] + "=" + kv[1]);
            }
        }
        parts.push("}");
		return parts.join("");
	},
	  
    
},"java_util_MapImpl", [java_util_Map]);


function _isValidStringKey(s) {
    return s!=null && s._is_java_lang_String;
}


var java_util_MapImplKeyView = _extendClass( java_util_AbstractCollection, {

    contains_1: function(o) {
        return this.mapimpl.containsKey_1(o);
    },        
    
// containsAll_1                   // implemented by AbstractCollection

// boolean	equals(Object o)
// int	hashCode()

// boolean	isEmpty()              // implemented by AbstractCollection

    iterator_0: function() {
        return (new java_util_JSArrayIterator())._1([]);     
    },

    size_0: function() {
        return this.mapimpl.totalelements;
    },
    
// Object[]	toArray()              // implemented by AbstractCollection
// <T> T[]	toArray(T[] a)         // implemented by AbstractCollection

   	_1: function(mapimpl) {
        this.mapimpl = mapimpl;
        return this;
	},

},"java_util_MapImplKeyView", [java_util_Set]);


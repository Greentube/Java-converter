// implements a generic java hashmap by using a Map to store
// hashcodes and all key/values pairs belonging to this hashcode.
//   _table .. a javascript Map that maps hashcodes to key-value pairs:
//                  For each hashcode, an array is maintained that holds a sequence
//                  of keys and values (so the array always has even length)
//   _totalelements .. always keep track of the total size

//reference// java/lang/IllegalStateException
//reference// java/lang/NullPointerException
//reference// java/lang/IndexOutOfBoundsException

//load// java/lang/Object
//load// java/util/Map
//load// java/util/Set
//load// java/util/AbstractCollection
//load// java/util/Iterator
//load// java/util/Enumeration
var java_util_HashMapImpl = 
{   $: function()
    {   this._table = null;
        this._totalelements = 0;
    },
};    
_class(java_util_HashMapImpl, java_lang_Object, [java_util_Map], 
"java.util.HashMapImpl"  //replace-me-with-empty-string-for-production//
, 
{   _0: function() 
    {   this._table = new Map();
        return this;
    },

    _1: function(map) 
    {   this._0();
        this.putAll_1(map);
        return this;
    },
    
    clear_0: function() 
    {   this._table.clear();
        this._totalelements = 0;
    },
    
    containsKey_1: function(key) 
    {   var hc = key===null ? 0 : key.hashCode_0()*3999971;
        var kv = this._table.get(hc);
        if (!kv) return false;
        for (var i=0; i<kv.length; i+=2) 
        {   // scan all key-value pairs for the hashCode
            var k = kv[i];
            if (key===null ? k===null : key.equals_1(k)) return true;
        }
        return false;
    },
    
    containsValue_1: function(value) 
    {   var found = false;
        // search through all hashcode-buckets                
        this._table.forEach(function(kv,hc,m){
            for (var i=1; i<kv.length; i+=2) 
            {   var v = kv[i];
                if (value===null ? v===null : value.equals_1(v)) 
                {   found = true;
                    return;
                }   
            }
        });       
        return found;
    },

    equals_1: function(h) 
    {   if (h===null || !_isinterface(h,java_util_Map) || this.size_0()!==h.size_0()) 
        {   return false;
        }
        for (var it=this.keySet_0().iterator_0(); it.hasNext_0(); ) 
        {   var k = it.next_0();
            var v = this.get_1(k);
            if (!h.containsKey_1(k)) return false;
            var v2 = h.get_1(k);
            if (! (v===null ? v2===null : v.equals_1(v2)) ) return false;
        }            
        return true;
    },

    get_1: function(key) 
    {   var hc = key===null ? 0 : key.hashCode_0()*3999971;
        var kv = this._table.get(hc);  // scan all key-value pairs for the hashCode
        if (!kv) return null;
        for (var i=0; i<kv.length; i+=2) 
        {   var k = kv[i];
            if (key===null ? k===null : key.equals_1(k)) 
            {   return kv[i+1];
            }
        }
        return null;        
    },
    
    hashCode_0: function() 
    {   var sum = 0;
        for (var it=this.keySet_0().iterator_0(); it.hasNext_0(); ) 
        {   var k = it.next_0();
            var v = this.get_1(k);
            var c = (k===null ? 0 : k.hashCode_0()) ^
                    (v===null ? 0 : v.hashCode_0());
            sum = (sum + c) | 0;
        }
        return sum;
    },

    isEmpty_0: function() 
    {   return this.size_0() <= 0;
    },

    keySet_0: function() 
    {   return new java_util_HashMapKeyView.$(this);
    }, 

    put_2: function(key, value) 
    {   var hc = (key===null) ? 0 : key.hashCode_0()*3999971;
        var kv = this._table.get(hc);
        if (!kv) 
        {   // create new bucket if not yet existing
            this._table.set(hc,[key,value]);
            this._totalelements++;
        } 
        else
        {   for (var i=0; i<kv.length; i+=2) 
            {  // scan all key-value pairs for the hashCode
                var k = kv[i];
                // found occurence of the key - overwrite the value
                if (key===null ? k===null : key.equals_1(k)) 
                {   var rtn = kv[i+1];
                    kv[i+1] = value;
                    return rtn;
                }
            }
            // bucket does not contain key yet - create a new key-value pair
            kv.push(key);
            kv.push(value);
            this._totalelements++;
        }
        return null;
    },
    
    putAll_1: function(map) 
    {   if (map===null)
        {   throw (new java_lang_NullPointerException.$())._0()._e;
        }
        for (var it=map.keySet_0().iterator_0(); it.hasNext_0(); ) 
        {   var k = it.next_0();
            var v = map.get_1(k);
            this.put_2(k,v);
        }
    },

    remove_1: function(key) 
    {   var hc = (key===null) ? 0 : key.hashCode_0()*3999971;
        var ct = this._table;
        var kv = ct.get(hc);
        if (kv) 
        {   for (var i=0; i<kv.length; i+=2) 
            {   var k = kv[i];
                if (key===null ? k===null : key.equals_1(k)) 
                {   var rtn = kv[i+1];
                    if (kv.length>2) 
                    {   kv.splice(i,2);
                    }
                    else
                    {   ct.delete(hc);
                    }
                    this._totalelements--;
                    return rtn;
                }
            }
        }
        return null;
    },
    
    size_0: function()
    {   return this._totalelements;
    },

    toString_0: function()
    {   var parts = ["{"];
        for (var it=this.keySet_0().iterator_0(); it.hasNext_0(); ) 
        {   var k = it.next_0();
            var v = this.get_1(k);
            if (parts.length>1) 
            {   parts.push(", ");
            }
            parts.push(k===null ? "null" : k.toString_0());
            parts.push("=");
            parts.push(v===null ? "null" : v.toString_0());
        }
        parts.push("}");
        return parts.join("");
    },
  
    values_0: function() 
    {   return new java_util_HashMapValueView.$(this);
    },      
    
    _collectKeys_0: function() 
    {   var allkeys = [];
        // search through all hashcode-buckets        
        this._table.forEach(function(kv,hc,m){
            for (var i=0; i<kv.length; i+=2) 
            {   allkeys.push(kv[i]);
            }
        });
        return allkeys;
    }
});

var java_util_HashMapKeyView = 
{   $: function(map)         // internal use only - can merge allocator with constructor
    {   this.map = map;
    },
};    
_class(java_util_HashMapKeyView, java_util_AbstractCollection, [java_util_Set], 
"java.util.HashMapKeyView"  //replace-me-with-empty-string-for-production//
, 
{    
    contains_1: function(o) 
    {   return this.map.containsKey_1(o);
    },        
    
// containsAll_1                   // implemented by AbstractCollection

    equals_1: function(o) 
    {   if (o===null || !(o instanceof java_util_HashMapKeyView.$) || this.size_0()!==o.size_0()) 
        {   return false;
        }
        for (var it=this.iterator_0(); it.hasNext_0(); ) 
        {   var e = it.next_0();
            if (! o.map.containsKey_1(e)) return false;
        }
        return true;          
    },

    hashCode_0: function() 
    {   var hashCode = 0;
        for (var it=this.iterator_0(); it.hasNext_0(); ) 
        {   var e = it.next_0();
            hashCode = ( hashCode + (e===null ? 0 : e.hashCode_0()) ) & 0xffffffff;
        }
        return hashCode;
    },       

// boolean	isEmpty()              // implemented by AbstractCollection

    iterator_0: function() 
    {   return new java_util_HashMapIterator.$(this.map, true, this.map._collectKeys_0());
    },

    size_0: function() 
    {   return this.map._totalelements;
    },
    
// Object[]	toArray()              // implemented by AbstractCollection   
});


var java_util_HashMapValueView =
{   $: function(map)    // internal use only - can merge allocator with constructor
    {   this.map = map;
    },
};
_class(java_util_HashMapValueView, java_util_AbstractCollection, [java_util_Collection], 
"java.util.HashMapValueView"  //replace-me-with-empty-string-for-production//
, 
{ 
    contains_1: function(o) 
    {   return this.map.containsValue_1(o);
    },        

// containsAll_1                   // implemented by AbstractCollection
// boolean	equals(Object o)       // implemented by Object
// int	hashCode()                 // implemented by Object
// boolean	isEmpty()              // implemented by AbstractCollection

    iterator_0: function() 
    {   return new java_util_HashMapIterator.$(this.map, false, this.map._collectKeys_0());     
    },

    size_0: function() 
    {   return this.map._totalelements;
    },
    
// Object[]	toArray()              // implemented by AbstractCollection
});


var java_util_HashMapIterator = 
{   $: function(map, deliverKeys, keys)     // internal use only - may merge allocator with constructor
    {   this.map = map;
        this.deliverKeys = deliverKeys;
        this.keys = keys;
        this.n = 0;
    },
};
_class(java_util_HashMapIterator, java_lang_Object, [java_util_Iterator, java_util_Enumeration], 
"java.util.HashMapIterator"   //replace-me-with-empty-string-for-production//
, 
{       
    hasNext_0: function() 
    {   return this.n<this.keys.length;
    },
            
    next_0: function() 
    {   
        if (this.n>=this.keys.length)
        {   throw (new java_lang_IndexOutOfBoundsException.$())._0()._e; 
        }
        var k = this.keys[this.n++];
        return this.deliverKeys ? k : this.map.get_1(k);
    },       
    
    remove_0: function() 
    {   var before = this.n-1;
        if (before<0) throw (new java_lang_IllegalStateException.$())._0()._e;
        this.map.remove_1(this.keys[before]); // may throw 
    },   
    
    hasMoreElements_0: function() 
    {   return this.hasNext_0();
    },    
    
    nextElement_0: function() 
    {   return this.next_0();
    },        
});

// implement a simple Map object if not supported by framework already
// (may be slow but will work)
(function()
{   if (!Map) 
    {   var m = function() 
        {   this.table = {};
        }
        m.prototype.clear = function()
        {   this.table = {};
        }
        m.prototype.get = function(key)
        {   return this.table[key];
        }
        m.prototype.set = function(key,value)
        {   this.table[key] = value;
        }
        m.prototype.delete = function(key)
        {   delete this.table[key];
        }
        m.prototype.forEach = function(callback)
        {   for (var k in this.table) 
            {   if (this.table.hasOwnProperty(k)) 
                {   callback(this.table[k],k,this);
                }
            }
        }
        Map = m;
    }
})();


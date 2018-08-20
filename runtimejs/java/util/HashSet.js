//reference// java/util/HashMap
//load// java/util/Set
//load// java/util/AbstractCollection
//complete// java/lang/Object
var java_util_HashSet = function() 
{   this._map = null;
};

_defclass(java_util_HashSet, java_util_AbstractCollection, [java_util_Set], 
{   _0: function() 
    {   this._map = new java_util_HashMap()._0();
        return this;
    },
        
    _1: function(collection) 
    {   this._0();
        this.addAll_1(collection);
        return this;
    },
        
    add_1: function(e) 
    {   return this._map.put_2(e, java_util_HashSet_PRESENT)===null;
    },           
        
    addAll_1: function(c) 
    {   var i = c.iterator_0();
        var didappend = false;
        while (i.hasNext_0()) 
        {   if (this.add(i.next_0())) {
                didappend = true;
            }
        }        
        return didappend;
    },
        
    clear_0: function() 
    {   this._map.clear_0();
    },
        
    contains_1: function(e) 
    {   return this._map.containsKey_1(e);
    },
        
    // containsAll        implemented by AbstractCollection
                    
    equals_1: function(o) 
    {   if (o===null || !_isinterface(o,java_util_Set)) return false;            
        var s = o;
        if (this.size_0() !== s.size_0()) return false;
        for (var it=s.iterator_0(); it.hasNext_0(); ) 
        {   if (! this.contains_1(it.next_0())) return false;
        }            
        return true; 
    },
                
    hashCode_0: function() 
    {   return this._map.keySet_0().hashCode_0();
    },
        
    // isEmpty       implemented by AbstractCollection
        
    iterator_0: function() 
    {   return this._map.keySet_0().iterator_0();
    },
                
    remove_1: function(key) 
    {   return this._map.remove_1(key)!==null;
    },
        
    removeAll_1: function(collection) 
    {   var i = collection.iterator_0();
        var didremove = false;
        while (i.hasNext_0()) 
        {   if (this.remove_1(i.next_0())) 
            {   didremove = true;
            }
        }        
        return didremove;            
    },
        
    retainAll_1: function(collection) 
    {   var i = this.iterator_0();
        var didremove = false;
        while (i.hasNext_0()) 
        {   var e = i.next_0();
            if (!collection.contains_1(e)) 
            {   i.remove_0();
                didremove = true;
            }
        }
        return didremove;
    },
        
    size_0: function() 
    {   return this._map.size_0();
    }
        
    // toArray   implemented by AbstractCollection 
    // toString  implemented by AbstractCollection
});

var java_util_HashSet_PRESENT = new java_lang_Object()._0();  

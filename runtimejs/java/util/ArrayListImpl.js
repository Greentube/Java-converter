//load// java/util/AbstractList
var java_util_ArrayListImpl = 
{   $: function() 
    {   this._storage = null;
    },
};
_class(java_util_ArrayListImpl, java_util_AbstractList, null, "java.util.ArrayListImpl", 
{   _0: function() 
    {   this._storage = [];
        return this;
    },
    
    _1: function(collection) 
    {   this._0();
        this.addAll_1(collection);
        return this;
    },
  
    get_1: function(index) 
    {   return this._storage[index];	
    },
    
    set_2: function(index, obj) 
    {   this._storage[index] = obj;
    },
    
    add_2: function(index, obj) 
    {   if(index===this._storage.length) 
        {   this._storage.push(obj);
        } 
        else if (index===0) 
        {   this._storage.unshift(obj);
        } 
        else
        {   this._storage.splice (index,0, obj);
        }
    },

    remove_1: function (idx) 
    {   var s = this._storage;
        if (idx<0 || idx>=s.length) throw new RangeError();
        var obj = this._storage[idx];
        if (idx===0) 
        {   this._storage.shift();
        }
        else if (idx===s.length-1)
        {   this._storage.pop();
        }
        else 
        {   this._storage.splice(idx,1);
        }
        return obj;                    
    },

    size_0: function()
    {   return this._storage.length;
    },
    
    trimToSize_0: function() 
    {   // no operation. the underlying array is always trimmed.
    },
    
    // optimized operations
    add_1: function(obj) 
    {   this._storage.push(obj);
        return true;
    },
    
    clear_0: function() 
    {   this._storage.length = 0;
    },      
    
    toArray_0: function () 
    {   return _arr("[Ljava/lang/Object;", this._storage.slice());
    },    
    
    toArray_1: function (a) 
    {   return _arr(a._t, this._storage.slice());
    },    
}); 

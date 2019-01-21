//reference// java/lang/IndexOutOfBoundsException

//load// java/util/AbstractList
var java_util_ArrayListImpl = function() 
{   this._storage = null;
};
_defclass(java_util_ArrayListImpl, java_util_AbstractList, null, 
{   _0: function() 
    {   this._storage = [];
        return this;
    },
    
    _1Ljava_util_Collection$: function(collection) 
    {   this._0();
        this.addAll_1(collection);  // will throw if null
        return this;
    },
  
    get_1: function(index) 
    {   if (index<0 || index>=this._storage.length)
        {   throw (new java_lang_IndexOutOfBoundsException())._0()._e; 
        }
        return this._storage[index];	
    },
    
    set_2: function(index, obj) 
    {   if (index<0 || index>=this._storage.length)
        {   throw (new java_lang_IndexOutOfBoundsException())._0()._e; 
        }
        this._storage[index] = obj;
    },
    
    add_2: function(index, obj) 
    {   var s = this._storage;
        if(index===s.length) 
        {   s.push(obj);
        } 
        else if (index===0) 
        {   s.unshift(obj);
        } 
        else if (index>0 && index<s.length)
        {   s.splice (index,0, obj);
        }
        else
        {   throw (new java_lang_IndexOutOfBoundsException())._0()._e; 
        }
    },

    remove_1I: function (idx) 
    {   var s = this._storage;
        if (idx<0 || idx>=s.length)
        {   throw (new java_lang_IndexOutOfBoundsException())._0()._e; 
        }
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
    {   return _arr(java_lang_Object, 1, this._storage.slice());
    },    
    
    toArray_1: function (a) 
    {   return _arr(a._t, a._d, this._storage.slice());
    },    
}); 

//reference// java/lang/IllegalStateException
//reference// java/util/NoSuchElementException
//reference// java/lang/NullPointerException
//load// java/util/Iterator
//load// java/util/Enumeration
//load// java/util/List
//load// java/util/AbstractCollection
var java_util_AbstractList = function() 
{
};
_defclass(java_util_AbstractList, java_util_AbstractCollection, [java_util_List], 
{   // must be implemented by a modifiable subclass
    // public abstract System.Object get(int index);
    // public abstract System.Object set(int index, System.Object element);        
    // public abstract void add(int index, System.Object element);
    // public abstract System.Object remove(int index);        
    // int size() 
    
    add_1: function (obj) 
    {   this.add_2(this.size_0(), obj);
        return true;
    },   
              
    addAll_2: function(index, c) 
    {   var i = c.iterator_0();
        var pos = index;
        var didappend = false;
        while (i.hasNext_0()) 
        {   this.add_2(pos++, i.next_0());
            didappend = true;
        }        
        return didappend;
    },

    // OPTIMIZATION    
	clear_0: function() 
    {   for (var i=this.size_0()-1; i>=0; i--) 
        {   this.remove_1I(i);
        }
	},      

    //contains       implemented by AbstractCollection
    //containsAll    implemented by AbstractCollection

    equals_1: function(o) 
    {   var s = this.size_0();
        if (o===null || !_isinterface(o,java_util_Collection) || s!==o.size_0()) 
        {   return false;
        }
        for (var it1=this.iterator_0(), it2=o.iterator_0(); it1.hasNext_0(); ) 
        {   var e1 = it1.next_0();
            var e2 = it2.next_0();
            if (! (e1===null ? e2===null : e1.equals_1(e2))) return false;
        }
        return true;  
    },
    
    hashCode_0: function() 
    {   var hashCode = 1;
        for (var it=this.iterator_0(); it.hasNext_0(); ) 
        {   var e = it.next_0();
            hashCode = ( 31*hashCode + (e===null ? 0 : e.hashCode_0()) ) | 0;
        }
        return hashCode;
    },       
    
    indexOf_1: function (o) 
    {   var s = this.size_0();
        for (var i=0; i<s; i++) 
        {   if (o===null ? (this.get_1(i)===null) : o.equals_1(this.get_1(i))) return i;
        }
        return -1;
    },

    iterator_0: function() 
    {   return new java_util_AbstractListIterator(this);
    },
   
    lastIndexOf_1: function (o) 
    {   for (var i=this.size_0()-1; i>=0; i--) 
        {   if (o===null ? (this.get_1(i)===null) : o.equals_1(this.get_1(i))) return i;
        }
        return -1;
    },
    
    // OPTIMIZATION        
    remove_1Ljava_lang_Object$: function(obj)
    {
        var idx = this.indexOf_1(obj);
        if (idx>=0)
        {
            this.remove_1I(idx);
            return true;
        }
        return false;
    },
        
    // toString_0      implemented by AbstractCollection  	           
}); 


var java_util_AbstractListIterator = function(list)  
 // internal use only - merge allocator with constructor
{   this.list = list;
    this.n = 0;
};
_defclass(java_util_AbstractListIterator, java_lang_Object,  [java_util_Iterator, java_util_Enumeration], 
{    
    hasNext_0: function() 
    {   return this.n < this.list.size_0();
    },
    
    next_0: function() 
    {   if (this.n>=this.list.size_0())
        {   throw (new java_util_NoSuchElementException())._0()._e;
        }
        var v = this.list.get_1(this.n);  
        this.n++;
        return v;
    },

    remove_0: function() 
    {   
        var before = this.n-1;
        if (before<0) throw (new java_lang_IllegalStateException())._0()._e;
        this.list.remove_1I(before);  // will throw if unsupported
        this.n = before;
    },

    hasMoreElements_0: function() 
    {   return this.hasNext_0();
    },  
    
    nextElement_0: function() 
    {   return this.next_0();
    },    
}); 

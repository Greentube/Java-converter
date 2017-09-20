//load// java/util/Iterator
//load// java/util/Enumeration
//load// java/util/List
//load// java/util/AbstractCollection
var java_util_AbstractList = 
{   $: function() 
    {
    },
};
_class(java_util_AbstractList, java_util_AbstractCollection, [java_util_List], "java.util.AbstractList", 
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
   
    addAll_1: function(collection) 
    {   if (collection==null) throw new TypeError("NullPointerException");        
        var i = collection.iterator_0();
        var didappend = false;
        while (i.hasNext_0()) 
        {   this.add_1(i.next_0());
            didappend = true;
        }
        return didappend;
    },
    
    addAll_2: function(index, collection) 
    {   if (collection===null) throw new TypeError("NullPointerException");        
        var i = collection.iterator_0();
        var pos = index;
        var didappend = false;
        while (i.hasNext_0()) {
            this.add_2(pos++, i.next_0());
            didappend = true;
        }        
        return didappend;
    },          
    
	clear_0: function() 
    {   for (var i=this.size_0()-1; i>=0; i--) 
        {   this.remove_1(i);
        }
	},      
    
    //contains       implemented by AbstractCollection
    //containsAll    implemented by AbstractCollection

    equals_1: function(o) 
    {   var s = this.size_0();
        if (o===null || !_implements(o,java_util_Collection) || s!==o.size_0()) 
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
    {   return new java_util_AbstractListIterator.$()._1(this);
    },
   
    lastIndexOf_1: function (o) 
    {   for (var i=this.size_0()-1; i>=0; i--) 
        {   if (o===null ? (this.get_1(i)===null) : o.equals_1(this.get_1(i))) return i;
        }
        return -1;
    },
 
    removeAll_1: function (collection) 
    {   return this.filter(collection,false);
    },
    
    retainAll_1: function (collection) 
    {   return this.filter(collection,true);
    },
    
    filter: function(collection, keep) 
    {   if (collection===null) throw new TypeError("NullPointerException");                
        var modified=false;
        for (var i=this.size_0()-1; i>=0; i--) 
        {   var o = this.get_1(i);
            var c = collection.contains_1(o);
            if ((c && !keep) || (!c && keep)) 
            {   this.remove_1(i);
                modified = true;
            }
        }
        return modified;
    },
        
    // toString_0      implemented by AbstractCollection  	           
}); 


var java_util_AbstractListIterator = 
{   $: function() 
    {   this.list = null;
        this.n = 0;
    },
};
_class(java_util_AbstractListIterator, java_lang_Object, 
       [java_util_Iterator, java_util_Enumeration], "java.util.AbstractListIterator",
{
    _1: function(list) 
    {   this.list = list;
        this.n = 0;
        return this;
    },
    
    hasNext_0: function() 
    {   return this.n < this.list.size_0();
    },
    
    next_0: function() 
    {   return this.list.get_1(this.n++);
    },

    remove_0: function() 
    {   this.list.remove_1(--this.n);
    },

    hasMoreElements_0: function() 
    {   return this.hasNext_0();
    },  
    
    nextElement_0: function() 
    {   return this.next_0();
    },    
}); 

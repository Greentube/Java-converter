//load// java/util/AbstractList
var java_util_LinkedList = 
{   $: function() 
    {   this._head = null;
        this._len = 0;
        this._currentNode = null;
        this._currentIndex = 0;        
    },    
};
_class(java_util_LinkedList, java_util_AbstractList, null, 
"java.util.LinkedList"  //replace-me-with-empty-string-for-production//
, 
{   _0: function() 
    {   var h = { element:null, next:null, prev: null };
        h.next = h;
        h.prev = h;
        this._head = h;
        this._len = 0;
        this._currentNode = h;
        this._currentIndex = -1;
        return this;
    },
    
    _1: function(collection) 
    {   this._0();
        this.addAll_1(collection);  // may throw NullPointerException
        return this;
    },
  
    get_1: function(index) 
    {   return this.seek_1(index).element;  // may throw IndexOutOfBoundsException
    },
    
    set_2: function(index, element)         // may throw IndexOutOfBoundsException
    {   var n = this.seek_1(index);
        var prev = n.element;
        n.element = element;
        return prev;
    },
    
    add_2: function(index, element) 
    {   var n = { element:element, next:null, prev:null };
        var y;
        if (index===this._len) 
        {   y = this._head;
        } 
        else
        {   y = this.seek_1(index);           // may throw IndexOutOfBoundsException
            if (this._currentIndex>=index) this._currentIndex++;
        }
        var x = y.prev;
        n.prev = x;
        n.next = y;
        x.next = n;
        y.prev = n;
        this._len++;            
    },

    remove_1: function (index) 
    {   var n = this.seek_1(index);      // may throw IndexOutOfBoundsException
        var x = n.prev;
        var y = n.next;
        x.next = y;
        y.prev = x;
        this._len--;
        if (this._currentIndex>=index) 
        {   if (this._currentIndex===index) 
            {   this._currentNode = x;
            }    
            this._currentIndex--;
        }
        return n.element;
    },

    size_0: function() 
    {   return this._len;
    },
    
    seek_1: function(index) 
    {   var len = this._len;
        if (index<0 || index>=len) throw new RangeError("IndexOutOfBoundsException");
        if (index===0) return this._head.next;
        if (index===this.len-1) return this._head.prev;
            
        // decide in which direction to traverse the list
        var ci = this._currentIndex;
        // the target node is already found
        if (index===ci) return this._currentNode;
            
        var n = null;
        // the target node is before the current one
        if (index<ci) 
        {   // it is nearer to search from start
            if (index <= ci-index) 
            {   n = this._head.next;
                for (var i=0; i<index; i++) 
                {   n = n.next;
                }
            } 
            // it is nearer to search from the current
            else
            {   n = this._currentNode;
                for (var i=ci; i>index; i--) 
                {   n = n.prev;
                }                    
            }
        }
        // the target node is after the current one
        else
        {   // it is nearer to search from the current
            if (index-ci <= len-index) 
            {   n = this._currentNode;
                for (var i=ci; i<index; i++) 
                {   n = n.next;
                }
            }
            // it is nearer to search from the end            
            else 
            {   n = this._head.prev;
                for (var i=len-1; i>index; i--) 
                {   n = n.prev;
                }                    
            }
        }
            
        // memorize for later access
        this._currentNode = n;
        this._currentIndex = index;
        return n;
    },
    
    // convenience methods
    addFirst_1: function(obj)
    {   this.add_2(0,obj);
    },
   
    addLast_1: function(obj)
    {   this.add_1(obj);
    },
        
    getFirst_0: function()
    {   return this.get_1(0);
    },
    
    getLast_0: function() 
    {   return this.get_1(this.size_0()-1);
    },
        
    removeFirst_0: function() 
    {   return this.remove_1(0);
    },        
            
    removeLast_0: function()
    {   return this.remove_1(this.size_0()-1);
    },
    
    // optimized operations
    clear_0: function() 
    {   var h = this._head;
        h.next = h;
        h.prev = h;
        this._head = h;
        this._len = 0;
        this._currentNode = h;
        this._currentIndex = -1;
	},      
    
});


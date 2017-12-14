//load// java/lang/Object
var java_util_Comparator = { 
    _superinterfaces: null, 
    _defaults: {
        reversed_0: function()
        {   return new java_util_ComparatorReversed.$(this);
        },
        thenComparing_1: function(other)
        {   return new java_util_ComparatorThenComparing.$(this,other);
        },
    }
}; 

// -- methods:
// int compare(T o1, T o2)

var java_util_ComparatorReversed =
{   $: function(a)   // internal use only - integrate allocator with constructor 
    {   this.a = a;
    },
};
_class(java_util_ComparatorReversed, java_lang_Object, [java_util_Comparator], "java.util.ComparatorReversed", 
{   compare_2: function(x,y) 
    {   return -this.a.compare_2(x,y);
    },        
});

var java_util_ComparatorThenComparing =
{   $: function(a,b)   // internal use only - integrate allocator with constructor 
    {   this.a = a;
        this.b = b;
    },
};
_class(java_util_ComparatorThenComparing, java_lang_Object, [java_util_Comparator], "java.util.ComparatorThenComparing", 
{   compare_2: function(x,y) 
    {   var v = this.a.compare_2(x,y);
        if (v!=0) return v;
        return this.b.compare_2(x,y);
    },        
});

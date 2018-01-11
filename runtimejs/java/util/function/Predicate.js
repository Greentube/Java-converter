//load// java/lang/Object
var java_util_function_Predicate =  
{   _superinterfaces: null, 
    _defaults:
    {   and_1: function(other)
        {   if (other===null) throw new ReferenceError("NullPointerException");
            return new java_util_function_PredicateAnd.$(this,other);
        }
        ,
        negate_0: function()
        {   return new java_util_function_PredicateNegate.$(this);
        },
        or_1: function(other)
        {   if (other===null) throw new ReferenceError("NullPointerException");
            return new java_util_function_PredicateOr.$(this, other);
        }
    },
    isEqual_1: function(tobj) 
    {   return new java_util_function_PredicateIsEqual.$(tobj);
    },
}; 

// methods:
// default Predicate<T> and(Predicate<T> other)
// static Predicate<T> isEqual(Object targetref)
// default Predicate<T> negate()
// default Predicate<T> or(Predicate<T> other)
// boolean test(T t)


var java_util_function_PredicateAnd =
{   $: function(a,b)   // internal use only - integrate allocator with constructor 
    {   this.a = a;
        this.b = b;    
    },
};
_class(java_util_function_PredicateAnd, java_lang_Object, [java_util_function_Predicate], "java.util.function.PredicateAnd", 
{   test_1: function(o) 
    {   return this.a.test_1(o) && this.b.test_1(o);
    },        
});

var java_util_function_PredicateNegate =
{   $: function(a)   // internal use only - integrate allocator with constructor 
    {   this.a = a;
    },
};
_class(java_util_function_PredicateNegate, java_lang_Object, [java_util_function_Predicate], "java.util.function.PredicateNegate", 
{   test_1: function(o) 
    {   return ! this.a.test_1(o);
    },        
});

var java_util_function_PredicateOr =
{   $: function(a,b)   // internal use only - integrate allocator with constructor 
    {   this.a = a;
        this.b = b;    
    },
};
_class(java_util_function_PredicateOr, java_lang_Object, [java_util_function_Predicate], "java.util.function.PredicateOr", 
{   test_1: function(o) 
    {   return this.a.test_1(o) || this.b.test_1(o);
    },        
});

var java_util_function_PredicateIsEqual =
{   $: function(tobj)   // internal use only - integrate allocator with constructor 
    {   this.tobj = tobj;
    },
};
_class(java_util_function_PredicateIsEqual, java_lang_Object, [java_util_function_Predicate], "java.util.function.PredicateIsEqual", 
{   test_1: function(o) 
    {   return obj===null ? o===null : obj.equals_1(o);
    },        
});


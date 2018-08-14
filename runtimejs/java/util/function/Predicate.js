//reference// java/lang/NullPointerException
//load// java/lang/Object
var java_util_function_Predicate =  
{   _superinterfaces: [], 
    _defaults:
    {   and_1: function(other)
        {   if (other===null)
            {   throw (new java_lang_NullPointerException())._0()._e;
            }
            return new java_util_function_PredicateAnd(this,other);
        }
        ,
        negate_0: function()
        {   return new java_util_function_PredicateNegate(this);
        },
        or_1: function(other)
        {   if (other===null)
            {   throw (new java_lang_NullPointerException())._0()._e;
            }
            return new java_util_function_PredicateOr(this, other);
        }
    },
}; 

// methods:
// default Predicate<T> and(Predicate<T> other)
// static Predicate<T> isEqual(Object targetref)
// default Predicate<T> negate()
// default Predicate<T> or(Predicate<T> other)
// boolean test(T t)


var java_util_function_PredicateAnd = function(a,b)   
// internal use only - integrate allocator with constructor 
{   this.a = a;
    this.b = b;    
};
_class(java_util_function_PredicateAnd, java_lang_Object, [java_util_function_Predicate], 
"java.util.function.PredicateAnd"  //replace-me-with-empty-string-for-production//
,{  test_1: function(o) 
    {   return this.a.test_1(o) && this.b.test_1(o);
    },        
});

var java_util_function_PredicateNegate = function(a)
 // internal use only - integrate allocator with constructor 
{   this.a = a;
};
_class(java_util_function_PredicateNegate, java_lang_Object, [java_util_function_Predicate], 
"java.util.function.PredicateNegate"  //replace-me-with-empty-string-for-production//
,{  test_1: function(o) 
    {   return ! this.a.test_1(o);
    },        
});

var java_util_function_PredicateOr = function(a,b) 
 // internal use only - integrate allocator with constructor 
{   this.a = a;
    this.b = b;    
};
_class(java_util_function_PredicateOr, java_lang_Object, [java_util_function_Predicate], 
"java.util.function.PredicateOr"  //replace-me-with-empty-string-for-production//
,{   test_1: function(o) 
    {   return this.a.test_1(o) || this.b.test_1(o);
    },        
});

var java_util_function_PredicateIsEqual = function(tobj) 
  // internal use only - integrate allocator with constructor 
{   this.tobj = tobj;
};
_class(java_util_function_PredicateIsEqual, java_lang_Object, [java_util_function_Predicate], 
"java.util.function.PredicateIsEqual"  //replace-me-with-empty-string-for-production//
,{   test_1: function(o) 
    {   return this.tobj===null ? o===null : this.tobj.equals_1(o);
    },        
});

var java_util_function_Predicate_isEqual_1 = function(tobj) 
{   return new java_util_function_PredicateIsEqual(tobj);
};

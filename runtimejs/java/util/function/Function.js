//load// java/lang/Object
var java_util_function_Function = 
{   _superinterfaces: [], 
    _defaults:
    {   andThen_1: function(other)
        {   if (other===null) throw (new java_lang_NullPointerException.$())._error();
            return new java_util_function_FunctionAndThen.$(this,other);
        }
        ,
        compose_1: function(other)
        {   if (other===null) throw (new java_lang_NullPointerException.$())._error();
            return new java_util_function_FunctionAndThen.$(other,this);
        }
    },
    identity_0: function() 
    {   return new java_util_function_FunctionIdentity.$();
    },
}; 

// methods:
// default Function<T,V> andThen(Function<R,V> after)
// R	apply(T t)
// default Function<T,V> compose(Function<V,T> before)
// static Function<T,T> identity()

var java_util_function_FunctionAndThen =
{   $: function(a,b)   // internal use only - integrate allocator with constructor 
    {   this.a = a;
        this.b = b;    
    },
};
_class(java_util_function_FunctionAndThen, java_lang_Object, [java_util_function_Function], 
"java.util.function.FunctionAndThen"  //replace-me-with-empty-string-for-production//
,{  apply_1: function(o) 
    {   return this.b.apply_1(this.a.apply_1(o));
    },        
});

var java_util_function_FunctionIdentity =
{   $: function()   // internal use only - integrate allocator with constructor 
    {        
    },
};
_class(java_util_function_FunctionIdentity, java_lang_Object, [java_util_function_Function], 
"java.util.function.FunctionIdentity"  //replace-me-with-empty-string-for-production//
,{   apply_1: function(o) 
    {   return o;
    },        
});

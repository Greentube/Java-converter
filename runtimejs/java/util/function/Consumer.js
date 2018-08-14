//reference// java/lang/NullPointerException
//load// java/lang/Object
var java_util_function_Consumer = 
{   _superinterfaces: [], 
    _defaults:
    {   andThen_1: function(after)
        {   if (after===null) 
            {   throw (new java_lang_NullPointerException())._0()._e;
            }
            return new java_util_function_ConsumerAndThen(this,after);
        }
    },
}; 

// methods:
// void accept(T t)
// default Consumer<T> andThen(Consumer<T> after)

var java_util_function_ConsumerAndThen = function(a,b)   
// internal use only - integrate allocator with constructor 
{   this.a = a;
    this.b = b;    
};
_class(java_util_function_ConsumerAndThen, java_lang_Object, [java_util_function_Consumer], 
"java.util.function.ConsumerAndThen"  //replace-me-with-empty-string-for-production//
,{  accept_1: function(o) 
    {   this.a.accept_1(o);
        this.b.accept_1(o);
    },        
});

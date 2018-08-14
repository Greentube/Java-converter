//reference// java/lang/NullPointerException
//load// java/lang/Object
var java_util_function_BiConsumer = 
{   _superinterfaces: [], 
    _defaults:
    {   andThen_1: function(after)
        {   if (after===null) 
            {   throw (new java_lang_NullPointerException())._0()._e;
            }
            return new java_util_function_BiConsumerAndThen(this,after);
        }
    },
}; 

// methods:
// void accept(T t, U u)
// default BiConsumer<T> andThen(BiConsumer<T> after)

var java_util_function_BiConsumerAndThen = function(a,b)   
// internal use only - integrate allocator with constructor 
{   this.a = a;
    this.b = b;    
};
_class(java_util_function_BiConsumerAndThen, java_lang_Object, [java_util_function_BiConsumer], 
"java.util.function.ConsumerAndThen"  //replace-me-with-empty-string-for-production//
, 
{   accept_2: function(t,u) 
    {   this.a.accept_2(t,u);
        this.b.accept_2(t,u);
    },        
});

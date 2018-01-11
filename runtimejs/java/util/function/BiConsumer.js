//load// java/lang/Object
var java_util_function_BiConsumer = 
{   _superinterfaces: null, 
    _defaults:
    {   andThen_1: function(after)
        {   if (after===null) throw new ReferenceError("NullPointerException");
            return new java_util_function_BiConsumerAndThen.$(this,after);
        }
    },
}; 

// methods:
// void accept(T t, U u)
// default BiConsumer<T> andThen(BiConsumer<T> after)

var java_util_function_BiConsumerAndThen =
{   $: function(a,b)   // internal use only - integrate allocator with constructor 
    {   this.a = a;
        this.b = b;    
    },
};
_class(java_util_function_BiConsumerAndThen, java_lang_Object, [java_util_function_BiConsumer], "java.util.function.ConsumerAndThen", 
{   accept_2: function(t,u) 
    {   this.a.accept_2(t,u);
        this.b.accept_2(t,u);
    },        
});

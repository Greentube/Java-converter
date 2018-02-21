//load// java/lang/Object
var java_lang_Iterable = 
{   _superinterfaces: [], 
    _defaults:
    {   forEach_1: function(consumer)
        {   var i = this.iterator_0();
            while (i.hasNext_0()) 
            {   consumer.accept_1(i.next_0());
            }
        }
        ,
    }
}; 

// methods:
// Iterator<T> iterator()
// default void forEach(Consumer<T> consumer)

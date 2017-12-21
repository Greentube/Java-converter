//load// java/lang/Iterable
var java_util_Collection = { 
    _superinterfaces: [java_lang_Iterable], 
    _defaults:
    {   removeIf_1: function(predicate)
        {   var i = this.iterator_0();
            while (i.hasNext_0()) 
            {   var o = i.next_0();
                if (predicate.test_1(o)) i.remove_0();
            }
        }
        ,
    }

}; 

// -- methods:
// boolean	contains(Object o)
// boolean	containsAll(Collection<?> c)
// boolean	equals(Object o)
// int	hashCode()
// boolean	isEmpty()
// Iterator<E>	iterator()
// int	size()
// Object[]	toArray()
// String toString()

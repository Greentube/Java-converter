//load// java/util/Collection
var java_util_List = { 
    _superinterfaces: [java_util_Collection] ,
    _defaults: {
        sort_1: function(comparator) 
        {   var a = this.toArray_0();
            var l = a.length;
            this.clear_0();
            java_util_Arrays.sort_4(a,0,l,comparator);
            for (var i=0; i<l; i++) 
            {   this.add_1(a[i]);
            }
        }
        ,
        replaceAll_1: function(unaryoperator) 
        {   var s = this.size_0();
            for (var i=0; i<s; i++)
            {   this.set_2(i, unaryoperator.apply_1(this.get_1(i)));
            }
        }
    }
}; 

// -- methods:
// boolean add(E e)                        
// void add(int index, E element)
// boolean	addAll(Collection<? extends E> c)
// boolean	addAll(int index, Collection<? extends E> c)
// void	clear()
// boolean	contains(Object o)                         // inherited from Collection
// boolean	containsAll(Collection<?> c)               // inherited from Collection
// boolean	equals(Object o)                           // inherited from Collection
// E get(int index)
// int	hashCode()                                     // inherited from Collection
// int	indexOf(Object o)
// boolean	isEmpty()                                  // inherited from Collection
// Iterator<E>	iterator()                             // inherited from Collection
// int	lastIndexOf(Object o)
// E remove(int index)
// boolean	removeAll(Collection<?> c)
// boolean	retainAll(Collection<?> c)
// E	set(int index, E element)
// int	size()                                         // inherited from Collection
// Object[]	toArray()                                  // inherited from Collection
// Object[]	toArray(Object[] template)                 // inherited from Collection
// String	toString()                                 // inherited from Collection

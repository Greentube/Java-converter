//load// java/lang/Object
var java_util_Map = { 
    _superinterfaces: [],
    _defaults:
    {   getOrDefault_2: function(key,def)
        {   return this.containsKey_1(key) ? this.get_1(key) : def;
        }
        ,
        forEach_1: function(biconsumer)
        {   var i = this.keySet_0().iterator_0();
            while (i.hasNext_0()) 
            {   var k = i.next_0();
                var v = this.get_1(k);
                biconsumer.accept_2(k,v);
            }
        },
    }    
};  

// -- methods:
// void	clear()
// boolean	containsKey(Object key)
// boolean	containsValue(Object value)
// boolean	equals(Object o)
// V	get(Object key)
// int	hashCode()
// boolean	isEmpty()
// Set<K>	keySet()
// V	put(K key, V value)
// void	putAll(Map<? extends K,? extends V> m)
// V	remove(Object key)
// int	size()
// Collection<V>	values()
// String toString()

//load// java/lang/Object
var java_util_Map = { 
    _superinterfaces: null,
    _defaults:
    {   getOrDefault_2: function(key,def)
        {   return this.containsKey_1(key) ? this.get_1(key) : def;
        }
        ,
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

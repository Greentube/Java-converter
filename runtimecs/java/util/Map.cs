using java.lang;

namespace java.util 
{
    public interface Map
    {
        void clear();
        bool containsKey(object key);
        bool containsValue(object value);
        bool Equals(object o);
        void forEach(java.util.function.BiConsumer biconsumer);
        object get(object key);
        object getOrDefault(object key, object def);
        int GetHashCode();
        bool isEmpty();
        Set keySet();
        object put(object key, object value);
        void putAll(Map m);
        object remove(object key);
        int size();
        Collection values();
        string ToString();
    }
    
    public static class Map_0009
    {
        public static object getOrDefault(Map @this, object key, object def)
        {   
            return @this.containsKey(key) ? @this.get(key) : def;
        }
        public static void forEach(Map @this, java.util.function.BiConsumer biconsumer)
        {
            java.util.Iterator i = @this.keySet().iterator();
            while (i.hasNext()) 
            {   
                object key = i.next();
                object value = @this.get(key);
                biconsumer.accept(key,value);
            }       
        }
    }
}

namespace java.util { public interface Map
{
    void clear();
    bool containsKey(System.Object key);
    bool containsValue(System.Object value);
    bool Equals(System.Object o);
    void forEach(java.util.function.BiConsumer biconsumer);
    System.Object get(System.Object key);
    System.Object getOrDefault(System.Object key, System.Object def);
    int GetHashCode();
    bool isEmpty();
    Set keySet();
    System.Object put(System.Object key, System.Object value);
    void putAll(Map m);
    System.Object remove(System.Object key);
    int size();
    Collection values();
    System.String ToString();
}}
namespace java.util { public static class Map_c
{
    public static System.Object getOrDefault(Map @this, System.Object key, System.Object def)
    {   return @this.containsKey(key) ? @this.get(key) : def;
    }
    public static void forEach(Map @this, java.util.function.BiConsumer biconsumer)
    {
        java.util.Iterator i = @this.keySet().iterator();
        while (i.hasNext()) 
        {   System.Object key = i.next();
            System.Object value = @this.get(key);
            biconsumer.accept(key,value);
        }       
    }
}}

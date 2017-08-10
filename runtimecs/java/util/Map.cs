namespace java.util 
{
	public interface Map
	{
        void clear();
        bool containsKey(System.Object key);
        bool containsValue(System.Object value);
        bool Equals(System.Object o);
        System.Object get(System.Object key);
        int GetHashCode();
        bool isEmpty();
        Set keySet();
        System.Object put(System.Object key, System.Object value);
        void putAll(Map m);
        System.Object remove(System.Object key);
        int size();
        Collection values();
        System.String ToString();
    }
}

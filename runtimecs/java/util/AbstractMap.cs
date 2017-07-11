namespace java.util 
{
	public abstract class AbstractMap : Map
	{
        public AbstractMap() {
        }
        public AbstractMap(Map m) {
        }
        
        public void clear() {}
        public bool containsKey(System.Object key) { return false; }
        public bool containsValue(System.Object value) { return false; }
        public override bool Equals(System.Object o) { return false; }
        public System.Object get(System.Object key) { return null; }
        public override int GetHashCode() { return 0; }
        
        public bool isEmpty() {
            return size()<=0; 
        }
        
        public Set keySet() { return null; }
        public System.Object put(System.Object key, System.Object value) { return null; }
        public void putAll(Map m) {}
        public System.Object remove(System.Object key) { return null; }
        public int size() { return 0; }
        public Collection values() { return null; }
	}	
}

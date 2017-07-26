namespace java.util 
{
	public abstract class AbstractMap : Map
	{
        public AbstractMap() {
        }
        public AbstractMap(Map m) {
        }
        
        public virtual void clear() {}
        public virtual bool containsKey(System.Object key) { return false; }
        public virtual bool containsValue(System.Object value) { return false; }
        public override bool Equals(System.Object o) { return false; }
        public virtual System.Object get(System.Object key) { return null; }
        public override int GetHashCode() { return 0; }
        
        public virtual bool isEmpty() {
            return size()<=0; 
        }
        
        public virtual Set keySet() { return null; }
        public virtual System.Object put(System.Object key, System.Object value) { return null; }
        public virtual void putAll(Map m) {}
        public virtual System.Object remove(System.Object key) { return null; }
        public virtual int size() { return 0; }
        public virtual Collection values() { return null; }
	}	
}

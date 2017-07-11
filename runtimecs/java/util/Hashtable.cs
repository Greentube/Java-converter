namespace java.util 
{
	public class Hashtable : AbstractMap
	{
        public Hashtable() : base() {
        }
        
        public Hashtable(Map m) : base(m) {
        }
        
        public Hashtable clone() {
            return new Hashtable(this);
        }
    
        public bool contains(System.Object value) {
            return this.containsValue(value);
        }
        
        public Enumeration elements() {
            return new IteratorEnumeration(this.values().iterator());
        }
    
        public Enumeration keys() {
            return new IteratorEnumeration(this.keySet().iterator());
        }        
	}	
}

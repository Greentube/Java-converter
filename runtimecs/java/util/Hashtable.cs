namespace java.util 
{
	public class Hashtable : HashMap
	{
        public Hashtable() : base() {
        }
        
        public Hashtable(Map m) : base(m) {
        }
        
        public virtual Hashtable clone() {
            return new Hashtable(this);
        }
    
        public virtual bool contains(System.Object value) {
            return this.containsValue(value);
        }
        
        public virtual Enumeration elements() {
            return new HashMapIterator(this,false);
        }
    
        public virtual Enumeration keys() {
            return new HashMapIterator(this,true);
        }          
	}	
}

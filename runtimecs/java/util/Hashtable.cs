namespace java.util 
{
	public class Hashtable : HashMapImpl
	{
        public Hashtable() : base() {
        }
        
        public Hashtable(Map m) : base(m) {
        }
        
        public virtual System.Object clone() {
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

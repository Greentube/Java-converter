namespace java.util 
{
	public interface Enumeration
	{
		bool hasMoreElements();		
		System.Object nextElement();
	}	
    
    
    class IteratorEnumeration : Enumeration
    {
        private Iterator iterator;
        
        public IteratorEnumeration(Iterator i) {
            iterator = i;
        }
        
        public virtual bool hasMoreElements() {
            return iterator.hasNext();
        }
        
        public virtual System.Object nextElement() {
            return iterator.next();
        }
    }      
}

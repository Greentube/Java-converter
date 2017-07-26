namespace java.util 
{
	public class IteratorEnumeration : Enumeration
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
        

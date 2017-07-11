namespace java.util 
{
	public class IteratorEnumeration : Enumeration
	{
        private Iterator iterator;
        
        public IteratorEnumeration(Iterator i) {
            iterator = i;
        }
        
        public bool hasMoreElements() {
            return iterator.hasNext();
        }
        
        public System.Object nextElement() {
            return iterator.next();
        }
    }        
}
        

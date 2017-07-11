namespace java.util 
{
	public abstract class AbstractList : AbstractCollection
	{
        private System.Object[] buffer;
        private int len;
        
        public AbstractList() {
            buffer = new System.Object[8];
            len = 0;
        }
        
        public AbstractList(Collection collection) {
            buffer = new System.Object[8];
            len = 0;            
            addAll(collection);
        }
        
        public bool add(System.Object e) { 
            ensureCapacity(len+1);
            buffer[len++] = e;
            return true; 
        }
        
        public void add(int index, System.Object element) {}
        
        public bool addAll(Collection c) {
            bool didadd=false;
            for (Iterator i=c.iterator(); i.hasNext();) {
                add(i.next());
                didadd=true;
            }
            return didadd;
        }
        
        public bool addAll(int index, Collection c) { return true; }
        public void clear() {}
        public System.Object get(int index) { return null; }
        public int indexOf(System.Object o) { return 0; }
        
        public override Iterator iterator() { 
            return new CSArrayIterator(buffer,0,len); 
        }
        
        public int lastIndexOf(System.Object o) { return 0; }
        public System.Object remove(int index) { return 0; }
        public bool remove(System.Object o) { return false; }
        public bool removeAll(Collection c) { return false; }
        public bool retainAll(Collection c) { return false; }
        public System.Object set(int index, System.Object element) { return null; }
        
        private void ensureCapacity(int c) {
            
        }
	}	
}

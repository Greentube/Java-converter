namespace java.util 
{
	public abstract class AbstractList : AbstractCollection, List
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
        
        public virtual bool add(System.Object e) { 
            ensureCapacity(len+1);
            buffer[len++] = e;
            return true; 
        }
        
        public virtual void add(int index, System.Object element) {}
        
        public virtual bool addAll(Collection c) {
            bool didadd=false;
            for (Iterator i=c.iterator(); i.hasNext();) {
                add(i.next());
                didadd=true;
            }
            return didadd;
        }
        
        public virtual bool addAll(int index, Collection c) { return true; }
        public virtual void clear() {}
        public virtual System.Object get(int index) { return null; }
        public virtual int indexOf(System.Object o) { return 0; }
        
        public override Iterator iterator() { 
            return new CSArrayIterator(buffer,0,len); 
        }
        
        public virtual int lastIndexOf(System.Object o) { return 0; }
        public virtual System.Object remove(int index) { return 0; }
        public virtual bool remove(System.Object o) { return false; }
        public virtual bool removeAll(Collection c) { return false; }
        public virtual bool retainAll(Collection c) { return false; }
        public virtual System.Object set(int index, System.Object element) { return null; }
        
        private void ensureCapacity(int c) {
            
        }
	}	
}

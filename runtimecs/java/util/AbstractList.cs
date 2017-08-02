namespace java.util 
{
	public abstract class AbstractList : AbstractCollection, List
	{
        
        public AbstractList() {
        }
        
        // must be implemented by a modifiable subclass
        public abstract System.Object get(int index);
        public abstract System.Object set(int index, System.Object element);        
        public abstract void add(int index, System.Object element);
        public abstract System.Object remove(int index);        
        // int size() 

        // add functionality on top of the subclass implementation        
        public virtual bool add(System.Object e) { 
            add(size(), e);
            return true;
        }           
        
        public virtual bool addAll(Collection c) {
            return addAll(size(), c);
        }
        
        public virtual bool addAll(int index, Collection c) { 
            Iterator i = c.iterator();
            int pos = index;
            bool didappend = false;
            while (i.hasNext()) {
                this.add(pos++, i.next());
                didappend = true;
            }        
            return didappend;
        }               
        
        public virtual void clear() {           
            for (int i=size()-1; i>=0; i--) {
                remove(i);
            }
        }
        
        public override bool Equals(System.Object b) {
            if (b==null || ! (b is List)) return false;
            int s = this.size();
            List l = (List) b;
            if (s!=l.size()) {
                return false;
            }
            for (int i=0; i<s; i++) {
                System.Object e1 = this.get(i);
                System.Object e2 = l.get(i);
                if (! (e1==null ? e2==null : e1.Equals(e2))) return false;
            }
            return true;  
        }
                
        public override int GetHashCode() {
            int hashCode = 1;
            int s = size();
            for (int i=0; i<s; i++) {
                System.Object e = get(i);
                hashCode = ( 31*hashCode + (e==null ? 0 : e.GetHashCode()) ) & (-1);
            }
            return hashCode;            
        }
        
        public virtual int indexOf(System.Object o) { 
            int s = size();
            for (int i=0; i<s; i++) {
                if (o==null ? (get(i)==null) : o.Equals(get(i))) return i;
            }
            return -1;
        }
        
        public override Iterator iterator() { 
            return new AbstractListIterator(this); 
        }
        
        public virtual int lastIndexOf(System.Object o) { 
            for (int i=size()-1; i>=0; i--) {
                if (o==null ? (get(i)==null) : o.Equals(get(i))) return i;
            }
            return -1;
        }
        
        public virtual bool remove(System.Object o) { 
            int idx = indexOf(o);
            if (idx<0) return false;
            remove(idx);
            return true; 
        }
        
        public virtual bool removeAll(Collection c) { 
            return filter(c,false); 
        }
        
        public virtual bool retainAll(Collection c) {
            return filter(c,true); 
        }
 
        private bool filter(Collection collection, bool keep) {
            bool modified=false;
            for (int i=size()-1; i>=0; i--) {
                System.Object o = get(i);
                bool c = collection.contains(o);
                if ((c && !keep) || (!c && keep)) {
                    remove(i);
                    modified = true;
                }
            }
            return modified;
        }   


        class AbstractListIterator : Iterator 
        {
            AbstractList list;
            int n;
            
            public AbstractListIterator(AbstractList list) {
                this.list = list;
                this.n = 0;
            }
            
            public bool hasNext() {
                return n < list.size();
            }
        
            public System.Object next() {
                return list.get(n++);
            }
            
            public void remove() {
                list.remove(n-1);
                n--;
            }
        }        
	}	
}

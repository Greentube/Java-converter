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
            buffer[len] = e;
            len++;
            return true; 
        }
        
        public virtual void add(int index, System.Object element) {
            ensureCapacity(len+1);            
            if (index<len) {
                System.Array.Copy(buffer, index, buffer, index+1, len-index);
            }
            buffer[index] = element;
            len++;
        }
        
        public virtual bool addAll(Collection c) {
            bool didadd=false;
            for (Iterator i=c.iterator(); i.hasNext();) {
                add(i.next());
                didadd=true;
            }
            return didadd;
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
            len = 0;
            if (buffer.Length>100) buffer = new System.Object[8];
        }
        
        public override bool Equals(System.Object b) {
            if (b==null || ! (b is List)) return false;
            int s = this.size();
            List l = (List) b;
            if (s!=l.size()) {
                return false;
            }
            for (int i=0; i<s; i++) {
                System.Object e1 = buffer[i];
                System.Object e2 = l.get(i);
                if (! (e1==null ? e2==null : e1.Equals(e2))) return false;
            }
            return true;  
        }
        
        public virtual System.Object get(int index) { 
            return buffer[index];
        }
        
        public override int GetHashCode() {
            int hashCode = 1;
            for (Iterator it=this.iterator(); it.hasNext(); ) {
                System.Object e = it.next();
                hashCode = ( 31*hashCode + (e==null ? 0 : e.GetHashCode()) ) & (-1);
            }
            return hashCode;            
        }
        
        public virtual int indexOf(System.Object o) { 
            for (int i=0; i<buffer.Length; i++) {
                if (o==null ? (buffer[i]==null) : o.Equals(buffer[i])) return i;
            }
            return -1;
        }
        
        public override Iterator iterator() { 
            return new CSArrayIterator(buffer,0,len); 
        }
        
        public virtual int lastIndexOf(System.Object o) { 
            for (int i=buffer.Length-1; i>=0; i--) {
                if (o==null ? (buffer[i]==null) : o.Equals(buffer[i])) return i;
            }
            return -1;
        }
        
        public virtual System.Object remove(int index) { 
            System.Object prev = buffer[index];
            if (index<len-1) {
                System.Array.Copy(buffer, index+1, buffer, index, len-1-index);
            }
            len--;
            return prev;
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
        
        public virtual System.Object set(int index, System.Object element) { 
            System.Object prev = buffer[index];
            buffer[index] = element;
            return prev; 
        }
        
        public override int size() {
            return len;
        }
 
        private bool filter(Collection collection, bool keep) {
            int fill = 0;
            for (int i=0; i<buffer.Length; i++) {
                System.Object o = buffer[i];
                bool c = collection.contains(o);
                if ((c && keep) || (!c && !keep)) {
                    buffer[fill] = 0;
                    fill++;
                }
            }
            if (fill!=len) {
                len = fill;
                return true;
            } else {
                return false;
            }
        }                
                
        private void ensureCapacity(int c) {
            if (buffer.Length<c) {                 
                int newc = buffer.Length;
                while (newc<c) newc=newc*2;
                System.Object[] newbuffer = new System.Object[newc];
                System.Array.Copy(buffer,0, newbuffer,0, len);
                buffer = newbuffer;
            }
        }
	}	
}

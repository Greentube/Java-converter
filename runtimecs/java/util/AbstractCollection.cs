namespace java.util {
    using java.lang;
    
	public abstract class AbstractCollection : Collection
	{
        public virtual bool contains(System.Object obj)
        {
            Iterator i = this.iterator();
            while (i.hasNext()) {
                System.Object o = i.next();
                if (obj==null ? o==null : obj.Equals(o)) return true;
            }
            return false;
        }
        
        public virtual bool containsAll(Collection c) {
            Iterator i = c.iterator();
            while (i.hasNext()) {
                if (!this.contains(i.next())) return false;
            }
            return true;            
        }

        // Equals        // default object behaviour
        // GetHashCode   // default object behaviour        
        
        public virtual bool isEmpty() {
            return size() <= 0;
        }
        
        public abstract Iterator iterator();        
        public abstract int size();
        
        public virtual System.Object[] toArray() {
            System.Object[] a = new System.Object[size()];
            int cursor=0;
            for (Iterator i=this.iterator(); i.hasNext(); ) {
                a[cursor++] = i.next();
            }
            return a;        
        }
                
        public override System.String ToString() {
            System.Text.StringBuilder b = new System.Text.StringBuilder("[");
            bool first=true;
            for (Iterator i=this.iterator(); i.hasNext(); ) {
                if (!first) b.Append(", ");
                first=false;
                System.Object o = i.next();
                b.Append((o==null) ? "null" : o.ToString());
            }
            b.Append("]");
            return b.ToString();
        }
	}	
    
}

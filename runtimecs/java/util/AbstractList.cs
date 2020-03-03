using java.lang;

namespace java.util 
{ 
    public abstract class AbstractList : AbstractCollection, List
    {       
        // must be implemented by a modifiable subclass
        public abstract object get(int index);
        public abstract object set(int index, object element);        
        public abstract void add(int index, object element);
        public abstract object remove(int index);        
     
        // add functionality on top of the subclass implementation        
        public override bool add(object e) 
        {   
            add(size(), e);
            return true;
        }           
                    
        public virtual bool addAll(int index, Collection c) 
        {   
            Iterator i = c.iterator();
            int pos = index;
            bool didappend = false;
            while (i.hasNext()) 
            {   
                this.add(pos++, i.next());
                didappend = true;
            }        
            return didappend;
        }               
        
        
        // OPTIMIZATION
        public override void clear() 
        {   
            for (int i=size()-1; i>=0; i--) 
            {   remove(i);
            }
        }
            
        public override bool Equals(object b) 
        {   
            if (b==null || ! (b is List)) { return false; }
            int s = this.size();
            List l = (List) b;
            if (s!=l.size()) 
            {   
                return false;
            }
            for (int i=0; i<s; i++) 
            {   
                object e1 = this.get(i);
                object e2 = l.get(i);
                if (! (e1==null ? e2==null : e1.Equals(e2))) { return false; }
            }
            return true;  
        }
                    
        public override int GetHashCode() 
        {   
            int hashCode = 1;
            int s = size();
            for (int i=0; i<s; i++) 
            {   
                object e = get(i);
                hashCode = ( 31*hashCode + (e==null ? 0 : e.GetHashCode()) ) & (-1);
            }
            return hashCode;            
        }
            
        public virtual int indexOf(object o) 
        {   
            int s = size();
            for (int i=0; i<s; i++) 
            {   
                if (o==null ? (get(i)==null) : o.Equals(get(i))) { return i; }
            }
            return -1;
        }
            
        public override Iterator iterator() 
        {   
            return new AbstractListIterator(this); 
        }
            
        public virtual int lastIndexOf(object o) 
        {   
            for (int i=size()-1; i>=0; i--) 
            {   
                if (o==null ? (get(i)==null) : o.Equals(get(i))) { return i; }
            }
            return -1;
        }       
        
        
        // OPTIMIZATION
        public override bool remove(object o)
        {
            int idx = indexOf(o);
            if (idx>=0) 
            { 
                remove(idx); 
                return true;
            }
            return false; 
        }
           

        public virtual void replaceAll(java.util.function.UnaryOperator unaryoperator)
        {   
            java.util.List_0009.replaceAll(this,unaryoperator);        
        }

        public virtual void sort(java.util.Comparator c)
        {   
            java.util.List_0009.sort(this,c);
        }    
    }
        
    class AbstractListIterator : Iterator, Enumeration 
    {
        private readonly AbstractList list;
        private int n;

        public AbstractListIterator(AbstractList list) 
        {   
            this.list = list;
            this.n = 0;
        }

        public bool hasNext() 
        {   
            return n < list.size();
        }

        public object next() 
        {   
            if (n>=list.size()) { throw new NoSuchElementException(); }
            object v = list.get(n);  
            n++;
            return v;    
        }

        public void remove() 
        {   
            int before = n-1;
            if (before<0) { throw new IllegalStateException(); }
            list.remove(before);        
            n=before;
        }

        public bool hasMoreElements() 
        {
            return hasNext();
        }            
        
        public object nextElement() 
        {   
            return next();
        }
    }
}

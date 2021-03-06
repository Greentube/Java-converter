using java.lang;

namespace java.util 
{
    public abstract class AbstractCollection : Collection
    {
        public virtual bool add(object obj)
        {
            throw new UnsupportedOperationException();
        }
        
        public virtual bool addAll(Collection c)
        {   
            Iterator i = c.iterator();
            bool didappend = false;
            while (i.hasNext()) 
            {   
                if (this.add(i.next()))
                {   didappend = true;
                }
            }        
            return didappend;
        }
        
        public virtual void clear()
        {
            java.util.Iterator i = iterator();
            while (i.hasNext()) 
            {   
                i.next();
                i.remove();
            }
        }
        
        public virtual bool contains(object obj)
        {   
            Iterator i = this.iterator();
            while (i.hasNext()) 
            {   
                object o = i.next();
                if (obj==null ? o==null : obj.Equals(o)) { return true; }
            }
            return false;
        }
            
        public virtual bool containsAll(Collection c) 
        {   
            Iterator i = c.iterator();
            while (i.hasNext()) 
            {   
                if (!this.contains(i.next())) { return false; }
            }
            return true;            
        }

        // Equals        // default object behaviour

        public virtual bool remove(object o)
        {
            java.util.Iterator i = iterator();
            while (i.hasNext()) 
            {   
                object e = i.next();
                if (o==null ? e==null : o.Equals(e)) 
                {   
                    i.remove();
                    return true;
                }
            }
            return false;                        
        }
        
        public virtual bool removeIf(java.util.function.Predicate predicate)
        {   
            return java.util.Collection_0009.removeIf(this,predicate);
        }
        
        public virtual bool removeAll(Collection c)
        {
            java.util.Iterator i = iterator();
            bool didremove = false;
            while (i.hasNext()) 
            {   
                object o = i.next();
                if (c.contains(o)) 
                {   
                    didremove = true;
                    i.remove();
                }
            }
            return didremove;        
        }
        
        public virtual bool retainAll(Collection c)
        {
            java.util.Iterator i = iterator();
            bool didremove = false;
            while (i.hasNext()) 
            {   
                object o = i.next();
                if (!c.contains(o)) 
                {   
                    didremove = true;
                    i.remove();
                }
            }
            return didremove;        
        }
            
        // GetHashCode   // default object behaviour        
            
        public virtual bool isEmpty() 
        {       
            return size() <= 0;
        }
            
        public abstract Iterator iterator();        
        public abstract int size();
            
        public virtual object[] toArray() 
        {   
            object[] a = new object[size()];
            int cursor=0;
            for (Iterator i=this.iterator(); i.hasNext(); ) 
            {   
                a[cursor++] = i.next();
            }
            return a;        
        }
        public virtual object[] toArray(object[] ta) 
        {   
            object[] a = (object[]) 
            System.Array.CreateInstance(ta.GetType().GetElementType(),size());
            int cursor=0;
            for (Iterator i=this.iterator(); i.hasNext(); ) 
            {   
                a[cursor++] = i.next();
            }
            return a;        
        }
                    
        public override string ToString() 
        {   
            System.Text.StringBuilder b = new System.Text.StringBuilder("[");
            bool first=true;
            for (Iterator i=this.iterator(); i.hasNext(); ) 
            {       
                if (!first) { b.Append(", "); }
                first=false;
                object o = i.next();
                b.Append((o==null) ? "null" : o.ToString());
            }
            b.Append("]");
            return b.ToString();
        }
        
        // redirect default interface method
        public virtual void forEach(java.util.function.Consumer consumer)
        {   
            Iterable_0009.forEach(this,consumer);
        }
    }
}

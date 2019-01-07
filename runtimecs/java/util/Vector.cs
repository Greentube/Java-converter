namespace java.util { public class Vector: ArrayListImpl
{        
    public Vector() : base() 
    {
    }
        
    public Vector(Collection collection) : base(collection) 
    {
    }
    
    // add locking to existing implementations 
    public override System.Object get(int index) 
    {   lock(this) { return base.get(index); }
    }

    public override System.Object set(int index, System.Object element) 
    {   lock(this) { return base.set(index,element); }
    }
        
    public override void add(int index, System.Object element) 
    {   lock(this) { base.add(index,element); }
    }

    public override System.Object remove(int index) 
    {   lock(this) { return base.remove(index); }
    }
        
    public override int size() 
    {   lock(this) { return base.size(); }
    }
        
    public override void trimToSize() 
    {   lock(this) { base.trimToSize(); }
    }
        
    public override bool add(System.Object e) 
    {   lock(this) { return base.add(e); }
    }
        
    public override void clear() 
    {   lock(this) { base.clear(); }
    }                
        
    public override System.Object[] toArray() 
    {   lock(this) { return base.toArray(); }
    }       
    
    public override System.Object[] toArray(System.Object[]a)
    {   lock(this) { return base.toArray(a); }
    }
    
    
    // methods only available for Vector    
    
    public virtual void addElement(System.Object o) 
    {   lock(this) { base.add(o); }
    }
    
    public virtual System.Object Clone() 
    {   lock(this) { return new Vector(this); }
    }

    public virtual void copyInto(System.Object[] array)
    {   lock (this)
        {   for (int i=0; i<base.size(); i++)
            {   array[i] = base.get(i);
            }
        }
    }
   
    public virtual System.Object elementAt(int i) 
    {   lock(this) { return base.get(i); }
    }

    public virtual Enumeration elements() 
    {   lock(this) { return new AbstractListIterator(this); }
    }

    public virtual System.Object firstElement() 
    {   lock(this) { return base.get(0); }
    }

    public virtual int indexOf(System.Object o, int index) 
    {   lock(this)
        {   for (int i=index; i<base.size(); i++) 
            {   if (o==null ? (base.get(i)==null) : o.Equals(base.get(i))) return i;
            }
        }
        return -1;
    }

    public virtual void insertElementAt(System.Object o, int index) 
    {   lock(this) { base.add(index,o); }
    }
  
    public virtual System.Object lastElement() 
    {   lock(this) { return base.get(base.size()-1); }
    }

    public virtual int lastIndexOf(System.Object o, int index) 
    {   lock(this)
        {   for (int i=index; i>=0; i--) 
            {   if (o==null ? (base.get(i)==null) : o.Equals(base.get(i))) return i;
            }
        }
        return -1;
    }

    public virtual void removeAllElements() 
    {   lock(this) { base.clear(); }
    }

    public virtual bool removeElement(System.Object o) 
    {   lock(this)
        {   int idx = indexOf(o);
            if (idx>=0) 
            {   base.remove(idx);
                return true;
            } 
            else 
            {   return false;
            }
        }
    }

    public virtual void removeElementAt(int index) 
    {   lock(this) { base.remove(index); }
    }

    public virtual void setElementAt(System.Object o, int index) 
    {   lock(this) { base.set(index,o); }
    }

    public virtual void setSize(int newsize)
    {     
        lock(this)
        {   if (newsize<=0) 
            {   if (newsize<0) throw new System.IndexOutOfRangeException(); 
                clear();
            } 
            else 
            {   int need = newsize - base.size();
                if (need>0) 
                {   for (int i=0; i<need; i++) base.add(null);
                } 
                else if (need<0) 
                {   for (int i=base.size()-1; i>=newsize; i--) base.remove(i);
                }
            }
        }
    }        
}}

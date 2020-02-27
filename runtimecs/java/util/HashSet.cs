namespace java.util 
{ 
    public class HashSet : AbstractCollection, Set
    {
        private static System.Object PRESENT = new System.Object();
        private readonly HashMap map;
            
        public HashSet() 
        {   
            map = new HashMap();
        }
            
        public HashSet(Collection c) : this() 
        {   
            addAll(c);
        }
            
        public override bool add(System.Object e) 
        {   
            return map.put(e, PRESENT)==null;
        }           

        // OPTIMIZATION    
        public override void clear() 
        {   
            map.clear();
        }
            
        // OPTIMIZATION
        public override bool contains(System.Object e) 
        {   
            return map.containsKey(e);
        }

        // containsAll        implemented by AbstractCollection
                        
        public override bool Equals(System.Object o) 
        {   
            if (o==null || !(o is Set)) { return false; }
            Set s = (Set) o;
            if (size() != s.size()) { return false; }
            for (Iterator it=s.iterator(); it.hasNext(); ) 
            {   if (! contains(it.next())) { return false; }
            }            
            return true; 
        }
                    
        public override int GetHashCode() 
        {   
            return map.keySet().GetHashCode();
        }
            
        // isEmpty       implemented by AbstractCollection
            
        public override Iterator iterator() 
        {   
            return map.keySet().iterator();
        }
        

        // OPTIMIZATION    
        public override bool remove(System.Object key) 
        {   
            return map.remove(key)!=null;
        }
        
        // OPTIMIZATION
        public override bool removeAll(Collection collection) 
        {   
            Iterator i = collection.iterator();
            bool didremove = false;
            while (i.hasNext()) 
            {   
                if (this.remove(i.next())) 
                {   didremove = true;
                }
            }        
            return didremove;            
        }        
            
        public override int size() 
        {   
            return map.size();
        }
           
        // toArray             implemented by AbstractCollection 
        // toArray(Object[])   implemented by AbstractCollection 
        // toString            implemented by AbstractCollection
    }
}

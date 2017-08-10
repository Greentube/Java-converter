namespace java.util 
{
	public class HashSet : AbstractCollection, Set
	{
        private static System.Object PRESENT = new System.Object();
        private HashMap map;
        
        public HashSet() {
            map = new HashMap();
        }
        
        public HashSet(Collection c) : this() {
            addAll(c);
        }
        
        public virtual bool add(System.Object e) { 
            return map.put(e, PRESENT)==null;
        }           
        
        public virtual bool addAll(Collection c) {
            Iterator i = c.iterator();
            bool didappend = false;
            while (i.hasNext()) {
                if (this.add(i.next())) {
                    didappend = true;
                }
            }        
            return didappend;
        }
        
        public virtual void clear() {
            map.clear();
        }
        
        public override bool contains(System.Object e) { 
            return map.containsKey(e);
        }
        
        // containsAll        implemented by AbstractCollection
                    
        public override bool Equals(System.Object o) { 
            if (o==null || !(o is Set)) return false;            
            Set s = (Set) o;
            if (size() != s.size()) return false;
            for (Iterator it=s.iterator(); it.hasNext(); ) {
                if (! contains(it.next())) return false;
            }            
            return true; 
        }
                
        public override int GetHashCode() { 
            return map.keySet().GetHashCode();
        }
        
        // isEmpty       implemented by AbstractCollection
        
        public override Iterator iterator() {
            return map.keySet().iterator();
        }
                
        public virtual bool remove(System.Object key) { 
            return map.remove(key)!=null;
        }
        
        public virtual bool removeAll(Collection collection) {
            Iterator i = collection.iterator();
            bool didremove = false;
            while (i.hasNext()) {
                if (this.remove(i.next())) {
                    didremove = true;
                }
            }        
            return didremove;            
        }
        
        public virtual bool retainAll(Collection collection) {
            Iterator i = this.iterator();
            bool didremove = false;
            while (i.hasNext()) {
                System.Object e = i.next();
                if (!collection.contains(e)) {
                    i.remove();
                    didremove = true;
                }
            }
            return didremove;
        }
        
        public override int size() { 
            return map.size();
        }
        
        // toArray   implemented by AbstractCollection 
        // toString  implemented by AbstractCollection
    }
}

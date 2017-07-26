    namespace java.util 
{
	public class HashSet: AbstractCollection, Set
	{    
        HashMap map;
        
        public HashSet() : base() {
            map = new HashMap();
        }
        
        public HashSet(Collection collection) : base() {
            map = new HashMap();
            for (Iterator it = collection.iterator(); it.hasNext(); ) {
                this.map.put(it.next(), this);
            }            
        }
        
        public virtual bool add(System.Object e) {
            return this.map.put(e,this)==null;
        }
    
        public virtual bool addAll(Collection collection) {
            Iterator i = collection.iterator();
            bool didappend = false;
            while (i.hasNext()) {
                if (this.add(i.next())) {
                    didappend = true;
                }
            }
            return didappend;
        }
    
        public virtual void clear() {
            this.map.clear();
        }
    
        public override bool contains(System.Object e) {
            return this.map.containsKey(e);
        }
    
        // containsAll    implemented by AbstractCollection
    
        public virtual bool Equals_1(Set s) {
            return this.map.keySet().Equals(s);
        }
    
        public override int GetHashCode() {
            return this.map.keySet().GetHashCode();
        }
    
        // isEmpty     implemented by AbstractCollection
    
        public override Iterator iterator() {
            return this.map.keySet().iterator();
        }
    
        public virtual bool remove(System.Object e) {
            return this.map.remove(e)!=null;
        }
        
        public override int size() {
            return this.map.size();
        }
    
        // toArray   implemented by AbstractCollection
        // toString  implemented by AbstractCollection        
	}	
}

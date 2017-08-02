namespace java.util 
{
	public class HashMap : Map
	{
        private System.Collections.Generic.Dictionary<System.Object,System.Object> data;        
        private bool hasNullKey;
        private System.Object valueForNullKey;
        
        public HashMap() {
            data = new System.Collections.Generic.Dictionary<System.Object,System.Object>();
            hasNullKey = false;
            valueForNullKey = null;
        }
        
        public HashMap(Map m) : this() {
            putAll(m);
        }
        
        public virtual void clear() {
            data.Clear();
            hasNullKey = false;
            valueForNullKey = null;
        }
        
        public virtual bool containsKey(System.Object key) { 
            if (key==null) {
                return hasNullKey;
            } else {
                return data.ContainsKey(key);
            }
        }
        
        public virtual bool containsValue(System.Object value) { 
            if (hasNullKey) {
                if (value==null) {
                    if (valueForNullKey==null) return true;
                } else {
                    if (value.Equals(valueForNullKey)) return true;
                }
            }
            return data.ContainsValue(value);
        }
            
        public override bool Equals(System.Object o) { 
            if (o==null || !(o is Map)) return false;            
            Map m = (Map) o;
            if (size() != m.size()) return false;
            for (Iterator it=keySet().iterator(); it.hasNext(); ) {
                System.Object k = it.next();
                if (! m.containsKey(k)) return false;
                System.Object v1 = get(k);
                System.Object v2 = m.get(k);
                if (! (v1==null ? v2==null : v1.Equals(v2)) ) return false;
            }            
            return true; 
        }
        
        public virtual System.Object get(System.Object key) {
            if (key==null) {
                return valueForNullKey;
            }
            System.Object v;
            data.TryGetValue(key, out v);
            return v;
        }
        
        public override int GetHashCode() { 
            int sum = 0;
            for (Iterator it=this.keySet().iterator(); it.hasNext(); ) {
                System.Object k = it.next();
                System.Object v = get(k);
                int c = (k==null ? 0 : k.GetHashCode()) ^
                        (v==null ? 0 : v.GetHashCode());
                sum = (sum + c) & -1;
            }
            return sum;        
        }
        
        public virtual bool isEmpty() {
            return size()<=0; 
        }
        
        public virtual Collection keySet() { 
            return new MapKeyView(this);
        }
        
        public virtual System.Object put(System.Object key, System.Object value) 
        { 
            if (key==null) {
                System.Object prev = valueForNullKey;
                hasNullKey = true;
                valueForNullKey = value;
                return prev;
            } else {
                System.Object prev;
                data.TryGetValue(key, out prev);
                data[key] = value;
                return prev;
            }
        }
        
        public virtual void putAll(Map m) {
            for (Iterator it=m.keySet().iterator(); it.hasNext(); ) {
                System.Object key = it.next();
                this.put(key, m.get(key));
            }
        }
        
        public virtual System.Object remove(System.Object key) { 
            if (key==null) {
                if (!hasNullKey) {
                    return null;
                } else {
                    System.Object prev = valueForNullKey;
                    hasNullKey = false;
                    valueForNullKey = null;
                    return prev;
                }
            } else {
                System.Object prev;
                if (data.TryGetValue(key, out prev)) {
                    data.Remove(key);
                }
                return prev;
            }
        }
        
        public virtual int size() { 
            return data.Count + (hasNullKey ? 1:0); 
        }
        
        public override System.String ToString() {
            System.Text.StringBuilder b = new System.Text.StringBuilder("{");
            bool first=true;
            for (Iterator it=keySet().iterator(); it.hasNext(); ) {
                System.Object k = it.next();
                System.Object v = get(k);
                if (first) {
                    first=false;
                } else {
                    b.Append(", ");
                }
                b.Append(k==null ? "null" : k.ToString());
                b.Append("=");
                b.Append(v==null ? "null" : v.ToString());
            }
            b.Append("}");
            return b.ToString();
        }

        public virtual Collection values() { 
            return new MapValueView(this);
        }        
		
        
        class MapKeyView : AbstractCollection {        
            private HashMap map;
             
            public MapKeyView(HashMap m) 
            {
                this.map = m;
            }     

            public override bool contains(System.Object o) {
                return map.containsKey(o);
            }      
            
            // containsAll_1                   // implemented by AbstractCollection

            public override bool Equals(System.Object o) {
                if (o==null || !(o is MapKeyView)) return false;
                MapKeyView c = (MapKeyView) o;
                if (size() != c.size()) return false;
                for (Iterator it=iterator(); it.hasNext(); ) {
                    if (!c.map.containsKey(it.next())) return false;
                }
                return true;
            }

            public override int GetHashCode() {
                int h = 0;
                for (Iterator it=iterator(); it.hasNext(); ) {
                    System.Object e = it.next();
                    h = (h + (e==null ? 0 : e.GetHashCode())) & -1;
                }
                return h;
            }
            
            // boolean	isEmpty()              // implemented by AbstractCollection
            
            public override Iterator iterator() {
                int s = map.size();
                System.Object[] keys = new System.Object[s];
                map.data.Keys.CopyTo(keys,0);
                return new MapIterator(map, keys, true);
            }
            
            public override int size() {
                return map.size();
            }
            
            // Object[]	toArray()              // implemented by AbstractCollection        
        }
        
        class MapValueView : AbstractCollection {
            private HashMap map;

            public MapValueView(HashMap m) 
            {
                this.map = m;
            }        
            
            public override bool contains(System.Object o) {
                return map.containsValue(o);
            }      

            // containsAll_1                   // implemented by AbstractCollection
            // boolean	equals(Object o)       // implemented by Object
            // int	hashCode()                 // implemented by Object
            // boolean	isEmpty()              // implemented by AbstractCollection
            
            public override Iterator iterator() {
                int s = map.size();
                System.Object[] keys = new System.Object[s];
                map.data.Keys.CopyTo(keys,0);
                return new MapIterator(map, keys, false);
            }
            
            public override int size() {
                return map.size();
            }       
            
            // Object[]	toArray()              // implemented by AbstractCollection        
        }
        
        class MapIterator : Iterator {
            Map map;
            System.Object[] keys;
            bool deliverKeys;
            int n;
            
            public MapIterator(Map map, System.Object[] keys, bool deliverKeys) {
                this.map = map;
                this.keys = keys;
                this.deliverKeys = deliverKeys;
                this.n = 0;
            }
            
            public bool hasNext() {
                return n<keys.Length;
            }
            
            public System.Object next() {
                System.Object k = keys[n];
                n++;                
                return deliverKeys ? k : map.get(k);
            }
            
            public void remove() {
                map.remove(keys[n-1]);
            }
        }    
    }
}

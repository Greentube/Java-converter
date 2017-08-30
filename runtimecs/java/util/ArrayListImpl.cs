namespace java.util 
{
	public class ArrayListImpl: AbstractList
	{        
        private System.Object[] buffer;
        private int len;
    
        public ArrayListImpl() : base() {
            buffer = new System.Object[10];
            len = 0;            
        }
        
        public ArrayListImpl(Collection collection) : this() {
            addAll(collection);
        }
        
        // implement to satisfy AbstractList requirements
        public override System.Object get(int index) { 
            if (index<0 || index>=len) throw new System.IndexOutOfRangeException();
            return buffer[index];
        }

        public override System.Object set(int index, System.Object element) { 
            if (index<0 || index>=len) throw new System.IndexOutOfRangeException();
            System.Object prev = buffer[index];
            buffer[index] = element;
            return prev; 
        }
        
        public override void add(int index, System.Object element) {
            if (index<0 || index>len) throw new System.IndexOutOfRangeException();
            if (len>=buffer.Length) {
                System.Object[] newbuffer = new System.Object[buffer.Length*2];
                System.Array.Copy(buffer,0, newbuffer,0, buffer.Length);
                buffer = newbuffer;
            }            
            if (index<len) {
                System.Array.Copy(buffer, index, buffer, index+1, len-index);
            }
            buffer[index] = element;
            len++;
        }

        public override System.Object remove(int index) { 
            if (index<0 || index>=len) throw new System.IndexOutOfRangeException();        
            System.Object prev = buffer[index];
            if (index<len-1) {
                System.Array.Copy(buffer, index+1, buffer, index, len-1-index);
            }
            buffer[--len] = null;  // remove garbage reference
            return prev;
        }
        
        public override int size() {
            return len;
        }
        
        // extra operations on ArrayList
        public virtual void trimToSize() {
            if (len < buffer.Length) {
                System.Object[] newbuffer = new System.Object[len];
                System.Array.Copy(buffer,0, newbuffer,0, len);
                buffer = newbuffer;
            }            
        }
        
        // overrides that can speed up certain operations
        public override bool add(System.Object e) { 
            if (len>=buffer.Length) {
                System.Object[] newbuffer = new System.Object[buffer.Length*2];
                System.Array.Copy(buffer,0, newbuffer,0, buffer.Length);
                buffer = newbuffer;
            }            
            buffer[len++] = e;
            return true;
        }
        
        public override void clear() {   
            for (int i=0; i<len; i++) {     // remove garbage references
                buffer[i] = null;
            }
            len = 0;
        }                
        
        public override System.Object[] toArray() {
            System.Object[] copy = new System.Object[len];
            System.Array.Copy(buffer,0,copy,0,len);
            return copy;
        }        
	}	
}

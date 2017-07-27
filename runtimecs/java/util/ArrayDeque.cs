namespace java.util 
{
	public class ArrayDeque : AbstractCollection, Deque
	{        
        public ArrayDeque() {
        }
        
        public ArrayDeque(Collection collection) {
            addAll(collection);
        }
        
        public virtual bool add(System.Object obj) {
            this.addLast(obj);
            return true;
        }
   
        public virtual bool addAll(Collection collection) {
            bool didappend = false;
            for (Iterator i = collection.iterator(); i.hasNext(); ) {
                this.addLast(i.next());
                didappend = true;
            }
            return didappend;
        }
    
        public virtual void addFirst(System.Object obj) {
        }
   
        public virtual void addLast(System.Object obj) {
        }

        public virtual void clear() {
        }
    
        // contains_1:    implemented by AbstractCollection
        // containsAll_1: implemented by AbstractCollection
    
        public virtual Iterator descendingIterator() {
//            return (new java_util_JSArrayIteratorDescending())
//                ._3(this.storage, this.firstindex, this.storage.length);
            return null;
        }
    
        public virtual System.Object element() {
            return this.getFirst();
        }
    
        // equals:  implemented by Object
        // hashCode: implemented by Object
    
        public virtual System.Object getFirst() {
            return null; 
        }
    
        public virtual System.Object getLast() {
            return null;
        }
    
        // isEmpty_0:  implemented by AbstractCollection

        public override Iterator iterator() {
            return null;
//        return (new java_util_JSArrayIterator())
//            ._3(this.storage, this.firstindex, this.storage.length);
        }
    
        public virtual bool offer(System.Object obj) {
            this.addLast(obj);
            return true;
        }
    
        public virtual bool offerFirst(System.Object obj) {
            this.addFirst(obj);
            return true;
        }
    
        public virtual bool offerLast(System.Object obj) {
            this.addLast(obj);
            return true;
        }
    
        public virtual System.Object peek() {
            return this.peekFirst();
        }
    
        public virtual System.Object peekFirst() {
            return null;
//            if (this.firstindex>=this.storage.length) return null;
//            return this.storage[this.firstindex];
        }
    
        public virtual System.Object peekLast() {
            return null;
//        if (this.firstindex>=this.storage.length) return null;
//        return this.storage[this.storage.length-1];
        }
    
        public virtual System.Object poll() {
            return this.pollFirst();
        }
    
        public virtual System.Object pollFirst() {
            return null;
//            if (this.firstindex>=this.storage.length) return null;
//            return this.removeFirst_0();
        }
    
        public virtual System.Object pollLast() {
            return null;
//            if (this.firstindex>=this.storage.length) return null;
//            return this.removeLast_0();
        }
    
        public virtual System.Object pop() {
            return this.removeFirst();
        }
    
        public virtual void push(System.Object obj) {
            this.addFirst(obj);
        }
    
        public virtual System.Object remove() {
            return this.removeFirst();
        }

        //    remove_1:    not implemented
    
        public virtual System.Object removeFirst() {
            return null;
        }        
    
        public virtual System.Object removeLast() {
            return null;
        } 
        
//    removeFirstOccurence_1:   not implemented 
//    removeLastOccurence_1:    not implemented
//    removeAll_1:              not implemented
//    retainAll_1:              not implemented
            
        public override int size() {
            return 0;
        }
	}	
}

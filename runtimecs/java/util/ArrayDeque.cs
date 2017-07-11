namespace java.util 
{
	public abstract class ArrayDeque : AbstractCollection, Deque
	{        
        public ArrayDeque() {
        }
        
        public ArrayDeque(Collection collection) {
            addAll(collection);
        }
        
        public bool add(System.Object obj) {
            this.addLast(obj);
            return true;
        }
   
        public bool addAll(Collection collection) {
            bool didappend = false;
            for (Iterator i = collection.iterator(); i.hasNext(); ) {
                this.addLast(i.next());
                didappend = true;
            }
            return didappend;
        }
    
        public void addFirst(System.Object obj) {
        }
   
        public void addLast(System.Object obj) {
        }

        public void clear() {
        }
    
        // contains_1:    implemented by AbstractCollection
        // containsAll_1: implemented by AbstractCollection
    
        public Iterator descendingIterator() {
//            return (new java_util_JSArrayIteratorDescending())
//                ._3(this.storage, this.firstindex, this.storage.length);
            return null;
        }
    
        public System.Object element() {
            return this.getFirst();
        }
    
        // equals:  implemented by Object
        // hashCode: implemented by Object
    
        public System.Object getFirst() {
            return null; 
        }
    
        public System.Object getLast() {
            return null;
        }
    
        // isEmpty_0:  implemented by AbstractCollection

        public override Iterator iterator() {
            return null;
//        return (new java_util_JSArrayIterator())
//            ._3(this.storage, this.firstindex, this.storage.length);
        }
    
        public bool offer(System.Object obj) {
            this.addLast(obj);
            return true;
        }
    
        public bool offerFirst(System.Object obj) {
            this.addFirst(obj);
            return true;
        }
    
        public bool offerLast(System.Object obj) {
            this.addLast(obj);
            return true;
        }
    
        public System.Object peek() {
            return this.peekFirst();
        }
    
        public System.Object peekFirst() {
            return null;
//            if (this.firstindex>=this.storage.length) return null;
//            return this.storage[this.firstindex];
        }
    
        public System.Object peekLast() {
            return null;
//        if (this.firstindex>=this.storage.length) return null;
//        return this.storage[this.storage.length-1];
        }
    
        public System.Object poll() {
            return this.pollFirst();
        }
    
        public System.Object pollFirst() {
            return null;
//            if (this.firstindex>=this.storage.length) return null;
//            return this.removeFirst_0();
        }
    
        public System.Object pollLast() {
            return null;
//            if (this.firstindex>=this.storage.length) return null;
//            return this.removeLast_0();
        }
    
        public System.Object pop() {
            return this.removeFirst();
        }
    
        public void push(System.Object obj) {
            this.addFirst(obj);
        }
    
        public System.Object remove() {
            return this.removeFirst();
        }

        //    remove_1:    not implemented
    
        public System.Object removeFirst() {
            return null;
        }        
    
        public System.Object removeLast() {
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

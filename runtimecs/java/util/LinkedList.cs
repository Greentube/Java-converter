namespace java.util 
{
	public class LinkedList : AbstractList, Deque
	{           
        // head and tail of doubly linked list and number of elements
        private Node first;
        private Node last;
        private int len;
        
        // cursor into the list 
        // (is always valid if there are _any_ elements, otherwise don't care)
        private Node currentNode;
        private int currentIndex;
        
        public LinkedList() {
            first = null;
            last = null;
            len = 0;
            
            currentNode = null;
            currentIndex = 0;
        }
        
        public LinkedList(Collection collection) : this() {
            addAll(collection);
        }
        
        // implement to satisfy AbstractList requirements
        public override System.Object get(int index) {
            seek(index);
            return currentNode.element;
        }
        
        public override System.Object set(int index, System.Object element) {
            seek(index);
            return currentNode.element = element;
        }
        
        public override void add(int index, System.Object element) {
            Node n = new Node(element);            
            // try to insert after the last
            if (index==len) {
                if (len==0) {  // the list was empty, so insert first element
                    first = n;
                    last = n;
                    currentNode = n;
                    currentIndex = 0;
                    len = 1;
                } else {       // append to end of non-empty list
                    n.prev = last;
                    last.next = n;
                    last = n;
                    len++;
                }
            // insert before the first (list was _not_ empty here) 
            } else if (index==0) {
                n.next = first;
                first.prev = n;
                first = n;
                currentIndex++;
                len++;                
            // insert somewhere in the middle
            } else {   
                seek(index);  // throws exception if there is no node at the index
                // there must be a a node before the currentNode
                n.next = currentNode;
                n.prev = currentNode.prev;
                currentNode.prev.next = n;
                currentNode.prev = n;
                currentIndex++;
                len++;
            }
//            dump();
        }
        
        public override System.Object remove(int index) {
            // try to remove the very first element (could be the only one)
            if (index==0) {
                Node n = first;
                if (len==1) {  // the list gets completely empty
                    first = null;
                    last = null;
                    len = 0;   
                    currentNode = null;
                } else if (len<1) {
                    throw new System.IndexOutOfRangeException(); // attempt to remove from empty list
                } else { // remove only the first node
                    first = n.next;
                    first.prev = null; 
                    if (currentIndex==0) currentNode=first;
                    else currentIndex--;
                    len--;
                }
                return n.element;                
            // try to remove the very last element of a list with at least 2 elements
            } else if (index>0 && index==len-1) {
                Node n = last;
                last = n.prev;
                last.next = null;
                len--;
                if (currentIndex==len) {
                    currentNode=last;
                    currentIndex=len-1;            
                }
                return n.element;
            // remove some arbitrary element 
            // (but not the first or last one, so the list had at least 3 elements)
            } else {                
                seek(index);            
                Node n = currentNode;
                n.prev.next = n.next;
                n.next.prev = n.prev;
                len--;
                currentNode = n.next;
                return n.element;
            }
        }
        
        public override int size() {  
            return len;
        }
        
        private void seek(int index) {
            if (index<0 || index>=len) throw new System.IndexOutOfRangeException();
            if (currentIndex>index) {
                do {
                    currentNode = currentNode.prev;
                    currentIndex--;
                } while (currentIndex>index);
            } else if (currentIndex<index) {
                do {
                    currentNode = currentNode.next;
                    currentIndex++;
                } while (currentIndex<index);
            }            
        }
        
        private void dump() {
            System.Console.Write("LEN: "+len+" CURRENTINDEX: "+currentIndex+ " CURRENT: "
                + (currentNode==null?"null":currentNode.element) + "\n");
            System.Console.Write("FWD:");
            for (Node n=first; n!=null; n=n.next) {
                System.Console.Write(" ");
                System.Console.Write(n.element);
            }
            System.Console.Write("\n");
            System.Console.Write("BCK:");
            for (Node n=last; n!=null; n=n.prev) {
                System.Console.Write(" ");
                System.Console.Write(n.element);
            }
            System.Console.Write("\n");
        }
        
        // methods of the Queue interface that are not already part of the List
        public System.Object element() {
            return get(0);
        }
        public bool offer(System.Object e) {
            add(size(), e);
            return true;
        }
        public System.Object peek() {
            if (size()<1) return null;
            return get(0);
        }
        public System.Object poll() {
            if (size()<1) return null;
            return remove(0);
        }
        public System.Object remove() {
            return remove(0);
        }
                       
        // methods to implement the Deque interface            
        public virtual void addFirst(System.Object obj) {
            add(0,obj);
        }
   
        public virtual void addLast(System.Object obj) {
            add(size(),obj);
        }
        
        public Iterator descendingIterator() {
            return new DescendingIterator(this);
        }

        public virtual System.Object getFirst() {
            return get(0);
        }
    
        public virtual System.Object getLast() {
            return get(size()-1);
        }

        public virtual bool offerFirst(System.Object obj) {
            add(0,obj);
            return true;
        }
    
        public virtual bool offerLast(System.Object obj) {
            add(size(),obj);
            return true;
        }

        public virtual System.Object peekFirst() {
            if (size()<1) return null;
            return get(0);
        }
    
        public virtual System.Object peekLast() {
            if (size()<1) return null;
            return get(size()-1);
        }
        
        public virtual System.Object pollFirst() {
            if (size()<1) return null;
            return remove(0);
        }
    
        public virtual System.Object pollLast() {
            if (size()<1) return null;
            return remove(size()-1);
        }
    
        public virtual System.Object pop() {
            return remove(size()-1);
        }
    
        public virtual void push(System.Object obj) {
            add(size(), obj);
        }
        
        public virtual System.Object removeFirst() {
            return remove(0);
        }        
        
        public bool removeFirstOccurence(System.Object e) {
            int i = indexOf(e);
            if (i<0) return false;
            remove(i);
            return true;
        }
    
        public virtual System.Object removeLast() {
            return remove(size()-1);
        } 
        
        public bool removeLastOccurence(System.Object e) {
            int i = lastIndexOf(e);
            if (i<0) return false;
            remove(i);
            return true;            
        }     


        class Node {            
            public System.Object element;
            public Node prev;
            public Node next; 

            public Node(System.Object element) {
                this.element = element;
                prev = null;
                next = null;
            }
        }
        
        class DescendingIterator : Iterator 
        {
            LinkedList list;
            int n;
            
            public DescendingIterator(LinkedList list) {
                this.list = list;
                this.n = list.size()-1;
            }
            
            public bool hasNext() {
                return n >= 0;
            }
        
            public System.Object next() {
                return list.get(n--);
            }
            
            public void remove() {
                list.remove(n+1);
            }
        }        
        
	}	
}

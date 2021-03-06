using java.lang;

namespace java.util 
{
    public class LinkedList : AbstractList
    {
        // Implementation of a doubly linked list.
        // Because the list will be used with random access methods (get,set,etc.) when using Iterators,
        // an internal "currentNode" will be maintained to quickly find elements that are near
        // previously accessed nodes. 
        // In the java implementation this problem was solved by having a special Iterator implementation instead.
        
        // head and tail of doubly linked list. this element is itself not
        // part of the list, but is needed to complete the circle. 
        private Node head;
        // number of elements currently in the list
        private int len;
        
        // cursor into the list for fast sequential access. since there is
        // always at least the "head" node present, currentNode is 
        // never null
        private Node currentNode;
        // the position of the currentNode in the list. possible range is -1
        // to size()-1. in the case of -1, the currentNode will point to the "head" element.
        private int currentIndex;
        
        public LinkedList() 
        {   
            Node h = new Node(null);
            h.next = h;
            h.prev = h;
            this.head = h;
            this.len = 0;
            this.currentNode = h;
            this.currentIndex = -1;
        }
        
        public LinkedList(Collection collection) : this() 
        {   
            addAll(collection);
        }
        
        // implement to satisfy AbstractList requirements
        public override object get(int index) 
        {   
            return seek(index).element;
        }
        
        public override object set(int index, object element) 
        {   
            Node n = seek(index);
            object prev = n.element;
            n.element = element;
            return prev;
        }
        
        public override void add(int index, object element) 
        {   
            Node n = new Node(element);
            Node y;
            if (index==len) 
            {   
                y = head;
            }
            else
            {   
                y = seek(index); 
                if (currentIndex>=index) { currentIndex++; }
            }
            Node x = y.prev;
            n.prev = x;
            n.next = y;
            x.next = n;
            y.prev = n;
            len++;            
            return;
        }
               
        public override object remove(int index) 
        {   
            Node n = seek(index);
            Node x = n.prev;
            Node y = n.next;
            x.next = y;
            y.prev = x;
            len--;
            if (currentIndex>=index) 
            {   
                if (currentIndex==index) 
                {   
                    currentNode = x;
                }    
                currentIndex--;
            }
            return n.element;
        }
        
        public override int size() 
        {   
            return len;
        }
        
        // Find the node in the list given by its index.
        // when the node is somewhere in the middle (not first or last), the 
        // pointer to this node will be memorized to quickly find nearby nodes 
        // in later requests.
        // To save retrieval time, the node will be searched from either the start,
        // the end or from the currentNode - whichever is nearer.
        // Even the special "head" object can be retrieved by given len as index.
        private Node seek(int index) 
        {   
            if (index<0 || index>=len) { throw new IndexOutOfBoundsException(); }
            if (index==0) { return head.next; }
            if (index==len-1) { return head.prev; }
            
            // decide in which direction to traverse the list
            int ci = currentIndex;
            // the target node is already found
            if (index==ci) { return currentNode; }
            
            Node n = null;
            // the target node is before the current one
            if (index<ci) 
            {   
                // it is nearer to search from start
                if (index <= ci-index) 
                {   
                    n = head.next;
                    for (int i=0; i<index; i++) 
                    {   
                        n = n.next;
                    }
                }
                // it is nearer to search from the current
                else             
                {   
                    n = currentNode;
                    for (int i=currentIndex; i>index; i--) 
                    {   
                        n = n.prev;
                    }                    
                }
            } 
            // the target node is after the current one
            else
            {   
                // it is nearer to search from the current
                if (index-ci <= len-index) 
                {   
                    n = currentNode;
                    for (int i=ci; i<index; i++) 
                    {   
                        n = n.next;
                    }
                } 
                // it is nearer to search from the end
                else 
                {   
                    n = head.prev;
                    for (int i=len-1; i>index; i--) 
                    {   
                        n = n.prev;
                    }                    
                }
            }
            
            // memorize for later access
            currentNode = n;
            currentIndex = index;
            return n;
        }

        // internal data container
        class Node 
        {   
            public object element;
            public Node prev;
            public Node next; 

            public Node(object element) 
            {   
                this.element = element;
                prev = null;
                next = null;
            }
        }        

                       
        // extra convenience methods of LinkedList
        public virtual void addFirst(object obj) 
        {   
            add(0,obj);
        }

        public virtual void addLast(object obj) 
        {   
            add(size(),obj);
        }
        
        public virtual object getFirst() 
        {   
            return get(0);
        }

        public virtual object getLast() 
        {   
            return get(size()-1);
        }
        
        public virtual object removeFirst() 
        {   
            return remove(0);
        }        
            
        public virtual object removeLast() 
        {   
            return remove(size()-1);
        } 
                    
        // OPTIMIZATION
        public override void clear() 
        {   
            Node h = head;
            h.next = h;
            h.prev = h;
            len = 0;
            currentNode = h;
            currentIndex = -1;
        }
    }
}

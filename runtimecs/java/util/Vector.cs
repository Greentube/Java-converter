namespace java.util 
{
	public class Vector: AbstractList
	{        
        public Vector() : base() {
        }
        
        public Vector(Collection collection) : base(collection) {
        }
        
        public void addElement(System.Object o) {
            this.add(o);
        }
	    
        public Vector clone() {
            return new Vector(this);
        }

        public void copyInto(System.Object[] array){        
            for (int i=0; i<this.size(); i++){
                array[i] = this.get(i);
            }
        }
	   
        public System.Object elementAt(int i) {
            return this.get(i);
        }

        public Enumeration elements() {
            return new IteratorEnumeration(this.iterator());
        }
    
        public System.Object firstElement() {
            return this.get(0);
        }

        public int indexOf(System.Object o, int index) {
            for (int i=index; i<this.size(); i++) {
                if (o==null ? (this.get(i)==null) : o.Equals(this.get(i))) return i;
            }
            return -1;
        }
    
        public void insertElementAt(System.Object o, int index) {
            this.add(index,o);
        }
      
        public System.Object lastElement() {
            return this.get(this.size()-1);
        }
   
        public int lastIndexOf(System.Object o, int index) {
            for (int i=index; i>=0; i--) {
                if (o==null ? (this.get(i)==null) : o.Equals(this.get(i))) return i;
            }
            return -1;
        }
    
        public void removeAllElements() {
            this.clear();
        }
  
        public bool removeElement(System.Object o) {
            return this.remove(o);
        }

        public void removeElementAt(int index) {
            this.remove(index);
        }

        public void setElementAt(System.Object o, int index) {
            this.set(index,o);
        }
	
        public void setSize(int newsize){
            if (newsize<=0) {
                this.clear();
            } else {
                int need = newsize - this.size();
                if (need>0) {
                    for (int i=0; i<need; i++) this.add(null);
                } else if (need<0) {
                    for (int i=this.size()-1; i>=newsize; i--) this.remove(i);
                }
            }
        }
        
	}	
}

using java.lang;

namespace java.util 
{
    public class ArrayList: ArrayListImpl
    {        
        public ArrayList() : base()
        {
        }
            
        public ArrayList(Collection collection) : base(collection)
        {
        }
    }

    public class ArrayListImpl: AbstractList
    {        
        private object[] buffer;
        private int len;
        
        public ArrayListImpl() : base() 
        {   
            buffer = new object[10];
            len = 0;            
        }
            
        public ArrayListImpl(Collection collection) : this() 
        {   
            addAll(collection);
        }
            
        // implement to satisfy AbstractList requirements
        public override object get(int index) 
        {   
            if (index<0 || index>=len) { throw new IndexOutOfBoundsException(); }
            return buffer[index];
        }

        public override object set(int index, object element) 
        {   
            if (index<0 || index>=len) { throw new IndexOutOfBoundsException(); }
            object prev = buffer[index];
            buffer[index] = element;
            return prev; 
        }
            
        public override void add(int index, object element) 
        {   
            if (index<0 || index>len) { throw new IndexOutOfBoundsException(); }
            if (len>=buffer.Length) 
            {   
                object[] newbuffer = new object[buffer.Length*2];
                System.Array.Copy(buffer,0, newbuffer,0, buffer.Length);
                buffer = newbuffer;
            }            
            if (index<len) 
            {   
                System.Array.Copy(buffer, index, buffer, index+1, len-index);
            }
            buffer[index] = element;
            len++;
        }

        public override object remove(int index) 
        {   
            if (index<0 || index>=len) { throw new IndexOutOfBoundsException(); }
            object prev = buffer[index];
            if (index<len-1) 
            {   
                System.Array.Copy(buffer, index+1, buffer, index, len-1-index);
            }
            buffer[--len] = null;  // remove garbage reference
            return prev;
        }
            
        public override int size() 
        {   
            return len;
        }
            
        // extra operations on ArrayList
        public virtual void trimToSize() 
        {   
            if (len < buffer.Length) 
            {   
                object[] newbuffer = new object[len];
                System.Array.Copy(buffer,0, newbuffer,0, len);
                buffer = newbuffer;
            }            
        }
            
        
        // OPTIMIZATION
        public override bool add(object e) 
        {   
            if (len>=buffer.Length) 
            {   
                object[] newbuffer = new object[buffer.Length*2];
                System.Array.Copy(buffer,0, newbuffer,0, buffer.Length);
                buffer = newbuffer;
            }            
            buffer[len++] = e;
            return true;
        }

        // OPTIMIZATION
        public override void clear() 
        {   
            for (int i=0; i<len; i++) 
            {     // remove garbage references
                buffer[i] = null;
            }
            len = 0;
        }                
           
        // OPTIMIZATION
        public override object[] toArray() 
        {   
            object[] copy = new object[len];
            System.Array.Copy(buffer,0,copy,0,len);
            return copy;
        }       
        
        // OPTIMIZATION
        public override object[] toArray(object[]a)
        {   
            object[] copy = (object[]) System.Array.CreateInstance(a.GetType().GetElementType(),len);
            System.Array.Copy(buffer,0,copy,0,len);
            return copy;
        }
       
    }
}

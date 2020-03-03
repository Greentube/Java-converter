using java.lang;

namespace java.util 
{ 
    public static class Arrays 
    {    
        public static List asList(object[] a)
        {   
            if (a==null) { throw new NullPointerException(); }
            return new FixSizedArrayList(a);
        }
        
        public static void sort(object[] a, Comparator comparator)
        {   
            sort(a,0,a.Length,comparator);
        }
        
        public static void sort(object[] a, int fromIndex, int toIndex, Comparator comparator)
        {   
            if (fromIndex<0 || toIndex>a.Length) { throw new IndexOutOfBoundsException(); }
            int len = toIndex-fromIndex;
            if (len<0 || comparator==null) { throw new IllegalArgumentException(); }
            mergesort(a,fromIndex,len,comparator, (len>=4) ? new object[len/2] : null);        
        }     

        private static void mergesort(object[] a, int start, int len, Comparator c, object[] tmp)
        {
            // simple case: only two elements 
            if (len==2)
            {   
                if (c.compare(a[start],a[start+1]) > 0)
                {   
                    object x = a[start];
                    a[start] = a[start+1];
                    a[start+1] = x;
                }
            }
            // more complex case, but also without full merging: 3 elements
            else if (len==3)
            {   
                // bring first two elements in correct order
                if (c.compare(a[start],a[start+1]) > 0)
                {   
                    object x = a[start];
                    a[start] = a[start+1];
                    a[start+1] = x;
                }
                // check if 3rd element must be moved forward
                if (c.compare(a[start+1],a[start+2]) > 0)
                {   
                    // check if 3rd element must even be moved to first position
                    if (c.compare(a[start],a[start+2]) > 0)
                    {   
                        object x = a[start+2];
                        a[start+2] = a[start+1];
                        a[start+1] = a[start];
                        a[start] = x;
                    }
                    // move to middle position
                    else
                    {   
                        object x = a[start+1];
                        a[start+1] = a[start+2];
                        a[start+2] = x;
                    }
                }
            }
            // general case 4 or more elements
            else if (len>=4)
            {   
                // sort each of the halves individually
                int halve = len/2;  
                mergesort (a, start, halve, c,tmp);
                mergesort (a, start+halve, len-halve, c,tmp);
                
                // check for quick termination: when the last element of the first part 
                // is correctly sorted in relation to he first element of the second part, no
                // merging is necessary at all
                if (c.compare(a[start+halve-1], a[start+halve]) <= 0)
                {   
                    return;
                }
                
                // merge the sorted parts - must use an intermediate buffer to copy values of 
                // first part to because the would be overwritten otherwise
                System.Array.Copy (a,start, tmp,0, halve);
                int readtmppos = 0;
                int readpart2 = start+halve;
                int writepos = start;
                // continue until everything from temporary buffer is consumed
                // this also means that the 2.part which is already in the target buffer
                // is already placed correctly
                while (readtmppos<halve)
                {   
                    // when there is nothing left in the part of the original buffer, finish quick
                    // by copying all remaining data from the temporary buffer back
                    if (readpart2>=start+len)
                    {   
                        System.Array.Copy (tmp,readtmppos, a,writepos, halve-readtmppos);
                        return;
                    }
                    // here we still have data in the temporary buffer as also in the
                    // part in the original buffer - decide which piece to use
                    if (c.compare(tmp[readtmppos],a[readpart2]) > 0)
                    {   
                        // must exchange order (that means take from original buffer)
                        a[writepos] = a[readpart2];
                        readpart2++;
                    }
                    else
                    {   
                        // keep order
                        a[writepos] = tmp[readtmppos];
                        readtmppos++;
                    }
                    writepos++;
                }
            }
            // otherwise no sort necessary
        }    
    }

    public class FixSizedArrayList: AbstractList
    {        
        private readonly object[] buffer;
        
        internal FixSizedArrayList(object[] buffer) : base() 
        {   
            this.buffer = buffer;    
        }    
            
        // implement to satisfy AbstractList requirements
        public override object get(int index) 
        {   
            return buffer[index];
        }

        public override object set(int index, object element) 
        {   
            object prev = buffer[index];
            buffer[index] = element;
            return prev; 
        }
            
        public override void add(int index, object element) 
        {   
            throw new UnsupportedOperationException();
        }

        public override object remove(int index) 
        {   
            throw new UnsupportedOperationException();
        }
            
        public override int size() 
        {   
            return buffer.Length;
        }
    }
}

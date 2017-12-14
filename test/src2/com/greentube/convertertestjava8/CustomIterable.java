package com.greentube.convertertestjava8;

import java.util.Iterator;

public class CustomIterable implements Iterable<Integer> 
{
    public Iterator iterator()
    {
        return new CustomIterator(4,5);
    }
    
    class CustomIterator implements Iterator<Integer> 
    {   
        int start;
        int num;
        int i;
        CustomIterator(int start, int num)
        {   
            this.start = start;
            this.num = num;
            this.i = 0;
        }   
        public boolean hasNext()
        {   
            return i<num;
        } 
        public Integer next()
        {            
            return Integer.valueOf(start+(i++));
        }
    }
}


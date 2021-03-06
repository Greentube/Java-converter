//reference// java/lang/IllegalArgumentException
//reference// java/lang/UnsupportedOperationException
//reference// java/lang/NullPointerException
//reference// java/lang/System
//reference// java/util/Comparator

var java_util_Arrays_asList_1 =  function(a)
{
    if (a===null)
    {   throw (new java_lang_NullPointerException())._0()._e;
    }
    return new java_util_FixSizedArrayList(a);
};
var java_util_Arrays_sort_2 = function(a,comparator)
{   java_util_Arrays_sort_4(a,0,a.length,comparator);
};    
var java_util_Arrays_sort_4 = function(a,fromIndex,toIndex,comparator)
{
    if (fromIndex<0 || toIndex>a.length)
    {   throw (new java_lang_IndexOutOfBoundsException())._0()._e; 
    }
    if (comparator===null)
    {   throw (new java_lang_NullPointerException())._0()._e;
    }
    var len = toIndex-fromIndex;
    if (len<0) throw (new java_lang_IllegalArgumentException())._0()._e;
    java_util_Arrays_mergesort(a,fromIndex,len,comparator, (len>=4) ? new Array(len>>1) : null);
};   
var java_util_Arrays_mergesort = function(a, start, len, c,  tmp)
{
    // simple case: only two elements 
    if (len===2)
    {	if (c.compare_2(a[start],a[start+1]) > 0)
        {	var x = a[start];
            a[start] = a[start+1];
            a[start+1] = x;
        }
    }
    // more complex case, but also without full merging: 3 elements
    else if (len===3)
    {	// bring first two elements in correct order
        if (c.compare_2(a[start],a[start+1]) > 0)
        {	var x = a[start];
            a[start] = a[start+1];
            a[start+1] = x;
        }
        // check if 3rd element must be moved forward
        if (c.compare_2(a[start+1],a[start+2]) > 0)
        {	// check if 3rd element must even be moved to first position
            if (c.compare_2(a[start],a[start+2]) > 0)
            {	var x = a[start+2];
                a[start+2] = a[start+1];
                a[start+1] = a[start];
                a[start] = x;
            }
            // move to middle position
            else
            {	var x = a[start+1];
                a[start+1] = a[start+2];
                a[start+2] = x;
            }
        }
    }
    // general case 4 or more elements
    else if (len>=4)
    {	// sort each of the halves individually
        var halve = len>>1;  
        java_util_Arrays_mergesort (a, start, halve, c,tmp);
        java_util_Arrays_mergesort (a, start+halve, len-halve, c,tmp);
        
        // check for quick termination: when the last element of the first part 
        // is correctly sorted in relation to he first element of the second part, no
        // merging is necessary at all
        if (c.compare_2(a[start+halve-1], a[start+halve]) <= 0)
        {	return;
        }
        
        // merge the sorted parts - must use an intermediate buffer to copy values of 
        // first part to because the would be overwritten otherwise
        java_lang_System_arraycopy_5 (a,start, tmp,0, halve);
        var readtmppos = 0;
        var readpart2 = start+halve;
        var writepos = start;
        // continue until everything from temporary buffer is consumed
        // this also means that the 2.part which is already in the target buffer
        // is already placed correctly
        while (readtmppos<halve)
        {	// when there is nothing left in the part of the original buffer, finish quick
            // by copying all remaining data from the temporary buffer back
            if (readpart2>=start+len)
            {	java_lang_System_arraycopy_5 (tmp,readtmppos, a,writepos, halve-readtmppos);
                return;
            }
            // here we still have data in the temporary buffer as also in the
            // part in the original buffer - decide which piece to use
            if (c.compare_2(tmp[readtmppos],a[readpart2]) > 0)
            {	// must exchange order (that means take from original buffer)
                a[writepos] = a[readpart2];
                readpart2++;
            }
            else
            {	// keep order
                a[writepos] = tmp[readtmppos];
                readtmppos++;
            }
            writepos++;
        }
    }
    // otherwise no sort necessary
};

//load// java/util/AbstractList
var java_util_FixSizedArrayList = function(_storage)
   // only used internally. combined allocator and constructor.
{   this._storage = _storage;  
};
_defclass(java_util_FixSizedArrayList, java_util_AbstractList, null, 
{   
    get_1: function(index) 
    {   if (index<0 || index>=this._storage.length)
        {   throw (new java_lang_IndexOutOfBoundsException())._0()._e; 
        }
        return this._storage[index];	
    },
    
    set_2: function(index, obj) 
    {   if (index<0 || index>=this._storage.length)
        {   throw (new java_lang_IndexOutOfBoundsException())._0()._e; 
        }
        this._storage[index] = obj;
    },
    
    add_2: function(index, obj) 
    {   throw (new java_lang_UnsupportedOperationException())._0()._e;
    },

    remove_1I: function (idx) 
    {   throw (new java_lang_UnsupportedOperationException())._0()._e;
    },

    size_0: function()
    {   return this._storage.length;
    },
});

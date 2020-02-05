//reference// java/lang/ArrayStoreException
//reference// java/lang/NullPointerException
//reference// java/lang/IndexOutOfBoundsException
//complete// java/io/PrintStream

var java_lang_System_out = (new java_io_PrintStream())._1(false);
var java_lang_System_err = (new java_io_PrintStream())._1(true);

var java_lang_System_arraycopy_5 = function(src, srcPos, dest, destPos, length) 
{   if (src==null || dest==null) 
    {   throw (new java_lang_NullPointerException())._0()._e;
    }
    if (!(src._isArray) || !(dest._isArray))
    {   throw (new java_lang_ArrayStoreException())._0()._e; 
    }
    if 
    (   length<0 || srcPos<0 || srcPos+length>src.length
        || destPos<0 || destPos+length>dest.length
    )
    {   throw (new java_lang_IndexOutOfBoundsException())._0()._e; 
    }        
    if (destPos<=srcPos) 
    {   for (var i = 0; i < length; i++) 
        {   dest[i + destPos] = src[i + srcPos];
        }
    } 
    else 
    {   for (var i = length-1; i >=0; i--) 
        {   dest[i + destPos] = src[i + srcPos];
        }
    }
};
var java_lang_System_exit_1 = function(status) 
{
};    
var java_lang_System_currentTimeMillis_0 = function() 
{   return _long_from_double(Date.now());
};

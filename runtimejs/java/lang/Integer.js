//load// java/lang/Object
var java_lang_Integer = {
    $: function() 
    {   this.i = 0;
    },    
    
    toString_1 : function(i) 
    {   return i.toString();
    },
    
    toHexString_1 : function(i) 
    {   return (i<0 ? 4294967296+i : i).toString(16);
    },
    
    valueOf_1: function(i) 
    {   return new java_lang_Integer.$()._1(i);
    },    
    
    MAX__VALUE: 2147483647,
    MIN__VALUE: -2147483648,
}
_class(java_lang_Integer, java_lang_Object, null, "java.lang.Integer", 
{   _1: function(i) 
    {   this.i = i;
        return this;
    },
    
    intValue_0: function() 
    {   return this.i;
    },    
    
    equals_1: function(i) 
    {   if (i!==null && (i instanceof java_lang_Integer.$) && i.i===this.i) 
        {   return true;
        }
        return false;
    },
    
    hashCode_0: function() 
    {   return this.i;
    },  
    
    toString_0: function() 
    {   return this.i.toString();
    },
});
 
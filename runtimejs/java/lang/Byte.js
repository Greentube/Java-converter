//load// java/lang/Object
var java_lang_Byte = 
{   $: function() 
    {   this.b = 0;
    },
    
    toString_1: function (b) 
    {   return b.toString();
    },
    
    valueOf_1: function (b) 
    {   return new java_lang_Byte.$()._1(b);
    },      
    
    MIN__VALUE: -128,
    MAX__VALUE: 127,
};    
_class(java_lang_Byte, java_lang_Object, null, "java.lang.Byte", 
{   _1: function(b) 
    {   this.b = b;
        return this;
    },
    
    byteValue_0: function() 
    {   return this.b;
    },
    
    equals_1: function(b) 
    {   if (b!==null && (b instanceof java_lang_Byte.$) && this.b === b.b) 
        {   return true;
        }
        return false;
    },
    
    hashCode_0: function() 
    {   return this.b;
    },
    
    toString_0: function() 
    {   return this.b.toString();
    },    
});

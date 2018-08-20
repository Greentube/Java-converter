//load// java/lang/Object
var java_lang_Byte = function() 
{   this.b = 0;
};

_defclass(java_lang_Byte, java_lang_Object, null, 
{   _1: function(b) 
    {   this.b = b;
        return this;
    },
    
    byteValue_0: function() 
    {   return this.b;
    },
    
    equals_1: function(b) 
    {   if (b!==null && (b instanceof java_lang_Byte) && this.b === b.b) 
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

var java_lang_Byte_MIN$005fVALUE = -128;
var java_lang_Byte_MAX$005fVALUE = 127;
  
var java_lang_Byte_toString_1 = function (b) 
{   return b.toString();
};
var java_lang_Byte_valueOf_1 = function (b) 
{   return new java_lang_Byte()._1(b);
};


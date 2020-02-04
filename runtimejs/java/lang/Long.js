//reference// java/lang/NumberFormatException
//load// java/lang/Object
var java_lang_Long = function() 
{   this.l = 0;
};

_defclass(java_lang_Long, java_lang_Object, null,
{   _1L: function(l) 
    {   this.l = l;
        return this;
    },
    
    longValue_0: function() 
    {   return this.l;
    },    
    
    equals_1: function(l) 
    {   if (l!==null && (l instanceof java_lang_Long) && _long_equals(l.l,this.l)) 
        {   return true;
        }
        return false;
    },
    
    hashCode_0: function() 
    {   return this.l.low ^ this.l.high;
    },  
    
    toString_0: function() 
    {   return java_lang_Long_toString_1(this.l);
    },
});

var java_lang_Long_MAX$005fVALUE = new _long(0x7fffffff, 0xffffffff);
var java_lang_Long_MIN$005fVALUE = new _long(0x80000000, 0x00000000);
 
var java_lang_Long_parseLong_1 = function(s) 
{
	return 0;   
};
var java_lang_Long_toString_1 = function(i) 
{   return "unknown long";
};
var java_lang_Long_toHexString_1 = function(i) 
{   return (i<0 ? 4294967296+i : i).toString(16);
};
var java_lang_Long_valueOf_1L = function(l) 
{   return new java_lang_Long()._1L(l);
};
       

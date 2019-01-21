//load// java/lang/Object
var java_lang_Short = function() 
{   this.s = 0;
};
    
_defclass(java_lang_Short, java_lang_Object, null, 
{   _1S: function(s) 
    {   this.s = s;
        return this;
    },
    
    shortValue_0: function() 
    {   return this.s;
    },
    
    equals_1: function(s) 
    {   if (s!==null && (s instanceof java_lang_Short) && this.s === s.s) 
        {   return true;
        }
        return false;
    },
    
    hashCode_0: function() 
    {   return this.s;
    },
    
    toString_0: function() 
    {   return this.s.toString();
    },    
});

var java_lang_Short_MIN$005fVALUE = -32768;
var java_lang_Short_MAX$005fVALUE = 32767;

var java_lang_Short_toString_1 = function (s) 
{   return s.toString();
};
var java_lang_Short_valueOf_1S = function (s) 
{   return new java_lang_Short()._1S(s);
};

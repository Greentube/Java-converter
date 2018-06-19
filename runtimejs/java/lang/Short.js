//load// java/lang/Object
var java_lang_Short = 
{   $: function() 
    {   this.s = 0;
    },
    
    toString_1: function (s) 
    {   return s.toString();
    },
    
    valueOf_1: function (s) 
    {   return new java_lang_Short.$()._1(s);
    },      
    
    MIN__VALUE: -32768,
    MAX__VALUE: 32767,
};    
_class(java_lang_Short, java_lang_Object, null, 
"java.lang.Short"  //replace-me-with-empty-string-for-production//
, 
{   _1: function(s) 
    {   this.s = s;
        return this;
    },
    
    shortValue_0: function() 
    {   return this.s;
    },
    
    equals_1: function(s) 
    {   if (s!==null && (s instanceof java_lang_Short.$) && this.s === s.s) 
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

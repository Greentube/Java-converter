//reference// java/lang/NumberFormatException
//load// java/lang/Object
var java_lang_Double = 
{   $: function() 
    {   this.d = 0;
    },
    
    isNaN_1: isNaN,  
    
    isInfinite_1: function(d) 
    {   return ! (isFinite(d) || isNaN(d))
    },
    parseDouble_1 : function(s) 
    {   
        var n = Number(s);
        if (isNaN(n))throw (new java_lang_NumberFormatException.$())._0();
        return n;
    },
    toString_1: function(d) 
    {   return _d2s(d);
    },
    
    valueOf_1: function (d) 
    {   return new java_lang_Double.$()._1(d);
    },
    
    MIN__VALUE : 4.9E-324,
    MAX__VALUE : 1.7976931348623157E308,
    POSITIVE__INFINITY : 1.0/0.0,
    NEGATIVE__INFINITY : -1.0/0.0,
};
_class (java_lang_Double, java_lang_Object, null, 
"java.lang.Double"  //replace-me-with-empty-string-for-production//
,{   _1: function(d) 
    {   this.d = d;
        return this;
    },
    
    doubleValue_0: function() 
    {   return this.d;
    },    
    
    equals_1: function(d) 
    {   if (d!==null && (d instanceof java_lang_Double.$) && this.d===d.d) 
        {   return true;
        }
        return false;
    },    
    
    isInfinite_0: function() 
    {   return java_lang_Double.isInfinite_1(this.d);
    },    
    
    isNaN_0: function() 
    {   return java_lang_Double.isNaN_1(this.d);
    },   
    
    hashCode_0: function() 
    {   var n = Math.round(this.d);
        var f = this.d - n;        
        return n ^ f;
    },
    
    toString_0: function() 
    {   return _d2s(this.d);
    },
});

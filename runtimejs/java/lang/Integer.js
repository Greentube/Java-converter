//reference// java/lang/NumberFormatException
//load// java/lang/Object
var java_lang_Integer = {
    $: function() 
    {   this.i = 0;
    },    
    parseInt_1 : function(s) 
    {   
        var n = Number(s);
        if (isNaN(n)) 
        {   throw (new java_lang_NumberFormatException.$())._0()._e; 
        }
        var i = Math.round(n);
        if (!(i===n) || i<-2147483648 || i>2147483647) 
        {   throw (new java_lang_NumberFormatException.$())._0()._e; 
        }
        return i;
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
_class(java_lang_Integer, java_lang_Object, null, 
"java.lang.Integer"  //replace-me-with-empty-string-for-production//
,{  _1: function(i) 
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
 
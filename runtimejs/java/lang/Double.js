//reference// java/lang/NumberFormatException
//load// java/lang/Object
var java_lang_Double = function() 
{   this.d = 0;
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
    {   if (d!==null && (d instanceof java_lang_Double) && this.d===d.d) 
        {   return true;
        }
        return false;
    },    
    
    isInfinite_0: function() 
    {   return java_lang_Double_isInfinite_1(this.d);
    },    
    
    isNaN_0: function() 
    {   return java_lang_Double_isNaN_1(this.d);
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

    
var java_lang_Double_MIN$005fVALUE = 4.9E-324;
var java_lang_Double_MAX$005fVALUE = 1.7976931348623157E308;
var java_lang_Double_POSITIVE$005fINFINITY = 1.0/0.0;
var java_lang_Double_NEGATIVE$005fINFINITY = -1.0/0.0;

var java_lang_Double_isNaN_1 = function(d) 
{   return isNaN(d); 
};    
var java_lang_Double_isInfinite_1 = function(d) 
{   return ! (isFinite(d) || isNaN(d))
};
var java_lang_Double_parseDouble_1 = function(s) 
{   
    var n = Number(s);
    if (isNaN(n))throw (new java_lang_NumberFormatException())._0()._e;
    return n;
};
var java_lang_Double_toString_1= function(d) 
{   return _d2s(d);
};   
var java_lang_Double_valueOf_1 = function (d) 
{   return new java_lang_Double()._1(d);
};

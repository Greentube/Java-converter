//load// java/lang/Object
var java_lang_RuntimeException = 
{   $: function() 
    {   this.message = null;
    },
};
_class (java_lang_RuntimeException, java_lang_Object, null, "java.lang.RuntimeException"  
,{  _0: function() 
    {   this.message = null;
        return this;
    },
    _1: function(message) 
    {   this.message = message;
        return this;
    },
    toString_0 : function()
    {   return java_lang_Object.$.prototype.toString_0.call(this) + (this.message ? ": " + this.message : "");
    },
    
    _error : function()
    {   return Error(this.toString_0());
    }
});
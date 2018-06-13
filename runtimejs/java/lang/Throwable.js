//load// java/lang/Object
var java_lang_Throwable = 
{   $: function() 
    {   this.name = null;
        this.message = null;        
    },
};
_class (java_lang_Throwable, java_lang_Object, null, "java.lang.Throwable"  
,{  _0: function() 
    {   this.name = this._classname;
        this.message = null;         
        return this;
    },
    _1: function(message) 
    {   this.name = this._classname;
        this.message = message;
        return this;
    },
    printStackTrace_0: function()
    {   console.log("stacktrace?");
    },
    getMessage_0: function()
    {   return this.message;
    },
    toString_0 : function()
    {   var m = this.getMessage_0();
        return java_lang_Object.$.prototype.toString_0.call(this) + (m ? ": " + m : "");
    },   

});

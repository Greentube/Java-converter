//load// java/lang/Object
var java_lang_Throwable = 
{   $: function() 
    {   this.message = null;  
        this.name = null;
    },
};
_class (java_lang_Throwable, java_lang_Object, null, "java.lang.Throwable"  
,{  
    _0: function() 
    {   this.message = null;
        this.name = this._classname;        
        return this;
    },
    _1: function(message) 
    {   this.message = message;
        this.name = this._classname;        
        return this;
    },
    printStackTrace_0: function()
    {   console.log(this.stack);        
    },
    getMessage_0: function()
    {   return this.message;
    },
    toString_0 : function()
    {   var m = this.getMessage_0();
        if (m===null) { return this._classname; }
        else { return this._classname + ": " + m; }
    },   

});

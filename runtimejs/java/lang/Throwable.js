//load// java/lang/Object
var java_lang_Throwable = function() 
{   
    this.name = null;
    this.message = null; 
    this._e = new Error(this._classname);
    this._e.throwable = this;
};

_class(java_lang_Throwable, java_lang_Object, null, "java.lang.Throwable",
{
    _0: function()
    {   
        this.name = this._classname;
        this.message = null;    
        return this;
    },
    _1: function(message)
    {   
        this.name = this._classname;
        this.message = message;
        return this;
    },

    toString_0: function()
    {   
        var m = this.getMessage_0();
        if (m===null) { return this._classname; }
        else { return this._classname + ": " + m; }
    },
    
    getMessage_0 : function()
    {   
        return this.message;
    },
    
    printStackTrace_0: function()
    {   
        if (this._e.stack) console.warn(this._e.stack);
        else console.warn(this._e);        
    }
});


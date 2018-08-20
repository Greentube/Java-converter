//load// java/lang/Object
var java_lang_Throwable = function() 
{   
    this.message = null; 
    this._e = null;
};

_defclass(java_lang_Throwable, java_lang_Object, null,
{
    _0: function()
    {   
        this.message = null;    
        this._e = new Error(this.constructor.name);
        this._e.throwable = this;        
        return this;
    },
    _1: function(message)
    {   
        this.message = message;
        this._e = new Error(this.constructor.name);
        this._e.throwable = this;        
        return this;
    },

    toString_0: function()
    {   
        var m = this.getMessage_0();
        if (m===null) { return this.constructor.name; }
        else { return this.constructor.name + ": " + m; }
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


//load// java/lang/Object
var java_lang_StringBuffer = function() 
{   this._parts = null;
    this._length = 0;
};
_defclass(java_lang_StringBuffer, java_lang_Object, null, 
{  _0: function() 
    {   this._parts = [];        
        return this;
    },
    
    _1Ljava_lang_String$: function(initialvalue) 
    {   this._parts = [initialvalue];        
        this._length = initialvalue.length;
        return this;
    },

    append_1Ljava_lang_String$: function(s) 
    {   if (s===null) { s = "null"; }
        this._length += s.length;
        this._parts.push(s);
        return this;
    },
    append_1Ljava_lang_Object$: function(x) 
    {   this.append_1Ljava_lang_String$(x===null ? "null" : x.toString_0());
        return this;
    },
    append_1Z: function(x) 
    {   this.append_1Ljava_lang_String$(x ? "true":"false");
        return this;
    },
    append_1C: function(x) 
    {   this.append_1Ljava_lang_String$(String.fromCharCode(x));
        return this;
    },
    append_1I: function(x) 
    {   this.append_1Ljava_lang_String$(x.toString());
        return this;
    },
    append_1D: function(x) 
    {   this.append_1Ljava_lang_String$(_d2s(x));
        return this;
    },
    
    length_0: function() 
    {   return this._length;
    },
  
    toString_0: function() 
    {   return this._parts.join("");
    },
}); 
 
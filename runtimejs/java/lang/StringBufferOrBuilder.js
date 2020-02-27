//load// java/lang/Object
//reference// java/lang/NullPointerException
//reference// java/lang/IndexOutOfBoundsException
var java_lang_StringBufferOrBuilder = function() 
{   this._parts = null;
    this._length = 0;
};
_defclass(java_lang_StringBufferOrBuilder, java_lang_Object, null, 
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
    append_1AC: function(x) 
    {   
        if (x===null) {throw (new java_lang_NullPointerException())._0()._e; }
        this.append_1Ljava_lang_String$(String.fromCharCode.apply(null, x)); 
        return this;
    },
    
    delete_2: function(start,end)
    {
		if (end>=this._length) 
		{	
			end = this._length;
			if (start==0) 
			{
				this._parts.length = 0;
				this._length = 0;
				return this;
			} 
		}
		
		if (start<0 || start>end)
		{
			{throw (new java_lang_IndexOutOfBoundsException())._0()._e; }
		}
		
		var old =  this._parts.join("");
		this._parts = [ old.substring(0,start), old.substring(end,this._length) ];
		this._length = start + (this._length - end);
		return this;
    },
    
    length_0: function() 
    {   return this._length;
    },
  
    toString_0: function() 
    {   return this._parts.join("");
    },
}); 
 
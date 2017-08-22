//load// java/lang/Object
var java_lang_StringBuilder = _defineClass("java_lang_StringBuilder", java_lang_Object, null, 
function() {
    this._parts = null;
    this._length = 0;
},
null, // no statics
{
    _0: function() {
        this._parts = [];        
        return this;
    },
    _1: function(initialvalue) {
        this._parts = [initialvalue];        
        this._length = initialvalue.length;
        return this;
    },
    
    append_1: function(o) {
        var s = (o==null) ? "null" : o._is_java_lang_Object ? o.toString_0() : String(o);
        this._length += s.length;
        this._parts.push(s);
        return this;
    },
  
    length_0: function() {
        return this._length;
    },
  
    toString_0: function() {
        return this._parts.join("");
    }
      
}); 
 
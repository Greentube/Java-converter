//load// java/lang/Object
var java_lang_StringBuffer = _defineClass("java_lang_StringBuffer", java_lang_Object, null, {

    _0: function() {
        this.parts = [];
        return this;
    },
    _1: function(initialvalue) {
        this.parts = [initialvalue];
        return this;
    },
    
    append_1: function(o) {
        this.parts.push(String(o));
        return this;
    },
  
    length_0: function() {
        var length = 0;
        for (var i = 0; i<this.parts.length; i++){
            length += this.parts[i].length;
        }
        return length;
    },
  
    toString_0: function() {
        return this.parts.join("");
    }
      
}, null);  // no statics
 
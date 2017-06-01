//load// java/lang/Object
var java_lang_StringBuffer = _extendClass( java_lang_Object, {

    initialConstructor_0: function() {
        this.parts = [];
        return this;
    },

    initialConstructor_1: function(initialvalue) {
        this.parts = [initialvalue];
        return this;
    },
    
    append_1: function(o) {
        this.parts.push(o!=null?o.toString_0():"null");
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
      
 },"java_lang_StringBuffer", []);
 
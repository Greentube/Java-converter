//load// java/lang/Object
var java_lang_Byte = _extendClass( java_lang_Object, {

	initialConstructor_1: function(byteValue) {
		this.byteValue_f = byteValue;
        return this;
    },
    
	byteValue_0: function() {
		return this.byteValue_f;
	},
  
	toString_0: function() {
		return this.byteValue_f.toString();
    },
    
    equals_1: function(b) {
        if (b!=null && b._is_java_lang_Byte && this.byteValue_f == b.byteValue_f) {
            return true;
        }
        return false;
    },

    toString_1: function (byteValue) {
        return byteValue.toString();
    },
    
},"java_lang_Byte", []);

java_lang_Byte.prototype.MIN_VALUE_f = -128;
java_lang_Byte.prototype.MAX_VALUE_f = 127;

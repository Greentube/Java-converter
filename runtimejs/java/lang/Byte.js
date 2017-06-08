//load// java/lang/Object
var java_lang_Byte = _extendClass( java_lang_Object, {
	_1: function(b) {
		this.b_f = b;
        return this;
    },
	byteValue_0: function() {
		return this.b_f;
	},
    equals_1: function(b) {
        if (b!=null && b._is_java_lang_Byte && this.b_f == b.b_f) {
            return true;
        }
        return false;
    },
    hashCode_0: function() {
        return this.b_f;
    },
	toString_0: function() {
		return this.b_f.toString();
    },    
    
    toString_1: function (b) {
        return b.toString();
    },
    valueOf_1: function (b) {
        return (new java_lang_Byte())._1(b);
    },    
    
},"java_lang_Byte", null);


java_lang_Byte.s.MIN_VALUE_f = -128;
java_lang_Byte.s.MAX_VALUE_f = 127;

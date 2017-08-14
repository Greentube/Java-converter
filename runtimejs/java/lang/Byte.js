//load// java/lang/Object
var java_lang_Byte = _defineClass("java_lang_Byte", java_lang_Object, null, 
    function() {
        this.b = 0;
    },
{
	_1: function(b) {
		this.b = b;
        return this;
    },
	byteValue_0: function() {
		return this.b;
	},
    equals_1: function(b) {
        if (b!=null && b._is_java_lang_Byte && this.b == b.b) {
            return true;
        }
        return false;
    },
    hashCode_0: function() {
        return this.b;
    },
	toString_0: function() {
		return this.b.toString();
    },    
},{ // static
    toString_1: function (b) {
        return b.toString();
    },
    valueOf_1: function (b) {
        return (new java_lang_Byte())._1(b);
    },        
    MIN__VALUE: -128,
    MAX__VALUE: 127,
});

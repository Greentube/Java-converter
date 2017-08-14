//load// java/lang/Object
var java_lang_Character = _defineClass("java_lang_Character", java_lang_Object, null, {
	_1: function(c) {
		this.c = c;
        return this;
    },
	charValue_0: function() {
		return this.c;
    },
    
    equals_1: function(o) {
        if (o!=null && o._is_java_lang_Character && o.c==this.c) {
            return true;
        }
        return false;
    },
    hashCode_0: function() {
        return this.c;
    },    
    toString_0: function() {
        return String.fromCharCode(this.c);
    },
},{ // static    
    toString_1 : function(c) {
        return String.fromCharCode(c);
    },
    valueOf_1: function(c) {
        return (new java_lang_Character())._1(c);
    },
    MAX__VALUE : 0xffff,
    MIN__VALUE : 0,    
});
 

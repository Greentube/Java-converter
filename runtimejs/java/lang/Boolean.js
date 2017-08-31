//load// java/lang/Object
var java_lang_Boolean = { 
    $: function() {
        this.b = false;
    },
    toString_1: function(b) {
        return b ? "true" : "false";
    },
    valueOf_1: function(b) {
        return b ? java_lang_Boolean.TRUE : java_lang_Boolean.FALSE;
    },       
    TRUE: null,
    FALSE: null,
};
_class (java_lang_Boolean, java_lang_Object, null, "java_lang_Boolean", {
	_1: function(b) {
		this.b = b;
        return this;
    },
	booleanValue_0: function() {
		return this.b;
    },
    equals_1: function(b) {
        if (b!=null && (b instanceof java_lang_Boolean.$) && this.b == b.b) {
          return true;
        }
        return false;
    },
    hashCode_0: function() {
        return this.b ? 1231 : 1237;
    },
    toString_0: function() {
      return this.b ? "true" : "false";
    },    
});

java_lang_Boolean.TRUE = new java_lang_Boolean.$()._1(true);
java_lang_Boolean.FALSE = new java_lang_Boolean.$()._1(false);

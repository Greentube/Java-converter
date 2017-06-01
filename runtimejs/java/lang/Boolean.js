//load// java/lang/Object
var java_lang_Boolean = _extendClass (java_lang_Object, {
	initialConstructor_1: function(b) {
		this.b_f = b;
        return this;
    },
	booleanValue_0: function() {
		return this.b_f;
    },
    equals_1: function(b) {
        if (b!=null && b._is_java_lang_Boolean && this.b_f == b.b_f) {
          return true;
        }
        return false;
    },
    toString_0: function() {
      return java_lang_Boolean.prototype.toString_1(this.b_f);
    },
    
    toString_1: function(b) {
      return b ? "true" : "false";
    },

    valueOf_1: function(b) {
      return b ? java_lang_Boolean.prototype.TRUE_f : java_lang_Boolean.prototype.FALSE_f;
    },
    
 },"java_lang_Boolean", []);

java_lang_Boolean.prototype.TRUE_f = (new java_lang_Boolean).initialConstructor_1(true);
java_lang_Boolean.prototype.FALSE_f = (new java_lang_Boolean).initialConstructor_1(false);
 

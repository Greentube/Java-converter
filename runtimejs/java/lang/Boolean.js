//load// java/lang/Object
var java_lang_Boolean = _extendClass (java_lang_Object, {
	_1: function(b) {
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
    hashCode_0: function() {
        return this.b_f ? 1231 : 1237;
    },
    toString_0: function() {
      return this.b_f ? "true" : "false";
    },
    
    toString_1: function(b) {
      return b ? "true" : "false";
    },
    valueOf_1: function(b) {
      return b ? java_lang_Boolean.prototype.TRUE_f : java_lang_Boolean.prototype.FALSE_f;
    },
        
 },"java_lang_Boolean", null);

java_lang_Boolean.prototype.TRUE_f = (new java_lang_Boolean)._1(true);
java_lang_Boolean.prototype.FALSE_f = (new java_lang_Boolean)._1(false);

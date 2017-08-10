//load// java/lang/Object
var java_lang_Character = _extendClass( java_lang_Object, {
	_1: function(c) {
		this.c_f = c;
        return this;
    },
	charValue_0: function() {
		return this.c_f;
    },
    
    equals_1: function(o) {
        if (o!=null && o._is_java_lang_Character && o.c_f==this.c_f) {
            return true;
        }
        return false;
    },
    hashCode_0: function() {
        return this.c_f;
    },    
    toString_0: function() {
        return String.fromCharCode(this.c_f);
    },
    
    toString_1 : function(c) {
        return String.fromCharCode(c);
    },
    valueOf_1: function(c) {
        return (new java_lang_Character())._1(c);
    },
    
 },"java_lang_Character",  null);
 
 
java_lang_Character.prototype.MAX__VALUE_f = 0xffff;
java_lang_Character.prototype.MIN__VALUE_f = 0;

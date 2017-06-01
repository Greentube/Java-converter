//load// java/lang/Object
var java_lang_Integer = _extendClass( java_lang_Object, {

	initialConstructor_1: function(integer) {
		this.integer_f = integer;
        return this;
    },
    
    equals_1: function(i) {
        if (i!=null && i._is_java_lang_Integer && i.integer_f==this.integer_f) {
            return true;
        }
        return false;
    },
    
	intValue_0: function() {
		return this.integer_f;
    },
    
    toString_0: function() {
        return this.integer_f.toString();
    },

    toString_1: function(integer) {
        return integer.toString();
    },
    
 },"java_lang_Integer", []);
 
 
java_lang_Integer.prototype.MAX_VALUE_f = 2147483647;
java_lang_Integer.prototype.MIN_VALUE_f = -2147483648;

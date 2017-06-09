//load// java/lang/Object
var java_lang_Integer = _extendClass( java_lang_Object, {
	_1: function(i) {
		this.i_f = i;
        return this;
    },
	intValue_0: function() {
		return this.i_f;
    },
    
    equals_1: function(i) {
        if (i!=null && i._is_java_lang_Integer && i.i_f==this.i_f) {
            return true;
        }
        return false;
    },
    hashCode_0: function() {
        return this.i_f;
    },    
    toString_0: function() {
        return this.i_f.toString();
    },
    
    toString_1 : function(i) {
        return i.toString();
    },
    valueOf_1: function(i) {
        return (new java_lang_Integer())._1(i);
    },
    
 },"java_lang_Integer",  null);
 
 
java_lang_Integer.prototype.MAX_VALUE_f = 2147483647;
java_lang_Integer.prototype.MIN_VALUE_f = -2147483648;

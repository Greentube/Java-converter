//load// java/lang/Object
var java_lang_Double = _extendClass ( java_lang_Object, {

	initialConstructor_1: function(d) {
		this.d_f = d;
        return this;
    },
    
    equals_1: function(d) {
        if (d!=null && d._is_java_lang_Double && this.d_f==d.d_f) {
            return true;
        }
        return false;
    },

    doubleValue_0: function() {
        return this.d_f;
    },
    
    toString_0: function() {
        return java_lang_Double.prototype.toString_1(this.d_f);
    },

    toString_1: function(d) {
        var s = d.toString();
        if (s.indexOf('.')<0) return s+".0";
        return s;
    },
},"java_lang_Double", []);

java_lang_Double.prototype.MIN_VALUE_f = 4.9E-324;
java_lang_Double.prototype.MAX_VALUE_f = 1.7976931348623157E308;
java_lang_Double.prototype.POSITIVE_INFINITY_f = 1.0/0.0;
java_lang_Double.prototype.NEGATIVE_INFINITY_f = -1.0/0.0;


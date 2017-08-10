//load// java/lang/Object
var java_lang_Double = _defineClass ("java_lang_Double", java_lang_Object, null, {
	_1: function(d) {
		this.d_f = d;
        return this;
    },
    doubleValue_0: function() {
        return this.d_f;
    },
    
    equals_1: function(d) {
        if (d!=null && d._is_java_lang_Double && this.d_f==d.d_f) {
            return true;
        }
        return false;
    },
    
    hashCode_0: function() {
        return Math.round(d_f) & 0xffffffff;
    },

    toString_0: function() {
        var s = this.d_f.toString();
        if (s.indexOf('.')<0) return s+".0";
        return s;
    },
    toString_1: function(d) {
        var s = d.toString();
        if (s.indexOf('.')<0) return s+".0";
        return s;
    },
    valueOf_1: function (d) {
        return (new java_lang_Double())._1(d);
    },

});

java_lang_Double.prototype.MIN__VALUE_f = 4.9E-324;
java_lang_Double.prototype.MAX__VALUE_f = 1.7976931348623157E308;
java_lang_Double.prototype.POSITIVE__INFINITY_f = 1.0/0.0;
java_lang_Double.prototype.NEGATIVE__INFINITY_f = -1.0/0.0;


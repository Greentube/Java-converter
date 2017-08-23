//load// java/lang/Object
var java_lang_Double = _defineClass ("java_lang_Double", java_lang_Object, null, 
function() {
    this.d = 0;
},
{ // static
    isNaN_1: isNaN,    
    isInfinite_1: function(d) {
        return ! (isFinite(d) || isNaN(d))
    },
    toString_1: function(d) {
        var s = d.toString();
        if (s.indexOf('.')<0) return s+".0";
        return s;
    },
    valueOf_1: function (d) {
        return (new java_lang_Double())._1(d);
    },
    MIN__VALUE : 4.9E-324,
    MAX__VALUE : 1.7976931348623157E308,
    POSITIVE__INFINITY : 1.0/0.0,
    NEGATIVE__INFINITY : -1.0/0.0,
},
{
	_1: function(d) {
		this.d = d;
        return this;
    },
    doubleValue_0: function() {
        return this.d;
    },    
    equals_1: function(d) {
        if (d!=null && d._is_java_lang_Double && this.d==d.d) {
            return true;
        }
        return false;
    },    
    isInfinite_0: function() {
        return java_lang_Double.isInfinite_1(this.d);
    },    
    isNaN_0: function() {
        return java_lang_Double.isNaN_1(this.d);
    },    
    hashCode_0: function() {
        var n = Math.round(this.d);
        var f = this.d - n;        
        return n ^ f;
    },
    toString_0: function() {
        var s = this.d.toString();
        if (s.indexOf('.')<0) return s+".0";
        return s;
    },
});

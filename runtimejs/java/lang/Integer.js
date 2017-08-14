//load// java/lang/Object
var java_lang_Integer = _defineClass("java_lang_Integer", java_lang_Object, null, 
function() {
    this.i = 0;
},
{
	_1: function(i) {
		this.i = i;
        return this;
    },
	intValue_0: function() {
		return this.i;
    },    
    equals_1: function(i) {
        if (i!=null && i._is_java_lang_Integer && i.i==this.i) {
            return true;
        }
        return false;
    },
    hashCode_0: function() {
        return this.i;
    },    
    toString_0: function() {
        return this.i.toString();
    },
},{  // static
    toString_1 : function(i) {
        return i.toString();
    },
    valueOf_1: function(i) {
        return (new java_lang_Integer())._1(i);
    },    
    MAX__VALUE: 2147483647,
    MIN__VALUE: -2147483648,
});
 
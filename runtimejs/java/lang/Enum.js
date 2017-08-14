//load// java/lang/Object
var java_lang_Enum = _defineClass ("java_lang_Enum", java_lang_Object, null, 
function() {
    this.name = null;
    this.ordinal = 0;
},
{
	_2: function(name,ordinal) {
        this.name = name;
        this.ordinal = ordinal;
        return this;
    },
    
    equals_1 : function(other) {
        return this===other;
    },
    
    hashCode_0 : function() {
        return this.ordinal;
    },
    
    name_0: function() {
        return this.name;
    },
    
    ordinal_0: function() {
        return this.ordinal;
    },
    
    toString_0: function() {
        return this.name;
    }
    
},  null);  // no statics

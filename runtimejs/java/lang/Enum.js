//load// java/lang/Object
var java_lang_Enum = _extendClass (java_lang_Object, {
	_2: function(name,ordinal) {
        this.name = name;
        this.ordinal = ordinal;
        return this;
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
        return this.name_0();
    }
    
 },"java_lang_Enum", null);

 
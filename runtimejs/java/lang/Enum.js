//load// java/lang/Object
var java_lang_Enum = {
    $: function()
    {   this._name = null;
        this._ordinal = 0;
    },
};
_class (java_lang_Enum, java_lang_Object, null, 
"java.lang.Enum"  //replace-me-with-empty-string-for-production//
,{  _2: function(name,ordinal) 
    {   this._name = name;
        this._ordinal = ordinal;
        return this;
    },    

    equals_1 : function(other) 
    {   return this===other;
    },
    
    hashCode_0 : function() {
        return this._ordinal;
    },
    
    name_0: function() {
        return this._name;
    },
    
    ordinal_0: function() {
        return this._ordinal;
    },
    
    toString_0: function() {
        return this._name;
    }    
}); 

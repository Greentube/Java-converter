//load// java/lang/Object
var java_lang_Character = function() 
{   this.c = 0;
};

_class(java_lang_Character, java_lang_Object, null, 
"java.lang.Character"  //replace-me-with-empty-string-for-production//
,{  _1: function(c) 
    {   this.c = c;
        return this;
    },
    
    charValue_0: function() 
    {   return this.c;
    },    
    
    equals_1: function(o) 
    {   if (o!==null && (o instanceof java_lang_Character) && o.c===this.c) 
        {   return true;
        }
        return false;
    },
    
    hashCode_0: function() 
    {   return this.c;
    },   
    
    toString_0: function() 
    {   return String.fromCharCode(this.c);
    },
});
 
    
var java_lang_Character_MAX__VALUE = 0xffff;
var java_lang_Character_MIN__VALUE = 0;

var java_lang_Character_toString_1 = function(c) 
{   return String.fromCharCode(c);
};
var java_lang_Character_valueOf_1 = function(c) 
{   return new java_lang_Character()._1(c);
};

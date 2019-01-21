//load// java/lang/Object
var java_lang_Boolean = function() 
{   this.b = false;
};

_defclass (java_lang_Boolean, java_lang_Object, null, 
{  _1Z: function(b) 
    {   this.b = b;
        return this;
    },
    
    booleanValue_0: function() 
    {   return this.b;
    },
    
    equals_1: function(b)
    {   if (b!==null && (b instanceof java_lang_Boolean) && this.b === b.b) 
        {   return true;
        }
        return false;
    },
    
    hashCode_0: function() 
    {   return this.b ? 1231 : 1237;
    },
    
    toString_0: function() 
    {   return this.b ? "true" : "false";
    },    
});

var java_lang_Boolean_TRUE = new java_lang_Boolean()._1Z(true);
var java_lang_Boolean_FALSE = new java_lang_Boolean()._1Z(false);

var java_lang_Boolean_toString_1 = function(b) 
{   return b ? "true" : "false";
};
var java_lang_Boolean_valueOf_1Z = function(b) 
{   return b ? java_lang_Boolean_TRUE : java_lang_Boolean_FALSE;
};


//load// java/util/HashMapImpl
var java_util_Hashtable = 
{   $: function() 
    {   java_util_HashMapImpl.$.call(this);
    },
};
_class(java_util_Hashtable, java_util_HashMapImpl, null, "java.util.Hashtable", 
{
    // legacy methods only supported by Hashtable but not the Map interface 
    
    clone_0: function() 
    {   return new java_util_Hashtable.$()._1(this);
    },
    
    contains_1: function(value) 
    {   return this.containsValue_1(value);
    },
    
    elements_0: function() 
    {   return new java_util_HashMapIterator.$(this, false, this._collectKeys_0());
    },
    
    keys_0: function()
    {   return new java_util_HashMapIterator.$(this, true, this._collectKeys_0());
    },      
});

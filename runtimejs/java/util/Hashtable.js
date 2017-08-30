//reference// java/util/Enumeration
//load// java/util/HashMapImpl
var java_util_Hashtable = _defineClass("java_util_Hashtable", java_util_HashMapImpl, null, 
function() {
    java_util_HashMapImpl.call(this);
},
null,  // no static
{    
    // legacy methods only supported by Hashtable, but not the Map interface 
    // everything can be easily implemented by just using the methods of the
    // Map interface
    
    clone_0: function() {
        return (new java_util_Hashtable())._1(this);
    },
    
    contains_1: function(value) {
        return this.containsValue_1(value);
    },
    
    elements_0: function() {
        return new java_util_HashMapIterator()._2(this, false);
    },
    
	keys_0: function(){
        return new java_util_HashMapIterator()._2(this, true);
	},      
});


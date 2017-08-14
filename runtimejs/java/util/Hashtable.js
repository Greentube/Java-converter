//reference// java/util/Enumeration
//load// java/util/HashMap
var java_util_Hashtable = _defineClass("java_util_Hashtable", java_util_HashMap, null, {
    
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
        return (new java_util_IteratorEnumeration())._1(this.values_0().iterator_0());
    },
    
	keys_0: function(){
        return (new java_util_IteratorEnumeration())._1(this.keySet_0().iterator_0());
	},
       
},null);


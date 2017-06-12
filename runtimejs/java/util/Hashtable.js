//reference// java/util/IteratorEnumeration
//load// java/lang/Object
//load// java/util/MapImpl
var java_util_Hashtable = _extendClass( java_util_MapImpl, {
    
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
        (new java_util_IteratorEnumeration())._1(this.values_0().iterator_0());
    },
    
	keys_0: function(){
        (new java_util_IteratorEnumeration())._1(this.keySet_0().iterator_0());
	},
       
}, "java_util_Hashtable",  null);


//load// java/lang/Object
var java_util_Enumeration = _defineInterface("java_util_Enumeration", null);

// -- methods:
// boolean	hasMoreElements()
// E	nextElement()


var java_util_IteratorEnumeration = _defineClass("java_util_IteratorEnumeration", java_lang_Object, [java_util_Enumeration], 
    function() {
        this.iterator = null;
    },
{    
    _1: function(iterator) {
        this.iterator = iterator;
        return this;
    },
    
    hasMoreElements_0: function() {
        return this.iterator.hasNext_0();
    },
    
    nextElement_0: function() {  
        return this.iterator.next_0();
    },
    
});


//load// java/util/Enumeration
//load// java/lang/Object
var java_util_IteratorEnumeration = _extendClass( java_lang_Object, {
    
    _1: function(iterator) {
        this.iterator = iterator;
        return this;
    },
    
    hasMoreElements: function() {
        return this.iterator.hasNext();
    },
    
    nextElement: function() {  
        return this.iterator.next();
    },
    
}, "java_util_IteratorEnumeration", [java_util_Enumeration]);


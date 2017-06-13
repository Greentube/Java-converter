//load// java/util/Iterator
//load// java/lang/Object
var java_util_JSArrayIterator = _extendClass( java_lang_Object, {

	_1: function(storage) {
        this.storage = storage;
        this.next = 0;
        return this;
    },
    
    hasNext_0: function() {
        return this.next < this.storage.length;
    },
    
    next_0: function() {
        return this.storage[this.next++];
    },
        
},"java_util_JSArrayIterator", [java_util_Iterator]);

//load// java/util/Iterator
//load// java/lang/Object
var java_util_JSArrayIterator = _extendClass( java_lang_Object, {

	_3: function(storage,from,to) {
        this.storage = storage;
        this.from = from;
        this.to = to;
        this.next = from;
        return this;
    },
    
    hasNext_0: function() {
        return this.next < this.to;
    },
    
    next_0: function() {
        return this.storage[this.next++];
    },
        
},"java_util_JSArrayIterator", [java_util_Iterator]);


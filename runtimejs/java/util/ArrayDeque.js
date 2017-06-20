//load// java/util/AbstractCollection
//load// java/util/Deque
//reference// java/util/JSArrayIterator
//reference// java/util/Iterator

var java_util_ArrayDeque = _extendClass( java_util_AbstractCollection, {

	_0: function() {
        this.storage = [];
        this.firstindex = 0;
        return this;
	},
    
	_1: function(collection) {
        this.storage = collection.toArray_0();
        this.firstindex = 0;
        return this;
	},
    
    add_1: function (obj) {
        this.addLast_1(obj);
        return true;
    },
   
    addAll_1: function(collection) {
        var didappend = false;
        for (var i = collection.iterator_0(); i.hasNext_0(); ) {
            this.addLast_1(i.next_0());
            didappend = true;
        }
        return didappend;
    },
    
    addFirst_1: function (obj) {
        if (this.firstindex>0) {
            this.storage[--this.firstindex] = obj;
        } else {
            this.storage.splice(0,0, null,null,null,null,null,null,null,null,null, obj);  
            this.firstindex=9;
        }
    },   
    
    addLast_1: function (obj) {
        this.storage.push(obj);
    },

    clear_0: function () {
        this.storage = [];
        this.firstindex = 0;
    },
    
    // contains_1:    implemented by AbstractCollection
    // containsAll_1: implemented by AbstractCollection
    
    descendingIterator_0: function() {
        return (new java_util_JSArrayIteratorDescending())
            ._3(this.storage, this.firstindex, this.storage.length);
    },
    
    element_0: function() {
        return this.getFirst_0();
    },
    
    // equals:  implemented by Object
    // hashCode: implemented by Object
    
    getFirst_0: function() {
        return this.storage[this.firstindex];
    },
    
    getLast_0: function() {
        return this.storage[this.storage.length-1];
    },
    
    // isEmpty_0:  implemented by AbstractCollection

    iterator_0: function() {
        return (new java_util_JSArrayIterator())
            ._3(this.storage, this.firstindex, this.storage.length);
    },    
    
    offer_1: function(obj) {
        return this.addLast_1(obj);
    },
    
    offerFirst_1: function(obj) {
        return this.addFirst_1(obj);
    },
    
    offerLast_1: function(obj) {
        return this.addLast_1(obj);
    },
    
    peek_0: function() {
        return this.peekFirst_0();
    },
    
    peekFirst_0: function() {
        if (this.storage.length<=0) return null;
        return this.storage[this.firstindex];
    },
    
    peekLast_0: function() {
        if (this.storage.length<=0) return null;
        return this.storage[this.storage.length-1];
    },
    
    poll_0: function() {
        return this.pollFirst_0();
    },
    
    pollFirst_0: function() {
        if (this.storage.length<=0) return null;
        return this.removeFirst_0();
    },
    
    pollLast_0: function() {
        if (this.storage.length<=0) return null;
        return this.removeLast_0();
    },
    
    pop_0: function() {
        return this.removeFirst_0();
    },
    
    push_1: function(obj) {
        this.addFirst_1(obj);
    },
    
    remove_0: function() {
        return this.removeFirst_0();
    },

//    remove_1:    not implemented
    
    removeFirst_0: function() {
        var e = this.storage[this.firstindex++];
        // check if need to do compaction 
        if (this.firstindex*2 >= this.storage.length) {
            this.storage.splice(0,this.firstindex);
            this.firstindex = 0;
        }
        
        return e;
    },     
    
    removeLast_0: function() {
        var e = this.storage.pop();
        if (this.storage.length==0) this.firstindex=0;
        return e;
    },     
        
//    removeFirstOccurence_1:   not implemented 
//    removeLastOccurence_1:    not implemented
//    removeAll_1:              not implemented
//    retainAll_1:              not implemented
            
    size_0: function() {
        return this.storage.length - this.firstindex;
    },
 
    // toArray_0   implemented by AbstractCollection
    
	
},"java_util_ArrayDeque", [java_util_Deque]);


var java_util_JSArrayIteratorDescending = _extendClass( java_lang_Object, {

	_3: function(storage,from,to) {
        this.storage = storage;
        this.from = from;
        this.to = to;
        this.next = to-1;
        return this;
    },
    
    hasNext_0: function() {
        return this.next >= this.from;
    },
    
    next_0: function() {
        return this.storage[this.next--];
    },
        
},"java_util_JSArrayIteratorDescending", [java_util_Iterator]);

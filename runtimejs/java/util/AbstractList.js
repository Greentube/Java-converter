//reference// java/util/JSArrayIterator
//reference// java/util/Iterator
//load// java/util/List
//load// java/util/AbstractCollection
var java_util_AbstractList = _extendClass( java_util_AbstractCollection, {

	_0: function() {
        this.storage = [];
        return this;
    },
    
	_1: function(collection) {
        this.storage = collection.toArray_0();
        return this;
    },

    add_1: function (obj) {
		this.storage.push(obj);  
        return true;
    },   
   
	add_2: function(index, obj) {
        this.storage.splice (index,0, obj);
    },

    addAll_1: function(collection) {
        var i = collection.iterator_0();
        var didappend = false;
        while (i.hasNext_0()) {
            this.storage.push(i.next_0());
            didappend = true;
        }
        return didappend;
    },
    
    addAll_2: function(index, collection) {
        var i = collection.iterator_0();
        var pos = index;
        var didappend = false;
        while (i.hasNext_0()) {
            this.storage.splice(pos++,0, i.next_0());
            didappend = true;
        }        
        return didappend;
    },          
    
	clear_0: function(){
        this.storage = [];
	},      
    
    //contains       implemented by AbstractCollection
    //containsAll    implemented by AbstractCollection
    
    equals_1: function(b) {
        var s = this.storage.length;
        if (b==null || !(b._is_java_util_List) || s != b.size_0()) {
            return false;
        }
        for (var i=0; i<s; i++) {
            var e1 = this.storage[i];
            var e2 = b.get_1(i);
            if (! (e1==null ? e2==null : e1.equals_1(e2))) return false;
        }
        return true;  
    },

    get_1: function(index) {
        return this.storage[index];	
	},
    
    hashCode_0: function() {
        var hashCode = 1;
        for (var it=this.iterator_0(); it.hasNext_0(); ) {
            var e = it.next_0();
            hashCode = ( 31*hashCode + (e==null ? 0 : e.hashCode_0()) ) & 0xffffffff;
        }
        return hashCode;
    },       
    
	indexOf_1: function (o) {
        for (var i=0; i<this.storage.length; i++) {
            if (o==null ? (this.storage[i]==null) : o.equals_1(this.storage[i])) return i;
        }
        return -1;
    },
	        
    // isEmpty             implemented by AbstractCollection
   
    iterator_0: function() {
        return (new java_util_JSArrayIterator())._3(this.storage,0,this.storage.length);
    },
   
	lastIndexOf_1: function (o) {
        for (var i=this.storage.length-1; i>=0; i--) {
            if (o==null ? (this.storage[i]==null) : o.equals_1(this.storage[i])) return i;
        }
        return -1;
    },
	  
    remove_1: function (obj_or_index) {
        if  (obj_or_index==null || obj_or_index._is_java_lang_Object) {
            var idx = this.indexOf_1(obj_or_index);
            if (idx>=0) {                
                this.storage.splice(idx,1);
                return true;
            } else {
                return false;
            }
        } else {
            var obj = this.storage[obj_or_index];
            this.storage.splice(obj_or_index,1);
            return obj;
        }
    },

    removeAll_1: function (collection) {
        this._filter(collection,false);
    },
    
    retainAll_1: function (collection) {
        this._filter(collection,true);
    },
    
    _filter: function(collection, keep) {
        var s = [];
        for (var i=0; i<this.storage.length; i++) {
            var o = this.storage[i];
            var c = collection.contains_1(o);
            if ((c && keep) || (!c && !keep)) {
                s.push(o);
            }
        }
        this.storage = s;
    },
    
	set_2: function(index, obj) {
		this.storage[index] = obj;
	},
	
	size_0: function() {
		return this.storage.length;
	},

	toArray_0: function () {
        return this.storage.slice();
	},
    
  	            
},"java_util_AbstractList", [java_util_List]);


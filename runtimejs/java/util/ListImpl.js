//load// java/util/Iterator
//load// java/lang/Object
//load// java/util/List
var java_util_ListImpl = _extendClass( java_lang_Object, {

    // -- methods defined in the List interface
    add_1: function (obj) {
		this.storage.push(obj);  
        return true;
    },   
   
	add_2: function(index, obj) {
        this.storage.splice (index,0, obj);
    },
    
    addAll_1: function(collection) {
        var i = collection.iterator_0();
        while (i.hasNext_0()) {
            this.storage.push(i.next_0());
        }
    },
    
    addAll_2: function(index, collection) {
        var i = collection.iterator_0();
        var pos = index;
        while (i.hasNext_0()) {
            this.storage.splice(pos++,0, i.next_0());
        }        
    },          
    
	clear_0: function(){
        this.storage = [];
	},
      
	contains_1: function(obj) {
        return (this.indexOf_1(obj)>=0);
	},
    
	containsAll_1: function(collection) {
        var i = collection.iterator_0();
        while (i.hasNext_0()) {
            if (!this.contains_1(i.next_0())) return false;
        }
	},
     
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
        for (i=0; i<this.storage.length; i++) {
            var e = this.storage[i];
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
	     
	isEmpty_0: function () {
		return this.size_0() <= 0;
	},
   
    iterator_0: function() {
        return (new java_util_ListImplIterator())._1(this.storage);
    },
   
	lastIndexOf_1: function (obj) {
        return this.lastIndexOf_2(obj,this.size_0()-1);
    },
	  
    remove_1: function (obj_or_index) {
        if  (obj_or_index._is_java_lang_Object) {
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
        this.storage = this.storage.filter ( function(e) { return ! collection.contains_1(e); } );
    },
    
    retainAll_1: function (collection) {
        this.storage = this.storage.filter ( function(e) { return collection.contains_1(e); } );
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
    
	toArray_1: function (typetemplatearray) {
        return this.storage.slice();
    },
        
    // -- defined both for ArrayList and Vector, but not in the List interface
	_0: function() {
        this.storage = [];
        return this;
    },
    
	_1: function(collection) {
        this.storage = collection.toArray_0();
        return this;
    },
    
    toString_0: function() {
		var parts = [];	 
        parts.push("[");
		for (var i=0; i<this.storage.length; i++) {    
			if (i>0) {
				parts.push(", ");
			}       
            var o = this.storage[i];
			parts.push((o==null) ? 'null' : o.toString_0());
		}
		parts.push("]");
		return parts.join("");    
	}, 
  	            
},"java_util_ListImpl", [java_util_List]);


var java_util_ListImplIterator = _extendClass( java_lang_Object, {

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
    
    remove_0: function() {
        this.storage.splice(--this.next, 1);
    },
    
},"java_util_ListImplIterator", [java_util_Iterator]);

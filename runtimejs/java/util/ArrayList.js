//load// java/util/AbstractList
var java_util_ArrayList = _defineClass("java_util_ArrayList", java_util_AbstractList, null, {
  
    _0: function() {
        this.storage = [];
        return this;
    },
    
    _1: function(collection) {
        this._0();
        this.addAll_1(collection);
        return this;
    },
  
    get_1: function(index) {
        return this.storage[index];	
	},
    
	set_2: function(index, obj) {
		this.storage[index] = obj;
	},
	    
	add_2: function(index, obj) {
        if(index==this.storage.length) {
            this.storage.push(obj);
        } else if (index==0) {
            this.storage.unshift(obj);
        } else {
            this.storage.splice (index,0, obj);
        }
    },

    remove_1: function (idx) {   
        var obj = this.storage[idx];
        if (idx==0) this.storage.shift();
        else        this.storage.splice(idx,1);
        return obj;                    
    },

	size_0: function() {
		return this.storage.length;
	},
    
    trimToSize_0: function() {
        // no operation. the underlying array is always trimmed.
    },
        
},null); 

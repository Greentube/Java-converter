//load// java/util/AbstractList
var java_util_LinkedList = _extendClass( java_util_AbstractList, {
  
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
    
    
    // convenience methods
    addFirst_1: function(obj) {
        this.add_2(0,obj);
    },
   
    addLast_1: function(obj) {
        this.add_1(obj);
    },
        
    getFirst_0: function() {
        return this.get_1(0);
    },
    
    getLast_0: function() {
        return this.get_1(this.size_0()-1);
    },
        
    removeFirst_0: function() {
        return this.remove_1(0);
    },        
            
    removeLast_0: function() {
        return this.remove_1(this.size_0()-1);
    },
    
}, "java_util_LinkedList", null);


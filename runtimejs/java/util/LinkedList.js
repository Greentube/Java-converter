//load// java/util/AbstractList
var java_util_LinkedList = _defineClass("java_util_LinkedList", java_util_AbstractList, null, 
function() {
    this.head = null;
    this.len = 0;
    this.currentNode = null;
    this.currentIndex = 0;        
},
null,  // no static
{  
    _0: function() {
        var h = { element:null, next:null, prev: null };
        h.next = h;
        h.prev = h;
        this.head = h;
        this.len = 0;
        this.currentNode = h;
        this.currentIndex = -1;
        return this;
    },
    
    _1: function(collection) {
        this._0();
        this.addAll_1(collection);
        return this;
    },
  
    get_1: function(index) {
        return this.seek_1(index).element;
	},
    
	set_2: function(index, element) {
        var n = this.seek_1(index);
        var prev = n.element;
        n.element = element;
        return prev;
	},
	    
	add_2: function(index, element) {
        var n = { element:element, next:null, prev:null };
        var y;
        if (index==this.len) {
            y = this.head;
        } else {
            y = this.seek_1(index); 
            if (this.currentIndex>=index) this.currentIndex++;
        }
        var x = y.prev;
        n.prev = x;
        n.next = y;
        x.next = n;
        y.prev = n;
        this.len++;            
    },

    remove_1: function (index) {   
        var n = this.seek_1(index);
        var x = n.prev;
        var y = n.next;
        x.next = y;
        y.prev = x;
        this.len--;
        if (this.currentIndex>=index) {
            if (this.currentIndex==index) {
                this.currentNode = x;
            }    
            this.currentIndex--;
        }
        return n.element;
    },

	size_0: function() {
		return this.len;
	},
    
    seek_1: function(index) {
        var len = this.len;
        if (index<0 || index>=len) throw new RangeError();
        if (index==0) return this.head.next;
        if (index==this.len-1) return this.head.prev;
            
        // decide in which direction to traverse the list
        var ci = this.currentIndex;
        // the target node is already found
        if (index==ci) return this.currentNode;
            
        var n = null;
        // the target node is before the current one
        if (index<ci) {
            // it is nearer to search from start
            if (index <= ci-index) {
                n = this.head.next;
                for (var i=0; i<index; i++) {
                    n = n.next;
                }
            // it is nearer to search from the current
            } else {
                n = this.currentNode;
                for (var i=ci; i>index; i--) {
                    n = n.prev;
                }                    
            }
        // the target node is after the current one
        } else {
            // it is nearer to search from the current
            if (index-ci <= len-index) {
                n = this.currentNode;
                for (var i=ci; i<index; i++) {
                    n = n.next;
                }
            // it is nearer to search from the end
            } else {
                n = this.head.prev;
                for (var i=len-1; i>index; i--) {
                    n = n.prev;
                }                    
            }
        }
            
        // memorize for later access
        this.currentNode = n;
        this.currentIndex = index;
        return n;
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
    
});


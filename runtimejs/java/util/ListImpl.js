//load// java/lang/Object
//load// java/lang/List
var java_util_ListImpl = _extendClass( java_lang_Object, {

	_0: function() {
        this.storage = [];
        return this;
    },
   
    add_1: function (obj) {
		this.storage.push(obj);  
        return true;
    },   
   
	add_2: function(index, obj) {
        this.storage.splice (index,0, obj);
    },
      
	addElement_1: function(obj) {
		this.storage.push(obj);
	},
	
	clear_0: function(){
        this.storage = [];
	},
   
	clone_0: function () {
		var newVector = (new java_util_Vector())._0();
        newVector.storage = this.storage.slice(0);
        return newVector;
	},
   
	contains_1: function(obj) {
        return (this.indexOf_1(obj)>=0);
	},
   
	copyInto_1: function(array){
		for (var i=0; i<this.size_0(); i++){
			array[i] = this.elementAt_1(i);
		}
	},
	   
	// elementAt_1() -- returns an element at a specified index
	elementAt_1: function(i) {
        return this.storage[i];
	},

    equals_1: function (o) {
        return false;     // TODO
    },
  
	// firstElement_0() -- returns the first element
	firstElement_0: function () {
		return this.storage[0];
	},

    get_1: function(index) {
        return this.storage[index];	
	},

	indexOf_1: function (obj) {
        return this.indexOf_2(obj,0);
    },
	  
    indexOf_2: function (elem, index) {
        // search by equal method
        for (var i=index; i<this.storage.length; i++) {
            var o = this.storage[i];
            if (elem===o) return i;
            if (o===null) {
                if (elem===null) return i;
            } else {
                if (o.equals_1(elem)) return i;
            }
        }
        return -1;
    },
   
    insertElementAt_2: function(obj,index) {
        this.storage.splice (index,0, obj);
    },
      
	isEmpty_0: function () {
		return this.size_0() <= 0;
	},
   
	lastElement_0: function () {
		return this.storage[this.storage.length-1];
	},
   
	lastIndexOf_1: function (obj) {
        return this.lastIndexOf_2(obj,this.size_0()-1);
    },
	  
    lastIndexOf_2: function (elem, index) {
        // search by equal method
        for (var i=index; i>=0; i--) {
            var o = this.storage[i];
            if (o==null) {
                if (elem==null) return i;
            } else {
                if (o.equals_1(elem)) return i;
            }
        }
        return -1;
    },

	removeAllElements_0: function() {
		this.clear_0();
	},
  
	// removeElement_1() -- removes specific element
	removeElement_1: function (obj) {
        var i = this.indexOf_1(obj);
        if (i>=0) {
            this.removeElementAt_1(i);
        }
    },

	removeElementAt_1: function(index) {
		this.storage.splice(index,1);
	}, 

	// setElementAt_2() - overwrites the element with an object at the specific index.
	setElementAt_2: function(obj, index) {
		this.storage[index] = obj;
	},
	
	set_2: function(index, obj) {
		this.storage[index] = obj;
	},
	
	setSize_1: function(newSize){
        if (newSize<this.storage.length) {
            this.storage.splice(newSize, this.storage.length-newSize);
        } else {
            while (this.storage.length<newSize) this.storage.push(null);
        }  
	},

	size_0: function() {
		return this.storage.length;
	},

	toArray_0: function () {
		//no implementation with splice because there are some issues with ios7!?
		var temp = new Array(this.size_0());
	 
		for (var i = 0; i < this.size_0(); i++) {
			temp[i] = this.storage[i];
		}
		return temp;
	},
  
	toString_0: function() {
		var str = "[";
	 
		for (var i=0; i<this.storage.length; i++) {    
			if (i>0) {
				str += ", "
			}       
            var o = this.storage[i];
			str += (o==null) ? 'null' : this.storage[i].toString_0();
		}
		str += "]"
		return str;    
	},
  
    equals_1: function(b) {
        if (b==null || !(b._is_java_util_Vector) || this.size_0() != b.size_0()) {
            return false;
        }
        for (var i=0; i<this.size_0(); i++) {
            var o1 = this.get_1(i);
            var o2 = b.get_1(i);
            if (o1==null) {
                if (o2!=null) return false;
            }
            else if (!o1.equals_1(o2)) {
                return false;
            }
        }
        return true;  
    }
  	
},"java_util_ListImpl", [java_util_List]);


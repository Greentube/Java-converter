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
        // TODO
    },
    
    addAll_2: function(index, collection) {
        // TODO
    },
      
	clear_0: function(){
        this.storage = [];
	},
      
	contains_1: function(obj) {
        return (this.indexOf_1(obj)>=0);
	},
    
	containsAll_1: function(collection) {
        // TODO
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
    },
  
    get_1: function(index) {
        return this.storage[index];	
	},
    
    hashCode_0: function() {
        // TODO
    },

	indexOf_1: function (obj) {
        return this.indexOf_2(obj,0);
    },
	     
	isEmpty_0: function () {
		return this.size_0() <= 0;
	},
   
    iterator_0: function() {
           // TODO
    },
   
	lastIndexOf_1: function (obj) {
        return this.lastIndexOf_2(obj,this.size_0()-1);
    },
	  
    remove_1: function (obj_or_index) {
        // TODO   returns boolean (when given object) or object (when given index)
    },

    removeAll_1: function (collection) {
        // TODO
    },
    
    retailAll_1: function (collection) {
        // TODO
    },
    
	set_2: function(index, obj) {
		this.storage[index] = obj;
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
    
	toArray_1: function (typetemplatearray) {
    },
    
    
    // -- defined both for ArrayList and Vector, but not in the List interface
	_0: function() {
        this.storage = [];
        return this;
    },
    
	_1: function(collection) {
        this.storage = [];
        return this;
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
    
    // note: clone is not generally supported - use constructor with initial content    
  	
},"java_util_ListImpl", [java_util_List]);


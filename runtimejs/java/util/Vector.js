//reference// java/util/Enumeration
//load// java/util/AbstractList
var java_util_Vector = _defineClass("java_util_Vector", java_util_ArrayList, null, 
function() {
    java_util_ArrayList.call(this);
},
null,  // no static
{    
    // legacy methods only supported by Vector (but not the List interface )
    // everything can be easily implemented by just using the existing methods
    
	addElement_1: function(o) {
		this.add_1(o);
	},
	    
    clone_0: function () {
        return (new java_util_Vector())._1(this);
	},   

	copyInto_1: function(array){        
		for (var i=0; i<this.size_0(); i++){
			array[i] = this.get_1(i);
		}
	},
	   
	elementAt_1: function(i) {
        return this.get_1(i);
	},

    elements_0: function() {
        return new java_util_AbstractListIterator()._1(this);
    },
    
	firstElement_0: function () {
		return this.get_1(0);
	},

    indexOf_2: function (o, index) {
        for (var i=index; i<this.size_0(); i++) {
            if (o==null ? (this.get_1(i)==null) : o.equals_1(this.get_1(i))) return i;
        }
        return -1;
    },
    
    insertElementAt_2: function(o,index) {
        this.add_2(index,o);
    },
      
	lastElement_0: function () {
		return this.get_1(this.size_0()-1);
	},
   
    lastIndexOf_2: function (o, index) {
        for (var i=index; i>=0; i--) {
            if (o==null ? (this.get_1(i)==null) : o.equals_1(this.get_1(i))) return i;
        }
        return -1;
    },
    
	removeAllElements_0: function() {
		this.clear_0();
	},
  
	removeElement_1: function (o) {
        var idx = this.indexOf_1(o);
        if (idx>=0) {            
            this.remove_1(idx);
            return true;
        } else {
            return false;
        }
    },

	removeElementAt_1: function(index) {
        this.remove_1(index);
	}, 

	setElementAt_2: function(o, index) {
		this.set_2(index,o);
	},
	
	setSize_1: function(newsize){
        if (newsize<=0) {
            this.clear_0();
        } else {
            var need = newsize - this.size_0();
            if (need>0) {
                for (var i=0; i<need; i++) this.add_1(null);
            } else if (need<0) {
                for (var i=this.size_0()-1; i>=newsize; i--) this.remove_1(i);
            }
        }
	},   
});

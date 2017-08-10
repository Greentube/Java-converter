// Contains some common accessor methods that are usable in all Collections
// All this methods here are implemented by just using the iterator that
// is provided by all Collections. This is of course very inefficient and
// should be overwritten by a better implementation where possible.

//load// java/lang/Object
//load// java/util/Collection
//reference// java/util/Iterator
var java_util_AbstractCollection = _defineClass("java_util_AbstractCollection", java_lang_Object, [java_util_Collection], {

	contains_1: function(obj) {
        var i = this.iterator_0();
        while (i.hasNext_0()) {
            var o = i.next_0();
            if (obj==null ? o==null : obj.equals_1(o)) return true;
        }
        return false;
	},
    
	containsAll_1: function(collection) {
        var i = collection.iterator_0();
        while (i.hasNext_0()) {
            if (!this.contains_1(i.next_0())) return false;
        }
        return true;
	}, 
        
    // equals_1     // default object behaviour
    // hashCode_0   // default object behaviour

	isEmpty_0: function () {
        return this.size_0()<=0;
	},
    
    //iterator        abstract - must be implemented by subclass
    //size            abstract - must be implemented by subclass

	toArray_0: function () {
        var a = [];
        for (var i=this.iterator_0(); i.hasNext_0(); ) {
            a.push(i.next_0());
        }
        return a;        
	},
          
    toString_0: function() {
		var parts = [];	 
        parts.push("[");
        for (var i=this.iterator_0(); i.hasNext_0(); ) {
			if (parts.length>1) {
				parts.push(", ");
			}       
            var o = i.next_0();
			parts.push((o==null) ? 'null' : o.toString_0());
		}
		parts.push("]");
		return parts.join("");    
	}, 
    
});



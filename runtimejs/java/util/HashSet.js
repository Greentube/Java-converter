//reference// java/util/HashMap
//load// java/lang/Object
//load// java/util/AbstractCollection
//load// java/util/Set
var java_util_HashSet = _extendClass( java_util_AbstractCollection, {
    
    _0: function() {
        this.map = (new java_util_HashMap())._0();
        return this;
    },
    
    _1: function(collection) {
        this.map = (new java_util_HashMap())._0();
        for (var it = collection.iterator_0(); it.hasNext_0(); ) {
            this.map.put_2(it.next_0(),"")
        }
        return this;
    },
    
    add_1: function(e) {
        return this.map.put_2(e,"")==null;
    },
    
    addAll_1: function(collection) {
        var i = collection.iterator_0();
        var didappend = false;
        while (i.hasNext_0()) {
            if (this.add_1(i.next_0())) {
                didappend = true;
            }
        }
        return didappend;
    },
    
    clear_0: function() {
        this.map.clear_0();
    },
    
    contains_1: function(e) {
        return this.map.containsKey_1(e);
    },
    
    // containsAll    implemented by AbstractCollection
    
    equals_1: function(s) {
        return this.map.keySet_0().equals_1(s);
    },
    
    hashCode_0: function() {
        return this.map.keySet_0().hashCode_0();
    },
    
    // isEmpty     implemented by AbstractCollection
    
    iterator_0: function() {
        return this.map.keySet_0().iterator_0();
    },
    
    remove_1: function(e) {
        return this.map.remove_1(e)!=null;
    },
    
    
    size_0: function() {
        return this.map.size_0();
    },
    
    // toArray   implemented by AbstractCollection
    // toString  implemented by AbstractCollection
    
    
}, "java_util_HashSet", [java_util_Set]);

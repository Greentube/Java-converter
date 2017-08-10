//load// java/util/Map
//load// java/util/Set
//load// java/util/AbstractCollection
//load// java/util/Iterator

var java_util_HashSet = _extendClass( java_util_AbstractCollection, {

        _0: function() {
            this.map = (new java_util_HashMap())._0();
            return this;
        },
        
        _1: function(collection) {
            this._0();
            this.addAll_1(collection);
            return this;
        },
        
        add_1: function(e) { 
            return this.map.put_2(e, java_util_HashSet.prototype.PRESENT_f)==null;
        },           
        
        addAll_1: function(c) {
            var i = c.iterator_0();
            var didappend = false;
            while (i.hasNext_0()) {
                if (this.add(i.next_0())) {
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
        
        // containsAll        implemented by AbstractCollection
                    
        equals_1: function(o) { 
            if (o==null || !(o._is_java_util_Set)) return false;            
            var s = o;
            if (this.size_0() != s.size_0()) return false;
            for (var it=s.iterator_0(); it.hasNext_0(); ) {
                if (! this.contains_1(it.next_0())) return false;
            }            
            return true; 
        },
                
        hashCode_0: function() { 
            return this.map.keySet_0().hashCode_0();
        },
        
        // isEmpty       implemented by AbstractCollection
        
        iterator_0: function() {
            return this.map.keySet_0().iterator_0();
        },
                
        remove_1: function(key) { 
            return this.map.remove_1(key)!=null;
        },
        
        removeAll_1: function(collection) {
            var i = collection.iterator_0();
            var didremove = false;
            while (i.hasNext_0()) {
                if (this.remove(i.next_0())) {
                    didremove = true;
                }
            }        
            return didremove;            
        },
        
        retainAll_1: function(collection) {
            var i = this.iterator_0();
            var didremove = false;
            while (i.hasNext_0()) {
                var e = i.next_0();
                if (!collection.contains_1(e)) {
                    i.remove_0();
                    didremove = true;
                }
            }
            return didremove;
        },
        
        size_0: function() { 
            return this.map.size_0();
        }
        
        // toArray   implemented by AbstractCollection 
        // toString  implemented by AbstractCollection
    
},  "java_util_HashSet", [java_util_Set]);

java_util_HashSet.prototype.PRESENT_f = (new java_lang_Object())._0();

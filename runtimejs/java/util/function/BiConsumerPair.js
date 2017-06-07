//load// java/lang/Object
var java_util_function_BiConsumerPair = _extendClass( java_lang_Object, {
    
    _2: function(a,b) {
		this.a_f = a;
		this.b_f = b;
        return this;
    },
    
    accept_2: function(t,u) {
       this.a_f.accept_1(t,u);
       this.b_f.accept_1(t,u);
    }

}, "java_util_function_BiConsumerPair", [java_util_function_BiConsumer]);

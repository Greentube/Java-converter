//load// java/lang/Object
var java_util_function_ConsumerPair = _extendClass( java_lang_Object, {
    
    _2: function(a,b) {
		this.a_f = a;
		this.b_f = b;
        return this;
    },
    
    accept_1: function(t) {
       this.a_f.accept_1(t);
       this.b_f.accept_1(t);
    }

}, "java_util_function_ConsumerPair", [java_util_function_Consumer]);

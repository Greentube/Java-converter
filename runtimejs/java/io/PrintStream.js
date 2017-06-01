
//reference// java/lang/String

//load// java/lang/Object
var java_io_PrintStream = _extendClass (java_lang_Object, {

	initialConstructor_1: function(iserr) {
        this.iserr_f = iserr;
        return this;
    },
    
	println_1: function(obj) {
		if (this.iserr_f) {
            console.warn(obj);
        } else {
            console.log(obj);
        }
    },
    
},"java_io_PrintStream", []);


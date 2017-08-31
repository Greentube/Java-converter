
//load// java/lang/Object
var java_io_PrintStream = {
    $: function() {
        this._iserr = false;
        this._line = null;
    },
};
_class (java_io_PrintStream, java_lang_Object, null, "java.io.PrintStream", {
	_1: function(iserr) {
        this._iserr = iserr;
        this._line = [];
        return this;
    },
        
	print_1: function(o) {
        var s = (o==null) ? "null" : o._is_java_lang_Object ? o.toString_0() : String(o);
        this._line.push(s);
    },
        
	println_0: function() {
		if (this._iserr) {
            console.warn(this._line.join(""));
        } else {
            console.log(this._line.join(""));
        }
        this._line = [];
    },
    
    println_1(x) {
        this.print_1(x);
        this.println_0();
    },       
});


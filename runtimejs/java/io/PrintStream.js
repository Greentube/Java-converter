
//load// java/lang/Object
var java_io_PrintStream = _defineClass ("java_io_PrintStream", java_lang_Object, null, 
    function() {
        this.iserr = false;
        this.line = null;
    },
{
	_1: function(iserr) {
        this.iserr = iserr;
        this.line = [];
        return this;
    },
        
	print_1: function(x) {
        this.line.push(String(x));
    },
        
	println_0: function() {
		if (this.iserr_f) {
            console.warn(this.line.join(""));
        } else {
            console.log(this.line.join(""));
        }
        this.line = [];
    },
    
    println_1(x) {
        this.print_1(x);
        this.println_0();
    },       
});


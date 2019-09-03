
//load// java/lang/Object
var java_io_PrintStream = function() 
{   java_lang_Object.call(this);
    this._warn = false;
    this._line = null;    
};
_defclass (java_io_PrintStream, java_lang_Object, null, 
{
    _1: function(warn) 
    {   this._warn = warn;
        this._line = [];
        return this;
    },     

    print_1Z: function(v) 
    {   this._line.push(v?"true":"false");
    },
    print_1D: function(v) 
    {   this._line.push(_d2s(v));
    },
    print_1C: function(v) 
    {   this._line.push(_c2s(v));
    },
    print_1I: function(v) 
    {   this._line.push(v);
    },
    print_1Ljava_lang_Object$: function(v) 
    {   var s = (v===null) ? "null" : v.toString_0();
        this._line.push(s);
    },    
    print_1Ljava_lang_String$: function(v) 
    {   this._line.push(v===null ? "null" : v);
    },
    
    println_0: function() 
    {   var l = this._line.join("");
        this._line = [];
        if (this._warn) console.warn(l);
        else            console.log(l);
    },
    
    println_1Z: function(v) 
    {   this.print_1Z(v);
        this.println_0();
    },
    println_1D: function(v) 
    {   this.print_1D(v);
        this.println_0();
    },
    println_1C: function(v) 
    {   this.print_1C(v);
        this.println_0();
    },
    println_1I: function(v) 
    {   this.print_1I(v);
        this.println_0();
    },
    println_1Ljava_lang_Object$: function(v) 
    {   this.print_1Ljava_lang_Object$(v);
        this.println_0();
    },
    println_1Ljava_lang_String$: function(v) 
    {   this.print_1Ljava_lang_String$(v);
        this.println_0();
    }
});

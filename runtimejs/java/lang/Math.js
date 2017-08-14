//load// java/lang/Object
var java_lang_Math = _defineClass("java_lang_Math", java_lang_Object, null, 
function() {       
},
{   // no instance methods
},{ // statics
    abs_1: Math.abs,
    acos_1: Math.acos,
    asin_1: Math.asin,
    atan_1: Math.atan,
    atan2_2: Math.atan2,
    ceil_1: Math.ceil,
    cos_1: Math.cos,
    exp_1: Math.exp,
    floor_1: Math.floor,
    // IEEEremainder: // not supported
    log_1: Math.log,
    max_2: Math.max,
    min_2: Math.min,
    pow_2: Math.pow,
    round_1: Math.round,  // deprecated
    rint_1: function (x) {
        if (x % 0.5 !== 0) {        
            return Math.round(x);
        } else {
            return (Math.floor(x) % 2 === 0) ? Math.floor(x) : Math.round(x);
        }
    },
    sin_1: Math.sin,
    sqrt_1: Math.sqrt,
    tan_1: Math.tan,

    // No native support for log10 in all common browsers yet, workaround returns imprecise result, unlike Java's and e.g. Chrome's log10 implementations.
    log10_1: (typeof Math.log10 === "function") ? Math.log10 :
                function(x) {
                        var result = Math.log(x) * Math.LOG10E;
                        var rounded = Math.round(result);        
                        if(Math.abs(Math.round(result) - (result)) < 0.00000000000001)
                            return rounded;
                        else
                            return result;
                },
    
    E:  2.718281828459045, 
    PI: 3.141592653589793,
});

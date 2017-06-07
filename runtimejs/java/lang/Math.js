//load// java/lang/Object
var java_lang_Math = _extendClass( java_lang_Object, {} }, "java_lang_Math", [] );

java_lang_Math.s.abs_1 = Math.abs;
java_lang_Math.s.acos_1 = Math.acos;
java_lang_Math.s.asin_1 = Math.asin;
java_lang_Math.s.atan_1 = Math.atan;
java_lang_Math.s.atan2_2 = Math.atan2;
java_lang_Math.s.ceil_1 = Math.ceil;
java_lang_Math.s.cos_1 = Math.cos;
java_lang_Math.s.exp_1 = Math.exp;
java_lang_Math.s.floor_1 = Math.floor;
// java_lang_Math.s.IEEEremainder(f1,f2) = // not supported
java_lang_Math.s.log_1 = Math.log;
java_lang_Math.s.max_2 = Math.max;
java_lang_Math.s.min_2 = Math.min;
java_lang_Math.s.pow_2 = Math.pow;
java_lang_Math.s.round_1 = Math.round;  // deprecated
java_lang_Math.s.rint_1 = Math.round;
java_lang_Math.s.sin_1 = Math.sin;
java_lang_Math.s.sqrt_1 = Math.sqrt;
java_lang_Math.s.tan_1 = Math.tan;

    // No native support for log10 in all common browsers yet, workaround returns imprecise result, unlike Java's and e.g. Chrome's log10 implementations.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log10
    if(typeof Math.log10 === "function") {
      java_lang_Math.s.log10_1 = Math.log10;
    }
    else {
      java_lang_Math.s.log10_1 = function log10(x) {
        // e.g. in Firefox 24.1.1, the following returns -1.9999999999999996 instead of -2 for x = 0.01
        // similar to workaround using Math.LN10, except probably faster and seems to work better for
        // threshold cases >= 1, like 100, 10000, etc.
        var result = Math.log(x) * Math.LOG10E;
        var rounded = Math.round(result);
        
        // correct rounding error
        if(Math.abs(Math.round(result) - (result)) < 0.00000000000001)
          return rounded;
        else
          return result;
      }
    }

java_lang_Math.s.E_f =  2.718281828459045; 
java_lang_Math.s.PI_f = 3.141592653589793;

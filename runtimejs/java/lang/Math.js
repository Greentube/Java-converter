var java_lang_Math_E =  Math.E;
var java_lang_Math_PI =  Math.PI;

var java_lang_Math_abs_1 = Math.abs;
var java_lang_Math_absInt_1 = function(x) 
{   return (x>=0) ? x : (-x)|0;
};
var java_lang_Math_acos_1 = Math.acos;
var java_lang_Math_asin_1 = Math.asin;
var java_lang_Math_atan_1 = Math.atan;
var java_lang_Math_atan2_2 = Math.atan2;
var java_lang_Math_ceil_1 = Math.ceil;
var java_lang_Math_cos_1 = Math.cos;
var java_lang_Math_cosh_1 = 
    (typeof Math.cosh === "function") ? Math.cosh : function(x) 
    {   return (Math.exp(x) + Math.exp(-x)) / 2;
    };
var java_lang_Math_exp_1 = Math.exp;
var java_lang_Math_floor_1 = Math.floor;
var java_lang_Math_IEEEremainder_2 = function(a,b)
{   if (isNaN(a) || isNaN(b) || !isFinite(a) || b===0) 
    {   return NaN;     
    }
    if (!isFinite(b)) 
    {   return a;
    }
    var n = java_lang_Math_rint_1(a/b);
    return a - n * b;
};
var java_lang_Math_hypot_2 =
    (typeof Math.hypot === "function") ? Math.hypot : function(a,b) 
    {   return Math.sqrt(a*a+b*b);
    };
var java_lang_Math_log_1 = Math.log;
var java_lang_Math_log10_1 =
    (typeof Math.log10 === "function") ? Math.log10 : function(x) 
    {   var result = Math.log(x) * Math.LOG10E;
        var rounded = Math.round(result);        
        return Math.abs(rounded-result) < 0.00000000000001 ? rounded : result;
    };    
var java_lang_Math_max_2 = Math.max;    
var java_lang_Math_min_2 = Math.min;
var java_lang_Math_pow_2 = Math.pow;
var java_lang_Math_rint_1 = function (x) 
{   if (x % 0.5 !== 0) 
    {   return Math.round(x);
    } 
    else 
    {   return (Math.floor(x) % 2 === 0) ? Math.floor(x) : Math.round(x);
    }
};
var java_lang_Math_roundAsDouble_1 = function (x) 
{   if (isNaN(x)) return 0;
    var large = 9.223372036854776E18;
    if (x>=large)  return large;
    if (x<=-large) return -large;
    return Math.round(x);
};
var java_lang_Math_roundAsInt_1 = function (x) 
{   if (isNaN(x)) return 0;
    var large = 9.223372036854776E18;
    if (x>=large) return -1;
    if (x<=-large) return 0;
    return Math.round(x) | 0;
};
var java_lang_Math_signum_1 = function(x) 
{   return x<0 ? -1 : x>0 ? 1 : x;
};
var java_lang_Math_sin_1 = Math.sin;
var java_lang_Math_sinh_1 = 
    (typeof Math.sinh === "function") ? Math.sinh : function(x) 
    {   return (Math.exp(x) - Math.exp(-x)) / 2;
    };    
var java_lang_Math_sqrt_1 = Math.sqrt;    
var java_lang_Math_tan_1 = Math.tan;    
var java_lang_Math_tanh_1 =
    (typeof Math.tanh === "function") ? Math.tanh : function(x) 
    {   return 1 - 2/(Math.exp(2*x)+1);
    };
var java_lang_Math_toDegrees_1 = function(x) 
{   return x*180/Math.PI;
};
var java_lang_Math_toRadians_1 = function(x) 
{   return x*(Math.PI/180);
};    


//load// java/lang/Object
var java_lang_Math = 
{    
    abs_1: Math.abs,
    absInt_1: function(x) 
    {   return (x>=0) ? x : (-x)|0;
    },
    
    acos_1: Math.acos,
    
    asin_1: Math.asin,
    
    atan_1: Math.atan,
    
    atan2_2: Math.atan2,
    
    ceil_1: Math.ceil,
    
    cos_1: Math.cos,
    
    cosh_1: (typeof Math.cosh === "function") ? Math.cosh : function(x) 
    {   return (Math.exp(x) + Math.exp(-x)) / 2;
    },
    
    exp_1: Math.exp,
    
    expm1_1: (typeof Math.expm1 === "function") ? Math.expm1 : function(x) 
    {   return Math.exp(x) - 1;
    },
    
    floor_1: Math.floor,
    
    IEEEremainder_2:  function(a,b)
    {   if (isNaN(a) || isNaN(b) || !isFinite(a) || b===0) 
        {   return NaN;     
        }
        if (!isFinite(b)) 
        {   return a;
        }
        var n = java_lang_Math.rint_1(a/b);
        return a - n * b;
    },
    
    hypot_2: (typeof Math.hypot === "function") ? Math.hypot : function(a,b) 
    {   return Math.sqrt(a*a+b*b);
    },
    
    log_1: Math.log,
    
    log1p_1: (typeof Math.log1p === "function") ? Math.log1p : function(x) 
    {   return Math.log(1+x);
    },
    
    log10_1: (typeof Math.log10 === "function") ? Math.log10 : function(x) 
    {   var result = Math.log(x) * Math.LOG10E;
        var rounded = Math.round(result);        
        return Math.abs(rounded-result) < 0.00000000000001 ? rounded : result;
    },  
    
    max_2: Math.max,
    
    min_2: Math.min,
    
    pow_2: Math.pow,
    
    rint_1: function (x) 
    {   if (x % 0.5 !== 0) 
        {   return Math.round(x);
        } 
        else 
        {   return (Math.floor(x) % 2 === 0) ? Math.floor(x) : Math.round(x);
        }
    },
    
    round_1: function (x) 
    {   if (isNaN(x)) return 0;
        var large = 9.223372036854776E18;
        if (x>=large)  return large;
        if (x<=-large) return -large;
        return Math.floor(x+0.5);
    },
    
    signum_1: function(x) 
    {   return x<0 ? -1 : x>0 ? 1 : x;
    },
    
    sin_1: Math.sin,
    
    sinh_1: (typeof Math.sinh === "function") ? Math.sinh : function(x) 
    {   return (Math.exp(x) - Math.exp(-x)) / 2;
    },
    
    sqrt_1: Math.sqrt,
    
    tan_1: Math.tan,
    
    tanh_1: (typeof Math.tanh === "function") ? Math.tanh : function(x) 
    {   return 1 - 2/(Math.exp(2*x)+1);
    },
    
    toDegrees_1: function(x) 
    {   return x*180/Math.PI;
    },
    
    toRadians_1: function(x) 
    {   return x*Math.PI/180;
    },        
    
    E:  Math.E,
    PI: Math.PI,
};

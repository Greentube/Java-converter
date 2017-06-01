//load// java/lang/Object
var com_greentube_gameutil_Convert = _extendClass( java_lang_Object,  {
  
    stringToInt_1: function(s)
    {
        return com_greentube_gameutil_Convert.prototype.stringToInt_2(s,0);
    },
    
    stringToInt_2: function(s, def) {
        if ((s==null) || (s.length_0() < 1)) {
            return (def);
        }
        var sign = 1;
        if (s.startsWith_1("+")) {
            s = s.substring_1(1);
        } else if (s.startsWith_1("-")) {
            s = s.substring_1(1);
            sign = -1;
        }
        while (s.startsWith_1("0") && s.length>1) {
            s = s.substring_1(1);
        }        
        var intvalue = parseInt(s);
        if (isNaN(intvalue) || !(intvalue.toString()===s)) {
          return def;
        }
        return sign*intvalue;
    },
    
    hexToInt_1: function(s) {
        if ((s==null) || (s.length_0() < 1)) {
            return (0);
        }
        var sign = 1;
        if (s.startsWith_1("+")) {
            s = s.substring_1(1);
        } else if (s.startsWith_1("-")) {
            s = s.substring_1(1);
            sign = -1;
        }
        while (s.startsWith_1("0") && s.length>1) {
            s = s.substring_1(1);
        }        

        var intvalue = parseInt(s, 16);
        if (isNaN(intvalue) || !(intvalue.toString(16)===s.toLowerCase())) {
          return 0;
        }
        return sign*intvalue;
    },
        
    stringToDouble_1: function(s) {
        return com_greentube_gameutil_Convert.prototype.stringToDouble_2(s, 0);
    },

    stringToDouble_2: function(s, def) {
        if (s==null || s.length_0()<1) {
            return def;
        }
        if (s.startsWith_1("+")) {
            s = s.substring_1(1);
        }
//        if (s.startsWith("NaN") || s.startsWith("Infinity")) {
//            return def;
//        }
        if (!isFinite(+s)) return def;
        
        var v = parseFloat(s);
        if (!isFinite(v)) return def;
        return v;
    },

    stringToInt_4: function(s, offset, length, def) {
        if ((s.length_0()<offset+length)) {return (def);}
        return com_greentube_gameutil_Convert.prototype.stringToInt_2(s.substring_2(offset,offset+length), def);
    },
    
    stringToInt_3: function(s, offset, length)
    {
        return (com_greentube_gameutil_Convert.prototype.stringToInt_4(s, offset, length, 0));
    },
    
    charToString_1: function(c)
    {
        return String.fromCharCode(c);
    },
    
    doubleToInt_1: function(d)
    {
        if (d>=0) return Math.floor(d+0.5);
        else      return Math.ceil(d-0.5); 
    },
    
    doubleToStringRounded_1: function(n)
    {
        return com_greentube_gameutil_Convert.prototype.doubleToStringRounded_2(n, "");
    },

    doubleToStringRounded_2: function(n, tsddot)
    {
    	if ((n<0)) {
        return ("-"+com_greentube_gameutil_Convert.prototype.printNonnegativeIntegralDouble_2((Math.round((-n))),(tsddot)));
      }
    	else {
        return (com_greentube_gameutil_Convert.prototype.printNonnegativeIntegralDouble_2((Math.round((n))),(tsddot)));
     }
    },
    
    printNonnegativeIntegralDouble_2: function(n, tsddot) {
        if (!(n>=1000 && n<(1.0e+100))) return (""+Math.floor(n))
        var  tsd = Math.floor((n/1000.0));

        var  rest = (n-tsd*1000.0).toString();
        while ((rest.length_0()<3)) {rest = ("0" + rest);}

        return com_greentube_gameutil_Convert.prototype.printNonnegativeIntegralDouble_2
          ((tsd),(tsddot)) + tsddot + rest;
    }, 
 
},"com_greentube_gameutil_Convert", []);


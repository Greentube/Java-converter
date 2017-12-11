
// definition of the base class for all java classes except for String and arrays
var java_lang_Object = 
{   $: function() {}    // allocator function
};

// add default member functions
java_lang_Object.$.prototype._0 = function()
{   return this;
};

java_lang_Object.$.prototype.toString_0 = function()
{   return this._classname;
};

java_lang_Object.$.prototype.equals_1 = function(a)
{   return this===a;
};

java_lang_Object.$.prototype.hashCode_0 = function()
{   // there is no real way to access any true object identity, so use a hash of the class name instead
    return this._classname.hashCode_0();  
};

// add default attributes 
java_lang_Object.$.prototype._interfaces = [];
java_lang_Object.$.prototype._classname = "java.lang.Object";

// ---- global toolbox functions for classes and arrays ----

// set up a class to use its instances (set up prototype chain, etc.)
function _class (classobject, base, interfaces, classname, instancemethods)
{
    // connect prototype chain
    classobject.$.prototype = Object.create(base.$.prototype);
    classobject.$.prototype.constructor = classobject.$;
  
    // add attributes than can be used to check for class/interface type
    classobject.$.prototype._classname = classname;
    classobject.$.prototype._interfaces = base.$.prototype._interfaces;
    
    // add/overwrite methods that are newly defined
    if (instancemethods) 
    {   for (var name in instancemethods) 
        {   classobject.$.prototype[name] = instancemethods[name];
        }
    }  
    
    // recursively traverse all interfaces/super-interfaces and memorize what this object implements
    // also set up the default methods that are defined by the interface if they are not yet 
    // provided by the class itself
    collectInterfaces(interfaces);
  
    function collectInterfaces(implementedinterfaces) 
    {   var proto = classobject.$.prototype;
        for (var index=0; implementedinterfaces && index<implementedinterfaces.length; index++) 
        {   var inf = implementedinterfaces[index];
            // memorize that the object implements the interface
            if (proto._interfaces.indexOf(inf)<0) proto._interfaces = proto._interfaces.concat([inf]);            
            // wire up missing default methods
            if (inf._defaults)
            {   for (var mname in inf._defaults)
                {   if (!proto[mname]) 
                    {   proto[mname] = inf._defaults[mname];
                    }
                }
            }            
            // recursively scan all superinterfaces
            collectInterfaces(inf._superinterfaces);
        }
    }
}

// test if an arbitrary java.lang.Object implements a given Interface
function _implements(x,intrfc)
{   return (x===null) ? false : (x._interfaces.indexOf(intrfc)>=0);
}

// test if an arbitrary object is a String
function _isstr(o) 
{   return o!==null && o._isString;
}

function _isarray(o,typedescriptor) 
{   return o!==null && o._t===typedescriptor;
}        

// convert a unicode code number to a string with the corresponding letter 
function _c2s(c) 
{   return String.fromCharCode(c);
}

// convert any primitive type to a string 
function _p2s(c) 
{   return String(c);
}

// convert any object to a string - and give "null" for null reference
function _str(o) 
{   if (o===null) return "null";
    return o.toString_0();    
}

// string object creation from char array
function _array2str(chararray) 
{   return String.fromCharCode.apply(null, chararray);
}

function _subarray2str(chararray,offset,count) 
{   return String.fromCharCode.apply(null, chararray.slice(offset,offset+count));
}

// integer multiplication with correct behaviour for large operands
var _imul = (typeof Math.imul === "function") ? Math.imul : function(a, b) 
{   var ah = (a >>> 16) & 0xffff;
    var al = a & 0xffff;
    var bh = (b >>> 16) & 0xffff;
    var bl = b & 0xffff;
    // the shift by 0 fixes the sign on the high part
    // the final |0 converts the unsigned value into a signed value
    return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
};

// do some numerical cast operations
function _castTObyte(a) 
{   return _castTOint(a) << 24 >> 24;
}

function _castTOchar(a) 
{   return _castTOint(a) & 0xffff;
}

function _castTOint(a) 
{   // check various possibilities for a (could be NaN)
    if (a>=0) 
    {   // is a positive number (comparator would fail otherwise)
        if (a>2147483647) return 2147483647
        return Math.floor(a);
    }
    else if (a<=0) 
    { // is a negative number
        if (a<-2147483648) return -2147483648;
        return Math.ceil(a);    
    }
    else
    {   // is no number at all
        return 0;
    }
}


// attach runtime type information to an already created javascript array.
// returns the array itself for easy chaining
function _arr(typedescriptor,a)
{   a._t = typedescriptor;
    return a;
}

// create a (possible multidimensional) array with a single 
// initialization value for all elements.
// the sizes for the dimensions are given as arguments 1 to n, and the 
// initialization value is the last call argument.

function _dim(typedescriptor,dimensions,initvalue) 
{   return _dimImpl(typedescriptor,dimensions,initvalue,0);
}

function _dimImpl(typedescriptor,dimensions,initvalue,cursor)
{   if (cursor>=dimensions.length-1) 
    {   var len = dimensions[cursor];
        var a = new Array(len);
        for (var i=0; i<len; i++) 
        {   a[i] = initvalue;
        }
        a._t = typedescriptor;
        return a;
    }
    else 
    {   var len = dimensions[cursor];
        var a = new Array(len);
        for (var i=0; i<len; i++) 
        {   a[i] = _dimImpl(typedescriptor.substring(1), dimensions,initvalue, cursor+1);
        }
        a._t = typedescriptor;
        return a;    
    }
}

// do some patching of the built-in array protoype to allow easy
// integration with other java objects.
// Be aware that this now messes up any use of  
// any  for (x in array) loop on the entirety of the program,
// DO NOT USE such a loop!

Array.prototype._interfaces = [];

Array.prototype.equals_1 = function (o) 
{   return this===o;
};

Array.prototype.toString_0 = function () 
{   return this._t;
};

Array.prototype.hashCode_0 = function () 
{   return 2;
};

// extend the javascript String object by monkey-patching in the necessary
// java methods and attributes

String.prototype._isString = true;  // reliable way to test if anything is a string
String.prototype._interfaces = [];

String.prototype.charAt_1 = function(x) 
{   return this.charCodeAt(x);
};

String.prototype.compareTo_1 = function (str) 
{   var l1 = this.length;
    var l2 = str.length;    
    for (var i=0; i<l1 && i<l2; i++) {
        var c1 = this.charCodeAt(i);
        var c2 = str.charCodeAt(i);
        if (c1!==c2) {
            return c1-c2;
        }
    }
    return l1-l2;
};

String.prototype.concat_1 = function (str) 
{   return this.concat(str);
};

String.prototype.endsWith_1 = function(suffix) 
{   return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.equals_1 = function(str) 
{   if (!str || !(str._isString)) return false;  
	return this == str;
};

String.prototype.hashCode_0 = function()
{   var h = 0;
    var l = this.length;
    for (var i=0; i<l; i++) {
       h = (h*31 + this.charCodeAt(i)) | 0;
    }
    return h;
};   

String.prototype.indexOf_1 = function(str) 
{   if (str===null) 
    {   return -1;
    }
    else if (str._isString) 
    {   return this.indexOf(str);
    } 
    else 
    {   return this.indexOf(String.fromCharCode(str));
    }
};

String.prototype.indexOf_2 = function(str, x) 
{   if (str===null) 
    {   return -1;
    }
    else if (str._isString) 
    {   return this.indexOf(str,x);
    }
    else 
    {   return this.indexOf(String.fromCharCode(str),x);
    }
};

String.prototype.isEmpty_0 = function()
{   return this.length_0() === 0;  
};   

String.prototype.lastIndexOf_1 = function(str) 
{   if (str===null) 
    {   return -1;
    } 
    else if (str._isString) 
    {   return this.lastIndexOf(str);
    }
    else 
    {   return this.lastIndexOf(String.fromCharCode(str));
    }
};

String.prototype.lastIndexOf_2 = function(str, x) 
{   if (str===null) 
    {   return -1;
    }
    else if (str._isString) 
    {   return this.lastIndexOf(str, x);
    } 
    else 
    {   return this.lastIndexOf(String.fromCharCode(str), x);
    }
};

String.prototype.length_0 = function () 
{   return this.length;
};

String.prototype.replace_2 = function (oldChar, newChar) 
{   var s = String.fromCharCode(oldChar);
    if (s===".") s="\\."; // avoid confusion with regular expression syntax
    return this.replace(new RegExp(s,"g"),String.fromCharCode(newChar));
};

String.prototype.startsWith_1 = function(prefix) 
{   return this.indexOf(prefix) === 0;
};

String.prototype.substring_1 = function(start) 
{   return this.substring(start);
};

String.prototype.substring_2 = function(start,end) 
{   return this.substring(start,end);
};  

String.prototype.toCharArray_0 = function () 
{   var chararray = this.split('');
    var i = 0;
    chararray.forEach(function(entry) {
        chararray[i] = entry.charCodeAt();
        i++;
    });
    return chararray;
};

String.prototype.toString_0 = function() 
{   return this;
};

String.prototype.trim_0 = function() 
{   return this.trim();
};


// definition of the base class for all java classes except for String and arrays
var java_lang_Object = 
{   $: function() {}    // allocator function
};

// add default member functions
java_lang_Object.$.prototype._0 = function()
{   return this;
};

java_lang_Object.$.prototype.toString_0 = function()
{   return this._classname+"@"+this.hashCode_0();
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
java_lang_Object.$.prototype._baseclasses = [ java_lang_Object ];
java_lang_Object.$.prototype._classname = 
"java.lang.Object"  //replace-me-with-empty-string-for-production//
;

// ---- global toolbox functions to create various error objects ----
var _ClassCastException = function() { return new TypeError("ClassCastException"); };
var _NullPointerException = function() { return new ReferenceError("NullPointerException"); };
var _ArrayStoreException = function() { return new TypeError("ArrayStoreException"); };
var _ArithmeticException = function() { return new RangeError("ArithmeticException"); };
var _IndexOutOfBoundsException = function() { return new RangeError("IndexOutOfBounds"); };


// set up a class to use its instances (set up prototype chain, etc.)
function _class (classobject, base, interfaces, classname, instancemethods)
{
    // connect prototype chain
    classobject.$.prototype = Object.create(base.$.prototype);
    classobject.$.prototype.constructor = classobject.$;
  
    // add attributes than can be used to check for class/interface type
    classobject.$.prototype._classname = classname;
    classobject.$.prototype._baseclasses = base.$.prototype._baseclasses . concat(classobject);
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
            // make sure that there is a valid _superinterfaces attribute defined in all interfaces (even if empty list)
            if (!inf._superinterfaces) throw new Error("Missing attribute _superinterfaces");
            
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

// test if an arbitrary Object is of a given class (or subclass). 
// throws exception if not, returns object again if ok.
function _checkclass(x,cls)
{
    if (x===null || x instanceof cls.$) return x;
    throw _ClassCastException();    
}

// test if an arbitrary java.lang.Object implements a given Interface
function _isinterface(x,intrfc)
{   return x!==null && x._interfaces.indexOf(intrfc)>=0;
}
// interface type check. If unsuccessfull, thows exception. Otherweise just return the value
function _checkinterface(x,intrfc)
{   if (x===null || x._interfaces.indexOf(intrfc)>=0) return x;
    throw _ClassCastException();
}

// test if an arbitrary object is a String
function _isstr(o) 
{   return o!==null && o._isString;
}
// string type check with exception if unsuccessful. on success just return the value again
function _checkstr(o)
{   if (o===null || o._isString) return o;
    throw _ClassCastException();
}

function _interfacehassuperinterface(intf, sintf)
{   
    if (intf==sintf) return true;
    var l = intf._superinterfaces;
    for (var i=0; l.length; i++)
    {   if (_interfacehassuperinterface(l[i], sintf)) return true;
    }
    return false;
}
// test if arbitrary object is compatible with given array type
function _isarray(o,typedescriptor,dimensions) 
{   if (o===null || o._d !== dimensions) { return false; }
    var ot = o._t;
    if (!ot) { return false; }  // no type information in the array!
    
    // test for compatibility with Object[]
    if (typedescriptor===java_lang_Object)
    {   if (ot.$ || ot===java_lang_String) { return true; }  // any object array is compatible
        if (ot._superinterfaces) { return true; }            // any interface array is compatible
        return false;
    }        
    // test for compatibility with more specific object array types
    else if (typedescriptor.$) 
    {   if (ot.$)   // array of object type: must be exact or of type as base class
        {   return ot.$.prototype._baseclasses.indexOf(typedescriptor) >= 0;
        }
        return false;
    }
    // test for compatibility with interface array type
    else if (typedescriptor._superinterfaces)
    {   
        if (ot.$)  // array of object type: class must implement interface 
        {   return ot.$.prototype._interfaces.indexOf(typedescriptor) >= 0;
        }
        if (ot._superinterfaces)  // array of interface type: must be exact type or sub-interface
        {   return _interfacehassuperinterface(ot,typedescriptor);
        }
    }
    // otherwise need exact match of either native type or object/interface
    {   if (ot === typedescriptor) { return true; }
    }
    
    return false; 
}        
// array type check with exception if unsuccessful. on success just return the value again
function _checkarray(o,typedescriptor,dimensions)
{   if (o===null || _isarray(o,typedescriptor,dimensions)) return o;
    throw new TypeError("ClassCastException");
}

// convert a unicode code number to a string with the corresponding letter 
function _c2s(c) 
{   return String.fromCharCode(c);
}

// convert a double to a string in java style 
function _d2s(d) 
{   if (isFinite(d))
    {   var s = String(d);
        if (s.indexOf(".")<0)
        {   s = s.concat(".0");  // non-fractional numbers get a .0 nevertheless
        } 
        else     // patch exponent notation to match java
        {   var idx = s.indexOf("+");
            if (idx>0) { s = s.substring(0,idx) + s.substring(idx+1); }
            s = s.replace("e","E");
        }
        return s;
    }
    else    // infinite values or NaN
    {   return String(d);
    }
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

// integer division with correct behaviour over the full ranges and 0 exception
var _idiv = function(a,b)
{
    if (b===0) throw _ArithmeticException();
    return (a/b)|0;
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


// attach runtime type information to an already created one-dimensional javascript array.
// returns the array itself for easy chaining
// typedescriptor is either one of the strings: 
//  "B"  (byte) 
//  "C"  (char) 
//  "I"  (int)
//  "D"  (double)
//  "Z"  (boolean)
// or a class definition object      (like java_lang_Object, java_lang_String)
// or an interface definition object (like java_lang_Runnable)
// dimensions: the declared number of dimensions for the array
function _arr(typedescriptor,dimensions,a)
{   a._t = typedescriptor;      // memorize type of leaf element    
    a._d = dimensions;          // number of dimensions
    return a;
}

// create a (possible multidimensional) array
// typedescriptor: one of the possibilities like for _arr
// dimensions: number of dimensions, the array will have
// sizes: a plain javascript array with numbers for the size of each dimension. 
//   may contain less elements than needed for dimension (but at least 1).
//   in this case no sub-array is created, but the super-array elements
//   are initialized with null,
// initvalue: when the lowest layer is created, this gives the value to fill the array

function _dim(typedescriptor,dimensions,sizes,initvalue) 
{   
    var arraysize = sizes[0];
    var a = new Array(arraysize);    
    a._t = typedescriptor;
    a._d = dimensions;    
    if (dimensions<2) 
    {   for (var i=0; i<arraysize; i++) 
        {   a[i] = initvalue;
        }               
    }
    else if (sizes.length<2)
    {   for (var i=0; i<arraysize; i++) 
        {   a[i] = null;
        }                   
    } 
    else
    {   for (var i=0; i<arraysize; i++) 
        {   a[i] = _dim(typedescriptor,dimensions-1,sizes.slice(1),initvalue);
        }                   
    }
    return a;
}

// do some patching of the built-in array prototype to allow easy
// integration with other java objects.
// Be aware that this now messes up any use of  
// any  for (x in array) loop on the entirety of the program,
// DO NOT USE such a loop!

Array.prototype._interfaces = [];
Array.prototype._isArray = true;

Array.prototype.equals_1 = function (o) 
{   return this===o;
};

Array.prototype.toString_0 = function () 
{   return this._t;
};

Array.prototype.hashCode_0 = function () 
{   return 2;
};

// Extend the javascript String object by monkey-patching in the necessary
// java methods and attributes.
// Actually only string literals are used throughout the implementation,
// but adding methods to the String prototype makes the literals
// know the methods and properties just as well.

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

String.prototype.contains_1 = function(o)
{
    return this.indexOf(o.toString_0()) >= 0;
}

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

String.prototype.replace_2 = function (find, substitute) 
{   var s = substitute.toString_0 ? substitute.toString_0() : String.fromCharCode(substitute);
    var f = find.toString_0 ? find.toString_0() : String.fromCharCode(find);
    
    var findlength = f.length;
    var r = this;
    var cursor = 0;
    var idx;
    while ((idx = r.indexOf(f,cursor)) >= 0) 
    {   r = r.substring(0,idx).concat(s, r.substring(idx+findlength));
        cursor += findlength;
    }
    return r;    
};

String.prototype.split_1 = function(delimiter)
{
    return this.split_2(delimiter,0);
};

String.prototype.split_2 = function(delimiter_o, limit)
{
    // short cut for completely empty string
    if (this.length<1) 
    {   return [""];
    }
    
    var delimiter = delimiter_o.toString_0();
    
    // special handling of empty delimiter
    if (delimiter.length<1)
    {   if (limit>0) 
        {   var l = this.split("", limit); 
            if (limit>l.length)
            {   l.push("");
            }
            else if (limit==l.length)
            {   l[limit-1] = this.substring(limit-1);
            }
            return l;
        } 
        else if (limit==0) 
        {   return this.split("");  
        }
        else 
        {   var l = this.split("");
            l.push("");            
            return l;
        }
    }
    
    // normal splitting with a real delimiter
    var l = this.split(delimiter);
    if (limit>0)
    {   if (l.length>limit) 
        {   l[limit-1] = l.slice(limit-1).join(delimiter);
            l.length = limit;
        }
    }
    else if (limit==0) 
    {   while (l.length>1 && l[l.length-1]=="") l.pop();        
    }
    return l;
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
{   var chararray = [];
    var l = this.length;
    for (var i=0; i<l; i++)
    {
        chararray[i]= this.charCodeAt(i);
    }
    return chararray;
};

String.prototype.toString_0 = function() 
{   return this;
};

String.prototype.trim_0 = function() 
{   return this.trim();
};

var java_lang_String = {
    join_2: function(delim_o, parts_o) 
    {   
        var delim = delim_o.toString_0();
        // check if the array contains only Strings or other objects also
        for (var i=0; i<parts_o.length; i++)
        {   if (!parts_o[i]._isString)
            {   // encountered non-string. must perform compliated join
                return parts_o.map(function(o){return o.toString_0();}).join(delim);
            }
        }        
        // if not encountered non-strings, the join is easy
        return parts_o.join(delim);
    }
};


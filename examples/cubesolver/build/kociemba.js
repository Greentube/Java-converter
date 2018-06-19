"use strict";

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
{   return (_castTOint(a) << 24) >> 24;
}

function _castTOchar(a) 
{   return _castTOint(a) & 0xffff;
}

function _castTOshort(a) 
{   return (_castTOint(a) << 16) >> 16;
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

var org_kociemba_twophase_Search = 
{
    $: function()
    {
    }
    ,
    ax: null,
    po: null,
    flip: null,
    twist: null,
    slice: null,
    parity: null,
    URFtoDLF: null,
    FRtoBR: null,
    URtoUL: null,
    UBtoDF: null,
    URtoDF: null,
    minDistPhase1: null,
    minDistPhase2: null,
    solutionToString_1: function($length)
    {
        var s = "";
        for (var i = 0; i < $length; i=(i +1)|0) 
        {
            switch (org_kociemba_twophase_Search.ax[i])
            {
                case 0:
                    s += ""+"U";
                    break;
                case 1:
                    s += ""+"R";
                    break;
                case 2:
                    s += ""+"F";
                    break;
                case 3:
                    s += ""+"D";
                    break;
                case 4:
                    s += ""+"L";
                    break;
                case 5:
                    s += ""+"B";
                    break;
            }
            switch (org_kociemba_twophase_Search.po[i])
            {
                case 1:
                    s += ""+" ";
                    break;
                case 2:
                    s += ""+"2 ";
                    break;
                case 3:
                    s += ""+"\' ";
                    break;
            }
        }
        return s;
    }
    ,
    solutionToString_2: function($length,depthPhase1)
    {
        var s = "";
        for (var i = 0; i < $length; i=(i +1)|0) 
        {
            switch (org_kociemba_twophase_Search.ax[i])
            {
                case 0:
                    s += ""+"U";
                    break;
                case 1:
                    s += ""+"R";
                    break;
                case 2:
                    s += ""+"F";
                    break;
                case 3:
                    s += ""+"D";
                    break;
                case 4:
                    s += ""+"L";
                    break;
                case 5:
                    s += ""+"B";
                    break;
            }
            switch (org_kociemba_twophase_Search.po[i])
            {
                case 1:
                    s += ""+" ";
                    break;
                case 2:
                    s += ""+"2 ";
                    break;
                case 3:
                    s += ""+"\' ";
                    break;
            }
            if (i === ((depthPhase1 - 1)|0)) s += ""+". ";
        }
        return s;
    }
    ,
    solution_4: function(facelets,maxDepth,timeOut,useSeparator)
    {
        var s = 0;
        var count = _dim("I",1,[6,],0);
        try
        {
            for (var i = 0; i < 54; i=(i +1)|0) count[org_kociemba_twophase_Color.valueOf_1(facelets.substring_2(i,((i + 1)|0))).ordinal_0()]=(count[org_kociemba_twophase_Color.valueOf_1(facelets.substring_2(i,((i + 1)|0))).ordinal_0()] +1)|0;
        }
        catch (e$)
        {
            var e = e$.throwable;
            if (e instanceof java_lang_IllegalArgumentException.$)
            {
                return "Error 1";
            }
            else { throw e$; }
        }
        for (var i = 0; i < 6; i=(i +1)|0) if (count[i] !== 9) return "Error 1";
        var fc = (new org_kociemba_twophase_FaceCube.$())._1(facelets);
        var cc = fc.toCubieCube_0();
        if ((s = cc.verify_0()) !== 0) return "Error "+""+java_lang_Math.absInt_1(s);
        var c = (new org_kociemba_twophase_CoordCube.$())._1(cc);
        org_kociemba_twophase_Search.po[0] = 0;
        org_kociemba_twophase_Search.ax[0] = 0;
        org_kociemba_twophase_Search.flip[0] = c.flip;
        org_kociemba_twophase_Search.twist[0] = c.twist;
        org_kociemba_twophase_Search.parity[0] = c.parity;
        org_kociemba_twophase_Search.slice[0] = _idiv(c.FRtoBR, 24);
        org_kociemba_twophase_Search.URFtoDLF[0] = c.URFtoDLF;
        org_kociemba_twophase_Search.FRtoBR[0] = c.FRtoBR;
        org_kociemba_twophase_Search.URtoUL[0] = c.URtoUL;
        org_kociemba_twophase_Search.UBtoDF[0] = c.UBtoDF;
        org_kociemba_twophase_Search.minDistPhase1[1] = 1;
        var mv = 0, n = 0;
        var busy = false;
        var depthPhase1 = 1;
        var tStart = java_lang_System.currentTimeMillisAsDouble_0();
        do 
        {
            do 
            {
                if ((((depthPhase1 - n)|0) > org_kociemba_twophase_Search.minDistPhase1[((n + 1)|0)]) &&  ! busy) 
                {
                    if (org_kociemba_twophase_Search.ax[n] === 0 || org_kociemba_twophase_Search.ax[n] === 3) org_kociemba_twophase_Search.ax[(n=(n +1)|0)] = 1;

                    else org_kociemba_twophase_Search.ax[(n=(n +1)|0)] = 0;
                    org_kociemba_twophase_Search.po[n] = 1;
                }
                else if ((org_kociemba_twophase_Search.po[n]=(org_kociemba_twophase_Search.po[n] +1)|0) > 3) 
                {
                    do 
                    {
                        if ((org_kociemba_twophase_Search.ax[n]=(org_kociemba_twophase_Search.ax[n] +1)|0) > 5) 
                        {
                            if ((java_lang_System.currentTimeMillisAsDouble_0()) - tStart > timeOut * 1000) return "Error 8";
                            if (n === 0) 
                            {
                                if (depthPhase1 >= maxDepth) return "Error 7";

                                else {
                                    depthPhase1=(depthPhase1 +1)|0;
                                    org_kociemba_twophase_Search.ax[n] = 0;
                                    org_kociemba_twophase_Search.po[n] = 1;
                                    busy = false;
                                    break;
                                }
                            }
                            else {
                                n=(n -1)|0;
                                busy = true;
                                break;
                            }
                        }
                        else {
                            org_kociemba_twophase_Search.po[n] = 1;
                            busy = false;
                        }
                    }
                    while (n !== 0 && (org_kociemba_twophase_Search.ax[((n - 1)|0)] === org_kociemba_twophase_Search.ax[n] || ((org_kociemba_twophase_Search.ax[((n - 1)|0)] - 3)|0) === org_kociemba_twophase_Search.ax[n]));
                }
                else busy = false;
            }
            while (busy);
            mv = ((((((3 * org_kociemba_twophase_Search.ax[n])|0) + org_kociemba_twophase_Search.po[n])|0) - 1)|0);
            org_kociemba_twophase_Search.flip[((n + 1)|0)] = org_kociemba_twophase_CoordCube.flipMove[org_kociemba_twophase_Search.flip[n]][mv];
            org_kociemba_twophase_Search.twist[((n + 1)|0)] = org_kociemba_twophase_CoordCube.twistMove[org_kociemba_twophase_Search.twist[n]][mv];
            org_kociemba_twophase_Search.slice[((n + 1)|0)] = _idiv(org_kociemba_twophase_CoordCube.FRtoBR__Move[((org_kociemba_twophase_Search.slice[n] * 24)|0)][mv], 24);
            org_kociemba_twophase_Search.minDistPhase1[((n + 1)|0)] = java_lang_Math.max_2(org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__Flip__Prun,((_imul(495, org_kociemba_twophase_Search.flip[((n + 1)|0)]) + org_kociemba_twophase_Search.slice[((n + 1)|0)])|0)),org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__Twist__Prun,((_imul(495, org_kociemba_twophase_Search.twist[((n + 1)|0)]) + org_kociemba_twophase_Search.slice[((n + 1)|0)])|0)));
            if (org_kociemba_twophase_Search.minDistPhase1[((n + 1)|0)] === 0 && n >= ((depthPhase1 - 5)|0)) 
            {
                org_kociemba_twophase_Search.minDistPhase1[((n + 1)|0)] = 10;
                if (n === ((depthPhase1 - 1)|0) && (s = org_kociemba_twophase_Search.totalDepth_2(depthPhase1,maxDepth)) >= 0) 
                {
                    if (s === depthPhase1 || (org_kociemba_twophase_Search.ax[((depthPhase1 - 1)|0)] !== org_kociemba_twophase_Search.ax[depthPhase1] && org_kociemba_twophase_Search.ax[((depthPhase1 - 1)|0)] !== ((org_kociemba_twophase_Search.ax[depthPhase1] + 3)|0))) return useSeparator?org_kociemba_twophase_Search.solutionToString_2(s,depthPhase1):org_kociemba_twophase_Search.solutionToString_1(s);
                }
            }
        }
        while (true);
    }
    ,
    totalDepth_2: function(depthPhase1,maxDepth)
    {
        var mv = 0, d1 = 0, d2 = 0;
        var maxDepthPhase2 = java_lang_Math.min_2(10,((maxDepth - depthPhase1)|0));
        for (var i = 0; i < depthPhase1; i=(i +1)|0) 
        {
            mv = ((((((3 * org_kociemba_twophase_Search.ax[i])|0) + org_kociemba_twophase_Search.po[i])|0) - 1)|0);
            org_kociemba_twophase_Search.URFtoDLF[((i + 1)|0)] = org_kociemba_twophase_CoordCube.URFtoDLF__Move[org_kociemba_twophase_Search.URFtoDLF[i]][mv];
            org_kociemba_twophase_Search.FRtoBR[((i + 1)|0)] = org_kociemba_twophase_CoordCube.FRtoBR__Move[org_kociemba_twophase_Search.FRtoBR[i]][mv];
            org_kociemba_twophase_Search.parity[((i + 1)|0)] = org_kociemba_twophase_CoordCube.parityMove[org_kociemba_twophase_Search.parity[i]][mv];
        }
        if ((d1 = org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun,(((((((_imul(24, org_kociemba_twophase_Search.URFtoDLF[depthPhase1]) + org_kociemba_twophase_Search.FRtoBR[depthPhase1])|0)) * 2)|0) + org_kociemba_twophase_Search.parity[depthPhase1])|0))) > maxDepthPhase2) return -1;
        for (var i = 0; i < depthPhase1; i=(i +1)|0) 
        {
            mv = ((((((3 * org_kociemba_twophase_Search.ax[i])|0) + org_kociemba_twophase_Search.po[i])|0) - 1)|0);
            org_kociemba_twophase_Search.URtoUL[((i + 1)|0)] = org_kociemba_twophase_CoordCube.URtoUL__Move[org_kociemba_twophase_Search.URtoUL[i]][mv];
            org_kociemba_twophase_Search.UBtoDF[((i + 1)|0)] = org_kociemba_twophase_CoordCube.UBtoDF__Move[org_kociemba_twophase_Search.UBtoDF[i]][mv];
        }
        org_kociemba_twophase_Search.URtoDF[depthPhase1] = org_kociemba_twophase_CoordCube.MergeURtoULandUBtoDF[org_kociemba_twophase_Search.URtoUL[depthPhase1]][org_kociemba_twophase_Search.UBtoDF[depthPhase1]];
        if ((d2 = org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun,(((((((_imul(24, org_kociemba_twophase_Search.URtoDF[depthPhase1]) + org_kociemba_twophase_Search.FRtoBR[depthPhase1])|0)) * 2)|0) + org_kociemba_twophase_Search.parity[depthPhase1])|0))) > maxDepthPhase2) return -1;
        if ((org_kociemba_twophase_Search.minDistPhase2[depthPhase1] = java_lang_Math.max_2(d1,d2)) === 0) return depthPhase1;
        var depthPhase2 = 1;
        var n = depthPhase1;
        var busy = false;
        org_kociemba_twophase_Search.po[depthPhase1] = 0;
        org_kociemba_twophase_Search.ax[depthPhase1] = 0;
        org_kociemba_twophase_Search.minDistPhase2[((n + 1)|0)] = 1;
        do 
        {
            do 
            {
                if ((((((depthPhase1 + depthPhase2)|0) - n)|0) > org_kociemba_twophase_Search.minDistPhase2[((n + 1)|0)]) &&  ! busy) 
                {
                    if (org_kociemba_twophase_Search.ax[n] === 0 || org_kociemba_twophase_Search.ax[n] === 3) 
                    {
                        org_kociemba_twophase_Search.ax[(n=(n +1)|0)] = 1;
                        org_kociemba_twophase_Search.po[n] = 2;
                    }
                    else {
                        org_kociemba_twophase_Search.ax[(n=(n +1)|0)] = 0;
                        org_kociemba_twophase_Search.po[n] = 1;
                    }
                }
                else if ((org_kociemba_twophase_Search.ax[n] === 0 || org_kociemba_twophase_Search.ax[n] === 3)?((org_kociemba_twophase_Search.po[n]=(org_kociemba_twophase_Search.po[n] +1)|0) > 3):((org_kociemba_twophase_Search.po[n] = ((org_kociemba_twophase_Search.po[n] + 2)|0)) > 3)) 
                {
                    do 
                    {
                        if ((org_kociemba_twophase_Search.ax[n]=(org_kociemba_twophase_Search.ax[n] +1)|0) > 5) 
                        {
                            if (n === depthPhase1) 
                            {
                                if (depthPhase2 >= maxDepthPhase2) return -1;

                                else {
                                    depthPhase2=(depthPhase2 +1)|0;
                                    org_kociemba_twophase_Search.ax[n] = 0;
                                    org_kociemba_twophase_Search.po[n] = 1;
                                    busy = false;
                                    break;
                                }
                            }
                            else {
                                n=(n -1)|0;
                                busy = true;
                                break;
                            }
                        }
                        else {
                            if (org_kociemba_twophase_Search.ax[n] === 0 || org_kociemba_twophase_Search.ax[n] === 3) org_kociemba_twophase_Search.po[n] = 1;

                            else org_kociemba_twophase_Search.po[n] = 2;
                            busy = false;
                        }
                    }
                    while (n !== depthPhase1 && (org_kociemba_twophase_Search.ax[((n - 1)|0)] === org_kociemba_twophase_Search.ax[n] || ((org_kociemba_twophase_Search.ax[((n - 1)|0)] - 3)|0) === org_kociemba_twophase_Search.ax[n]));
                }
                else busy = false;
            }
            while (busy);
            mv = ((((((3 * org_kociemba_twophase_Search.ax[n])|0) + org_kociemba_twophase_Search.po[n])|0) - 1)|0);
            org_kociemba_twophase_Search.URFtoDLF[((n + 1)|0)] = org_kociemba_twophase_CoordCube.URFtoDLF__Move[org_kociemba_twophase_Search.URFtoDLF[n]][mv];
            org_kociemba_twophase_Search.FRtoBR[((n + 1)|0)] = org_kociemba_twophase_CoordCube.FRtoBR__Move[org_kociemba_twophase_Search.FRtoBR[n]][mv];
            org_kociemba_twophase_Search.parity[((n + 1)|0)] = org_kociemba_twophase_CoordCube.parityMove[org_kociemba_twophase_Search.parity[n]][mv];
            org_kociemba_twophase_Search.URtoDF[((n + 1)|0)] = org_kociemba_twophase_CoordCube.URtoDF__Move[org_kociemba_twophase_Search.URtoDF[n]][mv];
            org_kociemba_twophase_Search.minDistPhase2[((n + 1)|0)] = java_lang_Math.max_2(org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun,(((((((_imul(24, org_kociemba_twophase_Search.URtoDF[((n + 1)|0)]) + org_kociemba_twophase_Search.FRtoBR[((n + 1)|0)])|0)) * 2)|0) + org_kociemba_twophase_Search.parity[((n + 1)|0)])|0)),org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun,(((((((_imul(24, org_kociemba_twophase_Search.URFtoDLF[((n + 1)|0)]) + org_kociemba_twophase_Search.FRtoBR[((n + 1)|0)])|0)) * 2)|0) + org_kociemba_twophase_Search.parity[((n + 1)|0)])|0)));
        }
        while (org_kociemba_twophase_Search.minDistPhase2[((n + 1)|0)] !== 0);
        return ((depthPhase1 + depthPhase2)|0);
    }
    ,
};
_class(org_kociemba_twophase_Search, java_lang_Object, null,
"org.kociemba.twophase.Search" //replace-me-with-empty-string-for-production//
,{
});
org_kociemba_twophase_Search.ax = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.po = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.flip = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.twist = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.slice = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.parity = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.URFtoDLF = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.FRtoBR = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.URtoUL = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.UBtoDF = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.URtoDF = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.minDistPhase1 = _dim("I",1,[31,],0);
org_kociemba_twophase_Search.minDistPhase2 = _dim("I",1,[31,],0);
//reference// java/lang/Math
//reference// org/kociemba/twophase/Color
//reference// org/kociemba/twophase/CoordCube
//reference// java/lang/IllegalArgumentException
//reference// org/kociemba/twophase/FaceCube
//reference// org/kociemba/twophase/Search
//reference// java/lang/System
//load// java/lang/Object
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
//    function(a)
//    {   if (a>10) a=a%(2*Math.PI); 
//        return Math.cos(a);
//    },
    
    cosh_1: (typeof Math.cosh === "function") ? Math.cosh : function(x) 
    {   return (Math.exp(x) + Math.exp(-x)) / 2;
    },
    
    exp_1: Math.exp,
    
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
    
    roundAsDouble_1: function (x) 
    {   if (isNaN(x)) return 0;
        var large = 9.223372036854776E18;
        if (x>=large)  return large;
        if (x<=-large) return -large;
        return Math.round(x);
    },
    roundAsInt_1: function (x) 
    {   if (isNaN(x)) return 0;
        var large = 9.223372036854776E18;
        if (x>=large) return -1;
        if (x<=-large) return 0;
        return Math.round(x) | 0;
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
    {   return x*(Math.PI/180);
    },        
    
    E:  Math.E,
    PI: Math.PI,
};
//reference// java/lang/IllegalArgumentException
//load// java/lang/Object
var java_lang_Enum = {
    $: function()
    {   this._name = null;
        this._ordinal = 0;
    },
};
_class (java_lang_Enum, java_lang_Object, null, 
"java.lang.Enum"  //replace-me-with-empty-string-for-production//
,{  _2: function(name,ordinal) 
    {   this._name = name;
        this._ordinal = ordinal;
        return this;
    },    

    equals_1 : function(other) 
    {   return this===other;
    },
    
    hashCode_0 : function() {
        return this._ordinal;
    },
    
    name_0: function() {
        return this._name;
    },
    
    ordinal_0: function() {
        return this._ordinal;
    },
    
    toString_0: function() {
        return this._name;
    }    
}); 
var org_kociemba_twophase_Color = 
{
    $: function()
    {
        java_lang_Enum.$.call(this);
    }
    ,
    values_0 : function()
    {
        return [
            org_kociemba_twophase_Color.U,
            org_kociemba_twophase_Color.R,
            org_kociemba_twophase_Color.F,
            org_kociemba_twophase_Color.D,
            org_kociemba_twophase_Color.L,
            org_kociemba_twophase_Color.B,
        ];
    }
    ,
    valueOf_1 : function(n)
    {
        switch(n)
        {
            case "U": return org_kociemba_twophase_Color.U;
            case "R": return org_kociemba_twophase_Color.R;
            case "F": return org_kociemba_twophase_Color.F;
            case "D": return org_kociemba_twophase_Color.D;
            case "L": return org_kociemba_twophase_Color.L;
            case "B": return org_kociemba_twophase_Color.B;
            default: throw (new java_lang_IllegalArgumentException.$())._0()._e;
        }
    },
};
_class(org_kociemba_twophase_Color, java_lang_Enum, null,
"org.kociemba.twophase.Color" //replace-me-with-empty-string-for-production//
,{
});
org_kociemba_twophase_Color.U = new org_kociemba_twophase_Color.$()._2("U",0);
org_kociemba_twophase_Color.R = new org_kociemba_twophase_Color.$()._2("R",1);
org_kociemba_twophase_Color.F = new org_kociemba_twophase_Color.$()._2("F",2);
org_kociemba_twophase_Color.D = new org_kociemba_twophase_Color.$()._2("D",3);
org_kociemba_twophase_Color.L = new org_kociemba_twophase_Color.$()._2("L",4);
org_kociemba_twophase_Color.B = new org_kociemba_twophase_Color.$()._2("B",5);
//load// java/lang/Enum
var org_kociemba_twophase_Corner = 
{
    $: function()
    {
        java_lang_Enum.$.call(this);
    }
    ,
    values_0 : function()
    {
        return [
            org_kociemba_twophase_Corner.URF,
            org_kociemba_twophase_Corner.UFL,
            org_kociemba_twophase_Corner.ULB,
            org_kociemba_twophase_Corner.UBR,
            org_kociemba_twophase_Corner.DFR,
            org_kociemba_twophase_Corner.DLF,
            org_kociemba_twophase_Corner.DBL,
            org_kociemba_twophase_Corner.DRB,
        ];
    }
    ,
    valueOf_1 : function(n)
    {
        switch(n)
        {
            case "URF": return org_kociemba_twophase_Corner.URF;
            case "UFL": return org_kociemba_twophase_Corner.UFL;
            case "ULB": return org_kociemba_twophase_Corner.ULB;
            case "UBR": return org_kociemba_twophase_Corner.UBR;
            case "DFR": return org_kociemba_twophase_Corner.DFR;
            case "DLF": return org_kociemba_twophase_Corner.DLF;
            case "DBL": return org_kociemba_twophase_Corner.DBL;
            case "DRB": return org_kociemba_twophase_Corner.DRB;
            default: throw (new java_lang_IllegalArgumentException.$())._0()._e;
        }
    },
};
_class(org_kociemba_twophase_Corner, java_lang_Enum, null,
"org.kociemba.twophase.Corner" //replace-me-with-empty-string-for-production//
,{
});
org_kociemba_twophase_Corner.URF = new org_kociemba_twophase_Corner.$()._2("URF",0);
org_kociemba_twophase_Corner.UFL = new org_kociemba_twophase_Corner.$()._2("UFL",1);
org_kociemba_twophase_Corner.ULB = new org_kociemba_twophase_Corner.$()._2("ULB",2);
org_kociemba_twophase_Corner.UBR = new org_kociemba_twophase_Corner.$()._2("UBR",3);
org_kociemba_twophase_Corner.DFR = new org_kociemba_twophase_Corner.$()._2("DFR",4);
org_kociemba_twophase_Corner.DLF = new org_kociemba_twophase_Corner.$()._2("DLF",5);
org_kociemba_twophase_Corner.DBL = new org_kociemba_twophase_Corner.$()._2("DBL",6);
org_kociemba_twophase_Corner.DRB = new org_kociemba_twophase_Corner.$()._2("DRB",7);
//load// java/lang/Enum
var org_kociemba_twophase_Edge = 
{
    $: function()
    {
        java_lang_Enum.$.call(this);
    }
    ,
    values_0 : function()
    {
        return [
            org_kociemba_twophase_Edge.UR,
            org_kociemba_twophase_Edge.UF,
            org_kociemba_twophase_Edge.UL,
            org_kociemba_twophase_Edge.UB,
            org_kociemba_twophase_Edge.DR,
            org_kociemba_twophase_Edge.DF,
            org_kociemba_twophase_Edge.DL,
            org_kociemba_twophase_Edge.DB,
            org_kociemba_twophase_Edge.FR,
            org_kociemba_twophase_Edge.FL,
            org_kociemba_twophase_Edge.BL,
            org_kociemba_twophase_Edge.BR,
        ];
    }
    ,
    valueOf_1 : function(n)
    {
        switch(n)
        {
            case "UR": return org_kociemba_twophase_Edge.UR;
            case "UF": return org_kociemba_twophase_Edge.UF;
            case "UL": return org_kociemba_twophase_Edge.UL;
            case "UB": return org_kociemba_twophase_Edge.UB;
            case "DR": return org_kociemba_twophase_Edge.DR;
            case "DF": return org_kociemba_twophase_Edge.DF;
            case "DL": return org_kociemba_twophase_Edge.DL;
            case "DB": return org_kociemba_twophase_Edge.DB;
            case "FR": return org_kociemba_twophase_Edge.FR;
            case "FL": return org_kociemba_twophase_Edge.FL;
            case "BL": return org_kociemba_twophase_Edge.BL;
            case "BR": return org_kociemba_twophase_Edge.BR;
            default: throw (new java_lang_IllegalArgumentException.$())._0()._e;
        }
    },
};
_class(org_kociemba_twophase_Edge, java_lang_Enum, null,
"org.kociemba.twophase.Edge" //replace-me-with-empty-string-for-production//
,{
});
org_kociemba_twophase_Edge.UR = new org_kociemba_twophase_Edge.$()._2("UR",0);
org_kociemba_twophase_Edge.UF = new org_kociemba_twophase_Edge.$()._2("UF",1);
org_kociemba_twophase_Edge.UL = new org_kociemba_twophase_Edge.$()._2("UL",2);
org_kociemba_twophase_Edge.UB = new org_kociemba_twophase_Edge.$()._2("UB",3);
org_kociemba_twophase_Edge.DR = new org_kociemba_twophase_Edge.$()._2("DR",4);
org_kociemba_twophase_Edge.DF = new org_kociemba_twophase_Edge.$()._2("DF",5);
org_kociemba_twophase_Edge.DL = new org_kociemba_twophase_Edge.$()._2("DL",6);
org_kociemba_twophase_Edge.DB = new org_kociemba_twophase_Edge.$()._2("DB",7);
org_kociemba_twophase_Edge.FR = new org_kociemba_twophase_Edge.$()._2("FR",8);
org_kociemba_twophase_Edge.FL = new org_kociemba_twophase_Edge.$()._2("FL",9);
org_kociemba_twophase_Edge.BL = new org_kociemba_twophase_Edge.$()._2("BL",10);
org_kociemba_twophase_Edge.BR = new org_kociemba_twophase_Edge.$()._2("BR",11);
//load// java/lang/Enum
var org_kociemba_twophase_Facelet = 
{
    $: function()
    {
        java_lang_Enum.$.call(this);
    }
    ,
    values_0 : function()
    {
        return [
            org_kociemba_twophase_Facelet.U1,
            org_kociemba_twophase_Facelet.U2,
            org_kociemba_twophase_Facelet.U3,
            org_kociemba_twophase_Facelet.U4,
            org_kociemba_twophase_Facelet.U5,
            org_kociemba_twophase_Facelet.U6,
            org_kociemba_twophase_Facelet.U7,
            org_kociemba_twophase_Facelet.U8,
            org_kociemba_twophase_Facelet.U9,
            org_kociemba_twophase_Facelet.R1,
            org_kociemba_twophase_Facelet.R2,
            org_kociemba_twophase_Facelet.R3,
            org_kociemba_twophase_Facelet.R4,
            org_kociemba_twophase_Facelet.R5,
            org_kociemba_twophase_Facelet.R6,
            org_kociemba_twophase_Facelet.R7,
            org_kociemba_twophase_Facelet.R8,
            org_kociemba_twophase_Facelet.R9,
            org_kociemba_twophase_Facelet.F1,
            org_kociemba_twophase_Facelet.F2,
            org_kociemba_twophase_Facelet.F3,
            org_kociemba_twophase_Facelet.F4,
            org_kociemba_twophase_Facelet.F5,
            org_kociemba_twophase_Facelet.F6,
            org_kociemba_twophase_Facelet.F7,
            org_kociemba_twophase_Facelet.F8,
            org_kociemba_twophase_Facelet.F9,
            org_kociemba_twophase_Facelet.D1,
            org_kociemba_twophase_Facelet.D2,
            org_kociemba_twophase_Facelet.D3,
            org_kociemba_twophase_Facelet.D4,
            org_kociemba_twophase_Facelet.D5,
            org_kociemba_twophase_Facelet.D6,
            org_kociemba_twophase_Facelet.D7,
            org_kociemba_twophase_Facelet.D8,
            org_kociemba_twophase_Facelet.D9,
            org_kociemba_twophase_Facelet.L1,
            org_kociemba_twophase_Facelet.L2,
            org_kociemba_twophase_Facelet.L3,
            org_kociemba_twophase_Facelet.L4,
            org_kociemba_twophase_Facelet.L5,
            org_kociemba_twophase_Facelet.L6,
            org_kociemba_twophase_Facelet.L7,
            org_kociemba_twophase_Facelet.L8,
            org_kociemba_twophase_Facelet.L9,
            org_kociemba_twophase_Facelet.B1,
            org_kociemba_twophase_Facelet.B2,
            org_kociemba_twophase_Facelet.B3,
            org_kociemba_twophase_Facelet.B4,
            org_kociemba_twophase_Facelet.B5,
            org_kociemba_twophase_Facelet.B6,
            org_kociemba_twophase_Facelet.B7,
            org_kociemba_twophase_Facelet.B8,
            org_kociemba_twophase_Facelet.B9,
        ];
    }
    ,
    valueOf_1 : function(n)
    {
        switch(n)
        {
            case "U1": return org_kociemba_twophase_Facelet.U1;
            case "U2": return org_kociemba_twophase_Facelet.U2;
            case "U3": return org_kociemba_twophase_Facelet.U3;
            case "U4": return org_kociemba_twophase_Facelet.U4;
            case "U5": return org_kociemba_twophase_Facelet.U5;
            case "U6": return org_kociemba_twophase_Facelet.U6;
            case "U7": return org_kociemba_twophase_Facelet.U7;
            case "U8": return org_kociemba_twophase_Facelet.U8;
            case "U9": return org_kociemba_twophase_Facelet.U9;
            case "R1": return org_kociemba_twophase_Facelet.R1;
            case "R2": return org_kociemba_twophase_Facelet.R2;
            case "R3": return org_kociemba_twophase_Facelet.R3;
            case "R4": return org_kociemba_twophase_Facelet.R4;
            case "R5": return org_kociemba_twophase_Facelet.R5;
            case "R6": return org_kociemba_twophase_Facelet.R6;
            case "R7": return org_kociemba_twophase_Facelet.R7;
            case "R8": return org_kociemba_twophase_Facelet.R8;
            case "R9": return org_kociemba_twophase_Facelet.R9;
            case "F1": return org_kociemba_twophase_Facelet.F1;
            case "F2": return org_kociemba_twophase_Facelet.F2;
            case "F3": return org_kociemba_twophase_Facelet.F3;
            case "F4": return org_kociemba_twophase_Facelet.F4;
            case "F5": return org_kociemba_twophase_Facelet.F5;
            case "F6": return org_kociemba_twophase_Facelet.F6;
            case "F7": return org_kociemba_twophase_Facelet.F7;
            case "F8": return org_kociemba_twophase_Facelet.F8;
            case "F9": return org_kociemba_twophase_Facelet.F9;
            case "D1": return org_kociemba_twophase_Facelet.D1;
            case "D2": return org_kociemba_twophase_Facelet.D2;
            case "D3": return org_kociemba_twophase_Facelet.D3;
            case "D4": return org_kociemba_twophase_Facelet.D4;
            case "D5": return org_kociemba_twophase_Facelet.D5;
            case "D6": return org_kociemba_twophase_Facelet.D6;
            case "D7": return org_kociemba_twophase_Facelet.D7;
            case "D8": return org_kociemba_twophase_Facelet.D8;
            case "D9": return org_kociemba_twophase_Facelet.D9;
            case "L1": return org_kociemba_twophase_Facelet.L1;
            case "L2": return org_kociemba_twophase_Facelet.L2;
            case "L3": return org_kociemba_twophase_Facelet.L3;
            case "L4": return org_kociemba_twophase_Facelet.L4;
            case "L5": return org_kociemba_twophase_Facelet.L5;
            case "L6": return org_kociemba_twophase_Facelet.L6;
            case "L7": return org_kociemba_twophase_Facelet.L7;
            case "L8": return org_kociemba_twophase_Facelet.L8;
            case "L9": return org_kociemba_twophase_Facelet.L9;
            case "B1": return org_kociemba_twophase_Facelet.B1;
            case "B2": return org_kociemba_twophase_Facelet.B2;
            case "B3": return org_kociemba_twophase_Facelet.B3;
            case "B4": return org_kociemba_twophase_Facelet.B4;
            case "B5": return org_kociemba_twophase_Facelet.B5;
            case "B6": return org_kociemba_twophase_Facelet.B6;
            case "B7": return org_kociemba_twophase_Facelet.B7;
            case "B8": return org_kociemba_twophase_Facelet.B8;
            case "B9": return org_kociemba_twophase_Facelet.B9;
            default: throw (new java_lang_IllegalArgumentException.$())._0()._e;
        }
    },
};
_class(org_kociemba_twophase_Facelet, java_lang_Enum, null,
"org.kociemba.twophase.Facelet" //replace-me-with-empty-string-for-production//
,{
});
org_kociemba_twophase_Facelet.U1 = new org_kociemba_twophase_Facelet.$()._2("U1",0);
org_kociemba_twophase_Facelet.U2 = new org_kociemba_twophase_Facelet.$()._2("U2",1);
org_kociemba_twophase_Facelet.U3 = new org_kociemba_twophase_Facelet.$()._2("U3",2);
org_kociemba_twophase_Facelet.U4 = new org_kociemba_twophase_Facelet.$()._2("U4",3);
org_kociemba_twophase_Facelet.U5 = new org_kociemba_twophase_Facelet.$()._2("U5",4);
org_kociemba_twophase_Facelet.U6 = new org_kociemba_twophase_Facelet.$()._2("U6",5);
org_kociemba_twophase_Facelet.U7 = new org_kociemba_twophase_Facelet.$()._2("U7",6);
org_kociemba_twophase_Facelet.U8 = new org_kociemba_twophase_Facelet.$()._2("U8",7);
org_kociemba_twophase_Facelet.U9 = new org_kociemba_twophase_Facelet.$()._2("U9",8);
org_kociemba_twophase_Facelet.R1 = new org_kociemba_twophase_Facelet.$()._2("R1",9);
org_kociemba_twophase_Facelet.R2 = new org_kociemba_twophase_Facelet.$()._2("R2",10);
org_kociemba_twophase_Facelet.R3 = new org_kociemba_twophase_Facelet.$()._2("R3",11);
org_kociemba_twophase_Facelet.R4 = new org_kociemba_twophase_Facelet.$()._2("R4",12);
org_kociemba_twophase_Facelet.R5 = new org_kociemba_twophase_Facelet.$()._2("R5",13);
org_kociemba_twophase_Facelet.R6 = new org_kociemba_twophase_Facelet.$()._2("R6",14);
org_kociemba_twophase_Facelet.R7 = new org_kociemba_twophase_Facelet.$()._2("R7",15);
org_kociemba_twophase_Facelet.R8 = new org_kociemba_twophase_Facelet.$()._2("R8",16);
org_kociemba_twophase_Facelet.R9 = new org_kociemba_twophase_Facelet.$()._2("R9",17);
org_kociemba_twophase_Facelet.F1 = new org_kociemba_twophase_Facelet.$()._2("F1",18);
org_kociemba_twophase_Facelet.F2 = new org_kociemba_twophase_Facelet.$()._2("F2",19);
org_kociemba_twophase_Facelet.F3 = new org_kociemba_twophase_Facelet.$()._2("F3",20);
org_kociemba_twophase_Facelet.F4 = new org_kociemba_twophase_Facelet.$()._2("F4",21);
org_kociemba_twophase_Facelet.F5 = new org_kociemba_twophase_Facelet.$()._2("F5",22);
org_kociemba_twophase_Facelet.F6 = new org_kociemba_twophase_Facelet.$()._2("F6",23);
org_kociemba_twophase_Facelet.F7 = new org_kociemba_twophase_Facelet.$()._2("F7",24);
org_kociemba_twophase_Facelet.F8 = new org_kociemba_twophase_Facelet.$()._2("F8",25);
org_kociemba_twophase_Facelet.F9 = new org_kociemba_twophase_Facelet.$()._2("F9",26);
org_kociemba_twophase_Facelet.D1 = new org_kociemba_twophase_Facelet.$()._2("D1",27);
org_kociemba_twophase_Facelet.D2 = new org_kociemba_twophase_Facelet.$()._2("D2",28);
org_kociemba_twophase_Facelet.D3 = new org_kociemba_twophase_Facelet.$()._2("D3",29);
org_kociemba_twophase_Facelet.D4 = new org_kociemba_twophase_Facelet.$()._2("D4",30);
org_kociemba_twophase_Facelet.D5 = new org_kociemba_twophase_Facelet.$()._2("D5",31);
org_kociemba_twophase_Facelet.D6 = new org_kociemba_twophase_Facelet.$()._2("D6",32);
org_kociemba_twophase_Facelet.D7 = new org_kociemba_twophase_Facelet.$()._2("D7",33);
org_kociemba_twophase_Facelet.D8 = new org_kociemba_twophase_Facelet.$()._2("D8",34);
org_kociemba_twophase_Facelet.D9 = new org_kociemba_twophase_Facelet.$()._2("D9",35);
org_kociemba_twophase_Facelet.L1 = new org_kociemba_twophase_Facelet.$()._2("L1",36);
org_kociemba_twophase_Facelet.L2 = new org_kociemba_twophase_Facelet.$()._2("L2",37);
org_kociemba_twophase_Facelet.L3 = new org_kociemba_twophase_Facelet.$()._2("L3",38);
org_kociemba_twophase_Facelet.L4 = new org_kociemba_twophase_Facelet.$()._2("L4",39);
org_kociemba_twophase_Facelet.L5 = new org_kociemba_twophase_Facelet.$()._2("L5",40);
org_kociemba_twophase_Facelet.L6 = new org_kociemba_twophase_Facelet.$()._2("L6",41);
org_kociemba_twophase_Facelet.L7 = new org_kociemba_twophase_Facelet.$()._2("L7",42);
org_kociemba_twophase_Facelet.L8 = new org_kociemba_twophase_Facelet.$()._2("L8",43);
org_kociemba_twophase_Facelet.L9 = new org_kociemba_twophase_Facelet.$()._2("L9",44);
org_kociemba_twophase_Facelet.B1 = new org_kociemba_twophase_Facelet.$()._2("B1",45);
org_kociemba_twophase_Facelet.B2 = new org_kociemba_twophase_Facelet.$()._2("B2",46);
org_kociemba_twophase_Facelet.B3 = new org_kociemba_twophase_Facelet.$()._2("B3",47);
org_kociemba_twophase_Facelet.B4 = new org_kociemba_twophase_Facelet.$()._2("B4",48);
org_kociemba_twophase_Facelet.B5 = new org_kociemba_twophase_Facelet.$()._2("B5",49);
org_kociemba_twophase_Facelet.B6 = new org_kociemba_twophase_Facelet.$()._2("B6",50);
org_kociemba_twophase_Facelet.B7 = new org_kociemba_twophase_Facelet.$()._2("B7",51);
org_kociemba_twophase_Facelet.B8 = new org_kociemba_twophase_Facelet.$()._2("B8",52);
org_kociemba_twophase_Facelet.B9 = new org_kociemba_twophase_Facelet.$()._2("B9",53);
//load// java/lang/Enum

//load// java/lang/Object
var java_io_PrintStream = 
{   $: function() 
    {   java_lang_Object.$.call(this);
        this._logfunction = null;
        this._line = null;
    },
    nothing: function()
    {
    }
};
_class (java_io_PrintStream, java_lang_Object, null, 
"java.io.PrintStream"  //replace-me-with-empty-string-for-production//
,{  _1: function(logfunction) 
    {   this._logfunction = logfunction;
        this._line = [];
        return this;
    },     
    
    print_1: function(o) 
    {   var s = (o===null) ? "null" : o.toString_0();
        this._line.push(s);
    },
    
    println_0: function() 
    {   var l = this._line.join("");
        this._line = [];
        this._logfunction(l);
    },
    
    println_1: function(x) 
    {   this.print_1(x);
        this.println_0();
    },
});
//complete// java/io/PrintStream
//load// java/lang/Object
var java_lang_System = 
{    
    arraycopy_5 : function(src, srcPos, dest, destPos, length) 
    {   if (src==null || dest==null) throw _NullPointerException();
        if (!(src._isArray) || !(dest._isArray)) throw _ArrayStoreException();
        if (length<0 || srcPos<0 || srcPos+length>src.length
                     || destPos<0 || destPos+length>dest.length) throw _IndexOutOfBoundsException();
        
        if (destPos<=srcPos) 
        {   for (var i = 0; i < length; i++) 
            {   dest[i + destPos] = src[i + srcPos];
            }
        } 
        else 
        {   for (var i = length-1; i >=0; i--) 
            {   dest[i + destPos] = src[i + srcPos];
            }
        }
    },
    exit_1: function(status) 
    {
    },
    
    currentTimeMillisAsDouble_0: function() 
    {   return Date.now();
    },
    
    currentTimeMillisAsInt_0: function() 
    {   return Date.now() | 0;
    },
    
    out: (new java_io_PrintStream.$())._1(console.log),
    err: (new java_io_PrintStream.$())._1(console.warn),
};
//load// java/lang/Object
var java_lang_Throwable = 
{   $: function() 
    {   
        this.name = null;
        this.message = null; 
        this._e = new Error(this._classname);
        this._e.throwable = this;
    },
};

_class(java_lang_Throwable, java_lang_Object, null, "java.lang.Throwable",
{
    _0: function()
    {   
        this.name = this._classname;
        this.message = null;    
        return this;
    },
    _1: function(message)
    {   
        this.name = this._classname;
        this.message = message;
        return this;
    },

    toString_0: function()
    {   
        var m = this.getMessage_0();
        if (m===null) { return this._classname; }
        else { return this._classname + ": " + m; }
    },
    
    getMessage_0 : function()
    {   
        return this.message;
    },
    
    printStackTrace_0: function()
    {   
        if (this._e.stack) console.warn(this._e.stack);
        else console.warn(this._e);        
    }
});

//load// java/lang/Throwable
var java_lang_Exception = 
{   $: function() 
    {   java_lang_Throwable.$.call(this);
    },
};
_class (java_lang_Exception, java_lang_Throwable, null, 
"java.lang.Exception"  
,{  
});
//load// java/lang/Exception
var java_lang_RuntimeException = 
{   $: function() 
    {   java_lang_Exception.$.call(this);
    },
};
_class (java_lang_RuntimeException, java_lang_Exception, null, "java.lang.RuntimeException"  
,{  
});
//load// java/lang/RuntimeException
var java_lang_IllegalArgumentException = 
{   $: function() 
    {   java_lang_RuntimeException.$.call(this);
    },
};
_class (java_lang_IllegalArgumentException, java_lang_RuntimeException, null, 
"java.lang.IllegalArgumentException"  
, {});
var org_kociemba_twophase_FaceCube = 
{
    $: function()
    {
        this.f = null;
    }
    ,
    cornerFacelet: null,
    edgeFacelet: null,
    cornerColor: null,
    edgeColor: null,
};
_class(org_kociemba_twophase_FaceCube, java_lang_Object, null,
"org.kociemba.twophase.FaceCube" //replace-me-with-empty-string-for-production//
,{
    _0: function()
    {
        this.f = _dim(org_kociemba_twophase_Color,1,[54,],null);
        {
        }
        var s = "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";
        for (var i = 0; i < 54; i=(i +1)|0) this.f[i] = org_kociemba_twophase_Color.valueOf_1(s.substring_2(i,((i + 1)|0)));
        return this;
    }
    ,
    _1: function(cubeString)
    {
        this.f = _dim(org_kociemba_twophase_Color,1,[54,],null);
        {
        }
        for (var i = 0; i < cubeString.length_0(); i=(i +1)|0) this.f[i] = org_kociemba_twophase_Color.valueOf_1(cubeString.substring_2(i,((i + 1)|0)));
        return this;
    }
    ,
    to__String_0: function()
    {
        var s = "";
        for (var i = 0; i < 54; i=(i +1)|0) s += ""+this.f[i].toString_0();
        return s;
    }
    ,
    toCubieCube_0: function()
    {
        var ori = 0;
        var ccRet = (new org_kociemba_twophase_CubieCube.$())._0();
        for (var i = 0; i < 8; i=(i +1)|0) ccRet.cp[i] = org_kociemba_twophase_Corner.URF;
        for (var i = 0; i < 12; i=(i +1)|0) ccRet.ep[i] = org_kociemba_twophase_Edge.UR;
        var col1 = null, col2 = null;
        for (var i, i_i=0, i_a=org_kociemba_twophase_Corner.values_0(); (i_i<i_a.length)&&((i=i_a[i_i])||true); i_i++)
        {
            for (ori = 0; ori < 3; ori=(ori +1)<<24>>24) if (this.f[org_kociemba_twophase_FaceCube.cornerFacelet[i.ordinal_0()][ori].ordinal_0()] === org_kociemba_twophase_Color.U || this.f[org_kociemba_twophase_FaceCube.cornerFacelet[i.ordinal_0()][ori].ordinal_0()] === org_kociemba_twophase_Color.D) break;
            col1 = this.f[org_kociemba_twophase_FaceCube.cornerFacelet[i.ordinal_0()][(((ori + 1)|0)) % 3].ordinal_0()];
            col2 = this.f[org_kociemba_twophase_FaceCube.cornerFacelet[i.ordinal_0()][(((ori + 2)|0)) % 3].ordinal_0()];
            for (var j, j_i=0, j_a=org_kociemba_twophase_Corner.values_0(); (j_i<j_a.length)&&((j=j_a[j_i])||true); j_i++)
            {
                if (col1 === org_kociemba_twophase_FaceCube.cornerColor[j.ordinal_0()][1] && col2 === org_kociemba_twophase_FaceCube.cornerColor[j.ordinal_0()][2]) 
                {
                    ccRet.cp[i.ordinal_0()] = j;
                    ccRet.co[i.ordinal_0()] = _castTObyte((ori % 3));
                    break;
                }
            }

        }

        for (var i, i_i=0, i_a=org_kociemba_twophase_Edge.values_0(); (i_i<i_a.length)&&((i=i_a[i_i])||true); i_i++)for (var j, j_i=0, j_a=org_kociemba_twophase_Edge.values_0(); (j_i<j_a.length)&&((j=j_a[j_i])||true); j_i++)
        {
            if (this.f[org_kociemba_twophase_FaceCube.edgeFacelet[i.ordinal_0()][0].ordinal_0()] === org_kociemba_twophase_FaceCube.edgeColor[j.ordinal_0()][0] && this.f[org_kociemba_twophase_FaceCube.edgeFacelet[i.ordinal_0()][1].ordinal_0()] === org_kociemba_twophase_FaceCube.edgeColor[j.ordinal_0()][1]) 
            {
                ccRet.ep[i.ordinal_0()] = j;
                ccRet.eo[i.ordinal_0()] = 0;
                break;
            }
            if (this.f[org_kociemba_twophase_FaceCube.edgeFacelet[i.ordinal_0()][0].ordinal_0()] === org_kociemba_twophase_FaceCube.edgeColor[j.ordinal_0()][1] && this.f[org_kociemba_twophase_FaceCube.edgeFacelet[i.ordinal_0()][1].ordinal_0()] === org_kociemba_twophase_FaceCube.edgeColor[j.ordinal_0()][0]) 
            {
                ccRet.ep[i.ordinal_0()] = j;
                ccRet.eo[i.ordinal_0()] = 1;
                break;
            }
        }


        return ccRet;
    }
    ,
});
org_kociemba_twophase_FaceCube.cornerFacelet = _arr(org_kociemba_twophase_Facelet,2,[_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U9,org_kociemba_twophase_Facelet.R1,org_kociemba_twophase_Facelet.F3]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U7,org_kociemba_twophase_Facelet.F1,org_kociemba_twophase_Facelet.L3]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U1,org_kociemba_twophase_Facelet.L1,org_kociemba_twophase_Facelet.B3]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U3,org_kociemba_twophase_Facelet.B1,org_kociemba_twophase_Facelet.R3]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D3,org_kociemba_twophase_Facelet.F9,org_kociemba_twophase_Facelet.R7]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D1,org_kociemba_twophase_Facelet.L9,org_kociemba_twophase_Facelet.F7]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D7,org_kociemba_twophase_Facelet.B9,org_kociemba_twophase_Facelet.L7]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D9,org_kociemba_twophase_Facelet.R9,org_kociemba_twophase_Facelet.B7])]);
org_kociemba_twophase_FaceCube.edgeFacelet = _arr(org_kociemba_twophase_Facelet,2,[_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U6,org_kociemba_twophase_Facelet.R2]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U8,org_kociemba_twophase_Facelet.F2]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U4,org_kociemba_twophase_Facelet.L2]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.U2,org_kociemba_twophase_Facelet.B2]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D6,org_kociemba_twophase_Facelet.R8]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D2,org_kociemba_twophase_Facelet.F8]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D4,org_kociemba_twophase_Facelet.L8]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.D8,org_kociemba_twophase_Facelet.B8]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.F6,org_kociemba_twophase_Facelet.R4]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.F4,org_kociemba_twophase_Facelet.L6]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.B6,org_kociemba_twophase_Facelet.L4]),_arr(org_kociemba_twophase_Facelet,1,[org_kociemba_twophase_Facelet.B4,org_kociemba_twophase_Facelet.R6])]);
org_kociemba_twophase_FaceCube.cornerColor = _arr(org_kociemba_twophase_Color,2,[_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.R,org_kociemba_twophase_Color.F]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.F,org_kociemba_twophase_Color.L]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.L,org_kociemba_twophase_Color.B]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.B,org_kociemba_twophase_Color.R]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.F,org_kociemba_twophase_Color.R]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.L,org_kociemba_twophase_Color.F]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.B,org_kociemba_twophase_Color.L]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.R,org_kociemba_twophase_Color.B])]);
org_kociemba_twophase_FaceCube.edgeColor = _arr(org_kociemba_twophase_Color,2,[_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.R]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.F]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.L]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.U,org_kociemba_twophase_Color.B]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.R]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.F]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.L]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.D,org_kociemba_twophase_Color.B]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.F,org_kociemba_twophase_Color.R]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.F,org_kociemba_twophase_Color.L]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.B,org_kociemba_twophase_Color.L]),_arr(org_kociemba_twophase_Color,1,[org_kociemba_twophase_Color.B,org_kociemba_twophase_Color.R])]);
//reference// org/kociemba/twophase/Corner
//reference// org/kociemba/twophase/CubieCube
//reference// org/kociemba/twophase/FaceCube
//reference// org/kociemba/twophase/Edge
//load// java/lang/Object
//complete// org/kociemba/twophase/Color
//complete// org/kociemba/twophase/Facelet
var org_kociemba_twophase_CubieCube = 
{
    $: function()
    {
        this.cp = null;
        this.co = null;
        this.ep = null;
        this.eo = null;
    }
    ,
    cpU: null,
    coU: null,
    epU: null,
    eoU: null,
    cpR: null,
    coR: null,
    epR: null,
    eoR: null,
    cpF: null,
    coF: null,
    epF: null,
    eoF: null,
    cpD: null,
    coD: null,
    epD: null,
    eoD: null,
    cpL: null,
    coL: null,
    epL: null,
    eoL: null,
    cpB: null,
    coB: null,
    epB: null,
    eoB: null,
    moveCube: null,
    Cnk_2: function(n,k)
    {
        var i = 0, j = 0, s = 0;
        if (n < k) return 0;
        if (k > _idiv(n, 2)) k = ((n - k)|0);
        for (s = 1,i = n,j = 1; i !== ((n - k)|0); i=(i -1)|0,j=(j +1)|0) 
        {
            s = _imul(s , i);
            s = _idiv(s , j);
        }
        return s;
    }
    ,
    rotateLeftC_3: function(arr,l,r)
    {
        var temp = arr[l];
        for (var i = l; i < r; i=(i +1)|0) arr[i] = arr[((i + 1)|0)];
        arr[r] = temp;
    }
    ,
    rotateRightC_3: function(arr,l,r)
    {
        var temp = arr[r];
        for (var i = r; i > l; i=(i -1)|0) arr[i] = arr[((i - 1)|0)];
        arr[l] = temp;
    }
    ,
    rotateLeftE_3: function(arr,l,r)
    {
        var temp = arr[l];
        for (var i = l; i < r; i=(i +1)|0) arr[i] = arr[((i + 1)|0)];
        arr[r] = temp;
    }
    ,
    rotateRightE_3: function(arr,l,r)
    {
        var temp = arr[r];
        for (var i = r; i > l; i=(i -1)|0) arr[i] = arr[((i - 1)|0)];
        arr[l] = temp;
    }
    ,
    getURtoDF_2: function(idx1,idx2)
    {
        var a = (new org_kociemba_twophase_CubieCube.$())._0();
        var b = (new org_kociemba_twophase_CubieCube.$())._0();
        a.setURtoUL_1(idx1);
        b.setUBtoDF_1(idx2);
        for (var i = 0; i < 8; i=(i +1)|0) 
        {
            if (a.ep[i] !== org_kociemba_twophase_Edge.BR) if (b.ep[i] !== org_kociemba_twophase_Edge.BR) return -1;

            else b.ep[i] = a.ep[i];
        }
        return b.getURtoDF_0();
    }
    ,
};
_class(org_kociemba_twophase_CubieCube, java_lang_Object, null,
"org.kociemba.twophase.CubieCube" //replace-me-with-empty-string-for-production//
,{
    _0: function()
    {
        this.cp = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.DRB]);
        this.co = _arr("B",1,[0,0,0,0,0,0,0,0]);
        this.ep = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.BR]);
        this.eo = _arr("B",1,[0,0,0,0,0,0,0,0,0,0,0,0]);
        {
        }
        return this;
    }
    ,
    _4: function(cp,co,ep,eo)
    {
        org_kociemba_twophase_CubieCube.$.prototype._0.call(this);
        for (var i = 0; i < 8; i=(i +1)|0) 
        {
            this.cp[i] = cp[i];
            this.co[i] = co[i];
        }
        for (var i = 0; i < 12; i=(i +1)|0) 
        {
            this.ep[i] = ep[i];
            this.eo[i] = eo[i];
        }
        return this;
    }
    ,
    toFaceCube_0: function()
    {
        var fcRet = (new org_kociemba_twophase_FaceCube.$())._0();
        for (var c, c_i=0, c_a=org_kociemba_twophase_Corner.values_0(); (c_i<c_a.length)&&((c=c_a[c_i])||true); c_i++)
        {
            var i = c.ordinal_0();
            var j = this.cp[i].ordinal_0();
            var ori = this.co[i];
            for (var n = 0; n < 3; n=(n +1)|0) fcRet.f[org_kociemba_twophase_FaceCube.cornerFacelet[i][(((n + ori)|0)) % 3].ordinal_0()] = org_kociemba_twophase_FaceCube.cornerColor[j][n];
        }

        for (var e, e_i=0, e_a=org_kociemba_twophase_Edge.values_0(); (e_i<e_a.length)&&((e=e_a[e_i])||true); e_i++)
        {
            var i = e.ordinal_0();
            var j = this.ep[i].ordinal_0();
            var ori = this.eo[i];
            for (var n = 0; n < 2; n=(n +1)|0) fcRet.f[org_kociemba_twophase_FaceCube.edgeFacelet[i][(((n + ori)|0)) % 2].ordinal_0()] = org_kociemba_twophase_FaceCube.edgeColor[j][n];
        }

        return fcRet;
    }
    ,
    cornerMultiply_1: function(b)
    {
        var cPerm = _dim(org_kociemba_twophase_Corner,1,[8,],null);
        var cOri = _dim("B",1,[8,],0);
        for (var corn, corn_i=0, corn_a=org_kociemba_twophase_Corner.values_0(); (corn_i<corn_a.length)&&((corn=corn_a[corn_i])||true); corn_i++)
        {
            cPerm[corn.ordinal_0()] = this.cp[b.cp[corn.ordinal_0()].ordinal_0()];
            var oriA = this.co[b.cp[corn.ordinal_0()].ordinal_0()];
            var oriB = b.co[corn.ordinal_0()];
            var ori = 0;
            {}
            if (oriA < 3 && oriB < 3) 
            {
                ori = _castTObyte((((oriA + oriB)|0)));
                if (ori >= 3) ori = _castTObyte((ori)-(3));
            }
            else if (oriA < 3 && oriB >= 3) 
            {
                ori = _castTObyte((((oriA + oriB)|0)));
                if (ori >= 6) ori = _castTObyte((ori)-(3));
            }
            else if (oriA >= 3 && oriB < 3) 
            {
                ori = _castTObyte((((oriA - oriB)|0)));
                if (ori < 3) ori = _castTObyte((ori)+(3));
            }
            else if (oriA >= 3 && oriB >= 3) 
            {
                ori = _castTObyte((((oriA - oriB)|0)));
                if (ori < 0) ori = _castTObyte((ori)+(3));
            }
            cOri[corn.ordinal_0()] = ori;
        }

        for (var c, c_i=0, c_a=org_kociemba_twophase_Corner.values_0(); (c_i<c_a.length)&&((c=c_a[c_i])||true); c_i++)
        {
            this.cp[c.ordinal_0()] = cPerm[c.ordinal_0()];
            this.co[c.ordinal_0()] = cOri[c.ordinal_0()];
        }

    }
    ,
    edgeMultiply_1: function(b)
    {
        var ePerm = _dim(org_kociemba_twophase_Edge,1,[12,],null);
        var eOri = _dim("B",1,[12,],0);
        for (var edge, edge_i=0, edge_a=org_kociemba_twophase_Edge.values_0(); (edge_i<edge_a.length)&&((edge=edge_a[edge_i])||true); edge_i++)
        {
            ePerm[edge.ordinal_0()] = this.ep[b.ep[edge.ordinal_0()].ordinal_0()];
            eOri[edge.ordinal_0()] = _castTObyte(((((b.eo[edge.ordinal_0()] + this.eo[b.ep[edge.ordinal_0()].ordinal_0()])|0)) % 2));
        }

        for (var e, e_i=0, e_a=org_kociemba_twophase_Edge.values_0(); (e_i<e_a.length)&&((e=e_a[e_i])||true); e_i++)
        {
            this.ep[e.ordinal_0()] = ePerm[e.ordinal_0()];
            this.eo[e.ordinal_0()] = eOri[e.ordinal_0()];
        }

    }
    ,
    multiply_1: function(b)
    {
        this.cornerMultiply_1(b);
    }
    ,
    invCubieCube_1: function(c)
    {
        for (var edge, edge_i=0, edge_a=org_kociemba_twophase_Edge.values_0(); (edge_i<edge_a.length)&&((edge=edge_a[edge_i])||true); edge_i++)c.ep[this.ep[edge.ordinal_0()].ordinal_0()] = edge;

        for (var edge, edge_i=0, edge_a=org_kociemba_twophase_Edge.values_0(); (edge_i<edge_a.length)&&((edge=edge_a[edge_i])||true); edge_i++)c.eo[edge.ordinal_0()] = this.eo[c.ep[edge.ordinal_0()].ordinal_0()];

        for (var corn, corn_i=0, corn_a=org_kociemba_twophase_Corner.values_0(); (corn_i<corn_a.length)&&((corn=corn_a[corn_i])||true); corn_i++)c.cp[this.cp[corn.ordinal_0()].ordinal_0()] = corn;

        for (var corn, corn_i=0, corn_a=org_kociemba_twophase_Corner.values_0(); (corn_i<corn_a.length)&&((corn=corn_a[corn_i])||true); corn_i++)
        {
            var ori = this.co[c.cp[corn.ordinal_0()].ordinal_0()];
            if (ori >= 3) c.co[corn.ordinal_0()] = ori;

            else {
                c.co[corn.ordinal_0()] = _castTObyte((-(ori)|0));
                if (c.co[corn.ordinal_0()] < 0) c.co[corn.ordinal_0()] = _castTObyte((c.co[corn.ordinal_0()])+(3));
            }
        }

    }
    ,
    getTwist_0: function()
    {
        var ret = 0;
        for (var i = org_kociemba_twophase_Corner.URF.ordinal_0(); i < org_kociemba_twophase_Corner.DRB.ordinal_0(); i=(i +1)|0) ret = _castTOshort((((((3 * ret)|0) + this.co[i])|0)));
        return ret;
    }
    ,
    setTwist_1: function(twist)
    {
        var twistParity = 0;
        for (var i = ((org_kociemba_twophase_Corner.DRB.ordinal_0() - 1)|0); i >= org_kociemba_twophase_Corner.URF.ordinal_0(); i=(i -1)|0) 
        {
            twistParity = (((twistParity)+(this.co[i] = _castTObyte((twist % 3))))|0);
            twist = _castTOshort((twist)/(3));
        }
        this.co[org_kociemba_twophase_Corner.DRB.ordinal_0()] = _castTObyte(((((3 - twistParity % 3)|0)) % 3));
    }
    ,
    getFlip_0: function()
    {
        var ret = 0;
        for (var i = org_kociemba_twophase_Edge.UR.ordinal_0(); i < org_kociemba_twophase_Edge.BR.ordinal_0(); i=(i +1)|0) ret = _castTOshort((((((2 * ret)|0) + this.eo[i])|0)));
        return ret;
    }
    ,
    setFlip_1: function(flip)
    {
        var flipParity = 0;
        for (var i = ((org_kociemba_twophase_Edge.BR.ordinal_0() - 1)|0); i >= org_kociemba_twophase_Edge.UR.ordinal_0(); i=(i -1)|0) 
        {
            flipParity = (((flipParity)+(this.eo[i] = _castTObyte((flip % 2))))|0);
            flip = _castTOshort((flip)/(2));
        }
        this.eo[org_kociemba_twophase_Edge.BR.ordinal_0()] = _castTObyte(((((2 - flipParity % 2)|0)) % 2));
    }
    ,
    cornerParity_0: function()
    {
        var s = 0;
        for (var i = org_kociemba_twophase_Corner.DRB.ordinal_0(); i >= ((org_kociemba_twophase_Corner.URF.ordinal_0() + 1)|0); i=(i -1)|0) for (var j = ((i - 1)|0); j >= org_kociemba_twophase_Corner.URF.ordinal_0(); j=(j -1)|0) if (this.cp[j].ordinal_0() > this.cp[i].ordinal_0()) s=(s +1)|0;
        return _castTOshort((s % 2));
    }
    ,
    edgeParity_0: function()
    {
        var s = 0;
        for (var i = org_kociemba_twophase_Edge.BR.ordinal_0(); i >= ((org_kociemba_twophase_Edge.UR.ordinal_0() + 1)|0); i=(i -1)|0) for (var j = ((i - 1)|0); j >= org_kociemba_twophase_Edge.UR.ordinal_0(); j=(j -1)|0) if (this.ep[j].ordinal_0() > this.ep[i].ordinal_0()) s=(s +1)|0;
        return _castTOshort((s % 2));
    }
    ,
    getFRtoBR_0: function()
    {
        var a = 0, x = 0;
        var edge4 = _dim(org_kociemba_twophase_Edge,1,[4,],null);
        for (var j = org_kociemba_twophase_Edge.BR.ordinal_0(); j >= org_kociemba_twophase_Edge.UR.ordinal_0(); j=(j -1)|0) if (org_kociemba_twophase_Edge.FR.ordinal_0() <= this.ep[j].ordinal_0() && this.ep[j].ordinal_0() <= org_kociemba_twophase_Edge.BR.ordinal_0()) 
        {
            a = (((a)+(org_kociemba_twophase_CubieCube.Cnk_2(((11 - j)|0),((x + 1)|0))))|0);
            edge4[((3 - (((x=(x +1)|0) -1)|0))|0)] = this.ep[j];
        }
        var b = 0;
        for (var j = 3; j > 0; j=(j -1)|0) 
        {
            var k = 0;
            while (edge4[j].ordinal_0() !== ((j + 8)|0)) 
            {
                org_kociemba_twophase_CubieCube.rotateLeftE_3(edge4,0,j);
                k=(k +1)|0;
            }
            b = ((_imul((((j + 1)|0)), b) + k)|0);
        }
        return _castTOshort((((((24 * a)|0) + b)|0)));
    }
    ,
    setFRtoBR_1: function(idx)
    {
        var x = 0;
        var sliceEdge = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.BR]);
        var otherEdge = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB]);
        var b = idx % 24;
        var a = _idiv(idx, 24);
        for (var e, e_i=0, e_a=org_kociemba_twophase_Edge.values_0(); (e_i<e_a.length)&&((e=e_a[e_i])||true); e_i++)this.ep[e.ordinal_0()] = org_kociemba_twophase_Edge.DB;

        for (var j = 1, k = 0; j < 4; j=(j +1)|0) 
        {
            k = b % (((j + 1)|0));
            b = _idiv(b , ((j + 1)|0));
            while ((((k=(k -1)|0) +1)|0) > 0) org_kociemba_twophase_CubieCube.rotateRightE_3(sliceEdge,0,j);
        }
        x = 3;
        for (var j = org_kociemba_twophase_Edge.UR.ordinal_0(); j <= org_kociemba_twophase_Edge.BR.ordinal_0(); j=(j +1)|0) if (((a - org_kociemba_twophase_CubieCube.Cnk_2(((11 - j)|0),((x + 1)|0)))|0) >= 0) 
        {
            this.ep[j] = sliceEdge[((3 - x)|0)];
            a = (((a)-(org_kociemba_twophase_CubieCube.Cnk_2(((11 - j)|0),(((((x=(x -1)|0) +1)|0) + 1)|0))))|0);
        }
        x = 0;
        for (var j = org_kociemba_twophase_Edge.UR.ordinal_0(); j <= org_kociemba_twophase_Edge.BR.ordinal_0(); j=(j +1)|0) if (this.ep[j] === org_kociemba_twophase_Edge.DB) this.ep[j] = otherEdge[(((x=(x +1)|0) -1)|0)];
    }
    ,
    getURFtoDLF_0: function()
    {
        var a = 0, x = 0;
        var corner6 = _dim(org_kociemba_twophase_Corner,1,[6,],null);
        for (var j = org_kociemba_twophase_Corner.URF.ordinal_0(); j <= org_kociemba_twophase_Corner.DRB.ordinal_0(); j=(j +1)|0) if (this.cp[j].ordinal_0() <= org_kociemba_twophase_Corner.DLF.ordinal_0()) 
        {
            a = (((a)+(org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0))))|0);
            corner6[(((x=(x +1)|0) -1)|0)] = this.cp[j];
        }
        var b = 0;
        for (var j = 5; j > 0; j=(j -1)|0) 
        {
            var k = 0;
            while (corner6[j].ordinal_0() !== j) 
            {
                org_kociemba_twophase_CubieCube.rotateLeftC_3(corner6,0,j);
                k=(k +1)|0;
            }
            b = ((_imul((((j + 1)|0)), b) + k)|0);
        }
        return _castTOshort((((((720 * a)|0) + b)|0)));
    }
    ,
    setURFtoDLF_1: function(idx)
    {
        var x = 0;
        var corner6 = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.DLF]);
        var otherCorner = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.DRB]);
        var b = idx % 720;
        var a = _idiv(idx, 720);
        for (var c, c_i=0, c_a=org_kociemba_twophase_Corner.values_0(); (c_i<c_a.length)&&((c=c_a[c_i])||true); c_i++)this.cp[c.ordinal_0()] = org_kociemba_twophase_Corner.DRB;

        for (var j = 1, k = 0; j < 6; j=(j +1)|0) 
        {
            k = b % (((j + 1)|0));
            b = _idiv(b , ((j + 1)|0));
            while ((((k=(k -1)|0) +1)|0) > 0) org_kociemba_twophase_CubieCube.rotateRightC_3(corner6,0,j);
        }
        x = 5;
        for (var j = org_kociemba_twophase_Corner.DRB.ordinal_0(); j >= 0; j=(j -1)|0) if (((a - org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0)))|0) >= 0) 
        {
            this.cp[j] = corner6[x];
            a = (((a)-(org_kociemba_twophase_CubieCube.Cnk_2(j,(((((x=(x -1)|0) +1)|0) + 1)|0))))|0);
        }
        x = 0;
        for (var j = org_kociemba_twophase_Corner.URF.ordinal_0(); j <= org_kociemba_twophase_Corner.DRB.ordinal_0(); j=(j +1)|0) if (this.cp[j] === org_kociemba_twophase_Corner.DRB) this.cp[j] = otherCorner[(((x=(x +1)|0) -1)|0)];
    }
    ,
    getURtoDF_0: function()
    {
        var a = 0, x = 0;
        var edge6 = _dim(org_kociemba_twophase_Edge,1,[6,],null);
        for (var j = org_kociemba_twophase_Edge.UR.ordinal_0(); j <= org_kociemba_twophase_Edge.BR.ordinal_0(); j=(j +1)|0) if (this.ep[j].ordinal_0() <= org_kociemba_twophase_Edge.DF.ordinal_0()) 
        {
            a = (((a)+(org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0))))|0);
            edge6[(((x=(x +1)|0) -1)|0)] = this.ep[j];
        }
        var b = 0;
        for (var j = 5; j > 0; j=(j -1)|0) 
        {
            var k = 0;
            while (edge6[j].ordinal_0() !== j) 
            {
                org_kociemba_twophase_CubieCube.rotateLeftE_3(edge6,0,j);
                k=(k +1)|0;
            }
            b = ((_imul((((j + 1)|0)), b) + k)|0);
        }
        return ((((720 * a)|0) + b)|0);
    }
    ,
    setURtoDF_1: function(idx)
    {
        var x = 0;
        var edge6 = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF]);
        var otherEdge = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.BR]);
        var b = idx % 720;
        var a = _idiv(idx, 720);
        for (var e, e_i=0, e_a=org_kociemba_twophase_Edge.values_0(); (e_i<e_a.length)&&((e=e_a[e_i])||true); e_i++)this.ep[e.ordinal_0()] = org_kociemba_twophase_Edge.BR;

        for (var j = 1, k = 0; j < 6; j=(j +1)|0) 
        {
            k = b % (((j + 1)|0));
            b = _idiv(b , ((j + 1)|0));
            while ((((k=(k -1)|0) +1)|0) > 0) org_kociemba_twophase_CubieCube.rotateRightE_3(edge6,0,j);
        }
        x = 5;
        for (var j = org_kociemba_twophase_Edge.BR.ordinal_0(); j >= 0; j=(j -1)|0) if (((a - org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0)))|0) >= 0) 
        {
            this.ep[j] = edge6[x];
            a = (((a)-(org_kociemba_twophase_CubieCube.Cnk_2(j,(((((x=(x -1)|0) +1)|0) + 1)|0))))|0);
        }
        x = 0;
        for (var j = org_kociemba_twophase_Edge.UR.ordinal_0(); j <= org_kociemba_twophase_Edge.BR.ordinal_0(); j=(j +1)|0) if (this.ep[j] === org_kociemba_twophase_Edge.BR) this.ep[j] = otherEdge[(((x=(x +1)|0) -1)|0)];
    }
    ,
    getURtoUL_0: function()
    {
        var a = 0, x = 0;
        var edge3 = _dim(org_kociemba_twophase_Edge,1,[3,],null);
        for (var j = org_kociemba_twophase_Edge.UR.ordinal_0(); j <= org_kociemba_twophase_Edge.BR.ordinal_0(); j=(j +1)|0) if (this.ep[j].ordinal_0() <= org_kociemba_twophase_Edge.UL.ordinal_0()) 
        {
            a = (((a)+(org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0))))|0);
            edge3[(((x=(x +1)|0) -1)|0)] = this.ep[j];
        }
        var b = 0;
        for (var j = 2; j > 0; j=(j -1)|0) 
        {
            var k = 0;
            while (edge3[j].ordinal_0() !== j) 
            {
                org_kociemba_twophase_CubieCube.rotateLeftE_3(edge3,0,j);
                k=(k +1)|0;
            }
            b = ((_imul((((j + 1)|0)), b) + k)|0);
        }
        return _castTOshort((((((6 * a)|0) + b)|0)));
    }
    ,
    setURtoUL_1: function(idx)
    {
        var x = 0;
        var edge3 = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL]);
        var b = idx % 6;
        var a = _idiv(idx, 6);
        for (var e, e_i=0, e_a=org_kociemba_twophase_Edge.values_0(); (e_i<e_a.length)&&((e=e_a[e_i])||true); e_i++)this.ep[e.ordinal_0()] = org_kociemba_twophase_Edge.BR;

        for (var j = 1, k = 0; j < 3; j=(j +1)|0) 
        {
            k = b % (((j + 1)|0));
            b = _idiv(b , ((j + 1)|0));
            while ((((k=(k -1)|0) +1)|0) > 0) org_kociemba_twophase_CubieCube.rotateRightE_3(edge3,0,j);
        }
        x = 2;
        for (var j = org_kociemba_twophase_Edge.BR.ordinal_0(); j >= 0; j=(j -1)|0) if (((a - org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0)))|0) >= 0) 
        {
            this.ep[j] = edge3[x];
            a = (((a)-(org_kociemba_twophase_CubieCube.Cnk_2(j,(((((x=(x -1)|0) +1)|0) + 1)|0))))|0);
        }
    }
    ,
    getUBtoDF_0: function()
    {
        var a = 0, x = 0;
        var edge3 = _dim(org_kociemba_twophase_Edge,1,[3,],null);
        for (var j = org_kociemba_twophase_Edge.UR.ordinal_0(); j <= org_kociemba_twophase_Edge.BR.ordinal_0(); j=(j +1)|0) if (org_kociemba_twophase_Edge.UB.ordinal_0() <= this.ep[j].ordinal_0() && this.ep[j].ordinal_0() <= org_kociemba_twophase_Edge.DF.ordinal_0()) 
        {
            a = (((a)+(org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0))))|0);
            edge3[(((x=(x +1)|0) -1)|0)] = this.ep[j];
        }
        var b = 0;
        for (var j = 2; j > 0; j=(j -1)|0) 
        {
            var k = 0;
            while (edge3[j].ordinal_0() !== ((org_kociemba_twophase_Edge.UB.ordinal_0() + j)|0)) 
            {
                org_kociemba_twophase_CubieCube.rotateLeftE_3(edge3,0,j);
                k=(k +1)|0;
            }
            b = ((_imul((((j + 1)|0)), b) + k)|0);
        }
        return _castTOshort((((((6 * a)|0) + b)|0)));
    }
    ,
    setUBtoDF_1: function(idx)
    {
        var x = 0;
        var edge3 = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF]);
        var b = idx % 6;
        var a = _idiv(idx, 6);
        for (var e, e_i=0, e_a=org_kociemba_twophase_Edge.values_0(); (e_i<e_a.length)&&((e=e_a[e_i])||true); e_i++)this.ep[e.ordinal_0()] = org_kociemba_twophase_Edge.BR;

        for (var j = 1, k = 0; j < 3; j=(j +1)|0) 
        {
            k = b % (((j + 1)|0));
            b = _idiv(b , ((j + 1)|0));
            while ((((k=(k -1)|0) +1)|0) > 0) org_kociemba_twophase_CubieCube.rotateRightE_3(edge3,0,j);
        }
        x = 2;
        for (var j = org_kociemba_twophase_Edge.BR.ordinal_0(); j >= 0; j=(j -1)|0) if (((a - org_kociemba_twophase_CubieCube.Cnk_2(j,((x + 1)|0)))|0) >= 0) 
        {
            this.ep[j] = edge3[x];
            a = (((a)-(org_kociemba_twophase_CubieCube.Cnk_2(j,(((((x=(x -1)|0) +1)|0) + 1)|0))))|0);
        }
    }
    ,
    getURFtoDLB_0: function()
    {
        var perm = _dim(org_kociemba_twophase_Corner,1,[8,],null);
        var b = 0;
        for (var i = 0; i < 8; i=(i +1)|0) perm[i] = this.cp[i];
        for (var j = 7; j > 0; j=(j -1)|0) 
        {
            var k = 0;
            while (perm[j].ordinal_0() !== j) 
            {
                org_kociemba_twophase_CubieCube.rotateLeftC_3(perm,0,j);
                k=(k +1)|0;
            }
            b = ((_imul((((j + 1)|0)), b) + k)|0);
        }
        return b;
    }
    ,
    setURFtoDLB_1: function(idx)
    {
        var perm = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.DRB]);
        var k = 0;
        for (var j = 1; j < 8; j=(j +1)|0) 
        {
            k = idx % (((j + 1)|0));
            idx = _idiv(idx , ((j + 1)|0));
            while ((((k=(k -1)|0) +1)|0) > 0) org_kociemba_twophase_CubieCube.rotateRightC_3(perm,0,j);
        }
        var x = 7;
        for (var j = 7; j >= 0; j=(j -1)|0) this.cp[j] = perm[(((x=(x -1)|0) +1)|0)];
    }
    ,
    getURtoBR_0: function()
    {
        var perm = _dim(org_kociemba_twophase_Edge,1,[12,],null);
        var b = 0;
        for (var i = 0; i < 12; i=(i +1)|0) perm[i] = this.ep[i];
        for (var j = 11; j > 0; j=(j -1)|0) 
        {
            var k = 0;
            while (perm[j].ordinal_0() !== j) 
            {
                org_kociemba_twophase_CubieCube.rotateLeftE_3(perm,0,j);
                k=(k +1)|0;
            }
            b = ((_imul((((j + 1)|0)), b) + k)|0);
        }
        return b;
    }
    ,
    setURtoBR_1: function(idx)
    {
        var perm = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.BR]);
        var k = 0;
        for (var j = 1; j < 12; j=(j +1)|0) 
        {
            k = idx % (((j + 1)|0));
            idx = _idiv(idx , ((j + 1)|0));
            while ((((k=(k -1)|0) +1)|0) > 0) org_kociemba_twophase_CubieCube.rotateRightE_3(perm,0,j);
        }
        var x = 11;
        for (var j = 11; j >= 0; j=(j -1)|0) this.ep[j] = perm[(((x=(x -1)|0) +1)|0)];
    }
    ,
    verify_0: function()
    {
        var sum = 0;
        var edgeCount = _dim("I",1,[12,],0);
        for (var e, e_i=0, e_a=org_kociemba_twophase_Edge.values_0(); (e_i<e_a.length)&&((e=e_a[e_i])||true); e_i++)edgeCount[this.ep[e.ordinal_0()].ordinal_0()]=(edgeCount[this.ep[e.ordinal_0()].ordinal_0()] +1)|0;

        for (var i = 0; i < 12; i=(i +1)|0) if (edgeCount[i] !== 1) return -2;
        for (var i = 0; i < 12; i=(i +1)|0) sum = (((sum)+(this.eo[i]))|0);
        if (sum % 2 !== 0) return -3;
        var cornerCount = _dim("I",1,[8,],0);
        for (var c, c_i=0, c_a=org_kociemba_twophase_Corner.values_0(); (c_i<c_a.length)&&((c=c_a[c_i])||true); c_i++)cornerCount[this.cp[c.ordinal_0()].ordinal_0()]=(cornerCount[this.cp[c.ordinal_0()].ordinal_0()] +1)|0;

        for (var i = 0; i < 8; i=(i +1)|0) if (cornerCount[i] !== 1) return -4;
        sum = 0;
        for (var i = 0; i < 8; i=(i +1)|0) sum = (((sum)+(this.co[i]))|0);
        if (sum % 3 !== 0) return -5;
        if ((this.edgeParity_0() ^ this.cornerParity_0()) !== 0) return -6;
        return 0;
    }
    ,
});
org_kociemba_twophase_CubieCube.cpU = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.DRB]);
org_kociemba_twophase_CubieCube.coU = _arr("B",1,[0,0,0,0,0,0,0,0]);
org_kociemba_twophase_CubieCube.epU = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.BR]);
org_kociemba_twophase_CubieCube.eoU = _arr("B",1,[0,0,0,0,0,0,0,0,0,0,0,0]);
org_kociemba_twophase_CubieCube.cpR = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.DRB,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.UBR]);
org_kociemba_twophase_CubieCube.coR = _arr("B",1,[2,0,0,1,1,0,0,2]);
org_kociemba_twophase_CubieCube.epR = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.BR,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.UR]);
org_kociemba_twophase_CubieCube.eoR = _arr("B",1,[0,0,0,0,0,0,0,0,0,0,0,0]);
org_kociemba_twophase_CubieCube.cpF = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.DRB]);
org_kociemba_twophase_CubieCube.coF = _arr("B",1,[1,2,0,0,2,1,0,0]);
org_kociemba_twophase_CubieCube.epF = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.BR]);
org_kociemba_twophase_CubieCube.eoF = _arr("B",1,[0,1,0,0,0,1,0,0,1,1,0,0]);
org_kociemba_twophase_CubieCube.cpD = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.DRB,org_kociemba_twophase_Corner.DFR]);
org_kociemba_twophase_CubieCube.coD = _arr("B",1,[0,0,0,0,0,0,0,0]);
org_kociemba_twophase_CubieCube.epD = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.BR]);
org_kociemba_twophase_CubieCube.eoD = _arr("B",1,[0,0,0,0,0,0,0,0,0,0,0,0]);
org_kociemba_twophase_CubieCube.cpL = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.DBL,org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.DRB]);
org_kociemba_twophase_CubieCube.coL = _arr("B",1,[0,1,2,0,0,2,1,0]);
org_kociemba_twophase_CubieCube.epL = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.DB,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.BR]);
org_kociemba_twophase_CubieCube.eoL = _arr("B",1,[0,0,0,0,0,0,0,0,0,0,0,0]);
org_kociemba_twophase_CubieCube.cpB = _arr(org_kociemba_twophase_Corner,1,[org_kociemba_twophase_Corner.URF,org_kociemba_twophase_Corner.UFL,org_kociemba_twophase_Corner.UBR,org_kociemba_twophase_Corner.DRB,org_kociemba_twophase_Corner.DFR,org_kociemba_twophase_Corner.DLF,org_kociemba_twophase_Corner.ULB,org_kociemba_twophase_Corner.DBL]);
org_kociemba_twophase_CubieCube.coB = _arr("B",1,[0,0,1,2,0,0,2,1]);
org_kociemba_twophase_CubieCube.epB = _arr(org_kociemba_twophase_Edge,1,[org_kociemba_twophase_Edge.UR,org_kociemba_twophase_Edge.UF,org_kociemba_twophase_Edge.UL,org_kociemba_twophase_Edge.BR,org_kociemba_twophase_Edge.DR,org_kociemba_twophase_Edge.DF,org_kociemba_twophase_Edge.DL,org_kociemba_twophase_Edge.BL,org_kociemba_twophase_Edge.FR,org_kociemba_twophase_Edge.FL,org_kociemba_twophase_Edge.UB,org_kociemba_twophase_Edge.DB]);
org_kociemba_twophase_CubieCube.eoB = _arr("B",1,[0,0,0,1,0,0,0,1,0,0,1,1]);
org_kociemba_twophase_CubieCube.moveCube = _dim(org_kociemba_twophase_CubieCube,1,[6,],null);
{
    org_kociemba_twophase_CubieCube.moveCube[0] = (new org_kociemba_twophase_CubieCube.$())._0();
    org_kociemba_twophase_CubieCube.moveCube[0].cp = org_kociemba_twophase_CubieCube.cpU;
    org_kociemba_twophase_CubieCube.moveCube[0].co = org_kociemba_twophase_CubieCube.coU;
    org_kociemba_twophase_CubieCube.moveCube[0].ep = org_kociemba_twophase_CubieCube.epU;
    org_kociemba_twophase_CubieCube.moveCube[0].eo = org_kociemba_twophase_CubieCube.eoU;
    org_kociemba_twophase_CubieCube.moveCube[1] = (new org_kociemba_twophase_CubieCube.$())._0();
    org_kociemba_twophase_CubieCube.moveCube[1].cp = org_kociemba_twophase_CubieCube.cpR;
    org_kociemba_twophase_CubieCube.moveCube[1].co = org_kociemba_twophase_CubieCube.coR;
    org_kociemba_twophase_CubieCube.moveCube[1].ep = org_kociemba_twophase_CubieCube.epR;
    org_kociemba_twophase_CubieCube.moveCube[1].eo = org_kociemba_twophase_CubieCube.eoR;
    org_kociemba_twophase_CubieCube.moveCube[2] = (new org_kociemba_twophase_CubieCube.$())._0();
    org_kociemba_twophase_CubieCube.moveCube[2].cp = org_kociemba_twophase_CubieCube.cpF;
    org_kociemba_twophase_CubieCube.moveCube[2].co = org_kociemba_twophase_CubieCube.coF;
    org_kociemba_twophase_CubieCube.moveCube[2].ep = org_kociemba_twophase_CubieCube.epF;
    org_kociemba_twophase_CubieCube.moveCube[2].eo = org_kociemba_twophase_CubieCube.eoF;
    org_kociemba_twophase_CubieCube.moveCube[3] = (new org_kociemba_twophase_CubieCube.$())._0();
    org_kociemba_twophase_CubieCube.moveCube[3].cp = org_kociemba_twophase_CubieCube.cpD;
    org_kociemba_twophase_CubieCube.moveCube[3].co = org_kociemba_twophase_CubieCube.coD;
    org_kociemba_twophase_CubieCube.moveCube[3].ep = org_kociemba_twophase_CubieCube.epD;
    org_kociemba_twophase_CubieCube.moveCube[3].eo = org_kociemba_twophase_CubieCube.eoD;
    org_kociemba_twophase_CubieCube.moveCube[4] = (new org_kociemba_twophase_CubieCube.$())._0();
    org_kociemba_twophase_CubieCube.moveCube[4].cp = org_kociemba_twophase_CubieCube.cpL;
    org_kociemba_twophase_CubieCube.moveCube[4].co = org_kociemba_twophase_CubieCube.coL;
    org_kociemba_twophase_CubieCube.moveCube[4].ep = org_kociemba_twophase_CubieCube.epL;
    org_kociemba_twophase_CubieCube.moveCube[4].eo = org_kociemba_twophase_CubieCube.eoL;
    org_kociemba_twophase_CubieCube.moveCube[5] = (new org_kociemba_twophase_CubieCube.$())._0();
    org_kociemba_twophase_CubieCube.moveCube[5].cp = org_kociemba_twophase_CubieCube.cpB;
    org_kociemba_twophase_CubieCube.moveCube[5].co = org_kociemba_twophase_CubieCube.coB;
    org_kociemba_twophase_CubieCube.moveCube[5].ep = org_kociemba_twophase_CubieCube.epB;
    org_kociemba_twophase_CubieCube.moveCube[5].eo = org_kociemba_twophase_CubieCube.eoB;
}
//reference// org/kociemba/twophase/FaceCube
//load// java/lang/Object
//complete// org/kociemba/twophase/Corner
//complete// org/kociemba/twophase/CubieCube
//complete// org/kociemba/twophase/Edge
var org_kociemba_twophase_CoordCube = 
{
    $: function()
    {
        this.twist = 0;
        this.flip = 0;
        this.parity = 0;
        this.FRtoBR = 0;
        this.URFtoDLF = 0;
        this.URtoUL = 0;
        this.UBtoDF = 0;
        this.URtoDF = 0;
    }
    ,
    N__TWIST: 2187,
    N__FLIP: 2048,
    N__SLICE1: 495,
    N__SLICE2: 24,
    N__PARITY: 2,
    N__URFtoDLF: 20160,
    N__FRtoBR: 11880,
    N__URtoUL: 1320,
    N__UBtoDF: 1320,
    N__URtoDF: 20160,
    N__URFtoDLB: 40320,
    N__URtoBR: 479001600,
    N__MOVE: 18,
    twistMove: null,
    flipMove: null,
    parityMove: null,
    FRtoBR__Move: null,
    URFtoDLF__Move: null,
    URtoDF__Move: null,
    URtoUL__Move: null,
    UBtoDF__Move: null,
    MergeURtoULandUBtoDF: null,
    Slice__URFtoDLF__Parity__Prun: null,
    Slice__URtoDF__Parity__Prun: null,
    Slice__Twist__Prun: null,
    Slice__Flip__Prun: null,
    setPruning_3: function(table,index,value)
    {
        if ((index & 1) === 0) table[_idiv(index, 2)] = _castTObyte((table[_idiv(index, 2)])&(240 | value));

        else table[_idiv(index, 2)] = _castTObyte((table[_idiv(index, 2)])&(15 | (value << 4)));
    }
    ,
    getPruning_2: function(table,index)
    {
        if ((index & 1) === 0) return _castTObyte((table[_idiv(index, 2)] & 15));

        else return _castTObyte(((table[_idiv(index, 2)] & 240) >>> 4));
    }
    ,
};
_class(org_kociemba_twophase_CoordCube, java_lang_Object, null,
"org.kociemba.twophase.CoordCube" //replace-me-with-empty-string-for-production//
,{
    _1: function(c)
    {
        this.twist = c.getTwist_0();
        this.flip = c.getFlip_0();
        this.parity = c.cornerParity_0();
        this.FRtoBR = c.getFRtoBR_0();
        this.URFtoDLF = c.getURFtoDLF_0();
        this.URtoUL = c.getURtoUL_0();
        this.UBtoDF = c.getUBtoDF_0();
        this.URtoDF = c.getURtoDF_0();
        return this;
    }
    ,
    move_1: function(m)
    {
        this.twist = org_kociemba_twophase_CoordCube.twistMove[this.twist][m];
        this.flip = org_kociemba_twophase_CoordCube.flipMove[this.flip][m];
        this.parity = org_kociemba_twophase_CoordCube.parityMove[this.parity][m];
        this.FRtoBR = org_kociemba_twophase_CoordCube.FRtoBR__Move[this.FRtoBR][m];
        this.URFtoDLF = org_kociemba_twophase_CoordCube.URFtoDLF__Move[this.URFtoDLF][m];
        this.URtoUL = org_kociemba_twophase_CoordCube.URtoUL__Move[this.URtoUL][m];
        this.UBtoDF = org_kociemba_twophase_CoordCube.UBtoDF__Move[this.UBtoDF][m];
        if (this.URtoUL < 336 && this.UBtoDF < 336) this.URtoDF = org_kociemba_twophase_CoordCube.MergeURtoULandUBtoDF[this.URtoUL][this.UBtoDF];
    }
    ,
});
org_kociemba_twophase_CoordCube.twistMove = _dim("S",2,[org_kociemba_twophase_CoordCube.N__TWIST,org_kociemba_twophase_CoordCube.N__MOVE,],0);
{
    var a = (new org_kociemba_twophase_CubieCube.$())._0();
    for (var i = 0; i < 2187; i=(i +1)<<16>>16) 
    {
        a.setTwist_1(i);
        for (var j = 0; j < 6; j=(j +1)|0) 
        {
            for (var k = 0; k < 3; k=(k +1)|0) 
            {
                a.cornerMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
                org_kociemba_twophase_CoordCube.twistMove[i][((((3 * j)|0) + k)|0)] = a.getTwist_0();
            }
            a.cornerMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
        }
    }
}
org_kociemba_twophase_CoordCube.flipMove = _dim("S",2,[org_kociemba_twophase_CoordCube.N__FLIP,org_kociemba_twophase_CoordCube.N__MOVE,],0);
{
    var a = (new org_kociemba_twophase_CubieCube.$())._0();
    for (var i = 0; i < 2048; i=(i +1)<<16>>16) 
    {
        a.setFlip_1(i);
        for (var j = 0; j < 6; j=(j +1)|0) 
        {
            for (var k = 0; k < 3; k=(k +1)|0) 
            {
                a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
                org_kociemba_twophase_CoordCube.flipMove[i][((((3 * j)|0) + k)|0)] = a.getFlip_0();
            }
            a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
        }
    }
}
org_kociemba_twophase_CoordCube.parityMove = _arr("S",2,[_arr("S",1,[1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1]),_arr("S",1,[0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0])]);
org_kociemba_twophase_CoordCube.FRtoBR__Move = _dim("S",2,[org_kociemba_twophase_CoordCube.N__FRtoBR,org_kociemba_twophase_CoordCube.N__MOVE,],0);
{
    var a = (new org_kociemba_twophase_CubieCube.$())._0();
    for (var i = 0; i < 11880; i=(i +1)<<16>>16) 
    {
        a.setFRtoBR_1(i);
        for (var j = 0; j < 6; j=(j +1)|0) 
        {
            for (var k = 0; k < 3; k=(k +1)|0) 
            {
                a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
                org_kociemba_twophase_CoordCube.FRtoBR__Move[i][((((3 * j)|0) + k)|0)] = a.getFRtoBR_0();
            }
            a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
        }
    }
}
org_kociemba_twophase_CoordCube.URFtoDLF__Move = _dim("S",2,[org_kociemba_twophase_CoordCube.N__URFtoDLF,org_kociemba_twophase_CoordCube.N__MOVE,],0);
{
    var a = (new org_kociemba_twophase_CubieCube.$())._0();
    for (var i = 0; i < 20160; i=(i +1)<<16>>16) 
    {
        a.setURFtoDLF_1(i);
        for (var j = 0; j < 6; j=(j +1)|0) 
        {
            for (var k = 0; k < 3; k=(k +1)|0) 
            {
                a.cornerMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
                org_kociemba_twophase_CoordCube.URFtoDLF__Move[i][((((3 * j)|0) + k)|0)] = a.getURFtoDLF_0();
            }
            a.cornerMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
        }
    }
}
org_kociemba_twophase_CoordCube.URtoDF__Move = _dim("S",2,[org_kociemba_twophase_CoordCube.N__URtoDF,org_kociemba_twophase_CoordCube.N__MOVE,],0);
{
    var a = (new org_kociemba_twophase_CubieCube.$())._0();
    for (var i = 0; i < 20160; i=(i +1)<<16>>16) 
    {
        a.setURtoDF_1(i);
        for (var j = 0; j < 6; j=(j +1)|0) 
        {
            for (var k = 0; k < 3; k=(k +1)|0) 
            {
                a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
                org_kociemba_twophase_CoordCube.URtoDF__Move[i][((((3 * j)|0) + k)|0)] = _castTOshort(a.getURtoDF_0());
            }
            a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
        }
    }
}
org_kociemba_twophase_CoordCube.URtoUL__Move = _dim("S",2,[org_kociemba_twophase_CoordCube.N__URtoUL,org_kociemba_twophase_CoordCube.N__MOVE,],0);
{
    var a = (new org_kociemba_twophase_CubieCube.$())._0();
    for (var i = 0; i < 1320; i=(i +1)<<16>>16) 
    {
        a.setURtoUL_1(i);
        for (var j = 0; j < 6; j=(j +1)|0) 
        {
            for (var k = 0; k < 3; k=(k +1)|0) 
            {
                a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
                org_kociemba_twophase_CoordCube.URtoUL__Move[i][((((3 * j)|0) + k)|0)] = a.getURtoUL_0();
            }
            a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
        }
    }
}
org_kociemba_twophase_CoordCube.UBtoDF__Move = _dim("S",2,[org_kociemba_twophase_CoordCube.N__UBtoDF,org_kociemba_twophase_CoordCube.N__MOVE,],0);
{
    var a = (new org_kociemba_twophase_CubieCube.$())._0();
    for (var i = 0; i < 1320; i=(i +1)<<16>>16) 
    {
        a.setUBtoDF_1(i);
        for (var j = 0; j < 6; j=(j +1)|0) 
        {
            for (var k = 0; k < 3; k=(k +1)|0) 
            {
                a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
                org_kociemba_twophase_CoordCube.UBtoDF__Move[i][((((3 * j)|0) + k)|0)] = a.getUBtoDF_0();
            }
            a.edgeMultiply_1(org_kociemba_twophase_CubieCube.moveCube[j]);
        }
    }
}
org_kociemba_twophase_CoordCube.MergeURtoULandUBtoDF = _dim("S",2,[336,336,],0);
{
    for (var uRtoUL = 0; uRtoUL < 336; uRtoUL=(uRtoUL +1)<<16>>16) 
    {
        for (var uBtoDF = 0; uBtoDF < 336; uBtoDF=(uBtoDF +1)<<16>>16) 
        {
            org_kociemba_twophase_CoordCube.MergeURtoULandUBtoDF[uRtoUL][uBtoDF] = _castTOshort(org_kociemba_twophase_CubieCube.getURtoDF_2(uRtoUL,uBtoDF));
        }
    }
}
org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun = _dim("B",1,[_idiv(967680, 2),],0);
{
    for (var i = 0; i < 483840; i=(i +1)|0) org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun[i] = -1;
    var depth = 0;
    org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun,0,0);
    var done = 1;
    while (done !== 967680) 
    {
        for (var i = 0; i < 967680; i=(i +1)|0) 
        {
            var parity = i % 2;
            var URFtoDLF = _idiv((_idiv(i, 2)), 24);
            var slice = (_idiv(i, 2)) % 24;
            if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun,i) === depth) 
            {
                for (var j = 0; j < 18; j=(j +1)|0) 
                {
                    switch (j)
                    {
                        case 3:
                        case 5:
                        case 6:
                        case 8:
                        case 12:
                        case 14:
                        case 15:
                        case 17:
                            continue;
                        default:
                            var newSlice = org_kociemba_twophase_CoordCube.FRtoBR__Move[slice][j];
                            var newURFtoDLF = org_kociemba_twophase_CoordCube.URFtoDLF__Move[URFtoDLF][j];
                            var newParity = org_kociemba_twophase_CoordCube.parityMove[parity][j];
                            if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun,(((((((_imul(24, newURFtoDLF) + newSlice)|0)) * 2)|0) + newParity)|0)) === 15) 
                            {
                                org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__URFtoDLF__Parity__Prun,(((((((_imul(24, newURFtoDLF) + newSlice)|0)) * 2)|0) + newParity)|0),_castTObyte((((depth + 1)|0))));
                                done=(done +1)|0;
                            }
                    }
                }
            }
        }
        depth=(depth +1)|0;
    }
}
org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun = _dim("B",1,[_idiv(967680, 2),],0);
{
    for (var i = 0; i < 483840; i=(i +1)|0) org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun[i] = -1;
    var depth = 0;
    org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun,0,0);
    var done = 1;
    while (done !== 967680) 
    {
        for (var i = 0; i < 967680; i=(i +1)|0) 
        {
            var parity = i % 2;
            var URtoDF = _idiv((_idiv(i, 2)), 24);
            var slice = (_idiv(i, 2)) % 24;
            if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun,i) === depth) 
            {
                for (var j = 0; j < 18; j=(j +1)|0) 
                {
                    switch (j)
                    {
                        case 3:
                        case 5:
                        case 6:
                        case 8:
                        case 12:
                        case 14:
                        case 15:
                        case 17:
                            continue;
                        default:
                            var newSlice = org_kociemba_twophase_CoordCube.FRtoBR__Move[slice][j];
                            var newURtoDF = org_kociemba_twophase_CoordCube.URtoDF__Move[URtoDF][j];
                            var newParity = org_kociemba_twophase_CoordCube.parityMove[parity][j];
                            if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun,(((((((_imul(24, newURtoDF) + newSlice)|0)) * 2)|0) + newParity)|0)) === 15) 
                            {
                                org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__URtoDF__Parity__Prun,(((((((_imul(24, newURtoDF) + newSlice)|0)) * 2)|0) + newParity)|0),_castTObyte((((depth + 1)|0))));
                                done=(done +1)|0;
                            }
                    }
                }
            }
        }
        depth=(depth +1)|0;
    }
}
org_kociemba_twophase_CoordCube.Slice__Twist__Prun = _dim("B",1,[((541282 + 1)|0),],0);
{
    for (var i = 0; i < 541283; i=(i +1)|0) org_kociemba_twophase_CoordCube.Slice__Twist__Prun[i] = -1;
    var depth = 0;
    org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__Twist__Prun,0,0);
    var done = 1;
    while (done !== 1082565) 
    {
        for (var i = 0; i < 1082565; i=(i +1)|0) 
        {
            var twist = _idiv(i, 495), slice = i % 495;
            if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__Twist__Prun,i) === depth) 
            {
                for (var j = 0; j < 18; j=(j +1)|0) 
                {
                    var newSlice = _idiv(org_kociemba_twophase_CoordCube.FRtoBR__Move[((slice * 24)|0)][j], 24);
                    var newTwist = org_kociemba_twophase_CoordCube.twistMove[twist][j];
                    if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__Twist__Prun,((_imul(495, newTwist) + newSlice)|0)) === 15) 
                    {
                        org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__Twist__Prun,((_imul(495, newTwist) + newSlice)|0),_castTObyte((((depth + 1)|0))));
                        done=(done +1)|0;
                    }
                }
            }
        }
        depth=(depth +1)|0;
    }
}
org_kociemba_twophase_CoordCube.Slice__Flip__Prun = _dim("B",1,[_idiv(1013760, 2),],0);
{
    for (var i = 0; i < 506880; i=(i +1)|0) org_kociemba_twophase_CoordCube.Slice__Flip__Prun[i] = -1;
    var depth = 0;
    org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__Flip__Prun,0,0);
    var done = 1;
    while (done !== 1013760) 
    {
        for (var i = 0; i < 1013760; i=(i +1)|0) 
        {
            var flip = _idiv(i, 495), slice = i % 495;
            if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__Flip__Prun,i) === depth) 
            {
                for (var j = 0; j < 18; j=(j +1)|0) 
                {
                    var newSlice = _idiv(org_kociemba_twophase_CoordCube.FRtoBR__Move[((slice * 24)|0)][j], 24);
                    var newFlip = org_kociemba_twophase_CoordCube.flipMove[flip][j];
                    if (org_kociemba_twophase_CoordCube.getPruning_2(org_kociemba_twophase_CoordCube.Slice__Flip__Prun,((_imul(495, newFlip) + newSlice)|0)) === 15) 
                    {
                        org_kociemba_twophase_CoordCube.setPruning_3(org_kociemba_twophase_CoordCube.Slice__Flip__Prun,((_imul(495, newFlip) + newSlice)|0),_castTObyte((((depth + 1)|0))));
                        done=(done +1)|0;
                    }
                }
            }
        }
        depth=(depth +1)|0;
    }
}
//load// java/lang/Object
//complete// org/kociemba/twophase/CoordCube
//complete// org/kociemba/twophase/CubieCube

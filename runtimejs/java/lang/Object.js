
// definition of the base class for all java classes
var java_lang_Object = {
    $: function() {}    // allocator function
};

// add default member functions
java_lang_Object.$.prototype._0 = function()
{
    return this;
};
java_lang_Object.$.prototype.toString_0 = function()
{
  return this._classname;
};
java_lang_Object.$.prototype.equals_1 = function(a)
{
  return this===a;
};
java_lang_Object.$.prototype.hashCode_0 = function()
{
// there is no real way to access any true object identity, so use a hash of the class name instead
  return this._classname.hashCode_0();  
};

// add default attributes 
java_lang_Object.$.prototype._isObject = true;
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
    classobject.$.prototype._interfaces = base.$.prototype._interfaces.slice();
    collectInterfaces(interfaces);
    
    // add/overwrite methods that are newly defined
    if (instancemethods) {
        for (var name in instancemethods) {      
            classobject.$.prototype[name] = instancemethods[name];
        }
    }  
  
    function collectInterfaces(implementedinterfaces) {   
        var all = classobject.$.prototype._interfaces;
        for (var index=0; implementedinterfaces && index<implementedinterfaces.length; index++) {
            var inf = implementedinterfaces[index];    
            if (all.indexOf(inf)<0) all.push(inf);
            collectInterfaces(inf._superinterfaces);
        }
    }
}

// test if an arbitrary java.lang.Object implements a given Interface
function _implements(x,intrfc)
{    
    return (x==null) ? false : (x._interfaces.indexOf(intrfc)>=0);
}

// test if an arbitrary java.lang.Object is a String
function _isstr(o) {
    return o!=null && o._isString;
}

// convert a unicode code number to a string with the corresponding letter 
function _c2s(c) {
    return String.fromCharCode(c);
}

// convert any object to a string - and give "null" for null reference
function _str(o) {
    if (o==null) return "null";
    return o.toString_0();    
}

// integer multiplication with correct behaviour for large operands
var _imul = Math.imul || function(a, b) {
  var ah = (a >>> 16) & 0xffff;
  var al = a & 0xffff;
  var bh = (b >>> 16) & 0xffff;
  var bl = b & 0xffff;
  // the shift by 0 fixes the sign on the high part
  // the final |0 converts the unsigned value into a signed value
  return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
};

// do some numerical cast operations
function _castTObyte(a) {
    return _castTOint(a) << 24 >> 24;
}
function _castTOchar(a) {
    return _castTOint(a) & 0xffff;
}
function _castTOint(a) {
    // check various possibilities for a (could be NaN)
    if (a>=0) {   // is a positive number (comparator would fail otherwise)
        if (a>2147483647) return 2147483647
        return Math.floor(a);
    }
    else if (a<=0) { // is a negative number
        if (a<-2147483648) return -2147483648;
        return Math.ceil(a);    
    }
    else {           // is no number at all
        return 0;
    }
}


// create a (possible multidimensional) array with a initialization value for
// all elements.
// the sizes for the dimensions are given as arguments 1 to n, and the 
// initialization value is the last call argument.

function _dim(dimensions,initvalue) {
  return _dimImpl(dimensions,initvalue,0);
}

function _dimImpl(dimensions,initvalue,cursor)
{
  if (cursor>=dimensions.length-1) {
    var len = dimensions[cursor];
    var a = new Array(len);
    for (var i=0; i<len; i++) {
      a[i] = initvalue;
    }
    return a;
  }
  else {
    var len = dimensions[cursor];
    var a = new Array(len);
    for (var i=0; i<len; i++) {
      a[i] = _dimImpl(dimensions,initvalue, cursor+1);
    }
    return a;    
  }
}

// do some patching of the built-in array protoype to allow easy
// integration with other java objects.
// Be aware that this now messes up any optimization possibility for 
// any  for (x in array) loop on the entirety of the program,
// DO NOT USE such a loop!

Array.prototype._isObject = true;
Array.prototype._interfaces = [];

Array.prototype.equals_1 = function (o) {
    return this===o;
};

Array.prototype.toString_0 = function () {
    return "[";
};

Array.prototype.hashCode_0 = function () {
    return 2;
};

// extend the javascript String object by monkey-patching in the necessary
// java methods and attributes

String.prototype._isString = true;
String.prototype._isObject = true;
String.prototype._interfaces = [];

String.prototype.charAt_1 = function(x) {
	return this.charCodeAt(x);
};

String.prototype.compareTo_1 = function (str) {
    var l1 = this.length;
    var l2 = str.length;    
    for (var i=0; i<l1 && i<l2; i++) {
        var c1 = this.charCodeAt(i);
        var c2 = str.charCodeAt(i);
        if (c1!=c2) {
            return c1-c2;
        }
    }
    return l1-l2;
};

String.prototype.concat_1 = function (str) {
  return this.concat(str);
};

String.prototype.endsWith_1 = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.equals_1 = function(str) {
    if (str==null) return false;
    if (!(str._isString)) return false;  
	return this.valueOf() == str.valueOf();
};

String.prototype.hashCode_0 = function() {
    var h = 0;
    for (var i=0; i<this.length; i++) {
       h = (h*31 + this.charCodeAt(i)) & 0xffffffff;
    }
    return h;
};   

String.prototype.indexOf_1 = function(str) {
    if (str===null) {
        return -1;
	} else if (str._isString) {
		return this.indexOf(str);
	} else {
		return this.indexOf(String.fromCharCode(str));
	}
};

String.prototype.indexOf_2 = function(str, x) {
    if (str===null) {
        return -1;
	} else if (str._isString) {
		return this.indexOf(str,x);
	} else {
		return this.indexOf(String.fromCharCode(str),x);
	}
};

String.prototype.isEmpty_0 = function() {
   return this.length_0() === 0;
};   

String.prototype.lastIndexOf_1 = function(str) {
    if (str===null) {
        return -1;
	} else if (str._isString) {
        return this.lastIndexOf(str);
    } else {
        return this.lastIndexOf(String.fromCharCode(str));
    }
};

String.prototype.lastIndexOf_2 = function(str, x) {
    if (str===null) {
        return -1;
	} else if (str._isString) {
        return this.lastIndexOf(str, x);
    } else {
        return this.lastIndexOf(String.fromCharCode(str), x);
    }
};

String.prototype.length_0 = function () {
    return this.length;
};

String.prototype.replace_2 = function (oldChar, newChar) {
	var s = String.fromCharCode(oldChar);
	if (s==".") s="\\."; // avoid confusion with regular expression syntax
	return this.replace(new RegExp(s,"g"),String.fromCharCode(newChar));
};

String.prototype.startsWith_1 = function(prefix) {
    return this.indexOf(prefix) === 0;
};

String.prototype.substring_1 = function(start) {
  return this.substring(start);
};

String.prototype.substring_2 = function(start,end) {
  return this.substring(start,end);
};  

String.prototype.toCharArray_0 = function () {
	var chararray = this.split('');
	var i = 0;
	chararray.forEach(function(entry) {
	    chararray[i] = entry.charCodeAt();
	    i++;
	});
	return chararray;
};

String.prototype.toString_0 = function() {
  return this;
};

String.prototype.trim_0 = function() {
  return this.trim();
};


// Make String object creation easy by providing a dummy string allocator. 
// This object is not used by itself, but only to call one of the constructor
// methods, which will then return the proper string.
var java_lang_String = { 
    $ : function() {}
};
java_lang_String.$.prototype._1 = function(chararray)
{
    return String.fromCharCode.apply(String, chararray);     
};
java_lang_String.$.prototype._3 = function(chararray,offset,count)
{
    return String.fromCharCode.apply(String, chararray.slice(offset,offset+count));
};


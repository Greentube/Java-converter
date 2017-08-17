
// definition of the base class for all java classes
function java_lang_Object()
{
    // no members for allocation of empty object
};

// internal default constructor
java_lang_Object.prototype._0 = function()
{
    return this;
};

// add default member functions
java_lang_Object.prototype.toString_0 = function()
{
  return this._classNameString;
};
java_lang_Object.prototype.equals_1 = function(a)
{
  return this===a;
};
java_lang_Object.prototype.hashCode_0 = function()
{
// there is no real way to access any true object identity, so use a hash of the class name instead
  return this._classNameString.hashCode_0();  
};
// provide the standard javascript means to convert anything to a string
java_lang_Object.prototype.toString = function()
{
  return this.toString_0();
};

// add type detection flag
java_lang_Object.prototype._is_java_lang_Object = true;
java_lang_Object.prototype._classNameString = "java.lang.Object";


// ---- global toolbox functions for classes and arrays ----

// create a new class (that means, its constructor function) and
// copy existing members to the new prototype. 
function _defineClass (classname, base, interfaces, allocator, staticmethodsandfields, instancemethods)
{    
  // copy all static content directly into the allocator function (which also serves as the class object)
  if (staticmethodsandfields) {
      for (var name in staticmethodsandfields) {    
        allocator[name] = staticmethodsandfields[name];
      }      
  }
  
  // connect prototype chain
  allocator.prototype = Object.create(base.prototype);
  allocator.prototype.constructor = allocator;
  
  // add/overwrite methods that are newly defined
  if (instancemethods) {
      for (var name in instancemethods) {      
        allocator.prototype[name] = instancemethods[name];
      }
  }  
  
  // add attributes than can be used to check for class/interface type
  allocator.prototype['_is_'+classname] = true;
  allocator.prototype._classname = classname;
  populateIsInterfaceProperties(interfaces);
  
  // done
  return allocator;
  
  function populateIsInterfaceProperties(interfaces) {    
    for (var index=0; interfaces && index<interfaces.length; index++) {     
        allocator.prototype['_is_' + interfaces[index]._classname] = true;
        populateIsInterfaceProperties(interfaces[index]._superinterfaces);
    }
  }
}

// create a new interface with possible superinterfaces as well
function _defineInterface(classname, superinterfaces, staticmethodsandfields)
{
    // create the 'interface' object 
    var i = {
        _classname: classname,
        _superinterfaces: superinterfaces,
    };
    
    // copy all static content directly into the interface object
    if (staticmethodsandfields) {
        for (var name in staticmethodsandfields) {    
            i[name] = staticmethodsandfields[name];
        }      
    }
    
    // done
    return i;
}


// return the parameter provided, but in case of null, return a 'false' instead.
// this is necessary to avoid runtime errors when checking for type instance
function _denullify(x)
{
    return (x==null) ? false : x;
}

// perform a division like for java integer types
function _divideInteger(a, b) { 
	return (a - a % b) / b; 
} 

// convert a unicode code number to a string with the corresponding letter 
function _c2s(c) {
    return String.fromCharCode(c);
}

// do some numerical cast operations
function _castTObyte(a) {
    var i = _castTOint(a) & 0xff;
    if (i<0x80) return i;
    else        return i-0x100;
}
function _castTOshort(a) {
    var i = _castTOint(a) & 0xffff;
    if (i<0x8000) return i;
    else          return i-0x10000;
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
function _castTOdouble(a) {
    return a;
}


// create a (possible multidimensional) array with a initialization value for
// all elements.
// the sizes for the dimensions are given as arguments 1 to n, and the 
// initialization value is the last call argument.

function _createArray () {
  return _createArrayImpl(arguments,0);
}

function _createArrayImpl(dimensions_and_initializer, cursor)
{
  var dims = dimensions_and_initializer.length - cursor - 1;
  if (dims<1) {
    return null;
  } 
  else if (dims==1) {
    var len = dimensions_and_initializer[cursor];
    var initvalue = dimensions_and_initializer[cursor+1];
    var a = new Array(len);
    for (var i=0; i<len; i++) {
      a[i] = initvalue;
    }
    return a;
  }
  else {
    var len = dimensions_and_initializer[cursor];
    var a = new Array(len);
    for (var i=0; i<len; i++) {
      a[i] = _createArrayImpl(dimensions_and_initializer, cursor+1);
    }
    return a;    
  }
}

// do some patching of the built-in array protoype to allow easy
// integration with other java objects

Array.prototype.equals_1 = function (o) {
    return this===o;
};

Array.prototype.toString_0 = function () {
    return "[";
};

Array.prototype.hashCode_0 = function () {
    return 2;
};

Array.prototype._is_java_lang_Object = true;


// extend the javascript String object by monkey-patching in the necessary
// java methods

String.prototype._is_java_lang_Object = true;
String.prototype._is_java_lang_String = true;



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
    if (!(str._is_java_lang_String)) return false;  
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
	if (str._is_java_lang_String) {
		return this.indexOf(str);
	} else {
		return this.indexOf(String.fromCharCode(str));
	}
};

String.prototype.indexOf_2 = function(str, x) {
	if (str._is_java_lang_String) {
		return this.indexOf(str,x);
	} else {
		return this.indexOf(String.fromCharCode(str),x);
	}
};

String.prototype.isEmpty_0 = function() {
   return this.length_0() === 0;
};   

String.prototype.lastIndexOf_1 = function(str) {
	if (str._is_java_lang_String) {
        return this.lastIndexOf(str);
    } else {
        return this.lastIndexOf(String.fromCharCode(str));
    }
};

String.prototype.lastIndexOf_2 = function(str, x) {
	if (str._is_java_lang_String) {
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
function java_lang_String()
{
};

java_lang_String.prototype._1 = function(chararray)
{
    return String.fromCharCode.apply(String, chararray);     
};
java_lang_String.prototype._3 = function(chararray,offset,count)
{
    return String.fromCharCode.apply(String, chararray.slice(offset,offset+count));
};


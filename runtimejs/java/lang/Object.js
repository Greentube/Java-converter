
//reference// java/lang/String

// definition of the base class for all java classes
function java_lang_Object()
{
    // no members in constructor of empty object
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
  return 1;  // there is no real way to have a identity number 
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
// copy existing members to the new prototype. this keeps the protoyping
// chain flat and maybe also fast.
function _extendClass (base, methods, classname, interfaces)
{  
  // the constructor function which will be used with new 
  var f = function(optionalOuter) 
  {
      // if provided set up the link to the outer object
      if (optionalOuter) { 
            this.outer = optionalOuter;
      }
  }
  
  // connect prototype chain
  f.prototype.__proto__ = base.prototype;
  
  // add/overwrite methods that are newly defined
  if (methods) {
      for (var name in methods) {      
        f.prototype[name] = methods[name];
      }
  }  
  
  // add attributes than can be used to check for class/interface type
  f.prototype['_is_'+classname] = true;
  f.prototype._classNameString = classname.replace(new RegExp("_","g"),".");
  
  populateIsInterfaceProperties(interfaces);

  // create container for the static fields members
  f.s = {};
  
  // done
  return f;
  
  function populateIsInterfaceProperties(interfaces) {    
    for (var index=0; interfaces && index<interfaces.length; index++) {     
        f.prototype['_is_' + interfaces[index].classname] = true;
        populateIsInterfaceProperties(interfaces[index].superinterfaces);
    }
  }
}

// create a new interface with possible superinterfaces as well
function _defineInterface(classname, superinterfaces)
{
    return {
        classname: classname,
        superinterfaces: superinterfaces,
        prototype: {}    // container for all static members
    };
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

// allocation of string objects can not use normal constructor
function _newString() {
  switch(arguments.length) {
  case 1:   // allocate with character array
    return String.fromCharCode.apply(String, arguments[0]);     
  case 3:   // allocate with part of character array
    var o = arguments[1];
    var l = arguments[2];
    return String.fromCharCode.apply(String, arguments[0].slice(o,o+l));
  default: 
    return "";   
  }
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
    return "2";
};

Array.prototype.__defineGetter__('length_f', function() { return this.length; });

Array.prototype._is_java_lang_Object = true;
Array.prototype._is_Array = true;


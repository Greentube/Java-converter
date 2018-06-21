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

Array.prototype.clone_0 = function()
{   var a = this.slice();
    a._t = this._t;
    a._d = this._d;
    return a; 
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

//load// java/lang/Object
var java_lang_StringBuffer = 
{   $: function() 
    {   this._parts = null;
        this._length = 0;
    },
};
_class(java_lang_StringBuffer, java_lang_Object, null, 
"java.lang.StringBuffer"  //replace-me-with-empty-string-for-production//
,{  _0: function() 
    {   this._parts = [];        
        return this;
    },
    
    _1: function(initialvalue) 
    {   this._parts = [initialvalue];        
        this._length = initialvalue.length;
        return this;
    },

    append_1: function(x) 
    {   var s = (x===null) ? "null" : x.toString_0();
        this._length += s.length;
        this._parts.push(s);
        return this;
    },
    
    length_0: function() 
    {   return this._length;
    },
  
    toString_0: function() 
    {   return this._parts.join("");
    },
}); 
 
var org_apache_hadoop_examples_dancing_DancingLinks = 
{
    $: function()
    {
        this.head = null;
        this.columns = null;
    }
    ,
};
_class(org_apache_hadoop_examples_dancing_DancingLinks, java_lang_Object, null,
"org.apache.hadoop.examples.dancing.DancingLinks" //replace-me-with-empty-string-for-production//
,{
    _0: function()
    {
        this.head = (new org_apache_hadoop_examples_dancing_DancingLinks$24$ColumnHeader.$())._2(null,0);
        this.head.left = this.head;
        this.head.right = this.head;
        this.head.up = this.head;
        this.head.down = this.head;
        this.columns = (new java_util_ArrayList.$())._0();
        return this;
    }
    ,
    addColumn_2: function(name,primary)
    {
        var top = (new org_apache_hadoop_examples_dancing_DancingLinks$24$ColumnHeader.$())._2(name,0);
        top.up = top;
        top.down = top;
        if (primary) 
        {
            var tail = this.head.left;
            tail.right = top;
            top.left = tail;
            top.right = this.head;
            this.head.left = top;
        }
        else {
            top.left = top;
            top.right = top;
        }
        this.columns.add_1(top);
    }
    ,
    addColumn_1: function(name)
    {
        this.addColumn_2(name,true);
    }
    ,
    getNumberColumns_0: function()
    {
        return this.columns.size_0();
    }
    ,
    getColumnName_1: function(index)
    {
        return this.columns.get_1(index).name.toString_0();
    }
    ,
    addRow_1: function(values)
    {
        var prev = null;
        for (var i = 0; i < values.length; i=(i +1)|0) 
        {
            if (values[i]) 
            {
                var top = this.columns.get_1(i);
                top.size = (((top.size)+(1))|0);
                var bottom = top.up;
                var node = (new org_apache_hadoop_examples_dancing_DancingLinks$24$Node.$())._5(null,null,bottom,top,top);
                bottom.down = node;
                top.up = node;
                if (prev !== null) 
                {
                    var front = prev.right;
                    node.left = prev;
                    node.right = front;
                    prev.right = node;
                    front.left = node;
                }
                else {
                    node.left = node;
                    node.right = node;
                }
                prev = node;
            }
        }
    }
    ,
    findBestColumn_0: function()
    {
        var lowSize = 2147483647;
        var result = null;
        var current = _checkclass(this.head.right,org_apache_hadoop_examples_dancing_DancingLinks$24$ColumnHeader);
        while (current !== this.head) 
        {
            if (current.size < lowSize) 
            {
                lowSize = current.size;
                result = current;
            }
            current = _checkclass(current.right,org_apache_hadoop_examples_dancing_DancingLinks$24$ColumnHeader);
        }
        return result;
    }
    ,
    coverColumn_1: function(col)
    {
        col.right.left = col.left;
        col.left.right = col.right;
        var row = col.down;
        while (row !== col) 
        {
            var node = row.right;
            while (node !== row) 
            {
                node.down.up = node.up;
                node.up.down = node.down;
                node.head.size = (((node.head.size)-(1))|0);
                node = node.right;
            }
            row = row.down;
        }
    }
    ,
    uncoverColumn_1: function(col)
    {
        var row = col.up;
        while (row !== col) 
        {
            var node = row.left;
            while (node !== row) 
            {
                node.head.size = (((node.head.size)+(1))|0);
                node.down.up = node;
                node.up.down = node;
                node = node.left;
            }
            row = row.up;
        }
        col.right.left = col;
        col.left.right = col;
    }
    ,
    getRowName_1: function(row)
    {
        var result = (new java_util_ArrayList.$())._0();
        result.add_1(row.head.name);
        var node = row.right;
        while (node !== row) 
        {
            result.add_1(node.head.name);
            node = node.right;
        }
        return result;
    }
    ,
    search_2: function(partial,output)
    {
        var results = 0;
        if (this.head.right === this.head) 
        {
            var result = (new java_util_ArrayList.$())._0();
            for (var row, row_i=partial.iterator_0(); row_i.hasNext_0()&&((row=row_i.next_0())||true);)
            {
                result.add_1(this.getRowName_1(row));
            }

            output.solution_1(result);
            results = (((results)+(1))|0);
        }
        else {
            var col = this.findBestColumn_0();
            if (col.size > 0) 
            {
                this.coverColumn_1(col);
                var row = col.down;
                while (row !== col) 
                {
                    partial.add_1(row);
                    var node = row.right;
                    while (node !== row) 
                    {
                        this.coverColumn_1(node.head);
                        node = node.right;
                    }
                    results = (((results)+(this.search_2(partial,output)))|0);
                    partial.remove_1(((partial.size_0() - 1)|0));
                    node = row.left;
                    while (node !== row) 
                    {
                        this.uncoverColumn_1(node.head);
                        node = node.left;
                    }
                    row = row.down;
                }
                this.uncoverColumn_1(col);
            }
        }
        return results;
    }
    ,
    searchPrefixes_3: function(depth,choices,prefixes)
    {
        if (depth === 0) 
        {
            prefixes.add_1(choices.clone_0());
        }
        else {
            var col = this.findBestColumn_0();
            if (col.size > 0) 
            {
                this.coverColumn_1(col);
                var row = col.down;
                var rowId = 0;
                while (row !== col) 
                {
                    var node = row.right;
                    while (node !== row) 
                    {
                        this.coverColumn_1(node.head);
                        node = node.right;
                    }
                    choices[((choices.length - depth)|0)] = rowId;
                    this.searchPrefixes_3(((depth - 1)|0),choices,prefixes);
                    node = row.left;
                    while (node !== row) 
                    {
                        this.uncoverColumn_1(node.head);
                        node = node.left;
                    }
                    row = row.down;
                    rowId = (((rowId)+(1))|0);
                }
                this.uncoverColumn_1(col);
            }
        }
    }
    ,
    split_1: function(depth)
    {
        var choices = _dim("I",1,[depth,],0);
        var result = (new java_util_ArrayList.$())._0();
        this.searchPrefixes_3(depth,choices,result);
        return result;
    }
    ,
    advance_1: function(goalRow)
    {
        var col = this.findBestColumn_0();
        if (col.size > 0) 
        {
            this.coverColumn_1(col);
            var row = col.down;
            var id = 0;
            while (row !== col) 
            {
                if (id === goalRow) 
                {
                    var node = row.right;
                    while (node !== row) 
                    {
                        this.coverColumn_1(node.head);
                        node = node.right;
                    }
                    return row;
                }
                id = (((id)+(1))|0);
                row = row.down;
            }
        }
        return null;
    }
    ,
    rollback_1: function(row)
    {
        var node = row.left;
        while (node !== row) 
        {
            this.uncoverColumn_1(node.head);
            node = node.left;
        }
        this.uncoverColumn_1(row.head);
    }
    ,
    solve_2: function(prefix,output)
    {
        var choices = (new java_util_ArrayList.$())._0();
        for (var i = 0; i < prefix.length; i=(i +1)|0) 
        {
            choices.add_1(this.advance_1(prefix[i]));
        }
        var result = this.search_2(choices,output);
        for (var i = ((prefix.length - 1)|0); i >= 0; i=(i -1)|0) 
        {
            this.rollback_1(choices.get_1(i));
        }
        return result;
    }
    ,
    solve_1: function(output)
    {
        return this.search_2((new java_util_ArrayList.$())._0(),output);
    }
    ,
});
//reference// org/apache/hadoop/examples/dancing/DancingLinks$ColumnHeader
//reference// java/util/ArrayList
//reference// org/apache/hadoop/examples/dancing/DancingLinks$Node
//load// java/lang/Object
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
var org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory = 
{
    $: function()
    {
        java_lang_Enum.$.call(this);
    }
    ,
    values_0 : function()
    {
        return [
            org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.UPPER__LEFT,
            org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.MID__X,
            org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.MID__Y,
            org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.CENTER,
        ];
    }
    ,
    valueOf_1 : function(n)
    {
        switch(n)
        {
            case "UPPER_LEFT": return org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.UPPER__LEFT;
            case "MID_X": return org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.MID__X;
            case "MID_Y": return org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.MID__Y;
            case "CENTER": return org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.CENTER;
            default: throw (new java_lang_IllegalArgumentException.$())._0()._e;
        }
    },
};
_class(org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory, java_lang_Enum, null,
"org.apache.hadoop.examples.dancing.Pentomino.SolutionCategory" //replace-me-with-empty-string-for-production//
,{
});
org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.UPPER__LEFT = new org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.$()._2("UPPER_LEFT",0);
org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.MID__X = new org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.$()._2("MID_X",1);
org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.MID__Y = new org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.$()._2("MID_Y",2);
org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.CENTER = new org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.$()._2("CENTER",3);
//load// java/lang/Enum
var org_apache_hadoop_examples_dancing_Pentomino$24$ColumnName =
{ 
    _superinterfaces: [],
};
var org_apache_hadoop_examples_dancing_Pentomino$24$Piece = 
{
    $: function()
    {
        this.name = null;
        this.shape = null;
        this.rotations = null;
        this.flippable = false;
    }
    ,
};
_class(org_apache_hadoop_examples_dancing_Pentomino$24$Piece, java_lang_Object, [org_apache_hadoop_examples_dancing_Pentomino$24$ColumnName],
"org.apache.hadoop.examples.dancing.Pentomino.Piece" //replace-me-with-empty-string-for-production//
,{
    _4: function(name,shape,flippable,rotations)
    {
        this.name = name;
        this.rotations = rotations;
        this.flippable = flippable;
        var parser = shape.split_1("/");
        var lines = (new java_util_ArrayList.$())._0();
        for (var l = 0; l < parser.length; l=(l +1)|0) 
        {
            var token = parser[l];
            var line = _dim("Z",1,[token.length_0(),],false);
            for (var i = 0; i < line.length; i=(i +1)|0) 
            {
                line[i] = token.charAt_1(i) === 120;
            }
            lines.add_1(line);
        }
        this.shape = _dim("Z",2,[lines.size_0(),],null);
        for (var i = 0; i < lines.size_0(); i=(i +1)|0) 
        {
            this.shape[i] = _checkarray(lines.get_1(i),"Z",1);
        }
        return this;
    }
    ,
    getName_0: function()
    {
        return this.name;
    }
    ,
    getRotations_0: function()
    {
        return this.rotations;
    }
    ,
    getFlippable_0: function()
    {
        return this.flippable;
    }
    ,
    doFlip_3: function(flip,x,max)
    {
        if (flip) 
        {
            return ((((max - x)|0) - 1)|0);
        }
        else {
            return x;
        }
    }
    ,
    getShape_2: function(flip,rotate)
    {
        var result = null;
        if (rotate % 2 === 0) 
        {
            var height = this.shape.length;
            var width = this.shape[0].length;
            result = _dim("Z",2,[height,],null);
            var flipX = rotate === 2;
            var flipY = flip ^ (rotate === 2);
            for (var y = 0; y < height; y=(y +1)|0) 
            {
                result[y] = _dim("Z",1,[width,],false);
                for (var x = 0; x < width; x=(x +1)|0) 
                {
                    result[y][x] = this.shape[this.doFlip_3(flipY,y,height)][this.doFlip_3(flipX,x,width)];
                }
            }
        }
        else {
            var height = this.shape[0].length;
            var width = this.shape.length;
            result = _dim("Z",2,[height,],null);
            var flipX = rotate === 3;
            var flipY = flip ^ (rotate === 1);
            for (var y = 0; y < height; y=(y +1)|0) 
            {
                result[y] = _dim("Z",1,[width,],false);
                for (var x = 0; x < width; x=(x +1)|0) 
                {
                    result[y][x] = this.shape[this.doFlip_3(flipX,x,width)][this.doFlip_3(flipY,y,height)];
                }
            }
        }
        return result;
    }
    ,
});
//reference// java/util/ArrayList
//load// java/lang/Object
//load// org/apache/hadoop/examples/dancing/Pentomino$ColumnName
var org_apache_hadoop_examples_dancing_Pentomino$24$Point = 
{
    $: function()
    {
        this.x = 0;
        this.y = 0;
    }
    ,
};
_class(org_apache_hadoop_examples_dancing_Pentomino$24$Point, java_lang_Object, [org_apache_hadoop_examples_dancing_Pentomino$24$ColumnName],
"org.apache.hadoop.examples.dancing.Pentomino.Point" //replace-me-with-empty-string-for-production//
,{
    _2: function(x,y)
    {
        this.x = x;
        this.y = y;
        return this;
    }
    ,
});
//load// java/lang/Object
//load// org/apache/hadoop/examples/dancing/Pentomino$ColumnName
var org_apache_hadoop_examples_dancing_DancingLinks$24$SolutionAcceptor =
{ 
    _superinterfaces: [],
};
var org_apache_hadoop_examples_dancing_Pentomino$24$SolutionPrinter = 
{
    $: function()
    {
        this.width = 0;
        this.height = 0;
    }
    ,
};
_class(org_apache_hadoop_examples_dancing_Pentomino$24$SolutionPrinter, java_lang_Object, [org_apache_hadoop_examples_dancing_DancingLinks$24$SolutionAcceptor],
"org.apache.hadoop.examples.dancing.Pentomino.SolutionPrinter" //replace-me-with-empty-string-for-production//
,{
    _2: function(width,height)
    {
        this.width = width;
        this.height = height;
        return this;
    }
    ,
    solution_1: function(names)
    {
        java_lang_System.out.println_1(org_apache_hadoop_examples_dancing_Pentomino.stringifySolution_3(this.width,this.height,names));
    }
    ,
});
//reference// org/apache/hadoop/examples/dancing/Pentomino
//reference// java/lang/System
//load// java/lang/Object
//load// org/apache/hadoop/examples/dancing/DancingLinks$SolutionAcceptor

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
var org_apache_hadoop_examples_dancing_DancingLinks$24$Node = 
{
    $: function()
    {
        this.left = null;
        this.right = null;
        this.up = null;
        this.down = null;
        this.head = null;
    }
    ,
};
_class(org_apache_hadoop_examples_dancing_DancingLinks$24$Node, java_lang_Object, null,
"org.apache.hadoop.examples.dancing.DancingLinks.Node" //replace-me-with-empty-string-for-production//
,{
    _5: function(l,r,u,d,h)
    {
        this.left = l;
        this.right = r;
        this.up = u;
        this.down = d;
        this.head = h;
        return this;
    }
    ,
    _0: function()
    {
        org_apache_hadoop_examples_dancing_DancingLinks$24$Node.$.prototype._5.call(this,null,null,null,null,null);
        return this;
    }
    ,
});
//reference// org/apache/hadoop/examples/dancing/DancingLinks$Node
//load// java/lang/Object
var org_apache_hadoop_examples_dancing_DancingLinks$24$ColumnHeader = 
{
    $: function()
    {
        org_apache_hadoop_examples_dancing_DancingLinks$24$Node.$.call(this);
        this.name = null;
        this.size = 0;
    }
    ,
};
_class(org_apache_hadoop_examples_dancing_DancingLinks$24$ColumnHeader, org_apache_hadoop_examples_dancing_DancingLinks$24$Node, null,
"org.apache.hadoop.examples.dancing.DancingLinks.ColumnHeader" //replace-me-with-empty-string-for-production//
,{
    _2: function(n,s)
    {
        org_apache_hadoop_examples_dancing_DancingLinks$24$Node.$.prototype._0.call(this);
        this.name = n;
        this.size = s;
        this.head = this;
        return this;
    }
    ,
    _0: function()
    {
        org_apache_hadoop_examples_dancing_DancingLinks$24$ColumnHeader.$.prototype._2.call(this,null,0);
        return this;
    }
    ,
});
//reference// org/apache/hadoop/examples/dancing/DancingLinks$ColumnHeader
//load// org/apache/hadoop/examples/dancing/DancingLinks$Node
//reference// java/lang/UnsupportedOperationException
//load// java/lang/Object
var java_util_Iterator = { 
    _superinterfaces: [], 
    _defaults: {
        remove_0: function() 
        {   throw (new java_lang_UnsupportedOperationException.$())._0()._e;
        }
    }
}; 

// -- methods:
// boolean	hasNext()
// E	next()
// void remove();
//load// java/lang/Object
var java_util_Enumeration = { _superinterfaces: [] }; 

// -- methods:
// boolean	hasMoreElements()
// E	nextElement()

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
//load// java/lang/RuntimeException
var java_lang_IllegalStateException = 
{   $: function() 
    {   java_lang_RuntimeException.$.call(this);
    },
};
_class (java_lang_IllegalStateException, java_lang_RuntimeException, null, 
"java.lang.IllegalStateException"  
, {});
//load// java/lang/RuntimeException
var java_util_NoSuchElementException = 
{   $: function() 
    {   java_lang_RuntimeException.$.call(this);
    },
};
_class (java_util_NoSuchElementException, java_lang_RuntimeException, null, 
"java.util.NoSuchElementException"  
, {});
//load// java/lang/RuntimeException
var java_lang_UnsupportedOperationException = 
{   $: function() 
    {   java_lang_RuntimeException.$.call(this);
    },
};
_class (java_lang_UnsupportedOperationException, java_lang_RuntimeException, null, 
"java.lang.UnsupportedOperationException"  
, {});
//load// java/lang/Object
var java_lang_Iterable = 
{   _superinterfaces: [], 
    _defaults:
    {   forEach_1: function(consumer)
        {   var i = this.iterator_0();
            while (i.hasNext_0()) 
            {   consumer.accept_1(i.next_0());
            }
        }
        ,
    }
}; 

// methods:
// Iterator<T> iterator()
// default void forEach(Consumer<T> consumer)
//load// java/lang/Iterable
var java_util_Collection = { 
    _superinterfaces: [java_lang_Iterable], 
    _defaults:
    {   removeIf_1: function(predicate)
        {   var i = this.iterator_0();
            while (i.hasNext_0()) 
            {   var o = i.next_0();
                if (predicate.test_1(o)) i.remove_0();
            }
        }
        ,
    }

}; 

// -- methods:
// boolean	contains(Object o)
// boolean	containsAll(Collection<?> c)
// boolean	equals(Object o)
// int	hashCode()
// boolean	isEmpty()
// Iterator<E>	iterator()
// int	size()
// Object[]	toArray()
// String toString()
//load// java/util/Collection
var java_util_List = { 
    _superinterfaces: [java_util_Collection] ,
    _defaults: {
        sort_1: function(comparator) 
        {   var a = this.toArray_0();
            var l = a.length;
            java_util_Arrays.sort_4(a,0,l,comparator);
            for (var i=0; i<l; i++) 
            {   this.set_2(i,a[i]);
            }
        }
        ,
        replaceAll_1: function(unaryoperator) 
        {   var s = this.size_0();
            for (var i=0; i<s; i++)
            {   this.set_2(i, unaryoperator.apply_1(this.get_1(i)));
            }
        }
    }
}; 

// -- methods:
// boolean add(E e)                        
// void add(int index, E element)
// boolean	addAll(Collection<? extends E> c)
// boolean	addAll(int index, Collection<? extends E> c)
// void	clear()
// boolean	contains(Object o)                         // inherited from Collection
// boolean	containsAll(Collection<?> c)               // inherited from Collection
// boolean	equals(Object o)                           // inherited from Collection
// E get(int index)
// int	hashCode()                                     // inherited from Collection
// int	indexOf(Object o)
// boolean	isEmpty()                                  // inherited from Collection
// Iterator<E>	iterator()                             // inherited from Collection
// int	lastIndexOf(Object o)
// E remove(int index)
// boolean	removeAll(Collection<?> c)
// boolean	retainAll(Collection<?> c)
// E	set(int index, E element)
// int	size()                                         // inherited from Collection
// Object[]	toArray()                                  // inherited from Collection
// Object[]	toArray(Object[] template)                 // inherited from Collection
// String	toString()                                 // inherited from Collection
// Contains some common accessor methods that are usable in all Collections
// All this methods here are implemented by just using the iterator that
// is provided by all Collections. This is of course very inefficient and
// should be overwritten by a better implementation where possible.

//load// java/lang/Object
//load// java/util/Collection
//reference// java/util/Iterator
var java_util_AbstractCollection = 
{   $: function() 
    {
    },   
};
_class(java_util_AbstractCollection, java_lang_Object, [java_util_Collection], 
"java.util.AbstractCollection"  //replace-me-with-empty-string-for-production//
,{   
    contains_1: function(obj) 
    {   var i = this.iterator_0();
        while (i.hasNext_0()) 
        {   var o = i.next_0();
            if (obj===null ? o===null : obj.equals_1(o)) return true;
        }
        return false;
    },
    
    containsAll_1: function(collection) 
    {   var i = collection.iterator_0();
        while (i.hasNext_0()) 
        {   if (!this.contains_1(i.next_0())) return false;
        }
        return true;
    }, 
        
    // equals_1     // default object behaviour
    // hashCode_0   // default object behaviour

    isEmpty_0: function () 
    {   return this.size_0()<=0;
    },
    
    //iterator        abstract - must be implemented by subclass
    //size            abstract - must be implemented by subclass

    toArray_0: function () 
    {   var a = [];
        for (var i=this.iterator_0(); i.hasNext_0(); ) 
        {   a.push(i.next_0());
        }
        return _arr(java_lang_Object,1,a);        
    },
          
    toArray_1: function (ta) 
    {   var a = [];
        for (var i=this.iterator_0(); i.hasNext_0(); ) 
        {   a.push(i.next_0());
        }
        return _arr(ta._t,ta._d,a);        
    },
    
    toString_0: function() 
    {   var parts = [];	 
        parts.push("[");
        for (var i=this.iterator_0(); i.hasNext_0(); ) 
        {   if (parts.length>1) 
            {   parts.push(", ");
            }       
            var o = i.next_0();
            parts.push((o===null) ? 'null' : o.toString_0());
        }
        parts.push("]");
        return parts.join("");    
    },    
}); 
//reference// java/lang/IllegalStateException
//reference// java/util/NoSuchElementException
//load// java/util/Iterator
//load// java/util/Enumeration
//load// java/util/List
//load// java/util/AbstractCollection
var java_util_AbstractList = 
{   $: function() 
    {
    },
};
_class(java_util_AbstractList, java_util_AbstractCollection, [java_util_List], 
"java.util.AbstractList"  //replace-me-with-empty-string-for-production//
,{   // must be implemented by a modifiable subclass
    // public abstract System.Object get(int index);
    // public abstract System.Object set(int index, System.Object element);        
    // public abstract void add(int index, System.Object element);
    // public abstract System.Object remove(int index);        
    // int size() 
    
    add_1: function (obj) 
    {   this.add_2(this.size_0(), obj);
        return true;
    },   
   
    addAll_1: function(collection) 
    {   var i = collection.iterator_0();
        var didappend = false;
        while (i.hasNext_0()) 
        {   this.add_1(i.next_0());
            didappend = true;
        }
        return didappend;
    },
    
    addAll_2: function(index, collection) 
    {   var i = collection.iterator_0();
        var pos = index;
        var didappend = false;
        while (i.hasNext_0()) {
            this.add_2(pos++, i.next_0());
            didappend = true;
        }        
        return didappend;
    },          
    
	clear_0: function() 
    {   for (var i=this.size_0()-1; i>=0; i--) 
        {   this.remove_1(i);
        }
	},      
    
    //contains       implemented by AbstractCollection
    //containsAll    implemented by AbstractCollection

    equals_1: function(o) 
    {   var s = this.size_0();
        if (o===null || !_isinterface(o,java_util_Collection) || s!==o.size_0()) 
        {   return false;
        }
        for (var it1=this.iterator_0(), it2=o.iterator_0(); it1.hasNext_0(); ) 
        {   var e1 = it1.next_0();
            var e2 = it2.next_0();
            if (! (e1===null ? e2===null : e1.equals_1(e2))) return false;
        }
        return true;  
    },
    
    hashCode_0: function() 
    {   var hashCode = 1;
        for (var it=this.iterator_0(); it.hasNext_0(); ) 
        {   var e = it.next_0();
            hashCode = ( 31*hashCode + (e===null ? 0 : e.hashCode_0()) ) | 0;
        }
        return hashCode;
    },       
    
    indexOf_1: function (o) 
    {   var s = this.size_0();
        for (var i=0; i<s; i++) 
        {   if (o===null ? (this.get_1(i)===null) : o.equals_1(this.get_1(i))) return i;
        }
        return -1;
    },

    iterator_0: function() 
    {   return new java_util_AbstractListIterator.$(this);
    },
   
    lastIndexOf_1: function (o) 
    {   for (var i=this.size_0()-1; i>=0; i--) 
        {   if (o===null ? (this.get_1(i)===null) : o.equals_1(this.get_1(i))) return i;
        }
        return -1;
    },
 
    removeAll_1: function (collection) 
    {   if (collection===null) throw _NullPointerException();
        return this._filter(collection,false);
    },
    
    retainAll_1: function (collection) 
    {   if (collection===null) throw _NullPointerException();
        return this._filter(collection,true);
    },
    
    _filter: function(collection, keep) 
    {      
        var modified=false;
        for (var i=this.size_0()-1; i>=0; i--) 
        {   var o = this.get_1(i);
            var c = collection.contains_1(o);
            if ((c && !keep) || (!c && keep)) 
            {   this.remove_1(i);
                modified = true;
            }
        }
        return modified;
    },
        
    // toString_0      implemented by AbstractCollection  	           
}); 


var java_util_AbstractListIterator = 
{   $: function(list)   // internal use only - merge allocator with constructor
    {   this.list = list;
        this.n = 0;
    },
};
_class(java_util_AbstractListIterator, java_lang_Object,  [java_util_Iterator, java_util_Enumeration], 
"java.util.AbstractListIterator"  //replace-me-with-empty-string-for-production//
,{    
    hasNext_0: function() 
    {   return this.n < this.list.size_0();
    },
    
    next_0: function() 
    {   if (this.n>=this.list.size_0())
        {   throw (new java_util_NoSuchElementException.$())._0()._e;
        }
        var v = this.list.get_1(this.n);  
        this.n++;
        return v;
    },

    remove_0: function() 
    {   
        var before = this.n-1;
        if (before<0) throw (new java_lang_IllegalStateException.$())._0()._e;
        this.list.remove_1(before);  // will throw if unsupported
        this.n = before;
    },

    hasMoreElements_0: function() 
    {   return this.hasNext_0();
    },  
    
    nextElement_0: function() 
    {   return this.next_0();
    },    
}); 
//load// java/util/AbstractList
var java_util_ArrayListImpl = 
{   $: function() 
    {   this._storage = null;
    },
};
_class(java_util_ArrayListImpl, java_util_AbstractList, null, 
"java.util.ArrayListImpl"  //replace-me-with-empty-string-for-production//
, 
{   _0: function() 
    {   this._storage = [];
        return this;
    },
    
    _1: function(collection) 
    {   this._0();
        this.addAll_1(collection);  // will throw if null
        return this;
    },
  
    get_1: function(index) 
    {   if (index<0 || index>=this._storage.length) throw _IndexOutOfBoundsException();
        return this._storage[index];	
    },
    
    set_2: function(index, obj) 
    {   if (index<0 || index>=this._storage.length) throw _IndexOutOfBoundsException();
        this._storage[index] = obj;
    },
    
    add_2: function(index, obj) 
    {   var s = this._storage;
        if(index===s.length) 
        {   s.push(obj);
        } 
        else if (index===0) 
        {   s.unshift(obj);
        } 
        else if (index>0 && index<s.length)
        {   s.splice (index,0, obj);
        }
        else
        {   throw new RangeError("IndexOutOfBoundsException");
        }
    },

    remove_1: function (idx) 
    {   var s = this._storage;
        if (idx<0 || idx>=s.length) throw _IndexOutOfBoundsException();
        var obj = this._storage[idx];
        if (idx===0) 
        {   this._storage.shift();
        }
        else if (idx===s.length-1)
        {   this._storage.pop();
        }
        else 
        {   this._storage.splice(idx,1);
        }
        return obj;                    
    },

    size_0: function()
    {   return this._storage.length;
    },
    
    trimToSize_0: function() 
    {   // no operation. the underlying array is always trimmed.
    },
    
    // optimized operations
    add_1: function(obj) 
    {   this._storage.push(obj);
        return true;
    },
    
    clear_0: function() 
    {   this._storage.length = 0;
    },      
    
    toArray_0: function () 
    {   return _arr(java_lang_Object, 1, this._storage.slice());
    },    
    
    toArray_1: function (a) 
    {   return _arr(a._t, a._d, this._storage.slice());
    },    
}); 
//load// java/util/ArrayListImpl
var java_util_ArrayList = 
{   $: function() 
    {   java_util_ArrayListImpl.$.call(this);
    },
};
_class(java_util_ArrayList, java_util_ArrayListImpl, null, 
"java.util.ArrayList"  //replace-me-with-empty-string-for-production//
, 
{
});
var org_apache_hadoop_examples_dancing_Pentomino = 
{
    $: function()
    {
        this.width = 0;
        this.height = 0;
        this.pieces = null;
        this.dancer = null;
        this.printer = null;
    }
    ,
    stringifySolution_3: function(width,height,solution)
    {
        var picture = _dim(java_lang_String,2,[height,width,],null);
        var result = (new java_lang_StringBuffer.$())._0();
        for (var row, row_i=solution.iterator_0(); row_i.hasNext_0()&&((row=row_i.next_0())||true);)
        {
            var piece = null;
            for (var item, item_i=row.iterator_0(); item_i.hasNext_0()&&((item=item_i.next_0())||true);)
            {
                if ((item instanceof org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$)) 
                {
                    piece = _checkclass(item,org_apache_hadoop_examples_dancing_Pentomino$24$Piece);
                    break;
                }
            }

            for (var item, item_i=row.iterator_0(); item_i.hasNext_0()&&((item=item_i.next_0())||true);)
            {
                if ((item instanceof org_apache_hadoop_examples_dancing_Pentomino$24$Point.$)) 
                {
                    var p = _checkclass(item,org_apache_hadoop_examples_dancing_Pentomino$24$Point);
                    picture[p.y][p.x] = piece.getName_0();
                }
            }

        }

        for (var y = 0; y < picture.length; y=(y +1)|0) 
        {
            for (var x = 0; x < picture[y].length; x=(x +1)|0) 
            {
                result.append_1(picture[y][x]);
            }
            result.append_1("\n");
        }
        return result.toString_0();
    }
    ,
    oneRotation: null,
    twoRotations: null,
    fourRotations: null,
    isSide_3: function(offset,shapeSize,board)
    {
        return ((((2 * offset)|0) + shapeSize)|0) <= board;
    }
    ,
    generateRows_7: function(dancer,piece,width,height,flip,row,upperLeft)
    {
        var rotations = piece.getRotations_0();
        for (var rotIndex = 0; rotIndex < rotations.length; rotIndex=(rotIndex +1)|0) 
        {
            var shape = piece.getShape_2(flip,rotations[rotIndex]);
            for (var x = 0; x < width; x=(x +1)|0) 
            {
                for (var y = 0; y < height; y=(y +1)|0) 
                {
                    if (((y + shape.length)|0) <= height && ((x + shape[0].length)|0) <= width && ( ! upperLeft || (org_apache_hadoop_examples_dancing_Pentomino.isSide_3(x,shape[0].length,width) && org_apache_hadoop_examples_dancing_Pentomino.isSide_3(y,shape.length,height)))) 
                    {
                        for (var idx = 0; idx < _imul(width, height); idx=(idx +1)|0) 
                        {
                            row[idx] = false;
                        }
                        for (var subY = 0; subY < shape.length; subY=(subY +1)|0) 
                        {
                            for (var subX = 0; subX < shape[0].length; subX=(subX +1)|0) 
                            {
                                row[((((_imul((((y + subY)|0)), width) + x)|0) + subX)|0)] = shape[subY][subX];
                            }
                        }
                        dancer.addRow_1(row);
                    }
                }
            }
        }
    }
    ,
    main_1: function(args)
    {
        var width = 6;
        var height = 10;
        var model = (new org_apache_hadoop_examples_dancing_Pentomino.$())._2(width,height);
        var splits = model.getSplits_1(2);
        for (var splitItr = splits.iterator_0(); splitItr.hasNext_0(); ) 
        {
            var choices = _checkarray(splitItr.next_0(),"I",1);
            java_lang_System.out.print_1("split:");
            for (var i = 0; i < choices.length; i=(i +1)|0) 
            {
                java_lang_System.out.print_1(" "+""+choices[i]);
            }
            java_lang_System.out.println_0();
            java_lang_System.out.println_1(model.solve_1(choices)+""+" solutions found.");
        }
    }
    ,
};
_class(org_apache_hadoop_examples_dancing_Pentomino, java_lang_Object, null,
"org.apache.hadoop.examples.dancing.Pentomino" //replace-me-with-empty-string-for-production//
,{
    getCategory_1: function(names)
    {
        var xPiece = null;
        for (var p, p_i=this.pieces.iterator_0(); p_i.hasNext_0()&&((p=p_i.next_0())||true);)
        {
            if ("x".equals_1(p.name)) 
            {
                xPiece = p;
                break;
            }
        }

        for (var row, row_i=names.iterator_0(); row_i.hasNext_0()&&((row=row_i.next_0())||true);)
        {
            if (row.contains_1(xPiece)) 
            {
                var low__x = this.width;
                var high__x = 0;
                var low__y = this.height;
                var high__y = 0;
                for (var col, col_i=row.iterator_0(); col_i.hasNext_0()&&((col=col_i.next_0())||true);)
                {
                    if ((col instanceof org_apache_hadoop_examples_dancing_Pentomino$24$Point.$)) 
                    {
                        var x = (_checkclass(col,org_apache_hadoop_examples_dancing_Pentomino$24$Point)).x;
                        var y = (_checkclass(col,org_apache_hadoop_examples_dancing_Pentomino$24$Point)).y;
                        if (x < low__x) 
                        {
                            low__x = x;
                        }
                        if (x > high__x) 
                        {
                            high__x = x;
                        }
                        if (y < low__y) 
                        {
                            low__y = y;
                        }
                        if (y > high__y) 
                        {
                            high__y = y;
                        }
                    }
                }

                var mid__x = (((low__x + high__x)|0) === ((this.width - 1)|0));
                var mid__y = (((low__y + high__y)|0) === ((this.height - 1)|0));
                if (mid__x && mid__y) 
                {
                    return org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.CENTER;
                }
                else if (mid__x) 
                {
                    return org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.MID__X;
                }
                else if (mid__y) 
                {
                    return org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.MID__Y;
                }
                break;
            }
        }

        return org_apache_hadoop_examples_dancing_Pentomino$24$SolutionCategory.UPPER__LEFT;
    }
    ,
    initializePieces_0: function()
    {
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("x"," x /xxx/ x ",false,org_apache_hadoop_examples_dancing_Pentomino.oneRotation));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("v","x  /x  /xxx",false,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("t","xxx/ x / x ",false,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("w","  x/ xx/xx ",false,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("u","x x/xxx",false,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("i","xxxxx",false,org_apache_hadoop_examples_dancing_Pentomino.twoRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("f"," xx/xx / x ",true,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("p","xx/xx/x ",true,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("z","xx / x / xx",true,org_apache_hadoop_examples_dancing_Pentomino.twoRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("n","xx  / xxx",true,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("y","  x /xxxx",true,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
        this.pieces.add_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Piece.$())._4("l","   x/xxxx",true,org_apache_hadoop_examples_dancing_Pentomino.fourRotations));
    }
    ,
    _2: function(width,height)
    {
        this.pieces = (new java_util_ArrayList.$())._0();
        this.dancer = (new org_apache_hadoop_examples_dancing_DancingLinks.$())._0();
        {
            this.initializePieces_0();
        }
        this.initialize_2(width,height);
        return this;
    }
    ,
    _0: function()
    {
        this.pieces = (new java_util_ArrayList.$())._0();
        this.dancer = (new org_apache_hadoop_examples_dancing_DancingLinks.$())._0();
        {
            this.initializePieces_0();
        }
        return this;
    }
    ,
    initialize_2: function(width,height)
    {
        this.width = width;
        this.height = height;
        for (var y = 0; y < height; y=(y +1)|0) 
        {
            for (var x = 0; x < width; x=(x +1)|0) 
            {
                this.dancer.addColumn_1((new org_apache_hadoop_examples_dancing_Pentomino$24$Point.$())._2(x,y));
            }
        }
        var pieceBase = this.dancer.getNumberColumns_0();
        for (var p, p_i=this.pieces.iterator_0(); p_i.hasNext_0()&&((p=p_i.next_0())||true);)
        {
            this.dancer.addColumn_1(p);
        }

        var row = _dim("Z",1,[this.dancer.getNumberColumns_0(),],false);
        for (var idx = 0; idx < this.pieces.size_0(); idx=(idx +1)|0) 
        {
            var piece = _checkclass(this.pieces.get_1(idx),org_apache_hadoop_examples_dancing_Pentomino$24$Piece);
            row[((idx + pieceBase)|0)] = true;
            org_apache_hadoop_examples_dancing_Pentomino.generateRows_7(this.dancer,piece,width,height,false,row,idx === 0);
            if (piece.getFlippable_0()) 
            {
                org_apache_hadoop_examples_dancing_Pentomino.generateRows_7(this.dancer,piece,width,height,true,row,idx === 0);
            }
            row[((idx + pieceBase)|0)] = false;
        }
        this.printer = (new org_apache_hadoop_examples_dancing_Pentomino$24$SolutionPrinter.$())._2(width,height);
    }
    ,
    getSplits_1: function(depth)
    {
        return this.dancer.split_1(depth);
    }
    ,
    solve_1: function(split)
    {
        return this.dancer.solve_2(split,this.printer);
    }
    ,
    solve_0: function()
    {
        return this.dancer.solve_1(this.printer);
    }
    ,
    setPrinter_1: function(printer)
    {
        this.printer = printer;
    }
    ,
});
org_apache_hadoop_examples_dancing_Pentomino.oneRotation = _arr("I",1,[0]);
org_apache_hadoop_examples_dancing_Pentomino.twoRotations = _arr("I",1,[0,1]);
org_apache_hadoop_examples_dancing_Pentomino.fourRotations = _arr("I",1,[0,1,2,3]);
//reference// org/apache/hadoop/examples/dancing/Pentomino$SolutionCategory
//reference// org/apache/hadoop/examples/dancing/Pentomino$Piece
//reference// org/apache/hadoop/examples/dancing/Pentomino$SolutionPrinter
//reference// org/apache/hadoop/examples/dancing/Pentomino
//reference// java/lang/StringBuffer
//reference// org/apache/hadoop/examples/dancing/Pentomino$Point
//reference// java/lang/System
//load// java/lang/Object
//complete// org/apache/hadoop/examples/dancing/DancingLinks
//complete// java/util/ArrayList

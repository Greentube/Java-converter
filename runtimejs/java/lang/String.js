
//load// java/lang/Object

// extend the javascript String object by monkey-patching in the necessary
// java methods

String.prototype._is_java_lang_Object = true;
String.prototype._is_java_lang_String = true;



String.prototype.charAt_1 = function(x) {
	return this.charCodeAt(x);
};

String.prototype.compareTo_1 = function (str) {
    return this < str ? -1 : this > str ? 1 : 0;
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



//load// java/lang/Object
var java_lang_System = _extendClass( java_lang_Object, {
  
  arraycopy_5: function(src, srcPos, dest, destPos, length) {
    if (destPos<=srcPos) {
      for (var i = 0; i < length; i++) {
        dest[i + destPos] = src[i + srcPos];
      }
    } else {
      for (var i = length-1; i >=0; i--) {
        dest[i + destPos] = src[i + srcPos];
      }
    }
  },
  
}, "java_lang_System", []);

//complete// java/io/PrintStream
java_lang_System.prototype.out_f = (new java_io_PrintStream()).initialConstructor_1(false);
java_lang_System.prototype.err_f = (new java_io_PrintStream()).initialConstructor_1(true);

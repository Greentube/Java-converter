//complete// java/io/PrintStream
//load// java/lang/Object
var java_lang_System = _extendClass( java_lang_Object, {}, "java_lang_System", []);

java_lang_System.s.arraycopy_5 = function(src, srcPos, dest, destPos, length) {
    if (destPos<=srcPos) {
      for (var i = 0; i < length; i++) {
        dest[i + destPos] = src[i + srcPos];
      }
    } else {
      for (var i = length-1; i >=0; i--) {
        dest[i + destPos] = src[i + srcPos];
      }
    }
};

java_lang_System_s.exit_1: function(status) {
};

java_lang_System.s.out_f = (new java_io_PrintStream())._1(false);
java_lang_System.s.err_f = (new java_io_PrintStream())._1(true);

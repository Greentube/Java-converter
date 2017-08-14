//complete// java/io/PrintStream
//load// java/lang/Object
var java_lang_System = _defineClass("java_lang_System", java_lang_Object, null, 
function() {
},
{   // no instance methods    
},{ // statics    
    arraycopy_5 : function(src, srcPos, dest, destPos, length) {
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
    exit_1: function(status) {
    },
    out: (new java_io_PrintStream())._1(false),
    err: (new java_io_PrintStream())._1(true),       
});


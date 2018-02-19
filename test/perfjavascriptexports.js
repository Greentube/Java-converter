"use strict";

// attach the perftest program to its browser environment
java_lang_System.out = new java_io_PrintStream.$()._1(function(line) {
    var p = document.getElementById('p');
    p.appendChild(document.createElement("br"));
    p.appendChild(document.createTextNode(line));
});
window['smalltest'] = __Performance.smalltest_0;
window['fulltest'] = __Performance.fulltest_0;

set JAVA=java
rmdir /Q /S build
%JAVA% -jar ..\..\build\converter.jar -js build -cs csharpproject\build -csruntime true org/apache/hadoop/examples/dancing/*.java
%JAVA% -jar ..\..\build\converter.jar link -searchpath build -root org/apache/hadoop/examples/dancing/Pentomino -output build/pentomino.js

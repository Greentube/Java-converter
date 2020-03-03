set JAVA=java
rmdir /Q /S build
%JAVA% -jar ..\..\build\converter.jar -js build -cs csharpproject\build -csruntime true *.java
%JAVA% -jar ..\..\build\converter.jar link -searchpath build -root LongMult -output build/program.js

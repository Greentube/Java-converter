set JAVA="C:\Program Files\Java\jre1.8.0_91\bin\java"
rmdir /Q /S build
%JAVA% -jar ..\..\build\converter.jar -js build -cs csharpproject\build -csruntime true src\org\kociemba\twophase\*.java src\CubeSolver.java
%JAVA% -jar ..\..\build\converter.jar link -searchpath build -root CubeSolver -output build/kociemba.js

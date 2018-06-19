set JAVA="C:\Program Files\Java\jre1.8.0_91\bin\java"
rmdir /Q /S build
%JAVA% -jar ..\..\build\converter.jar -js build org\kociemba\twophase\*.java
%JAVA% -jar ..\..\build\converter.jar link -searchpath build -root org/kociemba/twophase/Search -output build/kociemba.js

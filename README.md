# Java-Converter

A java-to-javascript and java-to-C# source to source compiler.

## Summary

To allow the use of existing java code inside a browser/node.js/.NET environment,
java code can be transformed into equivalent javascript or C# code.
The compiler supports all language constructs of java 8 (including lambdas), but 
imposes a few [restrictions of its own](doc/restrictions.txt) on the input code.
A large [subset of the functionality](doc/libraries.txt) of the java.lang and java.util
packages are provided to be used by the program at runtime. 
The generated code replicates the behaviour of the java original with near perfection,
with only some slight [incompatibilities](doc/incompatibilities.txt).

## Integration possibilities

* Compile to a library:
This simplest form would be some java classes that form a self-contained library that
provides functionality to a caller. This library can be easily compiled and called from 
any native javascript or C# code. 

* Compile code to use functionality from 'outside'
When the java code needs to access stuff not included in the provided libraries (for example
file access or some web service calls), you need to provide native implementations to
interface with the underlying system (browsers,node.js,.NET runtime) to actually perform the
tasks. This is straight-forward for .NET. Creating native javascript classes is documented in
[native_code_javascript.txt](doc/native_code_javascript.txt).

## Workflow

The compiler can be used as a command-line tool or as an Ant task to compile a bunch of java source files
to the equivalent .js (javascript) or .cs (C#) files. For the case of javascript, a linker
step is also needed to put all the small .js files together to a big .js file in the correct loading order.
A optional minifying step (using Google's closure compiler) will greatly reduce javascript code size. 
The compiler is optimized to generate minify-able output. 
See the [getting started](doc/getting_started.txt) document for more details.


## Dependencies on other projects

The Java-Converter is based on the [extendj java compiler](https://extendj.org/) that does most of the
tricky parts of compilation. Only the backends for javascript and C# and the necessary runtime libraries 
were actually developed in this project.
Nevertheless every release of the Java-Converter is a completely self-contained application
(basically a .JAR) that contains everything needed to use the compiler.

## Example: Rubik's Cube Solver

In this example, the java code provided by http://kociemba.org/ is thrown into
the converter to create a javascript library that could be used in own browser 
applications. 
To make it work with the converter, some minimal changes were necessary:
* Changed "long" to "double" for time measurement
* Do not catch generic "Exception", but the more precise "IllegalArgumentException" 

Use the provided batch-file to compile the java code (you will have to adjust some paths)
and use "start.html" to launch it in the browser of your choice.

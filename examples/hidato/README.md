## Example: Hidato Puzzle Solver

In this example, the java code provided on
https://rosettacode.org/wiki/Solve_a_Hidato_puzzle#Java
was converted.
To make it work with the converter, some minimal changes were necessary:
* Make some autoboxing/unboxing operations explicit
* Do not use Collection.sort(), but List.sort() and provide a comparator function
* Do not us PrintStream.printf, but format output with other means.

Use the provided batch-file to compile the java code (you will have to adjust some paths)
and use "start.html" to launch it in the browser of your choice.

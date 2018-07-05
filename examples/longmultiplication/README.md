## Example: Long integer multiplication

In this example, the java code provided on
https://rosettacode.org/wiki/Long_multiplication#Decimal_version
was converted.
To make it work with the converter, some minimal changes were necessary:
* Remove an L marker of a 32bit integer
* Do not use Collection.sort(), but List.sort() and provide a comparator function
* Removed capacity value of StringBuilder constructor

Use the provided batch-file to compile the java code (you will have to adjust some paths)
and use "start.html" to launch it in the browser of your choice.

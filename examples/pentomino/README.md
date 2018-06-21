## Example: Pentomino Puzzle Solver

In this example, the java code provided on
https://github.com/facebookarchive/hadoop-20/tree/master/src/examples/org/apache/hadoop/examples/dancing
was converted.
To make it work with the converter, some minimal changes were necessary:
* Removed logging with apache logging facility
* Changed use of StringTokenizer to String.split()
* Used ArrayList constructor without parameters instead of specifying initial capacity

Use the provided batch-file to compile the java code (you will have to adjust some paths)
and use "start.html" to launch it in the browser of your choice.

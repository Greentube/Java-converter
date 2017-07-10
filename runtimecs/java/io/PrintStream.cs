using java.util;

namespace java.io {

public class PrintStream {

    public PrintStream() : base() {        
    }

    public void println() {
        printString("");
    }
    public void println(bool b) {
        printString(b ? "true":"false");
    }
    public void println(double d) {         
        printString(d+"");
    }
    public void println(char c) {         
        printString(c+"");
    }
    public void println(int i) {
        printString(i+"");
    }
    public void println(System.Object o) {
		if (o != null)
        {
			printString(o.ToString());
		}
		else
		{
			printString("null");
		}
    }

    public void printString(System.String s) {
        System.Console.Write(s + "\n");
	}

}
}

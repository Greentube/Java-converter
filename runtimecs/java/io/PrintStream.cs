using java.util;

namespace java.io {

public class PrintStream {

    private bool iserr;
    
    public PrintStream(bool iserr) : base() {        
        this.iserr = iserr;
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
        if (iserr) {
            System.Console.Error.Write(s + "\n"); 
            System.Console.Error.Write(System.Environment.StackTrace);
            System.Console.Error.Write("\n");
        } else {
            System.Console.Write(s + "\n");            
        }
	}

}
}

using java.util;

namespace java.io { public class PrintStream {

    private readonly bool iserr;
    private readonly System.Text.StringBuilder line;
        
    public PrintStream(bool iserr) : base() 
    {   this.iserr = iserr;
        this.line = new System.Text.StringBuilder();
    }

    public void print(bool b) 
    {   line.Append(java.lang.SYSTEM.str(b));
    }
    
    public void print(double d) 
    {   line.Append(java.lang.SYSTEM.str(d));
    }
    
    public void print(char c) 
    {   line.Append(c);
    }
    
    public void print(int i) 
    {   line.Append(i);
    }
    
    public void print(System.Object o) 
    {   line.Append(java.lang.SYSTEM.str(o));
    }
        
    public void println() 
    {   line.Append("\n");
        if (iserr) 
        {   System.Console.Error.Write(line.ToString());
//            System.Console.Error.Write(System.Environment.StackTrace);
//            System.Console.Error.Write("\n");
        }
        else 
        {   System.Console.Write(line.ToString());
        }  
        line.Clear();
    }

    public void println(bool b) 
    {   print(b);
        println();
    }
    
    public void println(double d) 
    {   print(d);
        println();
    }
    
    public void println(char c) 
    {   print(c);
        println();
    }
    
    public void println(int i) 
    {   print(i);
        println();
    }
    
    public void println(System.Object o) 
    {   print(o);
        println();
    }
}}

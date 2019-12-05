using java.util;

namespace java.io { public class PrintStream {

    private readonly bool iserr;
    private readonly System.Text.StringBuilder line;

    public delegate void LineConsumer(string line);
    private LineConsumer redirection;
        
    public PrintStream(bool iserr) : base() 
    {   this.iserr = iserr;
        this.line = new System.Text.StringBuilder();
        this.redirection = null;
    }

    private void finishLine()       // must be called with a lock on 'line'
    {   string l = line.ToString();
        line.Clear();
        if (redirection!=null)
        {   redirection(l);
        }
        else if (iserr) 
        {   System.Console.Error.WriteLine(l);
        }
        else 
        {   System.Console.WriteLine(l);
        }  
    }

    // public interface is thread-safe
    
    public void print(bool b) 
    {   lock (line) 
        {   line.Append(java.lang.SYSTEM.str(b)); 
        }
    }
    
    public void print(double d) 
    {   lock (line)
        {   line.Append(java.lang.SYSTEM.str(d));
        }
    }
    
    public void print(char c) 
    {   lock (line)
        {   line.Append(c);
        }
    }
    
    public void print(int i) 
    {   lock (line)
        {   line.Append(i);
        }
    }
    
    public void print(System.Object o) 
    {   lock (line)
        {   line.Append(java.lang.SYSTEM.str(o));
        }
    }
        
    public void println() 
    {   lock (line)
        {   finishLine();
        }
    }
    
    public void println(bool b) 
    {   lock (line)
        {   line.Append(java.lang.SYSTEM.str(b));
            finishLine();
        }
    }
    
    public void println(double d) 
    {   lock (line)
        {   line.Append(java.lang.SYSTEM.str(d));
            finishLine();
        }
    }
    
    public void println(char c) 
    {   lock (line)
        {   line.Append(c);
            finishLine();
        }
    }
    
    public void println(int i) 
    {   lock (line)
        {   line.Append(i);
            finishLine();
        }
    }
    
    public void println(System.Object o) 
    {   lock (line)
        {   line.Append(java.lang.SYSTEM.str(o));
            finishLine();
        }
    }
    
    // installation hook to re-direct the output to some
    // arbitrary location    
    public void redirect(LineConsumer redirection)
    {
        lock (line)
        {   this.redirection = redirection;
        }
    }
}}

namespace java.lang { public class Throwable: System.Exception
{    
    private readonly System.String message;
    private readonly System.String trace;
    
    public Throwable() : this(null)
    {   
    }
    public Throwable(System.String message) : base()
    {   
        this.message = message;
        this.trace = System.Environment.StackTrace;
    }
    public void printStackTrace()
    {
        System.Console.Error.WriteLine(this.trace);
    }
    virtual public System.String getMessage()
    {
        return message;
    }    
    override public System.String ToString()
    {        
        if (message==null) { return this.GetType().FullName; }
        else { return this.GetType().FullName + ": " + message; }
    }
}}

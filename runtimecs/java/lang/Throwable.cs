namespace java.lang { public class Throwable: System.Exception
{    
    public Throwable() : base()
    {   
    }
    public Throwable(System.String message) : base(message)
    {   
    }
    public void printStackTrace()
    {
    }
    public System.String getMessage()
    {
        return Message;
    }
}}

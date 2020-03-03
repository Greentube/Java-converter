namespace java.lang 
{
    public class Throwable: System.Exception
    {    
        private readonly string message;
        private readonly string trace;
        
        public Throwable() : this(null)
        {   
        }
        
        public Throwable(string message) : base()
        {   
            this.message = message;
            this.trace = System.Environment.StackTrace;
        }
        
        public void printStackTrace()
        {
            SYSTEM.err_f.println(this.trace);
        }
        
        virtual public string getMessage()
        {
            return message;
        }    
        
        override public string ToString()
        {        
            if (message==null) { return this.GetType().FullName; }
            else { return this.GetType().FullName + ": " + message; }
        }
    }
}

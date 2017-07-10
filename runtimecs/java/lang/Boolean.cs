
namespace java.lang
{
    public class Boolean
    {	
        private readonly bool value;
	
		public Boolean(bool v) 
		{        
			value = v;
		}

        public bool booleanValue()
        {
            return value;
        }
	
        public override bool Equals(System.Object o)
        {
            if (o==null || !(o is Boolean)) return false;
            return ((Boolean)o).value == value;
        }
		
		public override int GetHashCode()
		{
			return value ? 0 : 1;
		}

        public override System.String ToString()
        {
            return Boolean.ToString(value);
        }
        
        public static System.String ToString(bool b)
        {
            return b ? "true" : "false";
        }
        
		public static Boolean valueOf(bool b)
		{
			return new Boolean(b);
		}

		
		public static readonly Boolean FALSE = new Boolean(false);
		public static readonly Boolean TRUE = new Boolean(true);
    }
}

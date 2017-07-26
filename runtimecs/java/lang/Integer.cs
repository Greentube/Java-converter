
namespace java.lang
{
    public class Integer
    {
        private readonly int value;

        public int intValue() {
            return value;
        }


        public Integer(int v) {
            value = v;
        }

        public override bool Equals(System.Object o)
        {
            if (o==null || !(o is Integer)) return false;
            return ((Integer)o).value == value;
        }

		public override int GetHashCode()
		{
			return value;
		}
		
        public override System.String ToString()
        {
            return Integer.ToString(value);
        }

        public static System.String ToString(int i)
        {
            return i.ToString("d");
        }
        
        public static java.lang.Integer valueOf(int i)
        {
            return new java.lang.Integer(i);
        }

        
        public const int MIN_VALUE_f = -2147483648;
        public const int MAX_VALUE_f =  2147483647;
        
    }
}

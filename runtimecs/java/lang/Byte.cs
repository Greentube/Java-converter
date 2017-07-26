
namespace java.lang
{
    public class Byte
    {

        private readonly sbyte value;

        public Byte(sbyte v)
        {
            value = v;
        }

        public sbyte byteValue()
        {
            return value;
        }

        public override bool Equals(System.Object o)
        {
            if (o == null || !(o is Byte)) return false;
            return ((Byte)o).value == value;
        }

		public override int GetHashCode()
		{
			return (int) value;
		}

        public override System.String ToString()
        {
            return Byte.toString(value);
        }
        
        public static System.String toString(sbyte b)
        {
            return b.ToString();
        }

        public static java.lang.Byte valueOf(sbyte b)
        {
            return new java.lang.Byte(b);
        }

        
        public const sbyte MIN_VALUE_f = -128;
        public const sbyte MAX_VALUE_f = 127;
    }
}

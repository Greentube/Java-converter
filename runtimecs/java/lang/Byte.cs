
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
            return Byte.ToString(value);
        }
        
        public static System.String ToString(sbyte b)
        {
            return b.ToString();
        }
        
        
        public const sbyte MIN_VALUE = -128;
        public const sbyte MAX_VALUE = 127;
    }
}

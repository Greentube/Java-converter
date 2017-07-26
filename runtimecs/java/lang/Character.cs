
namespace java.lang
{
    public class Character
    {
        private readonly char value;

        public Character(char v)
        {
            value = v;
        }

        public char charValue()
        {
            return value;
        }

        
        public override bool Equals(System.Object o)
        {
            if (o == null || !(o is Character)) return false;
            return ((Character)o).value == value;
        }

		public override int GetHashCode()
		{
			return (int) value;
		}

        public override System.String ToString()
        {
            return Character.toString(value);
        }

        public static System.String toString(char c)
        {
            return c.ToString();
        }

        public static java.lang.Character valueOf(char c)
        {
            return new java.lang.Character(c);
        }

        
        public const char MIN_VALUE_f = (char) 0;
        public const char MAX_VALUE_f = (char) 0xffff;        
    }
}

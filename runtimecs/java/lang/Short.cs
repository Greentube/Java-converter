namespace java.lang 
{
    public class Short
    {
        private readonly short value;

        public Short(short v)
        {   
            value = v;
        }

        public short shortValue()
        {   
            return value;
        }

        public override bool Equals(object o)
        {   
            if (o == null || !(o is Short)) return false;
            return ((Short)o).value == value;
        }

        public override int GetHashCode()
        {   
            return (int) value;
        }

        public override string ToString()
        {   
            return Short.toString(value);
        }
        
        public static string toString(short b)
        {   
            return b.ToString();
        }

        public static Short valueOf(short b)
        {   
            return new Short(b);
        }
           
        public const short MIN_005fVALUE_f = -32768;
        public const short MAX_005fVALUE_f = 32767;
    }
}

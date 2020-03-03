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

        public override bool Equals(object o)
        {   
            if (o == null || !(o is Byte)) return false;
            return ((Byte)o).value == value;
        }

        public override int GetHashCode()
        {   
            return (int) value;
        }

        public override string ToString()
        {   
            return Byte.toString(value);
        }
        
        public static string toString(sbyte b)
        {   
            return b.ToString();
        }

        public static Byte valueOf(sbyte b)
        {   
            return new Byte(b);
        }
           
        public const sbyte MIN_005fVALUE_f = -128;
        public const sbyte MAX_005fVALUE_f = 127;
    }
}

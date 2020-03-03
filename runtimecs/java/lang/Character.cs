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
            
        public override bool Equals(object o)
        {   
            if (o == null || !(o is Character)) return false;
            return ((Character)o).value == value;
        }

        public override int GetHashCode()
        {   
            return (int) value;
        }

        public override string ToString()
        {   
            return Character.toString(value);
        }

        public static string toString(char c)
        {   
            return c.ToString();
        }

        public static Character valueOf(char c)
        {   
            return new Character(c);
        }
          
        public const char MIN_005fVALUE_f = (char) 0;
        public const char MAX_005fVALUE_f = (char) 0xffff;        
    }
}

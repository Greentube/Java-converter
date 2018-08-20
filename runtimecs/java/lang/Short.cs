namespace java.lang { public class Short
{
    private readonly short value;

    public Short(short v)
    {   value = v;
    }

    public short shortValue()
    {   return value;
    }

    public override bool Equals(System.Object o)
    {   if (o == null || !(o is Short)) return false;
        return ((Short)o).value == value;
    }

    public override int GetHashCode()
    {   return (int) value;
    }

    public override System.String ToString()
    {   return Short.toString(value);
    }
    
    public static System.String toString(short b)
    {   return b.ToString();
    }

    public static java.lang.Short valueOf(short b)
    {   return new java.lang.Short(b);
    }
       
    public const short MIN_005fVALUE_f = -32768;
    public const short MAX_005fVALUE_f = 32767;
}}

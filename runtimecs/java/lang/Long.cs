namespace java.lang { public class Long
{
    private readonly long value;

    public Long(long v) 
    {   
		value = v;
    }

    public long longValue() 
    {   
        return value;
    }

    public override bool Equals(System.Object o)
    {   
        if (o==null || !(o is Long)) return false;
        return ((Long)o).value == value;
    }

    public override int GetHashCode()
    {   
		return (int)(value^(value>>32));		
    }

    public override System.String ToString()
    {   
        return Long.toString(value);
    }

    public static long parseLong(System.String s)
    {
        long result;
        if (System.Int64.TryParse(s, out result))
        {   return result;
        }
        throw new java.lang.NumberFormatException();
    }

    public static System.String toString(long i)
    {   
        return i.ToString("d");
    }    
    
    public static System.String toHexString(long i)
    {   
        return i.ToString("x");
    }
        
    public static java.lang.Long valueOf(long i)
    {   
        return new java.lang.Long(i);
    }

    public const long MIN_005fVALUE_f = -9223372036854775808;
    public const long MAX_005fVALUE_f =  9223372036854775807;        
}}

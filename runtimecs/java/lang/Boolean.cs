namespace java.lang { public class Boolean
{
    private readonly bool value;

    public Boolean(bool v) 
    {   value = v;
    }

    public bool booleanValue()
    {   return value;
    }

    public override bool Equals(System.Object o)
    {   if (o==null || !(o is Boolean)) return false;
        return ((Boolean)o).value == value;
    }

    public override int GetHashCode()
    {   return value ? 1231 : 1237;
    }

    public override System.String ToString()
    {   return Boolean.toString(value);
    }
        
    public static System.String toString(bool b)
    {   return b ? "true" : "false";
    }
        
    public static Boolean valueOf(bool b)
    {   return b ? TRUE_f : FALSE_f;
    }

    public static readonly Boolean FALSE_f = new Boolean(false);
    public static readonly Boolean TRUE_f = new Boolean(true);
}}

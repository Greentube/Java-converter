namespace java.lang 
{
    public class Double 
    {
        private readonly double value;

        public Double(double d) 
        {   
            value = d;
        }

        public double doubleValue() 
        {   
            return value;
        }
            
        public bool isNaN() 
        {   
            return isNaN(value);
        }
            
        public bool isInfinite() 
        {   
            return isInfinite(value);
        }
            
        public override bool Equals(object o) 
        {   
            if (o==null || !(o is Double)) return false;
            return ((Double)o).value == value;
        }

        public override int GetHashCode()
        {   
            long l = System.BitConverter.DoubleToInt64Bits( value );       
            int a = (int) (l>>32);
            int b = (int) l;
            return  a ^ b;
        }

        public override string ToString() 
        {   
            return SYSTEM.str(value);
        }

        public static bool isNaN(double d) 
        {   
            return System.Double.IsNaN(d);
        }
            
        public static bool isInfinite(double d) 
        {   
            return System.Double.IsInfinity(d);
        }    
        
        public static double parseDouble(string s)
        {
            double result;
            if 
            (   System.Double.TryParse
                (
                    s, 
                    System.Globalization.NumberStyles.Float,
                    System.Globalization.CultureInfo.InvariantCulture, 
                    out result
                )
            )
            {   return result;
            }
            throw new NumberFormatException();
        }
            
        public static string toString(double d)
        {   
            return SYSTEM.str(d);
        }
            
        public static Double valueOf(double d)
        {   
            return new Double(d);
        }
            
        public const double MIN_005fVALUE_f = 4.9E-324;
        public const double MAX_005fVALUE_f = 1.7976931348623157E308;
        public const double POSITIVE_005fINFINITY_f = 1.0/0.0;
        public const double NEGATIVE_005fINFINITY_f = -1.0/0.0;
    }
}

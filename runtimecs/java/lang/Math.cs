namespace java.lang { public class Math {
    
    public static double abs(double a)
    {   return System.Math.Abs(a);
    }
    
    public static int abs(int a)
    {   return a<0 ? -a:a;
    }
    
    public static double acos(double a) 
    {   return System.Math.Acos(a);
    }        
    
    public static double asin(double a) 
    {   return System.Math.Asin(a); 
    }        
    
    public static double atan(double a) 
    {   return System.Math.Atan(a);
    }
    
    public static double atan2(double y,double x) 
    {   if (System.Double.IsNaN(x) || System.Double.IsNaN(y)) { return 0.0/0.0; }
        
        if (x==1.0) { return System.Math.Atan(y); }
        if (x==-1.0) 
        {   double z = System.Math.Atan(System.Math.Abs(y));
            return y>0 ? PI_f-(z-PI_L) : z-PI_L - PI_f;
        }
        
        if (y==Double.POSITIVE__INFINITY_f) 
        {   if (x==Double.POSITIVE__INFINITY_f) 
            {   return PI_f/4;
            } 
            else if (x==Double.NEGATIVE__INFINITY_f) 
            {   return 3*PI_f/4;
            }
            else 
            {   return PI_f/2;                
            }
        }
        if (y==Double.NEGATIVE__INFINITY_f) 
        {   if (x==Double.POSITIVE__INFINITY_f) 
            {   return -PI_f/4;
            }
            else if (x==Double.NEGATIVE__INFINITY_f) 
            {   return -3*PI_f/4;
            }
            else 
            {   return -PI_f/2;                
            }
        }
        if (x==Double.POSITIVE__INFINITY_f) 
        {   return (y==0) ? y : ((y>0) ? 0.0 : -0.0);
        }
        if (x==Double.NEGATIVE__INFINITY_f) 
        {   return PI_f;            
        }
        if (x==0) 
        {   return y>0 ? PI_f/2.0 : (y<0 ? -PI_f/2.0 : 0);
        }
        
        return System.Math.Atan2(y,x);              
    }    

    public static double ceil(double a) 
    {   return System.Math.Ceiling(a);
    }
    
    public static double cos(double a) 
    {   return System.Math.Cos(a);
    }   
    
    public static double cosh(double a) 
    {   return System.Math.Cosh(a);
    }   
    
    public static double exp(double a) 
    {   return System.Math.Exp(a);
    }   
        
    public static double floor(double a) 
    {   return System.Math.Floor(a);
    }   

    public static double hypot(double x, double y)
    {   return sqrt(x*x+y*y);
    }
    
    public static double IEEEremainder(double f1, double f2)
    {   return System.Math.IEEERemainder(f1,f2);
    }
    
    public static double log(double a) 
    {   return System.Math.Log(a);
    }
    
    public static double log10(double a) 
    {   return System.Math.Log10(a);
    }
    
    public static double max(double a, double b) 
    {   return System.Math.Max(a,b);
    }
    
    public static double min(double a, double b) 
    {   return System.Math.Min(a,b);
    }
    
    public static int max(int a, int b) 
    {   return (a>b) ? a : b;
    }
    
    public static int min(int a, int b) 
    {   return (a<b) ? a : b;
    }

    public static double pow(double a, double b) 
    {   if (b==0) { return 1.0; }
        return System.Math.Pow(a,b);
    }
        
    public static long round(double x)
    {
        if (System.Double.IsNaN(x)) { return 0; }
        if (x>=9.223372036854776E18) { return System.Int64.MaxValue; }
        if (x<=-9.223372036854776E18) { return System.Int64.MinValue; }
        
        // 0.49999999999999994 + 0.5 makes 1.
        if (x == 0.49999999999999994) { return 0; }

        // 4503599627370497.0 + 0.5 makes 4503599627370498.0.
        if (x <= -4503599627370496.0 || 4503599627370496.0 <= x)
        {   return (long) x;
        }
        // for these number ranges, this formula should be fine
        return (long) System.Math.Floor(x + 0.5);
    }
    
    public static double rint(double x) 
    {
        if (x % 0.5 != 0) 
        {   return System.Math.Round(x);
        }
        else 
        {   return (System.Math.Floor(x) % 2 == 0) ? System.Math.Floor(x) : System.Math.Round(x);
        }            
    }

    public static double signum(double a)
    {   
        if (System.Double.IsNaN(a)) { return 0.0/0.0; }
        return a==0 ? a : System.Math.Sign(a);
    }
    
    public static double sin(double a) 
    {   return System.Math.Sin(a);
    }
    
    public static double sinh(double a) 
    {   return System.Math.Sinh(a);
    }
    
    public static double sqrt(double a) 
    {   return System.Math.Sqrt(a);
    }
    
    public static double tan(double a) 
    {   return System.Math.Tan(a);
    }
    
    public static double tanh(double a) 
    {   return 1 - 2/(Math.exp(2*a)+1);
//        return System.Math.Tanh(a);
    }
    
    public static double toDegrees(double angrad)
    {   return angrad * 180.0 / System.Math.PI;
    }
    
    public static double toRadians(double angdeg)
    {   return angdeg * (System.Math.PI/180.0);
    }

    public static readonly double E_f  = System.Math.E;
    public static readonly double PI_f = System.Math.PI;  
    
    private const double PI_L = 1.2246467991473532e-16; // Long bits 0x3ca1a62633145c07L.    
}}

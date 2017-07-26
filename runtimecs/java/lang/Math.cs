
namespace java.lang {

	public class Math {

        public static double abs(double a)
        {
            return System.Math.Abs(a);
        }
		public static double acos(double a) 
		{
			return System.Math.Acos(a);
		}        
		public static double asin(double a) 
		{
			return System.Math.Asin(a);
		}        
		public static double atan(double a) 
		{
			return System.Math.Atan(a);
		}
		public static double atan2(double x,double y) 
		{
			return System.Math.Atan2(x,y);
		}
		public static double ceil(double a) 
		{
			return System.Math.Ceiling(a);
		}
		public static double cos(double a) 
		{
			return System.Math.Cos(a);
		}   
		public static double exp(double a) 
		{
			return System.Math.Exp(a);
		}   
		public static double floor(double a) 
		{
			return System.Math.Floor(a);
		}   
		public static double log(double a) 
		{
			return System.Math.Log(a);
		}
		public static double log10(double a) 
		{
			return System.Math.Log10(a);
		}
		public static double max(double a, double b) 
		{
			return (a>b) ? a : b;
		}
		public static double min(double a, double b) 
		{
			return (a<b) ? a : b;
		}
		public static double pow(double a, double b) 
		{
			return System.Math.Pow(a,b);
		}
//		public static long round(double a) 
//		{
//			return (long) System.Math.Round(a);
//		}
        public static double rint(double x) 
        {
            if (x % 0.5 != 0) {        
                return System.Math.Round(x);
            } else {
                return (System.Math.Floor(x) % 2 == 0) 
                 ? System.Math.Floor(x) : System.Math.Round(x);
            }            
        }
		public static double sin(double a) 
		{
			return System.Math.Sin(a);
		}
		public static double sqrt(double a) 
		{
			return System.Math.Sqrt(a);
		}
		public static double tan(double a) 
		{
			return System.Math.Tan(a);
		}

		public static readonly double E_f  = System.Math.E;
		public static readonly double PI_f = System.Math.PI;
        
	}
}

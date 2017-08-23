
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
//		public static double cbrt(double a) 
//		{
//		}        
		public static double ceil(double a) 
		{
			return System.Math.Ceiling(a);
		}
//        public static double copySign(double magnitude, double sign) 
//        {
//            return System.Math.Abs(magnitude) * System.Math.Sign(sign);
//        }
		public static double cos(double a) 
		{
			return System.Math.Cos(a);
		}   
		public static double cosh(double a) 
		{
			return System.Math.Cosh(a);
		}   
		public static double exp(double a) 
		{
			return System.Math.Exp(a);
		}   
		public static double expm1(double a) 
		{
			return System.Math.Exp(a)-1.0;
		}   
		public static double floor(double a) 
		{
			return System.Math.Floor(a);
		}   
//        public static int getExponent(double a) 
//        {
//        }
        public static double hypot(double x, double y)
        {
            return sqrt(x*x+y*y);
        }
        public static double IEEEremainder(double f1, double f2)
        {
            return System.Math.IEEERemainder(f1,f2);
        }
		public static double log(double a) 
		{
			return System.Math.Log(a);
		}
		public static double log10(double a) 
		{
			return System.Math.Log10(a);
		}
        public static double log1p(double x)
        {
            return System.Math.Log(x + 1.0);
        }
		public static double max(double a, double b) 
		{
			return (a>b) ? a : b;
		}
		public static double min(double a, double b) 
		{
			return (a<b) ? a : b;
		}
		public static int max(int a, int b) 
		{
			return (a>b) ? a : b;
		}
		public static int min(int a, int b) 
		{
			return (a<b) ? a : b;
		}
//        public static double nextAfter(double start, double direction)
//        {
//        }
//        public static double nextUp(double d)
//        {
//        }
		public static double pow(double a, double b) 
		{
			return System.Math.Pow(a,b);
		}
        public static double rint(double x) 
        {
            if (x % 0.5 != 0) {        
                return System.Math.Round(x);
            } else {
                return (System.Math.Floor(x) % 2 == 0) 
                 ? System.Math.Floor(x) : System.Math.Round(x);
            }            
        }
//        public static double scalb(double d, int scaleFactor)
//        {
//        }
        public static double signum(double a)
        {
            return System.Math.Sign(a);
        }
		public static double sin(double a) 
		{
			return System.Math.Sin(a);
		}
		public static double sinh(double a) 
		{
			return System.Math.Sinh(a);
		}
		public static double sqrt(double a) 
		{
			return System.Math.Sqrt(a);
		}
		public static double tan(double a) 
		{
			return System.Math.Tan(a);
		}
		public static double tanh(double a) 
		{
			return System.Math.Tanh(a);
		}
        public static double toDegrees(double angrad)
        {
            return angrad * (180.0/System.Math.PI);
        }
        public static double toRadians(double angdeg)
        {
            return angdeg * (System.Math.PI/180.0);
        }
//        public static double ulp(double d)
//        {
//        }

		public static readonly double E_f  = System.Math.E;
		public static readonly double PI_f = System.Math.PI;
        
	}
}

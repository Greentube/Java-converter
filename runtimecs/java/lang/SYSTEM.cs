namespace java.lang {

    public class SYSTEM {

        public static readonly java.io.PrintStream out_f = new java.io.PrintStream(false);
        public static readonly java.io.PrintStream err_f = new java.io.PrintStream(true);
       
        public static void arraycopy(System.Object src, int srcPos, System.Object dest, int destPos, int length) {
            System.Array.Copy((System.Array)src, srcPos, (System.Array)dest, destPos, length);
        }
        
        public static void exit(int code) 
        {
            System.Environment.Exit( code );
        }
            
            
        public static T[] dim<T>(int n0) {
            return new T[n0];
        }
        public static T[][] dim<T>(int n0, int n1) {
            T[][] a = new T[n0][];
            for (int i0=0; n1>=0 && i0<n0; i0++) {
                a[i0] = new T[n1];
            }
            return a;
        }
        public static T[][][] dim<T>(int n0, int n1, int n2) {
            T[][][] a = new T[n0][][];
            for (int i0=0; n1>=0 && i0<n0; i0++) {
                a[i0] = dim<T>(n1,n2);
            }
            return a;
        }
        public static T[][][][] dim<T>(int n0, int n1, int n2, int n3) {
            T[][][][] a = new T[n0][][][];
            for (int i0=0; n1>=0 && i0<n0; i0++) {
                a[i0] = dim<T>(n1,n2,n3);
            }
            return a;
        }
        public static T[][][][][] dim<T>(int n0, int n1, int n2, int n3, int n4) {
            T[][][][][] a = new T[n0][][][][];
            for (int i0=0; n1>=0 && i0<n0; i0++) {
                a[i0] = dim<T>(n1,n2,n3,n4);
            }
            return a;
        }
        public static T[][][][][][] dim<T>(int n0, int n1, int n2, int n3, int n4, int n5) {
            T[][][][][][] a = new T[n0][][][][][];
            for (int i0=0; n1>=0 && i0<n0; i0++) {
                a[i0] = dim<T>(n1,n2,n3,n4,n5);
            }
            return a;
        }
        public static T[][][][][][][] dim<T>(int n0, int n1, int n2, int n3, int n4, int n5, int n6) {
            T[][][][][][][] a = new T[n0][][][][][][];
            for (int i0=0; n1>=0 && i0<n0; i0++) {
                a[i0] = dim<T>(n1,n2,n3,n4,n5,n6);
            }
            return a;
        }
        public static T[][][][][][][][] dim<T>(int n0, int n1, int n2, int n3, int n4, int n5, int n6, int n7) {
            T[][][][][][][][] a = new T[n0][][][][][][][];
            for (int i0=0; n1>=0 && i0<n0; i0++) {
                a[i0] = dim<T>(n1,n2,n3,n4,n5,n6,n7);
            }
            return a;
        }
        public static T[][][][][][][][][] dim<T>(int n0, int n1, int n2, int n3, int n4, int n5, int n6, int n7, int n8) {
            T[][][][][][][][][] a = new T[n0][][][][][][][][];
            for (int i0=0; n1>=0 && i0<n0; i0++) {
                a[i0] = dim<T>(n1,n2,n3,n4,n5,n6,n7,n8);
            }
            return a;
        }
        public static T[][][][][][][][][][] dim<T>(int n0, int n1, int n2, int n3, int n4, int n5, int n6, int n7, int n8, int n9) {
            T[][][][][][][][][][] a = new T[n0][][][][][][][][][];
            for (int i0=0; n1>=0 && i0<n0; i0++) {
                a[i0] = dim<T>(n1,n2,n3,n4,n5,n6,n7,n8,n9);
            }
            return a;
        }    
        
        public static sbyte castToByte(sbyte x) {
            return x;
        }
        public static sbyte castToByte(char x) {
            return (sbyte) x;
        }
        public static sbyte castToByte(int x) {
            return (sbyte) x;
        }
        public static sbyte castToByte(double x) {
            return (sbyte) castToInt(x);
        }
        
        public static char castToChar(sbyte x) {
            return (char) x;
        }
        public static char castToChar(char x) {
            return x;
        }
        public static char castToChar(int x) {
            return (char) x;
        }
        public static char castToChar(double x) {
            return (char) castToInt(x);
        }
        
        public static int castToInt(sbyte x) {
            return (int) x;
        }
        public static int castToInt(char x) {
            return (int) x;
        }
        public static int castToInt(int x) {
            return x;
        }
        public static int castToInt(double a) {
            // NaN will be cast to 0
            if (System.Double.IsNaN(a)) {
                return 0;
            // check various possibilities 
            } else if (a>=0) {   // is a positive number 
                if (a>2147483647) return 2147483647;
                return (int) System.Math.Floor(a);   
            }
            else { // is a negative number
                if (a<-2147483648) return -2147483648;
                return (int) System.Math.Ceiling(a);    
            }
        }
        
        public static double castToDouble(sbyte x) {
            return (double) x;
        }
        public static double castToDouble(char x) {
            return (double) x;
        }
        public static double castToDouble(int x) {
            return (double) x;
        }
        public static double castToDouble(double x) {
            return x;
        }

        public static System.String str(bool v) {
            return v ? "true" : "false";
        }
        public static System.String str(sbyte v) {
            return v.ToString();
        }    
        public static System.String str(char v) {
            return v.ToString();    
        }
        public static System.String str(double v) {
            if (System.Double.IsNaN(v)) return "NaN";    
            if (System.Double.IsInfinity(v)) return "Infinity";
            if (System.Double.IsNegativeInfinity(v)) return "-Infinity";
            System.String s = v.ToString();
            // check if already have some decimal places
            if (s.IndexOf('.')>=0) return s;
            return s + ".0";
        }
        public static System.String str(int v) {
            return v.ToString("d");
        }
            
        public static System.String str(System.Object o) {
            return (o==null) ? "null" : o.ToString();
        }

        
        public static uint makeUnsigned(int x) {
            return (uint) x;
        }
    }


    public static class StringExtensions
    {        
        public static int charAt(this System.String str, int index) {
            return (int) str[index];
        }
        
  		public static int compareTo(this System.String str, System.String other) {
            int l1 = str.Length;
            int l2 = other.Length;    
            for (int i=0; i<l1 && i<l2; i++) {
                int c1 = str[i];
                int c2 = other[i];
                if (c1!=c2) {
                    return c1-c2;
                }
            }
            return l1-l2;
        }
        
  		public static System.String concat(this System.String str, System.String other) {
            return System.String.Concat(str==null ? "null":str, other==null ? "null":other);
        }
        
        public static bool endsWith(this System.String str, System.String other) {
            return str.EndsWith(other);
        }
        
        public static int indexOf(this System.String str, System.String other) {
            return str.IndexOf(other);
        }
        
        public static int indexOf(this System.String str, int c) {
            return str.IndexOf((char)c);
        }
        
        public static int indexOf(this System.String str, System.String other, int from) {
            return str.IndexOf(other,from);
        }
        
        public static int indexOf(this System.String str, int c, int from) {
            return str.IndexOf((char)c, from);
        }
  			  		
  		public static bool isEmpty(this System.String str) {
            return str.Length<=0;
        }
        
        public static int lastIndexOf(this System.String str, System.String other) {
            return str.LastIndexOf(other);
        }
        
        public static int lastIndexOf(this System.String str, int c) {
            return str.LastIndexOf((char)c);
        }
        
        public static int lastIndexOf(this System.String str, System.String other, int from) {
            return str.LastIndexOf(other,from);
        }
        
        public static int lastIndexOf(this System.String str, int c, int from) {
            return str.LastIndexOf((char)c, from);
        }
            
  		public static int length(this System.String str) {
            return str.Length;
        }
            
  		public static System.String replace(this System.String str, char oldchar, char newchar) {
            return str.Replace(oldchar,newchar);
        }
        
  		public static bool startsWith(this System.String str, System.String other) {
            return str.StartsWith(other);
        }
        
  		public static System.String substring(this System.String str, int beginIndex) {
            return str.Substring(beginIndex);
        }
        
  		public static System.String substring(this System.String str, int beginIndex, int endIndex) {
            return str.Substring(beginIndex, endIndex-beginIndex);
        }
        
        public static char[] toCharArray(this System.String str) {
            return str.ToCharArray();
        }
        
        public static System.String trim(this System.String str) {
            return str.Trim();
  		}        
    }   
    
}

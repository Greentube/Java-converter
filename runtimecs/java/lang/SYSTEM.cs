namespace java.lang { public class SYSTEM  // need to uppercase to avoid name clashes
{
    public static readonly java.io.PrintStream out_f = new java.io.PrintStream(false);
    public static readonly java.io.PrintStream err_f = new java.io.PrintStream(true);
       
    public static void arraycopy(System.Object src, int srcPos, System.Object dest, int destPos, int length) 
    {   System.Array.Copy((System.Array)src, srcPos, (System.Array)dest, destPos, length);
    }
        
    public static void exit(int code) 
    {   System.Environment.Exit( code );
    }
        
    public static long currentTimeMillis() 
    {   return System.DateTimeOffset.Now.ToUnixTimeMilliseconds();
    }
                    
    public static T[][] dim<T>(int n0, int n1) 
    {   if (n0<0) throw new java.lang.NegativeArraySizeException();
        T[][] a = new T[n0][];
        for (int i0=0; n1>=0 && i0<n0; i0++) {
            a[i0] = new T[n1];
        }
        return a;
    }
    
    public static T[][][] dim<T>(int n0, int n1, int n2) 
    {   if (n0<0) throw new java.lang.NegativeArraySizeException();
        T[][][] a = new T[n0][][];
        for (int i0=0; n1>=0 && i0<n0; i0++) {
            a[i0] = dim<T>(n1,n2);
        }
        return a;
    }
    
    public static T[][][][] dim<T>(int n0, int n1, int n2, int n3) 
    {   if (n0<0) throw new java.lang.NegativeArraySizeException();
        T[][][][] a = new T[n0][][][];
        for (int i0=0; n1>=0 && i0<n0; i0++) {
            a[i0] = dim<T>(n1,n2,n3);
        }
        return a;
    }
        
    public static int div(int a, int b) 
    {   // handle a weird special case for java compatibility
        if (a==-2147483648 && b==-1) return a;
        if (b==0) throw new java.lang.ArithmeticException();
        // normal arithmetic 
        return a / b;
    }
        
    public static sbyte castToByte(double x) 
    {   return (sbyte) castToInt(x);
    }        
    
    public static char castToChar(double x) 
    {   return (char) castToInt(x);
    }
    
    public static short castToShort(double x) 
    {   return (short) castToInt(x);
    }
    
    public static int castToInt(double a) 
    {   // NaN will be cast to 0
        if (System.Double.IsNaN(a)) {
            return 0;
        // check various possibilities 
        }
        else if (a>=0) 
        { // is a positive number 
            if (a>2147483647) return 2147483647;
            return (int) System.Math.Floor(a);   
        }
        else 
        { // is a negative number
            if (a<-2147483648) return -2147483648;
            return (int) System.Math.Ceiling(a);    
        }
    }

    public static System.String str(bool v) 
    {   return v ? "true" : "false";
    }
    
    public static System.String str(sbyte v) 
    {   return v.ToString();
    }    
    
    public static System.String str(char v) 
    {   return v.ToString();    
    }

    public static System.String str(double v) 
    {   if (System.Double.IsNaN(v)) return "NaN";    
        if (System.Double.IsNegativeInfinity(v)) return "-Infinity";
        if (System.Double.IsInfinity(v)) return "Infinity";
        
        // java builds shortest possible representation that does not lose precision
        // try to also find a short representation by using different formats
        System.String s = v.ToString("R");
        System.String s2 = v.ToString("G16");
        double parseback;
        if (s2.Length<s.Length && System.Double.TryParse(s2,out parseback))
        {   if (parseback==v) { s=s2; }
        }
                
        // check if need to add decimal places
        if (s.IndexOf('.')<0) { return s + ".0"; }
        // need to patch exponent to match java style
        int idx = s.indexOf("+");
        if (idx>0) { s = s.Remove(idx,1); }
        // use decimal point regardless of localisation settings
        return s.Replace(',','.');
    }
    
    public static System.String str(int v) 
    {   return v.ToString("d");
    }
            
    public static System.String str(System.Object o) 
    {   return (o==null) ? "null" : o.ToString();
    }
    
    public static System.String ASSIGNPLUS(ref System.String dest, System.String s)
    {   return dest = str(dest) + s;
    }    

    public static short ASSIGNPLUS(ref short dest, int s)
    {   return dest = (short) (dest+s);
    }    
    public static char ASSIGNPLUS(ref char dest, int s)
    {   return dest = (char) (dest+s);
    }    
    public static sbyte ASSIGNPLUS(ref sbyte dest, int s)
    {   return dest = (sbyte) (dest+s);
    }    
    public static double ASSIGNPLUS(ref double dest, int s)
    {   return dest = dest+s;
    }    
    public static double ASSIGNPLUS(ref int dest, int s)
    {   return dest = dest+s;
    }    
    public static int ASSIGNPLUS(ref int dest, double s)
    {   return dest = castToInt(dest+s);
    }
    public static short ASSIGNPLUS(ref short dest, double s)
    {   return dest = castToShort(dest+s);
    }
    public static char ASSIGNPLUS(ref char dest, double s)
    {   return dest = castToChar(dest+s);
    }
    public static sbyte ASSIGNPLUS(ref sbyte dest, double s)
    {   return dest = castToByte(dest+s);
    }
    public static double ASSIGNPLUS(ref double dest, double s)
    {   return dest = dest+s;
    }    

    public static short ASSIGNMINUS(ref short dest, int s)
    {   return dest = (short) (dest-s);
    }    
    public static char ASSIGNMINUS(ref char dest, int s)
    {   return dest = (char) (dest-s);
    }    
    public static sbyte ASSIGNMINUS(ref sbyte dest, int s)
    {   return dest = (sbyte) (dest-s);
    }    
    public static double ASSIGNMINUS(ref double dest, int s)
    {   return dest = dest-s;
    }    
    public static double ASSIGNMINUS(ref int dest, int s)
    {   return dest = dest-s;
    }    
    public static int ASSIGNMINUS(ref int dest, double s)
    {   return dest = castToInt (dest-s);
    }
    public static short ASSIGNMINUS(ref short dest, double s)
    {   return dest = castToShort (dest-s);
    }
    public static char ASSIGNMINUS(ref char dest, double s)
    {   return dest = castToChar(dest-s);
    }
    public static sbyte ASSIGNMINUS(ref sbyte dest, double s)
    {   return dest = castToByte(dest-s);
    }
    public static double ASSIGNMINUS(ref double dest, double s)
    {   return dest = dest-s;
    }    

    public static int ASSIGNDIV(ref int dest, int s)
    {
        return dest = div(dest,s);
    }
    public static short ASSIGNDIV(ref short dest, int s)
    {   return dest = (short) div(dest,s);
    }    
    public static char ASSIGNDIV(ref char dest, int s)
    {   return dest = (char) div(dest,s);
    }    
    public static sbyte ASSIGNDIV(ref sbyte dest, int s)
    {   return dest = (sbyte) div(dest,s);
    }    
    public static double ASSIGNDIV(ref double dest, int s)
    {   return dest = dest / s;
    }    
    public static double ASSIGNDIV(ref int dest, int s)
    {   return dest = dest / s;
    }    
    public static int ASSIGNDIV(ref int dest, double s)
    {   return dest = castToInt(dest/s);
    }
    public static short ASSIGNDIV(ref short dest, double s)
    {   return dest = castToShort(dest/s);
    }
    public static char ASSIGNDIV(ref char dest, double s)
    {   return dest = castToChar(dest/s);
    }
    public static sbyte ASSIGNDIV(ref sbyte dest, double s)
    {   return dest = castToByte(dest/s);
    }
    public static double ASSIGNDIV(ref double dest, double s)
    {   return dest = dest / s;
    }    

    public static short ASSIGNMUL(ref short dest, int s)
    {   return dest = (short) (dest*s);
    }    
    public static char ASSIGNMUL(ref char dest, int s)
    {   return dest = (char) (dest*s);
    }    
    public static sbyte ASSIGNMUL(ref sbyte dest, int s)
    {   return dest = (sbyte) (dest*s);
    }    
    public static double ASSIGNMUL(ref double dest, int s)
    {   return dest = dest*s;
    }    
    public static double ASSIGNMUL(ref int dest, int s)
    {   return dest = dest*s;
    }    
    public static int ASSIGNMUL(ref int dest, double s)
    {   return dest = castToInt(dest*s);
    }
    public static short ASSIGNMUL(ref short dest, double s)
    {   return dest = castToShort(dest*s);
    }
    public static char ASSIGNMUL(ref char dest, double s)
    {   return dest = castToChar(dest*s);
    }
    public static sbyte ASSIGNMUL(ref sbyte dest, double s)
    {   return dest = castToByte(dest*s);
    }
    public static double ASSIGNMUL(ref double dest, double s)
    {   return dest = dest*s;
    }    

    public static short ASSIGNMOD(ref short dest, int s)
    {   return dest = (short) (dest%s);
    }    
    public static char ASSIGNMOD(ref char dest, int s)
    {   return dest = (char) (dest%s);
    }    
    public static sbyte ASSIGNMOD(ref sbyte dest, int s)
    {   return dest = (sbyte) (dest%s);
    }    
    public static double ASSIGNMOD(ref double dest, int s)
    {   return dest = dest%s;
    }    
    public static double ASSIGNMOD(ref int dest, int s)
    {   return dest = dest%s;
    }    
    public static int ASSIGNMOD(ref int dest, double s)
    {   return dest = castToInt(dest%s);
    }
    public static short ASSIGNMOD(ref short dest, double s)
    {   return dest = castToShort(dest%s);
    }
    public static char ASSIGNMOD(ref char dest, double s)
    {   return dest = castToChar(dest%s);
    }
    public static sbyte ASSIGNMOD(ref sbyte dest, double s)
    {   return dest = castToByte(dest%s);
    }
    public static double ASSIGNMOD(ref double dest, double s)
    {   return dest = dest%s;
    }    

    public static short ASSIGNAND(ref short dest, int s)
    {   return dest = (short) (((int)dest)&((int)s));
    }    
    public static char ASSIGNAND(ref char dest, int s)
    {   return dest = (char) (((int)dest)&((int)s));
    }    
    public static sbyte ASSIGNAND(ref sbyte dest, int s)
    {   return dest = (sbyte) (((int)dest)&((int)s));
    }    
    public static sbyte ASSIGNAND(ref int dest, int s)
    {   return dest = (int) (((int)dest)&((int)s));
    }    

    public static short ASSIGNOR(ref short dest, int s)
    {   return dest = (short) (((int)dest)|((int)s));
    }    
    public static char ASSIGNOR(ref char dest, int s)
    {   return dest = (char) (((int)dest)|((int)s));
    }    
    public static sbyte ASSIGNOR(ref sbyte dest, int s)
    {   return dest = (sbyte) (((int)dest)|((int)s));
    }    
    public static sbyte ASSIGNOR(ref int dest, int s)
    {   return dest = (int) (((int)dest)|((int)s));
    }    

    public static short ASSIGNXOR(ref short dest, int s)
    {   return dest = (short) (((int)dest)^((int)s));
    }    
    public static char ASSIGNXOR(ref char dest, int s)
    {   return dest = (char) (((int)dest)^((int)s));
    }    
    public static sbyte ASSIGNXOR(ref sbyte dest, int s)
    {   return dest = (sbyte) (((int)dest)^((int)s));
    }    
    public static sbyte ASSIGNXOR(ref int dest, int s)
    {   return dest = (int) (((int)dest)^((int)s));
    }    

    public static short ASSIGNLSHIFT(ref short dest, int s)
    {   return dest = (short) (((int)dest)<<((int)s));
    }    
    public static char ASSIGNLSHIFT(ref char dest, int s)
    {   return dest = (char) (((int)dest)<<((int)s));
    }    
    public static sbyte ASSIGNLSHIFT(ref sbyte dest, int s)
    {   return dest = (sbyte) (((int)dest)<<((int)s));
    }    
    public static sbyte ASSIGNLSHIFT(ref int dest, int s)
    {   return dest = (int) (((int)dest)<<((int)s));
    }    

    public static short ASSIGNRSHIFT(ref short dest, int s)
    {   return dest = (short) (((int)dest)>>((int)s));
    }    
    public static char ASSIGNRSHIFT(ref char dest, int s)
    {   return dest = (char) (((int)dest)>>((int)s));
    }    
    public static sbyte ASSIGNRSHIFT(ref sbyte dest, int s)
    {   return dest = (sbyte) (((int)dest)>>((int)s));
    }    
    public static sbyte ASSIGNRSHIFT(ref int dest, int s)
    {   return dest = (int) (((int)dest)>>((int)s));
    }    

    public static short ASSIGNURSHIFT(ref short dest, int s)
    {   return dest = (short) (((uint)dest)>>((int)s));
    }    
    public static char ASSIGNURSHIFT(ref char dest, int s)
    {   return dest = (char) (((uint)dest)>>((int)s));
    }    
    public static sbyte ASSIGNURSHIFT(ref sbyte dest, int s)
    {   return dest = (sbyte) (((uint)dest)>>((int)s));
    }    
    public static int ASSIGNURSHIFT(ref int dest, int s)
    {   return dest = (int) (((uint)dest)>>((int)s));
    }    
    
}}

namespace java.lang { public static class StringExtensions
{        
    public static char charAt(this System.String str, int index) 
    {   return str[index];
    }
        
    public static int compareTo(this System.String str, System.String other) 
    {   int l1 = str.Length;
        int l2 = other.Length;    
        for (int i=0; i<l1 && i<l2; i++) 
        {   int c1 = str[i];
            int c2 = other[i];
            if (c1!=c2) 
            {   return c1-c2;
            }
        }
        return l1-l2;
    }
        
    public static System.String concat(this System.String str, System.String other)         
    {   if (str==null) throw new System.NullReferenceException();
        if (other==null) throw new System.ArgumentNullException();
        return System.String.Concat(str,other);
    }
    
    public static bool contains(this System.String @this, System.Object other)
    {   return @this.indexOf(other.ToString())>=0;        
    }
        
    public static bool endsWith(this System.String str, System.String other) 
    {   return str.EndsWith(other);
    }
        
    public static int indexOf(this System.String str, System.String other) 
    {   return str.IndexOf(other);
    }
        
    public static int indexOf(this System.String str, int c) 
    {   return str.IndexOf((char)c);
    }
        
    public static int indexOf(this System.String str, System.String other, int from) 
    {   return str.IndexOf(other,from);
    }
        
    public static int indexOf(this System.String str, int c, int from) 
    {   return str.IndexOf((char)c, from);
    }
  
    public static bool isEmpty(this System.String str) 
    {   return str.Length<=0;
    }
    
    public static System.String join(System.Object delim, System.Object[] parts)
    {   
        System.String d = SYSTEM.str(delim);
        System.Text.StringBuilder b = new System.Text.StringBuilder();
        for (int i=0; i<parts.Length; i++)
        {   if (i>0) b.Append(d);
            b.Append(SYSTEM.str(parts[i]));
        }
        return b.ToString();
    }
        
    public static int lastIndexOf(this System.String str, System.String other) 
    {   return str.LastIndexOf(other);
    }
        
    public static int lastIndexOf(this System.String str, int c) 
    {   return str.LastIndexOf((char)c);
    }
        
    public static int lastIndexOf(this System.String str, System.String other, int from) 
    {   return str.LastIndexOf(other,from);
    }
        
    public static int lastIndexOf(this System.String str, int c, int from) 
    {   return str.LastIndexOf((char)c, from);
    }
            
    public static int length(this System.String str) 
    {   return str.Length;
    }
            
    public static System.String replace(this System.String str, char oldchar, char newchar) 
    {   return str.Replace(oldchar,newchar);
    }
    
    public static System.String replace(this System.String str, System.Object oldstr, System.Object newstr) 
    {   return str.Replace(oldstr.ToString(),newstr.ToString());
    }
        
    public static bool startsWith(this System.String str, System.String other) 
    {   return str.StartsWith(other);
    }
    
    public static System.String[] split(this System.String str, System.String delim, int limit=0) 
    {   
        // short-cut for empty string
        if (str.Length<1) 
        {   return new System.String[]{""};
        }
        
        // special behaviour for empty delimiter string
        if (delim==null || delim.Length<1)
        {   
            System.String[] l;
            if (limit<0) 
            {   l = new System.String[str.Length+1];
            } else if (limit==0) 
            {   l = new System.String[str.Length];
            } else 
            {   l = new System.String[Math.min(str.Length+1,limit)];
            }
            for (int i=0; i<l.Length; i++) 
            {   l[i] = i>=str.Length ? "" : (i<l.Length-1 ? str.Substring(i,1) : str.Substring(i));
            }
            return l;                
        }
    
        // normal operation
        if (limit>0) 
        {   return str.Split(new System.String[]{delim}, limit, System.StringSplitOptions.None);
        }
        else
        {   System.String[] l = str.Split(new System.String[]{delim}, System.StringSplitOptions.None );
            if (limit==0) 
            {   int len = l.Length;
                while (len>1 && l[len-1].Length<1) len--;
                if (len<l.Length) System.Array.Resize(ref l, len);
            }
            return l;
        }
    }
        
    public static System.String substring(this System.String str, int beginIndex) 
    {   return str.Substring(beginIndex);
    }
        
    public static System.String substring(this System.String str, int beginIndex, int endIndex) 
    {   return str.Substring(beginIndex, endIndex-beginIndex);
    }
        
    public static char[] toCharArray(this System.String str) 
    {   return str.ToCharArray();
    }
        
    public static System.String trim(this System.String str) 
    {   return str.Trim();
    }        
        
}}

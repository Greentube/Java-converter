namespace java.lang { public class SYSTEM 
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
    {   T[][] a = new T[n0][];
        for (int i0=0; n1>=0 && i0<n0; i0++) {
            a[i0] = new T[n1];
        }
        return a;
    }
    
    public static T[][][] dim<T>(int n0, int n1, int n2) 
    {   T[][][] a = new T[n0][][];
        for (int i0=0; n1>=0 && i0<n0; i0++) {
            a[i0] = dim<T>(n1,n2);
        }
        return a;
    }
    
    public static T[][][][] dim<T>(int n0, int n1, int n2, int n3) 
    {   T[][][][] a = new T[n0][][][];
        for (int i0=0; n1>=0 && i0<n0; i0++) {
            a[i0] = dim<T>(n1,n2,n3);
        }
        return a;
    }
        
    public static int div(int a, int b) 
    {   // handle a weird special case for java compatibility
        if (a==-2147483648 && b==-1) return a;
        // normal arithmetic (may even throw DivideByZeroException)
        return a / b;
    }
        
    public static sbyte castToByte(double x) 
    {   return (sbyte) castToInt(x);
    }        
    
    public static char castToChar(double x) 
    {   return (char) castToInt(x);
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
        // use decimal point regardless of localisation settings
        System.String s = v.ToString().Replace(',','.');
        // check if already have some decimal places
        if (s.IndexOf('.')>=0) return s;
        return s + ".0";
    }
    
    public static System.String str(int v) 
    {   return v.ToString("d");
    }
            
    public static System.String str(System.Object o) 
    {   return (o==null) ? "null" : o.ToString();
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

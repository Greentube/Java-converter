namespace java.lang {

public class SYSTEM {

    public static readonly java.io.PrintStream out_f = new java.io.PrintStream();
	public static readonly java.io.PrintStream err_f = new java.io.PrintStream();
   
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
        return (sbyte) x;
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
    public static sbyte castToChar(double x) {
        return (char) x;
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
    public static int castToInt(double x) {
        return (int) x;
    }
    
    public static int castToDouble(sbyte x) {
        return (double) x;
    }
    public static int castToDouble(char x) {
        return (double) x;
    }
    public static int castToDouble(int x) {
        return (double) x;
    }
    public static int castToDouble(double x) {
        return x;
    }
    
}
}

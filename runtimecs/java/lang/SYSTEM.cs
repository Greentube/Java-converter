namespace java.lang {

public class SYSTEM {

    public static readonly java.io.PrintStream _out = new java.io.PrintStream();
	public static readonly java.io.PrintStream err = new java.io.PrintStream();
   
    public static void arraycopy(System.Object src, int srcPos, System.Object dest, int destPos, int length) {
        System.Array.Copy((System.Array)src, srcPos, (System.Array)dest, destPos, length);
    }
	
	public static void exit(int code) 
	{
		System.Environment.Exit( code );
	}
	
}
}

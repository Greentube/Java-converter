package com.greentube.convertert€st_3;

public class ModifierTestClass 
{
    // have various access modifiers combination for fields
                     int def;
    public           int pub;
    private          int priv;
    protected        int prot;    
              static int s_def = 1;
    public    static int s_pub = 2;
    private   static int s_priv = 3;
    protected static int s_prot = 4; 
        
    // same modifier combinations for methods
                     int def() { return def; }    
    public           int pub() { return pub; };
    private          int priv() { return priv; };
    protected        int prot() { return prot; };
              static int s_def() { return s_def; }    
    public    static int s_pub() { return s_pub; };
    private   static int s_priv() { return s_priv; };
    protected static int s_prot() { return s_prot; };
    
    // possible modifiers for constructors
              ModifierTestClass(int a) { this(a,22); };
    public    ModifierTestClass(int a, int b) { this(a,b,33,44); };
//    private   ModifierTestClass(int a, int b, int c) { this (a,b,c,44); };
    protected ModifierTestClass(int a, int b, int c, int d) 
    {   def=a;
        pub=b;
        priv=c;
        prot=d; 
    }
    

    public static void tryaccess()
    {
        ModifierTestClass m = new ModifierTestClass(11);            
    }
    
    public int baseaccessother(ModifierTestClass m)
    {
        return m.def
             + m.pub     // can even access public of other instance
             + m.priv
             + m.prot;
    }
}

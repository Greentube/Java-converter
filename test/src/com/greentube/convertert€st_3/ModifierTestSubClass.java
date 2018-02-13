package com.greentube.convertert€st_3;

public class ModifierTestSubClass extends ModifierTestClass 
{
    ModifierTestSubClass(int a)
    {   super(a);       // default access to parent in same package
    }
    public ModifierTestSubClass(int a, int b)
    {   super(a,b);    // public access
    }
    private ModifierTestSubClass(int a, int b, int c)
    {   // super(a,b,c);   // private access (forbidden)
        super(a,b,c,40); 
    }
    protected ModifierTestSubClass(int a, int b, int c, int d)
    {   super(a,b,c,d);     // protectecd access
    }

    // access stuff from static members
    public static int teststaticacess()
    {
        return s_def
             + s_pub
          // + s_priv    // not allowed
             + s_prot
             + s_def()
             + s_pub()
          // + s_priv()  // not allowed
             + s_prot();    
    }

    // access stuff from same instance defined by parent
    public int testownaccess()
    {
        return def 
             + pub 
          // + priv    // not allowed      
             + prot
             + def()
             + pub()
          // + priv()  // not allowed
             + prot();
    }
    
    // access stuff from a different instance (but related)
    public int testforeignaccess(ModifierTestClass m)
    {
        return m.def 
             + m.pub 
          // + m.priv    // not allowed      
             + m.prot
             + m.def()
             + m.pub()
          // + m.priv()  // not allowed
             + m.prot();    
    }

}

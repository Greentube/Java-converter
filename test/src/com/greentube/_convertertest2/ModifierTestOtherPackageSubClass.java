package com.greentube._convertertest2;
import com.greentube.convertert€st_3.ModifierTestClass;

public class ModifierTestOtherPackageSubClass extends ModifierTestClass 
{
    ModifierTestOtherPackageSubClass(int a)
    {   // super(a);    // default access of other package (forbidden)
        super(a,5);
    }
    public ModifierTestOtherPackageSubClass(int a, int b)
    {   super(a,b);    // public access
    }
    private ModifierTestOtherPackageSubClass(int a, int b, int c)
    {   // super(a,b,c);   // private access (forbidden)
        super(a,b,c,40); 
    }
    protected ModifierTestOtherPackageSubClass(int a, int b, int c, int d)
    {   super(a,b,c,d);     // protectecd access
    }
    
    // access stuff from static members
    public static int teststaticacess()
    {
        return 0
          //   s_def     // not allowed
             + s_pub
          // + s_priv    // not allowed
             + s_prot
          // + s_def()   // not allowed
             + s_pub()
          // + s_priv()  // not allowed
             + s_prot();    
    }

    // access stuff from same instance defined by parent
    public int testownaccess()
    {
        return 0
          //   def     // not allowed 
             + pub 
          // + priv    // not allowed      
             + prot
          // + def()   // not allowed
             + pub()
          // + priv()  // not allowed
             + prot();
    }
    
    // access stuff from a different instance 
    public int testforeignsuperaccess(ModifierTestClass m)
    {
        return 0
          //   m.def     // not allowed 
             + m.pub 
          // + m.priv    // not allowed      
          // + m.prot    // not allowed
          // + m.def()   // not allowed
             + m.pub()
          // + m.priv()  // not allowed
          // + m.prot()  // not allowed  
             ;    
    }
    
    // access stuff from a different instance (but related)
    public int testrelatedsuperaccess(ModifierTestOtherPackageSubClass m)
    {
        ModifierTestOtherPackageSubClass m2 = m;
        return 0
          //   m2.def     // not allowed 
             + m2.pub 
          // + m2.priv    // not allowed      
             + m2.prot    
          // + m2.def()   // not allowed
             + m2.pub()
          // + m2.priv()  // not allowed
             + m2.prot()  
             ;    
    }
    
}

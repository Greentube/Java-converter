package com.greentube.convertertestjava7;
import java.util.*;

import com.greentube.convertertestjava5.TestJava5;

public class TestJava7 extends TestJava5 
{
    final static String one = "one"; 

    public static void main(String[] args) 
    {   TestJava5.main(args);

        System.out.println ("-- converter test suite for java 7" );
        binaryliteralstest();
        stringinswitchtest();
        underscoreinnumbertest();
        diamondoperatortest();
        trywithresourcestest();
    }

    public static void binaryliteralstest() 
    {   System.out.println("- binary literals");

        assertI(0B010, 2);
        assertI(0b0001011010000101000101, 368965);
        assertI(0b10100001010001011010000101000101, -1589272251);
    }

    public static void stringinswitchtest() 
    {   System.out.println("- strings in switch");

        String[] s = { "one","two","three","four", "strange", "fail"};
        StringBuffer sb = new StringBuffer();
        for (int i=0; i<s.length; i++) 
        {   switch (s[i]) 
            {   case one:  
                    sb.append("o"); 
                    break;
                case "two":  
                    sb.append("t"); 
                    break;
                case "three":  
                    sb.append("3"); 
                    break;
                case "four":  
                    sb.append("f");
                    break;  
                default:
                    sb.append("x");
            }
        }
        assertO(sb.toString(), "ot3fxx");
    }

    public static void underscoreinnumbertest() 
    {   System.out.println("- underscore in number");

        assertI(4_543_432, 4543432);
        assertI(0x4a_ff_33, 4914995);
        assertI(0b0_1_1_0, 6);
    }

    public static void diamondoperatortest() 
    {   System.out.println("- diamond operator");

        List<Object> list = new ArrayList<>();
        list.add("A");
        assertO(list.toString(), "[A]");

        List<String> list2 = new ArrayList<>();
        list2.add("B");
        list.addAll(list2);
        assertO(list.toString(), "[A, B]");
    }
    
    public static void trywithresourcestest() 
    {   System.out.println("- try with resources");

        StringBuffer b;
        
        b = new StringBuffer();
        assertI(FailEngine.countopen,0);
        try (FailEngine pe = new FailEngine(false,false))
        {   b.append("ok");     
        }
        assertI(FailEngine.countopen,0);
        assertO(b.toString(), "ok");

        b = new StringBuffer();
        assertI(FailEngine.countopen,0);
        try (FailEngine pe = new FailEngine(false,false))
        {   assertI(FailEngine.countopen,1);        
            int fail = Integer.parseInt("no!");            
        }
        catch (NumberFormatException e)    // is called after auto-closing
        {   assertI(FailEngine.countopen,0);  
            b.append("NFE");
        }
        finally                            // is called last
        {   assertI(FailEngine.countopen,0);
            b.append("fin");
        }
        assertI(FailEngine.countopen,0);
        assertO(b.toString(), "NFEfin");

        b = new StringBuffer();
        try (FailEngine pe = new FailEngine(true,false))
        {   assertI(FailEngine.countopen,0);
            b.append("should not be reached");
        }
        catch (IllegalArgumentException e) 
        {   assertI(FailEngine.countopen,0);
            b.append("IAE");
        }
        assertI(FailEngine.countopen,0);
        assertO(b.toString(), "IAE");
        
        b = new StringBuffer();
        try (FailEngine pe = new FailEngine(false,true); FailEngine p2=null)
        {   assertI(FailEngine.countopen,1);
            b.append("ok");
        }
        catch (IllegalStateException e) 
        {   b.append("ISE");
            assertI(FailEngine.countopen,0);
        }
        finally
        {   assertI(FailEngine.countopen,0);
        }        
        assertI(FailEngine.countopen,0);
        assertO(b.toString(), "okISE");
        
        b = new StringBuffer();
        try
        {   failinfinally();
        }
        catch (NumberFormatException e) 
        {   b.append("NFE");
        }
        assertO(b.toString(), "NFE");
        
        b = new StringBuffer();
        try
        {   int result = failinautoclose();
            assertI(result, 4711);
        }
        catch (NumberFormatException e) 
        {   b.append("NFE");
        }
        catch (IllegalStateException e) 
        {   b.append("ISE");
        }
        assertO(b.toString(), "ISE");
        
        b = new StringBuffer();
        try
        {   failinfinallyafterexception();  // will suppress the original exception
        }
        catch (IllegalStateException e) 
        {   b.append("ISE");
        }
        catch (IllegalArgumentException e) 
        {   b.append("IAE");
        }        
        assertO(b.toString(), "IAE");
        
        b = new StringBuffer();
        try
        {   failinautocloseafterexception();  // will suppress the exception of auto-close
        }
        catch (IllegalStateException e) 
        {   b.append("ISE");
        }
        catch (IllegalArgumentException e) 
        {   b.append("IAE");
        }
        assertO(b.toString(), "IAE");

        b = new StringBuffer();
        try 
        {
            try (FailEngine pe = new FailEngine(false,true))
            {   assertI(FailEngine.countopen,1);
                Integer.parseInt("no!"); // will suppress the exception of auto-close   
                b.append("ok");
            }
        }
        catch (NumberFormatException e) 
        {   b.append("NFE");
            assertI(FailEngine.countopen,0);
        }
        catch (IllegalArgumentException e) 
        {   b.append("IAE");
        }
        catch (IllegalStateException e) 
        {   b.append("ISE");
        }
        assertI(FailEngine.countopen,0);
        assertO(b.toString(), "NFE");        
    }
    
    static class FailEngine implements AutoCloseable 
    {
        public static int countopen = 0;
        private boolean failonclose;
        
        public FailEngine(boolean failonopen, boolean failonclose)
        {
            if (failonopen) { throw new IllegalArgumentException(""); }
            this.failonclose = failonclose;
            countopen++;
        }
        
        public void close()
        {            
            countopen--;
            if (failonclose) { throw new IllegalStateException(""); }
        }
    }
    
    private static int failinfinally()
    {
        try
        {
            return 4711;
        } 
        finally
        {
            Integer.parseInt("äää");
        }
    }
    private static int failinautoclose()
    {
        try (FailEngine pe = new FailEngine(false,true))
        {
            return 4711;
        } 
    }
    private static void failinfinallyafterexception()
    {
        try
        {
            throw new IllegalStateException();
        } 
        finally
        {
            Integer.parseInt("äää");
        }
    }
    private static void failinautocloseafterexception()
    {
        try (FailEngine pe = new FailEngine(false,true))
        {
            throw new IllegalArgumentException();
        } 
    }
}

package com.greentube.longtest;
import com.greentube.convertertest.TestJava4;

public class TestLong extends TestJava4
{

	public static void main(String[] args)
	{
		longtest();
		longmathtest();
	}
	
    public static void longtest()
    {
        System.out.println("- long");
     
        assertO(new Long(1234567890123L).toString(), "1234567890123");
        Long l = Long.valueOf(-1234567890123L);
        assertL(l.longValue(), -1234567890123L);
        Long l2 = new Long(l.longValue());
        assertO(l,l2);
        assertL(Long.MIN_VALUE, -9223372036854775808L);
        assertL(Long.MAX_VALUE,9223372036854775807L);
        assertO(l2.toString(), "-1234567890123");
        assertO(new Long(193045872894573854L).toString(), "193045872894573854");
        assertL(Long.parseLong("123456789"), 123456789);
        
        long x = 550000000000L + 770000000000L;
        assertL(x, 1320000000000L);
        x = x + 9223372036854770000L;
        assertL(x, -9223370716854781616L);
        x = x - 4293843740000000L;
        assertL(x, 9219079513114770000L);
        
        int i = 12;
        x = 7400;
        x *= i;
        assertL(x, 88800);
        x = 7400;
        x /= i;
        assertL(x, 616);
        x = 7400;
        x %= i;
        assertL(x, 8);
        x = 7400;
        x &= i;
        assertL(x, 8);
        x = 7400;
        x |= i;
        assertL(x, 7404);
        x = 7400;
        x ^= i;
        assertL(x, 7396);
        x = 7400;
        x >>= i;
        assertL(x, 1);
        x = 7400;
        x >>>= i;
        assertL(x, 1);
        x = 7400;
        x <<= i;
        assertL(x, 30310400);
        
        i = -12;
        x = 7400;
        x *= i;
        assertL(x, -88800);
        x = 7400;
        x /= i;
        assertL(x, -616);
        x = 7400;
        x %= i;
        assertL(x, 8);
        x = 7400;
        x &= i;
        assertL(x, 7392);
        x = 7400;
        x |= i;
        assertL(x, -4);
        x = 7400;
        x ^= i;
        assertL(x, -7396);
        x = 7400;
        x >>= i;
        assertL(x, 0);
        x = 7400;
        x >>>= i;
        assertL(x, 0);
        x = 7400;
        x <<= i;
        assertL(x, -3566850904877432832L);

        x = -6254;
        long y = 7;
        assertL(x + y, -6247); 
        assertL(x * y, -43778); 
        assertL(x - y, -6261); 
        assertL(x / y, -893); 
        assertL(x % y, -3); 
        assertL(x & y, 2); 
        assertL(x | y, -6249); 
        assertL(x ^ y, -6251); 
        assertL(x <<  y, -800512);
        assertL(x >>>  y, 144115188075855823L);
        assertL(x >>  y, -49);
        y = -47;
        assertL(x + y, -6301); 
        assertL(x * y, 293938); 
        assertL(x - y, -6207); 
        assertL(x / y, 133); 
        assertL(x % y, -3); 
        assertL(x & y, -6256); 
        assertL(x | y, -45); 
        assertL(x ^ y, 6211); 
        assertL(x <<  y, -819724288);
        assertL(x >>>  y, 140737488355327L);
        assertL(x >>  y, -1);

        x = -625400000000000L;
        y = 700000000000L;        
        assertL(x + y, -624700000000000L); 
        assertL(x * y,  -6521573476384374784L); 
        assertL(x - y, -626100000000000L); 
        assertL(x / y, -893); 
        assertL(x % y, -300000000000L); 
        assertL(x & y, 149032030208L); 
        assertL(x | y, -624849032030208L); 
        assertL(x ^ y, -624998064060416L); 
        assertL(x <<  y, -625400000000000L);
        assertL(x >>>  y, -625400000000000L);
        assertL(x >>  y, -625400000000000L);
        
        long[] al = new long[]{ 44,55,-660000000000L };
        assertL(al[0], 44);
        assertL(al[1], 55);
        assertL(al[2], -660000000000L);    
        assertB( al instanceof long[]);  
        
        double d = 542.1;
        assertL( (long)d, 542);
    }

    public static void longmathtest()
    {
        System.out.println("- long math"); 

	    assertL(Math.round(-5.4), -5);        
	    assertL(Math.round(-234234241231434.2), -234234241231434L);        
	    assertL(Math.round(-5.4), -5L);        
	    assertL(Math.round(1234567890123.4), 1234567890123L);        
	    assertL(Math.round(1234567890123.6), 1234567890124L);     
	    long lr = Math.round(-123456789012345.1);
	    assertL(lr, -123456789012345L);
	    lr = Math.round(-123456789012345.5);
	    assertL(lr, -123456789012345L);        
	    lr = Math.round(123456789012345.5);
	    assertL(lr, 123456789012346L);        
    }
    
    public static void assertL(long value, long expected)
    {   if (value!=expected) 
        {   System.err.println("Received(L) "+value+" instead of "+expected);
        	assertB(false);
        }
    }

}

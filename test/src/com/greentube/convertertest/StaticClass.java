/*
 * StaticClass.java
 *
 * Created on 09. September 2005, 09:57
 */

package com.greentube.convertertest;


import java.util.Vector;


/**
 *
 * @author  reinhard
 */
public class StaticClass {
    
    static int a = 17;
    static String b = "hello kitty";
    static Vector c = new Vector();
    static DummyClass d = new DummyClass();
    static DummyClass e;
    static int f;
    static final String nostring = null;
    
    static int[][][] ia = { { { 4, 4 } ,
                              { 6, 7 }
                            },
                            { { 11, 123, 123 } }
                          };
    static String[] sa = { "one", "two", "three" };
    static String[][] saa = { { "x", "y" }, { "a", "b", "c"} };

    public static final int []ROWCOUNT = {3, 6, 9, 10};
    public static int [][][]REFERENCES = { {{0,1},{2,3},{4,5}},{{0,1},{1,2},{3,4},{4,5},{6,7},{7,8}},{{0,1},{1,2},{2,3},{3,4},{4,5},{5,6},{6,7},{7,8},{8,9}}};

    public static int fact(int n)
    {
    	if (n<2) return 1;
    	return n*fact(n-1);
    }
    public static String hello()
    {
    	return "hello";    
    }
    

    public static byte[] stringToBytes(String s)
	{
		byte[] a = new byte[s.length()];
		for (int i=0; i<a.length; i++) {
			a[i] = (byte) s.charAt(i);
		}
		return a;	
	}
    
	/**
	 * Compute the MD5 hash from a given sequence of bytes
	 * @Return String containing the HEX representation of the HASH
	 */
	public static String md5(byte[] bytes)
	{
		// tables of 6-bit integer values coded as single characters
		String kvalues =
			"\000\001\002\003" + "\004\005\006\007" + "\010\011\012\013" + 
		    "\014\015\016\017" + "\001\006\013\000" + "\005\012\017\004" + 
			"\011\016\003\010" + "\015\002\007\014" + "\005\010\013\016" + 
		    "\001\004\007\012" + "\015\000\003\006" + "\011\014\017\002" + 
			"\000\007\016\005" + "\014\003\012\001" + "\010\017\006\015" + 
		    "\004\013\002\011";
		String svalues =
			"\007\014\021\026" + "\005\011\016\024" + "\004\013\020\027" + 
		    "\006\012\017\025";

		// table of 32-bit integer values coded as two chars (high 16 bit first)
		String Tvalues =
			"\ud76a\ua478" + "\ue8c7\ub756" + "\u2420\u70db" + "\uc1bd\uceee" + 
		    "\uf57c\u0faf" + "\u4787\uc62a" + "\ua830\u4613" + "\ufd46\u9501" + 
			"\u6980\u98d8" + "\u8b44\uf7af" + "\uffff\u5bb1" + "\u895c\ud7be" + 
			"\u6b90\u1122" + "\ufd98\u7193" + "\ua679\u438e" + "\u49b4\u0821" + 
			"\uf61e\u2562" + "\uc040\ub340" + "\u265e\u5a51" + "\ue9b6\uc7aa" + 
			"\ud62f\u105d" + "\u0244\u1453" + "\ud8a1\ue681" + "\ue7d3\ufbc8" + 
			"\u21e1\ucde6" + "\uc337\u07d6" + "\uf4d5\u0d87" + "\u455a\u14ed" + 
			"\ua9e3\ue905" + "\ufcef\ua3f8" + "\u676f\u02d9" + "\u8d2a\u4c8a" + 
			"\ufffa\u3942" + "\u8771\uf681" + "\u6d9d\u6122" + "\ufde5\u380c" + 
			"\ua4be\uea44" + "\u4bde\ucfa9" + "\uf6bb\u4b60" + "\ubebf\ubc70" + 
			"\u289b\u7ec6" + "\ueaa1\u27fa" + "\ud4ef\u3085" + "\u0488\u1d05" + 
			"\ud9d4\ud039" + "\ue6db\u99e5" + "\u1fa2\u7cf8" + "\uc4ac\u5665" + 
			"\uf429\u2244" + "\u432a\uff97" + "\uab94\u23a7" + "\ufc93\ua039" + 
			"\u655b\u59c3" + "\u8f0c\ucc92" + "\uffef\uf47d" + "\u8584\u5dd1" + 
			"\u6fa8\u7e4f" + "\ufe2c\ue6e0" + "\ua301\u4314" + "\u4e08\u11a1" + 
			"\uf753\u7e82" + "\ubd3a\uf235" + "\u2ad7\ud2bb" + "\ueb86\ud391";

		// Step 1 + 2. - create words from bytes
		int bl = bytes.length;
		// determine number of blocks of 16 words
		int[] M = new int[((bl + 9 + 63) / 64) * 16];
		// copy bytes (and append trailing 0x80)
		for (int i = 0; i <= bl; i++)
		{
			int b = i < bl ? (((int) bytes[i]) & 0xff) : 0x80;
			M[i / 4] |= (b << (i * 8));
		}
		// append length in bits at correct place
		M[M.length - 2] = bl * 8;

		// Step 3. initialize MD buffer
		int[] ABCD = new int[]
		{
			0x67452301,
			0xefcdab89,
			0x98badcfe,
			0x10325476
		};
		int[] ABCDcopy = new int[4];

		// Step 4. Process Message in 16-Word Blocks
		for (int i = 0; i < M.length; i += 16)
		{
			// save previous value of buffer
			for (int j = 0; j < 4; j++)
			{
				ABCDcopy[j] = ABCD[j];			// do 4 * 16 operations
			}

            int kSkip = 0;
			for (int j = 0; j < 64; j++)
			{
				int a = ABCD[(64 - j) % 4];
				int b = ABCD[(65 - j) % 4];
				int c = ABCD[(66 - j) % 4];
				int d = ABCD[(67 - j) % 4];
				int k = kvalues.charAt(j+kSkip);
				int s = svalues.charAt((j % 4) + (j / 16) * 4);
				int X = M[i + k];
				int T = (((int) Tvalues.charAt(2 * j)) << 16) | ((int) Tvalues.charAt(2 * j + 1));
				
				int f = 0;
				switch (j / 16)
				{
					case 0:
						f = (b & c) | ((~b) & d);
						break;   // XY v not(X) Z
					case 1:
						f = (b & d) | (c & ~d);
						break;   // XZ v Y not(Z)
					case 2:
						f = b ^ c ^ d;
						break;   // X xor Y xor Z
					case 3:
						f = c ^ (b | ~d);
						break;   // Y xor (X v not(Z))
				}
				
				// Debug.log(j+":"+a+" "+b+" "+c+" "+d+" "+f+" "+X+" "+T);				

				int v = a + f + X + T;
				ABCD[(64 - j) % 4] = (b + ((v << s) | (v >>> (32 - s)))) & 0xffffffff;
			}

			// add previous values to current buffer
			for (int j = 0; j < 4; j++)
			{
				ABCD[j] += ABCDcopy[j];
			}
		}

		// Step 5. Output
        StringBuffer out = new StringBuffer();
        String hex = "0123456789abcdef";
		for (int i = 0; i < 4; i++)
		{
			for (int j = 0; j < 4; j++)
			{
				for (int n = 0; n < 2; n++)
				{
					int idx = (ABCD[i] >> (8 * j + 4 * (1 - n))) & 0xf;
					out.append(hex.substring(idx,idx+1));
				}
			}
		}
		return out.toString();
	}
	
//	static void printints(int[] a, int len)
//	{
//		StringBuffer b = new StringBuffer();
//		for (int i=0; i<len; i++) {
//			b.append(" "+a[i]);
//		}
//		System.out.println(b.toString());
//	}
	
}

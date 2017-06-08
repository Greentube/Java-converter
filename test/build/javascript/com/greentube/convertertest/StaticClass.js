/*
 * StaticClass.java
 *
 * Created on 09. September 2005, 09:57
 */







/**
 *
 * @author  reinhard
 */
//load// java/lang/Object
//complete// com/greentube/convertertest/DummyClass
//complete// java/util/Vector
//complete// java/lang/String

var com_greentube_convertertest_StaticClass = _extendClass(java_lang_Object,  {
initialConstructor_0: function(){
return java_lang_Object.prototype._0.call(this);
}, 
    
    
    
    
    
    
    
    
    
    
    

    
    

    fact_1:function(n)
    {
    	if ((n<2)) {return (1);}
    	return (n*this.fact_1((n-1)));
    },
    hello_0:function()
    {
    	return ("hello");    
    },
    

    stringToBytes_1:function(s)
	{
		var  a = (_createArray((s.length_0()),0));
		for (var  i=(0); (i<a.length_f); i++) {
			a[(i)] = ((_castTObyte) (s.charAt_1((i))));
		}
		return (a);	
	},
    
	/**
	 * Compute the MD5 hash from a given sequence of bytes
	 * @Return String containing the HEX representation of the HASH
	 */
	md5_1:function(bytes)
	{
		// tables of 6-bit integer values coded as singe characters
		var  kvalues =
			("\x00\x01\x02\x03" + "\x04\x05\x06\x07" + "\x08\x09\x0a\x0b" + 
		    "\x0c\x0d\x0e\x0f" + "\x01\x06\x0b\x00" + "\x05\x0a\x0f\x04" + 
			"\x09\x0e\x03\x08" + "\x0d\x02\x07\x0c" + "\x05\x08\x0b\x0e" + 
		    "\x01\x04\x07\x0a" + "\x0d\x00\x03\x06" + "\x09\x0c\x0f\x02" + 
			"\x00\x07\x0e\x05" + "\x0c\x03\x0a\x01" + "\x08\x0f\x06\x0d" + 
		    "\x04\x0b\x02\x09");
		var  svalues =
			("\x07\x0c\x11\x16" + "\x05\x09\x0e\x14" + "\x04\x0b\x10\x17" + 
		    "\x06\x0a\x0f\x15");

		// table of 32-bit integer values coded as two chars (high 16 bit first)
		var  Tvalues =
			((""+String.fromCharCode(55146)+""+String.fromCharCode(42104)+"") + (""+String.fromCharCode(59591)+""+String.fromCharCode(46934)+"") + (""+String.fromCharCode(9248)+""+String.fromCharCode(28891)+"") + (""+String.fromCharCode(49597)+""+String.fromCharCode(52974)+"") + 
		    (""+String.fromCharCode(62844)+""+String.fromCharCode(4015)+"") + (""+String.fromCharCode(18311)+""+String.fromCharCode(50730)+"") + (""+String.fromCharCode(43056)+""+String.fromCharCode(17939)+"") + (""+String.fromCharCode(64838)+""+String.fromCharCode(38145)+"") + 
			(""+String.fromCharCode(27008)+""+String.fromCharCode(39128)+"") + (""+String.fromCharCode(35652)+""+String.fromCharCode(63407)+"") + (""+String.fromCharCode(65535)+""+String.fromCharCode(23473)+"") + (""+String.fromCharCode(35164)+""+String.fromCharCode(55230)+"") + 
			(""+String.fromCharCode(27536)+""+String.fromCharCode(4386)+"") + (""+String.fromCharCode(64920)+""+String.fromCharCode(29075)+"") + (""+String.fromCharCode(42617)+""+String.fromCharCode(17294)+"") + (""+String.fromCharCode(18868)+""+String.fromCharCode(2081)+"") + 
			(""+String.fromCharCode(63006)+""+String.fromCharCode(9570)+"") + (""+String.fromCharCode(49216)+""+String.fromCharCode(45888)+"") + (""+String.fromCharCode(9822)+""+String.fromCharCode(23121)+"") + (""+String.fromCharCode(59830)+""+String.fromCharCode(51114)+"") + 
			(""+String.fromCharCode(54831)+""+String.fromCharCode(4189)+"") + (""+String.fromCharCode(580)+""+String.fromCharCode(5203)+"") + (""+String.fromCharCode(55457)+""+String.fromCharCode(59009)+"") + (""+String.fromCharCode(59347)+""+String.fromCharCode(64456)+"") + 
			(""+String.fromCharCode(8673)+""+String.fromCharCode(52710)+"") + (""+String.fromCharCode(49975)+""+String.fromCharCode(2006)+"") + (""+String.fromCharCode(62677)+""+String.fromCharCode(3463)+"") + (""+String.fromCharCode(17754)+""+String.fromCharCode(5357)+"") + 
			(""+String.fromCharCode(43491)+""+String.fromCharCode(59653)+"") + (""+String.fromCharCode(64751)+""+String.fromCharCode(41976)+"") + (""+String.fromCharCode(26479)+""+String.fromCharCode(729)+"") + (""+String.fromCharCode(36138)+""+String.fromCharCode(19594)+"") + 
			(""+String.fromCharCode(65530)+""+String.fromCharCode(14658)+"") + (""+String.fromCharCode(34673)+""+String.fromCharCode(63105)+"") + (""+String.fromCharCode(28061)+""+String.fromCharCode(24866)+"") + (""+String.fromCharCode(64997)+""+String.fromCharCode(14348)+"") + 
			(""+String.fromCharCode(42174)+""+String.fromCharCode(59972)+"") + (""+String.fromCharCode(19422)+""+String.fromCharCode(53161)+"") + (""+String.fromCharCode(63163)+""+String.fromCharCode(19296)+"") + (""+String.fromCharCode(48831)+""+String.fromCharCode(48240)+"") + 
			(""+String.fromCharCode(10395)+""+String.fromCharCode(32454)+"") + (""+String.fromCharCode(60065)+""+String.fromCharCode(10234)+"") + (""+String.fromCharCode(54511)+""+String.fromCharCode(12421)+"") + (""+String.fromCharCode(1160)+""+String.fromCharCode(7429)+"") + 
			(""+String.fromCharCode(55764)+""+String.fromCharCode(53305)+"") + (""+String.fromCharCode(59099)+""+String.fromCharCode(39397)+"") + (""+String.fromCharCode(8098)+""+String.fromCharCode(31992)+"") + (""+String.fromCharCode(50348)+""+String.fromCharCode(22117)+"") + 
			(""+String.fromCharCode(62505)+""+String.fromCharCode(8772)+"") + (""+String.fromCharCode(17194)+""+String.fromCharCode(65431)+"") + (""+String.fromCharCode(43924)+""+String.fromCharCode(9127)+"") + (""+String.fromCharCode(64659)+""+String.fromCharCode(41017)+"") + 
			(""+String.fromCharCode(25947)+""+String.fromCharCode(22979)+"") + (""+String.fromCharCode(36620)+""+String.fromCharCode(52370)+"") + (""+String.fromCharCode(65519)+""+String.fromCharCode(62589)+"") + (""+String.fromCharCode(34180)+""+String.fromCharCode(24017)+"") + 
			(""+String.fromCharCode(28584)+""+String.fromCharCode(32335)+"") + (""+String.fromCharCode(65068)+""+String.fromCharCode(59104)+"") + (""+String.fromCharCode(41729)+""+String.fromCharCode(17172)+"") + (""+String.fromCharCode(19976)+""+String.fromCharCode(4513)+"") + 
			(""+String.fromCharCode(63315)+""+String.fromCharCode(32386)+"") + (""+String.fromCharCode(48442)+""+String.fromCharCode(62005)+"") + (""+String.fromCharCode(10967)+""+String.fromCharCode(53947)+"") + (""+String.fromCharCode(60294)+""+String.fromCharCode(54161)+""));

		// Step 1 + 2. - create words from bytes
		var  bl = (bytes.length_f);
		// determine number of blocks of 16 words
		var  M = (_createArray((((_divideInteger(((bl + 9 + 63)) , 64))) * 16),0));
		// copy bytes (and append trailing 0x80)
		for (var  i = (0); (i <= bl); i++)
		{
			var  b = (i < bl) ? ((((((_castTOint) (bytes[(i)]))) & 0xff))) : (0x80);
			M[(_divideInteger(i , 4))] |= (((b << ((i * 8)))));
		}
		// append length in bits at correct place
		M[(M.length_f - 2)] = (bl * 8);

		// Step 3. initialize MD buffer
		var  ABCD = ([
			(0x67452301),
			(0xefcdab89),
			(0x98badcfe),
			(0x10325476)
		]);
		var  ABCDcopy = (_createArray((4),0));

		// Step 4. Process Message in 16-Word Blocks
		for (var  i = (0); (i < M.length_f); i = i+((16)))
		{
			// save previous value of buffer
			for (var  j = (0); (j < 4); j++)
			{
				ABCDcopy[(j)] = (ABCD[(j)]);			// do 4 * 16 operations
			}

            var  kSkip = (0);
			for (var  j = (0); (j < 64); j++)
			{
				var  a = (ABCD[(((64 - j)) % 4)]);
				var  b = (ABCD[(((65 - j)) % 4)]);
				var  c = (ABCD[(((66 - j)) % 4)]);
				var  d = (ABCD[(((67 - j)) % 4)]);
				var  k = (kvalues.charAt_1((j+kSkip)));
				var  s = (svalues.charAt_1((((j % 4)) + ((_divideInteger(j , 16))) * 4)));
				var  X = (M[(i + k)]);
				var  T = ((((((_castTOint) (Tvalues.charAt_1((2 * j))))) << 16)) | (((_castTOint) (Tvalues.charAt_1((2 * j + 1))))));
				
				var  f = (0);
				switch ((_divideInteger(j , 16)))
				{
					case (0):
						f = (((b & c)) | ((((~b)) & d)));
						break;   // XY v not(X) Z
					case (1):
						f = (((b & d)) | ((c & ~d)));
						break;   // XZ v Y not(Z)
					case (2):
						f = (b ^ c ^ d);
						break;   // X xor Y xor Z
					case (3):
						f = (c ^ ((b | ~d)));
						break;   // Y xor (X v not(Z))
				}
				
				// Debug.log(j+":"+a+" "+b+" "+c+" "+d+" "+f+" "+X+" "+T);				

				var  v = (a + f + X + T);
				ABCD[(((64 - j)) % 4)] = (((b + ((((v << s)) | ((v >>> ((32 - s)))))))) & 0xffffffff);
			}

			// add previous values to current buffer
			for (var  j = (0); (j < 4); j++)
			{
				ABCD[(j)] = ABCD[(j)]+((ABCDcopy[(j)]));
			}
		}

		// Step 5. Output
        var  out = ((new java_lang_StringBuffer)._0());
        var  hex = ("0123456789abcdef");
		for (var  i = (0); (i < 4); i++)
		{
			for (var  j = (0); (j < 4); j++)
			{
				for (var  n = (0); (n < 2); n++)
				{
					var  idx = (((ABCD[(i)] >> ((8 * j + 4 * ((1 - n)))))) & 0xf);
					out.append_1((hex.substring_2((idx),(idx+1))));
				}
			}
		}
		return (out.toString_0());
	},
	
	printints_2:function(a, len)
	{
		var  b = ((new java_lang_StringBuffer)._0());
		for (var  i=(0); (i<len); i++) {
			b.append_1((" "+a[(i)]));
		}
		java_lang_System.prototype.out_f.println_1((b.toString_0()));
	}
	
},"com_greentube_convertertest_StaticClass",[]);
com_greentube_convertertest_StaticClass.s.a_f = (17);
com_greentube_convertertest_StaticClass.s.b_f = ("hello kitty");
com_greentube_convertertest_StaticClass.s.c_f = ((new java_util_Vector)._0());
com_greentube_convertertest_StaticClass.s.d_f = ((new com_greentube_convertertest_DummyClass)._0());
com_greentube_convertertest_StaticClass.s.e_f=null;
com_greentube_convertertest_StaticClass.s.f_f=0;
com_greentube_convertertest_StaticClass.s.ia_f = [ [ [ (4), (4) ] ,
                              [ (6), (7) ]
                            ],
                            [ [ (11), (123), (123) ] ]
                          ];
com_greentube_convertertest_StaticClass.s.sa_f = [ ("one"), ("two"), ("three") ];
com_greentube_convertertest_StaticClass.s.saa_f = [ [ ("x"), ("y") ], [ ("a"), ("b"), ("c")] ];
com_greentube_convertertest_StaticClass.s.ROWCOUNT_f = [(3), (6), (9), (10)];
com_greentube_convertertest_StaticClass.s.REFERENCES_f = [ [[(0),(1)],[(2),(3)],[(4),(5)]],[[(0),(1)],[(1),(2)],[(3),(4)],[(4),(5)],[(6),(7)],[(7),(8)]],[[(0),(1)],[(1),(2)],[(2),(3)],[(3),(4)],[(4),(5)],[(5),(6)],[(6),(7)],[(7),(8)],[(8),(9)]]];


//reference// java/lang/Math
//reference// java/lang/Integer
//reference// com/greentube/convertertest/DummyClass
//reference// java/lang/System
//reference// java/lang/Byte
//reference// java/lang/Boolean
//reference// java/util/Vector
//reference// java/lang/Object
//reference// java/lang/String
//reference// java/lang/Double
//reference// java/lang/StringBuffer
//reference// java/lang/Runnable

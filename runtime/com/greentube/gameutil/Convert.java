
package com.greentube.gameutil;



public class Convert
{
    private Convert() //avoid instantiation and subclassing
    {
    }
    
    /**
     * Helper function to convert a <code>String</code> to an <code>int</code>.
     * @param s a number represented by decimal digits. May be null, in which case the default value is returned.
     * @param def the default value for conversion
     * @return the integer value (or the value of def on conversion errors)
     */
    public static int stringToInt(String s, int def) {
    	if (s==null || s.length() == 0 || s.charAt(0)=='?') {
    		return def;
    	}
    	try {
    		if (s.startsWith("+")) {
    			return parseInt(s.substring(1).trim());
    		} else {
    			return parseInt(s);
    		}
        } catch (NumberFormatException e) {}
        return def;
    }
    
    /**
     * Helper function to convert a <code>String</code> to an <code>int</code>.
     * @param s A number represented by decimal digits 
     * @return The integer value (or 0 on conversion errors)
     */
    public static int stringToInt(String s)
    {
        return stringToInt(s,0);
    }
    
    /**
     * Helper function to convert a part of a <code>String</code> to an <code>int</code>
     * @param s A number represented by decimal digits
     * @param offset the first char of the substring
     * @param length the length of the substring
     * @param def the default value for conversion
     * @return The int value (or def on conversion errors)
     */    
    public static int stringToInt(String s, int offset, int length, int def) {
        if (s.length()<offset+length) return def;
        return stringToInt(s.substring(offset,offset+length), def);
    }
    
    /**
     * Same as {@link #stringToInt(String s, int offset, int length, int def) stringToInt(String, int, int, int}, 
     * but using 0 as default value for conversion.
     * @param s A number represented by decimal digits
     * @param offset the first char of the substring
     * @param length the length of the substring
     * @return The int value (or 0 on conversion errors)
     */
    public static int stringToInt(String s, int offset, int length)
    {
        return stringToInt(s, offset, length, 0);
    }

    
    /**
     * Helper function to convert a <code>String</code> to a <code>double</code>
     * @param s A number represeneted by decimal digits
     * @param def default value
     * @return The double value (or 0.0 on conversion errors)
     */
    public static double stringToDouble(String s, double def) {
    	if (s==null) return def;
		if (s.startsWith("+")) 
		{	s = s.substring(1);
		}  
		if (s.equals("NaN") || s.equals("Infinity"))
		{	return def;    			
		}
    	try {
    		return Double.parseDouble(s);    		
        } catch (Exception e) {}
        return def;
    }
    
    /**
     * Helper function to convert a <code>String</code> to a <code>double</code>
     * @param s A number represented by decimal digits 
     * @return The double value (or 0.0 on conversion errors)
     */
    public static double stringToDouble(String s) {
        return stringToDouble(s, 0);
    }
    
//    /**
//     * Helper function to convert a <code>String</code> to a <code>boolean</code>
//     * @param s The string containing the printable representation. 
//     * Only a value of "true" (case-insensitive) is correctly recognized. All other
//     * values are evaluated as false. 
//     * @return The boolean value
//     */    
//    public static boolean stringToBoolean(String s) {
//		if (s == null) return false;
//		return Utils.equalsIgnoreCaseAZ(s,"true");
//    }
//    
    
    public static String charToString(char c)
    {
        return String.valueOf(c);
    }
    
    /**
     * Convert a double to an int by rounding half away from zero.  DIN 1333 (kaufmaennisches runden)
     * @param d
     * @return The rounded value 
     */
    public static int doubleToInt(double d)
    {
        return (int) (d>=0?d+0.5:d-0.5);
    }
    
    /**
     * Convert a string holding a hexadecimal representation of a number to an int.
     * @param hex the hexadecimal string to convert to an integer
     * @return number as int
     */
    public static int hexToInt(String hex)
    {
    	try {
    		return Integer.valueOf(hex, 16).intValue();
    	} catch (NumberFormatException e) {
    		return 0;
    	}
    }
        
    /**
     * Takes a double, rounds it to nearest integral value and converts result to a string. 
     */
    public static String doubleToStringRounded(double n)
    {
        return doubleToStringRounded(n, "");
    }
    
    /**
     * Takes a double, rounds it to nearest integral value and converts result to a string. 
     * When given as parameter, thousands separator characters will be added every 3 digits
     * @param n The number to convert  
     * @param tsddot Thousands separator to insert  (give "" when not used) 
     * @return Printable representation 
     */
    public static String doubleToStringRounded(double n, String tsddot)
    {
    	if (n<0) return "-"+printNonnegativeIntegralDouble(Math.round(-n),tsddot);
    	else     return printNonnegativeIntegralDouble(Math.round(n),tsddot);
    }
    
    
    
    
    
    
    /**
     * Helper function to convert a <code>String</code> to a <code>long</code>.
     * This method is available in flash only when the -n switch is turned on. 
     * (for converting server code to integrated flash clients)
     * @param s A number represented by decimal digits 
     * @param def default value for conversion
     * @return The long value (or the value of def on conversion errors)
     */
    public static long stringToLong(String s, long def) 
    {
        if (s==null) return def;

        int radix = 10;
		long result = 0;
		boolean negative = false;
		int i = 0, max = s.length();
		long limit;
		long multmin;
		int digit;
	
		if (max > 0) {
		    if (s.charAt(0) == '-') {
			negative = true;
			limit = Long.MIN_VALUE;
			i++;
		    } else {
			limit = -Long.MAX_VALUE;
		    }
		    multmin = limit / radix;
	            if (i < max) {
	                digit = decimaldigit(s.charAt(i++));
			if (digit < 0) {
			    return def;
			} else {
			    result = -digit;
			}
		    }
		    while (i < max) {
			// Accumulating negatively avoids surprises near MAX_VALUE
			digit = decimaldigit(s.charAt(i++));
			if (digit < 0) {
			    return def;
			}
			if (result < multmin) {
			    return def;
			}
			result *= radix;
			if (result < limit + digit) {
			    return def;
			}
			result -= digit;
		    }
		} else {
		    return def;
		}
		if (negative) {
		    if (i > 1) {
			return result;
		    } else {	/* Only got "-" */
			return def;
		    }
		} else {
		    return -result;
		}
    }

    /**
     * Helper function to convert a <code>String</code> to a <code>long</code>
     * This method is available in flash only when the -n switch is turned on. 
     * (for converting server code to integrated flash clients)
     * @param s A number represented by decimal digits 
     * @return The long value (or 0 on conversion errors)
     */
    public static long stringToLong(String s) 
    {
    	return stringToLong(s,0);
    }
    
    
    
    
    
    private static String printNonnegativeIntegralDouble(double n, String tsddot) {
        if (! (n>=1000 && n<1.0e+100) ) return ""+((int)n);
        double tsd = Math.floor(n/1000.0);

        String rest = "" + ((int)(n-tsd*1000.0));
        while (rest.length()<3) rest = "0" + rest;

        return printNonnegativeIntegralDouble(tsd,tsddot) + tsddot + rest;
    }
    
	
	private static int parseInt(String s) throws NumberFormatException {
		if (s == null) {
			throw new NumberFormatException("null");
		}

		int result = 0;
		boolean negative = false;
		int i = 0, max = s.length();
		int limit;
		int multmin;
		int digit;

		if (max > 0) {
			if (s.charAt(0) == '-') {
				negative = true;
				limit = Integer.MIN_VALUE;
				i++;
			} else {
				limit = -Integer.MAX_VALUE;
			}
			multmin = limit / 10;
			if (i < max) {
				digit = decimaldigit(s.charAt(i++));
				if (digit < 0) {
					throw new NumberFormatException("unknown digit in " + s);
				} else {
					result = -digit;
				}
			}
			while (i < max) {
				// Accumulating negatively avoids surprises near MAX_VALUE
				digit = decimaldigit(s.charAt(i++));
				if (digit < 0) {
					throw new NumberFormatException("unnknown digit in " + s);
				}
				if (result < multmin) {
					throw new NumberFormatException("parse error in " + s);
				}
				result *= 10;
				if (result < limit + digit) {
					throw new NumberFormatException("parse error in " + s);
				}
				result -= digit;
			}
		} else {
			throw new NumberFormatException("parse error in " + s);
		}
		if (negative) {
			if (i > 1) {
				return result;
			} else { /* Only got "-" */
				throw new NumberFormatException("parse error in " + s);
			}
		}
		return -result;
	}
	
    private static int decimaldigit(char d) 
    {
    	if (d>='0' && d<='9') return d - '0';
    	else                  return -1;
    }
    


}

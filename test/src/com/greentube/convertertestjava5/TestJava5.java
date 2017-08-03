package com.greentube.convertertestjava5;
import com.greentube.convertertest.TestJava4;
import static com.greentube.convertertestjava5.StaticExporter.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

public class TestJava5 extends TestJava4 {

	
    public static void main(String[] args) {
    	TestJava4.main(args);   
    	
        System.out.println ("-- converter test suite for java 5" );
        genericstest();
        forinlooptest();
//        autoboxingtest();
        enumtest();
        varargstest();
        staticimportstest();
    }
        
	public static void genericstest() {
/*		
    	System.out.println("- generics");
    	
    	Entry<Integer,Integer> e = new Entry<Integer,Integer>(Integer.valueOf(12),Integer.valueOf(43));
    	assertI(e.getKey().intValue(), 12);
    	assertI(e.getValue().intValue(), 43);

    	Entry<Integer,Integer> d = twice(Integer.valueOf(17));
    	assertI(d.getKey().intValue(), 17);
    	assertI(d.getValue().intValue(), 17);
    	
    	List<Byte> l = new ArrayList<Byte>();
    	l.add(Byte.valueOf((byte)77));
    	l.add(Byte.valueOf((byte)11));
    	assertO(l.toString(), "[77, 11]");
    	assertI(l.get(0).byteValue(), 77);
    	assertI(l.get(1).byteValue(), 11);   
*/    	 	
	}
	private static <T> Entry<T, T> twice(T value) {
	    return new Entry<T, T>(value, value);
	}
	
	public static void forinlooptest() {
    	System.out.println("- for in loop");
    	
    	ArrayList<Integer> l = new ArrayList<Integer>();
    	for (int i:new int[]{7,4,1}) {
    		l.add(Integer.valueOf(i));    		
    	}
    	assertO(l.toString(), "[7, 4, 1]");
    	
    	Vector v = new Vector();
    	for (Integer x: l) {
    		v.add(x);
    	}
    	assertO(v.toString(), "[7, 4, 1]");    
    	
	}
	
//	public static void autoboxingtest() {
//    	System.out.println("- autoboxing");
//    	
//    	List<Integer> l = new ArrayList<Integer>();
//    	l.add(4);
//    	l.add(17);
//    	l.add(99);
//    	assertI(l.get(0), 4);
//    	assertI(l.get(1), 17);
//    	assertI(l.get(2), 99);
//    	
//    	assertI(inc(3),4);
//    	assertI(shl(3),6);
//	}
//	private static Integer inc(Integer a) {
//		return Integer.valueOf(a.intValue()+1);
//	}
//	private static Integer shl(Integer a) {
//		return a << 2;
//	}
	
    public static void enumtest() {
    	System.out.println("- enum");

		Day day1 = Day.MONDAY;
		Day day2 = Day.FRIDAY;
		Day day3 = Day.FRIDAY;
		Day day4 = Day.SUNDAY;
		Day day5  = null;
		
		switch (day1) {
			case MONDAY:  
				break;
			case TUESDAY:  
				assertB(false);
				break;
			case WEDNESDAY:  
				assertB(false);
				break;
			default:      
				assertB(false);
		}
		switch (day2) {
		case MONDAY:  
			assertB(false); 
			break;
		case TUESDAY:  
			assertB(false); 
			break;
		default:      
			assertB(true);
		}
		
		assertB(day1 != day2);
		assertB(day2 == day3);
		assertB(! day1.equals(day2));
		assertB(day1.equals(Day.MONDAY));
		assertB(!day1.equals(Day.TUESDAY));
		assertB(!day2.equals(Day.MONDAY));
		assertB(day2.equals(Day.FRIDAY));
		assertB(day3.equals(day2));
		assertB(!day3.equals(day5));
		
		assertO(day1.name(), "MONDAY");
		assertO(day2.name(), "FRIDAY");
		assertO(Day.TUESDAY.name(), "TUESDAY");
		assertO(Day.TUESDAY.name(), "TUESDAY");
		assertI(day1.ordinal(), 1);
		assertI(day2.ordinal(), 5);
		
		assertB(!day1.isWeekend());
		assertB(day4.isWeekend());
		Day[] w = Day.workingDays();
		assertI(w.length,5);
		assertO(w[0],Day.MONDAY);
		assertO(w[1].toString(),"TUESDAY");
				
		Animal a1 = Animal.ELEPHANT;
		Animal a2 = Animal.GIRAFFE;
		assertB(a1.isMammal());
		assertB(!a1.isReptile());
		assertO(a2.name(), "GIRAFFE");
		assertO(a2.toString(), "GIRAFFE!");
		assertB(Animal.FROG.isAmphibian());
		assertO(Animal.FROG.toString(), "Kermit");
		
		Animal[] animals = Animal.values();
		assertI(animals.length,5);
		assertO(animals[1],Animal.GIRAFFE);
	}
	
	public static void varargstest() {
    	System.out.println("- var args");
    	// implicit use of varargs
    	assertI(sum(), 0);
    	assertI(sum(4), 4);
    	assertI(sum(1,2,3,4,5), 15);
    	assertI(letters(1), 0);
    	assertI(letters(3, "only"), 12);
    	assertI(letters(2,"some","more","advice"), 28);
    	// explicit use
    	int[] i = new int[]{5,6,7};
    	assertI(sum(i), 18);
    	// constructor with variable arguments
    	assertI((new VarArgConstructor(2)).sum(), 2);
    	assertI((new VarArgConstructor(1,2,3)).sum(), 6);
    	assertI((new VarArgConstructor("hoho",2)).sum(), 6);
    	assertI((new VarArgConstructor("hoho",2,19)).sum(), 25);    	
	}
		
	private static int sum(int... a) {
		int s=0;
		for (int i=0; i<a.length; i++) {
			s += a[i];
		}
		return s;
	}
	
	private static int letters(int multiplier, String... a) {
		int s=0;
		for (int i=0; i<a.length; i++) {
			s += multiplier*a[i].length();
		}
		return s;
	}
	
	public static void staticimportstest() {
    	System.out.println("- static imports");
    	
    	assertI(XXX, 3);
    	assertI(YYY, 4);
    	assertI(ZZZ, 5);
    	ZZZ = 7;
    	assertI(ZZZ, 7);    	
	}
	
	
	static class VarArgConstructor {
		
		int[] data;
		public VarArgConstructor(int... par) {
			data = new int[par.length];
			System.arraycopy(par, 0, data,0, par.length);
		}
		
		public VarArgConstructor(String x, int... par) {
			data = new int[par.length+1];
			data[0] = x.length();
			System.arraycopy(par, 0, data,1, par.length);			
		}
		
		public int sum() {
			int s=0;
			for (int i=0; i<data.length; i++) {
				s += data[i];
			}
			return s;
		}
	}
}

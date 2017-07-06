package com.greentube.convertertestjava7;
import java.util.ArrayList;
import java.util.List;

import com.greentube.convertertest.TestJava4;
import com.greentube.convertertestjava5.TestJava5;


public class TestJava7 extends TestJava5 {
	
	final static String one = "one"; 
	
    public static void main(String[] args) {
    	TestJava5.main(args);   
    	
        System.out.println ("-- converter test suite for java 7" );
        binaryliteralstest();
        stringinswitchtest();
        underscoreinnumbertest();
        diamondoperatortest();
    }
    
    public static void binaryliteralstest() {
    	System.out.println("- binary literals");

    	assertI(0B010, 2);
    	assertI(0b0001011010000101000101, 368965);
    	assertI(0b10100001010001011010000101000101, -1589272251);
    }
    
    public static void stringinswitchtest() {
    	System.out.println("- strings in switch");
    	
    	String[] s = { "one","two","three","four", "strange", "fail"};
    	StringBuffer sb = new StringBuffer();
    	for (int i=0; i<s.length; i++) {
    		switch (s[i]) {
    		case one:  sb.append("o"); break;
    		case "two":  sb.append("t"); break;
    		case "three":  sb.append("3"); break;
    		case "four":  sb.append("f"); break;  
    		default: sb.append("x");
    		}
    	}
    	assertO(sb.toString(), "ot3fxx");
    }
    
    public static void underscoreinnumbertest() {
    	System.out.println("- underscore in number");
    	
    	assertI(4_543_432, 4543432);
    	assertI(0x4a_ff_33, 4914995);
    	assertI(0b0_1_1_0, 6);
    }

    public static void diamondoperatortest() {
    	System.out.println("- diamond operator");
    	
    	List<Object> list = new ArrayList<>();
    	list.add("A");
    	assertO(list.toString(), "[A]");
    	
    	List<String> list2 = new ArrayList<>();
    	list2.add("B");
    	list.addAll(list2);
    	assertO(list.toString(), "[A, B]");
    }

}

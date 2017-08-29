/*
 * TestInterface.java
 *
 * Created on 24. Februar 2005, 13:54
 */

package com.greentube.convertertest;


/**
 *
 * @author  reinhard
 */
public interface TestInterface {
    
    int add(int a, int b);
    String hello();
    
    public static int constant1 = 6;
    public static String constant2 = "Hi";
    public static Integer constant3 = Integer.valueOf(44);
    
    public static TestInterface[][][][][][] multiarray = 
    		new TestInterface[1][1][2][1][1][2];
    
    public static boolean 
    	[][][][][][][][][][] [][][][][][][][][][] 
    	[][][][][][][][][][] [][][][][][][][][][]
    	[][][][][][][][][][] [][][][][][][][][][] 
		[][][][][][][][][][] [][][][][][][][][][]
		[][][][][][][][][][] [][][][][][][][][][]
     ultradeepfield = new boolean
     	[1][1][1][1][1][1][1][1][1][1] [1][1][1][1][1][1][1][1][1][1] 
     	[1][1][1][1][1][1][1][1][1][1] [1][1][1][1][1][1][1][1][1][1] 
     	[1][1][1][1][1][1][1][1][1][1] [1][1][1][1][1][1][1][1][1][1]
     	[1][1][1][1][1][1][1][1][1][1] [1][1][1][1][1][1][1][1][1][1]
     	[1][1][1][1][1][1][1][1][1][1] [1][1][1][1][1][1][3][2][2][3] ;    				
}

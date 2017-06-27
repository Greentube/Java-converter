package com.greentube.convertertest;

public class SecondaryClasses 
{
	static int defaultvalue1;
	static String defaultvalue2;
	static int ssx = 99;
	
	S2 s2;
	S3 s3;
	SecondaryClasses() {
		s2 = new S2();
		s3 = new S3();		
	}
	
	String x() {
		return "x="+ssx;
	}
	 
	static String y() {
		return "sx="+ssx;
	}
	
	String testrun() {
		return x()+"|"+y()+"|"+s2.x()+"|"+S2.y()+"|"+s3.x()+"|"+S3.y();
	}
	
	static String statictestrun() {
		return y()+"|"+S2.y()+"|"+S3.y();		
	}
}

class S2 {	
	static int ss2 = 98;

	S2() 
	{}
	String x() {
		return "s2="+ss2;
	}
	static String y() {
		return "ss2="+ss2;	
	}
}

class S3 {
	static int ss3 = 97;

	S3()
	{		
	}	
	String x() {
		return "s3="+ss3;
	}
	static String y() {
		return "ss3="+ss3;	
	}
}

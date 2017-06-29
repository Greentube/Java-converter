package com.greentube.convertertest3;

public class InitSequenceTestC {

	public static final int c = fetch() + 55;
	
	private static int fetch() {
		return InitSequenceTestB.b;
	}
}

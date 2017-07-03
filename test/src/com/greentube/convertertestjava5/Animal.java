package com.greentube.convertertestjava5;

public enum Animal 	{
	  ELEPHANT(),
	  GIRAFFE(),
	  TURTLE(Type.REPTILE),
	  SNAKE(Type.REPTILE),
	  FROG(Type.AMPHIBIAN);

	  private final Type type; 

	  
	  private Animal(Type type) { 
		  this.type = type; 
	  }
	  private Animal() { 
		  this(Type.MAMMAL);
	  }
	  
	  public boolean isMammal() { 
		  return this.type == Type.MAMMAL; 
	  }
	  public boolean isAmphibian() {
		  return this.type == Type.AMPHIBIAN; 
	  }
	  public boolean isReptile() { 
		  return this.type == Type.REPTILE; 
	  }
	  
	  public String toString() {
		  return name() + "!"; 
	  };
}

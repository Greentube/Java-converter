package com.greentube.convertertestjava8;

public class NonstaticLambdas 
{
    int x;
    int y;
    public NonstaticLambdas()
    {     
        x = 3;
        y = 5;   
    }
    
    public int makesum()
    {
        return computeplusxy((a,b,c) -> a+2*b+3*c+4*x);
    }
    
    public int makesum2()
    {
        return computeplusxy(this::multiplywithxy);    
    }
    
    
    private int computeplusxy(TernaryFunction f)
    {
        return f.compute(3,4,5)+x+y;
    }
    
    private int multiplywithxy(int a, int b, int c)
    {
        return a*b*c*x*y;
    }
    
    

}

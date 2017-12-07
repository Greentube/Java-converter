package com.greentube.convertertestjava8;

public interface TeaProvider 
{
    String makeTea(int quantity);
/*    
    static int more(int quantity) 
    {
        return quantity*3;
    }
    
    default String makeMoreTea(int quantity) 
    {
        return makeTea(3*quantity);
    }
*/    
}

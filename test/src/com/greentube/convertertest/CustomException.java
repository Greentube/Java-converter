package com.greentube.convertertest;

public class CustomException extends Exception 
{
    public CustomException(String reason)
    {
        super(reason);
    }

    public static int halve(int i) throws CustomException
    {
        if (i<0) throw new CustomException("Can not halve negative number");
        if (i%2!=0) throw new CustomException("Can not halve odd number"); 
        return i/2;
    }
    
    public static int halveWithLogging(int i, StringBuffer b) throws CustomException
    {
        try 
        {   b.append("start");
        
            int h = halve(i);
            b.append(h);
            return h;
        }
        catch (CustomException e) 
        {   b.append("N");
            return 0;
        }
        finally
        {
            b.append("done");            
        } 
    }
}


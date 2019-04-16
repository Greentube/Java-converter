package com.greentube.hectoc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

// simple HecToc puzzle solver (use as test case for compiler speed)
public class HecToc 
{
    public static void main(String args[])
    {
        Run(new int[]{1,2,3,4,5,6,7}); // warm-up
        Run(new int[]{5,2,6,3,2,1,7});
    }

    public static void Run(int[] digits)
    {
        double start = (double) System.currentTimeMillis(); 
            
        List<Expression> l = new ArrayList<>();
        for (List<Constant> p:computePartitionings(0,digits.length))
        {   for (Expression e:buildExpressions(p)) 
            {   l.add(e); 
            }        
        }
//        for (Expression e:l)
//        {   System.out.println(e);
//        }
        int numexpr = l.size();

        int hits = trycombo(l, digits, 100, !true);
                      
        double end = (double) System.currentTimeMillis(); 
        
        System.out.println("hectoc expressions: "+numexpr);
        System.out.println("hectoc hits: "+ hits);
        System.out.println("hectoc total time: "+(int)(end-start));          
    }
    
    public static int trycombo(List<Expression> l, int[] values, int targetvalue, boolean printit)
    {
        int total = 0;
        int hits = 0;
        
        for (Expression e:l)
        {   total++;
            int v = e.value(values);
            if (v==targetvalue || v==-targetvalue)
            {   if (printit) { System.out.println(e.toString(values) + " = "+v); }
                hits++;
            }
        }
        
        if (printit) { System.out.println(hits+" hits out of "+total); }
        return hits;
    }
    
    
    public static List<List<Constant>> computePartitionings(int firstdigit, int numdigits)
    {
        if (numdigits<1) return new ArrayList<List<Constant>>();
        if (numdigits==1)    
        {   ArrayList<List<Constant>> l = new ArrayList<>();
            l.add(Arrays.asList(new Constant(firstdigit,1)));
            return l;
        }
        List<List<Constant>> l = computePartitionings(firstdigit,numdigits-1);
        int num = l.size();
        for (int i=0; i<num; i++)
        {   List<Constant> parts = l.get(i);
            List<Constant> moreparts = new ArrayList<Constant>(parts);
            moreparts.add(new Constant(firstdigit+numdigits-1,1));
            l.add(moreparts);
            Constant last = parts.get(parts.size()-1);
            parts.set(parts.size()-1,new Constant(last.firstdigit,last.numdigits+1));
        }        
        return l;
    }
    
    public static List<Expression> buildExpressions(List<Constant> parts)
    {
        List<Expression> l = new ArrayList<Expression>();           
        if (parts.size()<=1) 
        {   l.add(parts.get(0));
        }
        else
        {   for (int mid=1; mid<parts.size(); mid++)
            {   List<Expression> l1 = buildExpressions(subList(parts,0,mid));
                List<Expression> l2 = buildExpressions(subList(parts,mid,parts.size()));
                for (Operator op : Operator.values())
                {   for (Expression e1:l1)
                    {   for (Expression e2:l2)
                        {   l.add(new BinaryExpression(e1,e2,op));                                                    
                        }
                    }
                }
            }
        }        
        return l;
    }
    
    public static <T> List<T> subList(List<T> l, int start, int end)
    {
        ArrayList<T> r = new ArrayList<>();
        for (int i=start; i<end; i++)
        {   r.add(l.get(i));
        }
        return r;
    }
}

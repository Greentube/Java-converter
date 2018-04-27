package com.greentube.hectoc;

public class BinaryExpression extends Expression
{
    final Expression a;
    final Expression b;
    final Operator op;
    
    public BinaryExpression(Expression a, Expression b, Operator op)
    {
        this.a = a;
        this.b = b;
        this.op = op;
    }
    public int value(int[] values)
    {
        int v1 = a.value(values);
        int v2 = b.value(values);
        if (v1==UNDEFINED || v2==UNDEFINED) return UNDEFINED;
        return op.apply(v1,v2);
    }
    public String toString()
    {   
        return "("+a.toString()+" "+op.symbol()+" "+b.toString()+")";
    }
    public String toString(int[] values)
    {   
        return "("+a.toString(values)+" "+op.symbol()+" "+b.toString(values)+")";
    }
    
}

namespace java.util.function { public interface Function
{
    System.Object apply(System.Object s);
    Function andThen(Function other);
    Function compose(Function other);
}}
namespace java.util.function { public static class Function_c
{
    public static Function andThen(Function @this, Function other)
    {   if (@this==null) throw new System.NullReferenceException();
        if (other==null) throw new System.ArgumentNullException();
        return new FunctionAndThen(@this,other);
    }
    
    public static Function compose(Function @this, Function other)
    {   if (@this==null) throw new System.NullReferenceException();
        if (other==null) throw new System.ArgumentNullException();
        return new FunctionAndThen(other,@this);
    }

    public static Function identity()
    {   return new FunctionIdentity();
    }
}}

namespace java.util.function { public class FunctionIdentity: Function
{
    public FunctionIdentity() 
    {        
    }
    public virtual System.Object apply(System.Object o)
    {   return o;
    }
    public virtual Function andThen(Function other)
    {   return Function_c.andThen(this,other);
    }
    public virtual Function compose(Function other)
    {   return Function_c.compose(this,other);
    }
}}        

namespace java.util.function { public class FunctionAndThen : FunctionIdentity
{
    private readonly Function a;
    private readonly Function b;
    public FunctionAndThen(Function a, Function b) : base()
    {   this.a = a;
        this.b = b;
    }
    public override System.Object apply(System.Object o)
    {   return b.apply(a.apply(o));
    }
}}        


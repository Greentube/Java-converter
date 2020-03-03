using java.lang;

namespace java.util.function 
{
    public interface Function
    {
        object apply(object s);
        Function andThen(Function other);
        Function compose(Function other);
    }
    
    public static class Function_0009
    {
        public static Function andThen(Function @this, Function other)
        {   
            if (@this==null || other==null) { throw new NullPointerException(); }
            return new FunctionAndThen(@this,other);
        }
        
        public static Function compose(Function @this, Function other)
        {   
            if (@this==null || other==null) { throw new NullPointerException(); }
            return new FunctionAndThen(other,@this);
        }

        public static Function identity()
        {   
            return new FunctionIdentity();
        }
    }

    public class FunctionIdentity: Function
    {
        public FunctionIdentity() 
        {        
        }
        public virtual object apply(object o)
        {   
            return o;
        }
        public virtual Function andThen(Function other)
        {   
            return Function_0009.andThen(this,other);
        }
        public virtual Function compose(Function other)
        {   
            return Function_0009.compose(this,other);
        }
    }        

    public class FunctionAndThen : FunctionIdentity
    {
        private readonly Function a;
        private readonly Function b;
        
        public FunctionAndThen(Function a, Function b) : base()
        {   
            this.a = a;
            this.b = b;
        }
        public override object apply(object o)
        {   
            return b.apply(a.apply(o));
        }
    }
}


using java.lang;

namespace java.util.function 
{ 
    public interface Consumer
    {
        void accept(object s);
        Consumer andThen(Consumer other);
    }

    public static class Consumer_0009
    {
        public static Consumer andThen(Consumer @this, Consumer other)
        {   
            if (@this==null || other==null) { throw new NullPointerException(); }
            return new ConsumerAndThen(@this,other);
        }
    }

    public class ConsumerAndThen : Consumer
    {
        private readonly Consumer a;
        private readonly Consumer b;
        
        public ConsumerAndThen(Consumer a, Consumer b) 
        {   
            this.a = a;
            this.b = b;
        }
        public void accept(object o)
        {   
            a.accept(o);
            b.accept(o);
        }
        public virtual Consumer andThen(Consumer other)
        {   
            return Consumer_0009.andThen(this,other);
        }
    }
}        


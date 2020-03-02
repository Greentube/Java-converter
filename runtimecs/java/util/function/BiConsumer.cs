namespace java.util.function 
{
    public interface BiConsumer
    {
        void accept(System.Object t, System.Object u);
        BiConsumer andThen(BiConsumer other);
    }

    public static class BiConsumer_0009
    {
        public static BiConsumer andThen(BiConsumer @this, BiConsumer other)
        {   
            if (@this==null) { throw new System.NullReferenceException(); }
            if (other==null) { throw new System.ArgumentNullException(); }
            return new BiConsumerAndThen(@this,other);
        }
    }

    public class BiConsumerAndThen : BiConsumer
    {
        private readonly BiConsumer a;
        private readonly BiConsumer b;
        
        public BiConsumerAndThen(BiConsumer a, BiConsumer b) 
        {   
            this.a = a;
            this.b = b;
        }
        public void accept(System.Object t, System.Object u)
        {   
            a.accept(t,u);
            b.accept(t,u);
        }
        public virtual BiConsumer andThen(BiConsumer other)
        {   
            return BiConsumer_0009.andThen(this,other);
        }
    }
}        

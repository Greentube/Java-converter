namespace java.lang 
{
    public interface Iterable
    {
        java.util.Iterator iterator();
        void forEach(java.util.function.Consumer consumer);
    }

    public static class Iterable_0009
    {
        public static void forEach(Iterable @this, java.util.function.Consumer consumer)
        {   
            java.util.Iterator i = @this.iterator();
            while (i.hasNext()) { consumer.accept(i.next()); }
        }
    }
}

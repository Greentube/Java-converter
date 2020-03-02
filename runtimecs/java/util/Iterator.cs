namespace java.util 
{
    public interface Iterator
    {
        bool hasNext();
        System.Object next();
        void remove();
    }

    public static class Iterator_0009
    {
        public static void remove(Iterator @this)
        {   
            throw new java.lang.UnsupportedOperationException();
        }
    }
}

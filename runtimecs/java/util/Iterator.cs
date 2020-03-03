using java.lang;

namespace java.util 
{
    public interface Iterator
    {
        bool hasNext();
        object next();
        void remove();
    }

    public static class Iterator_0009
    {
        public static void remove(Iterator @this)
        {   
            throw new UnsupportedOperationException();
        }
    }
}

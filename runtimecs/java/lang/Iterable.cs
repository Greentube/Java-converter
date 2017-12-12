namespace java.lang { public interface Iterable
{
    java.util.Iterator iterator();
}}
namespace java.lang { public static class Iterable_c
{
    public static void forEach(this Iterable _t, java.util.function.Consumer consumer)
    {   java.util.Iterator i = _t.iterator();
        while (i.hasNext()) 
        {   consumer.accept(i.next());
        }
    }
}}

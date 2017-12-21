namespace java.util { public interface Collection: java.lang.Iterable
{   bool contains(System.Object o);
    bool containsAll(Collection c);
    bool Equals(System.Object o);
    bool removeIf(java.util.function.Predicate predicate);
    int GetHashCode();
    bool isEmpty();
//  Iterator iterator();
    int size();
    System.Object[] toArray();
    System.Object[] toArray(System.Object[]a);
    System.String ToString();
}}
namespace java.util { public static class Collection_c
{
    public static bool removeIf(Collection @this, java.util.function.Predicate predicate)
    {   java.util.Iterator i = @this.iterator();
        bool didremove = false;
        while (i.hasNext()) 
        {   System.Object o = i.next();
            if (predicate.test(o)) 
            {   didremove = true;
                i.remove();
            }
        }
        return didremove;
    }
}}

namespace java.util { public interface Collection: java.lang.Iterable
{   bool contains(System.Object o);
    bool containsAll(Collection c);
    bool Equals(System.Object o);
    int GetHashCode();
    bool isEmpty();
//  Iterator iterator();
    int size();
    System.Object[] toArray();
    System.String ToString();
}}

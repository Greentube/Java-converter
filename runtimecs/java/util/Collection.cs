using java.lang;

namespace java.util 
{ 
    public interface Collection: Iterable
    {   
        bool add(object o);
        bool addAll(Collection c);
        void clear(); 
        bool contains(object o);
        bool containsAll(Collection c);
        bool Equals(object o);
        bool remove(object o);
        bool removeIf(java.util.function.Predicate predicate);
        bool removeAll(Collection c);
        bool retainAll(Collection c);
        int GetHashCode();
        bool isEmpty();
    //  Iterator iterator();
        int size();
        object[] toArray();
        object[] toArray(object[]a);
        string ToString();
    }

    public static class Collection_0009
    {
        public static bool removeIf(Collection @this, java.util.function.Predicate predicate)
        {   
            java.util.Iterator i = @this.iterator();
            bool didremove = false;
            while (i.hasNext()) 
            {   
                object o = i.next();
                if (predicate.test(o)) 
                {   
                    didremove = true;
                    i.remove();
                }
            }
            return didremove;
        }
    }
}


namespace java.util 
{ 
    public interface Collection: java.lang.Iterable
    {   
        bool add(System.Object o);
        bool addAll(Collection c);
        void clear(); 
        bool contains(System.Object o);
        bool containsAll(Collection c);
        bool Equals(System.Object o);
        bool remove(System.Object o);
        bool removeIf(java.util.function.Predicate predicate);
        bool removeAll(Collection c);
        bool retainAll(Collection c);
        int GetHashCode();
        bool isEmpty();
    //  Iterator iterator();
        int size();
        System.Object[] toArray();
        System.Object[] toArray(System.Object[]a);
        System.String ToString();
    }

    public static class Collection_0009
    {
        public static bool removeIf(Collection @this, java.util.function.Predicate predicate)
        {   
            java.util.Iterator i = @this.iterator();
            bool didremove = false;
            while (i.hasNext()) 
            {   
                System.Object o = i.next();
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


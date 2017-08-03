namespace java.util 
{
	public interface List: Collection
	{
        bool add(System.Object e);
        void add(int index, System.Object element);
        bool addAll(Collection c);
        bool addAll(int index, Collection c);
        void clear();
//        bool contains(System.Object o);
//        bool containsAll(Collection c);
//        bool Equals(System.Object o);
        System.Object get(int index);
//        int GetHashCode();
        int indexOf(System.Object o);
//        bool isEmpty();
//        Iterator iterator();
        int lastIndexOf(System.Object o);
        System.Object remove(int index);
        bool remove(System.Object o);
        bool removeAll(Collection c);
        bool retainAll(Collection c);
        System.Object set(int index, System.Object element);
//        int size();
//        System.Object[]	toArray();    
//        System.String ToString();    
    }
}

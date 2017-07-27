namespace java.util 
{
	public interface Queue: Collection
	{
        bool add(System.Object e);
        void clear();
        // bool contains(System.Object o);
        // bool containsAll(Collection c);
        System.Object element();
        // bool Equals(System.Object o);
        // int GetHashCode();
        // bool isEmpty();
        // Iterator iterator();
        bool offer(System.Object e);
        System.Object peek();
        System.Object poll();
        System.Object remove();
        // int size();
        // System.Object[]	toArray();
    }
}

namespace java.util 
{
	public interface Collection
	{
        bool contains(System.Object o);
        bool containsAll(Collection c);
        bool Equals(System.Object o);
        int GetHashCode();
        bool isEmpty();
        Iterator iterator();
        int	size();
        System.Object[] toArray();
	}	
}

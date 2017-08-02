namespace java.util 
{
	public interface Queue: Collection
	{
        bool add(System.Object e);
        void clear();
        System.Object element();
        bool offer(System.Object e);
        System.Object peek();
        System.Object poll();
        System.Object remove();
    }
}

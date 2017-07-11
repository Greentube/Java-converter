namespace java.util 
{
	public interface Deque: Queue
	{
        void addFirst(System.Object e);
        void addLast(System.Object e);
        Iterator descendingIterator();
        System.Object getFirst();
        System.Object getLast();
        bool offerFirst(System.Object e);
        bool offerLast(System.Object e);
        System.Object peekFirst();
        System.Object peekLast();
        System.Object pollFirst();
        System.Object pollLast();
        System.Object pop();
        void push(System.Object e);
        System.Object removeFirst();
        System.Object removeLast();
    }
}

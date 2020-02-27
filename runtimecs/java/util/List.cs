namespace java.util 
{
    public interface List: Collection
    {
    //    bool add(System.Object e);
        void add(int index, System.Object element);
    //    bool addAll(Collection c);
        bool addAll(int index, Collection c);
    //    void clear();
    //   bool contains(System.Object o);
    //   bool containsAll(Collection c);
    //   bool Equals(System.Object o);
        System.Object get(int index);
    //   int GetHashCode();
        int indexOf(System.Object o);
    //   bool isEmpty();
    //   Iterator iterator();
        int lastIndexOf(System.Object o);
    //    bool remove(System.Object o);
        System.Object remove(int index);
    //    bool removeAll(Collection c);
        void replaceAll(java.util.function.UnaryOperator unaryoperator);
    //    bool retainAll(Collection c);
        System.Object set(int index, System.Object element);
        void sort(java.util.Comparator c);
    //   int size();
    //   System.Object[]	toArray();    
    //   System.Object[]	toArray(System.Object[] template);    
    //   System.String ToString();    
    }

    public static class List_c
    {
        public static void sort(List @this, Comparator c)
        {   
            System.Object[] a = @this.toArray();
            int l = a.Length;
            java.util.Arrays.sort(a,0,l,c);
            for (int i=0; i<l; i++) 
            {   
                @this.set(i,a[i]);
            }
        }
        public static void replaceAll(List @this, java.util.function.UnaryOperator unaryoperator)
        {   
            int s = @this.size();
            for (int i=0; i<s; i++)
            {   
                @this.set(i,unaryoperator.apply(@this.get(i)));
            }
        }    
    }
}

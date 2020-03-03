using java.lang;

namespace java.util 
{
    public interface List: Collection
    {
    //    bool add(object e);
        void add(int index, object element);
    //    bool addAll(Collection c);
        bool addAll(int index, Collection c);
    //    void clear();
    //   bool contains(object o);
    //   bool containsAll(Collection c);
    //   bool Equals(object o);
        object get(int index);
    //   int GetHashCode();
        int indexOf(object o);
    //   bool isEmpty();
    //   Iterator iterator();
        int lastIndexOf(object o);
    //    bool remove(object o);
        object remove(int index);
    //    bool removeAll(Collection c);
        void replaceAll(java.util.function.UnaryOperator unaryoperator);
    //    bool retainAll(Collection c);
        object set(int index, object element);
        void sort(java.util.Comparator c);
    //   int size();
    //   object[]	toArray();    
    //   object[]	toArray(object[] template);    
    //   string ToString();    
    }

    public static class List_0009
    {
        public static void sort(List @this, Comparator c)
        {   
            object[] a = @this.toArray();
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

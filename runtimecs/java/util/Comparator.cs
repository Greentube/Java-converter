using java.lang;

namespace java.util 
{
    public interface Comparator
    {
        int compare(object o1, object o2);
        Comparator reversed();
        Comparator thenComparing(Comparator other);
    }

    public static class Comparator_0009
    {
        public static Comparator reversed(Comparator @this)
        {   
            if (@this==null) { throw new NullPointerException(); }
            return new ComparatorReversed(@this);
        }
        public static Comparator thenComparing(Comparator @this, Comparator other)
        {   
            if (@this==null || other==null) { throw new NullPointerException(); }
            return new ComparatorThenComparing(@this, other);
        }
    }

    internal class ComparatorReversed: Comparator
    {
        protected readonly Comparator other;
        
        public ComparatorReversed(Comparator other) 
        {   
            this.other = other;
        }
        public virtual int compare(object o1, object o2)
        {   
            return other.compare(o2,o1);
        }            
        public virtual Comparator thenComparing(Comparator other)
        {   
            return Comparator_0009.thenComparing(this,other);
        }    
        public virtual Comparator reversed()
        {   
            return other;
        }    
    }
            
    internal class ComparatorThenComparing: ComparatorReversed
    {
        private readonly Comparator second;
        public ComparatorThenComparing(Comparator other, Comparator second) : base(other)
        { 
            this.second = second;
        }
        public override int compare(object o1, object o2)
        {   
            int v = other.compare(o1,o2);
            if (v!=0) { return v; }
            return second.compare(o1,o2);
        }    
    }
}

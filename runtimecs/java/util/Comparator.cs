namespace java.util { public interface Comparator
{
    int compare(System.Object o1, System.Object o2);
    Comparator reversed();
    Comparator thenComparing(Comparator other);
}}
namespace java.util { public static class Comparator_c
{
    public static Comparator reversed(Comparator @this)
    {   return new ComparatorReversed(@this);
    }
    public static Comparator thenComparing(Comparator @this, Comparator other)
    {   return new ComparatorThenComparing(@this, other);
    }
}}

namespace java.util { public class ComparatorReversed: Comparator
{
    protected Comparator other;
    public ComparatorReversed(Comparator other) 
    {   this.other = other;
    }
    public virtual int compare(System.Object o1, System.Object o2)
    {   return -other.compare(o1,o2);
    }    
    
    public virtual Comparator thenComparing(Comparator other)
    {   return Comparator_c.thenComparing(this,other);
    }    
    public virtual Comparator reversed()
    {   return Comparator_c.reversed(this);
    }    
}}        
namespace java.util { public class ComparatorThenComparing: ComparatorReversed
{
    Comparator second;
    public ComparatorThenComparing(Comparator other, Comparator second) : base(other)
    { this.second = second;
    }
    public override int compare(System.Object o1, System.Object o2)
    {   int v = other.compare(o1,o2);
        if (v!=0) return v;
        return second.compare(o1,o2);
    }    
}}

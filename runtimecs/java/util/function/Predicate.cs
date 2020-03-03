using java.lang;

namespace java.util.function 
{ 
    public interface Predicate
    {
        Predicate and(Predicate other);
        Predicate negate();
        Predicate or(Predicate other);
        bool test(object s);
    }

    public static class Predicate_0009
    {
        public static Predicate and(Predicate @this, Predicate other)
        {   
            if (@this==null || other==null) { throw new NullPointerException(); }
            return new PredicateAnd(@this,other);
        }
        
        public static Predicate negate(Predicate @this)
        {   
            if (@this==null) { throw new NullPointerException(); }
            return new PredicateNegate(@this);
        }
        
        public static Predicate or(Predicate @this, Predicate other)
        {   
            if (@this==null || other==null) { throw new NullPointerException(); }
            return new PredicateOr(@this,other);
        }
        
        public static Predicate isEqual(object tobj) 
        {   
            return new PredicateIsEqual(tobj);
        }
    }

    public class PredicateIsEqual : Predicate
    {
        private readonly object tobj;
        
        public PredicateIsEqual(object tobj) 
        {   
            this.tobj = tobj;
        }
        public virtual bool test(object o)
        {   
            return tobj==null ? o==null : tobj.Equals(o);
        }
        public virtual Predicate and(Predicate other)
        {   
            return Predicate_0009.and(this,other);
        }
        public virtual Predicate negate()
        {   
            return Predicate_0009.negate(this);
        }
        public virtual Predicate or(Predicate other)
        {   
            return Predicate_0009.or(this,other);
        }
    }        

    public class PredicateAnd : PredicateIsEqual
    {
        private readonly Predicate a;
        private readonly Predicate b;
        
        public PredicateAnd(Predicate a, Predicate b) : base(null)
        {   
            this.a = a;
            this.b = b;
        }
        
        public override bool test(object o)
        {   
            return a.test(o) && b.test(o);
        }
    }        

    public class PredicateNegate : PredicateIsEqual
    {
        private readonly Predicate a;
        
        public PredicateNegate(Predicate a) : base(null)
        {   
            this.a = a;
        }
        public override bool test(object o)
        {   
            return !a.test(o);
        }
    }
            

    public class PredicateOr : PredicateIsEqual
    {
        private readonly Predicate a;
        private readonly Predicate b;
        
        public PredicateOr(Predicate a, Predicate b) : base(null)
        {   
            this.a = a;
            this.b = b;
        }
        public override bool test(object o)
        {   
            return a.test(o) || b.test(o);
        }
    }
}        

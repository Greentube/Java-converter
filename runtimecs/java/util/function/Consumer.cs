namespace java.util.function { public interface Consumer
{
    void accept(System.Object s);
    Consumer andThen(Consumer other);
}}
namespace java.util.function { public static class Consumer_c
{
    public static Consumer andThen(Consumer @this, Consumer other)
    {   return new ConsumerAndThen(@this,other);
    }
}}

namespace java.util.function { public class ConsumerAndThen : Consumer
{
    private Consumer a;
    private Consumer b;
    public ConsumerAndThen(Consumer a, Consumer b) 
    {   this.a = a;
        this.b = b;
    }
    public void accept(System.Object o)
    {   a.accept(o);
        b.accept(o);
    }
    public virtual Consumer andThen(Consumer other)
    {   return Consumer_c.andThen(this,other);
    }
}}        


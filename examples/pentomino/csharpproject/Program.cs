using java.lang;

namespace testcsharp
{
    class Program
    {
        static void Main(string[] args)
        {
            System.Console.WriteLine("Starting to calculate solutions with default choices");
            org.apache.hadoop.examples.dancing.Pentomino model = 
                new org.apache.hadoop.examples.dancing.Pentomino(20,3);
            System.Console.WriteLine(model.solve(new int[]{1,0})+" solutions");
        }
    }
}

using java.lang;

namespace testcsharp
{
    class Program
    {
        static void Main(string[] args)
        {
//            SYSTEM.out_f.redirect(Print);
            com.greentube.test.Launcher.main(args);
//            Performance.main(args);
        }
        
        static void Print(string line)
        {
            System.Console.WriteLine("["+line);
        }
    }
}

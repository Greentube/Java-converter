
namespace testcsharp
{
    class Program
    {
        static void Main(string[] args)
        {
			try
			{
				com.greentube.test.Launcher.main(args);
			}	
			catch (System.Exception e)
			{
				System.Console.WriteLine(e.ToString());
				System.Console.WriteLine(e.StackTrace);
			}
        }
        
    }
}

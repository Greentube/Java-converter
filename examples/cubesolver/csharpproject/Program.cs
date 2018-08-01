using java.lang;

namespace testcsharp
{
    class Program
    {
        static void Main(string[] args)
        {
            string facelets = "UBULURUFU"+"RURFRBRDR"+"FUFLFRFDF"+"DFDLDRDBD"+"LULBLFLDL"+"BUBRBLBDB";
            System.Console.WriteLine("Try to solve the superflip pattern: "+facelets);
            string solution = org.kociemba.twophase.Search.solution(facelets,22,1000.0,false);
            System.Console.WriteLine("Solution: "+solution);            
        }
    }
}

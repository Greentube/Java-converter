
public class Launcher 
{
    public static void main(String[] args) 
    {   if (args.length>0) 
        {   System.out.print("PARAMETER:");
            for (int i=0; i<args.length; i++) 
            {   System.out.print(" ");
                System.out.print(args[i]);
            }
            System.out.println();
        }
        com.greentube.convertertestjava8.TestJava8.main(args);
    }
}

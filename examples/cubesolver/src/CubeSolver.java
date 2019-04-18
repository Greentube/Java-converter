
public class CubeSolver
{
    public static void main(String[] args)
    {
        double start = (double)System.currentTimeMillis();
        String facelets = "UBULURUFU"+"RURFRBRDR"+"FUFLFRFDF"+"DFDLDRDBD"+"LULBLFLDL"+"BUBRBLBDB";
        String solution = org.kociemba.twophase.Search.solution(facelets,22,1000.0,false);
        double end = (double)System.currentTimeMillis();
        System.out.println("Solution: "+solution);
        System.out.println("Solved in "+((int)(end-start))+" ms");
    }
}

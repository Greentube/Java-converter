namespace java.lang 
{
    public class Enum 
    {
        private readonly System.String n;
        private readonly int o;
               
        public Enum(System.String name, int ordinal) 
        {   
            n = name;
            o = ordinal;
        }

        public override bool Equals(System.Object obj) 
        {   
            return this==obj;
        }

        public override int GetHashCode()
        {   
            return o;
        }

        public override System.String ToString()
        {   
            return n;
        }

        public System.String name()
        {   
            return n;
        }

        public int ordinal()
        {   
            return o;
        }
    }
}

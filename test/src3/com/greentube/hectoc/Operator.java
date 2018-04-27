package com.greentube.hectoc;

public enum Operator 
{
    PLUS()
    {   public int apply(int x, int y)
        {   return x+y;
        }
        public String symbol()
        {   return "+";
        }
    },
    MINUS()
    {   public int apply(int x, int y)
        {   return x-y;
        }
        public String symbol()
        {   return "-";
        }
    },
    TIMES()
    {   public int apply(int x, int y)
        {   return x*y;
        }
        public String symbol()
        {   return "*";
        }
    },
    DIVIDE()
    {   public int apply(int x, int y)
        {   if (y==0 || x%y!=0) return Expression.UNDEFINED;
            return x/y;
        }
        public String symbol()
        {   return "/";
        }
    },
    POW()
    {   public int apply(int x, int y)
        {   if (y<0 || y>4) return Expression.UNDEFINED;
            int v = 1;
            for (int i=0; i<y; i++) { v = v*x; }
            return v;
        }
        public String symbol()
        {   return "^";
        }
    },
    POW_MINUS()
    {   public int apply(int x, int y)
        {   y=-y;
            if (y<0 || y>4) return Expression.UNDEFINED;
            int v = 1;
            for (int i=0; i<y; i++) { v = v*x; }
            return v;
        }
        public String symbol()
        {   return "^-";
        }
    };

    abstract public int apply(int x, int y);     
    abstract public String symbol();     
}

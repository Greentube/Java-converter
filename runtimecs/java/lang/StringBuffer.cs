namespace java.lang { public class StringBuffer 
{        
    private readonly System.Text.StringBuilder content;

    public StringBuffer() 
    {   content = new System.Text.StringBuilder();
    }

    public StringBuffer(System.String startValue)
    {   content = new System.Text.StringBuilder(startValue);
    }

    public StringBuffer append(System.Object o)
    {   content.Append(SYSTEM.str(o));
        return this;
    }
        
    public StringBuffer append(bool b)
    {   content.Append(SYSTEM.str(b));
        return this;
    }

    public StringBuffer append(char c)
    {   content.Append(c);
        return this;
    }

    public StringBuffer append(int i)
    {   content.Append(i);
        return this;
    }
        
    public StringBuffer append(double d)
    {   content.Append(SYSTEM.str(d));
        return this;
    }
        
    public int length()
    {   return content.Length;
    }

    public override System.String ToString()
    {   return content.ToString();
    }
}}

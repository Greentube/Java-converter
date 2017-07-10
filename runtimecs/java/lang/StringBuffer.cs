namespace java.lang {

	public class StringBuffer 
	{
        
		private readonly System.Text.StringBuilder content;
	
		public StringBuffer() 
		{
			content = new System.Text.StringBuilder();
		}
		
		public StringBuffer(System.String startValue)
		{
			content = new System.Text.StringBuilder(startValue);
		}

        public StringBuffer append(System.Object o)
		{
            if (o!=null) content.Append(o).ToString();
            return this;
		}
        
	    public StringBuffer append(bool b)
		{
            content.Append(b);
            return this;
		}

	    public StringBuffer append(sbyte b)
		{
            content.Append(b);
            return this;
		}

	    public StringBuffer append(char c)
		{
            content.Append(c);
            return this;
		}

	    public StringBuffer append(int i)
		{
            content.Append(i);
            return this;
		}
        
	    public StringBuffer append(double d)
		{
            content.Append(d);
            return this;
		}
        
		
		public int length()
		{
			return content.Length;
		}
		
		public override System.String ToString()
		{
			return content.ToString();
		}

	
	}
}

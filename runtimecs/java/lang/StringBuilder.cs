namespace java.lang {

	public class StringBuilder 
	{        
		private readonly System.Text.StringBuilder content;
	
		public StringBuilder() 
		{
			content = new System.Text.StringBuilder();
		}
		
		public StringBuilder(System.String startValue)
		{
			content = new System.Text.StringBuilder(startValue);
		}

        public StringBuilder append(System.Object o)
		{
            content.Append(SYSTEM.str(o));
            return this;
		}
        
	    public StringBuilder append(bool b)
		{
            content.Append(SYSTEM.str(b));
            return this;
		}

	    public StringBuilder append(char c)
		{
            content.Append(c);
            return this;
		}

	    public StringBuilder append(int i)
		{
            content.Append(i);
            return this;
		}
        
	    public StringBuilder append(double d)
		{
            content.Append(SYSTEM.str(d));
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

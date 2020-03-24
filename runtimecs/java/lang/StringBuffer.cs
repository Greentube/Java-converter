namespace java.lang 
{
    public class StringBuffer
    {        
        private readonly System.Text.StringBuilder content;

        public StringBuffer() 
        {   
            content = new System.Text.StringBuilder();
        }

        public StringBuffer(string startValue)
        {   
            content = new System.Text.StringBuilder(startValue);
        }

        public StringBuffer append(object o)
        {   
            lock (content)
            {   
                content.Append(SYSTEM.str(o));
            }
            return this;
        }
            
        public StringBuffer append(bool b)
        {   
            lock (content)
            {   
                content.Append(SYSTEM.str(b));
            }
            return this;
        }

        public StringBuffer append(char c)
        {   
            lock (content)
            {   
                content.Append(c);
            }
            return this;
        }

        public StringBuffer append(int i)
        {   
            lock (content)
            {   
                content.Append(i);
            }
            return this;
        }
            
        public StringBuffer append(double d)
        {   
            lock (content)
            {   
                content.Append(SYSTEM.str(d));
            }
            return this;
        }
        
        public StringBuffer append(char[] ca)
        {   
            lock (content)
            {   
                content.Append(ca);
            }
            return this;
        }
        
        public StringBuffer delete(int start, int end)
        {
            lock (content)
            {
                int cl = content.Length;
                if (start<0 || start>cl || start>end) 
                {
                    throw new IndexOutOfBoundsException();
                }
                content.Remove(start, (end<cl?end:cl) - start);
            }
            return this;
        }
            
        public int length()
        {   
            lock (content)
            {   
                return content.Length;
            }
        }

        public void setLength(int l)
        {
        	if (l<0) { throw new IndexOutOfBoundsException(); }
        	lock (content)
        	{	
        		content.Length = l;
        	}
        }

        public override string ToString()
        {   
            lock (content)
            {   
                return content.ToString();
            }
        }
    }
}

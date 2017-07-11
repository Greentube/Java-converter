namespace java.util 
{
	public class CSArrayIterator: Iterator
	{
        private System.Object[] storage;
        private int from;
        private int to;
        private int n;
        
        public CSArrayIterator(System.Object[] storage, int from, int to) {
            this.storage = storage;
            this.from = from;
            this.to = to;
            this.n = from;
        }
        
		public bool hasNext() {
            return this.n < this.to;
        }
        
		public System.Object next() {
            return this.storage[this.n++];
        }
	}	
}

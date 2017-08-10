package com.greentube.convertert€st_3;

public class OuterCläss {
	static int c = 99;

	int p;
	final int l=77;
	
	MemberClass member;
	
	public interface Fetcher {
		void fetch(int[] i);
	}
	
	public static class InnerStatic implements Fetcher {
		int a = 77;
		static int b = 88;
		public InnerStatic(int a) {
			this.a = a;
		}
		public String toString() {
			return "" + a + "," + b+","+c;
		}
		public void fetch(int[] i) {
			i[0] = 1;
		}
	}
	
	
	public class MemberClass {
		int x;
		public MemberClass(int x) {
			this.x = x;
		}
		public String toString() {
			return x + "," + getP();
		}
	}
	
		
	public OuterCläss(int p) {
		this.p = p;
		member = new MemberClass(99);
	}
	public String toString() {
		return "!"+p+":"+member;
	}
	int getP() {
		return p;
	}
	int getL() {
		return l;
	}
	
	public String workWithLocalClass() {
		class LocalClass {
			int x=7;
			int y=3 + p;
			{ y += x; }
		}
		
		LocalClass l = new LocalClass();
		return "L" + l.y;
	}

	public String workWithAnonymousClass() {		
		String r = "A";
		
		Fetcher f = new Fetcher() { 
			public void fetch(int[] i) {
				i[0] = 54;
			}
		};
		
		int[] x = new int[1]; 
		f.fetch(x);
		r = r+x[0];
		
		new Fetcher() {
			public void fetch(int[] i) {
				i[0] = p;
			}			
		}.fetch(x);
		r = r+","+x[0];
		
		new Runnable() {
			public void run() {
				new Runnable() {
					public void run() {
						new Runnable() {
							public void run() {
								p+=getL();
							}
						}.run();
					}
				}.run();
			}
		}.run();
		r = r + "," + p;

		r = r + "," + 
			new MemberClass(7) {
				public String toString() {
					return super.toString() + "-" + p + "-" + l;
				};						
			};
		
		return r;
	}
	
	public Fetcher getFetcher() {		
		return new Fetcher() {
			public void fetch(int[] i) {
				i[0] = p;
			}			
		};
	}
}

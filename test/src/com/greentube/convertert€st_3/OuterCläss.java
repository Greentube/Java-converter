package com.greentube.convertert€st_3;

import java.util.ArrayList;
import java.util.List;

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
		
		List al = new ArrayList();
		al.add("first");
		al.add("second");
		al = new ArrayList(al) {
			public String toString() {
				p=16;
				return "AL: "+super.toString();
			}
		};
		if (al.toString().equals("AL: [first, second]")) {			
			new Runnable() {
				public void run() {
					p++;
				}
			}.run();
				
			final int[] buf = new int[1];
			new Runnable() {
				int[] b;
				public void run() {
					b[0] = p;
				}
				public Runnable init(int[] b) {
					this.b = b;
					return this;
				}
			}.init(buf).run();
			r = r + "," + buf[0];
		}
						
		return r;
	}
	
	public Fetcher getFetcher() {		
		return new Fetcher() {
			public void fetch(int[] i) {
				i[0] = p;
			}			
		};
	}
	
	public static String accessLocalVariablesOfStatic() {
	   final int[] storage = new int[1];
       final String[] storage2 = new String[1];
	   final int[] dummy = new int[]{8};
	   
	   Runnable r = new Runnable() {
	       public void run() {
           storage[0] = 47;
           storage2[0] = "11";
	       }
	   };
	   r.run();
	   return storage[0] + "," + storage2[0] + "," + dummy[0];
	}

    public String accessLocalVariablesOfInstanceMethod() {
       final int[] storage = new int[1];
       final String[] storage2 = new String[1];
       
       Runnable r = new Runnable() {
           public void run() {
               storage[0] = getP();
               storage2[0] = ""+getL();
           }
       };
       r.run();
       return storage[0] + "," + storage2[0];
    }
}

package com.greentube.javaconverter.linker;

/**
 * Facility to compute the transitive closure of a directed graph.
 * Whenever new edges are added to the graph the reachability information
 * for all affected nodes are updated.
 * Additionally compute an ordering of the nodes so that each node
 * appears in the list before any other node that is reachable from this.
 */

public class TransitiveClosure {
	
	// size of the matrix 
	private int n;
	
	// Bit matrix to hold the reachability information
	// For every node there is a bit vector (implemented as int[]) that has
	// a 1 bit for every other node that is reachable from its. 
	// Every node is automatically reachable from itself.
	// This matrix will grow as new dependencies are added.
 	private int[][] reachable;	
	
	public TransitiveClosure()
	{		
		n = 0;
		reachable = new int[0][];
	}
	
	// add reachability relation. all indirect relations are updated.
	public void addEdge(int from, int to) {
		ensureCapacity(Math.max(from,to)+1);
		// do not add twice
		if (isReachable(from,to)) return;
		
		// make every node that can reach the 'from' node be able
		// to reach everything that is reachable from the 'to' node now also
		for (int r=0; r<n; r++) {
			if (isReachable(r,from)) {				
				combine_into(reachable[to],reachable[r]);
			}
		}
	}
	// merge all 1es from the source bit vector into the target bit vector
	private void combine_into(int[]source, int[] target) {
		for (int i=0; i<source.length; i++) {
			target[i] |= source[i];
		}
	}

	// test if one node is somehow reachable from another node 
	public boolean isReachable(int from, int to) {
		return (reachable[from][to/32] & (1<<(to%32))) != 0;
	}
	
	
	// enlarge the matrix if needed
	private void ensureCapacity(int cap) {
		// no need to do anything
		if (cap<=n) return;		
		// create larger array 
		int[][] newmatrix = new int[cap][];		
		// extend every existing row to have space for at least
		// n bits (n/32 rounded up)
		int words = (cap+31)/32;
		for (int r=0; r<n; r++) {
			if (reachable[r].length!=words) {
				int[] newrow = new int[words];
				System.arraycopy(reachable[r],  0,  newrow,  0,  reachable[r].length);
				newmatrix[r] = newrow;
			} else {
				newmatrix[r] = reachable[r];
			}
		}		
		// create the new rows and initialize the main diagonal with 1es
		for (int r=n; r<cap; r++) {
			int[] newrow = new int[words];
			newrow[r/32] = 1 << (r%32);
			newmatrix[r] = newrow;
		}
		// use the new values from now 
		reachable = newmatrix;
		n = cap;
	}
	
	
	// Compute an ordering of the nodes that satisfies all the reachability constraints.
	// In the case that no such ordering can be created because of cycles, a null is returned.
	public int[] computeOrdering() {
		// determine total number of other nodes that must be ordered before any given node
		// (also counting the node itself) 
		int[] blockers = new int[n];
		for (int from=0; from<n; from++) {
			for (int to=0; to<n; to++) {
				if (isReachable(from,to)) blockers[from]++;
			}
		}
		// create the ordering
		int[] ordering = new int[n];		
		for (int numordered=0; numordered<n; numordered++) {
			// try to find an unused node that has no more blockers and can be used
			// as next in sequence
			int taken=-1;
			for (int i=0; i<n; i++) {
				if (blockers[i]==1) {
					taken=i;					
					break;
				}
			}
			if (taken<0) return null;  // no possible node found - ordering failed
			
			// memorize taken node 
			ordering[numordered] = taken;
			
			// decrease blocking count for all other nodes that were blocked by the taken one
			for (int i=0; i<n; i++) {
				if (isReachable(i,taken)) blockers[i]--;
			}
		}
		// finally finished
		return ordering;
	}
	
	// find any pair of nodes which are reachable from one each other, as this 
	// would form a cycle.
	public int[] findCycle() {
		for (int a=0; a<n; a++) {
			for (int b=0; b<n; b++) {
				if (a!=b && isReachable(a,b) && isReachable(b,a)) return new int[]{a,b};
			}
		}
		return null;
	}
	
	
	// --- debug methods ---
	private void print() {
		for (int r=0; r<n; r++) {
			System.out.print((r<10?" ":"")+r+":  ");
			for (int c=0; c<n; c++) {
				System.out.print(isReachable(r,c) ? "1":"0");
			}
			System.out.println();
		}
	}	
	public static void main(String[] args) {
		TransitiveClosure c = new TransitiveClosure();
		c.addEdge(3, 0);
		c.addEdge(4, 7);
		c.addEdge(1, 2);
		c.addEdge(7, 3);
		c.addEdge(6, 3);
		c.print();
		
		int[] o = c.computeOrdering();
		for (int i=0; i<o.length; i++) {
			System.out.print(" "+o[i]);
		}
	}	
}

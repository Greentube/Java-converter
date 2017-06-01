package com.greentube.javaconverter.source2source;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;

public abstract class BigStackAntTask extends Task 
{ 
	
	public abstract void executeWithLargeStack() throws BuildException;
	
    public void execute() throws BuildException
    {
    	DeferedExecutor e = new DeferedExecutor();
    	new Thread(	null, e, "Flash Converter", 1000000). start();
    	e.waitforcompletion();
    }
    
    private class DeferedExecutor implements Runnable
    {
    	Throwable exception = null;
    	boolean done = false;
    	
    	public void run()
    	{	
    		synchronized (this)
    		{	try 
    			{	executeWithLargeStack();
    			} 
    			catch (Throwable e)
    			{	exception = e;    				
    			}
    			done = true;
    			this.notifyAll();
    		}
    	}
    	public void waitforcompletion() throws BuildException
    	{
    		synchronized (this)
    		{
    			while (!done)
    			{	
    				try 
    				{	this.wait();
    				} catch (InterruptedException e) {}
    			}
    			if (exception!=null)
    			{	throw new BuildException(exception);
    			}
    		}
    	}
    }

}

package com.greentube.convertertestjava5;

public class ToDoEntry<KeyType extends TimeStamp, ValueType extends Runnable> 
extends Entry<KeyType,ValueType> 
{
    public ToDoEntry(KeyType key, ValueType value) 
    {   super(key,value);
    }

    public String toString() 
    {   return "TS"+key.timeString()+"-"+value;
    }

    public void run() 
    {   getValue().run();
    }
}

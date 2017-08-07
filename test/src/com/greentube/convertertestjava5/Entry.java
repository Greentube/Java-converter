package com.greentube.convertertestjava5;

public class Entry<KeyType, ValueType> {
	  
    public final KeyType key;
    public final ValueType value;

    public Entry(KeyType key, ValueType value) {  
        this.key = key;
        this.value = value;
    }

    public KeyType getKey() {
        return key;
    }

    public ValueType getValue() {
        return value;
    }

    public String toString() { 
        return "(" + key + ", " + value + ")";  
    }
}


package com.greentube.covarianttest;

public class CoVariant implements ICoVariant
{
    private AssetDatabase assetDatabase;

    public void addComponentFactories(AssetDatabase module)
    {
    }

    public AssetDatabase getAssetDatabase() 
    {
        return assetDatabase;
    }

}
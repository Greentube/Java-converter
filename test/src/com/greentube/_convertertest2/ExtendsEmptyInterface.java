package com.greentube._convertertest2;

import com.greentube.convertertest.EmptyInterface;

public interface ExtendsEmptyInterface extends EmptyInterface
{
    boolean playbackFinished(boolean streamFullyRead, int numberOfEventsRead);
    boolean recordFinished();
}

package com.jelly.crud.dao;

import java.util.ArrayList;
import java.util.Arrays;

public class ArraryListTest {
    public static void main(String[] args) {
        ArrayList<Integer> ints = new ArrayList<Integer>(Arrays.asList(0, 1, 2,
                3, 4, 5, 6));
        // fromIndex low endpoint (inclusive) of the subList
        // toIndex high endpoint (exclusive) of the subList
        ints.subList(2, 4).clear();
        System.out.println(ints);
    }
}

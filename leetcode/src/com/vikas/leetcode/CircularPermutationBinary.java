package com.vikas.leetcode;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CircularPermutationBinary {

   static class Solution {
      public Integer grayCode(int n) {
         return n ^ (n >> 1);
      }

      public List<Integer> circularPermutation(int n, int start) {
         List<Integer> ret = new ArrayList<>();

         // Flag values as used
         final boolean[] isUsed = new boolean[1 << n];
         Arrays.fill(isUsed, false);

         // Insert start
         ret.add(start);
         isUsed[start] = true;

         for (int i = 1; i < (1 << n); i++) {
            final int prev = ret.get(i - 1);
            // For every number we can flip the bits in one of 'n' ways
            for (int j = 0; j < n; j++) {
               final Integer next = prev ^ (int) Math.pow(2, j);
               // Use the 'next' only if it's not used before
               if (!isUsed[next]) {
                  ret.add(next);
                  isUsed[next] = true;
                  // Break from loop if a match is found
                  break;
               }
            }
         }
         return ret;
      }
   }

   public static void main(String[] args) {
      Solution solution = new Solution();
      System.out.println(solution.circularPermutation(3, 2));
//      System.out.println(solution.grayCode(2));
   }
}

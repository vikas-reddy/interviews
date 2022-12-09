package com.vikas.leetcode;

import java.util.Stack;

public class MinimumInsertionsToBalanceParentheses {
   static class Solution {
      public int minInsertions(String s) {
         int total = 0, sum = 0;
         int unbalancedOpens = 0;
         for (char ch : s.toCharArray()) {
            int weight = (ch == '(') ? 2 : -1;

            if (ch == '(') {
               if (sum == 2) { // "(" + "("
                  total += sum;
               } else if (sum == 1) { // "()" + "("
                  total += 1;
                  sum = 2;
               } else if (sum == 0) { // "" + "(" OR "())" + "("
                  sum = 2;
               } else if (sum == -1) { // ")" + "("
                  total += 2;
                  sum = 2;
               }
               unbalancedOpens++;
            } else {
               if (sum == 2) { // "(" + ")"
                  sum = 1;
               } else if (sum == 1) { // "()" + ")"
                  sum = 0;
               } else if (sum == 0) { // "" + ")"
                  sum = -1;
               } else if (sum == -1) { // ")" + ")"
                  if (unbalancedOpens > 0 && total > 2) {
                     unbalancedOpens--;
                     total -= 2;
                  } else {
                     total += 1;
                  }
                  sum = 0;
               }
            }
         }
         return total + sum;
      }
   }

   public static void main(String[] args) {
      Solution s = new Solution();
      System.out.println(s.minInsertions(")))))))"));
//      System.out.println(s.minInsertions("))))()))())"));
//      System.out.println(s.minInsertions("))))()))())"));
   }
}

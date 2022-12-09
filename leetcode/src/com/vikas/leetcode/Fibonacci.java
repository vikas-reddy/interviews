package com.vikas.leetcode;

import java.util.Arrays;

public class Fibonacci {
   // 1, 2, 3, 5, 8, 13, 21, ...
   public static void fib(int n) {
      int prev = 1, curr = 1;
      for (int i = 0; i < n; i++) {
         System.out.print(curr);
         System.out.print(" ");
         int temp = curr;
         curr = curr + prev;
         prev = temp;
      }
   }

   public static int fibRecursive(int n) {
      if (n <= 0) {
         return 0;
      }
      if (n == 1 || n == 2) {
         return n;
      }
      return fibRecursive(n - 2) + fibRecursive(n - 1);
   }

   public static void main(String[] args) {
//      fib(10);
      for(int i = 1; i < 11; i++) {
         System.out.println(fibRecursive(i));
      }
   }
}

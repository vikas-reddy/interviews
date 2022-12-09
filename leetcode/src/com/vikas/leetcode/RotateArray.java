package com.vikas.leetcode;

import java.util.Arrays;

public class RotateArray {
   static class Solution {
      public void rotate(int[] nums, int k) {
         k = k % nums.length;
         if (nums.length <= 1 || k < 1) {
            return;
         }

         // Approach 3: In-place rotate
         // Starting at targetIdx 0, bring the element that should
         // be in this place (from srcIdx), and recursively replace it
         int count = 0;
         for (int startIdx = 0; count < nums.length; startIdx++) {
            int currentIdx = startIdx;
            int prev = nums[startIdx];
            while (true) {
               int nextIdx = (currentIdx + k) % nums.length;

               // Swap
               int temp = nums[nextIdx];
               prev = temp;
               nums[nextIdx] = prev;

               currentIdx = nextIdx;

               count++;

               // Break if we collide for n % k == 0
               if (startIdx == currentIdx) {
                  break;
               }
            }
         }
         int targetIdx = 0;
         for (int i = 0; i < nums.length - 1; i++) {
            final int srcIdx = (targetIdx + nums.length - k) % nums.length;
            final int temp = nums[srcIdx];
            nums[srcIdx] = nums[targetIdx];
            nums[targetIdx] = temp;
            targetIdx = srcIdx;
         }

         /*
         // Approach 2: Rotate with O(n) space
         int[] numsCopy = Arrays.copyOf(nums, nums.length);
         int j = nums.length - k;
         for (int i = 0; i < nums.length; i++, j++) {
            if (j >= nums.length) {
               j = 0;
            }
            nums[i] = numsCopy[j];
         }

         // Approach 1: Rotate 1 step k times
         for (int i = 0; i < k; i++) {
            final int lastElement = nums[nums.length - 1];
            for (int j = nums.length - 1; j > 0; j--) {
               nums[j] = nums[j-1];
            }
            nums[0] = lastElement;
         }
          */
      }
   }

   public static void main(String[] args) {
      Solution solution = new Solution();
      int[] nums = {1, 2, 3, 4};
      solution.rotate(nums, 2);
      System.out.println(Arrays.toString(nums));
   }
}


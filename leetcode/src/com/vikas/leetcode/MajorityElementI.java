package com.vikas.leetcode;

import java.util.Arrays;

public class MajorityElementI {
   private int countElement(int[] nums, int num, int low, int high) {
      int count = 0;
      for (int i = low; i <= high; i++) {
         if (num == nums[i]) {
            count++;
         }
      }
      return count;
   }

   private int majorityElementRecursive(int[] nums, int low, int high) {
      if (low == high) {
         return nums[low];
      }
      int mid = (low + high)/2;
      int left = majorityElementRecursive(nums, low, mid);
      int right = majorityElementRecursive(nums, mid + 1, high);

      if (left == right) {
         return left;
      }
      int leftCount = countElement(nums, left, low, high);
      int rightCount = countElement(nums, right, low, high);

      if (leftCount > rightCount) {
         return left;
      } else {
         return right;
      }
   }

   public int majorityElement(int[] nums) {
      return majorityElementRecursive(nums, 0, nums.length - 1);
   }

   public static void main(String[] args) {
//      int[] nums = {2,2,1,1,1,2,2};
      int[] nums = {2,2,1,1,1,1,2};
      MajorityElementI majorityElementI = new MajorityElementI();
      System.out.println(majorityElementI.majorityElement(nums));
   }
   /*
   n/2
   4/2 = 2
   5/2 = 3
   Half = Math.floor(n/2) + 1
   3 -> L1.5 + 1 = 2
   4 -> L2 + 1 = 3
    */
}

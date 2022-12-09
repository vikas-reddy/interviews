package com.vikas.leetcode;

import java.util.ArrayList;
import java.util.List;

public class HouseRobber {
   /*
   // Recursion; Exponential time
   public int robFromIndex(int[] nums, int idx) {
      if (idx >= nums.length) {
         return 0;
      }
      return Math.max(
            robFromIndex(nums, idx + 2) + nums[idx],
            robFromIndex(nums, idx + 1)
      );
   }

   public int rob(int[] nums) {
      return robFromIndex(nums, 0);
   }
    */

   public int rob(int[] nums) {
      int with = 0;
      int without = 0;
      int max = 0;
      for (int h = 0; h < nums.length; h++) {
         final int prevWith = with;
         final int prevWithout = without;
         with = prevWithout + nums[h];
         without = Math.max(prevWith, prevWithout);
      }
      return Math.max(with, without);
   }

   public static void main(String[] args) {
      List<Integer> arr = new ArrayList<>();
      arr.add(Integer.MIN_VALUE);
      HouseRobber hr = new HouseRobber();
      int[] nums = {114,117,207,117,235,82,90,67,143,146,53,108,200,91,80,223,58,170,110,236,81,90,222,160,165,195,187,199,114,235,197,187,69,129,64,214,228,78,188,67,205,94,205,169,241,202,144,240};
      System.out.println(hr.rob(nums));
   }
}

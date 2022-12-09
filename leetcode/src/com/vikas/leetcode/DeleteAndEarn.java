package com.vikas.leetcode;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DeleteAndEarn {
   public static int deleteAndEarn(int[] nums) {
      int points = 0;

      // Sort array first
      Arrays.sort(nums);

      // Create a list out of it
      List<Integer> numsList = new ArrayList<>();
      for (int num : nums) {
         numsList.add(num);
      }

      while (!numsList.isEmpty()) {
         double maxScore = Double.NEGATIVE_INFINITY;
         int maxScoreIdx = -1;
         // Find the max earning num[i] and delete it
         for (int i = 0; i < numsList.size(); i++) {
            int score = 0;
            int j = i, k = i;
            // Skip equal nums[i] to the left
            while (j >= 0 && numsList.get(j) == numsList.get(i)) {
               j--;
            }
            // Skip equal nums[i] to the right
            while (k < numsList.size() && numsList.get(k) == numsList.get(i)) {
               k++;
            }
            if (j >= 0 && numsList.get(j) == numsList.get(i) - 1) {
               int l = j;
               while (l >= 0 && numsList.get(l) == numsList.get(j)) {
                  l--;
               }
               score = score - numsList.get(j) * (j - l);
            }
            if (k < numsList.size() && numsList.get(k) == numsList.get(i) + 1) {
               int l = k;
               while (l < numsList.size() && numsList.get(l) == numsList.get(k)) {
                  l++;
               }
               score = score - numsList.get(k) * (l - k);
            }
            score += numsList.get(i) * (k - j - 1);
            System.out.println("Score after deleting " + numsList.get(i) + ": " + score);
            if (score > maxScore) {
               maxScore = score;
               maxScoreIdx = i;
            }
         }
         // Delete maxScoreIdx
         points += numsList.get(maxScoreIdx);
         System.out.print("Deleted " + numsList.get(maxScoreIdx) + ": ");
         deleteElement(numsList, numsList.get(maxScoreIdx));

         for (int i = 0; i < numsList.size(); i++) {
            System.out.print(numsList.get(i));
            System.out.print(" ");
         }
         System.out.println();
      }
      return points;
   }

   private static void deleteElement(List<Integer> numsList, Integer num) {
      Integer prev = num - 1, next = num + 1;
      numsList.remove(num);
      while (numsList.remove(prev));
      while (numsList.remove(next));
   }

   public static void main(String[] args) {
      int nums[] = {1, 1, 2, 2, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 9};
      // 9*3 + 7*2 +
      // i = 0 -> j = -1; k = 2
      // i = 1 -> j = -1; k = 2
      // i = 2 -> j = 1; k = 5
      System.out.println(deleteAndEarn(nums));
   }
}

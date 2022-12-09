/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const res = Array(nums.length).fill(1);
  let maxLen = 1;
  for (let r = 1; r < nums.length; r++) {
    for (let l = 0; l < r; l++) {
      if (nums[l] < nums[r] && res[r] < res[l] + 1) {
        res[r] = res[l] + 1;
      }
    }
    maxLen = Math.max(maxLen, res[r]);
  }
  return maxLen;
};
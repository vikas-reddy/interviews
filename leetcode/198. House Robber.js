/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const result = Array(nums.length).fill(0);
  result[0] = nums[0];
  if (nums.length === 1) {
    return result[0];
  }
  result[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    result[i] = Math.max(nums[i] + result[i - 2], result[i - 1]);
  }
  return result[nums.length - 1];
};
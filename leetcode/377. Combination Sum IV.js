/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  const result = Array(target + 1).fill(0);
  result[0] = 1;
  for (let t = 1; t <= target; t++) {
    for (let n = 0; n < nums.length; n++) {
      if (t >= nums[n]) {
        result[t] += result[t - nums[n]];
      }
    }
  }
  return result[target];
};

console.log(combinationSum4(
  [1,2,3], 5
))
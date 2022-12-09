/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let result = 0, sum = 0;
  // Holds sum[0,j]
  const prefixSums = new Map();
  prefixSums.set(0, 1);
  for (let j = 0; j < nums.length; j++) {
    sum += nums[j];
    if (prefixSums.has(sum - k)) {
      result += prefixSums.get(sum - k);
    }
    prefixSums.set(sum, (prefixSums.get(sum) || 0) + 1);
  }
  return result;
};
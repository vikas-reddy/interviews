/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const numIndices = {};
  for (let i = 0; i < nums.length; i++) {
      numIndices[nums[i]] = i;
  }
  
  for (let i = 0; i < nums.length - 1; i++) {
      const secondNumIdx = numIndices[target - nums[i]];
      if (secondNumIdx && secondNumIdx != i) {
          return [i, secondNumIdx];
      }
  }
  return [];
};
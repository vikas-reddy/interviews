/**
 * @param {number[]} nums
 * @return {number}
 */
 var jump = function (nums) {
  /** @type {number[]} */
  const minJumpsCache = new Array(nums.length);
  minJumpsCache[nums.length - 1] = 0;

  for (let i = nums.length - 2; i >= 0; i--) {
    let currentMin = Number.MAX_VALUE;
    for (let j = i + 1; j <= i + nums[i] && j < nums.length; j++) {
      currentMin = Math.min(currentMin, 1 + minJumpsCache[j]);
    }
    minJumpsCache[i] = currentMin;
  }
  return minJumpsCache[0];
};
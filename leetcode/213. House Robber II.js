/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  return Math.max(
    robHelper(nums, 0, nums.length - 2),
    robHelper(nums, 1, nums.length - 1),
  )
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var robHelper = function (nums, low, high) {
  let withCurrent = nums[0];
  let withoutCurrent = 0;
  for (let currentIdx = low + 1; currentIdx <= high; currentIdx++) {
    const prevCurrent = withCurrent;
    const prevWithoutCurrent = withoutCurrent;
    withCurrent = nums[currentIdx] + prevWithoutCurrent;
    withoutCurrent = Math.max(prevCurrent, prevWithoutCurrent);
  }
  return Math.max(withCurrent, withoutCurrent);
};

console.log(rob(
  // [2,3,2]
  // [1,2,3,1]
  [1,2,3]

  // [2,7,9,3,1]
))
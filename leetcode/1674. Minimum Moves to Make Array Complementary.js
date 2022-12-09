/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var minMoves = function (nums, limit) {
  const len = nums.length;
  const halfLen = len / 2;
  const sums = Array(halfLen).fill(0);

  for (let i = 0; i < halfLen; i++) {
    sums[i] = nums[i] + nums[len - 1 - i];
  }

  console.log(sums)
  return len;
};

console.log(minMoves(
  [1,2,4,3], 4
  // [1,2,1,2], 2
))
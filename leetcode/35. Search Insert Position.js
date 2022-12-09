/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let lo = 0, hi = nums.length - 1;
  let mid;
  while (lo <= hi) {
    mid = Math.floor((lo + hi) / 2)
    // console.log(lo, mid, hi)
    if (target === nums[mid]) {
      return mid;
    }
    if (lo === hi) {
      break;
    }
    if (target < nums[mid]) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  // console.log(lo, hi)
  return target < nums[lo]
    ? lo
    : hi + 1;
};

console.log(searchInsert(
  // [1,3,5,6], 5
  // [1,3,5,6], 2
  // [1,3,5,6], 7
  [-20, -10, 0, 10, 20], -1
))
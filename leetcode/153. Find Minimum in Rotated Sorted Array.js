/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    if (nums[l] < nums[r]) {
      return nums[l];
    }
    const m = Math.floor((l + r) / 2);
    if (nums[l] > nums[m]) {
      r = m;
    } else {
      l = m + 1;
    }
  }
  return nums[l];
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMinRecursive = function (nums) {
  const binarySearch = (l, r) => {
    // Edge case. Needed for improper input
    if (l > r) {
      return null;
    }

    if (nums[l] <= nums[r]) {
      return nums[l];
    }

    const m = Math.floor((l + r) / 2);
    if (l === m || nums[l] < nums[m]) {
      return binarySearch(m + 1, r);
    } else {
      return binarySearch(l, m);
    }
  };
  return binarySearch(0, nums.length - 1);
};

console.log(
  findMin(
    [3,4,5,1,2]
  )
)
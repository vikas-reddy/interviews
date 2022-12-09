/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums.length < 3) {
    return [];
  }

  // Sort the array
  nums.sort((a,b) => a - b);

  /** @type {number[][]} */
  const results = [];

  let i = 0;
  while (i < nums.length - 2) {
    // Skip duplicate i's
    if (i > 0 && nums[i] === nums[i-1]) {
      i++;
      continue;
    }

    let j = i + 1;
    let k = nums.length - 1;
    while (j < k) {
      if (nums[i] + nums[j] + nums[k] === 0) {
        results.push([nums[i], nums[j], nums[k]]);
        while (j < k && nums[j] === nums[j+1]) {
          j++;
        }
        while (j < k && nums[k-1] === nums[k]) {
          k--;
        }
        j++;
        k--;
      } else if (nums[i] + nums[j] + nums[k] < 0) {
        j++;
      } else {
        k--;
      }
    }
    i++;
  }
  return results;
};
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  /**
   * Modified binary search. Returns the index of the item if a match is found.
   * Otherwise, returns the index of the previous or next closest element.
   * @param {number} t 
   * @returns 
   */
  const binarySearch = function (t) {
    let l = 0, r = nums.length - 1;
    let idx;
    while (l < r) {
      let m = Math.ceil((l + r) / 2);
      if (t === nums[m]) {
        idx = m;
        break;
      } else if (t < nums[m]) {
        r = m - 1;
      } else {
        l = m + 1;
      }
    }
    idx = idx === undefined ? l : idx;

    // If idx is out of bound, correct it
    if (idx < 0) {
      idx++;
    }
    if (idx > nums.length - 1) {
      idx--;
    }
    return idx;
  };

  const idx = binarySearch(target);

  // If target is not found in nums
  if (nums[idx] !== target) {
    return [-1, -1];
  } else {
    // Since this is an integer array, target - 0.5 and target + 0.5 do not
    // exist. However, we can still use our modified binary search method to get
    // the indexes of the next closest elements
    let lowIdx = binarySearch(target - 0.5);
    let highIdx = binarySearch(target + 0.5);

    // Seek indexes if necessary
    if (nums[lowIdx] !== target) {
      lowIdx++;
    }
    if (nums[highIdx] !== target) {
      highIdx--;
    }

    return [lowIdx, highIdx];
  }
};

console.log(searchRange(
  [5,7,7,7,8,8,10,10,10,10,10,10,10,10,10], 7
))
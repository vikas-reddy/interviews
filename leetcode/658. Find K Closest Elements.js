/**
 * Returns the index of {num} if it's present, otherwise return the closest
 * element's index
 * @param {number[]} arr
 * @param {number} l
 * @param {number} r
 * @param {number} num
 * @return {number}
 */
var binarySearch = function (arr, l, r, num) {
  if (l > r) {
    // Can as well return r, but it doesn't matter, as you will get to know
    // later
    return l;
  }
  const mid = Math.floor((l + r) / 2);
  if (arr[mid] === num) {
    return mid;
  }
  if (num < arr[mid]) {
    return binarySearch(arr, l, mid - 1, num);
  } else {
    return binarySearch(arr, mid + 1, r, num);
  }
};

/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
  let idx = binarySearch(arr, 0, arr.length - 1, x);

  // if idx is out of bound, correct it
  if (idx < 0) {
    idx = 0;
  } else if (idx >= arr.length) {
    idx = arr.length - 1;
  }

  // Create a window of length k.
  // Assumption: k <= arr.length
  let l = idx, r = idx;
  let sum = Math.abs(arr[idx] - x);
  while (r - l + 1 < k) {
    // Move left if possible
    if (l > 0) {
      sum += Math.abs(arr[--l] - x);
      continue;
    }
    // Move right if possible
    if (r < arr.length - 1) {
      sum += Math.abs(arr[++r] - x);
    }
  }

  // Slide the x window left to minimize
  while (l > 0 && 
    (
      Math.abs(arr[l-1] - x) < Math.abs(arr[r] - x) ||
      Math.abs(arr[l-1] - x) === Math.abs(arr[r] - x) && arr[l-1] < arr[r]
    )
  ) {
    l--;
    r--;
  }

  // Slide left to minimize
  while (r < arr.length - 1 &&
    (
      Math.abs(arr[r + 1] - x) < Math.abs(arr[l] - x) ||
      Math.abs(arr[r + 1] - x) === Math.abs(arr[l] - x) && arr[r+1] < arr[l]
    )
  ) {
    l++;
    r++;
  }

  // Return answer
  return arr.slice(l, r + 1);
};

console.log(findClosestElements(
  // [1,2,2,2,2,3,3,30,40,50], 8, 10
  [0, 0, 1, 2, 3, 3, 4, 4, 4, 6, 7, 8], 4, 5
))
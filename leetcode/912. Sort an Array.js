/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  mergeSort(nums, 0, nums.length - 1);
  return nums;
};

/**
 * @param {number[]} nums
 * @param {number} start
 * @param {number} end
 * @return {number[]}
 */
var mergeSort = function (nums, start, end) {
  // console.log(start, end, nums);
  if (start >= end) {
    return;
  }
  const mid = Math.floor((start + end) / 2);
  mergeSort(nums, start, mid);
  mergeSort(nums, mid + 1, end);
  merge(nums, start, end);
}

/**
 * @param {number[]} nums
 * @param {number} start
 * @param {number} end
 * @return {number[]}
 */
var merge = function (nums, start, end) {
  const mid = Math.floor((start + end) / 2);
  const tempArray = new Array(end - start + 1);
  let i = start, j = mid + 1, k = 0;
  while (i <= mid && j <= end) {
    if (nums[i] <= nums[j]) {
      tempArray[k] = nums[i];
      i++;
    } else {
      tempArray[k] = nums[j];
      j++;
    }
    k++;
  }
  while (i <= mid) {
    tempArray[k] = nums[i];
    i++;
    k++;
  }
  while (j <= end) {
    tempArray[k] = nums[j];
    j++;
    k++;
  }

  // Copy array back into original
  for (let i = 0; i < tempArray.length; i++) {
    nums[start + i] = tempArray[i];
  }
}

console.log(
  sortArray(
    [5,2,3,1]
  )
)
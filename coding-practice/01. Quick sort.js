/**
 * @param {number[]} nums
 */
const quickSort = function (nums) {
  const pivotIdx = function (l, r) {
    // Pivot index
    let i = l - 1;
    for (let j = l; j < r; j++) {
      if (nums[j] < nums[r]) {
        i++;
        // [nums[i], nums[j]] = [nums[j], nums[i]];
        const temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
      }
    }
    // [nums[i+1], nums[r]] = [nums[r], nums[i+1]];
    const temp = nums[i+1];
    nums[i+1] = nums[r];
    nums[r] = temp;
    return i + 1;
  }

  const quickSortHelper = function (l, r) {
    if (l < r) {
      const m = pivotIdx(l, r);
      quickSortHelper(l, m - 1);
      quickSortHelper(m + 1, r);
    }
  }
  quickSortHelper(0, nums.length - 1);
}

const nums = [12, 98, 0, 17, 44, 21, 56, 3, 82, 69];
quickSort(nums);
console.log(nums)
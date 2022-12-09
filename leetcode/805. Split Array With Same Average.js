/**
 * @param {number[]} nums
 * @return {boolean}
 */
var splitArraySameAverage = function (nums) {
  const overallAvg = nums.reduce((a,b) => a + b, 0) / nums.length;
  const subset = [];
  let subsetSum = 0;
  const buildSubsetRec = function (idx) {
    if (idx === nums.length) {
      return false;
    }
    const currentAvg = subset ? (subsetSum / subset.length) : 0;
    if (currentAvg === overallAvg) {
      return true;
    }

    // With nums[idx]
    subset.push(nums[idx]);
    subsetSum += nums[idx];
    const withFirst = buildSubsetRec(idx + 1);
    if (withFirst) {
      return true;
    }
    subsetSum -= nums[idx];
    subset.pop();

    // Without nums[idx]
    const withoutFirst = buildSubsetRec(idx + 1);
    return withoutFirst;
  }

  const res = buildSubsetRec(0, overallAvg);
  // console.log(subset);
  return res;
};

console.log(splitArraySameAverage(
  [1,2,3,4,5,6,7,8]
  // [1,3,2]
))
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const counts = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (counts.has(nums[i])) {
      counts.set(nums[i], counts.get(nums[i]) + 1);
    } else {
      counts.set(nums[i], 1);
    }
  }
  const sortedCounts = Array.from(counts.entries())
    .sort((a,b) => b[1] - a[1]);
  const results = [];
  for (let i = 0; i < k; i++) {
    results.push(sortedCounts[i][0]);
  }
  return results;
};

console.log(topKFrequent(
  // [-1,-1], 1
  [1,1,1,2,2,3], 2
))
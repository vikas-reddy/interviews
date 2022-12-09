/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const map = new Map();
  let maxLen = 0;
  for (const num of nums) {
    // Ignore duplicates
    if (map.has(num)) {
      continue;
    }

    const leftLen = map.get(num - 1) || 0;
    const rightLen = map.get(num + 1) || 0;

    const len = leftLen + rightLen + 1;

    maxLen = Math.max(maxLen, len);

    map.set(num, len);
    map.set(num - leftLen, len);
    map.set(num + rightLen, len);
  }
  return maxLen;
};
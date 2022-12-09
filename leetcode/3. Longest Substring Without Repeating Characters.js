/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let maxLength = 0;
  const charCounts = new Map();
  let l = 0;
  for (let r = 0; r < s.length; r++) {
    if (!charCounts.has(s[r])) {
      charCounts.set(s[r], true);
    } else {
      // s[r] is repated somewhere in s[l..(r-1)]
      // we cannot go any further unless the repetition is resolved
      // seek l until repetition is gone
      while (l < r && s[l] !== s[r]) {
        charCounts.delete(s[l]);
        l++;
      }
      l++;
    }
    maxLength = Math.max(maxLength, r - l + 1);
  }
  return maxLength;
};

console.log(
  lengthOfLongestSubstring(
    "msduqthflvdwownkxfehbwemmknqevxypacrreohtekxcezqnlnfrowanniyjeroinogyimyikabewedsurspukjvhuanvuflcwa",
  )
)
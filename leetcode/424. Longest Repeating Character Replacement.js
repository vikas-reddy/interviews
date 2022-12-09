/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  const charCounts = new Array(26);
  let lengthMax = 0;
  let mostFreqCount = 0;
  let l = 0;
  for (let r = 0; r < s.length; r++) {
    const charIdx = s.charCodeAt(r) - ("A").charCodeAt(0);
    if (charCounts[charIdx] === undefined) {
      charCounts[charIdx] = 1;
    } else {
      charCounts[charIdx]++;
    }
    mostFreqCount = Math.max(mostFreqCount, charCounts[charIdx]);

    const replacementsNeeded = (r - l + 1) - mostFreqCount;
    if (replacementsNeeded > k) {
      charCounts[s.charCodeAt(l) - ("A").charCodeAt(0)]--;
      l++;
    }
    lengthMax = Math.max(lengthMax, (r - l + 1));
  }
  return lengthMax;
};

console.log(
  characterReplacement(
    "ABAB", 2
  )
)
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
  const res = Array.from({length: s.length + 1}, (_,i) => {
    return Array(s.length).fill(0);
  })

  for (let i = s.length - 1; i >= 0; i--) {
    // All chars are palindromes
    res[i][i] = 1;
    for (let j = i + 1; j < s.length; j++) {
      if (s[i] === s[j]) {
        res[i][j] = res[i+1][j-1] + 2;
      } else {
        res[i][j] = Math.max(res[i+1][j], res[i][j-1]);
      }
    }
  }
  return res[0][s.length-1];
};

console.log(longestPalindromeSubseq(
  "xyypx"
))
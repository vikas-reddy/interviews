/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length < 2) {
    return s[0];
  }
  let maxPalindromeLength = 1;
  let maxPalindrome = s[0];

  const findPalindrome = function (l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    let currLen = r - l - 1;
    if (currLen > maxPalindromeLength) {
      maxPalindromeLength = currLen;
      maxPalindrome = s.slice(l + 1, r);
    }
  };

  for (let i = 0; i < s.length; i++) {
    findPalindrome(i, i);
    if (i < s.length - 1) {
      findPalindrome(i, i + 1);
    }
  }
  return maxPalindrome;
};

console.log(longestPalindrome(
  // "babad"
  // "cbbd"
  // "aaa"
  // "malayalam"
  "dnncbwoneinoplypwgbwktmvkoimcooyiwirgbxlcttgteqthcvyoueyftiwgwwxvxvg"
))
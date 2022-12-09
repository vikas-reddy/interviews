/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  const countPalindromes = (l, r) => {
    let total = 0;
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      console.log(s.slice(l, r+1));
      l--;
      r++;
      total++;
    }
    return total;
  };

  let total = 0;
  for (let i = 0; i < s.length; i++) {
    total += countPalindromes(i, i);
    if (i < s.length - 1) {
      total += countPalindromes(i, i+1);
    }
  }
  return total;
};

console.log(
  countSubstrings(
    // "aaa"
    // "malayalam"
    "dnncbwoneinoplypwgbwktmvkoimcooyiwirgbxlcttgteqthcvyoueyftiwgwwxvxvg"
  )
)
/**
 * @param {string} s
 * @return {number}
 */
var numSub = function (s) {
  const MODULO = Math.pow(10,9) + 7;
  /**
  111111
  1 - 6
  2 - 5
  3 - 4
  4 - 3
  5 - 2
  6 - 1
  Total = 21
  
  "1...1" substring length n
  1 + 2 + 3 + ... + n = n(n+1)/2
  Ex: 6*7/2 = 21
  Ex: 0110111
  */
  let result = 0;
  let left = 0, right;
  while (left < s.length) {
    // Start of substring
    if (s[left] === "1") {
      let right = left + 1;
      // Seek until we encounter a "0"
      while (right < s.length && s[right] === "1") {
        right++;
      }
      const substringLength = (right - left);
      result += substringLength * (substringLength + 1) / 2;
      result = result % MODULO;
      left = right;
    } else {
      left++;
    }
  }
  return result;
};

console.log(
  numSub(
    // "111111"
    // "0110111"
    "101"
  )
);

let str = "";
for (let i = 0; i < Math.pow(10, 5); i++) {
  str = str + "1";
}
console.log(
  str
)
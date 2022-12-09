/**
 * @param {string} binary
 * @return {number}
 */
var numberOfUniqueGoodSubsequences = function (binary) {
  const len = binary.length;
  const mod = 1e9 + 7;
  /** @type {number} */
  let endsWithZero = 0, endsWithOne = 0;
  /** @type {boolean} */
  let hasZero = false;

  for (let i = 0; i < len; i++) {
    if (binary[i] === '1') {
      endsWithOne = (endsWithOne + endsWithZero + 1) % mod;
    } else {
      endsWithZero = (endsWithOne + endsWithZero) % mod;
      hasZero = true;
    }
  }
  return (endsWithOne + endsWithZero + (hasZero ? 1 : 0)) % mod;
};

console.log(
  "Number:",
  numberOfUniqueGoodSubsequences("1100100010101010100100000111110001111001000010000010010111011")
);
/**
 * @param {string} s
 * @return {number}
 */
var numDecodingsRecursive = function (s) {
  const numDecodingsHelper = function (start) {
    const len = s.length - start;
    if (len === 0) {
      return 1;
    }
    const firstNumber = parseInt(s[start]);
    let result = 0;
    if (firstNumber > 0) {
      result += numDecodingsHelper(start + 1);
    }
    const firstTwo = parseInt(s[start] + s[start+1]);
    if (firstTwo >= 10 && firstTwo <= 26) {
      result += numDecodingsHelper(start + 2);
    }
    return result;
  }
  return numDecodingsHelper(0);
};

/**
 * @param {string} s
 * @return {number}
 */
var numDecodingsWithMemoization = function (s) {
  // All strings have at least 0 decodings
  const decodings = Array(s.length + 1).fill(0);
  // Zero length strings have 1 decoding
  decodings[s.length] = 1;

  for (let i = s.length - 1; i >= 0; i--) {
    const firstNumber = parseInt(s[i]);
    if (firstNumber > 0) {
      decodings[i] += decodings[i+1];
    }
    const firstTwo = parseInt(s[i] + s[i+1]);
    if (firstTwo >= 10 && firstTwo <= 26) {
      decodings[i] += decodings[i+2];
    }
  }
  return decodings[0];
};

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  // All strings have at least 0 decodings
  const decodings = Array(s.length + 1).fill(0);
  decodings[s.length] = 1;

  // Zero length strings have 1 decoding
  let nextNext = 1;

  // If last number is valid
  let next = (parseInt(s[s.length - 1]) > 0 ? 1 : 0);

  let current = 0;

  for (let i = s.length - 2; i >= 0; i--) {
    current = 0;

    const firstNumber = parseInt(s[i]);
    if (firstNumber > 0) {
      current = current + next;
    }

    const firstTwo = parseInt(s[i] + s[i+1]);
    if (firstTwo >= 10 && firstTwo <= 26) {
      decodings[i] += decodings[i+2];
      current += nextNext;
    }

    [next, nextNext] = [current, next];
  }
  return next;
};

console.log(numDecodings(
  "11112232025262223"
));
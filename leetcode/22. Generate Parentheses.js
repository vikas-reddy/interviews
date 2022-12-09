/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  /** @type {string[]} */
  let result = [];

  /** @type {string[]} */
  let str = [];

  /** @type {number} */
  const openBracketsCount = 0;

  /** @type {number} */
  const unMatchedOpenBracketsCount = 0;

  generateParenthesisHelper(n, str, openBracketsCount, unMatchedOpenBracketsCount, result);
  return result;
};

/**
 * @param {number} n
 * @param {string[]} currentStr
 * @param {number} openCount
 * @param {number} closeCount
 * @param {string[]} result
 */
var generateParenthesisHelper = function (n, currentStr, openCount, closeCount, result) {
  if (currentStr.length >= n*2) {
    result.push(currentStr.join(''));
    return;
  }
  if (openCount < n) {
    currentStr.push("(");
    generateParenthesisHelper(n, currentStr, openCount+1, closeCount, result);
    currentStr.pop();
  }
  if (openCount > closeCount && closeCount < n) {
    currentStr.push(")");
    generateParenthesisHelper(n, currentStr, openCount, closeCount+1, result);
    currentStr.pop();
  }
};

console.log(generateParenthesis(4));
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let a = 1, b = 1;
  for (let i = 1; i < n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
};

/**
 * @param {number} n
 * @return {number}
 */
var climbStairsRecursive = function (n) {
  if (n < 2) {
    return 1;
  }
  return climbStairsRecursive(n - 2) + climbStairsRecursive(n - 1);
};

console.log(climbStairs(4))
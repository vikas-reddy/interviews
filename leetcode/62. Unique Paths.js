/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePathsRecursive = function (m, n) {
  const uniquiePathsHelper = function (r, c) {
    // Boundaries
    if (r > m - 1 || c > n - 1) {
      return 0;
    } 
    // Finish line
    if (r === m - 1 && c === n - 1) {
      return 1;
    }
    return uniquiePathsHelper(r + 1, c) + uniquiePathsHelper(r, c + 1);
  }
  return uniquiePathsHelper(0, 0);
};

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  let currRow = Array(n).fill(1);
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      currRow[c] += currRow[c-1];
    }
  }
  return currRow[n-1];
};

console.log(uniquePaths(
  15,15
  // 3,3
))
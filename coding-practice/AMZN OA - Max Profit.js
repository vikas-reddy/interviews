/**
 * 
 * @param {number} k 
 * @param {number[]} profits 
 * @return {number}
 */
function maxProfit(k, profits) {
  const n = profits.length;
  let maxSum = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < Math.floor(n/2); i++) {
    let sum1 = 0, sum2 = 0;
    for (let j = 0; j < k; j++) {
      sum1 += profits[(i+j)%n];
      sum2 += profits[(Math.floor(n/2)+i+j)%n];
      maxSum = Math.max(maxSum, sum1 + sum2);
    }
  }
  return maxSum;
}

console.log(maxProfit(
  2, [1, 5, 1, 3, 7, -3]
))
/**
 * 4, 2, 6
 * [1, 2, 2, 1]
 * 
 * [1, 1, 1, 1] - starting case maxSum = maxSum - n;
 * maxSum = 2;
 */
function maxValue(n: number, index: number, maxSum: number): number {
  let result = 1;
  const maxLeftLength = index;
  const maxRightLength = n - 1 - index;
  let currentLeftLength = 0;
  let currentRightLength = 0;
  maxSum = maxSum - n;
  while (maxSum) {

  }
  return result;
};
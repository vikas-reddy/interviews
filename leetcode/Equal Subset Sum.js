/**
 * @return {boolean}
 * @param {number[]} numbers
 */
var equalSubset = function (numbers) {
  // Sort the array
  numbers.sort((a,b) => a - b);
  const sum = numbers.reduce((a,b) => a+b, 0);
  if (sum % 2) {
    return false;
  }
  return hasSubsetWithSum(numbers, sum/2, 0);
}

/**
 * @return {boolean}
 * @param {number[]} numbers
 * @param {number} sum
 * @param {number} i
 */
var hasSubsetWithSum = function (numbers, sum, i) {
  console.log(sum, i);
  // Base cases
  if (sum === 0) {
    return true;
  }
  if (i >= numbers.length || numbers.length === 0) {
    return false;
  }

  let hasSubset = false;
  if (numbers[i] <= sum) {
    hasSubset = hasSubset || hasSubsetWithSum(numbers, sum - numbers[i], i + 1);
  }
  hasSubset = hasSubset || hasSubsetWithSum(numbers, sum, i + 1);
  return hasSubset;
}

console.log(
  equalSubset(
    // [1,2,3,4]
    // [2, 3, 4, 7]
    [1,1,3,4,7]
  )
)
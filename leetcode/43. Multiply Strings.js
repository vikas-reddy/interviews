/**
 * 
 * @param {string} c 
 * @returns {number}
 */
const charToDigit = function (c) {
  return c.charCodeAt(0) - ("0").charCodeAt(0);
};

/**
 * result = result + num
 * @param {string[]} result 
 * @param {string[]} num 
 */
const addNums = function (result, num) {
  let carry = 0;
  let i = result.length - 1;
  while (i >= 0) {
    const sum = result[i] + num[i] + carry;
    result[i] = sum % 10;
    carry = Math.floor(sum / 10);
    i--;
  }
  if (i >= 0) {
    result[i] = carry;
  }
};

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  const result = Array(num1.length + num2.length).fill(0);

  for (let j = num2.length - 1; j >= 0; j--) {
    const tempResult = Array(num1.length + num2.length).fill(0);
    let k = num1.length + j;
    let carry = 0;
    for (let i = num1.length - 1; i >= 0; i--) {
      const product = charToDigit(num2[j]) * charToDigit(num1[i]) + carry;
      tempResult[k--] = product % 10;
      carry = Math.floor(product / 10);
    }
    tempResult[k] = carry;
    addNums(result, tempResult);
  }

  // All zeros
  const firstNonZeroIdx = result.findIndex(d => d > 0);
  if (firstNonZeroIdx === -1) {
    return "0";
  }

  // Ignore leading zeros
  return result
    .filter((val, idx) => idx >= firstNonZeroIdx)
    .join("");
};

console.log(multiply(
  // "123", "456"
  // "123", "0"
  // "2", "3"
  "9999", "999"
  // "99999999999999999999999", "9"
))
/**
 * @param {number} n
 * @return {number}
 */
var magicalString = function (n) {
  if (n <= 3) {
    return 1;
  }
  const result = [1, 2, 2];
  let next = 1;
  let j = 2;
  for (let i = 3; i < n; i++) {
    const howMany = result[j];

    result.push(next);
    if (howMany === 2) {
      result.push(next);
    }

    next = (next === 1) ? 2 : 1;
    j++;
  }

  let count = 0;
  for (let i = 0; i < n; i++) {
    console.log(result[i])
    if (result[i] === 1) {
      count++;
    }
  }
  return count;
};

console.log(
  magicalString(6)
)
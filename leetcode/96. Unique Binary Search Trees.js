/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  if (n <= 2) {
    return n;
  }
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, 2*(a+b)];
  }
  return b;
};

const numTreesRec = function (n) {
  const mem = Array(n + 1).fill(0);
  mem[0] = 1;
  mem[1] = 1;
  mem[2] = 2;

  for (let i = 3; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      mem[i] += mem[j] * mem[i - 1 - j];
    }
  }
  return mem[n];
};

console.log(numTreesRec(5))
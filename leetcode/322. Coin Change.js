/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const res = Array.from({length: amount + 1}, (_,i) => amount + 1);
  res[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (let c = 0; c < coins.length; c++) {
      if (coins[c] <= a) {
        res[a] = Math.min(res[a], res[a - coins[c]] + 1);
      }
    }
  }
  return res[amount] > amount ? -1 : res[amount];
}

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const mem = Array.from({length: coins.length + 1}, (_,i) => {
    return Array.from({length: amount + 1}, (_,i) => null);
  });

  const coinChangeHelper = function (numCoins, amt) {
    if (numCoins === 0) {
      if (amt === 0) {
        mem[numCoins][amt] = 0;
        return mem[numCoins][amt];
      } else {
        return Number.MAX_SAFE_INTEGER;
      }
    }

    if (mem[numCoins][amt] != null) {
      return mem[numCoins][amt];
    }

    let res;
    if (amt < coins[numCoins - 1]) {
      res = coinChangeHelper(numCoins - 1, amt);
    } else {
      const countWithoutLast = coinChangeHelper(numCoins - 1, amt);
      const countWithLast = coinChangeHelper(numCoins, amt - coins[numCoins - 1]);
      res = Math.min(countWithoutLast, 1 + countWithLast);
    }
    mem[numCoins][amt] = res;
    console.log(numCoins, amt);
    return res;
  };
  const count = coinChangeHelper(coins.length, amount);
  return count === Number.MAX_SAFE_INTEGER ? -1 : count;
};


console.log(coinChange(
  [1,2,5], 11
  // [2], 3
))
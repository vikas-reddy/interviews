/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (prices.length < 1) {
    return 0;
  }
  let minPrice = prices[0];
  let totalProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    // Include prices[i] in the profit, OR
    if (prices[i] - minPrice > totalProfit) {
      totalProfit = prices[i] - minPrice;
    }
    // Store prices[i] if it's less than minPrice
    else if (prices[i] < minPrice) {
      minPrice = prices[i];
    }
  }
  return totalProfit;
};
/**
products = [['10', 'do', 'd1'], ['15', 'EMPTY', 'EMPTY'], ['20', 'd1', 'EMPTY']]
discounts = [['d0','1','27'], ['d1', '2', '5']]
*/

const DISCOUNT_TYPE_EMPTY = 'EMPTY';
const DISCOUNT_TYPE_PERCENTAGE = '1';
const DISCOUNT_TYPE_FIXED_DISCOUNT = '2';

/**
 * @param {string[]} products 
 * @param {string[]} discounts 
 * @return {number}
 */
function findLowestPrice(products, discounts) {
  const discounts = new Map();
  for (const discount of discounts) {
    const [tag, type, amount] = discount;
    discounts.set(tag, [type, amount]);
  }

  const totalCostToCompany = 0;
  for (const product of products) {
    const [price, ...tags] = product;
    const soldPrice = Math.min(...tags.map(tag => {
      const [discountType, amount] = discounts[tag];
      switch (discountType) {
        case DISCOUNT_TYPE_EMPTY:
          return price;
        case DISCOUNT_TYPE_PERCENTAGE:
          return Math.round(parseInt(price) * (100 - parseInt(amount)));
        case DISCOUNT_TYPE_FIXED_DISCOUNT:
          return parseInt(price) - parseInt(amount);
      }
    }));
    totalCostToCompany += soldPrice;
  }
  return totalCostToCompany;
}
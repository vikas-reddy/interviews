/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  /**
   * Example:
   * nums: [a,b,c,d,e,f,g,h,i,j]
   * prefixProducts: [1,a,ab,abc,abcd,abcde,abcdef,abcdefg,abcdefgh,abcdefghi]
   * suffixProducts: [bcdefghij,cdefghij,defghij,efghij,fghij,ghij,hij,ij,j,1]
   */

  /* WORKING O(n) space and time
  const suffixProducts = new Array(nums.length);
  suffixProducts[nums.length - 1] = 1;

  for (let i = nums.length - 2; i >= 0; i--) {
    suffixProducts[i] = suffixProducts[i+1] * nums[i+1];
  }

  const result = new Array(nums.length);
  let prefixProduct = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = prefixProduct * suffixProducts[i];
    prefixProduct = prefixProduct * nums[i];
  }
  return result;
  */

  const result = new Array(nums.length);
  result[nums.length - 1] = 1;

  for (let i = nums.length - 2; i >= 0; i--) {
    result[i] = result[i+1] * nums[i+1];
  }

  let prefixProduct = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = prefixProduct * result[i];
    prefixProduct = prefixProduct * nums[i];
  }
  return result;
};
/** @type {number[]} */
const res = [];
/** @type {number[]} */
let minRes = [];

/**
 * @param {TreeNode} root
 * @return {string}
 */
var smallestFromLeaf = function (root) {
  smallestFromLeafHelper(root);
  return convertToString(minRes);
};

/**
 * 
 * @param {number[]} revCharCodes
 * @return {string}
 */
var convertToString = function (revCharCodes) {
  const charCodes = [...revCharCodes].reverse();
  return charCodes
    .map(charCode => String.fromCharCode("a".charCodeAt(0) + charCode))
    .join('');
};

/**
 * @param {TreeNode} root
 * @return {string}
 */
var smallestFromLeafHelper = function (root) {
  if (root === null) {
    return;
  }
  res.push(root.val);
  // Leaf node
  if (root.left === null && root.right === null) {
    if (minRes.length === 0 || convertToString(res) < convertToString(minRes)) {
      minRes = [...res];
    }
  }
  smallestFromLeafHelper(root.left);
  smallestFromLeafHelper(root.right);
  res.pop();
};


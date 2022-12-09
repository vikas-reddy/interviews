/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const isValidBSTWithInterval = (r, min, max) => {
    if (!r) {
      return true;
    }
    if (min !== null && r.val <= min || max !== null && r.val >= max) {
      return false;
    }
    return isValidBSTWithInterval(r.left, min, r.val) &&
      isValidBSTWithInterval(r.right, r.val, max);
  };
  return isValidBSTWithInterval(root, null, null);
};

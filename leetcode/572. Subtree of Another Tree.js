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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  const subRootEquivalents = [];
  findRootEquivalent(root, subRoot, subRootEquivalents);
  for (const subRootEquivalent of subRootEquivalents) {
    const matchFound = isSameTree(subRootEquivalent, subRoot);
    if (matchFound) {
      return true;
    }
  }
  return false;
};

/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @param {TreeNode[]} subRootEquivalents
 */
var findRootEquivalent = function (root, subRoot, subRootEquivalents) {
  if (root == null || subRoot == null) {
    return;
  }
  if (root.val === subRoot.val) {
    subRootEquivalents.push(root);
  }
  findRootEquivalent(root.left, subRoot, subRootEquivalents) ||
    findRootEquivalent(root.right, subRoot, subRootEquivalents);
}

/**
 * 
 * @param {TreeNode} p 
 * @param {TreeNode} q 
 */
var isSameTree = function (p, q) {
  if (p == null && q == null) {
    return true;
  }
  if (p == null || q == null) {
    return false;
  }
  return p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right);
}
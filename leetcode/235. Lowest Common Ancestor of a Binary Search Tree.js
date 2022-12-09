function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}


/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (root == null || p == null || q == null) {
    return null;
  }
  while (root) {
    const [a, b] = [p.val, q.val].sort((a,b) => a-b);
    if (root.val > a && root.val > b) {
      root = root.left;
    } else if (root.val < a && root.val < b) {
      root = root.right;
    } else {
      break;
    }
  }
  return root;
};

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestorRecursive = function (root, p, q) {
  if (root == null) {
    return null;
  }
  // p < q or p > q
  if (p < root.val && root.val < q || q > root.val && root.val < p) {
    return root;
  }
  if (p < root.val && q < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  }
  if (p > root.val && q > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }
  return null
};
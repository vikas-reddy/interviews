function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  let maxSum = Number.MIN_VALUE;

  var maxPathDown = function (root) {
    if (root == null) {
      return 0;
    }
    const leftMax = Math.max(0, maxPathDown(root.left));
    const rightMax = Math.max(0, maxPathDown(root.right));
    maxSum = Math.max(maxSum, leftMax + rightMax + root.val);
    return root.val + Math.max(leftMax, rightMax);
  };

  // The desired max path has just one hill. So, one common ancestor.  For all
  // ancestors (root), calculate max if they are included in the sum
  maxPathDown(root);
  return maxSum;
};


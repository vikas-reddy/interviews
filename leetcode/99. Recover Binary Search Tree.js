function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function (root) {
  const dips = [];
  let prev = null;

  const inOrder = function (node) {
    if (node == null) {
      return;
    }
    inOrder(node.left);
    if (prev && prev.val > node.val) {
      dips.push([prev, node]);
    }
    prev = node;
    inOrder(node.right);
  };

  inOrder(root);

  const swapNodes = function (node1, node2) {
    [node1.val, node2.val] = [node2.val, node1.val];
  };

  if (dips.length === 1) {
    swapNodes(...dips[0]);
  } else {
    swapNodes(dips[0][0], dips[1][1])
  }
};
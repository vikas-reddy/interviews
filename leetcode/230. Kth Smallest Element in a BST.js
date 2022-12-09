/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  let result = null;
  let count = 0;

  const inOrder = function (root) {
    if (root == null) {
      return;
    }
    // in-order: left, root, right
    inOrder(root.left);
    count++;
    if (count === k) {
      result = root.val;
      return;
    }
    inOrder(root.right);
  };

  inOrder(root);
  return result;
};

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallestOld = function (root, k) {
  let nextSmallest = smallest(root);
  for (let i = 1; i < k; i++) {
    let parentOfNextSmallest = parent(root, nextSmallest);
    if (nextSmallest.right) {
      nextSmallest = largest(nextSmallest.right);
    } else {
      nextSmallest = parentOfNextSmallest || root;
    }
  }
  return nextSmallest.val;
};

/**
 * @param {TreeNode} root
 * @param {TreeNode} node
 * @return {TreeNode}
 */
var parent = function (root, node) {
  if (root.left === node || root.right === node) {
    return root;
  }
  if (node.val < root.val) {
    return parent(root.left, node);
  } else if (node.val > root.val) {
    return parent(root.right, node);
  }
};

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var smallest = function (root) {
  while (root.left) {
    root = root.left;
  }
  return root;
};

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var largest = function (root) {
  while (root.right) {
    root = root.right;
  }
  return root;
};



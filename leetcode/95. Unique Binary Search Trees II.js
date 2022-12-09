function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
  const result = Array.from({ length: n + 1 }, _ => []);

  result[0] = [null];
  result[1] = [new TreeNode(1)];
  result[2] = [
    new TreeNode(1, null, new TreeNode(2)),
    new TreeNode(2, new TreeNode(1), null)
  ];

  const cloneAndIncrement = function (root, n) {
    if (root == null) {
      return null;
    }
    const clonedRoot = new TreeNode(root.val + n);
    clonedRoot.left = cloneAndIncrement(root.left, n);
    clonedRoot.right = cloneAndIncrement(root.right, n);
    return clonedRoot;
  }

  for (let i = 3; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      result[j-1].forEach(leftSubtree => {
        result[i-j].forEach(rightSubtree => {
          const root = new TreeNode(j);
          root.left = cloneAndIncrement(leftSubtree, 0);
          root.right = cloneAndIncrement(rightSubtree, j);
          result[i].push(root);
        })
      })
    }
  }
  return result[n];
};
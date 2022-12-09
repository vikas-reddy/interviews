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
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
  const xMap = new Map();
  const queue = []
  queue.push([root, 0, 0])
  while (queue.length) {
    const [node, x, y] = queue.shift()
    if (!node) {
      continue
    }

    if (!xMap.has(x)) {
      xMap.set(x, [])
    }
    xMap.get(x).push([node.val, x, y])

    queue.push([node.left, x-1, y+1])
    queue.push([node.right, x-1, y+1])
  }

  for (const [x, nodes] of xMap) {
    nodes.sort((a,b) => {
      return a[1] !== b[1]
        ? a[1] - b[1]
        : a[0] - b[0]
    })
  }

  return [...xMap.entries()]
    .sort((a,b) => a[0] - b[0])
    .map(([x, nodes]) => {
      nodes.map(node => node[0]).flat()
    })
};
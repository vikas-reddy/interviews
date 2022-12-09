// Definition for a Node.
/**
 * 
 * @param {number} val 
 * @param {Node[]} neighbors 
 */
function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
};

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
  /** @type {Node[]} */
  const visitedNodes = Array.from({ length: 101 }, (_, i) => null);
  return dfs(node, visitedNodes);
};

/**
 * 
 * @param {Node} node
 * @param {Node[]} visitedNodes
 * @return {Node}
 */
var dfs = function (node, visitedNodes) {
  console.log(node);
  if (node == null) {
    return null;
  }
  const newNode = new Node(node.val);
  visitedNodes[node.val] = newNode;
  for (const neighbor of node.neighbors) {
    let newNeighbor = visitedNodes[neighbor.val];
    if (!newNeighbor) {
      newNeighbor = dfs(neighbor, visitedNodes);
    }
    newNode.neighbors.push(newNeighbor);
  }
  return newNode;
}
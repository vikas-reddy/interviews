/**
 * @param n: An integer
 * @param edges: a list of undirected edges
 * @return: true if it's a valid tree, or false
 */
function validTree(n, edges) {
  // write your code here
  const adjList = Array.from({ length: n }, () => []);

  for (const edge of edges) {
    const [u, v] = [...edge].sort((a, b) => a - b);
    adjList[u].push(v);
    adjList[v].push(u);
  }

  /**
   * 0 -> [1,2,3]
   * 1 -> [0,4]
   * 2 -> [0]
   * 3 -> [0]
   * 4 -> [0]
   * 
   * 0 -> [1]
   * 1 -> [0,2,3,4]
   * 2 -> [1,3]
   * 3 -> [1,2]
   * 4 -> [1]
   */

  const visited = new Set();

  const hasCycle = function (node, parent) {
    // End case
    if (visited.has(node)) {
      return true;
    }

    visited.add(node);
    for (const next of adjList[node]) {
      if (next === parent) {
        continue;
      }
      if (hasCycle(next, node)) {
        return true;
      }
    }
    return false;
  };
  return !hasCycle(0, -1) && visited.size === n;
}

console.log(validTree(
  5, [[0, 1], [0, 2], [0, 3], [1, 4]]
))

console.log(validTree(
  5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
))

console.log(validTree(
  5, [[0, 1], [1, 2], [3, 4]]
))

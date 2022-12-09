/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {

  /** @type {number[][]} */
  const edges = Array.from({length: numCourses}, (_,i) => []);

  /** @type {number[]} */
  const incomingEdges = Array.from({length: numCourses}, (_,i) => 0);

  for (const prerequisite of prerequisites) {
    // b depends on a:  a ---> b
    const [b, a] = prerequisite;
    edges[a].push(b);
    incomingEdges[b]++;
  }

  /** @type {number[]} */
  const queue = [];

  // Store nodes without incoming edges
  incomingEdges.forEach((incomingEdge, idx) => {
    if (incomingEdge === 0) {
      queue.push(idx);
    }
  });

  let edgesVisited = 0;
  while (queue.length) {
    const node = queue.pop();
    for (const neighbor of edges[node]) {
      edgesVisited++;
      incomingEdges[neighbor]--;
      if (incomingEdges[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  // Can finish if all edges can be traversed with BFS
  return (edgesVisited === prerequisites.length)
};

console.log(canFinish(
  2, [[1,0],[0,1]]
))
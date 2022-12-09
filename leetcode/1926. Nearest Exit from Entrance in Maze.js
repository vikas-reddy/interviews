const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
]

/**
* @param {character[][]} maze
* @param {number[]} entrance
* @return {number}
*/
var nearestExit = function (maze, entrance) {
  const rows = maze.length
  const cols = maze[0].length

  const visited = Array.from({ length: rows }, (_, i) => {
    return Array(cols).fill(false)
  })

  const queue = [{ location: entrance, distance: 0 }]
  visited[entrance[0]][entrance[1]] = true

  while (queue.length) {
    const { location: [r, c], distance } = queue.shift()
    if (r === 0 || r === rows - 1 || c === 0 || c === cols - 1) {
      if (!(r === entrance[0] && c === entrance[1])) {
        return distance
      }
    }
    for (const dir of DIRECTIONS) {
      const nextR = r + dir[0]
      const nextC = c + dir[1]
      if (nextR < 0 || nextR > rows - 1 ||
        nextC < 0 || nextC > cols - 1 ||
        maze[nextR][nextC] === '+' || visited[nextR][nextC]) {
        continue
      }
      queue.push({ location: [nextR, nextC], distance: distance + 1 })
      visited[nextR][nextC] = true
    }
  }
  return -1
};
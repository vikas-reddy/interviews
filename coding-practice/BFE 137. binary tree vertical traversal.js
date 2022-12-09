// This is the class for the node
// you can use this directly as it is bundled with your code

// class Node {
//   constructor(val) {
//     this.value = val
//     this.left = null
//     this.right = null
//   }
// }

/**
 * @param {Node} root
 * @returns {number[]}
 */
 function traverse(root) {
  // your code here
  /** @type {Map<number,Node[]>} */
  const offsetMap = new Map()

  const queue = []
  queue.unshift([root, 0])
  while (queue.length) {
    const [node, offset] = queue.shift()
    if (!node) {
      continue
    }
    if (!offsetMap.has(offset)) {
      offsetMap.set(offset, [])
    }
    offsetMap.get(offset).push(node.value)
    queue.unshift([node.left, offset - 1])
    queue.unshift([node.right, offset + 1])
  }

  const arr = [...offsetMap.entries()]
  const sortedArr = stableSort(arr, (a,b) => a[0] - b[0])
  return arr.sort((a,b) => a[0] - b[0]).map(e => e[0])
  return stableSort(
    [...offsetMap.entries()],
    (a,b) => Number(a[0]) - Number(b[0])
  ).map(entry => entry[1])
   .flat()
}

function stableSort(arr, compareFn) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && compareFn(arr[j-1], arr[j]) > 0) {
    // while (j > 0 && arr[j-1] > arr[j]) {
      console.log("swapping arr index", j, j-1)
      const temp = arr[j]
      arr[j] = arr[j-1]
      arr[j-1] = temp
      // [arr[j], arr[j-1]] = [arr[j-1], arr[j]]
      j--;
    }
  }
  return arr
}

console.log(
  stableSort([
    [0, 1],
    [1, 3],
    [-1, 2],
  ], (a,b) => a[0]-b[0] )
)
// const root = BFEdev_deserialize('[1,2,3]')
// const root = new Node(1)
// root.left = new Node(2)
// root.right = new Node(3)
// console.log(traverse(root), [2,1,3]1
/**
 * @param {Element} root
 * @param {Element} target
 * @return {Elemnt | null}
 */
function previousLeftSibling(root, target) {
  if (!root) {
    return null
  }
  let prev
  const queue = []
  queue.push([root, 0])
  while (queue.length) {
    let [node, depth] = queue.shift()
    
    // If a match is found
    if (node === target) {
      // If the prev node's depth is same as the current's
      if (prev && prev[1] === depth) {
        return prev[0]
      }
      return null
    }
    prev = [node, depth]
    
    for (const child of node.children) {
      queue.push([child, depth + 1])
    }
  }
}
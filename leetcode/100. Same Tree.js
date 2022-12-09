function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * 
 * @param {TreeNode} pTreeNode 
 * @param {TreeNode} qTreeNode 
 * @param {StackNode} next 
 */
function StackNode([pTreeNode, qTreeNode], next) {
  this.pTreeNode = pTreeNode;
  this.qTreeNode = qTreeNode;
  this.next = (next === undefined ? null : next);
}

function Stack() {
  this.head = null;
}

/**
 * 
 * @param {TreeNode[]} treeNodes
 */
Stack.prototype.push = function ([pTreeNode, qTreeNode]) {
  const stackNode = new StackNode([pTreeNode, qTreeNode]);
  if (this.head == null) {
    this.head = stackNode;
  } else {
    stackNode.next = this.head;
    this.head = stackNode;
  }
}

/**
 * 
 * @returns {TreeNode[]}
 */
Stack.prototype.pop = function () {
  if (this.head == null) {
    return null;
  }
  const stackNode = this.head;
  this.head = stackNode.next;
  return [stackNode.pTreeNode, stackNode.qTreeNode];
}

/**
* @param {TreeNode} p
* @param {TreeNode} q
* @return {boolean}
*/
var isSameTree = function (p, q) {
  const stack = new Stack();
  stack.push([p, q]);
  while (stack.head) {
    const [pNode, qNode] = stack.pop();
    if (pNode == null && qNode == null) {
      continue;
    }
    if (pNode == null || qNode == null) {
      return false;
    }
    if (pNode.val !== qNode.val) {
      return false;
    }
    stack.push([p.left, q.left]);
    stack.push([p.right, q.right]);
  }
  return stack.head == null;
};
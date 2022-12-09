/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}


/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if (root == null) {
    return "";
  }
  return `${root.val}(${serialize(root.left)})(${serialize(root.right)})`;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  if (data.length === 0) {
    return null;
  }
  const matches = data.match(/^([\-0-9]+)(.*)$/);
  const [, val, children] = matches;
  const root = new TreeNode(parseInt(val));
  
  let leftEnd;
  let openBracketsCount = 0;
  for (let i = 0; i < children.length; i++) {
    if (children[i] === '(') {
      openBracketsCount++;
    } else if (children[i] === ')') {
      openBracketsCount--;
    }
    if (openBracketsCount === 0) {
      leftEnd = i;
      break;
    }
  }
  root.left = deserialize(children.slice(1, leftEnd + 1));
  root.right = deserialize(children.slice(leftEnd + 2, -1));
  return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
var TreeNode = /** @class */ (function () {
    function TreeNode(val, left, right) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
    return TreeNode;
}());
function flipEquiv(root1, root2) {
    if (root1 === null && root2 === null) {
        return true;
    }
    if (root1 === null || root2 === null) {
        return false;
    }
    if (root1.val !== root2.val) {
        return false;
    }
    return flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right)
        || flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left);
}
// Difficult to test it here, but on Leetcode the above code works
/*
console.log(flipEquiv(
  [1,2,3,4,5,6,null,null,null,7,8],
  [1,3,2,null,6,4,5,null,null,null,null,8,7],
));
*/ 
//# sourceMappingURL=951.%20Flip%20Equivalent%20Binary%20Trees.js.map
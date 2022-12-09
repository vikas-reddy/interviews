function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

function Tree() {
  this.root = null;
  this.result = [];
}

Tree.prototype.insert = function (num) {
  const newNode = new TreeNode(num);
  if (this.root == null) {
    this.root = newNode;
    return;
  }
  let node = this.root;
  while (node) {
    if (num < node.val) {
      if (node.left == null) {
        node.left = newNode;
        break;
      }
      node = node.left;
    } else {
      if (node.right == null) {
        node.right = newNode;
        break;
      }
      node = node.right;
    }
  }
};

Tree.prototype.inOrder = function () {
  this.inOrderHelper(this.root);
};

Tree.prototype.inOrderHelper = function (node) {
  if (node == null) {
    return;
  }
  this.inOrderHelper(node.left);
  console.log(node.val);
  this.result.push(node.val);
  this.inOrderHelper(node.right);
};

Tree.prototype.preOrder = function () {
  this.preOrderHelper(this.root);
};

Tree.prototype.preOrderHelper = function (node) {
  if (node == null) {
    return;
  }
  console.log(node.val);
  this.preOrderHelper(node.left);
  this.preOrderHelper(node.right);
};

const bst = new Tree();
arr = [ 37, 53, 8, 93, 11 ];
console.log("arr: ", arr);
arr.forEach(e => {
  bst.insert(e);
});

console.log("inorder: ");
bst.inOrder();

console.log("preorder: ");
bst.preOrder();

/*
for (let t = 0; t < 1; t++) {
  const bst = new Tree();
  const arr = [];
  for (let i = 0; i < 5; i++) {
    const e = Math.floor(Math.random() * 100);
    bst.insert(e);
    arr.push(e);
  };
  console.log("arr:", arr);
  console.log("arr sorted:", arr.sort((a,b) => a-b));

  console.log("inorder: ");
  bst.inOrder();

  console.log("preorder: ");
  bst.preOrder();

  // console.log("result: ", bst.result);
}
*/
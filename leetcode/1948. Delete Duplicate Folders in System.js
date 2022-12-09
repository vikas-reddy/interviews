var TreeNode = /** @class */ (function () {
    function TreeNode(name) {
        this.children = [];
        this.name = name;
    }
    TreeNode.prototype.getChild = function (name) {
        this.children = this.children || [];
        var childWithName = this.children.filter(function (tn) { return tn.name === name; })[0];
        if (childWithName) {
            return childWithName;
        }
        var child = new TreeNode(name);
        this.children.push(child);
        return child;
    };
    return TreeNode;
}());
var Tree = /** @class */ (function () {
    function Tree(paths) {
        this.root = new TreeNode('/');
        this.addPaths(paths);
    }
    Tree.prototype.addPath = function (root, path) {
        if (path.length === 0) {
            return;
        }
        this.addPath(root.getChild(path[0]), path.slice(1));
    };
    Tree.prototype.addPaths = function (paths) {
        var _this = this;
        paths.forEach(function (path) { return _this.addPath(_this.root, path); });
    };
    return Tree;
}());
function deleteDuplicateFolder(paths) {
    var t = new Tree(paths);
    return [];
}
;
console.log(deleteDuplicateFolder([["a"], ["c"], ["a", "b"], ["c", "b"], ["a", "b", "x"], ["a", "b", "x", "y"], ["w"], ["w", "y"]]));

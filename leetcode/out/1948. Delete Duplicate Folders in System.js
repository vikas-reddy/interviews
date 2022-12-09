class Folder {
    constructor(name) {
        this.name = name;
        this.childrenList = [];
        this.childrenMap = new Map();
        this.isMarked = false;
    }
}
class Tree {
    constructor(paths) {
        this.root = new Folder('');
        this.keys = new Map();
        paths.forEach(path => {
            this.insertPath(this.root, path);
        });
        this.generateKeys();
        this.markDuplicates(this.root);
    }
    insertPath(root, path) {
        if (path.length === 0) {
            return;
        }
        let child = root.childrenMap.get(path[0]);
        if (!child) {
            child = new Folder(path[0]);
            root.childrenMap.set(path[0], child);
            root.childrenList.push(child);
        }
        this.insertPath(root.childrenMap.get(path[0]), path.slice(1));
    }
    generateKeys() {
        this.root.key = this.generateFolderKey(this.root);
    }
    generateFolderKey(root) {
        if (root.childrenList.length === 0) {
            return '';
        }
        let key = '(';
        root.childrenList.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }).forEach(child => {
            key = key + child.name;
            key = key + this.generateFolderKey(child);
        });
        key = key + ')';
        root.key = key;
        // Add to global map
        let keyCount = this.keys.get(key);
        if (!keyCount) {
            keyCount = 0;
        }
        this.keys.set(key, keyCount + 1);
        return key;
    }
    markDuplicates(root) {
        // console.log('markDuplicates', this.keys.get(root.key))
        if (this.keys.get(root.key) > 1) {
            root.isMarked = true;
            return;
        }
        root.childrenList.forEach(child => {
            this.markDuplicates(child);
        });
    }
    deduplicatedFolders(paths) {
        return paths.filter(path => this.isValid(path));
    }
    isValid(path) {
        let current = this.root;
        for (let entry of path) {
            current = current.childrenMap.get(entry);
            if (current.isMarked) {
                return false;
            }
        }
        return true;
    }
}
function deleteDuplicateFolder(paths) {
    const t = new Tree(paths);
    for (const [key, value] of t.keys) {
        console.log(key + ' = ' + value);
    }
    return t.deduplicatedFolders(paths);
}
;
console.log(JSON.stringify(deleteDuplicateFolder(
// [["a"],["c"],["d"],["a","b"],["c","b"],["d","a"]]
// [["a"],["c"],["a","b"],["c","b"],["a","b","x"],["a","b","x","y"],["w"],["w","y"]]
// [["a","b"],["c","d"],["c"],["a"]]
[
    ['b'],
    ['c'],
    ['f'],
    ['f', 'o'],
    ['f', 'o', 'l'],
    ['f', 'o', 'x'],
    ['f', 'o', 'x', 'd'],
    ['f', 'o', 'x', 't'],
    ['f', 'r'],
    ['f', 'r', 'g'],
    ['f', 'r', 'g', 'c'],
    ['f', 'r', 'g', 'c', 'r'],
    ['h'],
    ['h', 'o'],
    ['h', 'o', 'd'],
    ['h', 'o', 't'],
    ['h', 't'],
    ['l'],
    ['l', 'q']
])));
//# sourceMappingURL=1948.%20Delete%20Duplicate%20Folders%20in%20System.js.map
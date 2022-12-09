function TrieNode () {
  /** @type {boolean} */
  this.canEndHere = false;
  /** @type {{[string]: TrieNode}} */
  this.children = new Map();
}

var Trie = function () {
  /** @type {TrieNode} */
  this.head = new TrieNode();
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let entry = word;
  let node = this.root;
  while (node) {

    // End of the word
    if (entry.length === 0) {
      node.isEnd = true;
      break;
    }

    const firstChar = entry[0];

    // Create child if it doesn't exist
    if (!node.children.has(firstChar)) {
      node.children.set(firstChar, new TrieNode());
    }

    // Navigate to child
    node = node.children.get(firstChar);

    // Insert the rest of the word
    entry = entry.slice(1);
  }
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let wordStart = 0;
  let wordEnd = word.length - 1;
  let node = this.root;
  while (node) {
    if (wordEnd - wordStart + 1 === 0) {
      return node.isEnd;
    }
    const firstChar = word[wordStart];
    node = node.children.get(firstChar);
    wordStart++;
  }
  return false;
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let prefixStart = 0;
  let prefixEnd = prefix.length - 1;
  let node = this.root;
  while (node) {
    if (prefixEnd - prefixStart + 1 === 0) {
      return true;
    }
    const firstChar = prefix[prefixStart];
    node = node.children.get(firstChar);
    prefixStart++;
  }
  return false;
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
const t = new Trie();
t.insert("apple");
t.insert("application");
console.log(t.search("apple"));
console.log(t.search("apples"));
console.log(t.search("app"));
console.log(t.startsWith("app"));
console.log(t.search("application"));
console.log(t.startsWith("apx"));
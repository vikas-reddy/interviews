var WordDictionary = function () {
  this.root = new Map();
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let node = this.root;
  for (const char of word) {
    if (!node.has(char)) {
      node.set(char, new Map());
    }
    node = node.get(char);
  }
  node.set('isEnd', true);
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  return this.dfs(this.root, word, 0);
}

/** 
 * @param {Map} node
 * @param {string} word
 * @param {number} idx
 * @return {boolean}
 */
WordDictionary.prototype.dfs = function (node, word, idx) {
  if (node == null) {
    return false;
  }
  if (idx === word.length) {
    return node.get('isEnd') == true;
  }

  if (word[idx] === ".") {
    for (const [char, child] of node) {
      if (char.length === 1 && this.dfs(child, word, idx + 1)) {
        return true;
      }
    }
    return false;
  } else {
    return this.dfs(node.get(word[idx]), word, idx + 1)
  }
}

/** 
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.WordDictionary(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
const wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.addWord("vikas");
console.log(wordDictionary.search("pad")); // return False
console.log(wordDictionary.search("bad")); // return True
console.log(wordDictionary.search(".ad")); // return True
console.log(wordDictionary.search("b..")); // return True
console.log(wordDictionary.search("..kax")); // return True
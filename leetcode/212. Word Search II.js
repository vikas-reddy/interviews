function TrieNode () {
  /** @type {boolean} */
  this.isEnd = false;

  /** @type {boolean} */
  this.isUsed = false;

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
  let node = this.head;
  while (node) {
    if (entry.length === 0) {
      node.isEnd = true;
      break;
    }
    const firstChar = entry[0];
    if (!node.children.has(firstChar)) {
      node.children.set(firstChar, new TrieNode());
    }
    node = node.children.get(firstChar);
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
  let node = this.head;
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

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  const trie = new Trie();
  for (const word of words) {
    trie.insert(word);
  }

  const rows = board.length;
  const cols = board[0].length;

  const visited = Array.from({length: rows}, (_,i) => {
    return Array.from({length: cols}, (_,i) => false);
  });

  const results = [];
  const currentWord = [];

  const dfs = function (row, col, trieNode) {
    const boardChar = board[row][col];

    if (trieNode == null || !trieNode.children.has(boardChar)) {
      return;
    }

    visited[row][col] = true;
    currentWord.push(boardChar);

    // Check for end of word
    const childNode = trieNode.children.get(boardChar);
    if (childNode.isEnd && !childNode.isUsed) {
      results.push(currentWord.join(''));
      childNode.isUsed = true;
    }
    
    // Recurse
    for (const direction of DIRECTIONS) {
      const newRow = row + direction[0];
      const newCol = col + direction[1];
      if (newRow >= 0 && newRow < rows && newCol >=0 && newCol < cols && !visited[newRow][newCol]) {
        dfs(newRow, newCol, childNode);
      }
    }

    visited[row][col] = false;
    currentWord.pop();
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, trie.head);
    }
  }

  return results;
};

console.log(findWords(
  // [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]],
  // ["oath", "pea", "eat", "rain"]
  // [["a","b"],["c","d"]],
  // ["abcb"]
  [["o","a","b","n"],["o","t","a","e"],["a","h","k","r"],["a","f","l","v"]],
  ["oa","oaa"]
))
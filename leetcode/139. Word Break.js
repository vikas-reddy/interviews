function TrieNode () {
  /** @type {boolean} */
  this.isEnd = false;
  /** @type {{[string]: TrieNode}} */
  this.children = new Map();
}

var Trie = function () {
  /** @type {TrieNode} */
  this.root = new TrieNode();
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let entry = word;
  let node = this.root;
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
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreakWithTrie = function (s, wordDict) {
  const trie = new Trie();
  for (const word of wordDict) {
    trie.insert(word);
  }
  const mem = Array(s.length + 1).fill(false);
  mem[s.length] = true;

  const wordBreakHelper = (startIdx) => {
    if (startIdx === s.length) {
      return true;
    }
    let result = false;
    let node = trie.root;
    let i = startIdx;
    while (node) {
      if (node.isEnd) {
        result = result || mem[i];
      }
      if (i < s.length) {
        node = node.children.get(s[i]);
      } else {
        break;
      }
      i++;
    }
    mem[startIdx] = result;
    return result;
  }

  for (let i = s.length - 1; i >= 0; i--) {
    wordBreakHelper(i);
  }
  return mem[0];
};

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const dict = new Set(wordDict);
  const result = Array(s.length + 1).fill(false);
  result[0] = true;
  for (let stringSize = 1; stringSize <= s.length; stringSize++) {
    for (let j = stringSize - 1; j >= 0; j--) {
      if (result[j]) {
        if (dict.has(s.slice(j, stringSize))) {
          result[stringSize] = true;
          break;
        }
      }
    }
  }
  return result[s.length];
};

console.log(wordBreak(
  // "leetcode", ["leet","code"]
  // "applepenapple", ["apple","pen"]
  // "catsandog", ["cats","dog","sand","and","cat"]
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab", ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]
))
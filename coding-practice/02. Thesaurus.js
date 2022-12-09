"use strict";
class TrieNode {
    constructor() {
        this.children = new Map();
    }
}
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    insert(word) {
        let node = this.root;
        let wordIdx = 0;
        while (node && wordIdx < word.length) {
            if (!node.children.has(word.charAt(wordIdx))) {
                node.children.set(word.charAt(wordIdx), new TrieNode());
            }
            node = node.children.get(word.charAt(wordIdx));
            wordIdx++;
        }
        node.word = word;
    }
    search(word) {
        let node = this.root;
        let wordIdx = 0;
        while (node && wordIdx < word.length) {
            node = node.children.get(word.charAt(wordIdx));
        }
        if (node == null) {
            return false;
        }
        return !!node.word;
    }
}
class Thesaurus {
    insert(word) {
    }
    search(word) {
        return [];
    }
}
const trie = new Trie();
trie.insert("an");
trie.insert("apple");
console.log(trie.search("an"));

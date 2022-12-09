class TrieNode {
  word: string;
  children: Map<string, TrieNode> = new Map();
  relatedWordNodes: TrieNode[] = [];

  get relatedWords(): string[] {
    return this.relatedWordNodes.map(rwn => rwn.word);
  }

  constructor() {}
}

class Thesaurus {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string, ...relatedWords: string[]) {
    let node = this.root;
    let wordIdx = 0;
    while (node && wordIdx < word.length) {
      if (!node.children.has(word.charAt(wordIdx))) {
        node.children.set(word.charAt(wordIdx), new TrieNode())
      }
      node = node.children.get(word.charAt(wordIdx));
      wordIdx++;
    }
    node.word = word;

    node.relatedWordNodes = relatedWords.map(relatedWord => {
      if (!this.searchNode(relatedWord)) {
        this.insert(relatedWord);
      }
      return this.searchNode(relatedWord);
    })
  }

  search(word: string) {
    const node = this.searchNode(word);
    return node != null;
  }

  searchNode(word: string) {
    let node = this.root;
    let wordIdx = 0;
    while (node && wordIdx < word.length) {
      node = node.children.get(word.charAt(wordIdx));
      wordIdx++;
    }
    if (node == null) {
      return null;
    }
    return node.word === word ? node : null;
  }

  relatedWords(word: string) {
    return this.searchNode(word).relatedWords;
  }
}

// const thesaurus = new Thesaurus();
// thesaurus.insert("fruit", "apple", "orange");

const thesaurus = new Thesaurus();
thesaurus.insert("apple");
thesaurus.insert("orange");
thesaurus.insert("strawberry");
thesaurus.insert("fruit", "apple", "orange", "strawberry", "fig");
console.log(thesaurus.relatedWords("fruit"));
console.log(thesaurus.relatedWords("apple"));
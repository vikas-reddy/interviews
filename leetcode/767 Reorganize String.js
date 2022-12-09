/**
 * Get char code at position 0
 * @param {string} S
 * @return {number}
 */
var toCharCode = function(S) {
  return S.charCodeAt(0) - 'a'.charCodeAt(0);
};

/**
 * From Char Code
 * @param {number[]} codes
 */
var fromCharCode = function(...codes) {
  return String.fromCharCode(
    ...codes.map(code => code + 'a'.charCodeAt(0))
  );
};

/**
 * @constructor
 * @param {number} charCode Character
 * @param {number} count Frequency
 */
var CharCount = function(charCode, count) {
  this.charCode = charCode;
  this.count = count;
};

CharCount.prototype.char = function() {
  return fromCharCode(this.charCode);
}

CharCount.prototype.toString = function() {
  return `(${this.char()}, ${this.count})`;
};

/**
 * @constructor
 * @param {number} maxLength
 */
var MaxHeap = function(maxLength) {
  /** @type {CharCount[]} */
  this.arr = Array(maxLength);
  this.maxLength = maxLength;
  this.currentLength = 0;
};

MaxHeap.prototype.parent = (i) => Math.floor(i/2);
MaxHeap.prototype.left = (i) => 2*i + 1;
MaxHeap.prototype.right = (i) => 2*i + 2;

/** @param {CharCount} elem */
MaxHeap.prototype.insert = function(elem) {
  if (this.currentLength === this.maxLength) {
    return;
  }
  this.arr[this.currentLength] = elem;
  this.currentLength++;
  this.popToTop();
};

MaxHeap.prototype.popToTop = function() {
  let i = this.currentLength - 1;
  while (i > 0 && this.arr[i].count > this.arr[this.parent(i)].count) {
    const temp = this.arr[i];
    this.arr[i] = this.arr[this.parent(i)];
    this.arr[this.parent(i)] = temp;
    i = this.parent(i);
  }
};

MaxHeap.prototype.peepAtIndex = function(i) {
  return this.arr[i];
};

MaxHeap.prototype.extractMax = function() {
  if (this.currentLength === 0) {
    return null;
  }

  // Put the last element at the position
  const ret = this.arr[0];
  this.arr[0] = this.arr[this.currentLength - 1];
  this.arr[this.currentLength - 1] = undefined;
  this.currentLength--;

  let i = 0;
  while (
    i < this.currentLength &&
    (
      this.left(i) < this.currentLength && this.arr[i].count < this.arr[this.left(i)].count ||
      this.right(i) < this.currentLength && this.arr[i].count < this.arr[this.right(i)].count
    )
  ) {
    if (this.arr[i].count < this.arr[this.left(i)].count) {
      const temp = this.arr[i];
      this.arr[i] = this.arr[this.left(i)];
      this.arr[this.left(i)] = temp;
      i = this.left(i);
    } else if (this.arr[i].count < this.arr[this.right(i)].count) {
      const temp = this.arr[i];
      this.arr[i] = this.arr[this.right(i)];
      this.arr[this.right(i)] = temp;
      i = this.right(i);
    }
  }
  return ret;
};

/**
 * @param {string} S
 * @return {string}
 * Algorithm 1:
 * 1. Build charCounts hash map by traversing S
 * 2. Continously find the top two most occuring characters
 * 3. Add characters to string
 * 
 * Algorithm 2:
 * 1. Build charCounts hash map by traversing S
 * 2. Build a max heap of (char, count)
 * 3. Pick the max two characters at a time and build the string
 */
var reorganizeString = function(S) {
  if (S.length < 3) {
    return S;
  }

  /** @type {number[]} */
  const charCounts = Array(26);
  let uniqueCharsCount = 0;

  for (let i = 0; i < S.length; i++) {
    const charCode = toCharCode(S[i]);
    if (charCounts[charCode] === undefined) {
      charCounts[charCode] = 1;
      uniqueCharsCount++;
    } else {
      charCounts[charCode]++;
    }
  }

  // Check whether impossible
  const maxOccurances = charCounts.reduce(
    (currentMax, currentCount) => (currentMax < currentCount) ? currentCount : currentMax,
    0
  );

  const maxLimit = S.length/2 + 1;
  if ( !(maxOccurances < maxLimit) ) {
    return "";
  }

  // Build the max heap
  const heap = new MaxHeap(uniqueCharsCount);
  for (let i = 0; i < 26; i++) {
    if (charCounts[i] !== undefined) {
      heap.insert(new CharCount(i, charCounts[i]));
    }
  }

  // Build string with heap
  let ret = "";
  for (let i = 0; i < S.length && heap.currentLength; i++) {
    const previousChar = ret.length
      ? ret[ret.length - 1]
      : undefined;

    const currentMaxNode = heap.extractMax();
    let nodeToDecrement = currentMaxNode;
    if (previousChar === currentMaxNode.char()) {
      const nextMaxNode = heap.extractMax();
      nodeToDecrement = nextMaxNode;
      // Put the currentMax back into the heap
      heap.insert(currentMaxNode);
    }

    ret = ret.concat(nodeToDecrement.char());
    nodeToDecrement.count--;
    if (nodeToDecrement.count) {
      heap.insert(nodeToDecrement);
    }
  }
  return ret;
};

// console.log(reorganizeString("aab"));
// console.log(reorganizeString("azaaxy"));
// console.log(reorganizeString("aab"));
// console.log(reorganizeString("aaabc"));
// console.log(reorganizeString("nlmxhnpifuaxinxpxlcttjnlggmkjioewbecnofqpvcikiazmn"));
// console.log(reorganizeString("loremipsumdolorametrrrrrr"));
// rmrorerlrmroradeilmoprst
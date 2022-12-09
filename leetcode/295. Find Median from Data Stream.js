var MedianFinder = function () {
  this.maxHeap = new MaxPriorityQueue();
  this.minHeap = new MinPriorityQueue();
  // [0...mid] elements in maxHeap
  // [mid+1...last] elements in minHeap
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  this.minHeap.enqueue(num);
  const minTop = this.minHeap.dequeue().element;
  this.maxHeap.enqueue(minTop);
  if (this.maxHeap.size() > this.minHeap.size()) {
    const maxTop = this.maxHeap.dequeue().element;
    this.minHeap.enqueue(maxTop);
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  if (this.maxHeap.size() < this.minHeap.size()) {
    return this.minHeap.front().element;
  } else {
    return ( this.maxHeap.front().element + this.minHeap.front().element ) / 2;
  }
};
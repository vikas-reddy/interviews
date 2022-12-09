class MinHeap {
  constructor(length) {
    this.array = Array(length);
    this.size = 0;
  }

  top() {
    if (this.isEmpty) {
      return null;
    }
    return this.array[0];
  }

  insert(num) {
    if (this.size === this.array.length) {
      return false;
    }
    this.size++;
    this.array[this.size - 1] = num;
    let idx = this.size - 1;
    while (idx > 0) {
      const p = this.parent(idx);
      if (this.array[p] > this.array[idx]) {
        [this.array[p], this.array[idx]] = [this.array[idx], this.array[p]]
      }
      idx = p;
    }
    return true;
  }

  replaceTop(num) {
    if (this.isEmpty) {
      return false;
    }
    this.array[0] = num;
    this.minHeapify(0);
  }

  minHeapify(idx) {
    const lChild = this.left(idx);
    const rChild = this.right(idx);
    let smallest = idx;
    if (lChild < this.size && this.array[idx] > this.array[lChild]) {
      smallest = lChild;
    }
    if (rChild < this.size && this.array[smallest] > this.array[rChild]) {
      smallest = rChild;
    }
    if (smallest !== idx) {
      [this.array[smallest], this.array[idx]] = [this.array[idx], this.array[smallest]];
      this.minHeapify(smallest);
    }
  }

  get isEmpty() {
    return this.size === 0;
  }
  parent = idx => Math.ceil(idx/2) - 1;
  left = idx => idx * 2 + 1;
  right = idx => idx * 2 + 2;
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargestMinHeap = function (nums, k) {
  const mh = new MinHeap(k);
  for (const num of nums) {
    if (mh.size < k) {
      mh.insert(num);
    } else if (num > mh.top()) {
      mh.replaceTop(num);
    }
    // console.log(mh.array);
  }
  return mh.top();
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargestPartition = function (nums, k) {
  const partition = function (lo, hi) {
    let j = lo - 1;
    for (let i = lo; i < hi; i++) {
      if (nums[i] < nums[hi]) {
        j++;
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }
    j++;
    [nums[j], nums[hi]] = [nums[hi], nums[j]];
    return j;
  };

  let lo = 0, hi = nums.length - 1;
  let targetPivot = nums.length - k;
  let pivotIdx = 0;
  while (lo < hi) {
    pivotIdx = partition(lo, hi);
    if (pivotIdx < targetPivot) {
      lo = pivotIdx + 1;
    } else if (pivotIdx > targetPivot) {
      hi = pivotIdx - 1;
    } else {
      break;
    }
  }
  return nums[targetPivot];
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const partition = function (lo, hi) {
    let j = lo - 1;
    for (let i = lo; i < hi; i++) {
      if (nums[i] < nums[hi]) {
        j++;
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }
    j++;
    [nums[j], nums[hi]] = [nums[hi], nums[j]];
    return j;
  };
  
  const shuffle = function () {
    for (let len = nums.length; len > 0; len--) {
      const randomIdx = Math.floor(Math.random() * len);
      [nums[len - 1], nums[randomIdx]] = [nums[randomIdx], nums[len - 1]];
    }
  }

  shuffle();
  let lo = 0, hi = nums.length - 1;
  let targetPivot = nums.length - k;
  let pivotIdx = 0;
  while (lo < hi) {
    pivotIdx = partition(lo, hi);
    if (pivotIdx < targetPivot) {
      lo = pivotIdx + 1;
    } else if (pivotIdx > targetPivot) {
      hi = pivotIdx - 1;
    } else {
      break;
    }
  }
  return nums[targetPivot];
};

console.log(findKthLargest(
  [3,2,1,5,6,4], 2
  // [3,2,3,1,2,4,5,5,6], 4
  // [2,1], 1
))
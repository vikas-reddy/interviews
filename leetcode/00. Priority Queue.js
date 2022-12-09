class PriorityQueue {
  arr = []

  constructor(compareFn) {
      this.compareFn = compareFn || ((a,b) => a-b)
  }

  get size() {
      return this.arr.length
  }

  enqueue(elem) {
      this.arr[this.size] = elem
      let idx = this.arr.length - 1
      while (idx > 0) {
        const p = this.parent(idx)
        if (this.compareFn(this.arr[p], this.arr[idx]) > 0) {
          [this.arr[idx], this.arr[p]] = [this.arr[p], this.arr[idx]]
        }
        idx = p
      }
    }

  dequeue() {
    if (this.size === 0) {
      return null
    }
    if (this.size === 1) {
      return this.arr.pop()
    }
    const top = this.arr[0]
    const lastElem = this.arr.pop()
    // console.log("after removal size", this.arr.length)
    this.arr[0] = lastElem
    this.minHeapify(0)
    return top
  }

  minHeapify(idx) {
    let smallestIdx = idx
    if (this.left(idx) < this.size && this.compareFn(this.arr[this.left(idx)], this.arr[idx]) < 0) {
      smallestIdx = this.left(idx)
    }
    if (this.right(idx) < this.size && this.compareFn(this.arr[this.right(idx)], this.arr[smallestIdx]) < 0) {
      smallestIdx = this.right(idx)
    }
    if (smallestIdx !== idx) {
      [this.arr[idx], this.arr[smallestIdx]] = [this.arr[smallestIdx], this.arr[idx]]
      this.minHeapify(smallestIdx)
    }
  }

  front() {
      if (this.size > 0) {
          return this.arr[0]
      }
      return null
  }

  parent(idx) {
      return Math.floor( (idx - 1) / 2)
  }

  left(idx) {
      return 2 * idx + 1
  }

  right(idx) {
      return 2 * idx + 2
  }
}

const q = new PriorityQueue((a,b) => b-a)
// const arr = [
//   25, 31, 81, 39, 23,
//   34, 85, 76, 48, 61
// ]
const arr = []
for (let i = 0; i < 10; i++) {
  arr.push(Math.floor(Math.random() * 100))
}
console.log(arr)
for (let i = 0; i < 10; i++) {
  q.enqueue(arr[i])
}
console.log(q.arr)

while (q.size) {
  console.log(q.dequeue())
  // console.log(q.arr)
}

// This is a JavaScript coding problem from BFE.dev 

class OriginData {
  constructor (origin, size, lastUsed) {
    this.origin = origin;
    this.size = size;
    this.lastUsed = lastUsed;
    this.persistent = false;
  }
}

/**
 * @typedef {object} OriginData
 * @property {string} origin
 * @property {number} lastUsed
 * @property {number} size
 * @property {boolean} persistent
 */

class MyLRUStorage  {
  /**
   * @param {number} capacity
   * @param {() => number} getTimestamp
   */
  constructor(capacity, getTimestamp) {
    this.capacity = capacity
    this.getTimestamp = getTimestamp
    this.cache = [];
  }

  get availableCapacity() {
    const usedCapacity = this.cache.reduce((acc, od) => acc + od.size, 0);
    return this.capacity - usedCapacity;
  }

  /**
   * @param {string} origin
   * @returns {OriginData | undefined}
   */
  getData(origin) {
    const idx = this.cache.findIndex(od => od.origin === origin);
    if (idx === -1) {
      return undefined;
    }
    const od = this.cache[idx];
    od.lastUsed = ++this.getTimestamp;
    this.cache.splice(idx, 1);
    this.cache.unshift(od);
    return od;
  }

  /**
   * @param {string} origin
   * @param {number} size
   * @returns {boolean}
   */
  setData(origin, size) {
    if (this.capacity < size) {
      return false;
    }

    // Do no insert if the entry is already present
    const od = this.getData(origin);
    if (od) {
      this.clearData(origin);
      return this.setData(od.origin, size);
    }

    if (this.availableCapacity < size) {
      this.evictLRU(size);
    }

    if (this.availableCapacity >= size) {
      const od = new OriginData(origin, size, ++this.getTimestamp);
      this.cache.unshift(od);
      // console.log("setData: ", origin, this.cache)
      return true;
    }
    return false;
  }

  /**
   * @param {string} origin
   * @returns {void}
   */
  clearData(origin) {
    const idx = this.cache.findIndex(od => od.origin === origin);
    if (idx !== -1) {
      this.cache.splice(idx, 1);
    }
  }

  /**
   * @param {string} origin
   * @returns {void}
   */
  makePersistent(origin) {
    const od = this.cache.find(od => od.origin === origin);
    if (od) {
      od.persistent = true;
    }
  }

  /**
   * Evict least recently used items until a new entry
   * of size `size` can be accommodated
   */
  evictLRU(size) {
    if (this.cache.length === 0) {
      return;
    }
    while (this.availableCapacity < size) {
      // Find the last non-persistent one, and keep deleting entries at that position
      let lastIdx = -1;
      for (let i = this.cache.length - 1; i >= 0; i--) {
        if (!this.cache[i].persistent) {
          lastIdx = i;
          break;
        }
      }
      if (!lastIdx) {
        break;
      }
      this.clearData(this.cache[lastIdx].origin);
    }
  }
}

const storage = new MyLRUStorage(10, new Date())
storage.setData('a', 1)
storage.setData('b', 3)
storage.setData('c', 6)
storage.setData('c', 10)
console.log(storage.getData('a'))
console.log(storage.getData('b'))
console.log(storage.getData('c').size, 10)

/*
const storage = new MyLRUStorage(10, new Date())
storage.setData('a', 1)
storage.setData('b', 3)
storage.getData('a')
storage.setData('c', 7)
console.log(storage.getData('a').size, 1)
console.log(storage.getData('b'), undefined)
console.log(storage.getData('c').size, 7)
*/

/*
const storage = new MyLRUStorage(10, new Date())
storage.setData('a', 1)
storage.setData('b', 2)
storage.setData('c', 3)
console.log(JSON.stringify(storage.cache))
const result = storage.setData('d', 11)
console.log(JSON.stringify(storage.cache))
console.log(result, false)
console.log(storage.getData('a').size, 1)
console.log(storage.getData('b').size, 2)
console.log(storage.getData('c').size, 3)
console.log(storage.getData('d'))
*/

/*
const storage = new MyLRUStorage(10, new Date())
storage.setData('a', 1)
console.log(JSON.stringify(storage.cache))
storage.setData('b', 3)
console.log(JSON.stringify(storage.cache))
storage.setData('c', 7)
console.log(JSON.stringify(storage.cache))
console.log(storage.getData('a'), undefined)
console.log(storage.getData('b').size, 3)
console.log(storage.getData('c').size, 7)
*/

/*
const storage = new MyLRUStorage(10, new Date())
storage.setData('a', 1)
storage.setData('b', 3)
storage.setData('c', 6)
console.log(JSON.stringify(storage.cache))
console.log(storage.getData('a').size, 1)
console.log(storage.getData('b').size, 3)
console.log(storage.getData('c').size, 6)
*/
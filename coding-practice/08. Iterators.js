function range1(from, to) {
  return {
    current: from,
    last: to,
    [Symbol.iterator]() {
      return {
        current: this.current,
        last: this.last,
        next() {
          if (this.current > this.last) {
            return {done: true}
          }
          return {done: false, value: this.current++}
        }
      }
    }
  }
}

function range2 (from, to) {
  return {
    current: from,
    last: to,
    [Symbol.iterator]() {
      return {
        current: this.current,
        last: this.last,
        *next() {
          while (this.current <= this.last) {
            yield this.current++
          }
        }
      }
    }
  }
}

function* range3 (from, to) {
  while (from <= to) {
    yield from++
  }
}

for (let i of range2(25, 33)) {
  console.log(i)
}
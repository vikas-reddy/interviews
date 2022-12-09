function defaultEqual(args1, args2) {
  return Array.isArray(args1) &&
    Array.isArray(args2) &&
    args1.length === args2.length &&
    !args1.some((arg1, idx) => arg1 !== args2[idx])
}


/**
 * @param {Function} func
 * @param {(args: any[], newArgs: any[]) => boolean} [isEqual]
 * @returns {any}
 */
function memoizeOne(func, isEqual = defaultEqual) {
  // your code here
  const cache = {
    args: undefined,
    result: undefined,
    context: undefined,
  }

  return function (...args) {
    if (cache.args !== undefined && isEqual.call(this, args, cache.args) &&
      cache.context === this) {
      cache.args = args
      cache.context = this
      return result
    }

    cache.args = args
    cache.result = func.call(this, ...args)
    cache.context = this
    return cache.result
  }
}


let callCount = 0
function funcThis(b) {
  callCount += 1
  return `${this.a}_${b}`
}
const memoed = memoizeOne(funcThis)
const a = {
  a: 1,
  memoed
}

const b = {
  a: 2,
  memoed
}
// console.log(a.memoed(2), '1_2')
// console.log(a.memoed(2), '1_2')
// console.log(a.memoed(3), '1_3')
console.log(a.memoed(3), '1_3')
console.log(b.memoed(3), '2_3')
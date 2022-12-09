/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */
function memo(func, resolver) {
  const cache = new Map();
  return function (...args) {
    const cacheKey = resolver ? resolver.apply(this, args) : JSON.stringify(args);
    console.log(cacheKey)

    if (!cache.has(cacheKey)) {
      cache.set(cacheKey, func.apply(this, args));
    }
    console.log(JSON.stringify(cache.keys()));
    return cache.get(cacheKey);
  };
}

let callCount = 0
const func = (a, b) => {
  console.log("func", a, b)
  callCount += 1
  return a + b
}
const memoed = memo(func, (a, b) => (a + b) % 2 === 0 ? 'even' : 'odd')

memoed(1, 2)
// expect(callCount).toBe(1)
memoed(1, 4)
// expect(callCount).toBe(1)
memoed(1, 3)
// expect(callCount).toBe(2)
memoed(11, 31)
// expect(callCount).toBe(2)

/*
const func = (a, b) => a + b
const memoed = memo(func)
console.log(memoed(1,2), 3)
*/

/*
function funcThis(b){
  return `${this.a}_${b}`
}
const memoed = memo(funcThis)
const a = {
  a: 1,
  memoed
}
console.log(a.memoed(2), '1_2');
*/

/*
const func = (arg1, arg2) => {
  console.log("func")
  return arg1 + arg2
};

const memoed = memo(func)

console.log(
memoed(1, 2) 
// 3, func is called
)

console.log(
memoed(1, 2) 
// 3 is returned right away without calling func
)

console.log(
memoed(1, 3)
// 4, new arguments, so func is called
)
*/
/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
  return function curried (...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return (...rest) => 
        curried.apply(this, args.concat(rest));
    }
  };
}

const join = (a, b, c) => {
  return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)

console.log(
  // curriedJoin(1)(2,3) // a function that takes 2 args and function (arg2, arg3) { join(arg1, arg2, arg3)}
  curriedJoin(1, 2, 3) // '1_2_3'
  // curriedJoin(1)(2, 3) // '1_2_3'
  // curriedJoin(1, 2)(3) // '1_2_3'
)


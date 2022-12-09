/**
 * @param {Array<(arg: any) => any>} funcs 
 * @return {(arg: any) => any}
 */
function pipe(funcs) {
  // your code here
  return (x) => {
    return funcs.reduce((res,func) => func(res), x)
    /*
    let ret = x;
    for (const func of funcs) {
      ret = func(ret);
    }
    return ret;
    */
  };
}

const times = (y) => (x) => x * y
const plus = (y) => (x) => x + y
const subtract = (y) => (x) => x - y
const divide = (y) => (x) => x / y


console.log(
pipe([
  times(2),
  times(3)
])(3)
)
// x * 2 * 3

console.log(
pipe([
  times(2),
  plus(3),
  times(4)
])(3)
)
// (x * 2 + 3) * 4

console.log(
pipe([
  times(2),
  subtract(3),
  divide(4)
])(3)
)
// (x * 2 - 3) / 4
/**
 * @param {Function} func
 * @return {Function}
 */
function once(func) {
  // your code here
  let result;
  let resultSet = false;
  return function (...args) {
    if (!resultSet) {
      result = func.apply(this, args);
      resultSet = true;
    }
    return result;
  };
}

function func(num) {
  console.log("func called with", arguments)
  return num
}
const onced = once(func)

console.log(
onced(1)
// 1, func called with 1
)

console.log(
onced(2)
// 1, even 2 is passed, previous result is returned 
)
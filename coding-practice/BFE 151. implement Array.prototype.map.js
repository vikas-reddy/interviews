Array.prototype.myMap = function(callback, thisArg) {
  // your code here
  if (typeof callback !== "function") {
    throw new Error("Callback should be a function")
  }

  const results = []

  // Approach 1, using `forEach` or `for..of` which runs only for non-empty elements
  // this.forEach((value, index, array) => {
  //   results[index] = callback.call(thisArg, value, index, array)
  // })

  // Approach 2, using for loop and check for property existence
  for (let i = 0; i < this.length; i++) {
    // if (this.hasOwnProperty(i)) {
      results[i] = callback.call(thisArg, this[i], i, this)
    //   results[i] = [thisArg, this[i], i, this]
    // }
    // results.push([this[i], i, this.hasOwnProperty(i)])
  }
  return results
}

const arr = new Array(5)
arr[0] = 1
arr[2] = undefined
arr[4] = null

const callback = item => item
const result = arr.myMap(callback)
console.log(result)
/*
expect(result[0]).toBe(1)
expect('1' in result).toBe(false)
expect('2' in result).toBe(true)
expect(result[2] === undefined).toBe(true)
expect('3' in result).toBe(false)
expect('4' in result).toBe(true)
expect(result[4] === null).toBe(true)
*/
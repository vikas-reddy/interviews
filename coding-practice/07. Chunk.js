// _.chunk(['a', 'b', 'c', 'd'], 2);

function chunk(arr, n) {
  const results = [];
  let chunkIdx = -1;
  for (let i = 0; i < arr.length; i++) {
    if (i % n === 0) {
      chunkIdx++;
    }
    results[chunkIdx] = results[chunkIdx] || [];
    results[chunkIdx].push(arr[i]);
  }
  return results;
}

/**
 * 
 * @param {any[]} arr 
 * @param {number} n 
 * @returns {any[][]}
 */
function chunk2 (arr, n) {
  return arr.reduce(function (res, item, idx) {
    return (idx % n === 0)
      ? [...res, [item]]
      : [...res.slice(0, -1), [...res.slice(-1)[0], item]];
  }, [])
}

function partial (func, ...boundArgs) {
  return function (...remainingArgs) {
    return func(...boundArgs, ...remainingArgs);
  }
}

function greet (greeting, name) {
  return (greeting + " " + name);
}

console.log(
  // chunk(['a', 'b', 'c', 'd', 'e', 'f'], 11)
  // chunk2(['a', 'b', 'c', 'd', 'e', 'f'], 4)
  partial(greet, "Hola")('Vikas')
)
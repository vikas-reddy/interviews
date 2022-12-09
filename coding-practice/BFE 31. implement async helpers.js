const async1 = (callback) => {
  setTimeout(() => callback(undefined, 1), 300)
}

const async2 = (callback) => {
   setTimeout(() => callback(undefined, 2), 100)
}

const async3 = (callback) => {
  setTimeout(() => callback(undefined, 3), 200)
}

function race(funcs){
  // your code here
  return function (callback, initial) {
    let finished = false
    for (const func of funcs) {
      func(function (error, data) {
        if (!finished) {
          callback(error, data)
          finished = true
        }
      }, initial)
    }
  }
}

function parallel(funcs){
  // your code here
  return function (callback, initial) {
    const results = []
    let settled = false
    for (let i = 0; i < funcs.length; i++) {
      funcs[i]((error, data) => {
        if (data) {
          results[i] = data
          if (!settled && results.length === funcs.length) {
            callback(undefined, results)
            settled = true
          }
        } else if (error) {
          if (!settled) {
            callback(error, undefined)
            settled = true
          }
        }
      }, initial)
    }
  }
}


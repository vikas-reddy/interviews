// This is a JavaScript coding problem from BFE.dev 

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {

  function mergeArgs(target, source) {
    const targetCopy = [...target]
    let i = 0, j = 0
    while (i < targetCopy.length && j < source.length) {
      // Do not touch valid arguments in target
      if (targetCopy[i] !== curry.placeholder) {
        i++
        continue
      }

      // Skip both if both are _
      if (targetCopy[i] === curry.placeholder) {
        // Replace if possible
        if (source[j] !== curry.placeholder) {
          targetCopy[i] = source[j]
        }
        i++
        j++
      }
    }
    return targetCopy
  }

  return function curriedFn(...args) {
    let fnArgs = Array(fn.length).fill(curry.placeholder)
    fnArgs = mergeArgs(fnArgs, args)

    if (!fnArgs.some(a => a === curry.placeholder)) {
      return fn.call(this, ...fnArgs)
    }

    return function (...remainingArgs) {
      const mergedArgs = mergeArgs(fnArgs, remainingArgs)
      return curriedFn.call(this, ...mergedArgs)
    }
  }
}


curry.placeholder = Symbol()
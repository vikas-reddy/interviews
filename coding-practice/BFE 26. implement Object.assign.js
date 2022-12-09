function wrapPrimitive(value) {
  switch (typeof value) {
    case "string": return new String(value)
    case "number": return new Number(value)
    case "boolean": return new Boolean(value)
    default:
      return value
  } 
}

function checkPropWritability (obj, prop) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, prop)
  if (!descriptor) {
    return
  }
  if (!descriptor.configurable || !descriptor.writable) {
    throw new TypeError(`prop ${prop} is not writable/configurable`)
  }
}

/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  // Throw null and undefined
  if (target == null) {
    throw new Error("target cannot be null or undefined")
  }
  target = wrapPrimitive(target)

  for (let source of sources) {
    // Ignore null and undefined
    if (source == null) {
      continue
    }
    source = wrapPrimitive(source)
    for (const prop in source) {
      checkPropWritability(target, prop)
      if (source.hasOwnProperty(prop)) {
        target[prop] = source[prop]
      }
    }
    for (const propSym of Object.getOwnPropertySymbols(source)) {
      target[propSym] = source[propSym]
    }
  }
  return target
}
/**
 * @param {any} data
 * @param {Object} command
 */
function update(data, command) {

  // Make a shallow copy of data
  const dataCopy = Array.isArray(data)
    ? [...data]
    : Object.assign({}, data)

  for (const key in command) {
    const value = command[key]

    // Only $push is an in-place operation
    if (key === "$push") {
      return dataCopy.concat(value)
    }

    // For other keys, we need to look ahead for "$" command
    // `value` is an object
    for (const subKey in value) {
      const subVal = value[subKey]
      switch (subKey) {
        case "$push":
          dataCopy[key] = dataCopy[key].concat(subVal)
          break
        case "$set":
          dataCopy[key] = subVal
          break
        case "$apply":
          dataCopy[key] = subVal(dataCopy[key])
          break
        case "$merge":
          if (typeof dataCopy[key] !== "object") {
            throw new Error("Cannot merge into non-objects")
          }
          dataCopy[key] = Object.assign({}, dataCopy[key], subVal)
          break
        default:
          dataCopy[key] = update(dataCopy[key], value)
      }
    }
  }
  return dataCopy
}

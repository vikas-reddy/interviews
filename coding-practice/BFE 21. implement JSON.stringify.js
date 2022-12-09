function isBoolean(data) {
  return typeof data === "boolean" ||
    typeof data === "object" && data.constructor === Boolean
}

function isNumber(data) {
  return typeof data === "number" ||
    typeof data === "object" && data.constructor === Number
}

function isBigInt(data) {
  return typeof data === "bigint" ||
    typeof data === "object" && data.constructor === BigInt
}

function isString(data) {
  return typeof data === "string" ||
    typeof data === "object" && data.constructor === String
}

function stringifyBoolean(val) {
  val = (typeof val === "boolean")
    ? val
    : val.valueOf()
  return val + ''
}

function stringifyNumber(number) {
  number = (typeof number === "number")
    ? number
    : number.valueOf()
  if (isNaN(number) || number === Infinity || number === -Infinity) {
    return "null"
  }
  return number + ''
}

function stringifyString(str) {
  str = (typeof str === "string")
    ? str
    : str.valueOf()
  return `"${str}"`
}

/**
 * @param {any} data
 * @return {string}
 */
function stringify(data) {
  if (data === undefined) {
    throw new Error("unexpected token")
  }

  if (data === null) {
    return "null"
  }

  if (isNumber(data)) {
    return stringifyNumber(data)
  }

  if (isBoolean(data)) {
    return stringifyBoolean(data)
  }

  if (isString(data)) {
    return stringifyString(data)
  }

  if (isBigInt(data)) {
    throw new Error("cannot serialize BigInt")
  }

  if (typeof data === "symbol") {
    return "null"
  }

  if (typeof data === "function") {
    return undefined
  }

  if (Array.isArray(data)) {
    const results = []
    for (let i = 0; i < data.length; i++) {
      results.push(
        data[i] === undefined
          ? "null"
          : stringify(data[i])
      )
    }
    return `[${results.join(",")}]`
  }

  if (typeof data === "object") {
    // Objects with `toJSON` property should use it
    if (data.toJSON) {
      return `"${data.toJSON()}"`
    }

    // Loop over key values
    const results = []
    for (const key in data) {
      // Serialize only own properties
      if (data.hasOwnProperty && !data.hasOwnProperty(key)) {
        continue
      }

      // Ignore keys with undefined values
      if (data[key] === undefined || typeof data[key] === "function") {
        continue
      }
      results.push(`"${key}":${stringify(data[key])}`)
    }
    return `{${results.join(",")}}`
  }
}

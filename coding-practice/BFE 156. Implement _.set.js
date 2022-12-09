/**
 * 
 * 1. Convert the path into parts
 * 1. Whether a property is accessed using `a[b]` or `a.b`, it doesn't really matter
 * 1. If we encounter a non-existing string, lookahead to see if the next part
 *    is a valid number. If yes, create an array.  Otherwise, create an object
 */

const STRING = /^([a-zA-Z_]+)$/
const NUMBER = /^([0-9]+)$/
const INVALID_NUMBER = /^0[0-9]+$/
const PROP_ACCESS = /^([a-zA-Z_]+)\[([a-zA-Z_]+|[0-9]+)\]$/

function getParts(path) {
  let parts = []
  if (Array.isArray(path)) {
    parts = path
  } else {
    path.split(".").forEach(part => {
      if (STRING.test(part) || NUMBER.test(part)) {
        parts.push(part)
      } else if (PROP_ACCESS.test(part)) {
        const matches = part.match(PROP_ACCESS)
        parts.push(matches[1], matches[2])
      }
    })
  }
  return parts
}

/**
 * @param {object} obj
 * @param {string | string[]} path
 * @param {any} value
 */
function set(obj, path, value) {
  // your code here
  const parts = getParts(path)

  let i;
  // Skip the last part, because it will be used for assignment in the end
  for (i = 0; i < parts.length - 1; i++) {
    if (STRING.test(parts[i])) {
      if (!obj.hasOwnProperty(parts[i])) {
        // If the next part is a valid number, then initialize an array
        if (i < parts.length - 1 &&
          NUMBER.test(parts[i+1]) &&
          !INVALID_NUMBER.test(parts[i+1])) {
          obj[parts[i]] = []
        } else {
          obj[parts[i]] = {}
        }
      }
      obj = obj[parts[i]]
    }
  }
  obj[parts[i]] = value
}
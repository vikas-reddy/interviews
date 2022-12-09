/**
 * @param {object} source
 * @param {string | string[]} path
 * @param {any} [defaultValue]
 * @return {any}
 */
 function get(source, path, defaultValue = undefined) {
  // your code here
  const parts = Array.isArray(path) ? path : path
    .replaceAll("[", ".")
    .replaceAll("]", "")
    .split(".")

  if (parts.length === 0) {
    return defaultValue
  }

  for (const part of parts) {
    if (source[part] === undefined) {
      return defaultValue
    }
    source = source[part]
  }
  return source
}
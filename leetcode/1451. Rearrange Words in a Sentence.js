/**
 * @param {string} text
 * @return {string}
 */
var arrangeWords = function (text) {
  /** @type {Map<number,string[]>} */
  const lengthMap = new Map()

  const words = text
    .split(" ")
    .filter(word => word.length > 0)

  for (const word of words) {
    const len = word.length
    if (!lengthMap.has(len)) {
      lengthMap.set(len, [])
    }
    lengthMap.get(len).push(word.toLowerCase())
  }

  // Entries of map
  const entries = [...lengthMap.entries()]

  // Sort entries by length ASC
  entries.sort((a, b) => a[0] - b[0])

  // Titleize first word
  entries[0][1][0] = entries[0][1][0].replace(/^([a-z])/, (matches, first) => first.toUpperCase())

  // Join the words to form the result sentence
  return entries
    .map(e => e[1].join(" "))
    .join(" ")
};
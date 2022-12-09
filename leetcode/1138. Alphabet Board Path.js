/**
 * @param {string} target
 * @return {string}
 */
 var alphabetBoardPath = function(target) {
  let result = ""
  for (let i = 0; i < target.length; i++) {
      result += pathBetween(i === 0 ? "a" : target[i-1], target[i])
      result += "!"
  }
  return result
};

function pathBetween (source, dest) {
  if (source === dest) {
      return ""
  }
  if (source !== "z" && dest !== "z") {
      return pathBetweenHelper(source, dest)
  }
  if (source === "z") {
      return "U" + pathBetweenHelper("u", dest)
  }
  if (dest === "z") {
      return pathBetweenHelper(source, "u") + "D"
  }
}

function pathBetweenHelper (source, dest) {
  let path = ""
  const [sourceX, sourceY] = charToCoords(source)
  const [destX, destY] = charToCoords(dest)
  path += Array(Math.abs(sourceX - destX))
      .fill(sourceX >= destX ? "U" : "D")
      .join("")
  path += Array(Math.abs(sourceY - destY))
      .fill(sourceY >= destY ? "L" : "R")
      .join("")
  return path 
}

function charToCoords (char) {
  const charCode = char.charCodeAt(0) - ("a").charCodeAt(0)
  const row = Math.floor(charCode / 5)
  const col = charCode % 5
  return [row, col]
}


const STRING = /^"(.*)"$/
const NUMBER = /^([0-9]+(\.[0-9]+)?)$/

function tokenize(str) {
  const tokens = []
  let stringTokenStarted = false
  let temp = ""
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "'") {
      throw new Error("Invalid token '")
    }
    // Strings are delimited by double quotes
    if (str[i] === '"') {
      temp += str[i]
      if (stringTokenStarted) {
        tokens.push(temp)
        temp = ""
        stringTokenStarted = false
      } else {
        stringTokenStarted = true
      }
      continue
    }

    // Anything inside a double quote is a valid string
    if (stringTokenStarted) {
      temp += str[i]
      continue
    }

    if (['[', ']', '{', '}', ',', ':'].includes(str[i])) {
      if (temp.length) {
        tokens.push(temp)
      }
      tokens.push(str[i])
      temp = ""
      continue
    }
    temp += str[i]
  }
  if (temp) {
    tokens.push(temp)
  }
  return tokens
}

function buildArray(tokens) {
  const result = []
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "[" || tokens[i] === "]") {
      continue
    }
    if (tokens[i] === ",") {
      if (tokens[i-1] === "," || tokens[i+1] === "," ||
        tokens[i-1] === "[" || tokens[i+1] === "]"
      ) {
        throw new Error("Unexpected token ','")
      }
      continue
    }
    result.push(parseItem(tokens[i]))
  }
  return result
}

function buildObj(tokens) {
  const result = {}
  let key
  for (let i = 0; i < tokens.length; i++) {
    if (
      (tokens[i] === "}" && tokens[i-1] === ",") ||
      (tokens[i] === "}" && tokens[i-1] === ":") ||
      (tokens[i] === ":" && tokens[i-1] === "{") ||
      (tokens[i] === "," && tokens[i-1] === "{") ||
      (tokens[i] === "," && tokens[i-1] === ",")
    ) {
        throw new Error("Unexpected token")
    }

    if (["{", "}", ",", ":"].includes(tokens[i])) {
      continue
    }

    if (key === undefined) {
      key = parseItem(tokens[i])
    } else {
      result[key] = parseItem(tokens[i])
      key = undefined
    }
  }
  if (key !== undefined) {
    throw new Error("Invalid object")
  }
  return result
}

function parseItem(item) {
  if (typeof item !== "string") {
    return item
  }

  if (STRING.test(item)) {
    const matches = item.match(STRING)
    return matches[1]
  }
  if (NUMBER.test(item)) {
    return Number(item)
  }
  if (item === "true") {
    return true
  }
  if (item === "false") {
    return false
  }
  if (item === "null") {
    return null
  }
  return item
}

/**
 * @param {string} str
 * @return {object | Array | string | number | boolean | null}
 */
function parse(str) {
  const tokens = tokenize(str)
  console.log(tokens)
  const stack = []

  for (const token of tokens) {
    if (token === "[" || token === "{") {
      stack.push(token)
      continue
    }

    // Array
    if (token === "]") {
      const arrayTokens = [token]
      while (stack[stack.length - 1] !== "[") {
        arrayTokens.unshift(stack.pop())
      }
      arrayTokens.unshift(stack.pop())
      stack.push(buildArray(arrayTokens))
      continue
    }

    // Object
    if (token === "}") {
      const objTokens = [token]
      while (stack[stack.length - 1] !== "{") {
        objTokens.unshift(stack.pop())
      }
      objTokens.unshift(stack.pop())
      stack.push(buildObj(objTokens))
      continue
    }

    stack.push(token)
  }
  console.log(stack[0])
  return parseItem(stack[0])
}

const obj = {
  stringKey: "one",
  stringObjKey: "ONE",
  numberKey: "two",
  numberObjKey: "TWO",
  floatKey: 123.45,
  booleanKey: "three",
  booleanObjKey: "THREE",
  commaKey: ",",
  squareBracketKey: "[",
  curlyBracketKey: "{",
  symbolKey: Symbol("four"),
  symbolObjKey: Symbol("FOUR"),
  nullKey: null,
  undefinedKey: undefined,
  arrayKey: [
    1, 2, , , 5, undefined
  ],
  dateKey: new Date(),
  objectKey: {
    one: 1,
    two: 2,
    three: undefined,
    four: null,
  }
}

const objStr = JSON.stringify(obj)
// const objStr = `{"one":2:}`
// const objStr = "null"
// const objStr = `{"stringKey":"one","stringObjKey":"ONE","numberKey":"two","numberObjKey":"TWO","booleanKey":"three","booleanObjKey":"THREE","nullKey":null,"arrayKey":[1,2,null,null,5,null],"dateKey":"2022-10-06T00:49:55.191Z","objectKey":{"one":1,"two":2,"four":null}}`
console.log("mine", parse(objStr))
console.log("original", JSON.parse(objStr))
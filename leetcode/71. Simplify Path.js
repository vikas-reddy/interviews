/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath1 = function (path) {
  let components = path.split(/\//);
  // Ignore empty and "." entries
  components = components.filter(c => c.length > 0 && c !== ".");

  let i = 0;
  while (true) {
    while (i < components.length && components[i] !== "..") {
      i++;
    }
    // No more ".."
    if (i === components.length) {
      break;
    }

    if (i === 0) {
      components = components.slice(1);
    } else {
      components = [...components.slice(0, i - 1), ...components.slice(i + 1)]
      i--;
    }
  }
  // components = components;
  return '/' + components.join('/');
};

/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  let components = path.split(/\//);
  // Ignore empty and "." entries
  components = components.filter(c => c.length > 0 && c !== ".");
  
  const result = [];
  for (const c of components) {
    if (c === "..") {
      if (result.length) {
        result.pop();
      }
    } else {
      result.push(c);
    }
  }
  return '/' + result.join('/');
};

console.log(simplifyPath(
  // "/home/"
  // "/user//home/../vikas"
  // "/user//home/../../vikas"
  // "/../../something"
  "/Users//vreddy/Work/////interviews/leetcode/../.../leetcode"
))
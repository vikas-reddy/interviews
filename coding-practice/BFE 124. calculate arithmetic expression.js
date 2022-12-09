const OPERATORS = [
  '+',
  '-',
  '*',
  '/',
  '(',
  ')',
];

const NUMBER = /[0-9\.]/;

const PRECEDENCE = {
  '*': 2,
  '/': 2,
  '+': 1,
  '-': 1,
};

/**
 * @param {string} str
 * @return {Generator}
 */
function* tokenize(str) {
  // your code here
  for (let i = 0; i < str.length; i++) {
    // Skip spaces
    if (str[i] === " ") {
      continue;
    }

    // Return operator
    if (OPERATORS.includes(str[i])) {
      yield str[i];
    } else {
      // Collect number and return
      const left = i;
      let right = i;
      while (NUMBER.test(str[++right])) {} // do nothing
      yield parseFloat(str.slice(left, right));

      // Accommodate the for loop's `i++`
      i = right - 1;
    }
  }
}

/**
 * @param {string} str
 * @returns {Number}
 */
function calculate(str) {
  // your code here
  const tokens = [...tokenize(str)];

  // convert to postfix
  const postfix = [];
  const stack = [];
  for (const token of tokens) {
    if (typeof token === "number") {
      postfix.push(token);
    } else if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      while (stack[stack.length - 1] !== "(") {
        postfix.push(stack.pop());
      }
      // Discard "("
      stack.pop();
    } else if (OPERATORS.includes(token)) {
      // Higher precedence operators operate first
      while (stack[stack.length - 1] !== "(" &&
        PRECEDENCE[stack[stack.length - 1]] >= PRECEDENCE[token]) {
        postfix.push(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length) {
    postfix.push(stack.pop());
  }

  // Infix Evaluation
  stack.splice(0);
  for (const token of postfix) {
    let a, b;
    switch (token) {
      case "+":
        b = stack.pop();
        a = stack.pop();
        stack.push(a + b);
        break;
      case "-":
        b = stack.pop();
        a = stack.pop();
        stack.push(a - b);
        break;
      case "*":
        b = stack.pop();
        a = stack.pop();
        stack.push(a * b);
        break;
      case "/":
        b = stack.pop();
        a = stack.pop();
        stack.push(a / b);
        break;
      default:
        stack.push(token);
        break;
    }
  }

  return stack[0];
}
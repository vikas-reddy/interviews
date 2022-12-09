function printNumbersInRange(from, to) {
  let current = from;
  let intervalId;
  // Using setInterval
  intervalId = setInterval(() => {
    if (current > to) {
      clearInterval(intervalId);
    } else {
      console.log(current++);
    }
  }, 100);
  // Using nested setTimeout
  let timeoutId = setTimeout(function fn() {
    if (current > to) {
      clearTimeout(timeoutId);
    } else {
      console.log(current++);
      timeoutId = setTimeout(fn, 100);
    }
  }, 100)
}
// printNumbersInRange(42, 45);

function spy(func) {
  function fn() {
    fn.calls.push(Array.from(arguments))
    return func.apply(this, arguments);
  }
  fn.calls = [];
  return fn;
}

/*
function work(a, b) {
  console.log( a + b ); // work is an arbitrary function or method
}
work = spy(work);
work(1, 2); // 3
work(4, 5); // 9
for (let args of work.calls) {
  console.log( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
*/

/*
function throttle(func, wait) {
  let isWaiting;
  let lastArguments;
  return function throttledFn() {
    if (isWaiting) {
      lastArguments = arguments;
    } else {
      func.apply(this, arguments);
      isWaiting = true;

      setTimeout(() => {
        isWaiting = false;
        if (lastArguments) {
          throttledFn.apply(this, lastArguments);
          lastArguments = null;
        }
      }, wait);
    }
  }
}
*/

function curried(func) {
  return function curriedFn(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curriedFn.apply(this, args.concat(args2));
      }
    }
  };
}

const curriedFn = curried(function (a,b,c) { return `${a}-${b}-${c}`});
console.log(
  curriedFn(1)(2)(3)
)
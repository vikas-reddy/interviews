const debounce = function (fn, delay) {
  let timeout;
  return (args) => {
    if (timeout) {
      clearTimeout();
    }
    timeout = setTimeout(() => {
      fn(args);
    }, delay)
  };
};

const throttle = function (fn, delay) {
  let tooSoon = false;
  return (args) => {
    if (tooSoon) {
      return;
    }
    setTimeout(() => {
      fn(args);
      tooSoon = true;
    }, delay)
  }
};

const throttleBFE = function (func, wait) {
  let isWaiting = false;
  let lastArgs = null;
  return function (...args) {
    // Store args if we cannot execute now
    if (isWaiting) {
      lastArgs = args;
    } else {
      // Execute immediately
      func.call(this, args);
      isWaiting = true;

      setTimeout(() => {
        isWaiting = false;
        if (lastArgs) {
          func.call(this, lastArgs);
        }
      }, wait);
    }
  };
};

const throttlePractice = function (func, wait) {
  let isWaiting = false;
  let lastArgs = null;
  return (...args) => {
    if (isWaiting) {
      lastArgs = args;
    } else {
      // Execute current call immediately
      fn.call(this, args);
      this.isWaiting = true;

      // Set a timer to run queued calls after wait ms
      setTimeout(() => {
        if (lastArgs) {
          fn.call(this, args);
          lastArgs = null;
        }
        this.isWaiting = false;
      }, wait)
    }
  };
};

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */
const throttleWithLeadingTrailing = function (func, wait, option = { leading: true, trailing: true }) {
  let lastArgs = null;
  let isWaiting = null;

  const runNowAndScheduleNext = () => {
    if (lastArgs && option.trailing) {
      func.apply(this, lastArgs);
      lastArgs = null;
      setTimeout(runNowAndScheduleNext, wait);
      isWaiting = true;
    } else {
      isWaiting = null;
    }
  };

  return (...args) => {
    if (isWaiting) {
      lastArgs = args;
    } else {
      // Execute current call immediately
      if (option.leading) {
        func.apply(this, args);
      }

      // Set a timer to run queued calls after wait ms
      setTimeout(runNowAndScheduleNext, wait);
      isWaiting = true;
    }
  };
};

const fn = () => {
  setTimeout(() => {
    console.log("called");
  }, 200)
};

// debounce(fn, 1000);
fn();
fn();
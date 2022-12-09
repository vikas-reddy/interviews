
// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */
function LazyMan(name, logFn) {
  const _steps = []

  const actions = {
    greet(name) {
      return new Promise(resolve => {
        resolve(logFn(`Hi, I'm ${name}.`))
      })
    },

    eat(food) {
      return new Promise(resolve => {
        resolve(logFn(`Eat ${food}.`))
      })
    },

    sleep(time) {
      return new Promise(resolve => {
        setTimeout(() =>
          resolve(logFn(`Wake up after ${time} second${time > 1 ? 's' : ''}.`)),
          time * 1000
        )
      })
    }
  }

  _steps.push(['greet', name]);

  const executeSteps = async () => {
    for (const [action, arg] of _steps) {
      await actions[action](arg)
    }
  }

  Promise.resolve().then(executeSteps);

  return {
    eat(food) {
      _steps.push(['eat', food]);
      return this
    },
    sleep(time) {
      _steps.push(['sleep', time])
      return this
    },
    sleepFirst(time) {
      _steps.unshift(['sleep', time])
      return this
    }
  }
}

// LazyMan('Jack', console.log)
const laziness = LazyMan('Jack', console.log)
  .eat('banana')
  .eat('apple')
  .sleep(1)
  .eat('orange')
  .sleepFirst(2)


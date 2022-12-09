class AmznPromise {
  constructor (executionFn) {
    this.promiseChain = [];
    this.handleError = () => {};
    executionFn(this.resolve.bind(this), this.reject.bind(this));
  }

  then(successFn) {
    this.promiseChain.push(successFn);
    return this;
  }

  catch(errorFn) {
    this.handleError = errorFn;
    return this;
  }

  resolve(value) {
    let totalValue = value;
    try {
      this.promiseChain.forEach(promiseFn => {
        totalValue = promiseFn(totalValue);
      });
    } catch (error) {
      this.promiseChain = [];
      this.reject(error);
    }
  }

  reject(error) {
    this.handleError(error);
  }

  static all(promises) {
    if (!promises.length) {
      return Promise.resolve([]);
    }
    const [first, ...rest] = promises;
    return Promise.resolve(first).then(firstResult => 
      AmznPromise.all(rest).then(restResults => 
        [firstResult, ...restResults]
      )
    );
  }
}

const promise1 = new AmznPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success 1000");
  }, 1000);
});

const promise2 = new AmznPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success 2000");
  }, 2000);
});

const promise3 = new AmznPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success 3000");
  }, 3000);
});

/*
[promise1, promise2, promise3].reduce((acc, promise) => {
  return acc.then(accResult => 
    Promise.resolve(promise).then(result =>
      [...accResult, result]
    )
  );
}, Promise.resolve([])).then(console.log);
*/
const promiseAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject();
    }
    const result = Array(promises.length);
    let promisesFinished = 0;
    promises.forEach((promise, idx) => {
      Promise.resolve(promise).then(value => {
        result[idx] = value;
        promisesFinished++;
        
        if (promisesFinished === promises.length) {
          resolve(result);
        }
      });
    });
  });
};
// promiseAll([promise1, promise2, promise3]).then(console.log)

const promiseAny = function (promises) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(promises) && promises.length) {
      const errors = [];
      promises.forEach((promise, idx) => {
        Promise.resolve(promise)
          .then(value => resolve(value))
          .catch(error => {
            errors[idx] = error;

            if (errors.length === promises.length) {
              reject(new AggregateError("No Promise in Promise.any was resolved", errors));
            }
          })
      });
    } else {
      throw new AggregateError("No Promise in Promise.any was resolved", []);
    }
  });
};
promiseAny([promise1, promise2, promise3]).then(console.log)

/*
AmznPromise.all([promise1, promise2, promise3]).then((res) => {
  console.log(...res);
})
*/


/*
promise.then(response => {
  console.log(response);
}).catch(err => {
  console.log(err);
})
*/

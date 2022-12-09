class Middleware {
  functions = []

  /**
   * @param {MiddlewareFunc | ErrorHandler} func
   */
  use(func) {
    this.functions.push(func)
  }

  /**
   * @param {Request} req
   */
  start(req) {
    this.req = req
    this.next()
  }

  // Arrow function to not deal with `this`
  next = (err) => {
    const func = this.functions.shift()
    try {
      switch (func.length) {
        case 2:
          if (err) {
            this.next(err)
          } else {
            func(this.req, this.next)
          }
          break;
        case 3:
          func(err, this.req, this.next)
      }
    } catch(e) {
      this.next(e)
    }
  }
}

const req = {}
const middleware = new Middleware()
const error1 = new Error('error1')
const error2 = new Error('error2')
middleware.use((req, next) => {
  setTimeout(() => {
    req.a = 1
    next()
  }, 100)
})
middleware.use((req, next) => {
  setTimeout(() => {
    req.b = 2
    next(error1)
  }, 10)
})
middleware.use((req, next) => {
  setTimeout(() => {
    req.c = 3
    next()
  }, 20)
})
middleware.use((req, next) => {
  console.log('called', 'not called')
})
middleware.use((_error, req, next) => {
  console.log(_error === error1)
  throw error2
})
middleware.use((_error, req, next) => {
  console.log(_error === error2)
})
middleware.start(req)

/*
const req = {}
const middleware = new Middleware()
const error1 = new Error('error')
middleware.use((req, next) => {
  setTimeout(() => {
    req.a = 1
    next()
  }, 100)
})
middleware.use((req, next) => {
  setTimeout(() => {
    req.b = 2
    next(error1)
  }, 10)
})
middleware.use((req, next) => {
  setTimeout(() => {
    req.c = 3
    next()
  }, 20)
})
middleware.use((req, next) => {
  console.log('called', 'not called')
})
middleware.use((_error, req, next) => {
  console.log(req, {a:1, b:2})
  console.log(_error, error1)
})
middleware.start(req)
*/
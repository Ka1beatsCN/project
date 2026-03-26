const PENDING = 'pending'
const FULFULLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  #status = PENDING
  #result = undefined
  #onFulfilleds = []
  #onRejecteds = []

  constructor(excutor) {
    if(typeof excutor !== 'function') {
      throw `Promise resolver ${excutor} is not a function`
    }

    const resolve = (value) => {
      this.#changeStatus(FULFULLED, value)
    }

    const reject = (reason) => {
      this.#changeStatus(REJECTED, reason)
    }

    try {
      excutor(resolve, reject)
    } catch(err) {
      reject(err)
    }
  }

  #changeStatus(state, result) {
    if(this.#status === PENDING) {
      this.#status = state
      this.#result = result
      this.#run()
    }
  }

  #run() {
    if(this.#status === FULFULLED) {
      this.#onFulfilleds.forEach(item => item(this.result))
    } else {
      this.#onRejecteds.forEach(item => item(this.result))
    }
  }

  then(onFulfilled, onRejected) {
    const promise2 =  new MyPromise((resolve, reject) => {
      const handlePromise = (func, excutor) => {
        try {
          if(typeof excutor !== 'function') {
            func(this.#result)
          } else {
            let x = excutor(this.#result);
            resolvePromise(promise2, x, resolve, reject);
          }
        } catch(err) {
          console.log(err)
        }
      }
      const res = () => handlePromise(resolve, onFulfilled)
      const rej = () => handlePromise(reject, onRejected)
      if(this.#status === PENDING) {
        this.#onFulfilleds.push(() => mircoTask(res))
        this.#onRejecteds.push(() => mircoTask(rej))
      } else if(this.#status === FULFULLED){
        mircoTask(res)
      } else {
        mircoTask(rej)
      }
    })

    return promise2
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if(promise2 === x) {
    return reject(new TypeError('...'))
  }
  if(x && x.then) {
    try {
      x.then(y => resolvePromise(promise2, y, resolve, reject))
    } catch(err) {
      reject(err)
    }
  } else {
    resolve(x)
  }
}

function mircoTask(func) {
  setTimeout(func)
}

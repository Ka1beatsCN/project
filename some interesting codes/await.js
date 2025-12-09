function genAsync(genf) {
  return function(...args) {
    const gen = genf.call(this, ...args)

    return new Promise((res, rej) => {
      function step(key, arg) {
        let genRes
        try {
          genRes = gen[key][arg]
        } catch(err) {
          return rej(err)
        }

        const {val, done} = genRes

        if(done) {
          return res(val)
        } 
        return Promise.resolve(val).then(v => step['next'](val), err => step['throw'](err))
      }
    
      step('next')
    })
  }
}
/*
  // compiler change async to generator
  function * test() { // async test() {
    const a = yield asyncFunc() // const a = await asyncFunc()
    {}
    const b = yield asyncFunc() // const b = await asyncFunc()
    {}
    const c = yield asyncFunc() // const c = await asyncFunc()
  }
  
  const gen = genAsync(test)
  gen().then(...)
*/
  

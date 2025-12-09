'use strict';
// apply
Function.prototype.myApply = function(tar, args = []) {
  // number boolean string symbol
  const typeSet = new Set(['number', 'boolean', 'string', 'symbol'])
  if(typeSet.has(typeof args)) {
    throw new TypeError('CreateListFromArrayLike called on non-object')
  }
  const sbl = Symbol()

  if(tar !== null && tar !== undefined) { tar = Object(tar) }
  tar[sbl] = this
  args = Array.isArray(args) ? args : []
  const res = tar[sbl](...args)
  
  delete tar[sbl]
  return res
}

// call
Function.prototype.myCall = function(tar, ...args) {
  const sbl = Symbol()

  if(tar !== null && tar !== undefined) { tar = Object(tar) }
  tar[sbl] = this
  const res = tar[sbl](...args)
  
  delete tar[sbl]
  return res
}

// bind
Function.prototype.myBind = function(tar, ...args) {
  if(typeof this !== 'function') {
    throw Error('error')
  }
  if(tar !== null && tar !== undefined) { tar = Object(tar) }

  const func = this
  return function newf(...newArgs) {
    if(new.target) {
        newf.prototype = func.prototype
        return new func(...[...args, ...newArgs])
    }
    return currentFunc.apply(context, [...args, ...newArgs])
  }
}

// new
function myNew(func, ...args) {
  const obj = Object.create(func.prototype)
  const ans = func.call(obj, ...args)

  return ans instanceof Object ? ans : obj
}


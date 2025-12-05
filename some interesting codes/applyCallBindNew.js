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


// new



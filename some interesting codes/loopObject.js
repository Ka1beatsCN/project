function isObjectLoop(obj) {
  // null undefined
  if(typeof obj !== 'object' || obj === null) return false
  const weakSet = new WeakSet()
  function helper(tar) {
    let isLoop = false
    weakSet.add(tar)
    for(k in tar) {
        const x = tar[k]
        if(typeof x !== 'object' || x === null) continue

        if(weakSet.has(x)) {
            return true
        } else {
            isLoop = helper(x)
        }
        if(isLoop) return true
    }
    return false
  } 
  return helper(obj)
}

// deep clone loopObject
const deepClone = function (obj) {
  if(typeof tar !== 'object' || tar === null) throw new TypeError('clone target must be object')
  
  const wSet = new WeakSet()
  function copy(tar) {
    wSet.add(tar)
    const newObj = Array.isArray(tar) ? []: {}
    
    for(let k in tar) {
      if(tar.hasOwnProperty(k)) {
        const x = tar[k]
        if(typeof x !== 'object' || x === null) newObj[k] = x
        else if(wSet.has(x)) newObj[k] = x
        else {
          newObj[k] = copy(x)
        }
      }
    }
    return newObj
  }
  return copy(obj)
}

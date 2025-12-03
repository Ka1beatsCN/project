function composer(functions) {
  function helper(i) {
    if(i < functions.length - 1) {
      return () => functions[i](helper(i+1))
    }
    return () => functions[i](() => {})
  }
  return helper(0)
}

// use generator to compose onion
function composer2(functions){
  let next;
  let gen = function* (){
      yield* functions
  }
  let gg = gen()

  next = () => gg.next().value?.(next)

  return next
}

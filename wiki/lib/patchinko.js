function P(target){
  for(var i = 1; i < arguments.length; i++)
    for(var key in arguments[i])
      if(arguments[i].hasOwnProperty(key))
        arguments[i][key] === D || arguments[i][key] === O 
        ? delete target[key]
        : target[key] =
          arguments[i][key] instanceof S
          ? arguments[i][key].apply(target[key])
          : arguments[i][key]

  return target
}

function S(closure){
  if(!(this instanceof S))
    return new S(closure)

  this.apply = function(definition){
    return closure(definition)
  }
}

function PS(target, input){
  return new S(
    arguments.length === 2
    ? function(definition){
      return P(target, definition, input)
    }
    : function(definition){
      return P(definition, target)
    }
  )
}

function D(){}

function O(x){
  return arguments.length
    ? 1 < arguments.length
      ? P.apply(null, arguments)
      : typeof x === 'function'
        ? new S(x)
        : PS(x)
    : D
}

try {
  module.exports = {P: P, S: S, PS: PS, D: D, O: O}
} catch(e) {}

function copy(x){
  var y = new x.constructor

  for(var z in x)
    if(x.hasOwnProperty(z))
      y[z] = x[z]

  return y
}

function O(a, b, c){
  if(arguments.length == 1)
    if(this instanceof O)
      this.apply =
        typeof a == 'function' ? a : function(b){
          return O(b != null ? b : {}, a)
        }

    else
      return new O(a)

  else if(a == null)
    return arguments.length > 2 ? O.call.apply(O, arguments) : b

  else {
    a = copy(a)

    for(var i = 1; i < arguments.length; i++, b = arguments[i])
      for(var key in b)
        if(b.hasOwnProperty(key))
          b[key] == O
          ? delete a[key]
          : a[key] =
            b[key] instanceof O
            ? b[key].apply(
              typeof a[key] == 'object'
              ? copy(a[key])
              : a[key]
            )
            : b[key]

    return a
  }
}

try {
  module.exports = O
} catch(e) {}

// Credit: https://github.com/HenrikJoreteg/feather-route-matcher

// regexes borrowed from backbone
var optionalParam = /\((.*?)\)/g
var namedParam = /(\(\?)?:\w+/g
// eslint-disable-next-line no-useless-escape
var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g
var splatParam = /\*/g

// Parses a URL pattern such as `/users/:id`
// and builds and returns a regex that can be used to
// match said pattern. Credit for these
// regexes belongs to Jeremy Ashkenas and the
// other maintainers of Backbone.js
//
// It has been modified for extraction of
// named parameters from the URL
var parsePattern = function (pattern) {
  var names = []
  pattern = pattern
    .replace(escapeRegExp, '\\$&')
    .replace(optionalParam, '(?:$1)?')
    .replace(namedParam, function (match, optional) {
      names.push(match.slice(1))
      return optional ? match : '([^/?]+)'
    })
    .replace(splatParam, function () {
      names.push('path')
      return '([^?]*?)'
    })

  return {
    regExp: new RegExp('^' + pattern + '(?:\\?([\\s\\S]*))?$'),
    namedParams: names
  }
}

export default function (routes) {
  var keys = Object.keys(routes)
  var routeCache = {}

  // loop through each route we're
  // and build the shell of our
  // route cache.
  for (var item in routes) {
    routeCache[item] = {
      value: routes[item]
    }
  }

  // main result is a function that can be called
  // with the url
  return function (url) {
    var params
    var route

    // start looking for matches
    var matchFound = keys.some(function (key) {
      var parsed

      // fetch the route pattern from the cache
      // there will always be one
      route = routeCache[key]

      // if the route doesn't already have
      // a regex we never generated one
      // so we do that here lazily.
      // Parse the pattern to generate the
      // regex once, and store the result
      // for next time.
      if (!route.regExp) {
        parsed = parsePattern(key)
        route.regExp = parsed.regExp
        route.namedParams = parsed.namedParams
        route.pattern = key
      }

      // run our cached regex
      var result = route.regExp.exec(url)

      // if null there was no match
      // returning falsy here continues
      // the `Array.prototype.some` loop
      if (!result) {
        return
      }

      // remove other cruft from result
      result = result.slice(1, -1)

      // reduce our match to an object of named parameters
      // we've extracted from the url
      params = result.reduce(function (obj, val, index) {
        if (val) {
          obj[route.namedParams[index]] = val
        }
        return obj
      }, {})

      // stops the loop
      return true
    })

    // no routes matched
    if (!matchFound) {
      return null
    }

    return {
      value: route.value,
      params: params,
      url: url,
      pattern: route.pattern
    }
  }
}

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["urlMapper"] = factory();
	else
		root["urlMapper"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./compileRoute.js":
/*!*************************!*\
  !*** ./compileRoute.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var URLON = __webpack_require__(/*! urlon */ "./node_modules/urlon/lib/urlon.js")
var pathToRegexp = __webpack_require__(/*! path-to-regexp */ "./node_modules/path-to-regexp/index.js")

function getKeyName (key) {
  return key.name.toString()
}

// loose escaping for segment part
// see: https://github.com/pillarjs/path-to-regexp/pull/75
function encodeSegment (str) {
  return encodeURI(str).replace(/[/?#'"]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

function compileRoute (route, options) {
  var re
  var compiled
  var keys = []
  var querySeparator = options.querySeparator || '?'

  re = pathToRegexp(route, keys)
  keys = keys.map(getKeyName)
  compiled = pathToRegexp.compile(route)

  return {
    parse: function (url) {
      var path = url
      var result = {}

      if (~path.indexOf('#') && !~querySeparator.indexOf('#')) {
        path = path.split('#')[0]
      }

      if (~path.indexOf(querySeparator)) {
        if (options.query) {
          var queryString = '$' + path.slice(path.indexOf(querySeparator) + querySeparator.length)
          result = URLON.parse(queryString)
        }
        path = path.split(querySeparator)[0]
      }

      var match = re.exec(path)
      if (!match) return null

      for (var i = 1; i < match.length; ++i) {
        var key = keys[i - 1]
        var value = match[i] && decodeURIComponent(match[i])
        result[key] = (value && value[0] === ':')
          ? URLON.parse(value)
          : value
      }

      return result
    },

    stringify: function (values) {
      var pathParams = {}
      var queryParams = {}

      Object.keys(values).forEach(function (key) {
        if (~keys.indexOf(key)) {
          switch (typeof values[key]) {
            case 'boolean':
            case 'number':
              pathParams[key] = URLON.stringify(values[key])
              break

            case 'object':
              if (values[key]) {
                throw new Error('URL Mapper - objects are not allowed to be stringified as part of path')
              } else { // null
                pathParams[key] = URLON.stringify(values[key])
              }
              break

            default:
              pathParams[key] = values[key]
          }
        } else {
          queryParams[key] = values[key]
        }
      })

      var path = compiled(pathParams, { encode: encodeSegment })
      var queryString = ''

      if (options.query) {
        if (Object.keys(queryParams).length) {
          queryString = URLON.stringify(queryParams).slice(1)
        }
      }

      return path + (queryString ? querySeparator + queryString : '')
    }
  }
}

module.exports = compileRoute


/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var mapper = __webpack_require__(/*! ./mapper */ "./mapper.js")
var compileRoute = __webpack_require__(/*! ./compileRoute */ "./compileRoute.js")

module.exports = function urlMapper (options) {
  return mapper(compileRoute, options)
}


/***/ }),

/***/ "./mapper.js":
/*!*******************!*\
  !*** ./mapper.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function mapper (compileFn, options) {
  if (typeof compileFn !== 'function') throw new Error('URL Mapper - function to compile a route expected as first argument')

  options = options || {}
  var cache = {}

  function getCompiledRoute (route) {
    if (!cache[route]) {
      cache[route] = compileFn(route, options)
    }

    return cache[route]
  }

  function parse (route, url) {
    if (arguments.length < 2) throw new Error('URL Mapper - parse method expects 2 arguments')
    return getCompiledRoute(route).parse(url)
  }

  function stringify (route, values) {
    if (arguments.length < 2) throw new Error('URL Mapper - stringify method expects 2 arguments')
    return getCompiledRoute(route).stringify(values)
  }

  function map (url, routes) {
    if (arguments.length < 2) throw new Error('URL Mapper - map method expects 2 arguments')
    for (var route in routes) {
      var compiled = getCompiledRoute(route)
      var values = compiled.parse(url)
      if (values) {
        var match = routes[route]

        return {
          route: route,
          match: match,
          values: values
        }
      }
    }
  }

  return {
    parse: parse,
    stringify: stringify,
    map: map
  }
}


/***/ }),

/***/ "./node_modules/path-to-regexp/index.js":
/*!**********************************************!*\
  !*** ./node_modules/path-to-regexp/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/'
var DEFAULT_DELIMITERS = './'

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER
  var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS
  var pathEscaped = false
  var res

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      pathEscaped = true
      continue
    }

    var prev = ''
    var next = str[index]
    var name = res[2]
    var capture = res[3]
    var group = res[4]
    var modifier = res[5]

    if (!pathEscaped && path.length) {
      var k = path.length - 1

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k]
        path = path.slice(0, k)
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
      pathEscaped = false
    }

    var partial = prev !== '' && next !== undefined && next !== prev
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = prev || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    })
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index))
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (data, options) {
    var path = ''
    var encode = (options && options.encode) || encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token
        continue
      }

      var value = data ? data[token.name] : undefined
      var segment

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) continue

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j], token)

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value), token)

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment
        continue
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix

        continue
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  if (!keys) return path

  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        pattern: null
      })
    }
  }

  return path
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options))
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER)
  var delimiters = options.delimiters || DEFAULT_DELIMITERS
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
  var route = ''
  var isEndDelimited = false

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.repeat
        ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*'
        : token.pattern

      if (keys) keys.push(token)

      if (token.optional) {
        if (token.partial) {
          route += prefix + '(' + capture + ')?'
        } else {
          route += '(?:' + prefix + '(' + capture + '))?'
        }
      } else {
        route += prefix + '(' + capture + ')'
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + delimiter + ')?'

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')'
  } else {
    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?'
    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys)
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
  }

  return stringToRegexp(/** @type {string} */ (path), keys, options)
}


/***/ }),

/***/ "./node_modules/urlon/lib/urlon.js":
/*!*****************************************!*\
  !*** ./node_modules/urlon/lib/urlon.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable no-labels */


var keyStringifyRegexp = /([=:@$/])/g
var valueStringifyRegexp = /([&;/])/g
var keyParseRegexp = /[=:@$]/
var valueParseRegexp = /[&;]/

function encodeString (str, regexp) {
  return encodeURI(str.replace(regexp, '/$1'))
}

function trim (res) {
  return typeof res === 'string' ? res.replace(/;+$/g, '') : res
}

function stringify (input, recursive) {
  if (!recursive) {
    return trim(stringify(input, true))
  }
  // Number, Boolean or Null
  if (
    typeof input === 'number' ||
    input === true ||
    input === false ||
    input === null
  ) {
    return ':' + input
  }
  var res = []
  // Array
  if (input instanceof Array) {
    for (var i = 0; i < input.length; ++i) {
      typeof input[i] === 'undefined'
        ? res.push(':null')
        : res.push(stringify(input[i], true))
    }
    return '@' + res.join('&') + ';'
  }
  // Object
  if (typeof input === 'object') {
    for (var key in input) {
      var val = stringify(input[key], true)
      if (val) {
        res.push(encodeString(key, keyStringifyRegexp) + val)
      }
    }
    return '$' + res.join('&') + ';'
  }
  // undefined
  if (typeof input === 'undefined') {
    return
  }
  // String
  return '=' + encodeString(input.toString(), valueStringifyRegexp)
}

function parse (str) {
  var pos = 0
  str = decodeURI(str)

  function readToken (regexp) {
    var token = ''
    for (; pos !== str.length; ++pos) {
      if (str.charAt(pos) === '/') {
        pos += 1
        if (pos === str.length) {
          token += ';'
          break
        }
      } else if (str.charAt(pos).match(regexp)) {
        break
      }
      token += str.charAt(pos)
    }
    return token
  }

  function parseToken () {
    var type = str.charAt(pos++)
    // String
    if (type === '=') {
      return readToken(valueParseRegexp)
    }
    // Number, Boolean or Null
    if (type === ':') {
      var value = readToken(valueParseRegexp)
      if (value === 'true') {
        return true
      }
      if (value === 'false') {
        return false
      }
      value = parseFloat(value)
      return isNaN(value) ? null : value
    }
    var res
    // Array
    if (type === '@') {
      res = []
      loop: {
        // empty array
        if (pos >= str.length || str.charAt(pos) === ';') {
          break loop
        }
        // parse array items
        while (1) {
          res.push(parseToken())
          if (pos >= str.length || str.charAt(pos) === ';') {
            break loop
          }
          pos += 1
        }
      }
      pos += 1
      return res
    }
    // Object
    if (type === '$') {
      res = {}
      loop: {
        if (pos >= str.length || str.charAt(pos) === ';') {
          break loop
        }
        while (1) {
          var name = readToken(keyParseRegexp)
          res[name] = parseToken()
          if (pos >= str.length || str.charAt(pos) === ';') {
            break loop
          }
          pos += 1
        }
      }
      pos += 1
      return res
    }
    // Error
    throw new Error('Unexpected char ' + type)
  }

  return parseToken()
}

module.exports = {
  stringify: stringify,
  parse: parse
}


/***/ })

/******/ });
});
//# sourceMappingURL=url-mapper.js.map
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/decode-uri-component/index.js":
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ "./node_modules/feather-route-matcher/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/feather-route-matcher/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
// named paramaters from the URL
function parsePattern (pattern) {
  var names = []
  pattern = pattern
    .replace(escapeRegExp, '\\$&')
    .replace(optionalParam, '(?:$1)?')
    .replace(namedParam, function (match, optional) {
      names.push(match.slice(1))
      return optional ? match : '([^/?]+)'
    })
    .replace(splatParam, function (match, optional) {
      names.push('path')
      return '([^?]*?)'
    })

  return {
    regExp: new RegExp('^' + pattern + '(?:\\?([\\s\\S]*))?$'),
    namedParams: names
  }
}

/* harmony default export */ __webpack_exports__["default"] = (function (routes, fallback) {
  var keys = Object.keys(routes)

  // loop through each route we're
  // and build the shell of our
  // route cache.
  for (var item in routes) {
    if (routes.hasOwnProperty(item)) {
      routes[item] = {
        value: routes[item]
      }
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
      route = routes[key]

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

      // reduce our match to an object of named paramaters
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
      if (fallback) {
        return {
          page: fallback,
          url: url,
          params: null
        }
      }
      return null
    }

    return {
      page: route.value,
      params: params,
      url: url,
      pattern: route.pattern
    }
  }
});


/***/ }),

/***/ "./node_modules/meiosis-routing/router-helper/index.ts":
/*!*************************************************************!*\
  !*** ./node_modules/meiosis-routing/router-helper/index.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * `meiosis-routing/router-helper`
 *
 * The `router-helper` module contains functions for creating a router by plugging in a router
 * library.
 *
 * @module routerHelper
 */
Object.defineProperty(exports, "__esModule", { value: true });
////////
const getPathWithoutQuery = (path) => path.replace(/\?.*/, "");
const getQuery = (path) => {
    const idx = path.indexOf("?");
    return idx >= 0 ? path.substring(idx + 1) : "";
};
const extractMatches = (matches) => {
    if (matches) {
        return matches.map((param) => param.substring(1));
    }
    else {
        return [];
    }
};
function findPathParams(path) {
    return extractMatches(path.match(/:[^/?]*/g));
}
exports.findPathParams = findPathParams;
function findQueryParams(path) {
    return extractMatches(path.match(/[?&][^?&]*/g));
}
exports.findQueryParams = findQueryParams;
function setParams(path, params) {
    return findPathParams(path).reduce((result, pathParam) => {
        const value = encodeURI(params[pathParam] || "");
        const key = ":" + pathParam;
        const idx = result.indexOf(key);
        return result.substring(0, idx) + value + result.substring(idx + key.length);
    }, getPathWithoutQuery(path));
}
exports.setParams = setParams;
const getConfig = (config) => config == null
    ? ["/", [], {}]
    : typeof config === "string"
        ? [config, [], {}]
        : config.length === 2
            ? Array.isArray(config[1])
                ? [config[0], config[1], {}]
                : [config[0], [], config[1]]
            : config;
const pick = (obj, props) => props.reduce((result, prop) => {
    if (obj[prop] != null) {
        result[prop] = obj[prop];
    }
    return result;
}, {});
function convertToPath(routeConfig, routeOrRoutes, qsStringify) {
    let path = "";
    let lookup = routeConfig;
    let query = {};
    const routes = Array.isArray(routeOrRoutes) ? routeOrRoutes : [routeOrRoutes];
    routes.forEach((route) => {
        const [configPath, _parentParams, children] = getConfig(lookup[route.id]);
        path += setParams(configPath, route.params);
        lookup = children;
        const queryParams = findQueryParams(configPath);
        query = Object.assign(query, pick(route.params, queryParams));
    });
    if (Object.keys(query).length > 0 && typeof qsStringify === "function") {
        path += "?" + qsStringify(query);
    }
    return path;
}
exports.convertToPath = convertToPath;
// Returns { "/path": fn(params) => [route] }
function createRouteMap(routeConfig = {}, path = "", fn = (_none) => [], acc = {}) {
    return Object.entries(routeConfig).reduce((result, [id, config]) => {
        const [configPath, parentParams, children] = getConfig(config);
        const routeParams = findPathParams(configPath)
            .concat(findQueryParams(configPath))
            .concat(parentParams);
        const localPath = path + getPathWithoutQuery(configPath);
        const routeFn = (params) => fn(params).concat({ id, params: pick(params, routeParams) });
        result[localPath] = routeFn;
        createRouteMap(children, localPath, routeFn, result);
        return result;
    }, acc);
}
exports.createRouteMap = createRouteMap;
/**
 * Generic function to create a router from a router library of your choice.
 *
 * To use this function, write a `createXYZRouter` function that in turn calls `createRouter`.
 * All config parameters except for `createParsePath` are normally passed-thru from
 * `createXYZRouter` to `createRouter`, unless you want to define specific implementations of
 * `getPath`, `setPath`, and/or `addLocationChangeListener`.
 *
 * The key parse is `createParsePath`. This is where you define how to plug in to the router
 * library of your choice.
 *
 * `function createParsePath(routeMap, defaultRoute)` receives a `routeMap` which is an object
 * with
 *
 * @param config
 * @returns the created router.
 *
 * @example
 *
 * ```
 *
 * // Example of a createParsePath function with feather-route-matcher
 * const createParsePath = (routeMap, defaultRoute) => {
 *   const routeMatcher = createRouteMatcher(routeMap);
 *
 *   const parsePath = (path, queryParams) => {
 *     const match = routeMatcher(path);
 *
 *     if (match) {
 *       return match.page(Object.assign({}, match.params, queryParams));
 *     } else {
 *       return defaultRoute;
 *     }
 *   };
 *   return parsePath;
 * };
 * ```
 */
function createRouter(config) {
    const { routeConfig, createParsePath, defaultRoute } = config;
    const prefix = config.prefix != null ? config.prefix : "#";
    const getPath = config.getPath === undefined
        ? () => document.location.hash || prefix + "/"
        : config.getPath;
    const setPath = config.setPath === undefined
        ? (path) => window.history.pushState({}, "", path)
        : config.setPath;
    const queryString = config.queryString || {};
    const addLocationChangeListener = config.addLocationChangeListener ||
        ((listener) => {
            window.onpopstate = listener;
        });
    const routeMap = createRouteMap(routeConfig);
    const parsePathFn = createParsePath ? createParsePath(routeMap, defaultRoute) : null;
    const parsePath = parsePathFn
        ? (pathWithPrefix) => {
            const path = pathWithPrefix.substring(prefix.length);
            const query = getQuery(path);
            const queryParams = query.length === 0 || !queryString.parse ? {} : queryString.parse(query);
            return parsePathFn(getPathWithoutQuery(path), queryParams);
        }
        : () => [];
    const toPath = (route) => prefix + convertToPath(routeConfig, route, queryString.stringify);
    // Function to keep the location bar in sync
    const locationBarSync = (route) => {
        const path = toPath(route);
        if (getPath() !== path) {
            setPath(path);
        }
    };
    // Listen to location changes and call navigateTo()
    const start = ({ navigateTo }) => {
        const parsePathAndNavigate = () => navigateTo(parsePath(getPath()));
        addLocationChangeListener(parsePathAndNavigate);
    };
    const initialRoute = parsePath ? parsePath(getPath()) : undefined;
    return { initialRoute, locationBarSync, parsePath, routeMap, start, toPath };
}
exports.createRouter = createRouter;
/**
 * Creates a router using
 * [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher).
 *
 * @param config
 *
 * @example
 *
 * ```
 *
 * import createRouteMatcher from "feather-route-matcher";
 * import queryString from "query-string"; // only if using query strings
 *
 * const Route = createRouteSegments([...]);
 *
 * const routeConfig = { ... };
 *
 * const router = createFeatherRouter({
 *   createRouteMatcher,
 *   routeConfig,
 *   defaultRoute: [Route.Home()],
 *   queryString // only if using query strings
 * });
 * ```
 */
function createFeatherRouter(config) {
    const createParsePath = (routeMap, defaultRoute) => {
        const routeMatcher = config.createRouteMatcher(routeMap);
        const parsePath = (path, queryParams) => {
            const match = routeMatcher(path);
            if (match) {
                const params = Object.keys(match.params || {}).reduce((result, key) => {
                    result[key] = decodeURI(match.params[key]);
                    return result;
                }, {});
                return match.page(Object.assign({}, params, queryParams));
            }
            else {
                return defaultRoute;
            }
        };
        return parsePath;
    };
    return createRouter(Object.assign({ createParsePath }, config));
}
exports.createFeatherRouter = createFeatherRouter;
/**
 * Creates a router using
 * [url-mapper](https://github.com/cerebral/url-mapper).
 *
 * @param config
 *
 * @example
 *
 * ```
 *
 * import Mapper from "url-mapper";
 * import urlon from "urlon"; // only if using query strings
 *
 * const Route = createRouteSegments([...]);
 *
 * const routeConfig = { ... };
 *
 * const router = createUrlMapperRouter({
 *   Mapper,
 *   routeConfig,
 *   defaultRoute: [Route.Home()],
 *   queryString: urlon // only if using query strings
 * });
 * ```
 */
function createUrlMapperRouter(config) {
    const createParsePath = (routeMap, defaultRoute) => {
        const urlMapper = config.Mapper();
        const parsePath = (path, queryParams) => {
            const matchedRoute = urlMapper.map(path, routeMap);
            if (matchedRoute) {
                return matchedRoute.match(Object.assign({}, matchedRoute.values, queryParams));
            }
            else {
                return defaultRoute;
            }
        };
        return parsePath;
    };
    return createRouter(Object.assign({ createParsePath }, config));
}
exports.createUrlMapperRouter = createUrlMapperRouter;
/**
 * Creates a router using [Mithril Router](https://mithril.js.org/route.html).
 *
 * @param config
 *
 * @example
 *
 * ```
 *
 * import m from "mithril";
 * // Note: query strings are built-in to Mithril
 *
 * const Route = createRouteSegments([...]);
 *
 * const routeConfig = { ... };
 *
 * const router = createMithrilRouter({
 *   m,
 *   routeConfig
 * });
 * ```
 */
function createMithrilRouter(config) {
    const queryString = { stringify: config.m.buildQueryString };
    const router = createRouter(Object.assign({ prefix: "#!", queryString }, config));
    router.MithrilRoutes = ({ states, actions, App }) => Object.entries(router.routeMap).reduce((result, [path, fn]) => {
        result[path] = {
            onmatch: (params) => actions.navigateTo(fn(params)),
            render: () => config.m(App, { state: states(), actions })
        };
        return result;
    }, {});
    return router;
}
exports.createMithrilRouter = createMithrilRouter;


/***/ }),

/***/ "./node_modules/meiosis-routing/state/index.ts":
/*!*****************************************************!*\
  !*** ./node_modules/meiosis-routing/state/index.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * `meiosis-routing/state`
 *
 * The `state` module contains functions for managing routes in the application state.
 *
 * @module state
 */
Object.defineProperty(exports, "__esModule", { value: true });
////////
// fastDeepEqual credit: https://github.com/epoberezkin/fast-deep-equal
// This version does not handle Date and RegExp, because we shouldn't have those types when
// parsing a URL string.
const isArray = Array.isArray;
const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;
const fastDeepEqual = (a, b) => {
    if (a === b)
        return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
        const arrA = isArray(a), arrB = isArray(b);
        let i, length, key;
        if (arrA && arrB) {
            length = a.length;
            if (length != b.length)
                return false;
            for (i = length; i-- !== 0;)
                if (!fastDeepEqual(a[i], b[i]))
                    return false;
            return true;
        }
        if (arrA != arrB)
            return false;
        const keys = keyList(a);
        length = keys.length;
        if (length !== keyList(b).length)
            return false;
        for (i = length; i-- !== 0;)
            if (!hasProp.call(b, keys[i]))
                return false;
        for (i = length; i-- !== 0;) {
            key = keys[i];
            if (!fastDeepEqual(a[key], b[key]))
                return false;
        }
        return true;
    }
    return a !== a && b !== b;
};
const defaultEmpty = (route) => (Array.isArray(route) ? route : []);
/**
 * Creates a `Route` helper with functions to create route segments.
 *
 * @param routeNames the list of route names.
 * @returns a `Route` object with constructor functions.
 *
 * @example
 *
 * ```
 *
 * const Route = createRouteSegments(["Home", "User"]);
 *
 * Route.Home()
 * // { id: "Home", params: {} }
 *
 * Route.User({ name: "duck" })
 * // { id: "User", params: { name: "duck" } }
 * ```
 */
function createRouteSegments(routeNames) {
    return routeNames.reduce((result, id) => {
        result[id] = (params) => ({
            id,
            params: params == null ? {} : params
        });
        return result;
    }, {});
}
exports.createRouteSegments = createRouteSegments;
/**
 * Looks for a route segment, with matching params, in a route.
 *
 * @param route the route to search.
 * @param routeSegmentWithParams the route segment to search for in the route.
 * @returns the matching Route segment, or `undefined` if `route` is empty or the route segment
 * was not found.
 */
function findRouteSegmentWithParams(route, routeSegmentWithParams) {
    return defaultEmpty(route).find((routeSegment) => routeSegment.id === routeSegmentWithParams.id &&
        fastDeepEqual(routeSegment.params, routeSegmentWithParams.params));
}
exports.findRouteSegmentWithParams = findRouteSegmentWithParams;
/**
 * Looks for a Route segment, regardless of the params, in a route.
 *
 * @param route the route to search.
 * @param id the route segment, or just the id of the route segment, to search for in the route.
 * @returns the matching Route segment, or `undefined` if `route` is empty or a route segment with
 * the given id was not found.
 */
function findRouteSegment(route, id) {
    const findId = id.id || id;
    return defaultEmpty(route).find((routeSegment) => routeSegment.id === findId);
}
exports.findRouteSegment = findRouteSegment;
/**
 * Calculates the difference between two routes.
 *
 * @param from
 * @param to
 * @returns the route representing the segments that are in the `from` route but not in the `to`
 * route.
 */
function diffRoute(from, to) {
    const init = {};
    return defaultEmpty(from).reduce((result, fromRouteSegment) => {
        if (findRouteSegmentWithParams(to, fromRouteSegment) === undefined) {
            result[fromRouteSegment.id] = fromRouteSegment;
        }
        return result;
    }, init);
}
exports.diffRoute = diffRoute;
/**
 * Calculates route transitions, providing `leave`, `arrive`, and `params` to indicate the route
 * segments for the route that we are leaving, the route to which we are arriving, and the route
 * for which params have changed, respectively.
 *
 * @param currentRoute the current route, before navigation.
 * @param nextRoute the route to which we are navigating.
 * @returns an object with `leave`, `arrive`, and `params` properties.
 */
function routeTransition(currentRoute, nextRoute) {
    return {
        leave: diffRoute(currentRoute, nextRoute),
        arrive: diffRoute(nextRoute, currentRoute)
    };
}
exports.routeTransition = routeTransition;
/**
 * Calls a function with a value only if the value is not `null` or `undefined`.
 *
 * @param value the value to check.
 * @param fn the function to call if `value` is present.
 * @returns the result of calling `fn(value)`, or `null` if `value` is absent.
 */
function whenPresent(value, fn) {
    return value != null ? fn(value) : null;
}
exports.whenPresent = whenPresent;
/**
 * @constructor [[RoutingObject]]
 *
 * @param route the current route, for example `state.route.current`.
 * @param index the route segment index. This is used internally and you should not specify a value
 * for this parameter.
 *
 * @example
 *
 * ```
 *
 * // in root component
 * const Root = ({ state }) => {
 *   const routing = Routing(state.route.current);
 *   const Component = componentMap[routing.localSegment.id];
 *
 *   return (
 *     <div>
 *       <Component // other props... // routing={routing} />
 *     </div>
 *   );
 * };
 *
 * // in child component
 * const Child = ({ state, routing }) => {
 *   const Component = componentMap[routing.childSegment.id];
 *   const params = routing.localSegment.params;
 *
 *   return (
 *     <div>
 *       <a href={router.toPath(routing.parentRoute())}>...</a>
 *       <a href={router.toPath(routing.childRoute(Route.Child()))}>...</a>
 *       <a href={router.toPath(
 *         routing.siblingRoute([Route.Sibling(), Route.Details()])
 *       )}>...</a>
 *
 *       <Component // other props... // routing={routing.next()} />
 *     </div>
 *   );
 * };
 * ```
 */
function Routing(route = [], index = 0) {
    return {
        route,
        index,
        localSegment: route[index] === undefined ? { id: "", params: {} } : route[index],
        childSegment: route[index + 1] === undefined ? { id: "", params: {} } : route[index + 1],
        next: () => Routing(route, index + 1),
        parentRoute: () => route.slice(0, index),
        childRoute: (child) => route.slice(0, index + 1).concat(child),
        siblingRoute: (sibling) => route.slice(0, index).concat(sibling),
        sameRoute: (params) => route
            .slice(0, index)
            .concat({ id: route[index].id, params })
            .concat(route.slice(index + 1))
    };
}
exports.Routing = Routing;
/**
 * Convenience function which puts the given route into an object of the form
 * `{ route }`.
 */
function navigateTo(route) {
    return { route: Array.isArray(route) ? route : [route] };
}
exports.navigateTo = navigateTo;
/**
 * Convenience function which creates a `navigateTo` action.
 */
function Actions(update) {
    return {
        navigateTo: (route) => update(navigateTo(route))
    };
}
exports.Actions = Actions;


/***/ }),

/***/ "./node_modules/meiosis-setup/common/index.js":
/*!****************************************************!*\
  !*** ./node_modules/meiosis-setup/common/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Application object.
 *
 * @typedef {Object} app
 * @property {Object} [initial={}] - an object that represents the initial state.
 * If not specified, the initial state will be `{}`.
 * @property {Function} [Actions=()=>({})] - a function that creates actions, of the form
 * `update => actions`.
 * @property {Array<Function>} [services=[]] - an array of service functions, each of which
 * should be `state => patch?`.
 * @property {Function} [Effects=()=>[]] - a function that creates effects, of the form
 * `(update, actions) => [effects]`, which each effect is `state => void` and calls `update`
 * and/or `actions`.
 */

/**
 * Stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
 * which you provide either a function or an object with a `stream` function to create a stream. The
 * function or object must also have a `scan` property. The returned stream must have a `map`
 * method.
 *
 * @typedef {Object|Function} StreamLib
 * @param {*} [value] - the stream's initial value.
 * @property {Function} stream - the function to create a stream, if the stream library itself is
 * not a function.
 * @property {Function} scan - the stream library's `scan` function.
 * @return {simpleStream} - the created stream.
 */

/**
 * Base helper to setup the Meiosis pattern. If you are using Mergerino, Function Patches, or Immer,
 * use their respective `setup` function instead.
 *
 * Patch is merged in to the state by default. Services have access to the state and can return a
 * patch that further updates the state. State changes by services are available to the next
 * services in the list.
 *
 * After the services have run and the state has been updated, effects are executed and have the
 * opportunity to trigger more updates.
 *
 * @async
 * @function meiosis.common.setup
 *
 * @param {StreamLib} stream - the stream library. This works with `meiosis.simpleStream`, `flyd`,
 * `m.stream`, or anything for which you provide either a function or an object with a `stream`
 * function to create a stream. The function or object must also have a `scan` property. The
 * returned stream must have a `map` method.
 * @param {Function} accumulator - the accumulator function.
 * @param {Function} combine - the function that combines an array of patches into one.
 * @param {app} app - the app, with optional properties.
 *
 * @returns {Object} - `{ states, update, actions }`, where `states` and `update` are streams, and
 * `actions` are the created actions.
 */
/* harmony default export */ __webpack_exports__["default"] = (({ stream, accumulator, combine, app }) => {
  if (!stream) {
    throw new Error("No stream library was specified.");
  }
  if (!accumulator) {
    throw new Error("No accumulator function was specified.");
  }
  if (!combine) {
    throw new Error("No combine function was specified.");
  }

  app = Object.assign({ initial: {}, Actions: () => ({}), services: [], Effects: () => [] }, app);

  const singlePatch = patch => (Array.isArray(patch) ? combine(patch) : patch);
  const accumulatorFn = (state, patch) => (patch ? accumulator(state, singlePatch(patch)) : state);

  const createStream = typeof stream === "function" ? stream : stream.stream;
  const scan = stream.scan;

  const update = createStream();

  const runServices = startingState =>
    app.services.reduce((state, service) => accumulatorFn(state, service(state)), startingState);

  const states = scan(
    (state, patch) => runServices(accumulatorFn(state, patch)),
    runServices(app.initial),
    update
  );

  const actions = app.Actions(update, states);
  const effects = app.Effects(update, actions);

  states.map(state => effects.forEach(effect => effect(state)));

  return { update, states, actions };
});


/***/ }),

/***/ "./node_modules/meiosis-setup/mergerino/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/meiosis-setup/mergerino/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common */ "./node_modules/meiosis-setup/common/index.js");


/**
 * Helper to setup the Meiosis pattern with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @async
 * @function meiosis.mergerino.setup
 *
 * @param {StreamLib} stream - the stream library. This works with `meiosis.simpleStream`, `flyd`,
 * `m.stream`, or anything for which you provide either a function or an object with a `stream`
 * function to create a stream. The function or object must also have a `scan` property.
 * The returned stream must have a `map` method.
 * @param {Function} merge - the Mergerino `merge` function.
 * @param {app} app - the app, with optional properties.
 *
 * @returns {Object} - `{ update, states, actions }`, where `update` and `states` are streams,
 * and `actions` are the created actions.
 */
/* harmony default export */ __webpack_exports__["default"] = (({ stream, merge, app }) =>
  Object(_common__WEBPACK_IMPORTED_MODULE_0__["default"])({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app
  }));


/***/ }),

/***/ "./node_modules/meiosis-setup/react/index.js":
/*!***************************************************!*\
  !*** ./node_modules/meiosis-setup/react/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Helper to setup the Meiosis pattern with [React](https://reactjs.org/).
 *
 * @function meiosis.react.setup
 *
 * @param {React} React - the React instance.
 * @param {React.Component} Root - your Root component, which receives `state`, `update`, and
 * `actions`.
 *
 * @returns {React.Component} - the top-level component to which you pass `states`, and either
 * `update`, `actions`, or both.
 */
/* harmony default export */ __webpack_exports__["default"] = (({ React, Root }) => ({ states, update, actions }) => {
  const [init, setInit] = React.useState(false);
  const [state, setState] = React.useState(states());

  if (!init) {
    setInit(true);
    states.map(setState);
  }

  return React.createElement(Root, { state, update, actions });
});


/***/ }),

/***/ "./node_modules/meiosis-setup/simple-stream/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/meiosis-setup/simple-stream/index.js ***!
  \***********************************************************/
/*! exports provided: stream, scan, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stream", function() { return stream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scan", function() { return scan; });
/**
 * A simple stream.
 *
 * @typedef {Function} simpleStream
 * @param {*} [value] - emits a value onto the stream. When not specified, returns the
 * stream's latest value.
 * @property {Function} map - creates a new stream for which the values from the original stream
 * are processed by the passed-in function and emitted onto the new stream.
 */

/**
 * Creates a stream.
 * @function meiosis.simpleStream.stream
 * @param {*} [initial] - the stream's initial value.
 * @returns {simpleStream} the created stream.
 */
const stream = initial => {
  const mapFunctions = [];
  let latestValue = initial;
  const createdStream = value => {
    if (value !== undefined) {
      latestValue = value;
      for (const i in mapFunctions) {
        mapFunctions[i](value);
      }
    }
    return latestValue;
  };
  createdStream.map = mapFunction => {
    const newStream = stream(latestValue !== undefined ? mapFunction(latestValue) : undefined);

    mapFunctions.push(value => {
      newStream(mapFunction(value));
    });

    return newStream;
  };
  return createdStream;
};

/**
 * Creates a new stream that starts with the initial value and, for each value arriving onto
 * the source stream, emits the result of calling the accumulator function with the latest
 * result and the source stream value.
 *
 * @function meiosis.simpleStream.scan
 *
 * @param {Function} accumulator - a two-parameter function, the result of which is emitted
 * onto the returned stream.
 * @param {*} initial - the initial value for the returned stream.
 * @param {simpleStream} sourceStream - the source stream from which values are processed by the
 * accumulator function.
 * @returns {simpleStream} the created stream.
 */
const scan = (accumulator, initial, sourceStream) => {
  const newStream = stream(initial);
  let accumulated = initial;

  sourceStream.map(value => {
    accumulated = accumulator(accumulated, value);
    newStream(accumulated);
  });

  return newStream;
};

/* harmony default export */ __webpack_exports__["default"] = ({
  stream,
  scan
});


/***/ }),

/***/ "./node_modules/meiosis-tracer/lib/meiosis-tracer.js":
/*!***********************************************************!*\
  !*** ./node_modules/meiosis-tracer/lib/meiosis-tracer.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports=function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n);var o=function(e){var n=e.streams,t=void 0===n?[]:n,o=e.stringify,r=void 0===o?function(e){return JSON.stringify(e,null,4)}:o,a=e.parse,i=void 0===a?function(e){return JSON.parse(e)}:a,c=e.listen,d=void 0===c?function(e,n){return e.map(n)}:c,u=e.emit,l=void 0===u?function(e,n){return e(n)}:u;if(window&&window.__MEIOSIS_TRACER_GLOBAL_HOOK__){for(var s=[],m=!1,v=[],f=0,y=t.length;f<y;f++){var g="Stream "+f;t[f].stream?(t[f].label=t[f].label||g,v.push(t[f])):v.push({stream:t[f],label:g})}v.forEach(function(e,n){var t=e.stream;d(t,function(e){var t={type:"MEIOSIS_STREAM_VALUE",index:n,value:r(e)};m?window.postMessage(t,"*"):s.push(t)})}),window.addEventListener("message",function(e){if("MEIOSIS_TRACER_INIT"===e.data.type){var n=[];v.forEach(function(e){var t={};Object.keys(e).forEach(function(n){"stream"!==n&&(t[n]=e[n])}),n.push(t)}),window.postMessage({type:"MEIOSIS_STREAM_OPTIONS",value:n},"*"),m=!0,s.forEach(function(e){return window.postMessage(e,"*")}),s.length=0}else if("MEIOSIS_TRIGGER_STREAM_VALUE"===e.data.type){var t=e.data,o=t.index,r=t.value;l(v[o].stream,i(r))}}),window.postMessage({type:"MEIOSIS_PING"},"*")}},r=function(e){return"tracerStreamBox_ "+e},a=function(e){return"tracerStreamBoxHidden_"+e},i=function(e){return"tracerStreamHide_"+e},c=function(e){return"tracerStreamShow_"+e},d=function(e){return"tracerModel_"+e},u=function(e){return"tracerSlider_"+e},l=function(e){return"tracerStepBack_"+e},s=function(e){return"tracerStepForward_"+e},m=function(e){return"tracerSliderValue_"+e},v=function(e){return"tracerSend_"+e},f=function(e){return"tracerReset_"+e},y=function(e){return"tracerAccumulateHistory_"+e},g=function(e){var n=e.index,t=e.model,o=e.value,r=e.max;document.getElementById(d(n)).value=t,null!=r&&(document.getElementById(u(n)).max=r),document.getElementById(u(n)).value=o,document.getElementById(m(n)).innerHTML=o,document.getElementById(l(n)).disabled=o<=0,document.getElementById(s(n)).disabled=o==document.getElementById(u(n)).max};window.__MEIOSIS_TRACER_GLOBAL_HOOK__=!0;var p=[],E=[],h=function(e){var n=e.selector,t=e.sendTracerInit,o=e.triggerStreamValue,h=e.direction,S=void 0===h?"column":h,I=e.theme,w=void 0===I?"light":I,b=e.rows,_=void 0===b?15:b,B=e.cols,x=void 0===B?50:B,C=e.autoSend,O=void 0===C||C,M=document.querySelector(n);if(M){M.classList.add("theme-".concat(w));var L=null;null==t&&(t=function(){window.postMessage({type:"MEIOSIS_TRACER_INIT"},"*")}),null==o&&(o=function(e,n){window.postMessage({type:"MEIOSIS_TRIGGER_STREAM_VALUE",index:e,value:n},"*")});var R=function(e){if(!M.lastChild){var n={onHideTracer:function(){var e=document.getElementById("tracerStreamContainer");L=e.style,e.style="display:none",document.getElementById("tracerSettingsContainer").style="display:none",document.getElementById("tracerShow").style=""},onShowTracer:function(){document.getElementById("tracerStreamContainer").style=L,document.getElementById("tracerSettingsContainer").style="",document.getElementById("tracerShow").style="display:none"},onRowsColsChange:function(n,t){for(var o=0;o<e.length;o++){var r=document.getElementById(d(o));r.rows=n,r.cols=t}},onDirectionChange:function(e){document.getElementById("tracerStreamContainer").style="display:flex;flex-direction:"+e},onAutoChange:function(e){O=e}},t=document.createElement("div");M.append(t),function(e){var n=e.element,t=e.listeners,o=e.direction,r=e.rows,a=e.cols,i=e.autoSend;n.innerHTML="\n    <div id='".concat("tracerSettingsContainer","'>\n      <label title='Align in a row'>\n        <input type='radio' name='direction' value='row'\n          ").concat("row"===o?"checked":""," />\n        Row\n      </label>\n      <label title='Align in a column'>\n        <input type='radio' name='direction' value='column'\n          ").concat("column"===o?"checked":""," />\n        Col\n      </label>\n      <label title='Toggle auto-send'>\n        <input id='").concat("traceAutoSend","' type='checkbox' ").concat(i?"checked":""," />\n        Auto\n      </label>\n      <input title='Number of rows' id='").concat("tracerRows","' type='text' size='2'\n        value='").concat(r,"'/>\n      <span> &times; </span>\n      <input title='Number of columns' id='").concat("tracerCols","' type='text' size='2'\n        value='").concat(a,"'/>\n      <button id='").concat("tracerHide","'>Hide</button>\n    </div>\n    <button id='").concat("tracerShow","' style='display:none'>Show</button>\n  "),document.getElementById("tracerHide").addEventListener("click",function(e){t.onHideTracer()}),document.getElementById("tracerShow").addEventListener("click",function(e){t.onShowTracer()}),document.getElementById("tracerRows").addEventListener("input",function(e){t.onRowsColsChange(parseInt(e.target.value,10),parseInt(document.getElementById("tracerCols").value,10))}),document.getElementById("tracerCols").addEventListener("input",function(e){t.onRowsColsChange(parseInt(document.getElementById("tracerRows").value,10),parseInt(e.target.value,10))});for(var c=document.querySelectorAll("input[name='direction']"),d=0,u=c.length;d<u;d++)c[d].addEventListener("change",function(e){e.target.checked&&t.onDirectionChange(e.target.value)});document.getElementById("traceAutoSend").addEventListener("change",function(e){t.onAutoChange(e.target.checked)})}({element:t,listeners:n,direction:S,rows:_,cols:x,autoSend:O});var h=document.createElement("div");h.id="tracerStreamContainer",h.style="display:flex;flex-direction:column",M.append(h);for(var I=function(e,n){O&&(E[e]=!1,document.getElementById(y(e)).checked=!1,o(e,n))},w=function(n){var t=e[n],S=t.label,w=t.hist,b=t.hide;p.push({history:[],value:-1}),E.push(!1!==w);var B={onSliderChange:function(e){var t=p[n],o=t.history[e];t.value=e,g({index:n,model:o,value:e}),I(n,o)},onStepBack:function(){var e=p[n];e.value=e.value-1;var t=e.history[e.value];g({index:n,model:t,value:e.value}),I(n,t)},onStepForward:function(){var e=p[n];e.value=e.value+1;var t=e.history[e.value];g({index:n,model:t,value:e.value}),I(n,t)},onSend:function(e){o(n,e)},onReset:function(){var e=p[n];e.history.length=0,e.value=-1,g({index:n,model:"",value:e.value,max:e.value})},onHistChange:function(e,n){E[e]=n}},C=document.createElement("div");C.style="flex-grow:1",h.append(C),function(e){var n=e.element,t=e.index,o=e.listeners,g=e.label,p=void 0===g?"":g,E=e.rows,h=e.cols,S=e.hist,I=void 0===S||S,w=e.hide,b=void 0!==w&&w,_="padding:8px;border:1px solid gray";n.innerHTML="\n    <div id='".concat(r(t),"' style='").concat(_,"'>\n      <div>\n        <span>").concat(p,"</span>\n        <label title='Toggle accumulate history'>\n          <input id='").concat(y(t),"' type='checkbox' ").concat(I?"checked":""," />\n          Hist\n        </label>\n        <button id='").concat(i(t),"'>Hide</button>\n      </div>\n      <textarea id='").concat(d(t),"' rows='").concat(E,"' cols='").concat(h,"'>\n      </textarea>\n      <div>\n        <input id='").concat(u(t),"' type='range' min='0' max='0' value='0'\n          style='width: 100%' />\n        <button id='").concat(l(t),"'>&lt</button>\n        <button id='").concat(s(t),"'>&gt</button>\n        <span id='").concat(m(t),"'>-1</span>\n        <button id='").concat(v(t),"'>Send</button>\n        <button id='").concat(f(t),"'>Reset</button>\n      </div>\n    </div>\n    <div id='").concat(a(t),"' style='display:none'>\n      <span>").concat(p," </span>\n      <button id='").concat(c(t),"'>Show</button>\n    </div>\n  "),document.getElementById(u(t)).addEventListener("input",function(e){o.onSliderChange(parseInt(e.target.value,10))});var B=document.getElementById(l(t));B.addEventListener("click",function(e){o.onStepBack()}),B.disabled=!0;var x=document.getElementById(s(t));x.addEventListener("click",function(e){o.onStepForward()}),x.disabled=!0,document.getElementById(v(t)).addEventListener("click",function(e){o.onSend(document.getElementById(d(t)).value)}),document.getElementById(f(t)).addEventListener("click",function(e){o.onReset()});var C=function(e){document.getElementById(r(e)).style="display:none",document.getElementById(a(e)).style=_};document.getElementById(i(t)).addEventListener("click",function(e){return C(t)}),document.getElementById(c(t)).addEventListener("click",function(e){document.getElementById(a(t)).style="display:none",document.getElementById(r(t)).style=_}),document.getElementById(y(t)).addEventListener("change",function(e){o.onHistChange(t,e.target.checked)}),b&&C(t)}({element:C,index:n,listeners:B,label:S,rows:_,cols:x,hist:w,hide:b})},b=0;b<e.length;b++)w(b);!function(e,n){var t=function(){for(var n=window.innerWidth>window.innerHeight?"row":"column",t=document.querySelectorAll("input[name='direction']"),o=0,r=t.length;o<r;o++)t[o].checked=t[o].value===n;e.onDirectionChange(n)};"auto"===n&&window.addEventListener("resize",t),"row"===n||"column"===n?e.onDirectionChange(n):t()}(n,S)}},T=function(e,n){if(E[e]){var t=p[e];t.history.length>0&&(t.history.length=t.value+1),t.history.push(n),t.value=t.history.length-1,g({index:e,model:n,value:t.value,max:t.history.length-1})}};return window.addEventListener("message",function(e){"MEIOSIS_STREAM_OPTIONS"===e.data.type?R(e.data.value):"MEIOSIS_STREAM_VALUE"===e.data.type&&T(e.data.index,e.data.value)}),t(),{receiveStreamOptions:R,receiveStreamValue:T,reset:function(){return null}}}};n.default=function(e){if(null!=e.streams&&o(e),null!=e.selector)return h(e)}}]);
//# sourceMappingURL=meiosis-tracer.js.map

/***/ }),

/***/ "./node_modules/mergerino/dist/mergerino.min.js":
/*!******************************************************!*\
  !*** ./node_modules/mergerino/dist/mergerino.min.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const e=Object.assign||((e,t)=>(t&&Object.keys(t).forEach(o=>e[o]=t[o]),e)),t=(e,r,s)=>{const c=typeof s;if(s&&"object"===c)if(Array.isArray(s))for(const o of s)r=t(e,r,o);else for(const c of Object.keys(s)){const f=s[c];"function"==typeof f?r[c]=f(r[c],o):void 0===f?e&&!isNaN(c)?r.splice(c,1):delete r[c]:null===f||"object"!=typeof f||Array.isArray(f)?r[c]=f:"object"==typeof r[c]?r[c]=f===r[c]?f:o(r[c],f):r[c]=t(!1,{},f)}else"function"===c&&(r=s(r,o));return r},o=(o,...r)=>{const s=Array.isArray(o);return t(s,s?o.slice():e({},o),r)};/* harmony default export */ __webpack_exports__["default"] = (o);
//# sourceMappingURL=mergerino.min.js.map

/***/ }),

/***/ "./node_modules/query-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "./node_modules/strict-uri-encode/index.js");
const decodeComponent = __webpack_require__(/*! decode-uri-component */ "./node_modules/decode-uri-component/index.js");
const splitOnFirst = __webpack_require__(/*! split-on-first */ "./node_modules/split-on-first/index.js");

const isNullOrUndefined = value => value === null || value === undefined;

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;

				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};

		case 'bracket':
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}

				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};

		case 'comma':
		case 'separator':
			return key => (result, value) => {
				if (value === null || value === undefined || value.length === 0) {
					return result;
				}

				if (result.length === 0) {
					return [[encode(key, options), '=', encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
			};

		default:
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, encode(key, options)];
				}

				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'comma':
		case 'separator':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.split('').indexOf(options.arrayFormatSeparator) > -1;
				const newValue = isArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
				accumulator[key] = newValue;
			};

		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function validateArrayFormatSeparator(value) {
	if (typeof value !== 'string' || value.length !== 1) {
		throw new TypeError('arrayFormatSeparator must be single character string');
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode(value, options) {
	if (options.decode) {
		return decodeComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}

	return input;
}

function getHash(url) {
	let hash = '';
	const hashStart = url.indexOf('#');
	if (hashStart !== -1) {
		hash = url.slice(hashStart);
	}

	return hash;
}

function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return input.slice(queryStart + 1);
}

function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}

	return value;
}

function parse(input, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ',',
		parseNumbers: false,
		parseBooleans: false
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof input !== 'string') {
		return ret;
	}

	input = input.trim().replace(/^[?#&]/, '');

	if (!input) {
		return ret;
	}

	for (const param of input.split('&')) {
		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : ['comma', 'separator'].includes(options.arrayFormat) ? value : decode(value, options);
		formatter(decode(key, options), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}

	if (options.sort === false) {
		return ret;
	}

	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = (object, options) => {
	if (!object) {
		return '';
	}

	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ','
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const shouldFilter = key => (
		(options.skipNull && isNullOrUndefined(object[key])) ||
		(options.skipEmptyString && object[key] === '')
	);

	const formatter = encoderForArrayFormat(options);

	const objectCopy = {};

	for (const key of Object.keys(object)) {
		if (!shouldFilter(key)) {
			objectCopy[key] = object[key];
		}
	}

	const keys = Object.keys(objectCopy);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};

exports.parseUrl = (input, options) => {
	return {
		url: removeHash(input).split('?')[0] || '',
		query: parse(extract(input), options)
	};
};

exports.stringifyUrl = (input, options) => {
	const url = removeHash(input.url).split('?')[0] || '';
	const queryFromUrl = exports.extract(input.url);
	const parsedQueryFromUrl = exports.parse(queryFromUrl);
	const hash = getHash(input.url);
	const query = Object.assign(parsedQueryFromUrl, input.query);
	let queryString = exports.stringify(query, options);
	if (queryString) {
		queryString = `?${queryString}`;
	}

	return `${url}${queryString}${hash}`;
};


/***/ }),

/***/ "./node_modules/split-on-first/index.js":
/*!**********************************************!*\
  !*** ./node_modules/split-on-first/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};


/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);


/***/ }),

/***/ "./src/app/index.ts":
/*!**************************!*\
  !*** ./src/app/index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __webpack_require__(/*! ../routes */ "./src/routes/index.ts");
const tea_1 = __webpack_require__(/*! ../tea */ "./src/tea/index.ts");
const teaDetails_1 = __webpack_require__(/*! ../teaDetails */ "./src/teaDetails/index.ts");
exports.createApp = (initialRoute) => ({
    initial: routes_1.navigateTo(initialRoute || routes_1.Route.Home()),
    Actions: (update) => Object.assign({}, routes_1.routes.Actions(update)),
    services: [routes_1.routes.service, tea_1.tea.service, teaDetails_1.teaDetails.service],
    Effects: (update) => [tea_1.tea.effect(update)]
});


/***/ }),

/***/ "./src/home/index.ts":
/*!***************************!*\
  !*** ./src/home/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = __webpack_require__(/*! ./view */ "./src/home/view.tsx");
exports.Home = view_1.Home;


/***/ }),

/***/ "./src/home/view.tsx":
/*!***************************!*\
  !*** ./src/home/view.tsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
exports.Home = ({ state }) => (React.createElement("div", null,
    React.createElement("div", null, "Home Page"),
    state.user && React.createElement("div", null,
        "You are logged in as: ",
        state.user)));


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const react_dom_1 = __webpack_require__(/*! react-dom */ "react-dom");
const simple_stream_1 = __webpack_require__(/*! meiosis-setup/simple-stream */ "./node_modules/meiosis-setup/simple-stream/index.js");
const mergerino_1 = __webpack_require__(/*! mergerino */ "./node_modules/mergerino/dist/mergerino.min.js");
const react_1 = __webpack_require__(/*! meiosis-setup/react */ "./node_modules/meiosis-setup/react/index.js");
const mergerino_2 = __webpack_require__(/*! meiosis-setup/mergerino */ "./node_modules/meiosis-setup/mergerino/index.js");
const app_1 = __webpack_require__(/*! ./app */ "./src/app/index.ts");
const root_1 = __webpack_require__(/*! ./root */ "./src/root/index.ts");
const router_1 = __webpack_require__(/*! ./router */ "./src/router/index.ts");
// Only for using Meiosis Tracer in development.
const meiosis_tracer_1 = __webpack_require__(/*! meiosis-tracer */ "./node_modules/meiosis-tracer/lib/meiosis-tracer.js");
const App = react_1.default({ React, Root: root_1.Root });
const app = app_1.createApp(router_1.router.initialRoute);
const { states, actions } = mergerino_2.default({ stream: simple_stream_1.default, merge: mergerino_1.default, app });
// Only for using Meiosis Tracer in development.
meiosis_tracer_1.default({
    selector: "#tracer",
    rows: 30,
    streams: [
        // { stream: update, label: "update" },
        { stream: states, label: "states" }
    ]
});
react_dom_1.render(React.createElement(App, { states: states, actions: actions }), document.getElementById("app"));
router_1.router.start({ navigateTo: actions.navigateTo });
states.map(state => router_1.router.locationBarSync(state.route));


/***/ }),

/***/ "./src/root/index.ts":
/*!***************************!*\
  !*** ./src/root/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = __webpack_require__(/*! ./view */ "./src/root/view.tsx");
exports.Root = view_1.Root;


/***/ }),

/***/ "./src/root/view.tsx":
/*!***************************!*\
  !*** ./src/root/view.tsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const state_1 = __webpack_require__(/*! meiosis-routing/state */ "./node_modules/meiosis-routing/state/index.ts");
const home_1 = __webpack_require__(/*! ../home */ "./src/home/index.ts");
const tea_1 = __webpack_require__(/*! ../tea */ "./src/tea/index.ts");
const routes_1 = __webpack_require__(/*! ../routes */ "./src/routes/index.ts");
const router_1 = __webpack_require__(/*! ../router */ "./src/router/index.ts");
const componentMap = {
    Home: home_1.Home,
    Tea: tea_1.Tea
};
exports.Root = ({ state, actions }) => {
    const routing = state_1.Routing(state.route);
    const Component = componentMap[routing.localSegment.id];
    const isActive = (tab) => (tab === Component ? "active" : "");
    return (React.createElement("div", null,
        React.createElement("nav", { className: "navbar navbar-default" },
            React.createElement("ul", { className: "nav navbar-nav" },
                React.createElement("li", { className: isActive(home_1.Home) },
                    React.createElement("a", { href: router_1.router.toPath(routes_1.Route.Home()) }, "Home")),
                React.createElement("li", { className: isActive(tea_1.Tea) },
                    React.createElement("a", { href: router_1.router.toPath(routes_1.Route.Tea()) }, "Tea")))),
        React.createElement(Component, { state: state, actions: actions, routing: routing }),
        React.createElement("div", { style: { visibility: state.pleaseWait ? "visible" : "hidden" } },
            React.createElement("div", { className: "simpleModal" },
                React.createElement("div", { className: "simpleBox" },
                    React.createElement("div", null, "Loading, please wait..."))))));
};


/***/ }),

/***/ "./src/router/index.ts":
/*!*****************************!*\
  !*** ./src/router/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const feather_route_matcher_1 = __webpack_require__(/*! feather-route-matcher */ "./node_modules/feather-route-matcher/index.js");
const queryString = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
const router_helper_1 = __webpack_require__(/*! meiosis-routing/router-helper */ "./node_modules/meiosis-routing/router-helper/index.ts");
const routes_1 = __webpack_require__(/*! ../routes */ "./src/routes/index.ts");
exports.router = router_helper_1.createFeatherRouter({
    createRouteMatcher: feather_route_matcher_1.default,
    queryString,
    routeConfig: routes_1.routeConfig,
    defaultRoute: [routes_1.Route.Home()]
});


/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = __webpack_require__(/*! meiosis-routing/state */ "./node_modules/meiosis-routing/state/index.ts");
exports.Route = state_1.createRouteSegments(["Home", "Tea", "TeaDetails"]);
const beverageRoutes = {
    Beverages: "",
    Beverage: ["/:id", { Brewer: ["/brewer", ["id"]] }]
};
exports.routeConfig = {
    Home: "/",
    Login: "/login",
    Settings: "/settings",
    Tea: ["/tea", { TeaDetails: "/:id" }],
    Coffee: ["/coffee", beverageRoutes],
    Beer: ["/beer?type&country", beverageRoutes]
};
exports.navigateTo = (route) => ({ nextRoute: Array.isArray(route) ? route : [route] });
exports.Actions = (update) => ({ navigateTo: (route) => update(exports.navigateTo(route)) });
const service = (state) => ({
    routeTransition: () => state_1.routeTransition(state.route, state.nextRoute),
    route: state.nextRoute
});
exports.routes = {
    Actions: exports.Actions,
    service
};


/***/ }),

/***/ "./src/tea/effect.ts":
/*!***************************!*\
  !*** ./src/tea/effect.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __webpack_require__(/*! ../teaDetails/data */ "./src/teaDetails/data.ts");
exports.effect = (update) => (state) => {
    if (state.routeTransition.arrive.Tea) {
        setTimeout(() => {
            update({ teas: data_1.teas });
        }, 500);
    }
};


/***/ }),

/***/ "./src/tea/index.ts":
/*!**************************!*\
  !*** ./src/tea/index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __webpack_require__(/*! ./service */ "./src/tea/service.ts");
const effect_1 = __webpack_require__(/*! ./effect */ "./src/tea/effect.ts");
exports.tea = {
    service: service_1.service,
    effect: effect_1.effect
};
var view_1 = __webpack_require__(/*! ./view */ "./src/tea/view.tsx");
exports.Tea = view_1.Tea;


/***/ }),

/***/ "./src/tea/service.ts":
/*!****************************!*\
  !*** ./src/tea/service.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.service = (state) => {
    if (state.routeTransition.leave.Tea) {
        return { teas: null };
    }
};


/***/ }),

/***/ "./src/tea/view.tsx":
/*!**************************!*\
  !*** ./src/tea/view.tsx ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const teaDetails_1 = __webpack_require__(/*! ../teaDetails */ "./src/teaDetails/index.ts");
const routes_1 = __webpack_require__(/*! ../routes */ "./src/routes/index.ts");
const router_1 = __webpack_require__(/*! ../router */ "./src/router/index.ts");
exports.Tea = ({ state, actions, routing }) => (React.createElement("div", null,
    React.createElement("div", null, "Tea Page"),
    React.createElement("div", { className: "row" },
        React.createElement("div", { className: "col-md-6" }, state.teas ? (state.teas.map(tea => (React.createElement("div", { key: tea.id },
            React.createElement("a", { href: router_1.router.toPath(routing.childRoute(routes_1.Route.TeaDetails({ id: tea.id }))) }, tea.title))))) : (React.createElement("div", null, "Loading..."))),
        React.createElement("div", { className: "col-md-6" }, routing.childSegment.id === "TeaDetails" && (React.createElement(teaDetails_1.TeaDetails, { state: state, routing: routing.next() }))))));


/***/ }),

/***/ "./src/teaDetails/data.ts":
/*!********************************!*\
  !*** ./src/teaDetails/data.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.teas = [
    { id: "t1", title: "Tea 1", description: "Description of Tea 1" },
    { id: "t2", title: "Tea 2", description: "Description of Tea 2" }
];
exports.teaMap = exports.teas.reduce((result, next) => {
    result[next.id] = next;
    return result;
}, {});


/***/ }),

/***/ "./src/teaDetails/index.ts":
/*!*********************************!*\
  !*** ./src/teaDetails/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __webpack_require__(/*! ./service */ "./src/teaDetails/service.ts");
exports.teaDetails = {
    service: service_1.service
};
var view_1 = __webpack_require__(/*! ./view */ "./src/teaDetails/view.tsx");
exports.TeaDetails = view_1.TeaDetails;


/***/ }),

/***/ "./src/teaDetails/service.ts":
/*!***********************************!*\
  !*** ./src/teaDetails/service.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __webpack_require__(/*! ./data */ "./src/teaDetails/data.ts");
exports.service = (state) => {
    const patches = [];
    if (state.routeTransition.arrive.TeaDetails) {
        const id = state.routeTransition.arrive.TeaDetails.params.id;
        const description = data_1.teaMap[id].description;
        patches.push({ tea: { [id]: description } });
    }
    if (state.routeTransition.leave.TeaDetails) {
        const id = state.routeTransition.leave.TeaDetails.params.id;
        patches.push({ tea: { [id]: undefined } });
    }
    return patches;
};


/***/ }),

/***/ "./src/teaDetails/view.tsx":
/*!*********************************!*\
  !*** ./src/teaDetails/view.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const router_1 = __webpack_require__(/*! ../router */ "./src/router/index.ts");
exports.TeaDetails = ({ state, routing }) => (React.createElement("div", null,
    React.createElement("div", null, state.tea[routing.localSegment.params.id]),
    React.createElement("div", null,
        React.createElement("a", { href: router_1.router.toPath(routing.parentRoute()) }, "Close"))));


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=generated-app.js.map
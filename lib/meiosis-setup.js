(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Meiosis = factory());
})(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  /**
   * A mapping function.
   *
   * @template T the type of the source value.
   * @template R the type of the returned value.
   */

  /**
   * A stream of values.
   *
   * @template T the type of the stream's values.
   */

  /**
   * Function that creates a stream.
   *
   * @template T the type of the stream's values.
   */

  /**
   * Accumulator function.
   *
   * @template R the type of the result value.
   * @template T the type of the source value.
   */

  /**
   * Stream library `scan` function.
   *
   * @template T the type of the source stream's values.
   * @template R the type of the returned stream's values.
   */

  /**
   * Defines the stream library's `scan` function.
   */

  /**
   * Interface to adapt an external stream library.
   */

  /**
   * Stream library that provides a function to create a stream.
   *
   * @template T the type of the stream's values.
   */

  /**
   * Stream library that provides a `stream` property which is a function to create a stream.
   *
   * @template T the type of the stream's values.
   */

  /**
   * Stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for which
   * you provide either a function or an object with a `stream` function to create a stream. The
   * function or object must also have a `scan` property. The returned stream must have a `map`
   * method.
   */

  /**
   * Creates a stream.
   *
   * @template T the type of the stream's values.
   *
   * @param initial the stream's initial value.
   *
   * @returns the created stream.
   */
  var stream = function stream(initial) {
    var mapFunctions = [];
    var latestValue = initial;

    var createdStream = function createdStream(value) {
      if (arguments.length > 0 && !createdStream.ended) {
        latestValue = value;

        for (var i in mapFunctions) {
          // credit @cmnstmntmn for discovering this bug.
          // Make sure to send the latest value.
          // Otherwise, if f1 triggers another update, f2 will be called with value2 and
          // then value1 (old value).
          mapFunctions[i](latestValue);
        }
      }

      return latestValue;
    };

    createdStream.map = function (mapFunction) {
      var newStream = stream();

      var mappedFunction = function mappedFunction(value) {
        newStream(mapFunction(value));
      };

      mapFunctions.push(mappedFunction);

      newStream.end = function (_value) {
        var idx = mapFunctions.indexOf(mappedFunction);
        newStream.ended = true;
        mapFunctions.splice(idx, 1);
      };

      if (latestValue !== undefined) {
        newStream(mapFunction(latestValue));
      }

      return newStream;
    };

    createdStream.end = function (_value) {
      createdStream.ended = true;
    };

    return createdStream;
  };
  /**
   * Creates a new stream that starts with the initial value and, for each value arriving onto the
   * source stream, emits the result of calling the accumulator function with the latest result and
   * the source stream value.
   */

  var scan = function scan(accumulator, initial, sourceStream) {
    var newStream = stream(initial);
    var accumulated = initial;
    sourceStream.map(function (value) {
      accumulated = accumulator(accumulated, value);
      newStream(accumulated);
    });
    return newStream;
  };
  var simpleStream = {
    stream: stream,
    scan: scan
  };
  /**
   * Credit: James Forbes (https://james-forbes.com/)
   *
   * Creates a `dropRepeats` function, which returns new stream that drops repeated values from the
   * source stream.
   *
   * @param stream the stream library, defaults to simpleStream.
   */

  var createDropRepeats = function createDropRepeats() {
    var stream = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : simpleStream;
    return function (source) {
      var onchange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (state) {
        return state;
      };
      var createStream = typeof stream === 'function' ? stream : stream.stream;
      var prev = undefined;
      var result = createStream();
      source.map(function (state) {
        var next = onchange(state);

        if (next !== prev) {
          prev = next;
          result(state);
        }
      });
      return result;
    };
  };
  /**
   * `dropRepeats` function that uses `simpleStream`.
   */

  var dropRepeats = createDropRepeats();

  /**
   * Safely gets a property path from an object. The path is an array. If any property along the path
   * is `undefined`, the function returns `undefined`.
   *
   * @param object the object on which to get the property.
   * @param path the property path.
   *
   * @returns the property value, or `undefined` if any property along the path is `undefined`.
   */
  var get = function get(object, path) {
    return path.reduce(function (obj, key) {
      return obj == undefined ? undefined : obj[key];
    }, object);
  }; // helpers to update values from input

  /**
   * Represents a DOM event.
   */

  var intoPath = function intoPath(path, value) {
    return _defineProperty({}, path[0], path.length === 1 ? value : intoPath(path.slice(1), value));
  };

  var toPath = function toPath(pathOrProp) {
    return Array.isArray(pathOrProp) ? pathOrProp : [pathOrProp];
  };

  var updateParseValue = function updateParseValue(parseFn, cell, path) {
    return function (evt) {
      var value = parseFn(evt.target.value);

      if (!isNaN(value)) {
        cell.update(intoPath(toPath(path), value));
      }
    };
  };
  /**
   * Convenience function to update a form value. Pass the Meiosis cell and the state property (such
   * as `'firstName'`) or path (such as `['person', 'firstName']`) into which to update the value.
   * Returns a function that you can pass to a DOM handler, such as `oninput` (Mithril) or `onInput`
   * (Preact, React). For example:
   *
   * ```js
   * // Using Mithil
   * m('input[type=text]', { oninput: updateFormValue(cell, 'firstName') })
   *
   * // Using Preact/React
   * <input type="text" onInput={updateFormValue(cell, ['person', 'firstName'])}/>
   * ```
   *
   * @param cell the Meiosis cell.
   * @param path the property or path into which to update the value.
   * @param fn (optional) a function to modify the value before updating it.
   *
   * @returns a function that accepts a DOM event and updates the value on the Meiosis state.
   */


  var updateFormValue = function updateFormValue(cell, path) {
    var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (value) {
      return value;
    };
    return function (evt) {
      return cell.update(intoPath(toPath(path), fn(evt.target.value)));
    };
  };
  /**
   * Convenience function to update a form value with an Integer value. If the user input does not
   * return a number with `parseInt`, no state change occurs. Pass the Meiosis cell and the state
   * property (such as `'counter'`) or path (such as `['book', 'counter']`) into which to update the
   * value. Returns a function that you can pass to a DOM handler, such as `oninput` (Mithril) or
   * `onInput` (Preact, React). For example:
   *
   * ```js
   * // Using Mithil
   * m('input[type=text]', { oninput: updateFormIntValue(cell, 'counter') })
   *
   * // Using Preact/React
   * <input type="text" onInput={updateFormIntValue(cell, ['book', 'counter'])}/>
   * ```
   *
   * @param cell the Meiosis cell.
   * @param path the property or path into which to update the value.
   *
   * @returns a function that accepts a DOM event and updates the value on the Meiosis state.
   */

  var updateFormIntValue = function updateFormIntValue(cell, path) {
    return function (evt) {
      return updateParseValue(parseInt, cell, path)(evt);
    };
  };
  /**
   * Convenience function to update a form value with a Float value. If the user input does not return
   * a number with `parseFloat`, no state change occurs. Pass the Meiosis cell and the state property
   * (such as `'pH'`) or path (such as `['water', 'pH']`) into which to update the value. Returns a
   * function that you can pass to a DOM handler, such as `oninput` (Mithril) or `onInput` (Preact,
   * React). For example:
   *
   * ```js
   * // Using Mithil
   * m('input[type=text]', { oninput: updateFormFloatValue(cell, 'pH') })
   *
   * // Using Preact/React
   * <input type="text" onInput={updateFormFloatValue(cell, ['water', 'pH'])}/>
   * ```
   *
   * @param cell the Meiosis cell.
   * @param path the property or path into which to update the value.
   *
   * @returns a function that accepts a DOM event and updates the value on the Meiosis state.
   */

  var updateFormFloatValue = function updateFormFloatValue(cell, path) {
    return function (evt) {
      return updateParseValue(parseFloat, cell, path)(evt);
    };
  };

  const e=Object.assign||((e,t)=>(t&&Object.keys(t).forEach(o=>e[o]=t[o]),e)),t=(e,r,s)=>{const c=typeof s;if(s&&"object"===c)if(Array.isArray(s))for(const o of s)r=t(e,r,o);else for(const c of Object.keys(s)){const f=s[c];"function"==typeof f?r[c]=f(r[c],o):void 0===f?e&&!isNaN(c)?r.splice(c,1):delete r[c]:null===f||"object"!=typeof f||Array.isArray(f)?r[c]=f:"object"==typeof r[c]?r[c]=f===r[c]?f:o(r[c],f):r[c]=t(!1,{},f);}else "function"===c&&(r=s(r,o));return r},o=(o,...r)=>{const s=Array.isArray(o);return t(s,s?o.slice():e({},o),r)};

  var assoc = function assoc(prop, value, target) {
    target[prop] = value;
    return target;
  };

  var concatIfPresent = function concatIfPresent(target, source) {
    return source ? target.concat(source) : target;
  };

  var assembleInitialState = function assembleInitialState(nestedComponents) {
    return nestedComponents ? Object.keys(nestedComponents).reduce(function (result, key) {
      return assoc(key, Object.assign({}, nestedComponents[key].initial, assembleInitialState(nestedComponents[key].nested)), result);
    }, {}) : {};
  };

  var getInitialState = function getInitialState(app) {
    return Object.assign({}, app.initial, assembleInitialState(app.nested));
  };

  var assembleView = function assembleView(nestedComponents) {
    return nestedComponents ? Object.keys(nestedComponents).reduce(function (result, key) {
      var nestedApp = nestedComponents[key];

      if (nestedApp.view !== undefined) {
        var _view = nestedApp.view;
        return assoc(key, {
          view: function view(cell) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            return _view.apply(void 0, [cell.nest(key)].concat(args));
          },
          nested: assembleView(nestedApp.nested)
        }, result);
      }

      return result;
    }, {}) : {};
  };

  var getView = function getView(app) {
    return assembleView(app.nested);
  };

  var assembleServices = function assembleServices(nestedComponents) {
    var getCell = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (cell) {
      return cell;
    };
    var getState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (state) {
      return state;
    };
    return nestedComponents ? Object.keys(nestedComponents).reduce(function (result, key) {
      var _nestedApp$services;

      var nextGetCell = function nextGetCell(cell) {
        return getCell(cell).nest(key);
      };

      var nextGetState = function nextGetState(state) {
        return getState(state)[key];
      };

      var nestedApp = nestedComponents[key];
      return concatIfPresent(result, (_nestedApp$services = nestedApp.services) === null || _nestedApp$services === void 0 ? void 0 : _nestedApp$services.map(function (service) {
        return {
          onchange: function onchange(state) {
            return service.onchange ? service.onchange(nextGetState(state)) : state;
          },
          run: function run(cell) {
            return service.run(nextGetCell(cell));
          }
        };
      })).concat(assembleServices(nestedApp.nested, nextGetCell, nextGetState));
    }, []) : [];
  };

  var getServices = function getServices(app) {
    return concatIfPresent([], app.services).concat(assembleServices(app.nested));
  };

  var baseSetup = function baseSetup(_ref) {
    var stream = _ref.stream,
        app = _ref.app;

    if (!stream) {
      stream = simpleStream;
    }

    var safeApp = app || {};
    var initial = getInitialState(safeApp);
    var view = getView(safeApp);
    var createStream = typeof stream === 'function' ? stream : stream.stream;
    var scan = stream.scan;
    var update = createStream();
    var states = scan(function (state, patch) {
      return o(state, patch);
    }, initial, update);
    return {
      states: states,
      update: update,
      view: view
    };
  };

  var nestPatch = function nestPatch(patch, prop) {
    return _defineProperty({}, prop, patch);
  };

  var nestUpdate = function nestUpdate(parentUpdate, prop) {
    return function (patch) {
      return parentUpdate(nestPatch(patch, prop));
    };
  };

  var nestCell = function nestCell(states, parentUpdate, components) {
    return function (prop) {
      var nestedStates = states.map(function (state) {
        return state[prop];
      });

      var getNestedState = function getNestedState() {
        return states()[prop];
      };

      var nestedUpdate = nestUpdate(parentUpdate, prop);
      var nestedComponents = get(components, [prop, 'nested']);
      return {
        states: nestedStates,
        state: getNestedState(),
        getState: getNestedState,
        update: nestedUpdate,
        nest: nestCell(nestedStates, nestedUpdate, nestedComponents),
        nested: nestedComponents
      };
    };
  };
  /**
   * Helper to setup the Meiosis pattern with [Mergerino](https://github.com/fuzetsu/mergerino).
   *
   * @template S the State type.
   *
   * @param config the Meiosis config for use with Mergerino
   *
   * @returns a stream of Meiosis cells.
   */


  var meiosisSetup = function meiosisSetup(config) {
    var stream = config === null || config === void 0 ? void 0 : config.stream;
    var app = config === null || config === void 0 ? void 0 : config.app;

    var _baseSetup = baseSetup({
      stream: stream,
      app: app
    }),
        states = _baseSetup.states,
        update = _baseSetup.update,
        view = _baseSetup.view;

    var nest = nestCell(states, update, view);

    var getState = function getState() {
      return states();
    };

    var getCell = function getCell(state) {
      return {
        states: states,
        state: state,
        getState: getState,
        update: update,
        nest: nest,
        nested: view
      };
    };

    var dropRepeats = createDropRepeats(stream);

    if (app) {
      getServices(app).forEach(function (service) {
        dropRepeats(states, service.onchange).map(function (state) {
          return service.run(getCell(state));
        });
      });
    }

    var cells = dropRepeats(states).map(getCell);
    return cells;
  };

  var meiosis = {
    setup: meiosisSetup,
    stream: {
      simpleStream: simpleStream,
      createDropRepeats: createDropRepeats,
      dropRepeats: dropRepeats
    },
    util: {
      get: get,
      updateFormFloatValue: updateFormFloatValue,
      updateFormIntValue: updateFormIntValue,
      updateFormValue: updateFormValue
    }
  };

  return meiosis;

}));

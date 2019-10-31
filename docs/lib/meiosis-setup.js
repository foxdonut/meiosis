(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Meiosis = factory());
}(this, (function () { 'use strict';

  /**
   * Application object.
   *
   * @typedef {Object} app
   * @property {Object} [initial={}] - an object that represents the initial state.
   * If not specified, the initial state will be `{}`.
   * @property {Function} [Actions=()=>({})] - a function that creates actions, of the form
   * `update => actions`.
   * @property {Array<Function>} [services=[]] - an array of service functions, each of which
   * should be `({ state, previousState, patch }) => ({ state?, patch?, render?, next? })`.
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
   * Patch is merged in to the state by default. Services have access to the previous state and can
   * cancel or alter the original patch. State changes by services are available to the next services
   * in the list.
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
   * @returns {Object} - `{ update, states, actions }`, where `update` and `states` are streams,
   * and `actions` are the created actions.
   */
  function commonSetup (ref) {
    var stream = ref.stream;
    var accumulator = ref.accumulator;
    var combine = ref.combine;
    var app = ref.app;

    if (!stream) {
      throw new Error("No stream library was specified.");
    }
    if (!accumulator) {
      throw new Error("No accumulator function was specified.");
    }
    if (!combine) {
      throw new Error("No combine function was specified.");
    }

    app = app || {};
    var initial = app.initial;
    var Actions = app.Actions;
    var services = app.services;
    initial = initial || {};
    services = services || [];

    var singlePatch = function (patch) { return (Array.isArray(patch) ? combine(patch) : patch); };
    var accumulatorFn = function (state, patch) { return (patch ? accumulator(state, singlePatch(patch)) : state); };

    var createStream = typeof stream === "function" ? stream : stream.stream;
    var scan = stream.scan;

    var update = createStream();
    var actions = (Actions || (function () { return ({}); }))(update);
    var states = createStream();

    // context is { state, patch, previousState }
    // should return { state, render, next }
    var updateState = function (context) {
      var updatedContext = context;

      var loop = function ( i ) {
        // a service should return { state, patch, render, next } (all optional)
        var serviceUpdate = services[i](updatedContext);

        if (serviceUpdate) {
          // If a service cancelled a patch, abort
          if (serviceUpdate.patch === false) {
            return { v: {
              render: false,
              state: context.previousState,
              next: []
            } };
          }
          // If a service changed a patch, abort current and issue the new patch
          if (serviceUpdate.patch) {
            return { v: {
              render: false,
              state: context.previousState,
              next: [function (ref) {
                var update = ref.update;

                return update(serviceUpdate.patch);
            }]
            } };
          }
          // Append next function
          if (serviceUpdate.next) {
            updatedContext.next.push(serviceUpdate.next);
            delete serviceUpdate.next;
          }
          // Update the context
          updatedContext = Object.assign(updatedContext, serviceUpdate, {
            state: accumulatorFn(updatedContext.state, serviceUpdate.state)
          });
        }
      };

      for (var i = 0; i < services.length; i++) {
        var returned = loop( i );

        if ( returned ) return returned.v;
      }
      return updatedContext;
    };

    var contexts = scan(
      function (context, patch) { return updateState({
          previousState: context.state,
          state: accumulatorFn(context.state, patch),
          patch: patch,
          render: true,
          next: []
        }); },
      { state: initial },
      update
    );

    contexts.map(function (context) {
      if (context.render) {
        states(context.state);
      }
      if (context.next) {
        context.next.forEach(function (service) {
          service({
            state: context.state,
            patch: context.patch,
            update: update,
            actions: actions
          });
        });
      }
    });

    // initial state
    update(false);

    return { update: update, contexts: contexts, states: states, actions: actions };
  }

  /**
   * Helper to setup the Meiosis pattern.
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
  function mergerinoSetup (ref) {
      var stream = ref.stream;
      var merge = ref.merge;
      var app = ref.app;

      return commonSetup({
      stream: stream,
      accumulator: merge,
      combine: function (patches) { return patches; },
      app: app
    });
  }

  var compose = function (fns) { return function (args) { return fns.reduceRight(function (arg, fn) { return fn(arg); }, args); }; };

  /**
   * Helper to setup the Meiosis pattern.
   *
   * @async
   * @function meiosis.functionPatches.setup
   *
   * @param {StreamLib} stream - the stream library. This works with `meiosis.simpleStream`, `flyd`,
   * `m.stream`, or anything for which you provide either a function or an object with a `stream`
   * function to create a stream. The function or object must also have a `scan` property.
   * The returned stream must have a `map` method.
   * @param {app} app - the app, with optional properties.
   *
   * @returns {Object} - `{ update, states, actions }`, where `update` and `states` are streams,
   * and `actions` are the created actions.
   */
  function functionPatchesSetup (ref) {
      var stream = ref.stream;
      var app = ref.app;

      return commonSetup({ stream: stream, accumulator: function (x, f) { return f(x); }, combine: compose, app: app });
  }

  /**
   * Helper to setup the Meiosis pattern.
   *
   * @async
   * @function meiosis.immer.setup
   *
   * @param {StreamLib} stream - the stream library. This works with `meiosis.simpleStream`, `flyd`,
   * `m.stream`, or anything for which you provide either a function or an object with a `stream`
   * function to create a stream. The function or object must also have a `scan` property.
   * The returned stream must have a `map` method.
   * @param {Function} produce - the Immer `produce` function.
   * @param {app} app - the app, with optional properties.
   *
   * @returns {Object} - `{ update, states, actions }`, where `update` and `states` are streams,
   * and `actions` are the created actions.
   */
  function immerSetup (ref) {
      var stream = ref.stream;
      var produce = ref.produce;
      var app = ref.app;

      return commonSetup({
      stream: stream,
      accumulator: produce,
      combine: function (patches) { return function (model) {
        patches.forEach(function (patch) { return patch(model); });
      }; },
      app: app
    });
  }

  /**
   * Helper to setup the Meiosis pattern.
   *
   * @function meiosis.preact.setup
   *
   * @param {preact} preact - the Preact instance.
   * @param {preact.Component} Root - your Root component, which receives `state` and `actions`.
   *
   * @returns {preact.Component} - the top-level component to which you pass `states` and `actions`.
   */
  function preactSetup (ref) {
    var preact = ref.preact;
    var Root = ref.Root;

    var App = /*@__PURE__*/(function (superclass) {
      function App () {
        superclass.apply(this, arguments);
      }

      if ( superclass ) App.__proto__ = superclass;
      App.prototype = Object.create( superclass && superclass.prototype );
      App.prototype.constructor = App;

      App.prototype.componentWillMount = function componentWillMount () {
        var setState = this.setState.bind(this);
        this.props.states.map(setState);
      };
      App.prototype.render = function render () {
        var state = this.state;
        var ref = this.props;
        var actions = ref.actions;

        return preact.h(Root, { state: state, actions: actions });
      };

      return App;
    }(preact.Component));
    return App;
  }

  /**
   * Helper to setup the Meiosis pattern.
   *
   * @function meiosis.react.setup
   *
   * @param {React} React - the React instance.
   * @param {React.Component} Root -  your Root component, which receives `state` and `actions`.
   *
   * @returns {React.Component} - the top-level component to which you pass `states` and `actions`.
   */
  function reactSetup (ref) {
    var React = ref.React;
    var Root = ref.Root;

    var App = /*@__PURE__*/(function (superclass) {
      function App(props) {
        superclass.call(this, props);
        this.state = props.states();
        this.skippedFirst = false;
      }

      if ( superclass ) App.__proto__ = superclass;
      App.prototype = Object.create( superclass && superclass.prototype );
      App.prototype.constructor = App;
      App.prototype.componentDidMount = function componentDidMount () {
        var this$1 = this;

        var setState = this.setState.bind(this);
        this.props.states.map(function (state) {
          if (this$1.skippedFirst) {
            setState(state);
          } else {
            this$1.skippedFirst = true;
          }
        });
      };
      App.prototype.render = function render () {
        var state = this.state;
        var ref = this.props;
        var actions = ref.actions;

        return React.createElement(Root, { state: state, actions: actions });
      };

      return App;
    }(React.Component));
    return App;
  }

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
  var stream = function (initial) {
    var mapFunctions = [];
    var latestValue = initial;
    var createdStream = function (value) {
      if (value !== undefined) {
        latestValue = value;
        for (var i in mapFunctions) {
          mapFunctions[i](value);
        }
      }
      return latestValue;
    };
    createdStream.map = function (mapFunction) {
      var newInitial = undefined;
      if (latestValue !== undefined) {
        newInitial = mapFunction(latestValue);
      }
      var newStream = stream(newInitial);

      mapFunctions.push(function (value) {
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
  var scan = function (accumulator, initial, sourceStream) {
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

  var index = {
    common: {
      setup: commonSetup
    },
    mergerino: {
      setup: mergerinoSetup
    },
    functionPatches: {
      setup: functionPatchesSetup
    },
    immer: {
      setup: immerSetup
    },
    preact: {
      setup: preactSetup
    },
    react: {
      setup: reactSetup
    },
    simpleStream: simpleStream
  };

  return index;

})));

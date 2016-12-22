// Meiosis

import flyd from "flyd";
import m from "mithril";
import * as R from "ramda";
import meiosisTracer from "meiosis-tracer";

const meiosis = (initialModel, receive) => {
  const propose = flyd.stream();

  const model = flyd.scan(receive, initialModel, propose);

  return {
    model,
    propose
  };
};

// Credit: source: https://github.com/jayrbolton/flyd-zip
const zip = sources => {
  var withIdxs = R.addIndex(R.map)(function(s, i) {
    return flyd.map(function(v) {
      return [v, i];
    }, s);
  }, sources);

  var buffer = [];

  return flyd.combine(function() {
    var changes = R.last(arguments);

    R.map(R.apply(function(val, idx) {
      buffer[idx] = val;
    }), R.map(R.call, changes));

    if (R.filter(function(n) {
      return n !== undefined;
    }, buffer).length === sources.length) {
      var _self = arguments[arguments.length - 2];
      _self(buffer);
      buffer = [];
    }
  }, withIdxs);
};

// Util

const pipeIn = function() {
  return R.pipe.apply(R, Array.prototype.slice.call(arguments, 1))(arguments[0]);
};

const getComponentFunctions = (componentList, property) =>
  componentList
   .map(R.prop(property))
   .filter(R.identity);

const receive = (model, proposal) => getComponentFunctions(componentList, "receive")
  .reduce((model, f) => f(model, proposal), model);

const nextAction = (model, proposal) => getComponentFunctions(componentList, "nextAction")
  .forEach(f => f(model, proposal));

// Setup Meiosis

const initialModel = { counter: 0, counterIds: [], countersById: {} };
const { propose, model } = meiosis(initialModel, receive);

// Counter

const createCounterView = propose => (model, id) => {
  const remove = !!id;

  const events = {
    onIncrease: _evt => propose({ counterId: id, add:  1 }),
    onDecrease: _evt => propose({ counterId: id, add: -1 }),
    onRemove: _evt => propose({ counterId: id, removeCounter: true })
  };

  return m("div",
    m("span", "Counter: " + model.counter + " " + (model.even ? "Even" : "Odd")),
    m("button.btn.btn-sm.btn-primary", { onclick: events.onIncrease }, "Increase"),
    m("button.btn.btn-sm.btn-default", { onclick: events.onDecrease }, "Decrease"),
    remove ? m("button.btn.btn-sm.btn-danger", { onclick: events.onRemove }, "Remove") : null);
};

const counterView = createCounterView(propose);
const counterModel = () => ({ counter: 0 });
const componentList = [];

flyd.on(pair => nextAction(pair[0], pair[1]), zip([model, propose]));

const events = propose => ({
  onAddCounter: _evt => propose({ addCounter: true })
});

const createView = events => model => m("div",
  counterView(model),
  m("button.btn.btn-primary", { onclick: events.onAddCounter }, "Add Counter"),
  model.counterIds.map(id => counterView(model.countersById[id], id)));

const view = pipeIn(propose, events, createView);

const counterContainer = {
  receive: (model, proposal) => {
    if (proposal.addCounter) {
      const id = "counter_" + String(new Date().getTime());
      model.countersById[id] = counterModel();
      model.counterIds.push(id);
    }
    else if (proposal.removeCounter) {
      const id = proposal.counterId;
      delete model.countersById[id];
      model.counterIds.splice(model.counterIds.indexOf(id), 1);
    }
    else if (proposal.add) {
      if (proposal.counterId) {
        model.countersById[proposal.counterId].counter += proposal.add;
      }
      else {
        model.counter += proposal.add;
      }
    }
    return model;
  },
  state: (state, model) => {
    const appState = Object.assign(JSON.parse(JSON.stringify(model)),
      { even: model.counter % 2 === 0 });

    model.counterIds.forEach(id => {
      appState.countersById[id].even = model.countersById[id].counter % 2 === 0;
    });
    return appState;
  },
  nextAction: (model, proposal) => {
    if (proposal.counterId && model.countersById[proposal.counterId].counter === 3) {
      propose({ counterId: proposal.counterId, add: 2 });
    }
  }
};
componentList.push(counterContainer);

const appState = model => getComponentFunctions(componentList, "state")
  .reduce((state, f) => f(state, model), {});

const element = document.getElementById("app");
const renderRoot = model => m.render(element, view(model));
flyd.on(renderRoot, flyd.map(appState, model));

const createComponent = component => {
  componentList.push(component);
};
renderRoot.initialModel = initialModel;
renderRoot.state = appState;

meiosisTracer(createComponent, renderRoot, "#tracer");

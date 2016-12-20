// Meiosis

import flyd from "flyd";
import m from "mithril";
import * as R from "ramda";
import objectPath from "object-path";
import meiosisTracer from "meiosis-tracer";

const meiosis = (initialModel, receive) => {
  const propose = flyd.stream();

  const model = flyd.scan(receive, initialModel, propose);

  return {
    model,
    propose
  };
};

// Util

const pipeIn = function() {
  return R.pipe.apply(R, Array.prototype.slice.call(arguments, 1))(arguments[0]);
};

const nestComponent = function(component, path) {
  return {
    receive: component.receive && ((model, proposal) => {
      component.receive(objectPath.get(model, path), proposal);
      return model;
    }),
    state: component.state && (model => component.state(objectPath.get(model, path))),
    view: component.view && (model => component.view(objectPath.get(model, path))),
    initialModel: component.initialModel
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

// Counter

const counterComponent = (propose, id) => {
  const remove = !!id;
  id = id || "counter_" + String(new Date().getTime());

  const events = propose => ({
    onIncrease: _evt => propose({ counterId: id, add:  1 }),
    onDecrease: _evt => propose({ counterId: id, add: -1 }),
    onRemove: _evt => propose({ counterId: id, removeCounter: true })
  });

  const createView = events => model => m("div",
    m("span", "Counter: " + model.counter + " " + (model.even ? "Even" : "Odd")),
    m("button.btn.btn-primary", { onclick: events.onIncrease }, "Increase"),
    m("button.btn.btn-default", { onclick: events.onDecrease }, "Decrease"),
    remove ? m("button.btn.btn-danger", { onclick: events.onRemove }, "Remove") : null);

  const initialModel = { counter: 0 };

  const receive = (model, proposal) => {
    if (proposal.counterId === id && proposal.add) {
      model.counter += proposal.add;
    }
    return model;
  };

  const view = pipeIn(propose, events, createView);

  const state = model => Object.assign({}, model, { even: model.counter % 2 === 0 });

  return { initialModel, receive, view, state };
};

const initialModel = { counter: 0, counterIds: [], countersById: {} };

const components = {};
const additionalComponents = [];

const receive = (model, proposal) => Object.keys(components)
  .map(key => components[key])
  .concat(additionalComponents)
  .map(R.prop("receive"))
  .reduce((model, rcv) => rcv(model, proposal), model);

const { propose, model } = meiosis(initialModel, receive);
const counter = counterComponent(propose);
components["counter"] = counter;

const nextAction = (model, _proposal) => {
  if (model.counter > 0 && model.counter % 10 === 0) {
    propose({ add: 2 });
  }
};

flyd.on(pair => nextAction(pair[0], pair[1]), zip([model, propose]));

const events = propose => ({
  onAddCounter: _evt => propose({ addCounter: true })
});

const createView = events => model => m("div",
  components["counter"].view(model),
  m("button.btn.btn-primary", { onclick: events.onAddCounter }, "Add Counter"),
  model.counterIds.map(id => components[id]).map(component => component.view(model)));

const view = pipeIn(propose, events, createView);

const counterContainer = {
  receive: (model, proposal) => {
    if (proposal.addCounter) {
      const id = "counter_" + String(new Date().getTime());
      const counter = nestComponent(counterComponent(propose, id), "countersById." + id);
      model.countersById[id] = counter.initialModel;
      model.counterIds.push(id);
      components[id] = counter;
    }
    else if (proposal.removeCounter) {
      const id = proposal.counterId;
      delete components[id];
      delete model.countersById[id];
      model.counterIds.splice(model.counterIds.indexOf(id), 1);
    }
    return model;
  }
};
components["counterContainer"] = counterContainer;

const state = model => Object.keys(components)
  .map(key => components[key])
  .concat(additionalComponents)
  .map(R.prop("state"))
  .reduce((model, stateFn) => stateFn(model), model);


const element = document.getElementById("app");
flyd.on(model => m.render(element, view(model)), flyd.map(counter.state, model));

const createComponent = component => {
  additionalComponents.push(component);
};
const renderRoot = model => m.render(element, view(model));
renderRoot.initialModel = initialModel;
renderRoot.state = R.identity;

meiosisTracer(createComponent, renderRoot, "#tracer");

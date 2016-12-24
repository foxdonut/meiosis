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
    nextAction: component.nextAction && ((model, proposal) => {
      component.nextAction(objectPath.get(model, path), proposal);
    }),
    state: component.state && ((state, model) => {
      objectPath.set(state, path, component.state(objectPath.get(state, path), objectPath.get(model, path)));
      return state;
    }),
    view: component.view && (model => component.view(objectPath.get(model, path))),
    initialModel: component.initialModel
  };
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
    m("button.btn.btn-sm.btn-primary", { onclick: events.onIncrease }, "Increase"),
    m("button.btn.btn-sm.btn-default", { onclick: events.onDecrease }, "Decrease"),
    remove ? m("button.btn.btn-sm.btn-danger", { onclick: events.onRemove }, "Remove") : null);

  const initialModel = { counter: 0 };

  const receive = (model, proposal) => {
    if (proposal.counterId === id && proposal.add) {
      model.counter += proposal.add;
    }
    return model;
  };

  const view = pipeIn(propose, events, createView);

  const state = (state, model) => Object.assign(JSON.parse(JSON.stringify(model)),
    { even: model.counter % 2 === 0 });

  const nextAction = (model, proposal) => {
    if (proposal.counterId === id && model.counter === 5) {
      propose({ counterId: id, add: 2 });
    }
  };

  return { initialModel, receive, view, state, nextAction };
};

const initialModel = { counter: 0, counterIds: [], countersById: {} };

const componentsById = {};
const componentList = [];

// FIXME: order should not matter.
const getComponentFunctions = (componentsById, componentList, property) =>
  componentList.concat(R.values(componentsById))
  /*
  R.values(componentsById)
   .concat(componentList)
  */
   .map(R.prop(property))
   .filter(R.identity);

const receive = (model, proposal) => getComponentFunctions(componentsById, componentList, "receive")
  .reduce((model, f) => f(model, proposal), model);

const { propose, model } = meiosis(initialModel, receive);
const topCounter = counterComponent(propose);
componentList.push(topCounter);

const nextAction = (model, proposal) => getComponentFunctions(componentsById, componentList, "nextAction")
  .forEach(f => f(model, proposal));

flyd.on(model => propose() && nextAction(model, propose()), model);

const events = propose => ({
  onAddCounter: _evt => propose({ addCounter: true })
});

const createView = events => model => m("div",
  topCounter.view(model),
  m("button.btn.btn-primary", { onclick: events.onAddCounter }, "Add Counter"),
  model.counterIds.map(id => componentsById[id]).map(component => component.view(model)));

const view = pipeIn(propose, events, createView);

const counterContainer = {
  receive: (model, proposal) => {
    if (proposal.addCounter) {
      const id = "counter_" + String(new Date().getTime());
      const counter = nestComponent(counterComponent(propose, id), "countersById." + id);
      model.countersById[id] = counter.initialModel;
      model.counterIds.push(id);
      componentsById[id] = counter;
    }
    else if (proposal.removeCounter) {
      const id = proposal.counterId;
      delete componentsById[id];
      delete model.countersById[id];
      model.counterIds.splice(model.counterIds.indexOf(id), 1);
    }
    return model;
  }
};
componentList.push(counterContainer);

const appState = model => getComponentFunctions(componentsById, componentList, "state")
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

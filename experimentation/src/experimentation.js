// Meiosis

import flyd from "flyd";
import m from "mithril";
import * as R from "ramda";
import objectPath from "object-path";
import meiosisTracer from "meiosis-tracer";

const meiosis = () => {
  const propose = flyd.stream();

  const getName = value => typeof value === "function" ? undefined : Object.keys(value)[0];
  const getFn = value => {
    const name = getName(value);
    return name ? value[name] : value;
  };

  const run = ({ initialContext, scanner, mappers }) => {
    const streams = {};

    const name = getName(scanner);
    const fn = getFn(scanner);

    let lastStream = flyd.scan(fn, initialContext, propose);
    name && (streams[name] = lastStream);

    mappers.forEach(mapper => {
      const name = getName(mapper);
      const fn = getFn(mapper);

      lastStream = flyd.map(fn, lastStream);
      name && (streams[name] = lastStream);
    });

    return streams;
  };

  return {
    propose,
    run
  };
};

// Initialize Meiosis

const { propose, run } = meiosis();

// Counter

const counterComponent = {
  initialModel: () => ({ counter: 0 }),

  receive: ({ model, proposal }) => {
    if (proposal.add) {
      model.counter += proposal.add;
    }
    return model;
  },

  state: ({ model, state }) => {
    state.even = model.counter % 2 === 0;
    return state;
  },

  nextAction: ({ model, proposal }) => {
    if (model.counter === 5) {
      propose({ counterId: proposal.counterId, add: 2 });
    }
  }
};

const counterView = ({ id, remove, model }) => {
  const events = ({
    onIncrease: _evt => propose({ counterId: id, add:  1 }),
    onDecrease: _evt => propose({ counterId: id, add: -1 }),
    onRemove: _evt => propose({ counterId: id, removeCounter: true })
  });

  return m("div",
    m("span", "Counter: " + model.counter + " " + (model.even ? "Even" : "Odd")),
    m("button.btn.btn-sm.btn-primary", { onclick: events.onIncrease }, "Increase"),
    m("button.btn.btn-sm.btn-default", { onclick: events.onDecrease }, "Decrease"),
    remove ? m("button.btn.btn-sm.btn-danger", { onclick: events.onRemove }, "Remove") : null);
};

// Counter container

const counterContainer = {
  receive: context => {
    const { model, proposal } = context;
    if (proposal.addCounter) {
      const id = "counter_" + String(new Date().getTime());
      model.countersById[id] = counterComponent.initialModel();
      model.counterIds.push(id);
    }
    else if (proposal.removeCounter) {
      const id = proposal.counterId;
      delete model.countersById[id];
      model.counterIds.splice(model.counterIds.indexOf(id), 1);
    }
    else if (proposal.counterId) {
      counterComponent.receive({ model: model.countersById[proposal.counterId], proposal });
    }
    return context;
  }
};

// App

const singleCounterId = "counter_single";
const initialContext = {
  model: {
    counterIds: [ ],
    countersById: {
      [singleCounterId]: counterComponent.initialModel()
    }
  }
};
const events = propose => ({
  onAddCounter: _evt => propose({ addCounter: true })
});

const createView = events => model => m("div",
  counterView({ id: singleCounterId, remove: false, model: model.countersById[singleCounterId] }),
  m("button.btn.btn-primary", { onclick: events.onAddCounter }, "Add Counter"),
  model.counterIds.map(id => counterView({ id, remove: true, model: model.countersById[id] })));

const view = createView(events(propose));

/*
const tracer = meiosisTracer({ selector: "#tracer", initialContext, render });
const { stateFn, state } = run({ initialContext, receive });
tracer.setStateFn(stateFn);
*/

const receive = counterContainer.receive;
const state = context => {
  Object.keys(context.state.countersById).forEach(id =>
    counterComponent.state({ model: context.model.countersById[id], state: context.state.countersById[id] }));
  return context;
};

const scanner = { model$: (context, proposal) => receive(Object.assign(context, { proposal })) };

const mappers = [
  context => { context.state = JSON.parse(JSON.stringify(context.model)); return context; },
  //{ name: "state$", fn: state },
  state,
  { viewModel$: R.prop("state") }
];

const { /*state$,*/ viewModel$ } = run({ initialContext, scanner, mappers });

const element = document.getElementById("app");
const render = context => m.render(element, view(context));
flyd.on(render, viewModel$);
//flyd.on(value => console.log(JSON.stringify(value)), state$);

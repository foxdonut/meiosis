// Meiosis

import flyd from "flyd";
import m from "mithril";
import * as R from "ramda";
import objectPath from "object-path";
import meiosisTracer from "meiosis-tracer";

const meiosis = () => {
  const propose = flyd.stream();

  const run = ({ initialModel, components }) => {
    const getComponentFunctions = (property, components) =>
      components.map(R.prop(property)).filter(R.identity);

    const receives = getComponentFunctions("receive", components);
    const receive = (model, proposal) => receives.reduce((model, fn) => fn(model, proposal), model);

    const model = flyd.scan(receive, initialModel, propose);

    const states = getComponentFunctions("state", components);
    const stateFn = model => states.reduce((state, fn) => fn(model, state), JSON.parse(JSON.stringify(model)));

    const state = flyd.map(stateFn, model);

    const nexts = getComponentFunctions("nextAction", components);
    const nextAction = (model, proposal) => nexts.forEach(fn => fn(model, proposal));

    flyd.on(model => propose() && nextAction(model, propose()), model);

    return {
      model,
      stateFn,
      state
    };
  };

  return {
    propose,
    run,
  };
};

// meiosis-component

const nestComponent = (component, path) => ({
  initialModel: component.initialModel,
  receive: component.receive && ((model, proposal) => {
    component.receive(objectPath.get(model, path), proposal);
    return model;
  }),
  nextAction: component.nextAction && ((model, proposal) => {
    const subModel = objectPath.get(model, path);

    if (subModel) {
      component.nextAction(subModel, proposal);
    }
  }),
  state: component.state && ((model, state) => {
    const subModel = objectPath.get(state, path);

    if (subModel) {
      objectPath.set(state, path, component.state(objectPath.get(model, path), subModel));
    }
    return state;
  })
});

const componentContainer = ({ component, getComponentIds, getComponentById }) => {
  return {
    receive: (model, proposal) => {
      component.receive && component.receive(model, proposal);
      getComponentIds(model).forEach(id => {
        const child = getComponentById(id);
        child.receive && child.receive(model, proposal);
      });
      return model;
    },
    state: (model, state) => {
      component.state && component.state(model, state);
      getComponentIds(model).forEach(id => {
        const child = getComponentById(id);
        child.state && child.state(model, state);
      });
      return state;
    },
    nextAction: (model, proposal) => {
      component.nextAction && component.nextAction(model, proposal);
      getComponentIds(model).forEach(id => {
        const child = getComponentById(id);
        child.nextAction && child.nextAction(model, proposal);
      });
    }
  };
};

// Util

const pipeIn = function() {
  return R.pipe.apply(R, Array.prototype.slice.call(arguments, 1))(arguments[0]);
};

// Counter

const counterComponent = (propose, id) => {
  const initialModel = { counter: 0 };

  const receive = (model, proposal) => {
    if (proposal.counterId === id && proposal.add) {
      model.counter += proposal.add;
    }
    return model;
  };

  const state = (model, state) => {
    state.even = model.counter % 2 === 0;
    return state;
  };

  const nextAction = (model, proposal) => {
    if (proposal.counterId === id && model.counter === 5) {
      propose({ counterId: id, add: 2 });
    }
  };

  return { initialModel, receive, state, nextAction };
};

const counterView = ({propose, id, remove, model}) => {
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

const initialModel = { counter: 0, counterIds: [], countersById: {} };
const { propose, run } = meiosis();

const id = "counter_" + String(new Date().getTime());
const topCounter = counterComponent(propose, id);

const events = propose => ({
  onAddCounter: _evt => propose({ addCounter: true })
});

const createView = events => model => m("div",
  counterView({ propose, id, remove: false, model }),
  m("button.btn.btn-primary", { onclick: events.onAddCounter }, "Add Counter"),
  model.counterIds.map(id => counterView({ propose, id, remove: true, model: model.countersById[id] })));

const view = pipeIn(propose, events, createView);

const counterContainer = (propose => {
  const getComponentById = id => nestComponent(counterComponent(propose, id), "countersById." + id);

  return componentContainer({
    component: {
      receive: (model, proposal) => {
        if (proposal.addCounter) {
          const id = "counter_" + String(new Date().getTime());
          model.countersById[id] = getComponentById(id).initialModel;
          model.counterIds.push(id);
        }
        else if (proposal.removeCounter) {
          const id = proposal.counterId;
          delete model.countersById[id];
          model.counterIds.splice(model.counterIds.indexOf(id), 1);
        }
        return model;
      }
    },
    getComponentIds: model => model.counterIds,
    getComponentById
  });
})(propose);

const element = document.getElementById("app");
const render = state => m.render(element, view(state));

const tracer = meiosisTracer({ selector: "#tracer", initialModel, render });
const { stateFn, state } = run({ initialModel, components: [topCounter, counterContainer, tracer.component] });
tracer.setStateFn(stateFn);

flyd.on(render, state);

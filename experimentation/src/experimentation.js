// Meiosis

import flyd from "flyd";
import m from "mithril";
import * as R from "ramda";

const meiosis = (initialModel, receives) => {
  const propose = flyd.stream();
  const receive = (model, proposal) => receives.reduce((model, rcv) => rcv(model, proposal), model);
  const model = flyd.scan(receive, initialModel, propose);

  return {
    propose,
    model
  };
};

// Util

const pipeIn = function() {
  return R.pipe.apply(R, Array.prototype.slice.call(arguments, 1))(arguments[0]);
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

// App

const events = propose => ({
  onIncrease: _evt => propose({ add:  1 }),
  onDecrease: _evt => propose({ add: -1 })
});

const createView = events => model => m("div",
  m("span", "Counter: " + model.counter + " " + (model.even ? "Even" : "Odd")),
  m("button", { onclick: events.onIncrease }, "Increase"),
  m("button", { onclick: events.onDecrease }, "Decrease"),
  m("div", JSON.stringify(model)));

let initialModel = { counter: 0 };

const receive1 = (model, proposal) => {
  if (proposal.add > 0) {
    model.counter += proposal.add;
  }
  return model;
};

const receive2 = (model, proposal) => {
  if (proposal.add < 0) {
    model.counter += proposal.add;
  }
  return model;
};

const { propose, model } = meiosis(initialModel, [receive1, receive2]);

const view = pipeIn(propose, events, createView);

const state = model => Object.assign({}, model, { even: model.counter % 2 === 0 });

const nextAction = (model, _proposal) => {
  if (model.counter % 10 === 0) {
    propose({ add: 2 });
  }
};

flyd.on(pair => nextAction(pair[0], pair[1]), zip([model, propose]));

const element = document.getElementById("app");
flyd.on(model => m.render(element, view(model)), flyd.map(state, model));


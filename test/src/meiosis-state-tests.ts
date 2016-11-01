import test from "ava";
const h = require("snabbdom/h");

import { newInstance } from "../../lib/index";

let createComponent = null;
let run = null;
let vnode = null;

const renderer = (state, root) => { vnode = root(state); };

const initialModel = { counter: 2, description: "test" };

test.beforeEach(function() {
  const Meiosis = newInstance();
  createComponent = Meiosis.createComponent;
  run = Meiosis.run;
});

test("can use a main application state function", t => {
  const rootComponent = createComponent({
    view: (state, actions) =>
      h("span", `Counter: ${state.counter} Length: ${state.descriptionLength}`)
  });

  const state = model => ({
    counter: model.counter,
    descriptionLength: model.description.length
  });

  run({ renderer, initialModel, state, rootComponent });

  t.is(vnode.text, "Counter: 2 Length: 4");
});

test("can use just component state functions", t => {
  const state1 = (model, state) => {
    state.counter = model.counter;
    state.descriptionLength = model.description.length;
    return state;
  };

  const rootComponent = createComponent({
    state: state1,
    view: (state, actions) =>
      h("span", `Counter: ${state.counter} Length: ${state.descriptionLength} Even: ${state.even}`)
  });

  const state2 = (model, state) => {
    state.even = model.counter % 2 === 0;
    return state;
  };

  createComponent({ state: state2 });

  run({ renderer, initialModel, rootComponent });

  t.is(vnode.text, "Counter: 2 Length: 4 Even: true");
});

test("can use both main and component state functions", t => {
  const rootComponent = createComponent({
    state: (model, state) => {
      state.even = model.counter % 2 === 0;
      return state;
    },
    view: (state, actions) =>
      h("span", `Counter: ${state.counter} Length: ${state.descriptionLength} Even: ${state.even} Duck: ${state.duck}`)
  });

  createComponent({
    state: (model, state) => {
      state.duck = "Quack";
      return state;
    }
  });

  const state = model => ({
    counter: model.counter,
    descriptionLength: model.description.length
  });

  run({ renderer, initialModel, state, rootComponent });

  t.is(vnode.text, "Counter: 2 Length: 4 Even: true Duck: Quack");
});

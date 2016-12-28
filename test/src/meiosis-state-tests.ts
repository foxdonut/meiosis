import test from "ava";
import { newInstance, on } from "../../lib/index";
import * as m from "mithril";

let propose = null;
let run = null;
let vnode = null;

const render = view => state => { vnode = view(state); };

let initialModel = null;

test.beforeEach(function(): void {
  initialModel = { counter: 2, description: "test" };
  const meiosis = newInstance();
  propose = meiosis.propose;
  run = meiosis.run;
});

test("can use a state function", t => {
  const view = state => m("span", `Counter: ${state.counter} Length: ${state.descriptionLength}`);

  const component = {
    state: (model, state) => {
      state.descriptionLength = model.description.length;
      return state;
    }
  };

  const state = run({ initialModel, components: [ component ] }).state;
  on(render(view), state);

  t.is(vnode.text, "Counter: 2 Length: 4");
});

test("can use multiple state functions", t => {
  const component1 = {
    state: (model, state) => {
      state.counter = model.counter;
      state.descriptionLength = model.description.length;
      return state;
    }
  };

  const component2 = {
    state: (model, state) => {
      state.even = model.counter % 2 === 0;
      return state;
    }
  };

  const view = state =>
    m("span", `Counter: ${state.counter} Length: ${state.descriptionLength} Even: ${state.even}`);

  const state = run({ initialModel, components: [ component1, component2 ] }).state;
  on(render(view), state);

  t.is(vnode.text, "Counter: 2 Length: 4 Even: true");
});

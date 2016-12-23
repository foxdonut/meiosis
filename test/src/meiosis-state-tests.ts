import test from "ava";
import * as flyd from "flyd";
import * as m from "mithril";

let propose = null;
let vnode = null;

const render = view => state => { vnode = view(state); };

let initialModel = null;

test.beforeEach(function(): void {
  initialModel = { counter: 2, description: "test" };
  propose = flyd.stream();
});

test("can use a main application state function", t => {
  const view = state => m("span", `Counter: ${state.counter} Length: ${state.descriptionLength}`);

  const state = model => ({
    counter: model.counter,
    descriptionLength: model.description.length
  });

  const model = flyd.scan(m => m, initialModel, propose);
  flyd.on(render(view), flyd.map(state, model));

  t.is(vnode.text, "Counter: 2 Length: 4");
});

test("can use just component state functions", t => {
  const state1 = (model, state) => {
    state.counter = model.counter;
    state.descriptionLength = model.description.length;
    return state;
  };

  const view = state =>
    m("span", `Counter: ${state.counter} Length: ${state.descriptionLength} Even: ${state.even}`);

  const state2 = (model, state) => {
    state.even = model.counter % 2 === 0;
    return state;
  };

  const state = model => [state1, state2].reduce((state, f) => f(model, state), {});

  const model = flyd.scan(m => m, initialModel, propose);
  flyd.on(render(view), flyd.map(state, model));

  t.is(vnode.text, "Counter: 2 Length: 4 Even: true");
});

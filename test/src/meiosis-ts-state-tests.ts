import test, { TestContext } from "ava";
import * as flyd from "flyd";
import * as m from "mithril";
import { ComponentState } from "../../lib/index";

interface Model {
  counter: number;
  description: string;
}

interface AppState {
  counter?: number;
  descriptionLength?: number;
  even?: boolean;
}

type View = any; // until 1.0 typings are available. Was Mithril.VirtualElement;

interface Proposal {
  increment: number;
}

type Propose = Flyd.Stream<Proposal>;

interface Actions {
  increase: () => void;
  decrease: () => void;
}

let vnode: View = null;

const render = (view: View) => (state: AppState) => vnode = view(state);

let initialModel: Model = null;
let propose: Propose = null;

test.beforeEach(function(): void {
  initialModel = { counter: 2, description: "test" };
  propose = flyd.stream<Proposal>();
});

test("can use a main application state function", (t: TestContext): void => {
  const view = (state: AppState): View => m("span", `Counter: ${state.counter} Length: ${state.descriptionLength}`);

  const state: Flyd.Mapper<Model, AppState> = (model: Model): AppState => ({
    counter: model.counter,
    descriptionLength: model.description.length
  });

  const model = flyd.scan(m => m, initialModel, propose);
  flyd.on(render(view), flyd.map(state, model));

  t.is(vnode.text, "Counter: 2 Length: 4");
});

test("can use just a component state function", (t: TestContext): void => {
  const state: Flyd.Mapper<Model, AppState> = (model: Model): AppState => ({
    counter: model.counter,
    descriptionLength: model.description.length,
    even: model.counter % 2 === 0
  });

  const view = (state: AppState): View => m("span", `Counter: ${state.counter} Length: ${state.descriptionLength} Even: ${state.even}`);

  const model: Flyd.Stream<Model> = flyd.scan(m => m, initialModel, propose);
  flyd.on<AppState, void>(render(view), flyd.map(state, model));

  t.is(vnode.text, "Counter: 2 Length: 4 Even: true");
});

test("can use both a main and a component state function", (t: TestContext): void => {
  const state1: ComponentState<Model, AppState> = (model: Model, state: AppState) => {
    state.even = model.counter % 2 === 0;
    return state;
  };

  const view = (state: AppState): View => m("span", `Counter: ${state.counter} Length: ${state.descriptionLength} Even: ${state.even}`);

  const state2: ComponentState<Model, AppState> = (model: Model, state: AppState): AppState => {
    state.counter = model.counter;
    state.descriptionLength = model.description.length;
    return state;
  };

  const state: Flyd.Mapper<Model, AppState> = model => [state1, state2].reduce((state, f) => f(model, state), {});

  const model: Flyd.Stream<Model> = flyd.scan(m => m, initialModel, propose);
  flyd.on<AppState, void>(render(view), flyd.map(state, model));

  t.is(vnode.text, "Counter: 2 Length: 4 Even: true");
});
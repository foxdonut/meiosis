import test, { TestContext } from "ava";
import { Component, MeiosisInstance, MeiosisRun, newInstance } from "../../lib/index";
import * as flyd from "flyd";
import * as m from "mithril";

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
let run: MeiosisRun<Model, Proposal, any> = null;

test.beforeEach(function(): void {
  initialModel = { counter: 2, description: "test" };
  let meiosis: MeiosisInstance<Model, Proposal, any> = newInstance<Model, Proposal, any>();
  propose = meiosis.propose;
  run = meiosis.run;
});

test("can use a state function", (t: TestContext): void => {
  const view = (state: AppState): View => m("span", `Counter: ${state.counter} Length: ${state.descriptionLength}`);

  const component: Component<Model, Proposal, AppState> = {
    state: (model: Model, state: AppState): AppState => {
      state.descriptionLength = model.description.length;
      return state;
    }
  };

  const state: Flyd.Stream<AppState> = run({ initialModel, components: [ component ] }).state;
  flyd.on(render(view), state);

  t.is(vnode.text, "Counter: 2 Length: 4");
});

test("can use multiple state functions", (t: TestContext): void => {
  const component1: Component<Model, Proposal, AppState> = {
    state: (model: Model, state: AppState): AppState => {
      state.even = model.counter % 2 === 0;
      return state;
    }
  };

  const component2: Component<Model, Proposal, AppState> = {
    state: (model: Model, state: AppState): AppState => {
      state.counter = model.counter;
      state.descriptionLength = model.description.length;
      return state;
    }
  };

  const view = (state: AppState): View => m("span", `Counter: ${state.counter} Length: ${state.descriptionLength} Even: ${state.even}`);

  const state: Flyd.Stream<AppState> = run({ initialModel, components: [ component1, component2 ] }).state;
  flyd.on<AppState, void>(render(view), state);

  t.is(vnode.text, "Counter: 2 Length: 4 Even: true");
});
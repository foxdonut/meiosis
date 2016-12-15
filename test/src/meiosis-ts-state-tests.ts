import test, { TestContext } from "ava";
import * as m from "mithril";

import { ActionCreator, CreateComponent, Component, Emitter, MeiosisApp,
  Ready, Renderer, RenderRoot, Run, State, newInstance } from "../../lib/index";

interface Model {
  counter: number;
  description: string;
}

interface AppState {
  counter: number;
  descriptionLength: number;
  even?: boolean;
}

type View = any; // until 1.0 typings are available. Was Mithril.VirtualElement;

interface Proposal {
  increment: number;
}

type Propose = Emitter<Proposal>;

interface Actions {
  increase: () => void;
  decrease: () => void;
}

let vnode: View = null;

const renderer: Renderer<AppState, View> = (state: AppState, rootComponent: Component<AppState, View>): void => {
  vnode = rootComponent(state);
};

const initialModel: Model = { counter: 2, description: "test" };

let createComponent: CreateComponent<Model, AppState, View, Proposal> = null;
let run: Run<Model, AppState, View> = null;

test.beforeEach(function(): void {
  const Meiosis: MeiosisApp<Model, AppState, View, Proposal> = newInstance<Model, AppState, View, Proposal>();
  createComponent = Meiosis.createComponent;
  run = Meiosis.run;
});

test("can use a main application state function", (t: TestContext): void => {
  const rootComponent: Component<AppState, View> = createComponent<Actions>({
    view: (state: AppState, actions: Actions): View =>
      m("span", `Counter: ${state.counter} Length: ${state.descriptionLength}`)
  });

  const state: State<Model, AppState> = (model: Model): AppState => ({
    counter: model.counter,
    descriptionLength: model.description.length
  });

  run({ renderer, initialModel, state, rootComponent });

  t.is(vnode.text, "Counter: 2 Length: 4");
});

test("can use just a component state function", (t: TestContext): void => {
  const state: State<Model, AppState> = (model: Model, state: AppState): AppState => {
    state.counter = model.counter;
    state.descriptionLength = model.description.length;
    state.even = model.counter % 2 === 0;
    return state;
  };

  const rootComponent: Component<AppState, View> = createComponent<Actions>({
    state,
    view: (state: AppState, actions: Actions): View =>
      m("span", `Counter: ${state.counter} Length: ${state.descriptionLength} Even: ${state.even}`)
  });

  run({ renderer, initialModel, rootComponent });

  t.is(vnode.text, "Counter: 2 Length: 4 Even: true");
});

test("can use both a main and a component state function", (t: TestContext): void => {
  const rootComponent: Component<AppState, View> = createComponent<Actions>({
    state: (model: Model, state: AppState) => {
      state.even = model.counter % 2 === 0;
      return state;
    },
    view: (state: AppState, actions: Actions): View =>
      m("span", `Counter: ${state.counter} Length: ${state.descriptionLength} Even: ${state.even}`)
  });

  const state: State<Model, AppState> = (model: Model): AppState => ({
    counter: model.counter,
    descriptionLength: model.description.length
  });

  run({ renderer, initialModel, state, rootComponent });

  t.is(vnode.text, "Counter: 2 Length: 4 Even: true");
});

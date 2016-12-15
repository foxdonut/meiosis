import test, { TestContext } from "ava";
import * as m from "mithril";

import { ActionCreator, Component, Context, CreateComponent, Emitter, MeiosisApp,
  Ready, Renderer, RenderRoot, Run, newInstance } from "../../lib/index";

interface Model {
  counter?: number;
  description?: string;
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

const renderer: Renderer<Model, View> = (model: Model, rootComponent: Component<Model, View>): void => {
  vnode = rootComponent(model);
};

let createComponent: CreateComponent<Model, Model, View, Proposal> = null;
let run: Run<Model, Model, View> = null;

test.beforeEach(function(): void {
  const Meiosis: MeiosisApp<Model, Model, View, Proposal> = newInstance<Model, Model, View, Proposal>();
  createComponent = Meiosis.createComponent;
  run = Meiosis.run;
});

test("takes advantage of typescript features", (t: TestContext): void => {
  const INCREASE: Proposal = { increment: 1 };
  const DECREASE: Proposal = { increment: -1 };

  const actions: ActionCreator<Proposal, Actions> = (propose: Propose): Actions => ({
    increase: () => propose(INCREASE),
    decrease: () => propose(DECREASE)
  });

  let actionsRef: Actions = null;

  const Main: Component<Model, View> = createComponent<Actions>({
    actions,
    view: (model: Model, actions: Actions): View => {
      actionsRef = actions;
      return m("span", model.description + " " + model.counter);
    },
    receive: (model: Model, proposal: Proposal): Model => {
      if (proposal.increment) {
        model.counter = model.counter + proposal.increment;
        return model;
      }
      return model;
    },
    nextAction: (context: Context<Model, Proposal, Actions>): void => {
      if (context.proposal.increment === 0) {
        context.actions.decrease();
      }
    }
  });

  const renderRoot: RenderRoot<Model, Model> = run({
    renderer,
    rootComponent: Main,
    initialModel: { counter: 1, description: "test" }
  });
  t.is(vnode.text, "test 1");

  actionsRef.increase();
  t.is(vnode.text, "test 2");
});

test("can create components with propose or actions", (t: TestContext): void => {
  const INCREASE: Proposal = { increment: 1 };
  const DECREASE: Proposal = { increment: -1 };

  let proposeRef: Propose = null;

  const Other: Component<Model, View> = createComponent<Propose>({
    view: (model: Model, propose: Propose): View => {
      proposeRef = propose;
      return m("span", model.description + " " + model.counter);
    }
  });

  const actions: ActionCreator<Proposal, Actions> = (propose: Propose): Actions => ({
    increase: () => propose(INCREASE),
    decrease: () => propose(DECREASE)
  });

  const ready: Ready<Proposal, Actions> = (actions: Actions): void => null;

  const Main: Component<Model, View> = createComponent<Actions>({
    actions,
    ready,
    view: (model: Model, actions: Actions): View => Other(model),
    receive: (model: Model, proposal: Proposal): Model => {
      if (proposal.increment) {
        model.counter = model.counter + proposal.increment;
        return model;
      }
      return model;
    }
  });

  const renderRoot: RenderRoot<Model, Model> = run({
    renderer,
    rootComponent: Main,
    initialModel: { counter: 1, description: "test" }
  });
  t.is(vnode.text, "test 1");

  proposeRef(INCREASE);
  t.is(vnode.text, "test 2");
});

test("can create initial model using functions", (t: TestContext): void => {
  const Component1: Component<Model, View> = createComponent<Propose>({
    initialModel: (model: Model): Model => {
      model.description = "test";
      return model;
    },
    view: (model: Model, propose: Propose): View => m("span", model.description + " " + model.counter)
  });

  const Component2: Component<Model, View> = createComponent<Propose>({
    initialModel: (model: Model): Model => {
      model.counter = 42;
      return model;
    }
  })

  run({ renderer, rootComponent: Component1 });

  t.is(vnode.text, "test 42");
});

import test, { TestContext } from "ava";
import * as m from "mithril";

import { createComponent, run } from "../../lib/index";
import { ActionCreator, CreateComponent, Component, Emitter, Ready, Renderer, RenderRoot, Setup } from "../../lib/index";

interface Model {
  counter: number;
  description: string;
}

type View = Mithril.VirtualElement;

interface Proposal {
  increment: number;
}

type Propose = Emitter<Proposal>;

interface Actions {
  increase: () => void;
  decrease: () => void;
}

let vnode: Mithril.VirtualElement = null;

const render: Renderer<Model, View, Proposal> = (model: Model, rootComponent: Component<Model, View>) => {
  vnode = rootComponent(model);
};

test("takes advantage of typescript features", (t: TestContext) => {
  const INCREASE: Proposal = { increment: 1 };
  const DECREASE: Proposal = { increment: -1 };

  const actions: ActionCreator<Proposal, Actions> = (propose: Propose) => ({
    increase: () => propose(INCREASE),
    decrease: () => propose(DECREASE)
  });

  let actionsRef: Actions = null;

  const setup: Setup<Proposal> = (actions: Actions) => null;

  const Main: Component<Model, View> = createComponent<Actions>({
    initialModel: { counter: 1, description: "test" },
    actions,
    setup,
    view: (model: Model, actions: Actions) => {
      actionsRef = actions;
      return m("span", model.description + " " + model.counter);
    },
    receive: (model: Model, proposal: Proposal) => {
      if (proposal.increment) {
        model.counter = model.counter + proposal.increment;
        return model;
      }
      return model;
    },
    nextAction: (model: Model, proposal: Proposal, actions: Actions) => {
      if (proposal.increment === 0) {
        actions.decrease();
      }
    }
  });

  const renderRoot: RenderRoot<Model> = run(render, Main);
  t.is(vnode.children[0], "test 1");

  actionsRef.increase();
  t.is(vnode.children[0], "test 2");
});

test("can create components with propose or actions", (t: TestContext) => {
  const INCREASE: Proposal = { increment: 1 };
  const DECREASE: Proposal = { increment: -1 };

  const actions: ActionCreator<Proposal, Actions> = (propose: Propose) => ({
    increase: () => propose(INCREASE),
    decrease: () => propose(DECREASE)
  });

  let actionsRef: Actions = null;

  const ready: Ready<Proposal> = (actions: Actions) => null;

  const Main: Component<Model, View> = createComponent<Actions>({
    initialModel: { counter: 1, description: "test" },
    actions,
    ready,
    view: (model: Model, actions: Actions) => {
      actionsRef = actions;
      return m("span", model.description + " " + model.counter);
    },
    receive: (model: Model, proposal: Proposal) => {
      if (proposal.increment) {
        model.counter = model.counter + proposal.increment;
        return model;
      }
      return model;
    },
    nextAction: (model: Model, proposal: Proposal, actions: Actions) => {
      if (proposal.increment === 0) {
        actions.decrease();
      }
    }
  });

  const renderRoot: RenderRoot<Model> = run(render, Main);
  t.is(vnode.children[0], "test 1");

  actionsRef.increase();
  t.is(vnode.children[0], "test 2");
});

import { expect } from "chai";
import * as m from "mithril";

import { createComponent, run } from "../../lib/index";
import { CreateComponent, Component, Emitter, Renderer, RenderRoot, Setup } from "../../lib/index";

interface Model {
  counter: number;
  description: string;
}

type View = Mithril.VirtualElement;

interface Proposal {
  increment: number;
}

interface Actions<P> {
  increase: () => void;
  decrease: () => void;
}

interface ActionCreator<P> {
  (propose: Emitter<P>): Actions<P>;
}

describe("meiosis typescript", function() {
  let vnode: Mithril.VirtualElement = null;

  const render: Renderer<Model, View, Proposal> = (model: Model, rootComponent: Component<Model, View>) => {
    vnode = rootComponent(model);
  };

  it("takes advantage of typescript features", function() {
    const INCREASE: Proposal = { increment: 1 };
    const DECREASE: Proposal = { increment: -1 };

    const actions: ActionCreator<Proposal> = (propose: Emitter<Proposal>) => ({
      increase: () => propose(INCREASE),
      decrease: () => propose(DECREASE)
    });

    let actionsRef: Actions<Proposal> = null;

    const setup: Setup<Proposal> = actions => null;

    const Main: Component<Model, View> = createComponent({
      initialModel: { counter: 1, description: "test" },
      actions: actions,
      setup: setup,
      view: (model: Model, actions: Actions<Proposal>) => {
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
      nextAction: (model: Model, proposal: Proposal, actions: Actions<Proposal>) => {
        if (proposal.increment === 0) {
          actions.decrease();
        }
      }
    });

    const renderRoot: RenderRoot<Model> = run(render, Main);
    expect(vnode.children[0]).to.equal("test 1");

    actionsRef.increase();
    expect(vnode.children[0]).to.equal("test 2");
  });
});

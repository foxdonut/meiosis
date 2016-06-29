import { expect } from "chai";
import * as m from "mithril";

import { init } from "../../lib/index";
import { Adapters, CreateComponent, Component, Emitter, Meiosis, Renderer, RenderRoot } from "../../lib/index";

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

  const render: Renderer<View> = (view: View) => {
    vnode = view;
  };

  const adapters: Adapters<Model, View, Proposal> = {
    render: render
  };

  let Meiosis: Meiosis<Model, View, Proposal> = null;
  let createComponent: CreateComponent<Model, View, Proposal> = null;

  beforeEach(function() {
    // prepare Meiosis
    Meiosis = init(adapters);
    createComponent = Meiosis.createComponent;
  });

  it("takes advantage of typescript features", function() {
    const INCREASE: Proposal = { increment: 1 };
    const DECREASE: Proposal = { increment: -1 };

    const actions: ActionCreator<Proposal> = (propose: Emitter<Proposal>) => ({
      increase: () => propose(INCREASE),
      decrease: () => propose(DECREASE)
    });

    let actionsRef: Actions<Proposal> = null;

    const Main: Component<Model, View> = createComponent({
      initialModel: { counter: 1, description: "test" },
      actions: actions,
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

    const renderRoot: RenderRoot<Model> = Meiosis.run(Main);
    expect(vnode.children[0]).to.equal("test 1");

    actionsRef.increase();
    expect(vnode.children[0]).to.equal("test 2");
  });
});

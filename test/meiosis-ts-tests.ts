import { expect } from "chai";
import * as m from "mithril";

import meiosis from "../src/index";
import { Adapters, CreateComponent, Component, Emitter, Meiosis, Renderer, RenderRoot } from "../src/index";

interface Model {
  counter: number;
  description: string;
}

type View = Mithril.VirtualElement;

interface Update {
  increment: number;
}

interface Actions<U> {
  increase: () => void;
  decrease: () => void;
}

interface ActionCreator<U> {
  (sendUpdate: Emitter<U>): Actions<U>;
}

describe("meiosis typescript", function() {
  let vnode: Mithril.VirtualElement = null;

  const render: Renderer<View> = (view: View) => {
    vnode = view;
  };

  const adapters: Adapters<Model, View, Update> = {
    render: render
  };

  let Meiosis: Meiosis<Model, View, Update> = null;
  let createComponent: CreateComponent<Model, View, Update> = null;

  beforeEach(function() {
    // prepare Meiosis
    Meiosis = meiosis(adapters);
    createComponent = Meiosis.createComponent;
  });

  it("takes advantage of typescript features", function() {
    const INCREASE: Update = { increment: 1 };
    const DECREASE: Update = { increment: -1 };

    const actions: ActionCreator<Update> = (sendUpdate: Emitter<Update>) => ({
      increase: () => sendUpdate(INCREASE),
      decrease: () => sendUpdate(DECREASE)
    });

    let actionsRef: Actions<Update> = null;

    const Main: Component<Model, View> = createComponent({
      initialModel: { counter: 1, description: "test" },
      actions: actions,
      view: (model: Model, actions: Actions<Update>) => {
        actionsRef = actions;
        return m("span", model.description + " " + model.counter);
      },
      receiveUpdate: (model: Model, update: Update) => {
        if (update.increment) {
          model.counter = model.counter + update.increment;
          return model;
        }
        return model;
      },
      nextUpdate: (model: Model, update: Update, actions: Actions<Update>) => {
        if (update.increment === 0) {
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

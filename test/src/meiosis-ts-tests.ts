import test, { TestContext } from "ava";
import { Component, MeiosisInstance, MeiosisRun, Stream, newInstance, on } from "../../lib/index";
import * as m from "mithril";

interface Model {
  counter?: number;
  description?: string;
}

type View = any; // until 1.0 typings are available. Was Mithril.VirtualElement;

interface Proposal {
  increment: number;
}

type Propose = Stream<Proposal>;

interface Actions {
  increase: () => void;
  decrease: () => void;
}

let propose: Propose = null;
let run: MeiosisRun<Model, Proposal, any> = null;
let vnode: View = null;

test.beforeEach(function(): void {
  let meiosis: MeiosisInstance<Model, Proposal, any> = newInstance<Model, Proposal, any>();
  propose = meiosis.propose;
  run = meiosis.run;
});

test("takes advantage of typescript features", (t: TestContext): void => {
  const initialModel: Model = { counter: 1, description: "test" };

  const INCREASE: Proposal = { increment: 1 };
  const DECREASE: Proposal = { increment: -1 };

  const actions: Actions = (propose => ({
    increase: () => propose(INCREASE),
    decrease: () => propose(DECREASE)
  }))(propose);

  const view = (model: Model): View => m("span", model.description + " " + model.counter);

  const component: Component<Model, Proposal, any> = {
    receive: (model: Model, proposal: Proposal): Model => {
      if (proposal.increment) {
        model.counter = model.counter + proposal.increment;
        return model;
      }
      return model;
    }
  };

  const model: Stream<Model> = run({ initialModel, components: [ component ] }).model;

  const render = (model: Model) => vnode = view(model);
  on<Model, void>(render, model);

  t.is(vnode.text, "test 1");

  actions.increase();
  t.is(vnode.text, "test 2");

  actions.increase();
  t.is(vnode.text, "test 3");
});

test("can have nextAction", (t: TestContext): void => {
  const initialModel: Model = { counter: 1, description: "test" };

  const INCREASE: Proposal = { increment: 1 };
  const DECREASE: Proposal = { increment: -1 };

  const actions: Actions = (propose => ({
    increase: () => propose(INCREASE),
    decrease: () => propose(DECREASE)
  }))(propose);

  const view = (model: Model): View => m("span", model.description + " " + model.counter);

  const component: Component<Model, Proposal, any> = {
    receive: (model: Model, proposal: Proposal): Model => {
      if (proposal.increment) {
        model.counter = model.counter + proposal.increment;
        return model;
      }
      return model;
    },
    nextAction: (model: Model, proposal: Proposal): void => {
      if (model.counter === 3 && proposal.increment === 1) {
        actions.increase();
      }
    }
  };

  const model: Stream<Model> = run({ initialModel, components: [ component ] }).model;

  const render = (model: Model) => vnode = view(model);
  on<Model, void>(render, model);

  t.is(vnode.text, "test 1");

  actions.increase();
  t.is(vnode.text, "test 2");

  actions.increase();
  t.is(vnode.text, "test 4");
});

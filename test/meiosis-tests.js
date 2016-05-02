import { expect } from "chai";
import { merge } from "ramda";
import h from "snabbdom/h";

import meiosis from "../dist/meiosis";

const { div, span } = require("hyperscript-helpers")(h);

describe("meiosis", function() {

  let vnode = null;

  // adapters
  const render = view => { vnode = view; };
  const adapters = { render };

  let Meiosis = null;
  let createComponent = null;

  beforeEach(function() {
    // prepare Meiosis
    Meiosis = meiosis(adapters);
    createComponent = Meiosis.createComponent;
  });

  it("calls the view with model and actions", function(done) {
    const initial = { duck: "quack" };

    Meiosis.run(createComponent({
      initialModel: initial,

      view: (model, actions) => {
        expect(model).to.exist;
        expect(actions).to.exist;
        expect(model).to.deep.equal(initial);

        done();
      }
    }));
  });

  it("renders a view", function() {
    const initial = { duck: "quack" };

    const view = (model, _actions) => span(`A duck says ${model.duck}`);

    Meiosis.run(createComponent({
      initialModel: initial,
      view: view
    }));

    expect(vnode).to.exist;
    expect(vnode.sel).to.equal("span");
    expect(vnode.text).to.equal("A duck says quack");
  });

  it("renders a tree of views", function() {
    const FormText = "Form";
    const ListText = "List";

    const Form = createComponent({ view: _props => div(FormText) });
    const List = createComponent({ view: _props => div(ListText) });
    const Main = createComponent({ view: props => div([Form(props), List(props)]) });

    Meiosis.run(Main);

    expect(vnode).to.exist;
    expect(vnode.sel).to.equal("div");
    expect(vnode.children.length).to.equal(2);

    expect(vnode.children[0].text).to.equal(FormText);
    expect(vnode.children[1].text).to.equal(ListText);
  });

  it("triggers an action", function() {
    const UPDATE = "update";

    let actionsRef = null;

    const Main = createComponent({
      initialModel: { name: "one" },
      view: (model, actions) => {
        actionsRef = actions;
        return span(model.name);
      },
      receiveUpdate: (model, update) => {
        if (update === UPDATE) {
          return { name: "two" };
        }
        return model;
      }
    });

    Meiosis.run(Main);
    expect(vnode.text).to.equal("one");

    actionsRef.sendUpdate(UPDATE);
    expect(vnode.text).to.equal("two");
  });

  it("nextUpdate", function() {
    const UPDATE = "update";
    const REFRESH = "refresh";

    const actions = sendUpdate => ({
      update: () => sendUpdate(UPDATE),
      refresh: () => sendUpdate(REFRESH)
    });

    let actionsRef = null;

    const Main = createComponent({
      initialModel: { name: "one" },
      actions: actions,
      view: (model, actions) => {
        actionsRef = actions;
        return span(model.name);
      },
      receiveUpdate: (model, update) => {
        if (update === UPDATE) {
          return { name: "two" };
        }
        else if (update === REFRESH) {
          return { name: "four" };
        }
        return model;
      },
      nextUpdate: (model, update, actions) => {
        if (update === UPDATE) {
          actions.refresh();
        }
      }
    });

    Meiosis.run(Main);
    expect(vnode.text).to.equal("one");

    actionsRef.update();
    expect(vnode.text).to.equal("four");
  });

  it("merges the models into a single root model", function() {
    const UPDATE = "update";

    const actions = sendUpdate => ({
      update: () => sendUpdate(UPDATE)
    });

    let actionsRef = null;

    const Form = createComponent({
      initialModel: { formText: "F1" },
      view: model => span(model.formText)
    });

    const List = createComponent({
      initialModel: { listText: "L1" },
      view: model => span(model.listText)
    });

    const Main = createComponent({
      initialModel: { name: "one" },
      actions: actions,
      view: (model, actions) => {
        actionsRef = actions;
        return div(
          [ span(model.name)
          , Form(model)
          , List(model)
          ]
        );
      },
      receiveUpdate: (model, update) => {
        if (update === UPDATE) {
          return { name: "two", formText: "F2", listText: "L2" };
        }
        return model;
      }
    });

    Meiosis.run(Main);

    expect(vnode.children.length).to.equal(3);
    expect(vnode.children[0].text).to.equal("one");
    expect(vnode.children[1].text).to.equal("F1");
    expect(vnode.children[2].text).to.equal("L1");

    actionsRef.update();
    expect(vnode.children[0].text).to.equal("two");
    expect(vnode.children[1].text).to.equal("F2");
    expect(vnode.children[2].text).to.equal("L2");
  });

  it("reflects change from one view in another view", function() {
    const UPDATE = "update";

    let actionsRef = null;

    const Form = createComponent({
      initialModel: { formText: "F1" },
      view: model => span(model.formText)
    });

    const List = createComponent({
      initialModel: { listText: "L1" },
      view: (model, actions) => {
        actionsRef = actions;
        return span(model.listText);
      },
      receiveUpdate: (model, update) => {
        if (update === UPDATE) {
          return merge(model, { formText: "F2" });
        }
        return model;
      }
    });

    const Main = createComponent({
      initialModel: { name: "one" },
      view: model => div(
        [ span(model.name)
        , Form(model)
        , List(model)
        ]
      )
    });

    Meiosis.run(Main);

    expect(vnode.children.length).to.equal(3);
    expect(vnode.children[0].text).to.equal("one");
    expect(vnode.children[1].text).to.equal("F1");
    expect(vnode.children[2].text).to.equal("L1");

    actionsRef.sendUpdate(UPDATE);
    expect(vnode.children[0].text).to.equal("one");
    expect(vnode.children[1].text).to.equal("F2");
    expect(vnode.children[2].text).to.equal("L1");
  });

  it("executes tasks", function(done) {
    const INCREMENT = "increment";

    let value = 0;
    let actionsRef = null;

    const promise = new Promise(res => res(42));

    const actions = sendUpdate => ({
      increment: () => promise.then(res => { value = res; sendUpdate(INCREMENT); })
    });

    Meiosis.run(createComponent({
      initialModel: { counter: 1 },
      actions: actions,
      view: (_model, actions) => {
        actionsRef = actions;
        return span("test");
      },
      receiveUpdate: (model, update) => {
        if (update === INCREMENT) {
          expect(value).to.equal(42);
          done();
        }
        return model;
      }
    }));

    actionsRef.increment();
  });

  it("accepts only specifying the view", function() {
    const FormText = "Form";
    const ListText = "List";

    const Form = createComponent({ view: _props => div(FormText) });
    const List = createComponent({ view: _props => div(ListText) });
    const Main = createComponent({ view: props => div([Form(props), List(props)]) });

    Meiosis.run(Main);

    expect(vnode).to.exist;
    expect(vnode.sel).to.equal("div");
    expect(vnode.children.length).to.equal(2);

    expect(vnode.children[0].text).to.equal(FormText);
    expect(vnode.children[1].text).to.equal(ListText);
  });

  it("all configs are optional, but you need something", function() {
    expect(() => createComponent()).to.throw(Error);
    expect(() => createComponent({})).to.throw(Error);
  });

  it("throws an error if actions is not a function", function() {
    expect(() => createComponent({
      actions: ({
        test: () => {}
      })
    })).to.throw(Error);
  });

  it("passes actions.sendUpdate to the view by default", function() {
    const UPDATE = "update";

    let actionsRef = null;

    const Main = createComponent({
      initialModel: { name: "one" },
      view: (model, actions) => {
        actionsRef = actions;
        return span(model.name);
      },
      receiveUpdate: (model, update) => {
        if (update === UPDATE) {
          return { name: "two" };
        }
        return model;
      }
    });

    Meiosis.run(Main);
    expect(vnode.text).to.equal("one");

    actionsRef.sendUpdate(UPDATE);
    expect(vnode.text).to.equal("two");
  });

  it("passes actions.sendUpdate to the view even when specifying actions", function() {
    const UPDATE = "update";

    const actions = sendUpdate => ({
      test: () => sendUpdate(UPDATE)
    });

    let actionsRef = null;

    const Main = createComponent({
      initialModel: { name: "one" },
      actions: actions,
      view: (model, actions) => {
        actionsRef = actions;
        return span(model.name);
      },
      receiveUpdate: (model, update) => {
        if (update === UPDATE) {
          return { name: "two" };
        }
        return model;
      }
    });

    Meiosis.run(Main);
    expect(vnode.text).to.equal("one");

    actionsRef.sendUpdate(UPDATE);
    expect(vnode.text).to.equal("two");
  });

  it("runs updates through receiveUpdate", function() {
    let actionsRef = null;

    const Main = createComponent({
      initialModel: { name: "one" },
      view: (model, actions) => {
        actionsRef = actions;
        return span(model.name);
      },
      receiveUpdate: (model, update) => {
        expect(model.name).to.equal("one");
        expect(update.name).to.equal("two");
        return { name: "three" };
      }
    });

    Meiosis.run(Main);
    expect(vnode.text).to.equal("one");

    actionsRef.sendUpdate({ name: "two" });
    expect(vnode.text).to.equal("three");
  });

  it("calls one component's receiveUpdate with another component's update", function() {
    let actionsRef = null;

    const Child = createComponent({
      view: (model, actions) => {
        actionsRef = actions;
        return span(model.name);
      }
    });

    const Main = createComponent({
      initialModel: { name: "one" },
      view: model => Child(model),
      receiveUpdate: (model, update) => {
        expect(model.name).to.equal("one");
        expect(update.name).to.equal("two");
        return { name: "three" };
      }
    });

    Meiosis.run(Main);
    expect(vnode.text).to.equal("one");

    actionsRef.sendUpdate({ name: "two" });
    expect(vnode.text).to.equal("three");
  });

  it("multiple functions that receive updates, in order of creation", function() {
    let actionsRef = null;

    const Child = createComponent({
      view: (model, actions) => {
        actionsRef = actions;
        return span(String(model.value));
      },
      receiveUpdate: (model, update) => {
        expect(model.value).to.equal(2);
        expect(update.value).to.equal(3);
        return { value: model.value + 3 };
      }
    });

    const Main = createComponent({
      initialModel: { value: 2 },
      view: model => Child(model),
      receiveUpdate: (model, update) => {
        expect(model.value).to.equal(5);
        expect(update.value).to.equal(3);
        return { value: model.value * 2 };
      }
    });

    Meiosis.run(Main);
    expect(vnode.text).to.equal("2");

    actionsRef.sendUpdate({ value: 3 });
    expect(vnode.text).to.equal("10");
  });

  it("returns a function to render a view from a model", function() {
    const initial = { duck: "quack" };

    const view = (model, _actions) => span(`A duck says ${model.duck}`);

    const renderRoot = Meiosis.run(createComponent({
      initialModel: initial,
      view: view
    }));

    expect(vnode).to.exist;
    expect(vnode.sel).to.equal("span");
    expect(vnode.text).to.equal("A duck says quack");

    const sound2 = "QUACK!";
    renderRoot({ duck: sound2 });
    expect(vnode.text).to.equal("A duck says " + sound2);
  });

  it("sends update through to the nextUpdate function", function(done) {
    let actionsRef = null;

    const Main = createComponent({
      initialModel: { name: "one" },
      view: (model, actions) => {
        actionsRef = actions;
        return span(model.name);
      },
      receiveUpdate: (model, update) => {
        expect(model.name).to.equal("one");
        expect(update.name).to.equal("two");
        return { name: "three" };
      },
      nextUpdate: (model, update, actions) => {
        expect(model.name).to.equal("three");
        expect(update).to.deep.equal({ name: "two" });
        expect(actions).to.equal(actionsRef);
        done();
      }
    });

    Meiosis.run(Main);
    expect(vnode.text).to.equal("one");

    actionsRef.sendUpdate({ name: "two" });
    expect(vnode.text).to.equal("three");
  });

  it("passes correct actions to each view", function() {
    const formActions = sendUpdate => ({
      formAction: () => sendUpdate("formAction")
    });

    const Form = createComponent({
      initialModel: { formText: "F1" },
      actions: formActions,
      view: (model, actions) => {
        expect(actions.formAction).to.exist;
        return span(model.formText);
      }
    });

    const listActions = sendUpdate => ({
      listAction: () => sendUpdate("listAction")
    });

    const List = createComponent({
      initialModel: { listText: "L1" },
      actions: listActions,
      view: (model, actions) => {
        expect(actions.listAction).to.exist;
        return span(model.listText);
      }
    });

    const mainActions = sendUpdate => ({
      mainAction: () => sendUpdate("mainAction")
    });

    const Main = createComponent({
      initialModel: { name: "one" },
      actions: mainActions,
      view: (model, actions) => {
        expect(actions.mainAction).to.exist;
        return div(
          [ span(model.name)
          , Form(model)
          , List(model)
          ]
        );
      }
    });

    Meiosis.run(Main);

    expect(vnode.children.length).to.equal(3);
    expect(vnode.children[0].text).to.equal("one");
    expect(vnode.children[1].text).to.equal("F1");
    expect(vnode.children[2].text).to.equal("L1");
  });

  it("passes correct actions to the nextUpdate function", function(done) {
    let formActionsRef = null;
    let listActionsRef = null;
    let counter = 0;

    const formActions = sendUpdate => ({
      formAction: () => sendUpdate("formAction")
    });

    const Form = createComponent({
      initialModel: { formText: "F1" },
      actions: formActions,
      view: (model, actions) => {
        formActionsRef = actions;
        return span(model.formText);
      },
      nextUpdate: (_model, _update, actions) => {
        expect(actions.formAction).to.exist;
        counter++;
        if (counter === 2) {
          done();
        }
      }
    });

    const listActions = sendUpdate => ({
      listAction: () => sendUpdate("listAction")
    });

    const List = createComponent({
      initialModel: { listText: "L1" },
      actions: listActions,
      view: (model, actions) => {
        listActionsRef = actions;
        return span(model.listText);
      },
      nextUpdate: (_model, _update, actions) => {
        expect(actions.listAction).to.exist;
        counter++;
        if (counter === 2) {
          done();
        }
      }
    });

    const Main = createComponent({
      initialModel: { name: "one" },
      view: (model, _actions) => div(
        [ span(model.name)
        , Form(model)
        , List(model)
        ]
      )
    });

    Meiosis.run(Main);

    formActionsRef.formAction();
    listActionsRef.listAction();
  });

  it("calls the ready function", function(done) {
    const initial = { duck: "quack" };

    const view = model => span(`A duck says ${model.duck}`);

    Meiosis.run(createComponent({
      initialModel: initial,
      view: view,
      ready: done
    }));

    expect(vnode).to.exist;
    expect(vnode.sel).to.equal("span");
    expect(vnode.text).to.equal("A duck says quack");
  });
});

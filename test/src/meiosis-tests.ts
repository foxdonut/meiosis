import { expect } from "chai";
import { Promise } from "es6-promise";
const h = require("snabbdom/h");

import { createComponent, run, REFUSE_PROPOSAL } from "../../lib/index";

describe("meiosis", function() {

  let vnode = null;

  const render = view => { vnode = view; };

  it("calls the view with model and propose", function(done) {
    const initial = { duck: "quack" };

    run(render, createComponent({
      initialModel: initial,

      view: (model, propose) => {
        expect(model).to.exist;
        expect(propose).to.exist;
        expect(model).to.deep.equal(initial);

        done();
      }
    }));
  });

  it("renders a view", function() {
    const initial = { duck: "quack" };

    const view = (model, _actions) => h("span", `A duck says ${model.duck}`);

    run(render, createComponent({
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

    const Form = createComponent({ view: _model => h("div", FormText) });
    const List = createComponent({ view: _model => h("div", ListText) });
    const Main = createComponent({ view: model => h("div", [Form(model), List(model)]) });

    run(render, Main);

    expect(vnode).to.exist;
    expect(vnode.sel).to.equal("div");
    expect(vnode.children.length).to.equal(2);

    expect(vnode.children[0].text).to.equal(FormText);
    expect(vnode.children[1].text).to.equal(ListText);
  });

  it("triggers a proposal", function() {
    const PROPOSAL = "proposal";

    let propose = null;

    const Main = createComponent({
      initialModel: { name: "one" },
      view: (model, propose_) => {
        propose = propose_;
        return h("span", model.name);
      },
      receive: (model, proposal) => {
        if (proposal === PROPOSAL) {
          return { name: "two" };
        }
        return model;
      }
    });

    run(render, Main);
    expect(vnode.text).to.equal("one");

    propose(PROPOSAL);
    expect(vnode.text).to.equal("two");
  });

  it("nextAction", function() {
    const CHANGE = "change";
    const REFRESH = "refresh";

    const actions = propose => ({
      change: () => propose(CHANGE),
      refresh: () => propose(REFRESH)
    });

    let actionsRef = null;

    const Main = createComponent({
      initialModel: { name: "one" },
      actions: actions,
      view: (model, actions_) => {
        actionsRef = actions_;
        return h("span", model.name);
      },
      receive: (model, proposal) => {
        if (proposal === CHANGE) {
          return { name: "two" };
        }
        else if (proposal === REFRESH) {
          return { name: "four" };
        }
        return model;
      },
      nextAction: (model, proposal, actions) => {
        if (proposal === CHANGE) {
          actions.refresh();
        }
      }
    });

    run(render, Main);
    expect(vnode.text).to.equal("one");

    actionsRef.change();
    expect(vnode.text).to.equal("four");
  });

  it("merges the models into a single root model", function() {
    const PROPOSAL = "proposal";

    const actions = propose => ({
      doIt: () => propose(PROPOSAL)
    });

    let actionsRef = null;

    const Form = createComponent({
      initialModel: { formText: "F1" },
      view: model => h("span", model.formText)
    });

    const List = createComponent({
      initialModel: { listText: "L1" },
      view: model => h("span", model.listText)
    });

    const Main = createComponent({
      initialModel: { name: "one" },
      actions: actions,
      view: (model, actions) => {
        actionsRef = actions;
        return h("div",
          [ h("span", model.name)
          , Form(model)
          , List(model)
          ]
        );
      },
      receive: (model, proposal) => {
        if (proposal === PROPOSAL) {
          return { name: "two", formText: "F2", listText: "L2" };
        }
        return model;
      }
    });

    run(render, Main);

    expect(vnode.children.length).to.equal(3);
    expect(vnode.children[0].text).to.equal("one");
    expect(vnode.children[1].text).to.equal("F1");
    expect(vnode.children[2].text).to.equal("L1");

    actionsRef.doIt();
    expect(vnode.children[0].text).to.equal("two");
    expect(vnode.children[1].text).to.equal("F2");
    expect(vnode.children[2].text).to.equal("L2");
  });

  it("reflects change from one view in another view", function() {
    const CHANGE = "change";

    let propose = null;

    const Form = createComponent({
      initialModel: { formText: "F1" },
      view: model => h("span", model.formText)
    });

    const List = createComponent({
      initialModel: { listText: "L1" },
      view: (model, propose_) => {
        propose = propose_;
        return h("span", model.listText);
      },
      receive: (model, proposal) => {
        if (proposal === CHANGE) {
          model.formText = "F2";
          return model;
        }
        return model;
      }
    });

    const Main = createComponent({
      initialModel: { name: "one" },
      view: model => h("div",
        [ h("span", model.name)
        , Form(model)
        , List(model)
        ]
      )
    });

    run(render, Main);

    expect(vnode.children.length).to.equal(3);
    expect(vnode.children[0].text).to.equal("one");
    expect(vnode.children[1].text).to.equal("F1");
    expect(vnode.children[2].text).to.equal("L1");

    propose(CHANGE);
    expect(vnode.children[0].text).to.equal("one");
    expect(vnode.children[1].text).to.equal("F2");
    expect(vnode.children[2].text).to.equal("L1");
  });

  it("executes tasks", function(done) {
    const INCREMENT = "increment";

    let value = 0;
    let actionsRef = null;

    const promise = new Promise<any>(res => res(42));

    const actions = propose => ({
      increment: () => promise.then(res => { value = res; propose(INCREMENT); })
    });

    run(render, createComponent({
      initialModel: { counter: 1 },
      actions: actions,
      view: (_model, actions) => {
        actionsRef = actions;
        return h("span", "test");
      },
      receive: (model, proposal) => {
        if (proposal === INCREMENT) {
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

    const Form = createComponent({ view: _model => h("div", FormText) });
    const List = createComponent({ view: _model => h("div", ListText) });
    const Main = createComponent({ view: model => h("div", [Form(model), List(model)]) });

    run(render, Main);

    expect(vnode).to.exist;
    expect(vnode.sel).to.equal("div");
    expect(vnode.children.length).to.equal(2);

    expect(vnode.children[0].text).to.equal(FormText);
    expect(vnode.children[1].text).to.equal(ListText);
  });

  it("all configs are optional, but you need something", function() {
    expect(() => createComponent(undefined)).to.throw(Error);
    expect(() => createComponent(null)).to.throw(Error);
    expect(() => createComponent({})).to.throw(Error);
  });

  it("passes propose to the view by default", function() {
    const CHANGE = "change";

    let propose = null;

    const Main = createComponent({
      initialModel: { name: "one" },
      view: (model, propose_) => {
        expect(typeof propose_).to.equal("function");
        propose = propose_;
        return h("span", model.name);
      },
      receive: (model, proposal) => {
        if (proposal === CHANGE) {
          return { name: "two" };
        }
        return model;
      }
    });

    run(render, Main);
    expect(vnode.text).to.equal("one");

    propose(CHANGE);
    expect(vnode.text).to.equal("two");
  });

  it("passes the actions object to the view", function() {
    const CHANGE = "change";

    const actions = propose => ({
      test: () => propose(CHANGE)
    });

    let actionsRef = null;

    const Main = createComponent({
      initialModel: { name: "one" },
      actions: actions,
      view: (model, actions) => {
        expect(typeof actions).to.equal("object");
        actionsRef = actions;
        return h("span", model.name);
      },
      receive: (model, proposal) => {
        if (proposal === CHANGE) {
          return { name: "two" };
        }
        return model;
      }
    });

    run(render, Main);
    expect(vnode.text).to.equal("one");

    actionsRef.test();
    expect(vnode.text).to.equal("two");
  });

  it("runs proposals through receive", function() {
    let propose = null;

    const Main = createComponent({
      initialModel: { name: "one" },
      view: (model, propose_) => {
        propose = propose_;
        return h("span", model.name);
      },
      receive: (model, proposal) => {
        expect(model.name).to.equal("one");
        expect(proposal.name).to.equal("two");
        return { name: "three" };
      }
    });

    run(render, Main);
    expect(vnode.text).to.equal("one");

    propose({ name: "two" });
    expect(vnode.text).to.equal("three");
  });

  it("calls one component's receive with another component's proposal", function() {
    let propose = null;

    const Child = createComponent({
      view: (model, propose_) => {
        propose = propose_;
        return h("span", model.name);
      }
    });

    const Main = createComponent({
      initialModel: { name: "one" },
      view: model => Child(model),
      receive: (model, proposal) => {
        expect(model.name).to.equal("one");
        expect(proposal.name).to.equal("two");
        return { name: "three" };
      }
    });

    run(render, Main);
    expect(vnode.text).to.equal("one");

    propose({ name: "two" });
    expect(vnode.text).to.equal("three");
  });

  it("supports multiple functions that receive proposals, in order of creation", function() {
    let propose = null;

    const Child = createComponent({
      view: (model, propose_) => {
        propose = propose_;
        return h("span", String(model.value));
      },
      receive: (model, proposal) => {
        expect(model.value).to.equal(2);
        expect(proposal.value).to.equal(3);
        return { value: model.value + 3 };
      }
    });

    const Main = createComponent({
      initialModel: { value: 2 },
      view: model => Child(model),
      receive: (model, proposal) => {
        expect(model.value).to.equal(5);
        expect(proposal.value).to.equal(3);
        return { value: model.value * 2 };
      }
    });

    run(render, Main);
    expect(vnode.text).to.equal("2");

    propose({ value: 3 });
    expect(vnode.text).to.equal("10");
  });

  it("returns a function to render a view from a model", function() {
    const initial = { duck: "quack" };

    const view = (model, _actions) => h("span", `A duck says ${model.duck}`);

    const renderRoot = run(render, createComponent({
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

  it("sends proposal through to the nextAction function", function(done) {
    let propose = null;

    const Main = createComponent({
      initialModel: { name: "one" },
      view: (model, propose_) => {
        propose = propose_;
        return h("span", model.name);
      },
      receive: (model, proposal) => {
        expect(model.name).to.equal("one");
        expect(proposal.name).to.equal("two");
        return { name: "three" };
      },
      nextAction: (model, proposal, propose_) => {
        expect(model.name).to.equal("three");
        expect(proposal).to.deep.equal({ name: "two" });
        expect(propose_).to.equal(propose);
        done();
      }
    });

    run(render, Main);
    expect(vnode.text).to.equal("one");

    propose({ name: "two" });
    expect(vnode.text).to.equal("three");
  });

  it("passes correct actions to each view", function() {
    const formActions = propose => ({
      formAction: () => propose("formAction")
    });

    const Form = createComponent({
      initialModel: { formText: "F1" },
      actions: formActions,
      view: (model, actions) => {
        expect(actions.formAction).to.exist;
        return h("span", model.formText);
      }
    });

    const listActions = propose => ({
      listAction: () => propose("listAction")
    });

    const List = createComponent({
      initialModel: { listText: "L1" },
      actions: listActions,
      view: (model, actions) => {
        expect(actions.listAction).to.exist;
        return h("span", model.listText);
      }
    });

    const mainActions = propose => ({
      mainAction: () => propose("mainAction")
    });

    const Main = createComponent({
      initialModel: { name: "one" },
      actions: mainActions,
      view: (model, actions) => {
        expect(actions.mainAction).to.exist;
        return h("div",
          [ h("span", model.name)
          , Form(model)
          , List(model)
          ]
        );
      }
    });

    run(render, Main);

    expect(vnode.children.length).to.equal(3);
    expect(vnode.children[0].text).to.equal("one");
    expect(vnode.children[1].text).to.equal("F1");
    expect(vnode.children[2].text).to.equal("L1");
  });

  it("calls all nextAction functions and passes correct actions to the each one", function(done) {
    let formActionsRef = null;
    let listActionsRef = null;
    let counter = 0;

    const formActions = propose => ({
      formAction: () => propose("formAction")
    });

    const Form = createComponent({
      initialModel: { formText: "F1" },
      actions: formActions,
      view: (model, actions) => {
        formActionsRef = actions;
        return h("span", model.formText);
      },
      nextAction: (_model, _proposal, actions) => {
        expect(actions.formAction).to.exist;
        expect(actions.listAction).not.to.exist;
        counter++;
        if (counter === 4) {
          done();
        }
      }
    });

    const listActions = propose => ({
      listAction: () => propose("listAction")
    });

    const List = createComponent({
      initialModel: { listText: "L1" },
      actions: listActions,
      view: (model, actions) => {
        listActionsRef = actions;
        return h("span", model.listText);
      },
      nextAction: (_model, _proposal, actions) => {
        expect(actions.listAction).to.exist;
        expect(actions.formAction).not.to.exist;
        counter++;
        if (counter === 4) {
          done();
        }
      }
    });

    const Main = createComponent({
      initialModel: { name: "one" },
      view: (model, _actions) => h("div",
        [ h("span", model.name)
        , Form(model)
        , List(model)
        ]
      )
    });

    run(render, Main);

    formActionsRef.formAction();
    listActionsRef.listAction();
  });

  it("calls the ready function with propose", function(done) {
    const initial = { duck: "quack" };

    const view = model => h("span", `A duck says ${model.duck}`);

    run(render, createComponent({
      initialModel: initial,
      view: view,
      ready: propose => {
        expect(propose).to.exist;
        expect(typeof propose).to.equal("function");
        done();
      }
    }));

    expect(vnode).to.exist;
    expect(vnode.sel).to.equal("span");
    expect(vnode.text).to.equal("A duck says quack");
  });

  it("calls the postRender function", function(done) {
    const initial = { duck: "quack" };
    const view = model => h("span", `A duck says ${model.duck}`);

    run(render, createComponent({
      initialModel: initial,
      view: view,
      postRender: () => done()
    }));
  });

  it("can refuse a proposal", function(done) {
    let propose = null;
    let counter = 0;

    const Main = createComponent({
      initialModel: { value: 1 },
      view: (model, propose_) => {
        counter++;
        propose = propose_;
        if (counter === 3) {
          expect(model.value).to.equal(4);
          done();
        }
        return h("span", model.value);
      },
      receive: (_model, proposal) => {
        if (proposal.value % 2 > 0) {
          return REFUSE_PROPOSAL;
        }
        return proposal;
      }
    });

    run(render, Main);

    propose({ value: 2 });
    propose({ value: 3 });
    propose({ value: 4 });
  });

  it("does not mistake empty object for REFUSE_PROPOSAL", function(done) {
    let propose = null;
    let counter = 0;

    const Main = createComponent({
      initialModel: { value: 1 },
      view: (model, propose_) => {
        counter++;
        propose = propose_;
        if (counter === 4) {
          expect(model.value).to.equal(4);
          done();
        }
        return h("span", model.value);
      },
      receive: (_model, proposal) => {
        if (proposal.value % 2 > 0) {
          return {};
        }
        return proposal;
      }
    });

    run(render, Main);

    propose({ value: 2 });
    propose({ value: 3 });
    propose({ value: 4 });
  });

  it("can use a display function for an initial viewModel", function() {
    const initialModel = { value: 2 };

    const display = view => model => view({ value: model.value * 2 });
    const view = model => h("span", String(model.value));

    const Main = createComponent({
      initialModel,
      view: display(view)
    });

    run(render, Main);

    expect(vnode.text).to.equal("4");
  });

  it("can use a state object in receive, and to decide which view to display", function() {
    const CHANGE = "change";

    let propose = null;

    const state = {
      isReady: model => model.value === 1,
      isSet: model => model.value === 2,
      isGo: model => model.value === 4
    };

    const view = {
      ready: (model, propose_) => {
        propose = propose_;
        return h("span", "ready");
      },
      set: (model, propose_) => h("span", "set"),
      go: (model, propose_) => h("span", "go")
    };

    const display = (state, view) => (model, propose) => {
      if (state.isReady(model)) {
        return view.ready(model, propose);
      }
      else if (state.isSet(model)) {
        return view.set(model, propose);
      }
      else if (state.isGo(model)) {
        return view.go(model, propose);
      }
    };

    const receive = state => (model, proposal) => {
      if (state.isReady(model)) {
        return { value: 2 };
      }
      else if (state.isSet(model)) {
        return { value: 4 };
      }
    };

    const Main = createComponent({
      initialModel: { value: 1 },
      view: display(state, view),
      receive: receive(state)
    });

    run(render, Main);
    expect(vnode.text).to.equal("ready");

    propose(CHANGE);
    expect(vnode.text).to.equal("set");

    propose(CHANGE);
    expect(vnode.text).to.equal("go");
  });
});

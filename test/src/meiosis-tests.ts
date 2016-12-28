import test from "ava";
import { newInstance } from "../../lib/index";
import { Promise } from "es6-promise";
import * as flyd from "flyd";
import * as m from "mithril";

let vnode = null;

const render = view => model => vnode = view(model);
let propose = null;
let run = null;

test.beforeEach(function() {
  const meiosis = newInstance();
  propose = meiosis.propose;
  run = meiosis.run;
});

test("calls the view with the model", t => {
  t.plan(2);

  const initialModel = { duck: "quack" };

  const view = model => {
    t.truthy(model);
    t.deepEqual(model, initialModel);
  };

  const model = run({ initialModel, components: [ ] }).model;
  flyd.on(render(view), model);
});

test("renders a view", t => {
  const initialModel = { duck: "quack" };

  const view = model => m("span", `A duck says ${model.duck}`);

  const model = run({ initialModel, components: [ ] }).model;
  flyd.on(render(view), model);

  t.truthy(vnode);
  t.is(vnode.tag, "span");
  t.is(vnode.text, "A duck says quack");
});

test("renders a tree of views", t => {
  const FormText = "Form";
  const ListText = "List";

  const Form = _model => m("div", FormText);
  const List = _model => m("div", ListText);
  const Main = model => m("div", Form(model), List(model));

  const model = run({ initialModel: { }, components: [ ] }).model;
  flyd.on(render(Main), model);

  t.truthy(vnode);
  t.is(vnode.tag, "div");
  t.is(vnode.children.length, 2);

  t.is(vnode.children[0].text, FormText);
  t.is(vnode.children[1].text, ListText);
});

test("triggers a proposal", t => {
  const PROPOSAL = "proposal";

  const initialModel = { name: "one" };

  const Main = {
    receive: (model, proposal) => {
      if (proposal === PROPOSAL) {
        return { name: "two" };
      }
      return model;
    }
  };

  const view = model => m("span", model.name);

  const model = run({ initialModel, components: [ Main ] }).model;
  flyd.on(render(view), model);

  t.is(vnode.text, "one");

  propose(PROPOSAL);
  t.is(vnode.text, "two");
});

test("nextAction", t => {
  const CHANGE = "change";
  const REFRESH = "refresh";

  const actions = (propose => ({
    change: () => propose(CHANGE),
    refresh: () => propose(REFRESH)
  }))(propose);

  const initialModel = { name: "one" };

  const Main = (actions => ({
    receive: (model, proposal) => {
      if (proposal === CHANGE) {
        return { name: "two" };
      }
      else if (proposal === REFRESH) {
        return { name: "four" };
      }
      return model;
    },
    nextAction: (model, proposal) => {
      if (proposal === CHANGE) {
        actions.refresh();
      }
    }
  }))(actions);

  const model = run({ initialModel, components: [ Main ] }).model;
  const view = model => m("span", model.name);
  flyd.on(render(view), model);

  t.is(vnode.text, "one");

  actions.change();
  t.is(vnode.text, "four");
});

test("reflects change from one view in another view", t => {
  const CHANGE = "change";

  const initialModel = { name: "one", formText: "F1", listText: "L1" };

  const Form = model => m("span", model.formText);
  const List = model => m("span", model.listText);

  const component = {
    receive: (model, proposal) => {
      if (proposal === CHANGE) {
        model.formText = "F2";
        return model;
      }
      return model;
    }
  };

  const Main = model => m("div",
    m("span", model.name),
    Form(model),
    List(model)
  );

  const model = run({ initialModel, components: [ component ] }).model;
  flyd.on(render(Main), model);

  t.is(vnode.children.length, 3);
  t.is(vnode.children[0].text, "one");
  t.is(vnode.children[1].text, "F1");
  t.is(vnode.children[2].text, "L1");

  propose(CHANGE);
  t.is(vnode.children[0].text, "one");
  t.is(vnode.children[1].text, "F2");
  t.is(vnode.children[2].text, "L1");
});

test.cb("executes tasks", t => {
  t.plan(1);

  const INCREMENT = "increment";

  let value = 0;

  const promise = new Promise<any>(res => res(42));

  const actions = (propose => ({
    increment: () => promise.then(res => { value = res; propose(INCREMENT); })
  }))(propose);

  run({ initialModel: { counter: 1 }, components: [ {
    receive: (model, proposal) => {
      if (proposal === INCREMENT) {
        t.is(value, 42);
        t.end();
      }
      return model;
    }
  } ] });

  actions.increment();
});

test("accepts only specifying the view", t => {
  const FormText = "Form";
  const ListText = "List";

  const Form = _model => m("div", FormText);
  const List = _model => m("div", ListText);
  const Main = model => m("div", Form(model), List(model));

  const model = run({ initialModel: { }, components: [ ] }).model;
  flyd.on(render(Main), model);

  t.truthy(vnode);
  t.is(vnode.tag, "div");
  t.is(vnode.children.length, 2);

  t.is(vnode.children[0].text, FormText);
  t.is(vnode.children[1].text, ListText);
});

test("parameters must be specified", t => {
  t.throws(() => run());
  t.throws(() => run({ initialModel: { } }));
  t.throws(() => run({ components: [ ] }));
});

test("runs proposals through receive", t => {
  const initialModel = { name: "one" };

  const Main = model => m("span", model.name);

  const component = {
    receive: (model, proposal) => {
      t.is(model.name, "one");
      t.is(proposal.name, "two");
      return { name: "three" };
    }
  };

  const model = run({ initialModel, components: [ component ] }).model;
  flyd.on(render(Main), model);
  t.is(vnode.text, "one");

  propose({ name: "two" });
  t.is(vnode.text, "three");
});

test("calls one component's receive with another component's proposal", t => {
  const Child = model => m("span", model.name);
  const Main = model => Child(model);

  const component = {
    receive: (model, proposal) => {
      t.is(model.name, "one");
      t.is(proposal.name, "two");
      return { name: "three" };
    }
  };

  const model = run({ initialModel: { name: "one" }, components: [ component ] }).model;
  flyd.on(render(Main), model);
  t.is(vnode.text, "one");

  propose({ name: "two" });
  t.is(vnode.text, "three");
});

test("supports multiple functions that receive proposals, in order of creation", t => {
  const Child = model => m("span", String(model.value));

  const component1 = {
    receive: (model, proposal) => {
      t.is(model.value, 2);
      t.is(proposal.value, 3);
      return { value: model.value + 3 };
    }
  };

  const Main = model => Child(model);

  const component2 = {
    receive: (model, proposal) => {
      t.is(model.value, 5);
      t.is(proposal.value, 3);
      return { value: model.value * 2 };
    }
  };

  const model = run({ initialModel: { value: 2 }, components: [ component1, component2 ] }).model;
  flyd.on(render(Main), model);
  t.is(vnode.text, "2");

  propose({ value: 3 });
  t.is(vnode.text, "10");
});

test("use a function to render a view from a model", t => {
  const initialModel = { duck: "quack" };

  const view = model => m("span", `A duck says ${model.duck}`);

  const renderRoot = render(view);
  renderRoot(initialModel);

  t.truthy(vnode);
  t.is(vnode.tag, "span");
  t.is(vnode.text, "A duck says quack");

  const sound2 = "QUACK!";
  renderRoot({ duck: sound2 });
  t.is(vnode.text, "A duck says " + sound2);
});

test("sends proposal through to the nextAction function", t => {
  t.plan(7);

  const initialModel = { name: "one" };

  const Main = model => m("span", model.name);

  const component = {
    receive: (model, proposal) => {
      t.is(model.name, "one");
      t.is(proposal.name, "two");
      return { name: "three" };
    },
    nextAction: (model, proposal) => {
      t.is(model.name, "three");
      t.deepEqual(proposal, { name: "two" });
      t.is(propose, propose);
    }
  };

  const model = run({ initialModel, components: [ component ] }).model;
  flyd.on(render(Main), model);
  t.is(vnode.text, "one");

  propose({ name: "two" });
  t.is(vnode.text, "three");
});

test("calls all nextAction functions", t => {
  t.plan(2);

  const Form = {
    nextAction: (model, proposal) => {
      t.truthy(model);
    }
  };

  const List = {
    nextAction: (model, proposal) => {
      t.truthy(model);
    }
  };

  const initialModel = { name: "one" };

  run({ initialModel, components: [ Form, List ] });

  propose({});
});

test("can use a state object in receive, and to decide which view to display", t => {
  const CHANGE = "change";

  const state = {
    isReady: model => model.value === 1,
    isSet: model => model.value === 2,
    isGo: model => model.value === 4
  };

  const view = {
    ready: model => m("span", "ready"),
    set: model => m("span", "set"),
    go: model => m("span", "go")
  };

  const display = (state, view) => model => {
    if (state.isReady(model)) {
      return view.ready(model);
    }
    else if (state.isSet(model)) {
      return view.set(model);
    }
    else if (state.isGo(model)) {
      return view.go(model);
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

  const Main = {
    receive: receive(state)
  };

  const model = run({ initialModel: { value: 1 }, components: [ Main ] }).model;
  flyd.on(render(display(state, view)), model);
  t.is(vnode.text, "ready");

  propose(CHANGE);
  t.is(vnode.text, "set");

  propose(CHANGE);
  t.is(vnode.text, "go");
});

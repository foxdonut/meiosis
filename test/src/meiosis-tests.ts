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

/*
test("returns a function to render a view from a model", t => {
  const initialModel = { duck: "quack" };

  const view = (model, _actions) => m("span", `A duck says ${model.duck}`);

  const renderRoot = run({ renderer, initialModel, rootComponent: createComponent({ view: view }) });

  t.truthy(vnode);
  t.is(vnode.tag, "span");
  t.is(vnode.text, "A duck says quack");

  const sound2 = "QUACK!";
  renderRoot({ duck: sound2 });
  t.is(vnode.text, "A duck says " + sound2);
});

test("returns the combined initial model", t => {
  createComponent({ initialModel: model => { model.duck = "quack"; return model; } });
  const Root = createComponent({ initialModel: model => { model.color = "yellow"; return model; } });
  const renderRoot = run({ renderer, initialModel: { one: "two" }, rootComponent: Root });
  t.deepEqual(renderRoot.initialModel, { one: "two", duck: "quack", color: "yellow" });
});

test("sends proposal through to the nextAction function", t => {
  t.plan(7);

  let propose = null;

  const Main = createComponent({
    initialModel: () => ({ name: "one" }),
    view: (model, propose_) => {
      propose = propose_;
      return m("span", model.name);
    },
    receive: (model, proposal) => {
      t.is(model.name, "one");
      t.is(proposal.name, "two");
      return { name: "three" };
    },
    nextAction: context => {
      t.is(context.model.name, "three");
      t.deepEqual(context.proposal, { name: "two" });
      t.is(context.propose, propose);
    }
  });

  run({ renderer, rootComponent: Main });
  t.is(vnode.text, "one");

  propose({ name: "two" });
  t.is(vnode.text, "three");
});

test("passes correct actions to each view", t => {
  const formActions = propose => ({
    formAction: () => propose("formAction")
  });

  const Form = createComponent({
    initialModel: model => { model.formText = "F1"; return model; },
    actions: formActions,
    view: (model, actions) => {
      t.truthy(actions.formAction);
      return m("span", model.formText);
    }
  });

  const listActions = propose => ({
    listAction: () => propose("listAction")
  });

  const List = createComponent({
    initialModel: model => { model.listText = "L1"; return model; },
    actions: listActions,
    view: (model, actions) => {
      t.truthy(actions.listAction);
      return m("span", model.listText);
    }
  });

  const mainActions = propose => ({
    mainAction: () => propose("mainAction")
  });

  const Main = createComponent({
    initialModel: model => { model.name = "one"; return model; },
    actions: mainActions,
    view: (model, actions) => {
      t.truthy(actions.mainAction);
      return m("div",
        [ m("span", model.name)
        , Form(model)
        , List(model)
        ]
      );
    }
  });

  run({ renderer, rootComponent: Main });

  t.is(vnode.children.length, 3);
  t.is(vnode.children[0].text, "one");
  t.is(vnode.children[1].text, "F1");
  t.is(vnode.children[2].text, "L1");
});

test("calls all nextAction functions and passes correct actions to the each one", t => {
  t.plan(8);

  let formActionsRef = null;
  let listActionsRef = null;

  const formActions = propose => ({
    formAction: () => propose("formAction")
  });

  const Form = createComponent({
    actions: formActions,
    view: (_model, actions) => {
      formActionsRef = actions;
      return m("span");
    },
    nextAction: context => {
      t.truthy(context.actions.formAction);
      t.falsy(context.actions.listAction);
    }
  });

  const listActions = propose => ({
    listAction: () => propose("listAction")
  });

  const List = createComponent({
    actions: listActions,
    view: (_model, actions) => {
      listActionsRef = actions;
      return m("span");
    },
    nextAction: context => {
      t.truthy(context.actions.listAction);
      t.falsy(context.actions.formAction);
    }
  });

  const Main = createComponent({
    initialModel: () => ({ name: "one" }),
    view: (model, _actions) => m("div",
      [ m("span", model.name)
      , Form(model)
      , List(model)
      ]
    )
  });

  run({ renderer, rootComponent: Main });

  formActionsRef.formAction();
  listActionsRef.listAction();
});

test("calls the ready function with propose", t => {
  t.plan(5);

  const initialModel = { duck: "quack" };

  const view = model => m("span", `A duck says ${model.duck}`);

  run({ renderer, initialModel, rootComponent: createComponent({
    view: view,
    ready: propose => {
      t.truthy(propose);
      t.is(typeof propose, "function");
    }
  }) });

  t.truthy(vnode);
  t.is(vnode.tag, "span");
  t.is(vnode.text, "A duck says quack");
});

test("calls the postRender function", t => {
  t.plan(1);

  const initialModel = { duck: "quack" };
  const view = model => m("span", `A duck says ${model.duck}`);

  run({ renderer, initialModel, rootComponent: createComponent({
    view: view,
    postRender: model => t.is(model, initialModel)
  }) });
});

test("can use a display function for an initial viewModel", t => {
  const initialModel = { value: 2 };

  const display = view => model => view({ value: model.value * 2 });
  const view = model => m("span", String(model.value));

  const Main = createComponent({ view: display(view) });

  run({ renderer, initialModel, rootComponent: Main });

  t.is(vnode.text, "4");
});

test("can use a state object in receive, and to decide which view to display", t => {
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
      return m("span", "ready");
    },
    set: (model, propose_) => m("span", "set"),
    go: (model, propose_) => m("span", "go")
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
    view: display(state, view),
    receive: receive(state)
  });

  run({ renderer, initialModel: { value: 1 }, rootComponent: Main });
  t.is(vnode.text, "ready");

  propose(CHANGE);
  t.is(vnode.text, "set");

  propose(CHANGE);
  t.is(vnode.text, "go");
});
*/
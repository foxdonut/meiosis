import { expect } from "chai";
import { merge } from "ramda";
import radio from "radio";

import { meiosis } from "../src/index";

import snabbdom from "snabbdom";
import h from "snabbdom/h";
import jsdom from "mocha-jsdom";

const {div, span} = require("hyperscript-helpers")(h);

describe("meiosis", function() {
 
  // snabbdom setup
  const patch = snabbdom.init([
    require("snabbdom/modules/props"),
    require("snabbdom/modules/eventlisteners")
  ]);

  // mocha-jsdom setup
  jsdom();

  let element = null;

  beforeEach(function() {
    element = document.createElement("div");
  });

  // adapters
  const pubsub = radio;
  const render = view => { element = patch(element, view); };
  const adapters = { pubsub, render };

  // prepare Meiosis
  const Meiosis = meiosis(adapters);
  const createFeature = Meiosis.createFeature;

  // baseline config for tests
  const baseConfig = {
    name: "test",
    initialModel: {},
    model: (model, _next) => model,
    actions: _next => ({}),
    view: _props => null,
    chain: (_model, _next) => null
  };

  it("calls the view with actions and model", function(done) {
    const initial = { duck: "quack" };

    Meiosis.run(createFeature(merge(baseConfig, {
      initialModel: initial,

      view: props => {
        expect(props.actions).to.exist;
        expect(props.model).to.exist;
        expect(props.model).to.equal(initial);

        done();
      }
    })));
  });

  it("renders a view", function() {
    const initial = { duck: "quack" };

    const view = props => span(`A duck says ${props.model.duck}`);

    createFeature(merge(baseConfig, {
      initialModel: initial,
      view: view
    }));

    expect(element).to.exist;
    expect(element.tagName.toLowerCase()).to.equal("span");
    expect(element.innerHTML).to.equal("A duck says quack");
  });

  it("renders a tree of views", function() {
    const FormText = "Form";
    const ListText = "List";

    const Form = createFeature(merge(baseConfig, { name: "Form", view: _props => div(FormText) }));
    const List = createFeature(merge(baseConfig, { name: "List", view: _props => div(ListText) }));
    const Main = createFeature(merge(baseConfig, { name: "Main", view: props => div([Form(props), List(props)]) }));

    Meiosis.run(Main);

    expect(element).to.exist;
    expect(element.tagName.toLowerCase()).to.equal("div");
    expect(element.children.length).to.equal(2);

    expect(element.children[0].innerHTML).to.equal(FormText);
    expect(element.children[1].innerHTML).to.equal(ListText);
  });

  xit("triggers an action", function() {
    
  });

  xit("chains an action", function() {
    
  });

  xit("merges the models into a single root model", function() {
    
  });

  xit("reflects change from one view in another view", function() {
    
  });

  xit("executes tasks", function() {
    
  });
  /*
  it("calls update with an action and a model", function(done) {
    const initial = { duck: "quack" };
    const testAction = "TEST";
    let flag = true;

    const feature = createFeature(merge(baseConfig, {
      initialModel: [initial, null],
      view: address => _model => {
        if (flag) {
          flag = false;
          address.onNext(testAction);
        }
      },
      update: (model, action) => {
        expect(action).to.equal(testAction);
        expect(model).to.equal(initial);
        done();
        return [model, null];
      }
    }));

    feature.view$.subscribe(identity);
  });

  it("sends the next action", function(done) {
    const firstAction = "first";
    const secondAction = "second";
    const task = Task.of(secondAction);

    let flag = true;

    const feature = createFeature(merge(baseConfig, {
      view: address => _model => {
        if (flag) {
          flag = false;
          address.onNext(firstAction);
          return "view 1";
        }
        return "view 2";
      },
      update: (model, action) => {
        if (action === firstAction) {
          return [model, task];
        } else if (action === secondAction) {
          done();
          return [model, null];
        }
      }
    }));

    feature.view$.subscribe(identity);
    feature.task$.subscribe(taskRunner);
  });

  it("updates the model", function(done) {
    const INCREMENT = "increment";

    let flag = true;

    const feature = createFeature(merge(baseConfig, {
      initialModel: [{ counter: 1 }, null],
      update: (model, action) => {
        if (action === INCREMENT) {
          return [over(lensProp("counter"), inc, model), null];
        }
        return [model, null];
      },
      view: address => model => {
        if (flag) {
          flag = false;
          address.onNext(INCREMENT);
        } else {
          expect(model.counter).to.equal(2);
          done();
        }
      }
    }));

    feature.view$.subscribe(identity);
  });

  it("merges input signals", function(done) {
    const INCREMENT = "increment";

    const input = new Subject();

    const feature = createFeature(merge(baseConfig, {
      initialModel: [{ counter: 1 }, null],
      update: (model, action) => {
        if (action === INCREMENT) {
          return [over(lensProp("counter"), inc, model), null];
        }
        return [model, null];
      },
      view: _address => model => {
        if (model.counter === 2) {
          done();
        }
      },
      inputs: [input]
    }));

    feature.view$.subscribe(identity);

    input.onNext(INCREMENT);
  });

  it("executes tasks", function(done) {
    const INCREMENT = "increment";
    const NO_OP = "noOp";

    let flag = true;

    const input = new Subject();

    const task = new Task((rej, res) => {
      flag = false;
      res(NO_OP);
    });

    const feature = createFeature(merge(baseConfig, {
      initialModel: [{ counter: 1 }, null],
      update: (model, action) => {
        if (action === INCREMENT) {
          return [over(lensProp("counter"), inc, model), task];
        }
        return [model, null];
      },
      view: _address => _model => {
        if (!flag) {
          done();
        }
      },
      inputs: [input]
    }));

    feature.view$.subscribe(identity);
    feature.task$.subscribe(taskRunner);

    input.onNext(INCREMENT);
  });

  it("dispatches the next action", function(done) {
    const input = new Subject();
    const output = new Subject();

    const todos = [{
      id: 1,
      description: "test 1"
    }, {
      id: 2,
      description: "test 2"
    }];

    const Action = Type({
      NoOp: [],
      LoadList: [],
      ShowList: [Array]
    });

    const loadListTask = new Task((rej, res) => res(Action.ShowList(todos)));

    const showListTask = new Task((rej, res) => {
      output.onNext(todos);
      res(Action.NoOp());
    });

    const handler = model =>
      ({
        NoOp: () => {
          expect(model).to.deep.equal(todos);
          done();
          return [model, null];
        },
        LoadList: () => [
          [], loadListTask
        ],
        ShowList: todos => [todos, showListTask]
      });

    const feature = createFeature(merge(baseConfig, {
      update: (model, action) => Action.case(handler(model), action),
      inputs: [input]
    }));

    feature.task$.subscribe(taskRunner);

    input.onNext(Action.LoadList());
  });
  */
});

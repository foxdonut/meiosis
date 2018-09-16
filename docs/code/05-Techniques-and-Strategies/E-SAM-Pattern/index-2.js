/* global React, ReactDOM, flyd, seview, meiosisTracer */

// -- Utility code

const pipe = (...fns) => input => fns.reduce((value, fn) => fn(value), input);
const I = x => x;

const preventDefault = evt => {
  evt.preventDefault();
  return evt;
};

const get = (object, path) =>
  object == undefined
    ? undefined
    : path.length === 1
      ? object[path[0]]
      : get(object[path[0]], path.slice(1));

const set = (path, value) => object => {
  const head = path[0];
  if (path.length === 1) {
    object[head] = value;
  }
  else {
    if (object[head] === undefined) {
      object[head] = {};
    }
    set(path.slice(1), value)(object[head]);
  }
  return object;
};

const merge = object => model => Object.assign(model, object);

// -- View setup code: seview + React

const h = seview.sv(node => {
  if (typeof node === "string") {
    return node;
  }
  const attrs = node.attrs || {};
  if (attrs.innerHTML) {
    attrs.dangerouslySetInnerHTML = { __html: attrs.innerHTML };
    delete attrs.innerHTML;
  }
  const args = [node.tag, node.attrs || {}].concat(node.children || []);
  return React.createElement.apply(null, args);
});

// -- Application code

// -- Constants

const HomePage = "HomePage";
const DataPage = "DataPage";
const SettingsPage = "SettingsPage";
const LoginPage = "LoginPage";

// -- Actions

const createActions = update => ({
  navigateTo: pageId => update(merge({ pageId })),
  login: user => update(merge({ user, pageId: HomePage })),
  username: value => update(set(["login", "username"], value)),
  password: value => update(set(["login", "password"], value)),
  logout: () => update(merge({ user: null, data: null, pageId: HomePage })),
  loadData: () => setTimeout(() => update(merge({ data: "The data has been loaded." })), 1500)
});

// -- State

const checkAuthentication = model => {
  if (model.pageId === SettingsPage && model.user == null) {
    return merge({ pageId: LoginPage, returnTo: SettingsPage });
  }
  return I;
};

const prepareLogin = model => {
  if (model.pageId === LoginPage && !model.login) {
    return merge({ login: { username: "", password: "" } });
  }
  else if (model.pageId !== LoginPage && model.login) {
    return merge({ login: null });
  }
  return I;
};

const checkReturnTo = model => {
  if (model.user && model.returnTo) {
    return merge({ pageId: model.returnTo, returnTo: null });
  }
  else if (model.pageId !== LoginPage && model.returnTo) {
    return merge({ returnTo: null });
  }
  return I;
};

const state = model => [
  checkAuthentication,
  prepareLogin,
  checkReturnTo
].reduce((x, f) => f(x)(x), model);

// -- Next-Action-Predicate (nap)

const createNap = actions => state => {
  if (state.pageId === DataPage && !state.data) {
    actions.loadData();
  }
};

// -- Pages

const createPages = actions => {
  const pages = {};

  pages[HomePage] = {
    view: _state => ["div",
      ["div", "Navigate to a page by clicking on the items above."],
      ["div", "Note the following:"],
      ["ul",
        ["li", "If you go to Settings without logging in, you are sent to Login (acceptor refuses proposal)"],
        ["li", "Going to the Login page clears the form (state)"],
        ["li", "After Login, you are sent to Settings if you had tried to go there, else Home (state)"],
        ["li", "When you go to the Data page, the data is loaded asynchronously (next-action-predicate)"],
        ["li", "The Data is already there if you go back and forth"],
        ["li", "The Data is cleared out if you Logout."]
      ]
    ]
  };

  pages[DataPage] = {
    view: state => ["div", state.data || "Loading, please wait..."]
  };

  pages[SettingsPage] = {
    view: _state => ["div", "Settings page."]
  };

  pages[LoginPage] = {
    view: state => ["div",
      ["div", "Login"],
      ["form.navbar-form",
        [".form-group",
          ["input:text.form-control[placeholder=username]",
            { value: state.login.username, onChange: evt => actions.username(evt.target.value) }]
        ],
        [".form-group",
          ["input:password.form-control[placeholder=password]",
            { value: state.login.password, onChange: evt => actions.password(evt.target.value) }]
        ],
        ["button:submit.btn.btn-primary",
          { onClick: pipe(preventDefault, () => actions.login(state.login)) },
          "Login"]
      ]
    ]
  };

  return pages;
};

// -- View

const createView = actions => {
  const pages = createPages(actions);
  const navigateTo = pageId => pipe(preventDefault, () => actions.navigateTo(pageId));

  return model => {
    const active = pageId => model.pageId === pageId ? ".active" : "";

    return ["div",
      ["ul.tab",
        ["li.tab-item" + active(HomePage),
          ["a", { href: "#", onClick: navigateTo(HomePage) }, "Home"]],

        ["li.tab-item" + active(SettingsPage),
          ["a", { href: "#", onClick: navigateTo(SettingsPage) }, "Settings"]],

        ["li.tab-item" + active(LoginPage),
          ["a", { href: "#", onClick: navigateTo(LoginPage) }, "Login"]],

        ["li.tab-item",
          ["a", { href: "#", onClick: pipe(preventDefault, () => actions.logout()) },
            "Logout"]],

        ["li.tab-item" + active(DataPage),
          ["a", { href: "#", onClick: navigateTo(DataPage) }, "Data"]]
      ],
      pages[model.pageId].view(model)
    ];
  };
};

// - App

const createApp = actions => {
  return {
    initialModel: () => ({ pageId: HomePage }),
    state,
    view: createView(actions)
  };
};

// -- Meiosis pattern setup code

const update = flyd.stream();
const actions = createActions(update);
const app = createApp(actions);
const nap = createNap(actions);

const models = flyd.scan((x, f) => f(x), app.initialModel(), update);
const states = models.map(app.state);

const element = document.getElementById("app");
const render = view => { ReactDOM.render(h(view), element); };

states.map(pipe(app.view, render));
states.map(nap);

// Only for using Meiosis Tracer in development.
meiosisTracer({ selector: "#tracer", rows: 5, streams: [
  { stream: models, label: "Model" },
  { stream: states, label: "State" }
] });

/* global React, ReactDOM, flyd, O, seview */

// -- Utility code

const pipe = (...fns) => input => fns.reduce((value, fn) => fn(value), input);

const preventDefault = evt => {
  evt.preventDefault();
  return evt;
};

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

const createActions = present => ({
  navigateTo: pageId => present({ pageId }),
  login: user => present({ user, pageId: HomePage }),
  username: value => present({ login: O({ username: value })}),
  password: value => present({ login: O({ password: value })}),
  logout: () => present({ user: O, data: O, pageId: HomePage }),
  loadData: () => setTimeout(() => present({ data: "The data has been loaded." }), 1500)
});

// -- Acceptor

const acceptor = (model, proposal) => {
  if (proposal.pageId === SettingsPage && model.user == null) {
    return O(model, { pageId: LoginPage, returnTo: SettingsPage });
  }
  return O(model, proposal);
};

// -- State

const prepareLogin = model => {
  if (model.pageId === LoginPage && !model.login) {
    return { login: { username: "", password: "" } };
  }
  else if (model.pageId !== LoginPage && model.login) {
    return { login: null };
  }
};

const checkReturnTo = model => {
  if (model.user && model.returnTo) {
    return { pageId: model.returnTo, returnTo: O };
  }
  else if (model.pageId !== LoginPage && model.returnTo) {
    return { returnTo: O };
  }
};

const state = model => [
  prepareLogin,
  checkReturnTo
].reduce((x, f) => O(x, f(x)), model);

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
    view: _state =>
      ["div", "Navigate to a page by clicking on the items above."]
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
    initialModel: () => ({ pageId: HomePage, login: { username: "", password: "" } }),
    acceptor,
    state,
    view: createView(actions)
  };
};

// -- Meiosis pattern setup code

const present = flyd.stream();
const actions = createActions(present);
const app = createApp(actions);
const nap = createNap(actions);

const models = flyd.scan(app.acceptor, app.initialModel(), present);
const states = models.map(app.state);

const element = document.getElementById("app");
const render = view => { ReactDOM.render(h(view), element); };

states.map(pipe(app.view, render));
states.map(nap);

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

const createActions = update => ({
  navigateTo: pageId => update({ pageId }),
  login: user => update({ user, pageId: HomePage }),
  username: value => update({ login: O({ username: value })}),
  password: value => update({ login: O({ password: value })}),
  logout: () => update({ user: O, data: O, pageId: HomePage }),
  loadData: () => setTimeout(() => update({ data: "The data has been loaded." }), 1500)
});

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
    view: createView(actions)
  };
};

// -- Meiosis pattern setup code

const update = flyd.stream();
const actions = createActions(update);
const app = createApp(actions);

const models = flyd.scan(O, app.initialModel(), update);

const element = document.getElementById("app");
const render = view => { ReactDOM.render(h(view), element); };

models.map(pipe(app.view, render));

/* global React, ReactDOM, flyd, P, PS, seview */

// -- Utility code

const pipe = (...fns) => input => fns.reduce((value, fn) =>
  fn(value), input);

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
  const args = [node.tag, node.attrs || {}]
    .concat(node.children || []);
  return React.createElement.apply(null, args);
});

// -- Application code

const prepareLogin = model => {
  if (model.pageId === "LoginPage" && !model.login) {
    return { login: { username: "", password: "" } };
  }
  else if (model.pageId !== "LoginPage" && model.login) {
    return { login: null };
  }
};

const checkReturnTo = model => {
  if (model.user && model.returnTo) {
    return { pageId: model.returnTo, returnTo: null };
  }
  else if (model.pageId !== "LoginPage" && model.returnTo) {
    return { returnTo: null };
  }
};

const app = {
  initialState: () => ({
    pageId: "HomePage",
    login: {
      username: "",
      password: ""
    }
  }),
  actions: present => ({
    navigateTo: pageId => present({ pageId }),
    login: user => present({ user, pageId: "HomePage" }),
    username: value => present({ login: PS({ username: value })}),
    password: value => present({ login: PS({ password: value })}),
    logout: () => present({ user: null, data: null, pageId: "HomePage" }),
    loadData: () => setTimeout(() =>
      present({ data: "The data has been loaded." }), 1500)
  }),
  acceptor: (model, proposal) => {
    if (proposal.pageId === "SettingsPage" && model.user == null) {
      return P(model, { pageId: "LoginPage", returnTo: "SettingsPage" });
    }
    return P(model, proposal);
  },
  state: model => [
    prepareLogin,
    checkReturnTo
  ].reduce((x, f) => P(x, f(x)), model),

  nap: actions => state => {
    if (state.pageId === "DataPage" && !state.data) {
      actions.loadData();
    }
  }
};

// -- Pages

class HomePage extends React.Component {
  render() {
    return h(["div", "Navigate to a page by clicking on the items above."]);
  }
}

class DataPage extends React.Component {
  render() {
    const { state } = this.props;
    return h(["div", state.data || "Loading, please wait..."]);
  }
}

class SettingsPage extends React.Component {
  render() {
    return h(["div", "Settings page."]);
  }
}

class LoginPage extends React.Component {
  render() {
    const { state } = this.props;
    return h(
      ["div",
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
    );
  }
}

const pages = {
  HomePage,
  DataPage,
  SettingsPage,
  LoginPage
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.navigateTo = pageId =>
      pipe(preventDefault, () => this.props.actions.navigateTo(pageId));
    this.state = this.props.states();
  }

  componentDidMount() {
    const setState = this.setState.bind(this);
    this.props.states.map(state => { setState(state); });
  }

  render() {
    const state = this.state;
    const { actions } = this.props;
    const active = pageId => state.pageId === pageId ? ".active" : "";
    const Component = pages[state.pageId];

    return h(["div",
      ["ul.tab",
        ["li.tab-item" + active("HomePage"),
          ["a", { href: "#", onClick: this.navigateTo("HomePage") }, "Home"]],

        ["li.tab-item" + active("SettingsPage"),
          ["a", { href: "#", onClick: this.navigateTo("SettingsPage") }, "Settings"]],

        ["li.tab-item" + active("LoginPage"),
          ["a", { href: "#", onClick: this.navigateTo("LoginPage") }, "Login"]],

        ["li.tab-item",
          ["a", { href: "#", onClick: pipe(preventDefault, () => actions.logout()) },
            "Logout"]],

        ["li.tab-item" + active("DataPage"),
          ["a", { href: "#", onClick: this.navigateTo("DataPage") }, "Data"]]
      ],
      [Component, { state, actions }]
    ]);
  }
}

// -- Meiosis pattern setup code

const present = flyd.stream();
const actions = app.actions(present);
const states = flyd.scan(app.acceptor, app.initialState(), present)
  .map(app.state);
states.map(app.nap(actions));
ReactDOM.render(h([App, { states, actions }]),
  document.getElementById("app"));

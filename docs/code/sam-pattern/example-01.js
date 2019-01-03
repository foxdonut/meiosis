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

const app = {
  initialState: () => ({
    pageId: "HomePage",
    login: {
      username: "",
      password: ""
    }
  }),
  actions: update => ({
    navigateTo: pageId => update({ pageId }),
    login: user => update({ user, pageId: "HomePage" }),
    username: value => update({ login: PS({ username: value })}),
    password: value => update({ login: PS({ password: value })}),
    logout: () => update({ user: null, data: null, pageId: "HomePage" }),
    loadData: () => setTimeout(() =>
      update({ data: "The data has been loaded." }), 1500)
  })
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

const update = flyd.stream();
const actions = app.actions(update);
const states = flyd.scan(P, app.initialState(), update);
ReactDOM.render(h([App, { states, actions }]),
  document.getElementById("app"));

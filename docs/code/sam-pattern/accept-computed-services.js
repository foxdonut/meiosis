/* global React, ReactDOM, flyd, O */

// -- Utility code

const pipe = (...fns) => input =>
  fns.reduce((value, fn) => fn(value), input);

const preventDefault = evt => {
  evt.preventDefault();
  return evt;
};

// -- Application code

const prepareLogin = state => {
  if (state.pageId === "LoginPage" && !state.login) {
    return { login: { username: "", password: "" } };
  } else if (state.pageId !== "LoginPage" && state.login) {
    return { login: null };
  }
};

const checkReturnTo = state => {
  if (state.user && state.returnTo) {
    return { pageId: state.returnTo, returnTo: null };
  } else if (
    state.pageId !== "LoginPage" &&
    state.returnTo
  ) {
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
  actions: update => ({
    navigateTo: pageId => update({ pageId }),
    login: user => update({ user, pageId: "HomePage" }),
    username: value =>
      update({ login: O({ username: value }) }),
    password: value =>
      update({ login: O({ password: value }) }),
    logout: () =>
      update({
        user: null,
        data: null,
        pageId: "HomePage"
      }),
    loadData: () =>
      setTimeout(
        () => update({ data: "The data has been loaded." }),
        1500
      )
  }),
  accept: [
    state => {
      if (
        state.pageId === "SettingsPage" &&
        state.user == null
      ) {
        return {
          pageId: "LoginPage",
          returnTo: "SettingsPage"
        };
      }
    }
  ],
  computed: [prepareLogin, checkReturnTo],
  services: [
    (state, actions) => {
      if (state.pageId === "DataPage" && !state.data) {
        actions.loadData();
      }
    }
  ]
};

// -- Pages

class HomePage extends React.Component {
  render() {
    return (
      <div>
        Navigate to a page by clicking on the items above.
      </div>
    );
  }
}

class DataPage extends React.Component {
  render() {
    const { state } = this.props;
    return (
      <div>{state.data || "Loading, please wait..."}</div>
    );
  }
}

class SettingsPage extends React.Component {
  render() {
    return <div>Settings page.</div>;
  }
}

class LoginPage extends React.Component {
  render() {
    const { state } = this.props;
    return (
      <div>
        <div>Login</div>
        <form className="navbar-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="username"
              value={state.login.username}
              onChange={evt =>
                actions.username(evt.target.value)
              }
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={state.login.password}
              onChange={evt =>
                actions.password(evt.target.value)
              }
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={pipe(
              preventDefault,
              () => actions.login(state.login)
            )}
          >
            Login
          </button>
        </form>
      </div>
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
      pipe(
        preventDefault,
        () => this.props.actions.navigateTo(pageId)
      );
    this.state = this.props.states();
  }

  componentDidMount() {
    const setState = this.setState.bind(this);
    this.props.states.map(state => {
      setState(state);
    });
  }

  render() {
    const state = this.state;
    const { actions } = this.props;
    const active = pageId =>
      state.pageId === pageId ? " active" : "";
    const Component = pages[state.pageId];

    return (
      <div>
        <ul className="tab">
          <li className={"tab-item" + active("HomePage")}>
            <a
              href="#"
              onClick={this.navigateTo("HomePage")}
            >
              Home
            </a>
          </li>
          <li
            className={"tab-item" + active("SettingsPage")}
          >
            <a
              href="#"
              onClick={this.navigateTo("SettingsPage")}
            >
              Settings
            </a>
          </li>
          <li className={"tab-item" + active("LoginPage")}>
            <a
              href="#"
              onClick={this.navigateTo("LoginPage")}
            >
              Login
            </a>
          </li>
          <li className="tab-item">
            <a
              href="#"
              onClick={pipe(
                preventDefault,
                () => actions.logout()
              )}
            >
              Logout
            </a>
          </li>
          <li className={"tab-item" + active("DataPage")}>
            <a
              href="#"
              onClick={this.navigateTo("DataPage")}
            >
              Data
            </a>
          </li>
        </ul>
        <Component state={state} actions={actions} />
      </div>
    );
  }
}

// -- Meiosis pattern setup code

const update = flyd.stream();
const actions = app.actions(update);
const models = flyd.scan(O, app.initialState(), update);

const reducer = (x, f) => O(x, f(x));

const accept = models.map(state =>
  app.accept.reduce(reducer, state)
);

const computed = accept.map(state =>
  app.computed.reduce(reducer, state)
);

computed.map(state =>
  app.services.forEach(service => service(state, actions))
);

const states = flyd.stream();
computed.map(states);

ReactDOM.render(
  <App states={states} actions={actions} />,
  document.getElementById("app")
);

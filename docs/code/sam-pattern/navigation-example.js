/* global React, ReactDOM, flyd, O */

// -- Utility code

const pipe = (...fns) => input =>
  fns.reduce((value, fn) => fn(value), input);

const preventDefault = evt => {
  evt.preventDefault();
  return evt;
};

// -- Application code

const app = {
  Initial: () => ({
    pageId: "HomePage",
    login: {
      username: "",
      password: ""
    }
  }),
  Actions: update => ({
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
  })
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

class SettingsPage extends React.Component {
  render() {
    return (
      <div>
        <div>Settings page.</div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => actions.logout()}
          >
            Logout
          </button>
        </div>
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

const pages = {
  HomePage,
  LoginPage,
  SettingsPage,
  DataPage
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
          <li className={"tab-item" + active("LoginPage")}>
            <a
              href="#"
              onClick={this.navigateTo("LoginPage")}
            >
              Login
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
const actions = app.Actions(update);
const states = flyd.scan(O, app.Initial(), update);
ReactDOM.render(
  <App states={states} actions={actions} />,
  document.getElementById("app")
);

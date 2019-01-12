/* global React, ReactDOM, flyd, P, PS */

// -- Utility code

const pipe = (...fns) => input => fns.reduce((value, fn) =>
  fn(value), input);

const preventDefault = evt => {
  evt.preventDefault();
  return evt;
};

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
    username: value =>
      present({ login: PS({ username: value })}),
    password: value =>
      present({ login: PS({ password: value })}),
    logout: () =>
      present({ user: null, data: null, pageId: "HomePage" }),
    loadData: () => setTimeout(() =>
      present({ data: "The data has been loaded." }), 1500)
  }),
  acceptor: (model, proposal) => {
    if (proposal.pageId === "SettingsPage"
      && model.user == null)
    {
      return P(model,
        { pageId: "LoginPage", returnTo: "SettingsPage" });
    }
    return P(model, proposal);
  },
  state: model => [
    prepareLogin,
    checkReturnTo
  ].reduce((x, f) => P(x, f(x)), model)
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
      <div>
        {state.data || "Loading, please wait..."}
      </div>
    );
  }
}

class SettingsPage extends React.Component {
  render() {
    return (<div>Settings page.</div>);
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
            <input type="text" className="form-control"
              placeholder="username"
              value={state.login.username}
              onChange={evt =>
                actions.username(evt.target.value)}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control"
              placeholder="password"
              value={state.login.password}
              onChange={evt =>
                actions.password(evt.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary"
            onClick={pipe(preventDefault,
              () => actions.login(state.login))}>Login</button>
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
      pipe(preventDefault,
        () => this.props.actions.navigateTo(pageId));
    this.state = this.props.states();
  }

  componentDidMount() {
    const setState = this.setState.bind(this);
    this.props.states.map(state => { setState(state); });
  }

  render() {
    const state = this.state;
    const { actions } = this.props;
    const active = pageId => state.pageId === pageId
      ? " active" : "";
    const Component = pages[state.pageId];

    return (
      <div>
        <ul className="tab">
          <li className={"tab-item" + active("HomePage")}>
            <a href="#"
              onClick={this.navigateTo("HomePage")}>Home</a>
          </li>
          <li className={"tab-item" + active("SettingsPage")}>
            <a href="#"
              onClick={this.navigateTo("SettingsPage")}
            >Settings</a>
          </li>
          <li className={"tab-item" + active("LoginPage")}>
            <a href="#"
              onClick={this.navigateTo("LoginPage")}>Login</a>
          </li>
          <li className="tab-item">
            <a href="#"
              onClick={pipe(preventDefault,
                () => actions.logout())}>Logout</a>
          </li>
          <li className={"tab-item" + active("DataPage")}>
            <a href="#"
              onClick={this.navigateTo("DataPage")}>Data</a>
          </li>
        </ul>
        <Component state={state} actions={actions}/>
      </div>
    );
  }
}

// -- Meiosis pattern setup code

const present = flyd.stream();
const actions = app.actions(present);
const states = flyd.scan(app.acceptor, app.initialState(),
  present).map(app.state);
ReactDOM.render(<App states={states} actions={actions}/>,
  document.getElementById("app"));

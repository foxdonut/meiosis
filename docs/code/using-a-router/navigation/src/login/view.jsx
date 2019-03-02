import React, { Component } from "react";

import { get, pipe, preventDefault } from "routing-common/src/util";

export class Login extends Component {
  render() {
    const { state, actions, routeIndex } = this.props;
    const message = get(state, ["routeCurrent", routeIndex, "value", "message"]);
    return (
      <div>
        {message ? <div>{message}</div> : null}
        <div>Login</div>
        <form className="form">
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
              () => actions.login(state.login.username))}>Login</button>
        </form>
      </div>
    );
  }
}

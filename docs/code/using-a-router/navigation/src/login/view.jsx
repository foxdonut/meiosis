import React, { Component } from "react";

import { login } from "routing-common/src/login";
import { pipe, preventDefault } from "routing-common/src/util";

export class Login extends Component {
  render() {
    const { state, update, route } = this.props;
    const { message, returnTo } = route.local.params;

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
                update(login.actions.username(evt.target.value))}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control"
              placeholder="password"
              value={state.login.password}
              onChange={evt =>
                update(login.actions.password(evt.target.value))}/>
          </div>
          <button type="submit" className="btn btn-primary"
            onClick={pipe(preventDefault,
              () => update(login.actions.login(state.login.username, returnTo))
            )}>Login</button>
        </form>
      </div>
    );
  }
}

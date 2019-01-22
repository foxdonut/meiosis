import React, { Component } from "react";
import { PS } from "patchinko/explicit";

import { get, pipe, preventDefault } from "../util";

export const login = {
  actions: ({ update }) => ({
    username: value =>
      update({ login: PS({ username: value })}),
    password: value =>
      update({ login: PS({ password: value })})
  }),
  service: ({ state, update, updateState }) => {
    if (get(state, ["navigateTo", "id"]) === "Login") {
      // Navigating to Login
      update({
        login: PS({
          username: "",
          password: ""
        })
      });
    }
    else if (get(state, ["navigateAway", "id"]) === "Login") {
      // Leaving Login
      updateState({
        login: PS({
          message: null
        })
      });
    }
  }
};

export class Login extends Component {
  render() {
    const { state, actions } = this.props;
    return (
      <div>
        {state.login.message ? <div>{state.login.message}</div> : null}
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
              () => actions.login(state.login))}>Login</button>
        </form>
      </div>
    );
  }
}

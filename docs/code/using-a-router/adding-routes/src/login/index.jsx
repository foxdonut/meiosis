import React, { Component } from "react";
import { PS } from "patchinko/explicit";

import { onChange, get, pipe, preventDefault } from "../util";
import { navigateTo } from "../util/router";

export const login = {
  actions: update => ({
    username: value =>
      update({ login: PS({ username: value })}),

    password: value =>
      update({ login: PS({ password: value })}),

    login: username =>
      update(Object.assign({ user: username }, navigateTo("Home")))
  }),

  computed: state => ({
    usernameLength: (get(state, ["login", "username"]) || "").length
  }),

  service: (states, update) => {
    onChange(states, ["route", "request"], state => {
      if (state.route.request.id === "Login") {
        // Navigating to Login
        update({
          route: PS({ next: state.route.request }),
          login: PS({
            username: "",
            password: ""
          })
        });
      }
    });
    onChange(states, ["route", "previous"], state => {
      if (state.route.previous.id === "Login") {
        // Leaving Login
        update({
          login: PS({
            message: null
          })
        });
      }
    });
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
              () => actions.login(state.login.username))}>Login</button>
        </form>
      </div>
    );
  }
}

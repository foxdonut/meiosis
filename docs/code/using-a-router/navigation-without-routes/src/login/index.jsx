import React, { Component } from "react";
import { PS } from "patchinko/explicit";

import { NavigateTo, fold, pipe, preventDefault } from "../util";

export const login = {
  actions: ({ update }) => ({
    username: value =>
      update({ login: PS({ username: value })}),
    password: value =>
      update({ login: PS({ password: value })})
  }),
  // leave
  /*
  service: () => ({
    message: null
  })
  */
  service: ({ state, update }) => {
    NavigateTo.map(navigateTo =>
      fold({
        Login: () => update({
          route: navigateTo,
          navigateTo: NavigateTo.N(),
          login: PS({
            username: "",
            password: ""
          })
        })
      })(navigateTo)
    )(state.navigateTo);
  }
};

export class Login extends Component {
  render() {
    const { state, actions } = this.props;
    return (
      <div>
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

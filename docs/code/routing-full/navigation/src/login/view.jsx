import React from "react";

export const Login = ({ state, actions, routing }) => {
  const { message, returnTo } = routing.localSegment.params;

  return (
    <div>
      {message ? <div>{message}</div> : null}
      <div>Login</div>
      <form className="form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="username"
            value={state.login.username}
            onChange={evt => actions.username(evt.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={state.login.password}
            onChange={evt => actions.password(evt.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => actions.login(state.login.username, returnTo)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

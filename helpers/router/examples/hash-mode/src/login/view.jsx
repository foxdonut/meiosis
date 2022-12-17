/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from 'preact';

import { actions } from './actions';

export const Login = ({ cell }) => (
  <>
    <h4>Login Page</h4>
    {cell.state.login.message && <div>{cell.state.login.message}</div>}
    <form class="form" style="width: 400px">
      <div class="form-group mt-3 mb-2">
        <input class="form-control"
          type="text"
          placeholder="username"
          value={cell.state.login.username}
          onInput={(evt) => actions.username(cell, evt.currentTarget.value)}
        />
      </div>
      <div class="form-group mb-3">
        <input class="form-control"
          type="password"
          placeholder="password"
          value={cell.state.login.password}
          onInput={(evt) => actions.password(cell, evt.currentTarget.value)}
        />
      </div>
      <button class="btn btn-primary"
        type="button"
        onClick={() => actions.login(cell)}>
        Login
      </button>
    </form>
  </>
);

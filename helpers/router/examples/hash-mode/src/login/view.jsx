export const Login = {
  view: ({ attrs: { state, actions } }) => (
    <>
      <h3>Login Page</h3>
      {state.login.message && <div>{state.login.message}</div>},
      <form class="form">
        <div class="form-group">
          <input class="form-control"
            type="text"
            placeholder="username"
            value={state.login.username}
            onInput={(evt) => actions.login.username(evt.currentTarget.value)}
          />
        </div>
        <div class="form-group">
          <input class="form-control"
            type="password"
            placeholder="password"
            value={state.login.password}
            onInput={(evt) => actions.login.password(evt.currentTarget.value)}
          />
        </div>
        <button class="btn btn-primary"
          type="button"
          onClick={() =>
            actions.login.login(
              state.login.username,
              state.login.returnTo
            )
          }>Login</button>
      </form>
    </>
  )
};

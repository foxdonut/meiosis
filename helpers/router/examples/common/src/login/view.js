import m from "mithril";

export const Login = {
  view: ({ attrs: { state, actions } }) => [
    m("h3", "Login Page"),
    state.login.message && m("div", state.login.message),
    m(
      "form.form",
      m(
        "div.form-group",
        m("input.form-control", {
          type: "text",
          placeholder: "username",
          value: state.login.username,
          oninput: (evt) =>
            actions.login.username(evt.target.value)
        })
      ),
      m(
        "div.form-group",
        m("input.form-control", {
          type: "password",
          placeholder: "password",
          value: state.login.password,
          oninput: (evt) =>
            actions.login.password(evt.target.value)
        })
      ),
      m(
        "button.btn.btn-primary",
        {
          type: "button",
          onclick: () =>
            actions.login.login(
              state.login.username,
              state.login.returnTo
            )
        },
        "Login"
      )
    )
  ]
};

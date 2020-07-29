import m from "mithril";

export const Login = {
  view: ({ attrs: { state, actions } }) =>
    m(
      "div",
      m("h3", "Login Page"),
      state.login.message ? m("div", state.login.message) : null,
      m(
        "form.form",
        m(
          "div.form-group",
          m("input.form-control", {
            type: "text",
            placeholder: "username",
            value: state.login.username,
            oninput: evt => actions.username(evt.target.value)
          })
        ),
        m(
          "div.form-group",
          m("input.form-control", {
            type: "password",
            placeholder: "password",
            value: state.login.password,
            oninput: evt => actions.password(evt.target.value)
          })
        ),
        m(
          "button.btn.btn-primary",
          {
            type: "button",
            onclick: () => actions.login(state.login.username, state.login.returnTo)
          },
          "Login"
        )
      )
    )
};

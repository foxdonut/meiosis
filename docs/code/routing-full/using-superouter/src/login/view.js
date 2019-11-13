import m from "mithril";

export const Login = {
  view: ({ attrs: { state, actions, params } }) =>
    m(
      "div",
      params.message ? m("div", params.message) : null,
      m("div", "Login"),
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
            onclick: () => actions.login(state.login.username, params.returnTo)
          },
          "Login"
        )
      )
    )
};

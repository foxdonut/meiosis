import m from "mithril";

export const Login = {
  view: ({ attrs: { state, actions, routing } }) => {
    const { message, returnTo } = routing.localSegment.params;

    return m(
      "div",
      message ? m("div", message) : null,
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
            onclick: () => actions.login(state.login.username, returnTo)
          },
          "Login"
        )
      )
    );
  }
};

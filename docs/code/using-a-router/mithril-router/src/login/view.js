import m from "mithril";

import { pipe, preventDefault } from "routing-common/src/util";

export const Login = {
  view: ({ attrs: { state, actions, route } }) => {
    const { message, returnTo } = route.local.params;

    return m("div",
      (message ? m("div", message) : null),
      m("div", "Login"),
      m("form.form",
        m("div.form-group",
          m("input.form-control", {
            type: "text",
            placeholder: "username",
            value: state.login.username,
            oninput: evt =>
              actions.username(evt.target.value)
          })
        ),
        m("div.form-group",
          m("input.form-control", {
            type: "password",
            placeholder: "password",
            value: state.login.password,
            oninput: evt =>
              actions.password(evt.target.value)
          })
        ),
        m("button.btn.btn-primary", {
          type: "submit",
          onclick: pipe(preventDefault,
            () => actions.login(state.login.username, returnTo))
        }, "Login")
      )
    );
  }
};

import m from "mithril";

import { login } from "routing-common/src/login";
import { pipe, preventDefault } from "routing-common/src/util";

export const Login = {
  view: ({ attrs: { state, update, route } }) => {
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
              update(login.actions.username(evt.target.value))
          })
        ),
        m("div.form-group",
          m("input.form-control", {
            type: "password",
            placeholder: "password",
            value: state.login.password,
            oninput: evt =>
              update(login.actions.password(evt.target.value))
          })
        ),
        m("button.btn.btn-primary", {
          type: "submit",
          onclick: pipe(preventDefault,
            () => update(login.actions.login(state.login.username, returnTo))
          )
        }, "Login")
      )
    );
  }
};

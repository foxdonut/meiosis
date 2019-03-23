import m from "mithril";

import { pipe, preventDefault } from "routing-common/src/util";

export const Login = {
  view: ({ attrs: { state, actions } }) => {
    const message = state.route.value.message;
    return m("div",
      (message ? m("div", message) : null),
      m("div", "Login"),
      m("form.form",
        m("div.form-group",
          m("input.form-control", {
            type: "text",
            placeholder: "username",
            value: state.login.username,
            onchange: evt =>
              actions.username(evt.target.value)
          })
        ),
        m("div.form-group",
          m("input.form-control", {
            type: "password",
            placeholder: "password",
            value: state.login.password,
            onchange: evt =>
              actions.password(evt.target.value)
          })
        ),
        m("button.btn.btn-primary", {
          type: "submit",
          onclick: pipe(preventDefault,
            () => actions.login(state.login.username))
        }, "Login")
      )
    );
  }
};

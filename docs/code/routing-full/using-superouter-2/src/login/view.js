export const Login = ({ state, actions }) => [
  "div",
  state.login.message ? ["div", state.login.message] : null,
  ["div", "Login"],
  [
    "form.form",
    [
      "div.form-group",
      [
        "input.form-control",
        {
          type: "text",
          placeholder: "username",
          value: state.login.username,
          onInput: evt => actions.username(evt.target.value)
        }
      ]
    ],
    [
      "div.form-group",
      [
        "input.form-control",
        {
          type: "password",
          placeholder: "password",
          value: state.login.password,
          onInput: evt => actions.password(evt.target.value)
        }
      ]
    ],
    [
      "button.btn.btn-primary",
      {
        type: "button",
        onClick: () => actions.login(state.login.username, state.login.returnTo)
      },
      "Login"
    ]
  ]
];

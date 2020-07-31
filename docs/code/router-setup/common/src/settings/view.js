import m from "mithril";

export const Settings = {
  view: ({ attrs: { actions } }) => [
    m("h3", "Settings Page"),
    m("button.btn.btn-danger", { onclick: () => actions.logout() }, "Logout")
  ]
};

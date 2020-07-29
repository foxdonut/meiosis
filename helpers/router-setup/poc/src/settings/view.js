import m from "mithril";

export const Settings = {
  view: ({ attrs: { actions } }) =>
    m(
      "div",
      m("h3", "Settings Page"),
      m("button.btn.btn-danger", { onclick: () => actions.logout() }, "Logout")
    )
};

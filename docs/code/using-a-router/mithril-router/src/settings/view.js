import m from "mithril";

import { settings } from "routing-common/src/settings";

export const Settings = {
  view: ({ attrs: { update } }) => (
    m("div",
      m("div", "Settings Page"),
      m("button.btn.btn-danger",
        { onclick: () => update(settings.actions.logout()) },
        "Logout")
    )
  )
};

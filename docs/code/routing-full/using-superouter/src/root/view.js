import m from "mithril";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Tea } from "../tea";
import { Route } from "../router";

const componentMap = Route.fold({
  Home: () => Home,
  Login: () => Login,
  Settings: () => Settings,
  Tea: () => Tea,
  TeaDetails: () => Tea
});

export const Root = {
  view: ({ attrs: { state, actions } }) => {
    const Component = componentMap(state.route);
    const isActive = tab => (tab === Component ? ".active" : "");

    return m(
      "div",
      m(
        "nav.navbar.navbar-default",
        m(
          "ul.nav.navbar-nav",
          m("li" + isActive(Home), m("a", { href: "#/" }, "Home")),
          m("li" + isActive(Login), m("a", { href: "#/login" }, "Login")),
          m("li" + isActive(Settings), m("a", { href: "#/settings" }, "Settings")),
          m("li" + isActive(Tea), m("a", { href: "#/tea" }, "Tea"))
        )
      ),
      m(Component, { state, actions }),

      /* Show or hide the Please Wait modal. See public/css/style.css */
      m(
        "div",
        {
          style: {
            visibility: state.loadTeas ? "visible" : "hidden"
          }
        },
        m("div.simpleModal", m("div.simpleBox", m("div", "Loading, please wait...")))
      )
    );
  }
};

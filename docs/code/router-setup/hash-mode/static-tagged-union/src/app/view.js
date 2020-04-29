import m from "mithril";
import { foldStrict } from "static-tagged-union";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Tea } from "../tea";
import { TeaSearch } from "../teaSearch";
import { Route, router } from "../router";

const componentMap = foldStrict({
  Home: () => Home,
  Login: () => Login,
  Settings: () => Settings,
  Tea: () => Tea,
  TeaDetails: () => Tea,
  TeaSearch: () => TeaSearch
});

export const App = {
  view: ({ attrs: { state, actions } }) => {
    const Component = componentMap(state.route);
    const isActive = tab => (tab === Component ? ".active" : "");

    return m(
      "div",
      m(
        "nav.navbar.navbar-default",
        m(
          "ul.nav.navbar-nav",
          m("li" + isActive(Home), m("a", { href: router.toPath(Route.Home()) }, "Home")),
          m("li" + isActive(Login), m("a", { href: router.toPath(Route.Login()) }, "Login")),
          m(
            "li" + isActive(Settings),
            m("a", { href: router.toPath(Route.Settings()) }, "Settings")
          ),
          m("li" + isActive(Tea), m("a", { href: router.toPath(Route.Tea()) }, "Tea")),
          m(
            "li" + isActive(TeaSearch),
            m("a", { href: router.toPath(Route.TeaSearch()) }, "Tea Search")
          )
        )
      ),
      m(Component, { state, actions }),

      /* Show or hide the Please Wait modal. See public/css/style.css */
      m(
        "div",
        {
          style: {
            visibility: state.loadTeas || state.loadSearchTeas ? "visible" : "hidden"
          }
        },
        m("div.simpleModal", m("div.simpleBox", m("div", "Loading, please wait...")))
      )
    );
  }
};

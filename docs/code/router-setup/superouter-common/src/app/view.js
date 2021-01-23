import m from "mithril";

import { Home } from "router-setup-common/src/home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Tea } from "../tea";
import { TeaSearch } from "../teaSearch";
import { NotFound } from "router-setup-common/src/notFound";
import { Route } from "superouter-common/src/router";

const componentMap = Route.fold({
  Home: () => Home,
  Login: () => Login,
  Settings: () => Settings,
  Tea: () => Tea,
  TeaDetails: () => Tea,
  TeaSearch: () => TeaSearch,
  NotFound: () => NotFound
});

export const App = {
  view: ({ attrs: { state, actions, router } }) => {
    const Component = componentMap(state.route.page);
    const isActive = tab => (tab === Component ? ".active" : "");

    return m(
      "div",
      m(
        "nav.navbar.navbar-default",
        m(
          "ul.nav.navbar-nav",
          m("li" + isActive(Home), m("a", { href: router.toUrl(Route.of.Home()) }, "Home")),
          m("li" + isActive(Login), m("a", { href: router.toUrl(Route.of.Login()) }, "Login")),
          m(
            "li" + isActive(Settings),
            m("a", { href: router.toUrl(Route.of.Settings()) }, "Settings")
          ),
          m("li" + isActive(Tea), m("a", { href: router.toUrl(Route.of.Tea()) }, "Tea")),
          m(
            "li" + isActive(TeaSearch),
            m("a", { href: router.toUrl(Route.of.TeaSearch()) }, "Tea Search")
          )
        )
      ),
      m(Component, { state, actions, router })
    );
  }
};

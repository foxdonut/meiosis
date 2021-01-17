import m from "mithril";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Tea } from "../tea";
import { TeaSearch } from "../teaSearch";
import { NotFound } from "../notFound";
import { Route } from "../router";

const componentMap = {
  Home,
  Login,
  Settings,
  Tea,
  TeaDetails: Tea,
  TeaSearch,
  NotFound
};

export const App = {
  view: ({ attrs: { state, update, actions, router } }) => {
    const Component = componentMap[state.route.page];
    const isActive = tab => (tab === Component ? ".active" : "");

    return m(
      "div",
      m(
        "nav.navbar.navbar-default",
        m(
          "ul.nav.navbar-nav",
          m("li" + isActive(Home), m("a", { href: router.toUrl(Route.Home) }, "Home")),
          m("li" + isActive(Login), m("a", { href: router.toUrl(Route.Login) }, "Login")),
          m("li" + isActive(Settings), m("a", { href: router.toUrl(Route.Settings) }, "Settings")),
          m("li" + isActive(Tea), m("a", { href: router.toUrl(Route.Tea) }, "Tea")),
          m(
            "li" + isActive(TeaSearch),
            m("a", { href: router.toUrl(Route.TeaSearch) }, "Tea Search")
          )
        )
      ),
      m(Component, { state, update, actions, router })
    );
  }
};

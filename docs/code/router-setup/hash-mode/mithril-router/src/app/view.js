import m from "mithril";

import { Home } from "router-setup-common/src/home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Tea } from "../tea/view";
import { TeaSearch } from "../teaSearch/view";
import { NotFound } from "router-setup-common/src/notFound";
import { Route, router } from "../router";
import { selectors } from "../state";

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
  view: ({ attrs: { state, update, actions } }) => {
    const Component = componentMap[selectors.page(state)];
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
      m(Component, { state, update, actions }),

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

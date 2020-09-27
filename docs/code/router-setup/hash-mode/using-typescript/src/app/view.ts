import m from "mithril";

import { Router } from "meiosis-router-setup";

import { Home } from "../home";
import { Login } from "router-setup-common/src/login/index-route";
import { Settings } from "router-setup-common/src/settings/index-route";
import { Tea } from "../tea";
import { TeaSearch } from "../teaSearch";
import { NotFound } from "router-setup-common/src/notFound";
import { selectors } from "router-setup-common/src/selectors";
import { Route } from "router-setup-common/src/router";

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
  view: (vnode: m.Vnode<m.Attributes, any>): any => {
    const { attrs } = vnode;
    const { state, update, actions } = attrs;
    const router: Router = attrs.router;
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
      m(Component, { state, update, actions, router }),

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
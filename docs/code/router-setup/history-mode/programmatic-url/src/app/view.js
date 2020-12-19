import m from "mithril";

import { Home } from "router-setup-common/src/home";
import { Login } from "router-setup-common/src/login/index-route";
import { Settings } from "router-setup-common/src/settings/index-route";
import { Tea } from "../tea/view";
import { TeaSearch } from "../teaSearch/view";
import { NotFound } from "router-setup-common/src/notFound";
import { Route } from "router-setup-common/src/router";
import { getLinkAttrs } from "../router/link";
import { selectors } from "router-setup-common/src/selectors";

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
    const Component = componentMap[selectors.page(state)];
    const isActive = tab => (tab === Component ? ".active" : "");

    return m(
      "div",
      m(
        "nav.navbar.navbar-default",
        m(
          "ul.nav.navbar-nav",
          m("li" + isActive(Home), m("a", getLinkAttrs(router, Route.Home), "Home")),
          m("li" + isActive(Login), m("a", getLinkAttrs(router, Route.Login), "Login")),
          m("li" + isActive(Settings), m("a", getLinkAttrs(router, Route.Settings), "Settings")),
          m("li" + isActive(Tea), m("a", getLinkAttrs(router, Route.Tea), "Tea")),
          m("li" + isActive(TeaSearch), m("a", getLinkAttrs(router, Route.TeaSearch), "Tea Search"))
        )
      ),
      m(Component, { state, update, actions, router }),

      /* Show or hide the Please Wait modal. See public/css/style.css */
      m(
        "div",
        {
          style: {
            visibility: state.loading ? "visible" : "hidden"
          }
        },
        m("div.simpleModal", m("div.simpleBox", m("div", "Loading, please wait...")))
      )
    );
  }
};

import m from "mithril";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Tea } from "../tea";
import { TeaSearch } from "../teaSearch";
import { NotFound } from "../notFound";
import { Route } from "../router";
import { Link } from "../router/link";

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
  view: ({ attrs: { state, actions } }) => {
    const Component = componentMap[state.route.page];
    const isActive = tab => (tab === Component ? ".active" : "");

    return m(
      "div",
      m(
        "nav.navbar.navbar-default",
        m(
          "ul.nav.navbar-nav",
          m("li" + isActive(Home), m(Link, { page: Route.Home }, "Home")),
          m("li" + isActive(Login), m(Link, { page: Route.Login }, "Login")),
          m("li" + isActive(Settings), m(Link, { page: Route.Settings }, "Settings")),
          m("li" + isActive(Tea), m(Link, { page: Route.Tea }, "Tea")),
          m("li" + isActive(TeaSearch), m(Link, { page: Route.TeaSearch }, "Tea Search"))
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

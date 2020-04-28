import m from "mithril";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Tea } from "../tea";
import { NotFound } from "../notFound";
import { Route, router } from "../router";

const componentMap = {
  Home,
  Login,
  Settings,
  Tea,
  TeaDetails: Tea,
  NotFound
};

export const Root = {
  view: ({ attrs: { state, actions } }) => {
    const Component = componentMap[state.route.page];
    const isActive = tab => (tab === Component ? ".active" : "");

    return m(
      "div",
      m(
        "nav.navbar.navbar-default",
        m(
          "ul.nav.navbar-nav",
          m("li" + isActive(Home), m("a", { href: router.toPath(Route.Home) }, "Home")),
          m("li" + isActive(Login), m("a", { href: router.toPath(Route.Login) }, "Login")),
          m("li" + isActive(Settings), m("a", { href: router.toPath(Route.Settings) }, "Settings")),
          m("li" + isActive(Tea), m("a", { href: router.toPath(Route.Tea) }, "Tea"))
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

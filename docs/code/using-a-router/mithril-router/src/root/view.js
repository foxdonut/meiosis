import m from "mithril";
import { fold } from "static-tagged-union";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Tea } from "../tea";
import { Coffee } from "../coffee";
import { Beer } from "../beer";

import { Route, initRoute } from "routing-common/src/root";
import { toPath, LocationBarSync } from "../util/router";

const componentMap = fold({
  Loading: () => ({ view: () => m("div", "Loading, please wait...") }),
  Home: () => Home,
  Login: () => Login,
  Settings: () => Settings,
  Tea: () => Tea,
  Coffee: () => Coffee,
  Beer: () => Beer,
  Invalid: () => ({ view: () => m("div", "Oops, page not found.") })
});

export const Root = {
  view: ({ attrs: { state, actions }}) => {
    const route = initRoute(state.route);
    const Component = componentMap(route.local);
    const isActive = tab => tab === Component ? ".active" : "";
    return (
      m("div",
        m("nav.navbar.navbar-default",
          m("ul.nav.navbar-nav",
            m("li" + isActive(Home),
              m("a", { href: toPath([ Route.Home() ]) }, "Home")
            ),
            m("li" + isActive(Login),
              m("a", { href: toPath([ Route.Login() ]) }, "Login")
            ),
            m("li" + isActive(Settings),
              m("a", { href: toPath([ Route.Settings() ]) }, "Settings")
            ),
            m("li" + isActive(Tea),
              m("a", { href: toPath([ Route.Tea() ]) }, "Tea")
            ),
            m("li" + isActive(Coffee),
              m("a", { href: toPath([ Route.Coffee(), Route.Beverages() ]) }, "Coffee")
            ),
            m("li" + isActive(Beer),
              m("a", { href: toPath([ Route.Beer(), Route.Beverages() ]) }, "Beer")
            )
          )
        ),
        m(Component, { state, actions, route }),
        m(LocationBarSync, { state }),
        /* Show or hide the Please Wait modal. See public/css/style.css */
        m("div", { style: { visibility: state.pleaseWait ? "visible" : "hidden" } },
          m("div.modal",
            m("div.box",
              m("div", "Loading, please wait...")
            )
          )
        )
      )
    );
  }
};

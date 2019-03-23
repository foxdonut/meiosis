import m from "mithril";
import { fold } from "static-tagged-union";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Tea } from "../tea";
import { Coffee } from "../coffee";
import { Beer } from "../beer";

const componentMap = fold({
  Loading: () => () => m("div", "Loading, please wait..."),
  Home: () => Home,
  Login: () => Login,
  Settings: () => Settings,
  Tea: () => Tea,
  Coffee: () => Coffee,
  Beer: () => Beer
});

export const Root = {
  view: ({ attrs: { state, actions }}) => {
    const route = state.route;
    const Component = componentMap(route);
    const isActive = tab => tab === Component ? ".active" : "";

    return (
      m("div",
        m("nav.navbar.navbar-default",
          m("ul.nav.navbar-nav",
            m("li" + isActive(Home),
              m("a", { href: "/", oncreate: m.route.link }, "Home")
            ),
            m("li" + isActive(Login),
              m("a", { href: "/login", oncreate: m.route.link }, "Login")
            ),
            m("li" + isActive(Settings),
              m("a", { href: "/settings", oncreate: m.route.link }, "Settings")
            ),
            m("li" + isActive(Tea),
              m("a", { href: "/tea", oncreate: m.route.link }, "Tea")
            ),
            m("li" + isActive(Coffee),
              m("a", { href: "/coffee", oncreate: m.route.link }, "Coffee")
            ),
            m("li" + isActive(Beer),
              m("a", { href: "/beer", oncreate: m.route.link }, "Beer")
            )
          )
        ),
        m(Component, { state, actions, route }),
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

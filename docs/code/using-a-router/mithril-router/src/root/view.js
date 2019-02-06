import m from "mithril";

import { toPath } from "../util/router";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Coffee } from "../coffee";
import { Beer } from "../beer";

const componentMap = {
  Home,
  Login,
  Settings,
  Coffee,
  CoffeeDetails: Coffee,
  Beer,
  BeerDetails: Beer,
  BeerBrewer: Beer
};

export const Root = {
  view: ({ attrs: { state, actions }}) => {
    const componentId = state.route.current.id;
    const Component = componentMap[componentId];
    const isActive = tab => tab === Component ? ".active" : "";

    return (
      m("div",
        m("nav.navbar.navbar-default",
          m("ul.nav.navbar-nav",
            m("li" + isActive(Home),
              m("a", { href: toPath({ id: "Home" }) }, "Home")
            ),
            m("li" + isActive(Login),
              m("a", { href: toPath({ id: "Login" }) }, "Login")
            ),
            m("li" + isActive(Settings),
              m("a", { href: toPath({ id: "Settings" }) }, "Settings")
            ),
            m("li" + isActive(Coffee),
              m("a", { href: toPath({ id: "Coffee" }) }, "Coffee")
            ),
            m("li" + isActive(Beer),
              m("a", { href: toPath({ id: "Beer" }) }, "Beer")
            )
          )
        ),
        Component && m(Component, { state, actions }),
        /* Show or hide the Please Wait modal. See public/css/style.css */
        m("div", { style: { visibility: state.pleaseWait ? "visible" : "hidden" } },
          m("div.modal",
            m("div.box",
              m("p", "Loading, please wait...")
            )
          )
        )
      )
    );
  }
};

import m from "mithril";
import { K, T } from "ducklings";
import { fold } from "static-tagged-union";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Tea } from "../tea";
import { Coffee } from "../coffee";
import { Beer } from "../beer";
import { Route } from "../routes";
import { router } from "../router";

const componentMap = fold({
  Home: K(Home),
  Login: K(Login),
  Settings: K(Settings),
  Tea: K(Tea),
  TeaDetails: K(Tea),
  Coffee: K(Coffee),
  CoffeeBeverage: K(Coffee),
  CoffeeBrewer: K(Coffee),
  Beer: K(Beer),
  BeerBeverage: K(Beer),
  BeerBrewer: K(Beer)
});

export const Root = {
  view: ({ attrs: { state, actions } }) => {
    const Component = componentMap(state.route);
    const isActive = tab => (tab === Component ? ".active" : "");

    return m(
      "div",
      m(
        "nav.navbar.navbar-default",
        m(
          "ul.nav.navbar-nav",
          m("li" + isActive(Home), m("a", { href: router.toPath(Route.Home()) }, "Home")),
          m("li" + isActive(Login), m("a", { href: router.toPath(Route.Login()) }, "Login")),
          m(
            "li" + isActive(Settings),
            m("a", { href: router.toPath(Route.Settings()) }, "Settings")
          ),
          m("li" + isActive(Tea), m("a", { href: router.toPath(Route.Tea()) }, "Tea")),
          m("li" + isActive(Coffee), m("a", { href: router.toPath(Route.Coffee()) }, "Coffee")),
          m("li" + isActive(Beer), m("a", { href: router.toPath(Route.Beer()) }, "Beer"))
        )
      ),
      m(Component, { state, actions }),
      /* Show or hide the Please Wait modal. See public/css/style.css */
      m(
        "div",
        {
          style: {
            visibility: T(state.beverages)(
              fold({
                Loading: K("visible"),
                _: K("hidden")
              })
            )
          }
        },
        m("div.simpleModal", m("div.simpleBox", m("div", "Loading, please wait...")))
      )
    );
  }
};

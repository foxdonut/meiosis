import m from "mithril";
import { K } from "ducklings";
import { fold } from "static-tagged-union";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Tea } from "../tea";
/*
import { Coffee } from "../coffee";
import { Beer } from "../beer";
import { Data } from "../util";
*/
import { Route } from "../routes";
import { router } from "../router";

const componentMap = fold({
  Home: K(Home),
  Login: K(Login),
  Settings: K(Settings),
  Tea: K(Tea),
  TeaDetails: K(Tea)
  /*,
  Coffee: K(Coffee),
  CoffeeDetails: K(Coffee),
  CoffeeBrewer: K(Coffee),
  Beer: K(Beer),
  BeerDetails: K(Beer),
  BeerBrewer: K(Beer)*/
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
          m("li" + isActive(Tea), m("a", { href: router.toPath(Route.Tea()) }, "Tea"))
          /*
          m("li" + isActive(Coffee), m("a", { href: router.toPath(Route.of.Coffee()) }, "Coffee")),
          m("li" + isActive(Beer), m("a", { href: router.toPath(Route.of.Beer()) }, "Beer"))
          */
        )
      ),
      m(Component, { state, actions }) //,
      /* Show or hide the Please Wait modal. See public/css/style.css */
      /*
      m(
        "div",
        {
          style: { visibility: run(state.beverages, Data.getLoadingWith("hidden", K("visible"))) }
        },
        m("div.simpleModal", m("div.simpleBox", m("div", "Loading, please wait...")))
      )
      */
    );
  }
};

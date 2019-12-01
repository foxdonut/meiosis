import { run } from "stags";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Tea } from "../tea";
import { Coffee } from "../coffee";
import { Beer } from "../beer";
import { Route } from "../routes";
import { router } from "../router";
import { Data, K } from "../util";

const componentMap = Route.fold({
  Home: K(Home),
  Login: K(Login),
  Settings: K(Settings),
  Tea: K(Tea),
  TeaDetails: K(Tea),
  Coffee: K(Coffee),
  CoffeeDetails: K(Coffee),
  CoffeeBrewer: K(Coffee),
  Beer: K(Beer),
  BeerDetails: K(Beer),
  BeerBrewer: K(Beer)
});

export const Root = ({ state, actions }) => {
  const Component = componentMap(state.route);
  const isActive = tab => (tab === Component ? ".active" : "");

  return [
    "div",
    [
      "nav.navbar.navbar-default",
      [
        "ul.nav.navbar-nav",
        ["li" + isActive(Home), ["a", { href: router.toPath(Route.of.Home()) }, "Home"]],
        ["li" + isActive(Login), ["a", { href: router.toPath(Route.of.Login()) }, "Login"]],
        [
          "li" + isActive(Settings),
          ["a", { href: router.toPath(Route.of.Settings()) }, "Settings"]
        ],
        ["li" + isActive(Tea), ["a", { href: router.toPath(Route.of.Tea()) }, "Tea"]],
        ["li" + isActive(Coffee), ["a", { href: router.toPath(Route.of.Coffee()) }, "Coffee"]],
        ["li" + isActive(Beer), ["a", { href: router.toPath(Route.of.Beer()) }, "Beer"]]
      ]
    ],
    Component({ state, actions }),
    /* Show or hide the Please Wait modal. See public/css/style.css */
    [
      "div",
      {
        style: { visibility: run(state.beverages, Data.getLoadingWith("hidden", K("visible"))) }
      },
      ["div.simpleModal", ["div.simpleBox", ["div", "Loading, please wait..."]]]
    ]
  ];
};

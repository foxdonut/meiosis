import { maybe, tagged } from "stags";

import { onChange } from "../util";

export const Route = tagged("Route")({
  Loading: [],
  Transition: ["from", "to"],
  Home: [],
  Login: [],
  Settings: [],
  Tea: ["details"],  // TeaDetailsPage
  Coffee: ["child"], // BeveragePage
  Beer: ["child"]    // BeveragePage
});

export const Loaded = maybe("Loaded");

export const TeaDetailsPage = maybe("TeaDetailsPage");

export const BeveragePage = tagged("BeveragePage")({
  Beverages: [],
  Beverage: ["id", "brewer"]
});

export const Brewer = maybe("Brewer");

export const root = {
  actions: update => ({
    navigateTo: route => update({
      routeNext: route
    })
  }),

  service: (states, update) => {
    onChange(states, ["routeNext"], state => {
      update({ routeCurrent: Route.Transition({
        from: state.routeCurrent,
        to: state.routeNext
      })});
    });
  }
};

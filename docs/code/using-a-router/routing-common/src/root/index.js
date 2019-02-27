import { maybe, tagged } from "stags";

export const Route = tagged("Route")({
  Loading: [],
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
      routeCurrent: route
    })
  })
};

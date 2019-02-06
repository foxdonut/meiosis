import { PS } from "patchinko/explicit";

import { createRouter } from "./basic-router";

const routeMap = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Coffee: "/coffee",
  CoffeeDetails: "/coffee/:id",
  Beer: "/beer",
  BeerDetails: "/beer/:id",
  BeerBrewer: "/beer/:id/brewer"
};

const router = createRouter({ routeMap, prefix: "#" });

// converts the path to { id, values }
export const parsePath = router.parsePath;

// converts { id, values } to path
export const toPath = router.toPath;

export const getPath = () => document.location.hash;
export const setPath = path => window.history.pushState({}, "", path);

export const navigateTo = id => ({ route: PS({ request: { id } }) });

// Keeps the location bar in sync
export const LocationBarSync = ({ state }) => {
  if (state.route.id) {
    const path = toPath(state.route);
    if (getPath() !== path) {
      setPath(path);
    }
  }
  return null;
};

// Listens to route changes and triggers updates
export const listenToRouteChanges = update => {
  window.onpopstate = () => update({ route: PS({ request: parsePath(getPath()) }) });
};

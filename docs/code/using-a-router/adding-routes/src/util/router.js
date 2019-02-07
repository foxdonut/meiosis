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

const getPath = () => document.location.hash;
const setPath = path => window.history.pushState({}, "", path);

// converts the path to { id, values }
const parsePath = () => router.parsePath(getPath());

// converts { id, values } to path
export const toPath = router.toPath;

// Keeps the location bar in sync
export const LocationBarSync = ({ state }) => {
  if (state.routeCurrent.id) {
    const path = toPath(state.routeCurrent);
    if (getPath() !== path) {
      setPath(path);
    }
  }
  return null;
};

// Listens to route changes and triggers updates
export const listenToRouteChanges = update => {
  const emitRouteUpdate = () => update({ routeRequest: parsePath() });
  window.onpopstate = emitRouteUpdate;
  // Parse initial route
  emitRouteUpdate();
};

import { createRouter } from "./basic-router";

const routeMap = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Coffee: "/coffee",
  Beer: "/beer"
};

const router = createRouter({ routeMap, prefix: "#" });

// converts the path to { id, values }
export const parsePath = router.parsePath;

// converts { id, values } to path
export const toPath = router.toPath;

export const getPath = () => document.location.hash;
export const setPath = path => window.history.pushState({}, "", path);

// Keeps the location bar in sync
export const LocationBarSync = ({ state }) => {
  const path = toPath(state.route);
  if (getPath() !== path) {
    setPath(path);
  }
  return null;
};

export const listenToRouteChanges = update => {
  window.onpopstate = () => update({ navigateTo: parsePath(getPath()) });
};

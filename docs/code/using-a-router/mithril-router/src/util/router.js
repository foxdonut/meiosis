import m from "mithril";
import { PS } from "patchinko/explicit";

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

const getPath = () => document.location.hash;
const setPath = path => window.history.pushState({}, "", path);

// converts the path to { id, values }
export const parsePath = () => "#!/";

// converts { id, values } to path
export const toPath = ({ id }) => "#!/" + id.toLowerCase();

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

export const createRoutes = ({ states, actions, update, App }) =>
  Object.entries(routeMap).reduce((result, [id, path]) => {
    result[path] = {
      onmatch: () => update({ route: PS({ request: { id } }) }),
      render: () => m(App, { state: states(), actions })
    };
    return result;
  }, {});

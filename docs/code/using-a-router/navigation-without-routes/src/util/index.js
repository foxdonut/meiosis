import { maybe } from "stags";
import taggy from "static-sum-type/modules/taggy";

export const T = (x, f) => f(x);

export const pipe = (...fns) => input => fns.reduce((value, fn) =>
  fn(value), input);

// Using reduce, courtesy Barney Carroll (https://github.com/barneycarroll)
export const get = (object, path) =>
  path.reduce((obj, key) => obj == undefined ? undefined : obj[key], object);

export const preventDefault = evt => {
  evt.preventDefault();
  return evt;
};

export const RoutePage = taggy("RoutePage")({
  Home: ["values"],
  Login: ["values"],
  Settings: ["values"],
  Coffee: ["values"],
  Beer: ["values"]
});

export const fold = handlers => obj =>
  (handlers[obj.case] || (() => null))(obj.value);

export const NavigateTo = maybe("NavigateTo");

export const getNavigation = ({ id, values }) =>
  ({ navigateTo: NavigateTo.Y(RoutePage[id]({ values })) });

export const parsePath = path => {
  const first = path.indexOf("/");
  const last = path.lastIndexOf("/");
  if (first === last) {
    return { id: path.substring(first + 1) };
  }
  return { id: path.substring(first + 1, last), values: { id: path.substring(last + 1) } };
};

// This is external to the app and is meant to simulate the browser's location bar.
export const getPath = () => document.getElementById("pathInput").value;
export const setPath = path => document.getElementById("pathInput").value = path;

/*
{
  // Current route
  route: { id, values }

  // Navigating to another route
  navigateTo: Maybe({ id, values })
}

// before/after navigating to route:
navigateTo.map
[navigateTo.id] => navigating to this route => trigger sync+async updates to
prepare data, and also set { route: navigateTo, navigateTo: N }

// leave route:
navigateTo.map(route.id != navigateTo.id)
[route.id] => leaving this route => trigger any sync+async cleanup

Synchronizing the location bar should be part of the "view"
*/

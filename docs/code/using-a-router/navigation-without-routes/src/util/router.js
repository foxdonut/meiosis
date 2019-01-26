// converts the path to { id, values }
export const parsePath = path => {
  const first = path.indexOf("/");
  const last = path.lastIndexOf("/");
  if (first === last) {
    return { id: path.substring(first + 1) };
  }
  return {
    id: path.substring(first + 1, last),
    values: { id: path.substring(last + 1) }
  };
};

// converts { id, values } to path
export const toPath = ({ id, values }) => {
  let path = "/" + id;
  if (values && values.id) {
    path = path + "/" + values.id;
  }
  return path;
};

// This would normally use the browser's location bar.
// getPath = () => document.location.hash.substring(1);
// setPath = path => window.history.pushState({}, "", "#" + path);
export const getPath = () => document.getElementById("pathInput").value;
export const setPath = path => document.getElementById("pathInput").value = path;

// Keeps the location bar in sync
export const LocationBarSync = ({ state }) => {
  const path = toPath(state.route);
  if (getPath() !== path) {
    setPath(path);
  }
  return null;
};

// This is the equivalent to listening for route changes,
// window.onpopstate = () => update({ navigateTo: parsePath(getPath()) });
export const listenToRouteChanges = update =>
  document.getElementById("pathButton").addEventListener("click", () => {
    update(({ navigateTo: parsePath(getPath()) }));
  });

export const pipe = (...fns) => input => fns.reduce((value, fn) =>
  fn(value), input);

// Using reduce, courtesy Barney Carroll (https://github.com/barneycarroll)
export const get = (object, path) =>
  path.reduce((obj, key) => obj == undefined ? undefined : obj[key], object);

export const head = arr => arr[0];
export const tail = arr => arr.slice(1);
export const init = arr => arr.slice(0, arr.length - 1);
export const last = arr => arr[arr.length - 1];
export const append = (arr, element) => arr.slice().concat([element]);

export const preventDefault = evt => {
  evt.preventDefault();
  return evt;
};

export const caseOf = (id, value) => ({ case: id, value });

export const fold = (caseObj, handlers) =>
  handlers[caseObj.case] &&
  handlers[caseObj.case](caseObj.value);

export const onChange = (stream, path, handler) => {
  let previous = null;
  stream.map(state => {
    const value = get(state, path);
    if (value != null && value !== previous) {
      previous = value;
      handler(state);
    }
  });
};

export const currentRoutes = routes => ({
  routeRelative: [],
  routeChildren: routes
});

export const childRoutes = ({ routeRelative, routeChildren }) => ({
  routeRelative: routeChildren.length > 0 ? append(routeRelative, head(routeChildren)) : routeRelative,
  routeChildren: tail(routeChildren)
});
